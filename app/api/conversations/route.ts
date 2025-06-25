import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const conversations = await prisma.conversation.findMany({
      where: { userId: session.user.id },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      orderBy: { updatedAt: 'desc' },
      take: 10
    });

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error('Conversations fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { legendId, title } = await request.json();

    if (!legendId) {
      return NextResponse.json(
        { error: 'Legend ID is required' },
        { status: 400 }
      );
    }

    const conversation = await prisma.conversation.create({
      data: {
        userId: session.user.id,
        legendId,
        title: title || `Conversation with ${legendId}`,
      }
    });

    return NextResponse.json({ conversation });
  } catch (error) {
    console.error('Conversation creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}