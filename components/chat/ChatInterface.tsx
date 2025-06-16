'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft, MoreVertical, Copy, RefreshCw, ArrowUp, Sparkles } from 'lucide-react';
import Link from 'next/link';

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
}

interface ChatInterfaceProps {
  legend: Legend;
}

export default function ChatInterface({ legend }: ChatInterfaceProps) {
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response with more realistic responses
    setTimeout(() => {
      const responses = [
        "That's a profound question that touches the very essence of human nature. In my experience, I have found that true wisdom emerges not from the accumulation of knowledge alone, but from the deep understanding of our interconnectedness with all beings.\n\nThe path to enlightenment is not a destination, but a continuous journey of self-discovery and service to others. When we learn to see beyond our own immediate concerns and embrace the welfare of all humanity, we begin to understand the true meaning of existence.",
        "Your inquiry reminds me of a time when I faced similar challenges during the struggle for independence. The path forward often requires us to look within ourselves and find the courage to act according to our deepest convictions, even when the world seems to oppose us.\n\nRemember, my friend, that every great movement in history began with a single individual who dared to believe that change was possible. The question is not whether we have the power to transform our circumstances, but whether we have the will to persist in the face of adversity.",
        "I believe that every soul carries within it the capacity for greatness. The question is not whether we possess this potential, but whether we have the dedication and perseverance to nurture it through both triumph and adversity.\n\nTrue strength lies not in the ability to dominate others, but in the courage to master oneself. When we learn to govern our own thoughts, emotions, and actions with wisdom and compassion, we become capable of inspiring positive change in the world around us.",
        "In the quiet moments of reflection, I have discovered that the most powerful force in the universe is not physical strength or intellectual prowess, but the unwavering commitment to truth and compassion.\n\nThe practice of non-violence is not merely the absence of physical aggression, but the presence of love in action. It requires us to respond to hatred with understanding, to meet anger with patience, and to transform conflict into opportunity for growth and reconciliation.",
        "Your words resonate with an ancient wisdom that transcends time itself. Throughout history, those who have sought to create meaningful change have always begun with a simple yet revolutionary idea: that we must be the change we wish to see in the world.\n\nThis principle applies not only to great social movements, but to every aspect of our daily lives. Each moment presents us with a choice: to act from fear or from love, to respond with reactivity or with mindfulness, to perpetuate old patterns or to create new possibilities."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const legendMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'legend',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, legendMessage]);
      setIsTyping(false);
    }, 2500);
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

  const regenerateResponse = () => {
    if (messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'legend') {
        setMessages(prev => prev.slice(0, -1));
        setIsTyping(true);
        
        setTimeout(() => {
          const responses = [
            "Let me offer you a different perspective on this matter. In my years of contemplation and action, I have come to understand that wisdom is not a fixed destination but a flowing river that adapts to the landscape it encounters.\n\nPerhaps we might consider this question from the standpoint of practical application. How can we take these philosophical insights and transform them into concrete actions that benefit not only ourselves but our entire community?",
            "Allow me to approach your question from another angle. Throughout my life, I have observed that the most profound truths often reveal themselves not through complex reasoning, but through simple, direct experience.\n\nConsider this: every challenge we face is simultaneously an obstacle and an opportunity. The difference lies not in the circumstances themselves, but in how we choose to perceive and respond to them."
          ];
          
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          
          const newMessage: Message = {
            id: (Date.now() + 2).toString(),
            content: randomResponse,
            sender: 'legend',
            timestamp: new Date()
          };

          setMessages(prev => [...prev, newMessage]);
          setIsTyping(false);
        }, 2000);
      }
    }
  };

  const suggestedQuestions = [
    "What is the meaning of true leadership?",
    "How do you find inner peace in difficult times?",
    "What advice would you give to young people today?",
    "How do you overcome fear and self-doubt?"
  ];

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
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">
          <MoreVertical className="h-4 w-4" />
        </Button>
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
                        </p>
                      </div>
                      {/* Message Actions */}
                      <div className="flex items-center space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
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
                            className="h-7 px-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 text-xs"
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Regenerate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
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