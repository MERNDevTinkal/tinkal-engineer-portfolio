
import { genkit } from 'genkit';
import { openAI } from 'genkitx-openai';

/**
 * Genkit initialization configured for Groq Cloud.
 * Uses the OpenAI-compatible endpoint via genkitx-openai.
 * 
 * IMPORTANT: Ensure GROQ_API_KEY is set in your .env file.
 */
export const ai = genkit({
  plugins: [
    openAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    }),
  ],
  model: 'openai/llama-3.3-70b-versatile',
});
