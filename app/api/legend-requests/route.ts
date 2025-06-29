import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const {
      legendName,
      timeEra,
      profession,
      nationality,
      whyImportant,
      specificQuestions,
      additionalInfo
    } = await request.json();

    if (!legendName || !whyImportant) {
      return NextResponse.json(
        { error: 'Legend name and importance description are required' },
        { status: 400 }
      );
    }

    // Check if user has already requested this legend
    const existingRequest = await prisma.legendRequest.findFirst({
      where: {
        userId: session.user.id,
        legendName: {
          equals: legendName,
          mode: 'insensitive'
        }
      }
    });

    if (existingRequest) {
      return NextResponse.json(
        { error: 'You have already requested this legend' },
        { status: 400 }
      );
    }

    // Create the legend request
    const legendRequest = await prisma.legendRequest.create({
      data: {
        userId: session.user.id,
        legendName: legendName.trim(),
        timeEra: timeEra?.trim() || null,
        profession: profession?.trim() || null,
        nationality: nationality?.trim() || null,
        whyImportant: whyImportant.trim(),
        specificQuestions: specificQuestions?.trim() || null,
        additionalInfo: additionalInfo?.trim() || null,
        status: 'PENDING'
      }
    });

    return NextResponse.json({
      message: 'Legend request submitted successfully',
      request: {
        id: legendRequest.id,
        legendName: legendRequest.legendName,
        status: legendRequest.status
      }
    });

  } catch (error) {
    console.error('Legend request submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user's legend requests
    const userRequests = await prisma.legendRequest.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        legendName: true,
        status: true,
        createdAt: true,
        votes: true
      }
    });

    // Get popular requests (top voted)
    const popularRequests = await prisma.legendRequest.findMany({
      where: { status: 'PENDING' },
      orderBy: { votes: 'desc' },
      take: 10,
      select: {
        id: true,
        legendName: true,
        profession: true,
        votes: true,
        createdAt: true
      }
    });

    return NextResponse.json({
      userRequests,
      popularRequests
    });

  } catch (error) {
    console.error('Legend requests fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}