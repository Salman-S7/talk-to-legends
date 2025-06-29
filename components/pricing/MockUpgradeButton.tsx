'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Crown, Zap, Sparkles, Heart, Star } from 'lucide-react';

interface MockUpgradeButtonProps {
  plan: 'PRO' | 'PREMIUM';
  className?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export default function MockUpgradeButton({ 
  plan, 
  className, 
  children, 
  variant = 'default',
  size = 'default'
}: MockUpgradeButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleUpgrade = () => {
    if (status !== 'authenticated') {
      router.push('/auth/login');
      return;
    }

    setShowModal(true);
  };

  const defaultContent = (
    <>
      {plan === 'PRO' ? (
        <Zap className="h-4 w-4 mr-2" />
      ) : (
        <Crown className="h-4 w-4 mr-2" />
      )}
      {children || `Upgrade to ${plan}`}
    </>
  );

  return (
    <>
      <Button
        onClick={handleUpgrade}
        variant={variant}
        size={size}
        className={className}
      >
        {defaultContent}
      </Button>

      {/* Beautiful Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-neutral-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-neutral-200 dark:border-neutral-700 animate-in fade-in-0 zoom-in-95 duration-300">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            
            <div className="text-center">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                {plan === 'PRO' ? (
                  <Zap className="h-8 w-8 text-white" />
                ) : (
                  <Crown className="h-8 w-8 text-white" />
                )}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                Coming Soon! 🚀
              </h3>

              {/* Description */}
              <div className="space-y-3 mb-6">
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  We're working hard to bring you the <strong>{plan}</strong> plan with amazing features!
                </p>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Heart className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-green-700 dark:text-green-300 font-semibold text-sm">
                      Early Bird Special
                    </span>
                  </div>
                  <p className="text-green-600 dark:text-green-400 text-sm">
                    Be among the first to know when {plan} launches and get exclusive early access!
                  </p>
                </div>
              </div>

              {/* Features Preview */}
              <div className="text-left mb-6">
                <h4 className="font-semibold text-black dark:text-white mb-3 text-center">
                  What's Coming in {plan}:
                </h4>
                <div className="space-y-2">
                  {plan === 'PRO' ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-300">Unlimited conversations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-300">Voice generation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-300">Priority support</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-300">Everything in Pro</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-300">Custom legend requests</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-300">API access</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    // Simulate joining waitlist
                    alert('🎉 You\'ve been added to our early access list! We\'ll notify you when ' + plan + ' is available.');
                    setShowModal(false);
                  }}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Join Early Access List
                </Button>
                
                <Button
                  onClick={() => setShowModal(false)}
                  variant="outline"
                  className="w-full border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300"
                >
                  Maybe Later
                </Button>
              </div>

              {/* Footer note */}
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4">
                For now, enjoy unlimited access to all features! 🎁
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}