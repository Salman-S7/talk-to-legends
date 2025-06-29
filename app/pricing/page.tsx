import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, Star, Zap, Crown, MessageCircle, Volume2, Clock, Users, Shield, Award } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import UpgradeButton from '@/components/pricing/UpgradeButton';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with historical conversations',
    features: [
      '2 conversations per day',
      '20 messages per day',
      'Access to 3 legends',
      'Text-based chat only',
      'Basic conversation history',
      'Community support'
    ],
    limitations: [
      'No voice generation',
      'Limited conversation length',
      'Standard response time'
    ],
    buttonText: 'Get Started Free',
    buttonVariant: 'outline' as const,
    popular: false,
    icon: MessageCircle,
    planId: null
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: 'per month',
    description: 'Unlimited conversations with enhanced features',
    features: [
      'Unlimited conversations',
      'Unlimited messages',
      'Access to all 25+ legends',
      'Voice generation included',
      'Priority response time',
      'Extended conversation history',
      'Export conversations',
      'Email support'
    ],
    limitations: [],
    buttonText: 'Start Pro Trial',
    buttonVariant: 'default' as const,
    popular: true,
    icon: Zap,
    planId: 'PRO' as const
  },
  {
    name: 'Premium',
    price: '$19.99',
    period: 'per month',
    description: 'Advanced features for serious history enthusiasts',
    features: [
      'Everything in Pro',
      'Custom legend requests',
      'Advanced voice customization',
      'Conversation analytics',
      'API access',
      'Priority customer support',
      'Early access to new features',
      'Collaboration tools'
    ],
    limitations: [],
    buttonText: 'Go Premium',
    buttonVariant: 'outline' as const,
    popular: false,
    icon: Crown,
    planId: 'PREMIUM' as const
  }
];

const faqs = [
  {
    question: 'Can I change my plan at any time?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
  },
  {
    question: 'Is there a free trial for paid plans?',
    answer: 'Yes, we offer a 7-day free trial for both Pro and Premium plans. No credit card required to start.'
  },
  {
    question: 'What happens to my conversations if I downgrade?',
    answer: 'Your conversation history is preserved, but you may have limited access based on your new plan\'s features.'
  },
  {
    question: 'Do you offer student discounts?',
    answer: 'Yes, we offer a 50% discount for students and educators. Contact our support team with your academic credentials.'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Absolutely. You can cancel your subscription at any time from your account settings. You\'ll continue to have access until the end of your billing period.'
  },
  {
    question: 'Are there any setup fees?',
    answer: 'No, there are no setup fees or hidden costs. You only pay the monthly subscription fee for your chosen plan.'
  }
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-neutral-900 pt-24 pb-20">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -right-32 w-96 h-96 bg-green-400/15 rounded-full blur-3xl"></div>
          <div className="absolute top-[800px] left-1/3 w-64 h-64 bg-green-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-[1200px] -right-40 w-88 h-88 bg-green-500/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 mb-8">
              <Star className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Simple, Transparent Pricing
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black dark:text-white">
              Choose Your Plan
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Start free and upgrade as you explore more conversations with history's greatest minds.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${
                    plan.popular
                      ? 'border-green-500 dark:border-green-400 shadow-lg shadow-green-500/20'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-green-300 dark:hover:border-green-600'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
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

                  {plan.planId ? (
                    <UpgradeButton
                      plan={plan.planId}
                      variant={plan.buttonVariant}
                      className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 ${
                        plan.popular
                          ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25'
                          : ''
                      }`}
                    >
                      {plan.buttonText}
                    </UpgradeButton>
                  ) : (
                    <Link href="/legends">
                      <Button
                        variant={plan.buttonVariant}
                        className="w-full py-3 font-semibold rounded-lg transition-all duration-300"
                      >
                        {plan.buttonText}
                      </Button>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Features Comparison */}
          <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
              Feature Comparison
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-700">
                    <th className="text-left py-4 text-black dark:text-white font-semibold">Features</th>
                    <th className="text-center py-4 text-black dark:text-white font-semibold">Free</th>
                    <th className="text-center py-4 text-black dark:text-white font-semibold">Pro</th>
                    <th className="text-center py-4 text-black dark:text-white font-semibold">Premium</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-neutral-100 dark:border-neutral-800">
                    <td className="py-4 text-neutral-700 dark:text-neutral-300">Daily Conversations</td>
                    <td className="text-center py-4 text-neutral-600 dark:text-neutral-400">2</td>
                    <td className="text-center py-4 text-green-600 dark:text-green-400">Unlimited</td>
                    <td className="text-center py-4 text-green-600 dark:text-green-400">Unlimited</td>
                  </tr>
                  <tr className="border-b border-neutral-100 dark:border-neutral-800">
                    <td className="py-4 text-neutral-700 dark:text-neutral-300">Daily Messages</td>
                    <td className="text-center py-4 text-neutral-600 dark:text-neutral-400">20</td>
                    <td className="text-center py-4 text-green-600 dark:text-green-400">Unlimited</td>
                    <td className="text-center py-4 text-green-600 dark:text-green-400">Unlimited</td>
                  </tr>
                  <tr className="border-b border-neutral-100 dark:border-neutral-800">
                    <td className="py-4 text-neutral-700 dark:text-neutral-300">Available Legends</td>
                    <td className="text-center py-4 text-neutral-600 dark:text-neutral-400">3</td>
                    <td className="text-center py-4 text-green-600 dark:text-green-400">25+</td>
                    <td className="text-center py-4 text-green-600 dark:text-green-400">25+</td>
                  </tr>
                  <tr className="border-b border-neutral-100 dark:border-neutral-800">
                    <td className="py-4 text-neutral-700 dark:text-neutral-300">Voice Generation</td>
                    <td className="text-center py-4 text-neutral-400">✗</td>
                    <td className="text-center py-4 text-green-500">✓</td>
                    <td className="text-center py-4 text-green-500">✓</td>
                  </tr>
                  <tr className="border-b border-neutral-100 dark:border-neutral-800">
                    <td className="py-4 text-neutral-700 dark:text-neutral-300">Conversation History</td>
                    <td className="text-center py-4 text-neutral-600 dark:text-neutral-400">Basic</td>
                    <td className="text-center py-4 text-green-600 dark:text-green-400">Extended</td>
                    <td className="text-center py-4 text-green-600 dark:text-green-400">Full</td>
                  </tr>
                  <tr className="border-b border-neutral-100 dark:border-neutral-800">
                    <td className="py-4 text-neutral-700 dark:text-neutral-300">API Access</td>
                    <td className="text-center py-4 text-neutral-400">✗</td>
                    <td className="text-center py-4 text-neutral-400">✗</td>
                    <td className="text-center py-4 text-green-500">✓</td>
                  </tr>
                  <tr>
                    <td className="py-4 text-neutral-700 dark:text-neutral-300">Custom Legends</td>
                    <td className="text-center py-4 text-neutral-400">✗</td>
                    <td className="text-center py-4 text-neutral-400">✗</td>
                    <td className="text-center py-4 text-green-500">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-black dark:text-white mb-2">Secure Payments</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">256-bit SSL encryption</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-black dark:text-white mb-2">7-Day Free Trial</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">No credit card required</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-black dark:text-white mb-2">50K+ Users</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Trusted worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-black dark:text-white mb-2">99% Satisfaction</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Highly rated platform</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
                  <h3 className="font-semibold text-black dark:text-white mb-3">{faq.question}</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-green-50/50 dark:bg-green-900/10 rounded-2xl p-12 border border-green-200 dark:border-green-800">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
              Join thousands of curious minds exploring wisdom from history's greatest figures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <UpgradeButton
                plan="PRO"
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-green-500/25"
              >
                Start Free Trial
              </UpgradeButton>
              <Link href="/about">
                <Button variant="outline" className="px-8 py-3 border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 font-semibold rounded-lg transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}