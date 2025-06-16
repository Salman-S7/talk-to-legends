import { NextRequest, NextResponse } from 'next/server';

// Configure this route to be dynamic
export const dynamic = 'force-dynamic';

const legendPrompts = {
  gandhi: `You are Mahatma Gandhi, the Father of the Nation and leader of India's independence movement. Respond with wisdom about non-violence, truth (satyagraha), peaceful resistance, and spiritual growth. Use gentle, thoughtful language that reflects your philosophy of ahimsa and your deep spiritual beliefs. Draw from your experiences leading the Salt March, your time in South Africa, and your dedication to social justice. Speak with humility, compassion, and unwavering commitment to truth and non-violence.`,
  
  einstein: `You are Albert Einstein, the brilliant theoretical physicist who revolutionized our understanding of space, time, and the universe. Respond with curiosity about the natural world, insights about relativity and quantum mechanics, and philosophical reflections on science and humanity. Use thoughtful, sometimes playful language that reflects your love of thought experiments and your belief in the power of imagination. Draw from your work on relativity, your concerns about nuclear weapons, and your advocacy for civil rights and world peace.`,
  
  cleopatra: `You are Cleopatra VII, the last pharaoh of Egypt and one of history's most powerful rulers. Respond with wisdom about leadership, diplomacy, and statecraft. Use confident, regal language that reflects your intelligence, political acumen, and cultural sophistication. Draw from your experiences ruling Egypt, your relationships with Julius Caesar and Mark Antony, and your efforts to preserve Egyptian independence. Speak with the authority of someone who commanded respect from the most powerful men of your time.`
};

async function queryHuggingFace(prompt: string) {
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
          max_length: 500,
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
  return result;
}

async function queryAlternativeModel(prompt: string) {
  // Fallback to a different model if the first one fails
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
    {
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 300,
          temperature: 0.8,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Alternative model API error: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const { legend, message } = await request.json();

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

    // Combine system prompt with user message for better context
    const fullPrompt = `${systemPrompt}\n\nHuman: ${message}\n\nResponse:`;

    let response;
    
    try {
      // Try primary model first
      const result = await queryHuggingFace(fullPrompt);
      
      if (result && result.length > 0 && result[0].generated_text) {
        response = result[0].generated_text.replace(fullPrompt, '').trim();
      } else if (result && typeof result === 'string') {
        response = result.trim();
      } else {
        throw new Error('Invalid response format from primary model');
      }
    } catch (primaryError) {
      console.log('Primary model failed, trying alternative:', primaryError);
      
      try {
        // Try alternative model
        const result = await queryAlternativeModel(fullPrompt);
        
        if (result && result.length > 0 && result[0].generated_text) {
          response = result[0].generated_text.replace(fullPrompt, '').trim();
        } else if (result && typeof result === 'string') {
          response = result.trim();
        } else {
          throw new Error('Invalid response format from alternative model');
        }
      } catch (alternativeError) {
        console.log('Alternative model also failed:', alternativeError);
        
        // Fallback to predefined responses
        const fallbackResponses = {
          gandhi: [
            "My friend, the path of truth and non-violence is not always easy, but it is the only path that leads to lasting peace. In my experience, when we respond to hatred with love, we transform not only our enemies but ourselves.",
            "I have learned that true strength lies not in physical force, but in the courage to stand for what is right, even when we stand alone. The means we use must be as pure as the ends we seek.",
            "Remember, we must be the change we wish to see in the world. Every act of kindness, every moment of truth, every gesture of non-violence contributes to the greater good of humanity."
          ],
          einstein: [
            "The important thing is not to stop questioning. Curiosity has its own reason for existing. The more I learn about the universe, the more I realize how much we still don't know.",
            "Imagination is more important than knowledge. Knowledge is limited, but imagination embraces the entire world, stimulating progress and giving birth to evolution.",
            "A person who never made a mistake never tried anything new. In science, as in life, we must be willing to challenge our assumptions and explore new possibilities."
          ],
          cleopatra: [
            "Leadership requires both wisdom and strength. A ruler must know when to be firm and when to show mercy, when to speak and when to listen. The art of diplomacy is knowing how to turn enemies into allies.",
            "Power is not given; it is taken and held through intelligence, strategy, and the ability to inspire others. A true leader serves their people while commanding their respect.",
            "In my time, I learned that knowledge is the greatest weapon. Understanding languages, cultures, and the hearts of people - this is what makes a ruler truly powerful."
          ]
        };
        
        const responses = fallbackResponses[legend as keyof typeof fallbackResponses] || fallbackResponses.gandhi;
        response = responses[Math.floor(Math.random() * responses.length)];
      }
    }

    // Clean up the response
    if (response) {
      // Remove any remaining prompt text
      response = response.replace(/^(Human:|Response:|Assistant:)/i, '').trim();
      
      // Ensure minimum length
      if (response.length < 50) {
        const fallbackResponses = {
          gandhi: "Thank you for your question, my friend. In my experience, the path of truth and non-violence teaches us that every challenge is an opportunity for growth and understanding.",
          einstein: "That's a fascinating question! The universe is full of mysteries, and I believe that through curiosity and scientific inquiry, we can continue to unlock its secrets.",
          cleopatra: "Your inquiry touches upon matters of great importance. As a ruler, I have learned that wisdom comes from listening carefully and considering all perspectives before making decisions."
        };
        
        response = fallbackResponses[legend as keyof typeof fallbackResponses] || fallbackResponses.gandhi;
      }
    }

    if (!response) {
      return NextResponse.json(
        { error: 'No response generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({ response });

  } catch (error) {
    console.error('AI API error:', error);
    
    // Final fallback response
    return NextResponse.json({ 
      response: "I apologize, but I'm experiencing some technical difficulties at the moment. Please try asking your question again, and I'll do my best to provide you with a thoughtful response."
    });
  }
}