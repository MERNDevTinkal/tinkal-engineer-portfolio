
import { genkit } from 'genkit';
import { openAI } from 'genkitx-openai';

/**
 * Genkit initialization configured for Groq Cloud using the OpenAI-compatible plugin.
 * We explicitly register the Groq models so Genkit's registry recognizes them.
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
