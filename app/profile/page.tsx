'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { User, Mail, Calendar, MapPin, Edit2, Save, X, MessageCircle, Clock, Star, Crown, Zap, Gift, Sparkles } from 'lucide-react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    joinDate: '',
    bio: '',
    plan: 'FREE'
  });

  const [editData, setEditData] = useState(userData);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  // Load user data
  useEffect(() => {
    const loadUserData = async () => {
      if (status === 'authenticated' && session?.user) {
        try {
          const response = await fetch('/api/user/profile');
          if (response.ok) {
            const data = await response.json();
            const user = data.user;
            
            const formattedData = {
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              email: user.email || '',
              location: user.location || '',
              joinDate: new Date(user.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
              }),
              bio: user.bio || '',
              plan: user.plan || 'FREE'
            };
            
            setUserData(formattedData);
            setEditData(formattedData);
          }
        } catch (error) {
          console.error('Failed to load user data:', error);
        }
      }
    };

    loadUserData();
  }, [status, session]);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: editData.firstName,
          lastName: editData.lastName,
          location: editData.location,
          bio: editData.bio,
        }),
      });

      if (response.ok) {
        setUserData(editData);
        setIsEditing(false);
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const conversationStats = {
    totalConversations: 127,
    favoriteEra: 'Renaissance',
    mostTalkedTo: 'Albert Einstein',
    totalHours: 45
  };

  const recentConversations = [
    { legend: 'Albert Einstein', topic: 'Theory of Relativity', date: '2 hours ago' },
    { legend: 'Mahatma Gandhi', topic: 'Non-violent Resistance', date: '1 day ago' },
    { legend: 'Cleopatra VII', topic: 'Ancient Egyptian Politics', date: '3 days ago' }
  ];

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'PRO':
        return <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
      case 'PREMIUM':
        return <Crown className="h-6 w-6 text-purple-600 dark:text-purple-400" />;
      default:
        return <Gift className="h-6 w-6 text-green-600 dark:text-green-400" />;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'PRO':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'PREMIUM':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      default:
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
    }
  };

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'PRO':
        return 'Pro';
      case 'PREMIUM':
        return 'Premium';
      default:
        return 'Free Forever';
    }
  };

  if (status === 'loading') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white dark:bg-neutral-900 pt-24 pb-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-neutral-600 dark:text-neutral-400">Loading profile...</p>
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
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-white">
                {userData.firstName?.[0] || 'U'}{userData.lastName?.[0] || ''}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
              {userData.firstName} {userData.lastName}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Member since {userData.joinDate}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-black dark:text-white">
                    Profile Information
                  </h2>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                      className="border-neutral-300 dark:border-neutral-600"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        onClick={handleSave}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                        className="border-neutral-300 dark:border-neutral-600"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-black dark:text-white font-medium">
                        First Name
                      </Label>
                      {isEditing ? (
                        <Input
                          id="firstName"
                          value={editData.firstName}
                          onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                          className="mt-2 bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
                        />
                      ) : (
                        <p className="mt-2 text-neutral-600 dark:text-neutral-300">{userData.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-black dark:text-white font-medium">
                        Last Name
                      </Label>
                      {isEditing ? (
                        <Input
                          id="lastName"
                          value={editData.lastName}
                          onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                          className="mt-2 bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
                        />
                      ) : (
                        <p className="mt-2 text-neutral-600 dark:text-neutral-300">{userData.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-black dark:text-white font-medium">
                      Email Address
                    </Label>
                    <div className="mt-2 flex items-center">
                      <Mail className="h-4 w-4 text-neutral-400 mr-2" />
                      <span className="text-neutral-600 dark:text-neutral-300">{userData.email}</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-black dark:text-white font-medium">
                      Location
                    </Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={editData.location}
                        onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                        className="mt-2 bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
                        placeholder="Enter your location"
                      />
                    ) : (
                      <div className="mt-2 flex items-center">
                        <MapPin className="h-4 w-4 text-neutral-400 mr-2" />
                        <span className="text-neutral-600 dark:text-neutral-300">
                          {userData.location || 'Not specified'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-black dark:text-white font-medium">
                      Bio
                    </Label>
                    {isEditing ? (
                      <textarea
                        id="bio"
                        value={editData.bio}
                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                        rows={3}
                        className="mt-2 w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md text-black dark:text-white resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                        {userData.bio || 'No bio added yet.'}
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Recent Conversations */}
              <Card className="p-6 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 mt-6">
                <h2 className="text-xl font-semibold text-black dark:text-white mb-6">
                  Recent Conversations
                </h2>
                <div className="space-y-4">
                  {recentConversations.map((conversation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {conversation.legend.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-black dark:text-white">{conversation.legend}</p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">{conversation.topic}</p>
                        </div>
                      </div>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">{conversation.date}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              {/* Plan Info */}
              <Card className="p-6 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                  Your Plan
                </h3>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    {getPlanIcon(userData.plan)}
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${getPlanColor(userData.plan)}`}>
                    {getPlanName(userData.plan)}
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    {userData.plan === 'FREE' && 'Enjoy unlimited access to all current features!'}
                    {userData.plan === 'PRO' && 'Enhanced experience with voice generation'}
                    {userData.plan === 'PREMIUM' && 'Ultimate experience with all premium features'}
                  </p>
                  
                  {userData.plan === 'FREE' && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="text-green-700 dark:text-green-300 font-semibold text-sm">
                          Free While We Build
                        </span>
                      </div>
                      <p className="text-green-600 dark:text-green-400 text-xs">
                        Enjoy unlimited access while we develop amazing new features!
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Conversation Stats */}
              <Card className="p-6 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                  Your Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">Conversations</span>
                    </div>
                    <span className="font-semibold text-black dark:text-white">{conversationStats.totalConversations}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">Hours Spent</span>
                    </div>
                    <span className="font-semibold text-black dark:text-white">{conversationStats.totalHours}h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">Favorite Era</span>
                    </div>
                    <span className="font-semibold text-black dark:text-white">{conversationStats.favoriteEra}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">Most Talked To</span>
                    </div>
                    <span className="font-semibold text-black dark:text-white">{conversationStats.mostTalkedTo}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}