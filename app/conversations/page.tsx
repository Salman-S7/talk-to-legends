'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MessageCircle, Clock, User, Trash2, MoreVertical, Loader2 } from 'lucide-react';

interface Conversation {
  id: string;
  legendId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Array<{
    id: string;
    content: string;
    sender: string;
    createdAt: string;
  }>;
}

export default function ConversationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const legendNames = {
    gandhi: 'Mahatma Gandhi',
    einstein: 'Albert Einstein',
    cleopatra: 'Cleopatra VII'
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/conversations');
          if (response.ok) {
            const data = await response.json();
            setConversations(data.conversations);
          } else {
            setError('Failed to load conversations');
          }
        } catch (err) {
          setError('Failed to load conversations');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchConversations();
  }, [status]);

  const deleteConversation = async (conversationId: string) => {
    try {
      const response = await fetch(`/api/conversations/${conversationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setConversations(prev => prev.filter(conv => conv.id !== conversationId));
      } else {
        setError('Failed to delete conversation');
      }
    } catch (err) {
      setError('Failed to delete conversation');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 168) {
      const days = Math.floor(diffInHours / 24);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getLastMessage = (conversation: Conversation) => {
    if (conversation.messages.length === 0) return 'No messages yet';
    const lastMessage = conversation.messages[0]; // API returns messages in desc order
    const content = lastMessage.content;
    return content.length > 100 ? content.substring(0, 100) + '...' : content;
  };

  if (status === 'loading' || isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white dark:bg-neutral-900 pt-24 pb-20 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
            <p className="text-neutral-600 dark:text-neutral-400">Loading conversations...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-neutral-900 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              Your Conversations
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Continue your discussions with history's greatest minds or start a new conversation.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* New Conversation Button */}
          <div className="mb-8">
            <Link href="/legends">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300">
                <MessageCircle className="mr-2 h-5 w-5" />
                Start New Conversation
              </Button>
            </Link>
          </div>

          {/* Conversations List */}
          {conversations.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                No conversations yet
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                Start your first conversation with a historical legend.
              </p>
              <Link href="/legends">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300">
                  Choose a Legend
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <Card key={conversation.id} className="p-6 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold">
                          {legendNames[conversation.legendId as keyof typeof legendNames]?.charAt(0) || 'L'}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-black dark:text-white">
                            {legendNames[conversation.legendId as keyof typeof legendNames] || conversation.legendId}
                          </h3>
                          <span className="text-sm text-neutral-500 dark:text-neutral-400">
                            •
                          </span>
                          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(conversation.updatedAt)}
                          </div>
                        </div>
                        
                        <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                          {getLastMessage(conversation)}
                        </p>
                        
                        <div className="flex items-center mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {conversation.messages.length} message{conversation.messages.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/legends/${conversation.legendId}/chat`}>
                        <Button variant="outline" size="sm" className="border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700">
                          Continue
                        </Button>
                      </Link>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteConversation(conversation.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}