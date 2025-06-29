export interface PlanLimits {
  name: string;
  conversationsPerDay: number;
  messagesPerDay: number;
  maxActiveConversations: number;
  voiceGeneration: boolean;
  prioritySupport: boolean;
  features: string[];
}

export const PLAN_LIMITS: Record<string, PlanLimits> = {
  FREE: {
    name: 'Free',
    conversationsPerDay: 2,
    messagesPerDay: 20,
    maxActiveConversations: 5,
    voiceGeneration: false,
    prioritySupport: false,
    features: [
      '2 conversations per day',
      '20 messages per day',
      'Access to 3 legends',
      'Basic conversation history'
    ]
  },
  PRO: {
    name: 'Pro',
    conversationsPerDay: -1, // unlimited
    messagesPerDay: -1, // unlimited
    maxActiveConversations: 50,
    voiceGeneration: true,
    prioritySupport: false,
    features: [
      'Unlimited conversations',
      'Unlimited messages',
      'Access to all legends',
      'Voice generation',
      'Extended conversation history'
    ]
  },
  PREMIUM: {
    name: 'Premium',
    conversationsPerDay: -1, // unlimited
    messagesPerDay: -1, // unlimited
    maxActiveConversations: -1, // unlimited
    voiceGeneration: true,
    prioritySupport: true,
    features: [
      'Everything in Pro',
      'Custom legend requests',
      'Advanced voice customization',
      'Priority support',
      'API access'
    ]
  }
};

export function getPlanLimits(plan: string): PlanLimits {
  return PLAN_LIMITS[plan] || PLAN_LIMITS.FREE;
}

export function isUnlimited(limit: number): boolean {
  return limit === -1;
}