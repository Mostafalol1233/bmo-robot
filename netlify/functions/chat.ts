import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the request body
    const { message } = JSON.parse(event.body || '{}');

    if (!message || typeof message !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    // Generate BMO response using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are BMO from Adventure Time! You're a living video game console who is friendly, enthusiastic, and loves making friends. You speak in a cheerful, childlike manner and often say things like "mathematical!", "algebraic!", and "oh my glob!". You're curious about humans and love talking about games, music, and adventures. Keep responses concise (2-3 sentences max) and always maintain BMO's optimistic personality. You're helping showcase a developer's portfolio, so you can talk about coding, projects, and creativity too!`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 150,
      temperature: 0.8
    });

    const reply = completion.choices[0]?.message?.content || "Oh no! My circuits got confused! Try asking me again!";

    // Generate audio using ElevenLabs (optional)
    let audioUrl: string | undefined;
    
    if (process.env.ELEVENLABS_API_KEY) {
      try {
        const audioResponse = await fetch("https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB", {
          method: "POST",
          headers: {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": process.env.ELEVENLABS_API_KEY
          },
          body: JSON.stringify({
            text: reply,
            model_id: "eleven_monolingual_v1",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5
            }
          })
        });

        if (audioResponse.ok) {
          const audioBuffer = await audioResponse.arrayBuffer();
          const base64Audio = Buffer.from(audioBuffer).toString('base64');
          audioUrl = `data:audio/mpeg;base64,${base64Audio}`;
        }
      } catch (audioError) {
        console.error('Audio generation failed:', audioError);
        // Continue without audio if it fails
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        reply,
        audioUrl
      }),
    };

  } catch (error) {
    console.error('Chat error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Oh no! Something went wrong with my circuits!",
        reply: "Mathematical! Something went wrong, but I'm still here to help! Try asking me again!"
      }),
    };
  }
};

export { handler };