
import { genkit } from 'genkit';
import { openAI } from 'genkitx-openai';

/**
 * Genkit initialization configured for Groq Cloud.
 * Uses the OpenAI-compatible endpoint via genkitx-openai.
 */
export const ai = genkit({
  plugins: [
    openAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    }),
  ],
  // Use the standard string identifier for the model. 
  // 'openai' is the provider name registered by the genkitx-openai plugin.
  model: 'openai/llama-3.3-70b-versatile',
});
