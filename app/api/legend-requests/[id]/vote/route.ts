import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const legendRequestId = params.id;

    // Check if legend request exists
    const legendRequest = await prisma.legendRequest.findUnique({
      where: { id: legendRequestId }
    });

    if (!legendRequest) {
      return NextResponse.json(
        { error: 'Legend request not found' },
        { status: 404 }
      );
    }

    // Check if user has already voted
    const existingVote = await prisma.legendRequestVote.findFirst({
      where: {
        legendRequestId,
        userId: session.user.id
      }
    });

    if (existingVote) {
      return NextResponse.json(
        { error: 'You have already voted for this legend' },
        { status: 400 }
      );
    }

    // Create vote and increment counter
    await prisma.$transaction([
      prisma.legendRequestVote.create({
        data: {
          legendRequestId,
          userId: session.user.id
        }
      }),
      prisma.legendRequest.update({
        where: { id: legendRequestId },
        data: {
          votes: {
            increment: 1
          }
        }
      })
    ]);

    return NextResponse.json({
      message: 'Vote recorded successfully'
    });

  } catch (error) {
    console.error('Vote submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}