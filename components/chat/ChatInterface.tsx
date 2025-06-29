'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft, MoreVertical, Copy, RefreshCw, ArrowUp, Sparkles, Loader2, Volume2, Mic } from 'lucide-react';
import Link from 'next/link';
import VoicePlayer from './VoicePlayer';

interface Legend {
  name: string;
  title: string;
  avatar: string;
  greeting: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'legend';
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  legend: Legend;
}

export default function ChatInterface({ legend }: ChatInterfaceProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: legend.greeting,
      sender: 'legend',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Extract legend ID from the legend name for API calls
  const getLegendId = (name: string) => {
    const nameMap: { [key: string]: string } = {
      'Mahatma Gandhi': 'gandhi',
      'Albert Einstein': 'einstein',
      'Cleopatra VII': 'cleopatra'
    };
    return nameMap[name] || 'gandhi';
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  // Load conversation history if user is authenticated
  useEffect(() => {
    const loadConversationHistory = async () => {
      if (status === 'authenticated' && session?.user) {
        setIsLoadingHistory(true);
        try {
          // Try to find existing conversation for this legend
          const response = await fetch('/api/conversations');
          if (response.ok) {
            const data = await response.json();
            const existingConversation = data.conversations.find(
              (conv: any) => conv.legendId === getLegendId(legend.name)
            );

            if (existingConversation) {
              setConversationId(existingConversation.id);
              
              // Load messages for this conversation
              const messagesResponse = await fetch(`/api/conversations/${existingConversation.id}/messages`);
              if (messagesResponse.ok) {
                const messagesData = await messagesResponse.json();
                const loadedMessages = messagesData.messages.map((msg: any) => ({
                  id: msg.id,
                  content: msg.content,
                  sender: msg.sender.toLowerCase() as 'user' | 'legend',
                  timestamp: new Date(msg.createdAt)
                }));

                if (loadedMessages.length > 0) {
                  setMessages(loadedMessages);
                }
              }
            }
          }
        } catch (error) {
          console.error('Failed to load conversation history:', error);
        } finally {
          setIsLoadingHistory(false);
        }
      }
    };

    loadConversationHistory();
  }, [status, session, legend.name]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [inputMessage]);

  // Typing animation function
  const typeMessage = (fullText: string, messageId: string) => {
    return new Promise<void>((resolve) => {
      let currentIndex = 0;
      const typingSpeed = 30; // milliseconds per character
      
      const typeNextChar = () => {
        if (currentIndex <= fullText.length) {
          const currentText = fullText.substring(0, currentIndex);
          
          setMessages(prev => prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, content: currentText, isTyping: currentIndex < fullText.length }
              : msg
          ));
          
          currentIndex++;
          
          if (currentIndex <= fullText.length) {
            setTimeout(typeNextChar, typingSpeed);
          } else {
            resolve();
          }
        }
      };
      
      typeNextChar();
    });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping || status !== 'authenticated') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          legend: getLegendId(legend.name),
          message: currentMessage,
          conversationId: conversationId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Set conversation ID if this is the first message
      if (!conversationId && data.conversationId) {
        setConversationId(data.conversationId);
      }
      
      // Create the message with empty content first
      const legendMessageId = (Date.now() + 1).toString();
      const legendMessage: Message = {
        id: legendMessageId,
        content: '',
        sender: 'legend',
        timestamp: new Date(),
        isTyping: true
      };

      setMessages(prev => [...prev, legendMessage]);
      
      // Start typing animation
      await typeMessage(data.response, legendMessageId);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback response in case of API error
      const fallbackMessageId = (Date.now() + 1).toString();
      const fallbackMessage: Message = {
        id: fallbackMessageId,
        content: '',
        sender: 'legend',
        timestamp: new Date(),
        isTyping: true
      };

      setMessages(prev => [...prev, fallbackMessage]);
      
      // Type the fallback message
      await typeMessage("I apologize, but I'm having trouble responding right now. Please try again in a moment.", fallbackMessageId);
      
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const regenerateResponse = async () => {
    if (messages.length > 1 && !isTyping && status === 'authenticated') {
      const lastUserMessage = messages.slice().reverse().find(msg => msg.sender === 'user');
      const lastLegendMessage = messages[messages.length - 1];
      
      if (lastLegendMessage.sender === 'legend' && lastUserMessage) {
        // Remove the last legend message
        setMessages(prev => prev.slice(0, -1));
        setIsTyping(true);
        
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              legend: getLegendId(legend.name),
              message: lastUserMessage.content,
              conversationId: conversationId
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to regenerate response');
          }

          const data = await response.json();
          
          // Create new message with typing animation
          const newMessageId = (Date.now() + 2).toString();
          const newMessage: Message = {
            id: newMessageId,
            content: '',
            sender: 'legend',
            timestamp: new Date(),
            isTyping: true
          };

          setMessages(prev => [...prev, newMessage]);
          
          // Start typing animation
          await typeMessage(data.response, newMessageId);
          
        } catch (error) {
          console.error('Error regenerating response:', error);
          
          // Restore the original message if regeneration fails
          setMessages(prev => [...prev, lastLegendMessage]);
        } finally {
          setIsTyping(false);
        }
      }
    }
  };

  const suggestedQuestions = [
    "What is the meaning of true leadership?",
    "How do you find inner peace in difficult times?",
    "What advice would you give to young people today?",
    "How do you overcome fear and self-doubt?"
  ];

  // Show loading state while checking authentication
  if (status === 'loading' || isLoadingHistory) {
    return (
      <div className="flex flex-col h-screen bg-white dark:bg-neutral-900 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600 mb-4" />
        <p className="text-neutral-600 dark:text-neutral-400">Loading conversation...</p>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (status === 'unauthenticated') {
    return (
      <div className="flex flex-col h-screen bg-white dark:bg-neutral-900 items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl font-semibold">{legend.name.charAt(0)}</span>
          </div>
          <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
            Sign in to chat with {legend.name}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            Create an account or sign in to start your conversation with history's greatest minds.
          </p>
          <div className="space-y-3">
            <Link href="/auth/login">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" className="w-full border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 font-semibold py-3 rounded-lg">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-neutral-900 overflow-hidden">
      {/* Minimal Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="flex items-center space-x-3">
          <Link href="/legends">
            <Button variant="ghost" size="sm" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">{legend.name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-black dark:text-white font-medium text-sm">{legend.name}</h2>
              {playingMessageId && (
                <p className="text-xs text-green-600 dark:text-green-400">Speaking...</p>
              )}
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      {/* Feature Notice Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-blue-200 dark:border-blue-800 px-4 py-3">
        <div className="flex items-center justify-center space-x-2 text-sm">
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">Voice Chat</span>
          </div>
          <span className="text-neutral-500 dark:text-neutral-400">•</span>
          <div className="flex items-center space-x-2">
            <Mic className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-300 font-medium">Audio Features</span>
          </div>
          <span className="text-neutral-600 dark:text-neutral-400">coming soon!</span>
          <Sparkles className="h-4 w-4 text-amber-500" />
        </div>
      </div>

      {/* Messages Area - Custom Scrollbar Hidden */}
      <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Welcome Section */}
          {messages.length === 1 && (
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-semibold">{legend.name.charAt(0)}</span>
              </div>
              <h1 className="text-2xl font-semibold text-black dark:text-white mb-2">
                Chat with {legend.name}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {legend.title} • Ask anything about life, wisdom, or philosophy
              </p>
              <p className="text-neutral-500 dark:text-neutral-500 text-xs mt-2">
                🎙️ Voice features coming soon!
              </p>
            </div>
          )}

          {/* Messages */}
          <div className="space-y-8">
            {messages.map((message, index) => (
              <div key={message.id} className="group">
                {message.sender === 'user' ? (
                  // User Message
                  <div className="flex justify-end">
                    <div className="max-w-2xl">
                      <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl px-4 py-3">
                        <p className="text-black dark:text-white text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Legend Message
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-semibold">{legend.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-2">
                        <span className="text-black dark:text-white font-medium text-sm">{legend.name}</span>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-black dark:text-white text-sm leading-relaxed whitespace-pre-wrap mb-0">
                          {message.content}
                          {message.isTyping && (
                            <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse"></span>
                          )}
                        </p>
                      </div>
                      {/* Message Actions - Only show for completed messages */}
                      {!message.isTyping && message.content && (
                        <div className="flex items-center space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <VoicePlayer
                            text={message.content}
                            legend={getLegendId(legend.name)}
                            isVisible={true}
                            onPlayStart={() => setPlayingMessageId(message.id)}
                            onPlayEnd={() => setPlayingMessageId(null)}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyMessage(message.content)}
                            className="h-7 px-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 text-xs"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                          {index === messages.length - 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={regenerateResponse}
                              disabled={isTyping}
                              className="h-7 px-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 text-xs disabled:opacity-50"
                            >
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Regenerate
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator - Only show when waiting for API response */}
            {isTyping && !messages.some(msg => msg.isTyping) && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-semibold">{legend.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-2">
                    <span className="text-black dark:text-white font-medium text-sm">{legend.name}</span>
                  </div>
                  <div className="flex items-center space-x-1 py-3">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="text-left p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-black dark:text-white text-sm">{question}</span>
                      <ArrowUp className="h-4 w-4 text-neutral-400 transform rotate-45" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={`Message ${legend.name.split(' ')[0]}...`}
              className="w-full resize-none border border-neutral-300 dark:border-neutral-600 rounded-xl px-4 py-3 pr-12 bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm leading-relaxed min-h-[44px] max-h-[200px]"
              rows={1}
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              size="sm"
              className="absolute right-2 bottom-2 h-8 w-8 p-0 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center mt-2">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
              {legend.name} can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}