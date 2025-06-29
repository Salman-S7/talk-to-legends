'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  MessageCircle, 
  Volume2, 
  Crown, 
  Zap, 
  Star, 
  Users, 
  Clock, 
  Shield,
  Sparkles,
  Heart,
  Gift,
  Rocket
} from 'lucide-react';

export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState('current');

  const currentFeatures = [
    {
      icon: MessageCircle,
      title: 'Unlimited Conversations',
      description: 'Chat with Gandhi, Einstein, Cleopatra and more without limits',
      status: 'active'
    },
    {
      icon: Users,
      title: 'All Historical Legends',
      description: 'Access to our complete collection of 25+ historical figures',
      status: 'active'
    },
    {
      icon: Clock,
      title: 'Conversation History',
      description: 'Save and revisit your meaningful conversations',
      status: 'active'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your conversations are encrypted and private',
      status: 'active'
    }
  ];

  const comingFeatures = [
    {
      icon: Volume2,
      title: 'Voice Generation',
      description: 'Hear legends speak in their authentic voices',
      status: 'coming',
      plan: 'Pro'
    },
    {
      icon: Sparkles,
      title: 'Custom Legends',
      description: 'Request conversations with any historical figure',
      status: 'coming',
      plan: 'Premium'
    },
    {
      icon: Rocket,
      title: 'API Access',
      description: 'Integrate Talk to Legends into your own applications',
      status: 'coming',
      plan: 'Premium'
    },
    {
      icon: Crown,
      title: 'Priority Support',
      description: 'Get help faster with dedicated support channels',
      status: 'coming',
      plan: 'Pro'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1 flex">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
              activeTab === 'current'
                ? 'bg-white dark:bg-neutral-700 text-black dark:text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <Gift className="h-4 w-4 mr-2 inline" />
            Available Now
          </button>
          <button
            onClick={() => setActiveTab('coming')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
              activeTab === 'coming'
                ? 'bg-white dark:bg-neutral-700 text-black dark:text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <Rocket className="h-4 w-4 mr-2 inline" />
            Coming Soon
          </button>
        </div>
      </div>

      {/* Current Features */}
      {activeTab === 'current' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 mb-4">
              <Gift className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Free for Everyone
              </span>
            </div>
            <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
              Everything You Need, Right Now
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Enjoy full access to all current features while we build amazing new ones
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {currentFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="p-6 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black dark:text-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="mt-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Coming Features */}
      {activeTab === 'coming' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-4">
              <Rocket className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                In Development
              </span>
            </div>
            <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
              Exciting Features Coming Soon
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              We're working on incredible new features to enhance your experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {comingFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="p-6 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 relative overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10"></div>
                  
                  <div className="relative flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-black dark:text-white">
                          {feature.title}
                        </h4>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          feature.plan === 'Pro' 
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        }`}>
                          {feature.plan}
                        </span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-3">
                        {feature.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                          <Clock className="w-3 h-3 mr-1" />
                          Coming Soon
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-xl font-bold text-black dark:text-white mb-2">
                Be the First to Know
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                Join our community and get notified when these amazing features launch!
              </p>
              <Button 
                onClick={() => alert('🎉 Thanks for your interest! We\'ll keep you updated on our progress.')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg"
              >
                <Star className="h-4 w-4 mr-2" />
                Join the Waitlist
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}