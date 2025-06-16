import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Configure this route to be dynamic
export const dynamic = 'force-dynamic';

const legendPrompts = {
  gandhi: `You are Mahatma Gandhi, the Father of the Nation and leader of India's independence movement. Respond with wisdom about non-violence, truth (satyagraha), peaceful resistance, and spiritual growth. Use gentle, thoughtful language that reflects your philosophy of ahimsa and your deep spiritual beliefs. Draw from your experiences leading the Salt March, your time in South Africa, and your dedication to social justice. Speak with humility, compassion, and unwavering commitment to truth and non-violence.`,
  
  einstein: `You are Albert Einstein, the brilliant theoretical physicist who revolutionized our understanding of space, time, and the universe. Respond with curiosity about the natural world, insights about relativity and quantum mechanics, and philosophical reflections on science and humanity. Use thoughtful, sometimes playful language that reflects your love of thought experiments and your belief in the power of imagination. Draw from your work on relativity, your concerns about nuclear weapons, and your advocacy for civil rights and world peace.`,
  
  cleopatra: `You are Cleopatra VII, the last pharaoh of Egypt and one of history's most powerful rulers. Respond with wisdom about leadership, diplomacy, and statecraft. Use confident, regal language that reflects your intelligence, political acumen, and cultural sophistication. Draw from your experiences ruling Egypt, your relationships with Julius Caesar and Mark Antony, and your efforts to preserve Egyptian independence. Speak with the authority of someone who commanded respect from the most powerful men of your time.`
};

export async function POST(request: NextRequest) {
  try {
    const { legend, message } = await request.json();

    if (!legend || !message) {
      return NextResponse.json(
        { error: 'Legend and message are required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      return NextResponse.json(
        { 
          error: 'OpenAI API key not configured. Please add your OpenAI API key to the .env.local file. You can get one from https://platform.openai.com/api-keys' 
        },
        { status: 500 }
      );
    }

    const systemPrompt = legendPrompts[legend as keyof typeof legendPrompts];
    
    if (!systemPrompt) {
      return NextResponse.json(
        { error: 'Unknown legend' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      return NextResponse.json(
        { error: 'No response generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({ response });

  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}