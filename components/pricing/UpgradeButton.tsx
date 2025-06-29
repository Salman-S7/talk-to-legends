'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2, Crown, Zap } from 'lucide-react';

interface UpgradeButtonProps {
  plan: 'PRO' | 'PREMIUM';
  className?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export default function UpgradeButton({ 
  plan, 
  className, 
  children, 
  variant = 'default',
  size = 'default'
}: UpgradeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleUpgrade = async () => {
    if (status !== 'authenticated') {
      router.push('/auth/login');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('Failed to start upgrade process. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
    <Button
      onClick={handleUpgrade}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        defaultContent
      )}
    </Button>
  );
}