
import { genkit } from 'genkit';
import { openAI } from 'genkitx-openai';

/**
 * Genkit initialization configured for Groq Cloud using the OpenAI-compatible plugin.
 * We use 'llama-3.3-70b-versatile' as the primary model for its speed and multilingual capabilities.
 * Note: genkitx-openai export is 'openAI'.
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
