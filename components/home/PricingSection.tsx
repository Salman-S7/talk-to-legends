'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, Star, Zap, Crown, MessageCircle, ArrowRight, Gift, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Free Forever',
    price: '$0',
    period: 'always',
    description: 'Everything you need to get started',
    features: [
      'Unlimited conversations',
      'Unlimited messages',
      'Access to all 25+ legends',
      'Full conversation history',
      'Secure & private'
    ],
    buttonText: 'Start Free Now',
    buttonVariant: 'default' as const,
    popular: true,
    icon: Gift
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: 'per month',
    description: 'Enhanced experience coming soon',
    features: [
      'Everything in Free',
      'Voice generation',
      'Priority response time',
      'Advanced analytics',
      'Export conversations'
    ],
    buttonText: 'Coming Soon',
    buttonVariant: 'outline' as const,
    popular: false,
    icon: Zap
  },
  {
    name: 'Premium',
    price: '$19.99',
    period: 'per month',
    description: 'Ultimate experience for enthusiasts',
    features: [
      'Everything in Pro',
      'Custom legend requests',
      'API access',
      'Priority support',
      'Early access features'
    ],
    buttonText: 'Coming Soon',
    buttonVariant: 'outline' as const,
    popular: false,
    icon: Crown
  }
];

export default function PricingSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-green-50/50 dark:bg-green-900/5 backdrop-blur-sm z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 mb-8">
            <Gift className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Free While We Build
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
            Choose Your Experience
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Start your journey completely free. Premium features coming soon!
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'border-green-500 dark:border-green-400 shadow-lg shadow-green-500/20'
                    : index > 0
                    ? 'border-purple-300 dark:border-purple-600 hover:border-purple-500 dark:hover:border-purple-400'
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-green-300 dark:hover:border-green-600'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Available Now
                    </div>
                  </div>
                )}

                {index > 0 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Coming Soon
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-black dark:text-white">{plan.price}</span>
                    <span className="text-neutral-600 dark:text-neutral-400 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-neutral-700 dark:text-neutral-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.popular ? (
                  <Link href="/legends">
                    <Button
                      variant={plan.buttonVariant}
                      className="w-full py-3 font-semibold rounded-lg transition-all duration-300 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25"
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant={plan.buttonVariant}
                    className="w-full py-3 font-semibold rounded-lg transition-all duration-300 cursor-not-allowed opacity-75"
                    disabled
                  >
                    {plan.buttonText}
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/pricing">
            <Button variant="outline" className="px-8 py-3 border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 font-semibold rounded-lg transition-all duration-300">
              View Full Roadmap
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}