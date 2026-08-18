import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

// Keep the rest of the portfolio available when optional AI credentials are
// not configured in a development repl.
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint for BMO AI character
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      let reply: string;

      if (openai) {
        // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
        const completion = await openai.chat.completions.create({
          model: "gpt-5",
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

        reply = completion.choices[0]?.message?.content || "Oh no! My circuits got confused! Try asking me again!";
      } else {
        reply = "Mathematical! My chat circuits are in sleep mode, but my face deck is ready for adventures!";
      }

      // Generate audio using ElevenLabs
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

      res.json({
        reply,
        audioUrl
      });

    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ 
        error: "Oh no! Something went wrong with my circuits!",
        reply: "Mathematical! Something went wrong, but I'm still here to help! Try asking me again!"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
