'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Loader2, Settings } from 'lucide-react';

interface ManageSubscriptionButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export default function ManageSubscriptionButton({ 
  className, 
  variant = 'outline',
  size = 'default'
}: ManageSubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const handleManageSubscription = async () => {
    if (status !== 'authenticated') {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create portal session');
      }

      // Redirect to Stripe Customer Portal
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Portal error:', error);
      alert('Failed to open subscription management. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleManageSubscription}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          <Settings className="h-4 w-4 mr-2" />
          Manage Subscription
        </>
      )}
    </Button>
  );
}