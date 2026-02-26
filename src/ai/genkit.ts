
import { genkit } from 'genkit';
import { openAI } from 'genkitx-openai';

/**
 * Genkit initialization configured for Groq Cloud.
 * Uses the OpenAI-compatible endpoint via genkitx-openai.
 * 
 * IMPORTANT: This uses the GROQ_API_KEY provided in the .env file.
 */
export const ai = genkit({
  plugins: [
    openAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    }),
  ],
  // Using Llama 3.3 70B via Groq for high-speed, high-quality multilingual responses.
  model: 'openai/llama-3.3-70b-versatile',
});
