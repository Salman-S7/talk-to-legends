import { prisma } from '@/lib/prisma';
import { getPlanLimits, isUnlimited } from '@/lib/plans';

export interface UsageStats {
  conversationsToday: number;
  messagesToday: number;
  totalActiveConversations: number;
}

export async function getUserUsageStats(userId: string): Promise<UsageStats> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Get conversations created today
  const conversationsToday = await prisma.conversation.count({
    where: {
      userId,
      createdAt: {
        gte: today,
        lt: tomorrow
      }
    }
  });

  // Get messages sent today by the user
  const messagesToday = await prisma.message.count({
    where: {
      conversation: {
        userId
      },
      sender: 'USER',
      createdAt: {
        gte: today,
        lt: tomorrow
      }
    }
  });

  // Get total active conversations
  const totalActiveConversations = await prisma.conversation.count({
    where: {
      userId
    }
  });

  return {
    conversationsToday,
    messagesToday,
    totalActiveConversations
  };
}

export async function canUserCreateConversation(userId: string, userPlan: string): Promise<{ allowed: boolean; reason?: string }> {
  const limits = getPlanLimits(userPlan);
  const usage = await getUserUsageStats(userId);

  // Check daily conversation limit
  if (!isUnlimited(limits.conversationsPerDay) && usage.conversationsToday >= limits.conversationsPerDay) {
    return {
      allowed: false,
      reason: `You've reached your daily limit of ${limits.conversationsPerDay} conversations. Upgrade to Pro for unlimited conversations.`
    };
  }

  // Check max active conversations
  if (!isUnlimited(limits.maxActiveConversations) && usage.totalActiveConversations >= limits.maxActiveConversations) {
    return {
      allowed: false,
      reason: `You've reached your limit of ${limits.maxActiveConversations} active conversations. Delete some conversations or upgrade your plan.`
    };
  }

  return { allowed: true };
}

export async function canUserSendMessage(userId: string, userPlan: string): Promise<{ allowed: boolean; reason?: string }> {
  const limits = getPlanLimits(userPlan);
  const usage = await getUserUsageStats(userId);

  // Check daily message limit
  if (!isUnlimited(limits.messagesPerDay) && usage.messagesToday >= limits.messagesPerDay) {
    return {
      allowed: false,
      reason: `You've reached your daily limit of ${limits.messagesPerDay} messages. Upgrade to Pro for unlimited messages.`
    };
  }

  return { allowed: true };
}

export function getRemainingUsage(usage: UsageStats, limits: any) {
  return {
    conversationsRemaining: isUnlimited(limits.conversationsPerDay) 
      ? -1 
      : Math.max(0, limits.conversationsPerDay - usage.conversationsToday),
    messagesRemaining: isUnlimited(limits.messagesPerDay) 
      ? -1 
      : Math.max(0, limits.messagesPerDay - usage.messagesToday),
    activeConversationsRemaining: isUnlimited(limits.maxActiveConversations) 
      ? -1 
      : Math.max(0, limits.maxActiveConversations - usage.totalActiveConversations)
  };
}