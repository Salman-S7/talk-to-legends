import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const conversation = await prisma.conversation.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ messages: conversation.messages });
  } catch (error) {
    console.error('Messages fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { content, sender } = await request.json();

    if (!content || !sender) {
      return NextResponse.json(
        { error: 'Content and sender are required' },
        { status: 400 }
      );
    }

    // Verify conversation belongs to user
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    });

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    const message = await prisma.message.create({
      data: {
        conversationId: params.id,
        content,
        sender: sender.toUpperCase()
      }
    });

    // Update conversation timestamp
    await prisma.conversation.update({
      where: { id: params.id },
      data: { updatedAt: new Date() }
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Message creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}