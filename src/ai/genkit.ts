
import { genkit } from 'genkit';
import { openAI } from 'genkitx-openai';

/**
 * Genkit initialization configured for Groq Cloud.
 * We register the specific Groq models so Genkit's registry recognizes them.
 */
export const ai = genkit({
  plugins: [
    openAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
      models: [
        {
          name: 'llama-3.3-70b-versatile',
          label: 'Groq Llama 3.3 70B',
        }
      ]
    }),
  ],
  model: 'openai/llama-3.3-70b-versatile',
});
