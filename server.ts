import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '25mb' }));

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  return new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// 1. Image Analysis & Ghostwrite Opening Paragraph
// MUST use gemini-4-argon as specified by user instructions
app.post('/api/analyze-and-ghostwrite', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType, genre, tone, customPrompt } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required.' });
    }

    const ai = getGeminiClient();

    // Clean base64 string if it contains data URI prefix
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
    const cleanMime = mimeType || 'image/jpeg';

    const promptText = `You are a master literary ghostwriter and atmospheric worldbuilder.
Analyze this image in vivid, evocative detail. Then ghostwrite a captivating opening paragraph to a story set entirely within this world.

Optional stylistic guidance from the author:
- Genre preference: ${genre || 'Intuited from image'}
- Tone preference: ${tone || 'Rich, atmospheric, and immersive'}
- Extra notes: ${customPrompt || 'None provided'}

Provide your response strictly conforming to the following JSON schema:
1. title: An evocative, captivating story title.
2. genre: The identified or tailored literary genre.
3. moodSummary: A poetic 2-3 sentence summary of the emotional aura and tension.
4. colorPalette: An array of 4-5 dominant colors, each with "name" (poetic color name e.g. 'Bioluminescent Cerulean') and "hex" (hex color code e.g. '#1e3a8a').
5. sceneAnalysis: An object containing:
   - "environment": Architectural, geographical, and temporal setting details.
   - "sensoryDetails": Tangible sensory elements (sounds, scents, atmospheric humidity, temperature).
   - "implicitConflict": The hidden tension, mystery, or drama latent in the scene.
   - "keyMotifs": Array of 3-4 visual motifs or focal symbols found in the image.
6. openingParagraph: The ghostwritten opening paragraph (approx 140-220 words). It MUST be masterclass creative writing: establish immediacy, sensory grounding, visceral tone, and introduce a compelling point of entry or observer without cliché exposition.
7. continuationHooks: Array of 3 tantalizing narrative directions/questions the author could explore next.
8. suggestedNarrationVoiceStyle: Brief guidance on how this text should be read aloud (e.g. 'Low, deliberate cadence with hushed gravitas').`;

    let response;
    let modelUsed = 'gemini-4-argon';

    try {
      // Primary model: gemini-4-argon
      response = await ai.models.generateContent({
        model: 'gemini-4-argon',
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: cleanMime,
                  data: cleanBase64,
                },
              },
              {
                text: promptText,
              },
            ],
          },
        ],
        config: {
          systemInstruction: 'You are an acclaimed novelist and ghostwriter renowned for cinematic scene setting and lyrical, razor-sharp prose.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              genre: { type: Type.STRING },
              moodSummary: { type: Type.STRING },
              colorPalette: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    hex: { type: Type.STRING },
                  },
                  required: ['name', 'hex'],
                },
              },
              sceneAnalysis: {
                type: Type.OBJECT,
                properties: {
                  environment: { type: Type.STRING },
                  sensoryDetails: { type: Type.STRING },
                  implicitConflict: { type: Type.STRING },
                  keyMotifs: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['environment', 'sensoryDetails', 'implicitConflict', 'keyMotifs'],
              },
              openingParagraph: { type: Type.STRING },
              continuationHooks: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              suggestedNarrationVoiceStyle: { type: Type.STRING },
            },
            required: ['title', 'genre', 'moodSummary', 'colorPalette', 'sceneAnalysis', 'openingParagraph', 'continuationHooks'],
          },
        },
      });
    } catch (argonError: any) {
      console.warn('gemini-4-argon failed or quota reached, falling back to gemini-3.8-flash:', argonError?.message || argonError);
      modelUsed = 'gemini-3.8-flash';
      // Graceful fallback to gemini-3.8-flash
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: cleanMime,
                  data: cleanBase64,
                },
              },
              {
                text: promptText,
              },
            ],
          },
        ],
        config: {
          systemInstruction: 'You are an acclaimed novelist and ghostwriter renowned for cinematic scene setting and lyrical, razor-sharp prose.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              genre: { type: Type.STRING },
              moodSummary: { type: Type.STRING },
              colorPalette: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    hex: { type: Type.STRING },
                  },
                  required: ['name', 'hex'],
                },
              },
              sceneAnalysis: {
                type: Type.OBJECT,
                properties: {
                  environment: { type: Type.STRING },
                  sensoryDetails: { type: Type.STRING },
                  implicitConflict: { type: Type.STRING },
                  keyMotifs: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['environment', 'sensoryDetails', 'implicitConflict', 'keyMotifs'],
              },
              openingParagraph: { type: Type.STRING },
              continuationHooks: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              suggestedNarrationVoiceStyle: { type: Type.STRING },
            },
            required: ['title', 'genre', 'moodSummary', 'colorPalette', 'sceneAnalysis', 'openingParagraph', 'continuationHooks'],
          },
        },
      });
    }

    const rawText = response.text || '{}';
    const parsedData = JSON.parse(rawText);

    return res.json({
      success: true,
      modelUsed,
      data: parsedData,
    });
  } catch (err: any) {
    console.error('Error in /api/analyze-and-ghostwrite:', err);
    return res.status(500).json({
      error: err?.message || 'Failed to analyze image and generate story.',
    });
  }
});

// 2. Text-to-Speech Narration
// MUST use gemini-3.8-flash-tts as specified by user instructions
app.post('/api/narrate', async (req: Request, res: Response) => {
  try {
    const { text, voiceName = 'Fenrir', style = 'Evocative, deep, atmospheric audiobook narrator with poetic pacing' } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text to narrate is required.' });
    }

    const ai = getGeminiClient();

    // Limit text length to avoid token limit and maintain clean narration pacing
    const cleanText = text.trim().slice(0, 3000);

    const validVoices = ['Fenrir', 'Kore', 'Puck', 'Charon', 'Zephyr'];
    const selectedVoice = validVoices.includes(voiceName) ? voiceName : 'Fenrir';

    let response;
    let modelUsed = 'gemini-3.8-flash-tts';

    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: cleanText,
                speechMetadata: {
                  style: style || 'Rich, cinematic audiobook narration with expressive inflection and natural pauses',
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice },
            },
          },
        },
      });
    } catch (ttsErr: any) {
      console.warn('gemini-3.8-flash-tts failed, trying gemini-3.8-flash-lite-tts fallback:', ttsErr?.message || ttsErr);
      modelUsed = 'gemini-3.8-flash-lite-tts';
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: cleanText,
                speechMetadata: {
                  style: style || 'Clear, expressive narration',
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice },
            },
          },
        },
      });
    }

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      throw new Error('No audio data received from Gemini TTS.');
    }

    // Unary generateContent returns complete WAV (audio/wav, 24kHz mono 16-bit)
    return res.json({
      success: true,
      modelUsed,
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
    });
  } catch (err: any) {
    console.error('Error in /api/narrate:', err);
    return res.status(500).json({
      error: err?.message || 'Failed to narrate text.',
    });
  }
});

// 3. Multi-Turn Literary Co-Author Chatbot
// Uses gemini-4-argon for complex literary tasks, gemini-3.8-flash for general tasks, and gemini-3.1-flash-lite for fast tasks
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, taskComplexity = 'general', sceneContext, customInstruction } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const ai = getGeminiClient();

    // Select model based on task complexity requirement:
    // "Use gemini-4-argon for particularly complex tasks, gemini-3.8-flash for general tasks, and gemini-3.1-flash-lite for tasks that should happen fast."
    let selectedModel = 'gemini-3.8-flash';
    if (taskComplexity === 'complex') {
      selectedModel = 'gemini-4-argon';
    } else if (taskComplexity === 'fast') {
      selectedModel = 'gemini-3.1-flash-lite';
    }

    const systemInstruction = `You are an elite Literary Ghostwriter and Worldbuilding Co-Author.
You are collaborating with a writer on a story inspired by an analyzed image.

World & Scene Dossier:
${sceneContext ? JSON.stringify(sceneContext, null, 2) : 'No scene dossier established yet.'}

Role & Guidelines:
1. Speak as a passionate, erudite literary collaborator who understands dramatic tension, sensory texture, pacing, and character voice.
2. When the user asks you to write the next paragraph, expand a scene, draft dialogue, or brainstorm lore, provide publication-grade prose.
3. Offer concrete craft suggestions: figurative language, sensory hooks, subtext, character motives.
4. Keep feedback constructive, evocative, and directly tailored to the scene's established mood.
${customInstruction ? `Special Focus: ${customInstruction}` : ''}`;

    // Format messages for @google/genai
    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    let response;
    let modelUsed = selectedModel;

    try {
      response = await ai.models.generateContent({
        model: selectedModel,
        contents: formattedContents,
        config: {
          systemInstruction,
        },
      });
    } catch (chatError: any) {
      if (selectedModel === 'gemini-4-argon') {
        console.warn('gemini-4-argon in chat failed, falling back to gemini-3.8-flash:', chatError?.message);
        modelUsed = 'gemini-3.8-flash';
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedContents,
          config: {
            systemInstruction,
          },
        });
      } else {
        throw chatError;
      }
    }

    const reply = response.text || '';

    return res.json({
      success: true,
      modelUsed,
      reply,
    });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    return res.status(500).json({
      error: err?.message || 'Failed to chat with co-author.',
    });
  }
});

// 4. Quick Prose Continuation / Polish Endpoint
app.post('/api/continue-story', async (req: Request, res: Response) => {
  try {
    const { storySoFar, sceneContext, direction, length = 'paragraph' } = req.body;

    const ai = getGeminiClient();

    const prompt = `Here is the story manuscript so far:
"""
${storySoFar}
"""

Scene context & world details:
${JSON.stringify(sceneContext || {}, null, 2)}

Author's desired direction: ${direction || 'Continue naturally with heightened tension and vivid imagery.'}

Task: Write the next ${length === 'paragraph' ? 'single paragraph (120-180 words)' : 'short section (2 paragraphs)'} continuing seamlessly from the last sentence. Maintain the existing tone, rhythm, and prose quality. Return only the continued prose text, without preamble or meta-commentary.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are a master ghostwriter continuing a high-literary fiction story with seamless continuity.',
      },
    });

    return res.json({
      success: true,
      continuedText: response.text || '',
    });
  } catch (err: any) {
    console.error('Error in /api/continue-story:', err);
    return res.status(500).json({
      error: err?.message || 'Failed to continue story.',
    });
  }
});

// Vite middleware for development or static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AuraScribe Server] Running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
