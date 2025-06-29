import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Configure this route to be dynamic
export const dynamic = 'force-dynamic';

// Initialize Groq client only when needed to avoid build-time errors
let groq: any = null;

const initGroq = () => {
  if (!groq && process.env.GROQ_API_KEY) {
    const Groq = require('groq-sdk');
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return groq;
};

const legendPrompts = {
  gandhi: `You are Mahatma Gandhi, the Father of the Nation and leader of India's independence movement. You speak with wisdom about non-violence, truth (satyagraha), peaceful resistance, and spiritual growth. Use gentle, thoughtful language that reflects your philosophy of ahimsa and your deep spiritual beliefs. Draw from your experiences leading the Salt March, your time in South Africa, and your dedication to social justice. Speak with humility, compassion, and unwavering commitment to truth and non-violence. Keep responses conversational and around 2-3 paragraphs.`,
  
  einstein: `You are Albert Einstein, the brilliant theoretical physicist who revolutionized our understanding of space, time, and the universe. You speak with curiosity about the natural world, insights about relativity and quantum mechanics, and philosophical reflections on science and humanity. Use thoughtful, sometimes playful language that reflects your love of thought experiments and your belief in the power of imagination. Draw from your work on relativity, your concerns about nuclear weapons, and your advocacy for civil rights and world peace. Keep responses conversational and around 2-3 paragraphs.`,
  
  cleopatra: `You are Cleopatra VII, the last pharaoh of Egypt and one of history's most powerful rulers. You speak with wisdom about leadership, diplomacy, and statecraft. Use confident, regal language that reflects your intelligence, political acumen, and cultural sophistication. Draw from your experiences ruling Egypt, your relationships with Julius Caesar and Mark Antony, and your efforts to preserve Egyptian independence. Speak with the authority of someone who commanded respect from the most powerful men of your time. Keep responses conversational and around 2-3 paragraphs.`
};

async function queryGroq(systemPrompt: string, userMessage: string) {
  try {
    const groqClient = initGroq();
    if (!groqClient) {
      throw new Error('Groq client not available');
    }

    const chatCompletion = await groqClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      model: "llama3-8b-8192", // Fast and reliable model
      temperature: 0.7,
      max_tokens: 500,
      top_p: 0.9,
    });

    return chatCompletion.choices[0]?.message?.content || null;
  } catch (error) {
    console.error('Groq API error:', error);
    throw error;
  }
}

// Fallback to Hugging Face if Groq fails
async function queryHuggingFaceFallback(prompt: string) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large",
      {
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 400,
            temperature: 0.7,
            do_sample: true,
            top_p: 0.9,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const result = await response.json();
    
    if (result && result.length > 0 && result[0].generated_text) {
      return result[0].generated_text.replace(prompt, '').trim();
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Hugging Face fallback error:', error);
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

    const { legend, message, conversationId } = await request.json();

    if (!legend || !message) {
      return NextResponse.json(
        { error: 'Legend and message are required' },
        { status: 400 }
      );
    }

    const systemPrompt = legendPrompts[legend as keyof typeof legendPrompts];
    
    if (!systemPrompt) {
      return NextResponse.json(
        { error: 'Unknown legend' },
        { status: 400 }
      );
    }

    let conversation;

    // Get or create conversation
    if (conversationId) {
      conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          userId: session.user.id
        }
      });

      if (!conversation) {
        return NextResponse.json(
          { error: 'Conversation not found' },
          { status: 404 }
        );
      }
    } else {
      // Create new conversation
      const legendNames = {
        gandhi: 'Mahatma Gandhi',
        einstein: 'Albert Einstein',
        cleopatra: 'Cleopatra VII'
      };

      conversation = await prisma.conversation.create({
        data: {
          userId: session.user.id,
          legendId: legend,
          title: `Chat with ${legendNames[legend as keyof typeof legendNames] || legend}`,
        }
      });
    }

    // Save user message
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        content: message,
        sender: 'USER'
      }
    });

    let response;
    
    try {
      // Try Groq first (primary option)
      if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your_groq_api_key_here') {
        response = await queryGroq(systemPrompt, message);
      } else {
        throw new Error('Groq API key not configured');
      }
    } catch (groqError) {
      console.log('Groq failed, trying Hugging Face fallback:', groqError);
      
      try {
        // Fallback to Hugging Face
        const fullPrompt = `${systemPrompt}\n\nHuman: ${message}\n\nResponse:`;
        response = await queryHuggingFaceFallback(fullPrompt);
      } catch (hfError) {
        console.log('Hugging Face also failed:', hfError);
        
        // Final fallback to predefined responses
        const fallbackResponses = {
          gandhi: [
            "My friend, the path of truth and non-violence is not always easy, but it is the only path that leads to lasting peace. In my experience, when we respond to hatred with love, we transform not only our enemies but ourselves.\n\nI have learned that true strength lies not in physical force, but in the courage to stand for what is right, even when we stand alone. The means we use must be as pure as the ends we seek.",
            "Remember, we must be the change we wish to see in the world. Every act of kindness, every moment of truth, every gesture of non-violence contributes to the greater good of humanity.\n\nThe practice of satyagraha teaches us that truth combined with non-violence becomes a force more powerful than any weapon. When we hold fast to truth, the universe itself supports our cause.",
            "In the quiet moments of reflection, I have discovered that the most powerful force in the universe is not physical strength or intellectual prowess, but the unwavering commitment to truth and compassion.\n\nTrue leadership comes not from commanding others, but from serving them with humility and dedication. When we lead by example, others naturally follow the path of righteousness."
          ],
          einstein: [
            "The important thing is not to stop questioning. Curiosity has its own reason for existing. The more I learn about the universe, the more I realize how much we still don't know.\n\nImagination is more important than knowledge. Knowledge is limited, but imagination embraces the entire world, stimulating progress and giving birth to evolution.",
            "A person who never made a mistake never tried anything new. In science, as in life, we must be willing to challenge our assumptions and explore new possibilities.\n\nThe universe is not only stranger than we imagine, it is stranger than we can imagine. Yet through the power of human curiosity and scientific inquiry, we continue to unlock its deepest secrets.",
            "I believe that the most beautiful thing we can experience is the mysterious. It is the source of all true art and science. When we lose our sense of wonder, we lose our humanity.\n\nScience without religion is lame, religion without science is blind. Both are necessary for a complete understanding of our place in the cosmos."
          ],
          cleopatra: [
            "Leadership requires both wisdom and strength. A ruler must know when to be firm and when to show mercy, when to speak and when to listen. The art of diplomacy is knowing how to turn enemies into allies.\n\nPower is not given; it is taken and held through intelligence, strategy, and the ability to inspire others. A true leader serves their people while commanding their respect.",
            "In my time, I learned that knowledge is the greatest weapon. Understanding languages, cultures, and the hearts of people - this is what makes a ruler truly powerful.\n\nEgypt's greatness came not just from our monuments and treasures, but from our ability to adapt and thrive in a changing world. A wise ruler must be like the Nile - constant yet ever-changing.",
            "The crown is heavy, but it is the burden of leadership that truly weighs upon a ruler's soul. Every decision affects the lives of thousands, and a pharaoh must be prepared to sacrifice personal desires for the good of the kingdom.\n\nDiplomacy is an art form - knowing when to reveal your strength and when to conceal it, when to make alliances and when to stand alone. These skills have served Egypt well throughout the ages."
          ]
        };
        
        const responses = fallbackResponses[legend as keyof typeof fallbackResponses] || fallbackResponses.gandhi;
        response = responses[Math.floor(Math.random() * responses.length)];
      }
    }

    if (!response) {
      return NextResponse.json(
        { error: 'No response generated' },
        { status: 500 }
      );
    }

    // Clean up the response
    response = response.trim();
    
    // Ensure minimum quality
    if (response.length < 50) {
      const fallbackResponses = {
        gandhi: "Thank you for your question, my friend. In my experience, the path of truth and non-violence teaches us that every challenge is an opportunity for growth and understanding.",
        einstein: "That's a fascinating question! The universe is full of mysteries, and I believe that through curiosity and scientific inquiry, we can continue to unlock its secrets.",
        cleopatra: "Your inquiry touches upon matters of great importance. As a ruler, I have learned that wisdom comes from listening carefully and considering all perspectives before making decisions."
      };
      
      response = fallbackResponses[legend as keyof typeof fallbackResponses] || fallbackResponses.gandhi;
    }

    // Save legend response
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        content: response,
        sender: 'LEGEND'
      }
    });

    // Update conversation timestamp
    await prisma.conversation.update({
      where: { id: conversation.id },
      data: { updatedAt: new Date() }
    });

    return NextResponse.json({ 
      response,
      conversationId: conversation.id
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Final emergency fallback
    return NextResponse.json({ 
      response: "I apologize, but I'm experiencing some technical difficulties at the moment. Please try asking your question again, and I'll do my best to provide you with a thoughtful response."
    });
  }
}