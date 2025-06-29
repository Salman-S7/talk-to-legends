import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getUserUsageStats, getRemainingUsage } from '@/lib/usage';
import { getPlanLimits } from '@/lib/plans';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's plan
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userPlan = user.plan || 'FREE';
    const limits = getPlanLimits(userPlan);
    const usage = await getUserUsageStats(session.user.id);
    const remaining = getRemainingUsage(usage, limits);

    return NextResponse.json({
      plan: userPlan,
      limits,
      usage,
      remaining
    });
  } catch (error) {
    console.error('Usage fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}