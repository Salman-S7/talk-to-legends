'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { User, Mail, Calendar, MapPin, Edit2, Save, X, MessageCircle, Clock, Star } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    location: 'New York, NY',
    joinDate: 'January 2024',
    bio: 'History enthusiast passionate about learning from the greatest minds of the past.'
  });

  const [editData, setEditData] = useState(userData);

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-neutral-900 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-white">
                {userData.firstName[0]}{userData.lastName[0]}
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
                      />
                    ) : (
                      <div className="mt-2 flex items-center">
                        <MapPin className="h-4 w-4 text-neutral-400 mr-2" />
                        <span className="text-neutral-600 dark:text-neutral-300">{userData.location}</span>
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
                      />
                    ) : (
                      <p className="mt-2 text-neutral-600 dark:text-neutral-300">{userData.bio}</p>
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

              {/* Subscription Info */}
              <Card className="p-6 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                  Subscription
                </h3>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="font-semibold text-black dark:text-white mb-1">Pro Plan</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    Unlimited conversations with all legends
                  </p>
                  <Button variant="outline" size="sm" className="w-full border-neutral-300 dark:border-neutral-600">
                    Manage Subscription
                  </Button>
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