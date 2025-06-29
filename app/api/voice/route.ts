import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getPlanLimits } from '@/lib/plans';

// Configure this route to be dynamic
export const dynamic = 'force-dynamic';

// Voice configurations for each legend
const legendVoices = {
  gandhi: {
    voiceId: 'pNInz6obpgDQGcFmaJgB', // Adam voice - wise, calm
    settings: {
      stability: 0.8,
      similarity_boost: 0.8,
      style: 0.2,
      use_speaker_boost: true
    }
  },
  einstein: {
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah voice - intellectual, curious
    settings: {
      stability: 0.7,
      similarity_boost: 0.9,
      style: 0.3,
      use_speaker_boost: true
    }
  },
  cleopatra: {
    voiceId: 'ThT5KcBeYPX3keUQqHPh', // Dorothy voice - regal, authoritative
    settings: {
      stability: 0.9,
      similarity_boost: 0.8,
      style: 0.4,
      use_speaker_boost: true
    }
  }
};

async function generateSpeech(text: string, voiceConfig: any) {
  try {
    if (!process.env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY === 'your_elevenlabs_api_key_here') {
      throw new Error('ElevenLabs API key not configured');
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceConfig.voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: voiceConfig.settings,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', response.status, errorText);
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    return audioBuffer;
  } catch (error) {
    console.error('Speech generation error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user's plan to check voice generation access
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

    // Check if user has access to voice generation
    if (!limits.voiceGeneration) {
      return NextResponse.json(
        { 
          error: 'Voice generation requires Pro plan',
          upgrade: true 
        },
        { status: 403 }
      );
    }

    const { legend, text } = await request.json();

    if (!legend || !text) {
      return NextResponse.json(
        { error: 'Legend and text are required' },
        { status: 400 }
      );
    }

    const voiceConfig = legendVoices[legend as keyof typeof legendVoices];
    
    if (!voiceConfig) {
      return NextResponse.json(
        { error: 'Unknown legend' },
        { status: 400 }
      );
    }

    // Clean the text for better speech synthesis
    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
      .replace(/\*(.*?)\*/g, '$1') // Remove markdown italic
      .replace(/\n+/g, '. ') // Replace line breaks with periods
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    // Limit text length for better performance (ElevenLabs has limits)
    const maxLength = 1000;
    const finalText = cleanText.length > maxLength 
      ? cleanText.substring(0, maxLength) + '...'
      : cleanText;

    try {
      const audioBuffer = await generateSpeech(finalText, voiceConfig);
      
      return new NextResponse(audioBuffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': audioBuffer.byteLength.toString(),
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
      });
    } catch (speechError) {
      console.error('Speech generation failed:', speechError);
      
      // Return error response for voice generation failure
      return NextResponse.json(
        { 
          error: 'Voice generation temporarily unavailable',
          fallback: true 
        },
        { status: 503 }
      );
    }

  } catch (error) {
    console.error('Voice API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}