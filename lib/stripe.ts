import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
  typescript: true,
});

// Product and price configuration
export const STRIPE_CONFIG = {
  products: {
    pro: {
      name: 'Talk to Legends Pro',
      description: 'Unlimited conversations with voice generation',
      priceId: process.env.STRIPE_PRO_PRICE_ID || '', // You'll set this after creating products in Stripe
    },
    premium: {
      name: 'Talk to Legends Premium',
      description: 'Everything in Pro plus custom legends and API access',
      priceId: process.env.STRIPE_PREMIUM_PRICE_ID || '', // You'll set this after creating products in Stripe
    },
  },
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
};

export const PLAN_TO_PRICE_ID = {
  PRO: STRIPE_CONFIG.products.pro.priceId,
  PREMIUM: STRIPE_CONFIG.products.premium.priceId,
};

export function getPriceIdForPlan(plan: string): string | null {
  return PLAN_TO_PRICE_ID[plan as keyof typeof PLAN_TO_PRICE_ID] || null;
}