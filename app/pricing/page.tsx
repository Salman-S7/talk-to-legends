import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, Star, Zap, Crown, MessageCircle, ArrowRight, Gift, Sparkles, Heart, Users, Clock, Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MockUpgradeButton from '@/components/pricing/MockUpgradeButton';
import FeatureShowcase from '@/components/pricing/FeatureShowcase';

const plans = [
  {
    name: 'Free Forever',
    price: '$0',
    period: 'always',
    description: 'Everything you need to start your journey with history\'s greatest minds',
    features: [
      'Unlimited conversations',
      'Unlimited messages',
      'Access to all 25+ legends',
      'Full conversation history',
      'Secure & private',
      'Community support'
    ],
    limitations: [],
    buttonText: 'Start Free Now',
    buttonVariant: 'default' as const,
    popular: true,
    icon: Gift,
    planId: null,
    gradient: 'from-green-500/20 to-green-600/20'
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: 'per month',
    description: 'Enhanced experience with voice generation and priority features',
    features: [
      'Everything in Free',
      'Voice generation',
      'Priority response time',
      'Advanced conversation analytics',
      'Export conversations',
      'Email support'
    ],
    limitations: [],
    buttonText: 'Coming Soon',
    buttonVariant: 'outline' as const,
    popular: false,
    icon: Zap,
    planId: 'PRO' as const,
    gradient: 'from-blue-500/20 to-blue-600/20'
  },
  {
    name: 'Premium',
    price: '$19.99',
    period: 'per month',
    description: 'Ultimate experience for serious history enthusiasts and researchers',
    features: [
      'Everything in Pro',
      'Custom legend requests',
      'Advanced voice customization',
      'API access',
      'Priority customer support',
      'Early access to new features',
      'Collaboration tools'
    ],
    limitations: [],
    buttonText: 'Coming Soon',
    buttonVariant: 'outline' as const,
    popular: false,
    icon: Crown,
    planId: 'PREMIUM' as const,
    gradient: 'from-purple-500/20 to-purple-600/20'
  }
];

const faqs = [
  {
    question: 'Is Talk to Legends really free?',
    answer: 'Yes! We believe everyone should have access to historical wisdom. All current features are completely free while we develop premium features.'
  },
  {
    question: 'When will Pro and Premium plans be available?',
    answer: 'We\'re actively developing these features! Join our waitlist to be notified when they launch and get exclusive early access.'
  },
  {
    question: 'Will my conversations be saved when paid plans launch?',
    answer: 'Absolutely! All your conversation history will be preserved, and you\'ll continue to have full access to everything you\'ve created.'
  },
  {
    question: 'Can I request specific historical figures?',
    answer: 'Currently, we have 25+ carefully researched legends. Custom legend requests will be available in our Premium plan when it launches.'
  },
  {
    question: 'How accurate are the AI responses?',
    answer: 'Our AI is trained on extensive historical research and writings. While responses are historically informed, they\'re AI-generated interpretations, not actual quotes.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes! We use enterprise-grade encryption and never share your conversations. Your privacy and data security are our top priorities.'
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
          <div className="absolute top-40 -right-32 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl"></div>
          <div className="absolute top-[800px] left-1/3 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-[1200px] -right-40 w-88 h-88 bg-green-500/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 mb-8">
              <Gift className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Free While We Build Amazing Features
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black dark:text-white">
              Choose Your Experience
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Start your journey with history's greatest minds completely free. Premium features coming soon!
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
                      : plan.planId
                      ? 'border-purple-300 dark:border-purple-600 hover:border-purple-500 dark:hover:border-purple-400'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-green-300 dark:hover:border-green-600'
                  }`}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-2xl opacity-50`}></div>
                  
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Available Now
                      </div>
                    </div>
                  )}

                  {plan.planId && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                        <Sparkles className="w-4 h-4 mr-1" />
                        Coming Soon
                      </div>
                    </div>
                  )}

                  <div className="relative z-10">
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
                      <MockUpgradeButton
                        plan={plan.planId}
                        variant={plan.buttonVariant}
                        className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 ${
                          plan.popular
                            ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25'
                            : ''
                        }`}
                      >
                        {plan.buttonText}
                      </MockUpgradeButton>
                    ) : (
                      <Link href="/legends">
                        <Button
                          variant={plan.buttonVariant}
                          className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 ${
                            plan.popular
                              ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25'
                              : ''
                          }`}
                        >
                          {plan.buttonText}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feature Showcase */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                Features & Roadmap
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                See what's available now and what exciting features we're building for the future
              </p>
            </div>
            <FeatureShowcase />
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-black dark:text-white mb-2">Secure & Private</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Enterprise-grade security</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-black dark:text-white mb-2">Free Forever</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Core features always free</p>
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
                <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-black dark:text-white mb-2">Community Driven</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Built with user feedback</p>
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
          <div className="text-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-12 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Gift className="h-8 w-8 text-green-600 dark:text-green-400" />
              <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
              Start Your Journey Today
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
              Join thousands of curious minds exploring wisdom from history's greatest figures.
              <br />
              <strong>Everything is free while we build amazing new features!</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/legends">
                <Button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-green-500/25">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Start Talking to Legends
                </Button>
              </Link>
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