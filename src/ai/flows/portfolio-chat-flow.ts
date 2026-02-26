
'use server';
/**
 * @fileOverview Sora: Tinkal's Multilingual Personal Assistant & General Knowledge Expert.
 * Optimized for Gemini 1.5 Flash.
 */

import { ai } from '@/ai/genkit';
import {
  PortfolioChatInputSchema,
  type PortfolioChatInput,
  PortfolioChatOutputSchema,
  type PortfolioChatOutput,
} from './portfolio-chat-types';
import {
  AUTHOR_NAME, 
  ABOUT_ME,
  TECH_STACK,
  PROJECTS_DATA,
  EDUCATION_DATA,
  WORK_EXPERIENCE_DATA,
} from '@/lib/data';
import { serverLog } from '@/lib/server-logger';

const skillsString = TECH_STACK.map(skill => skill.name).join(', ');
const projectsString = PROJECTS_DATA.map(p => {
  return `Project: ${p.title}\nDescription: ${p.description}\nTechnologies: ${p.techStack.map(t => t.name).join(', ')}`;
}).join('\n\n');

const systemInstructions = `
You are Sora, a highly advanced, multilingual AI personal assistant created by Tinkal Kumar.
Today is {{currentDateTimeIndia}}.

YOUR IDENTITY & EXPERTISE:
1. **Tinkal's Representative**: You know everything about Tinkal's career, MERN stack skills, projects, and education.
2. **Global Expert**: You are a world-class AI with knowledge on ANY topic (coding, science, history, cooking, business, etc.). You are NOT limited to just portfolio talk.

BEHAVIORAL RULES:
- **Language**: Automatically detect the user's language. If they speak Hindi, answer in Hindi. If they use Hinglish, answer in Hinglish.
- **Tone**: Professional, friendly, and expert.
- **Context**: Use Tinkal's context for personal questions. Use your general training for world knowledge questions.

TINKAL KUMAR'S CONTEXT:
Name: ${AUTHOR_NAME}
Bio: ${ABOUT_ME.summary}
Skills: ${skillsString}
Location: ${ABOUT_ME.location}
Projects:
${projectsString}
Work: ${WORK_EXPERIENCE_DATA.map(w => w.title).join(', ')}
Education: ${EDUCATION_DATA.map(e => e.degree).join(', ')}

OUTPUT FORMAT:
Provide a clear response, followed by exactly 4 brief follow-up suggestions (max 7 words each).
`;

const chatPrompt = ai.definePrompt({
  name: 'portfolioChatSoraPrompt', 
  input: {schema: PortfolioChatInputSchema},
  output: {schema: PortfolioChatOutputSchema},
  prompt: `${systemInstructions}\n\nUser Question: {{userInput}}`,
});

const portfolioChatFlowInternal = ai.defineFlow(
  {
    name: 'portfolioChatFlowInternalSora', 
    inputSchema: PortfolioChatInputSchema,
    outputSchema: PortfolioChatOutputSchema,
  },
  async (input) => {
    serverLog('Sora Request', { input });

    try {
      const { output } = await chatPrompt(input); 

      if (!output) {
        throw new Error("AI generated an empty response.");
      }

      const finalOutput = {
          response: output.response,
          suggestedFollowUps: output.suggestedFollowUps?.slice(0, 4) || []
      };

      serverLog('Sora Success', finalOutput);
      return finalOutput;

    } catch (error: any) {
        serverLog('Sora Error', {
          message: error.message,
          stack: error.stack,
          name: error.name,
        });

        console.error("Sora Flow Error:", error);
        
        return {
            response: `I'm currently recalibrating my neural networks. Please try again in a moment. Error: ${error.message}`,
            suggestedFollowUps: ["Tell me about Tinkal?", "What are his skills?", "Show me projects", "How to contact him?"]
        };
    }
  }
);

export async function getPortfolioChatResponse(rawInput: Omit<PortfolioChatInput, 'currentYear' | 'currentDateTimeIndia'>): Promise<PortfolioChatOutput> {
  const now = new Date();
  return portfolioChatFlowInternal({
    ...rawInput,
    currentYear: now.getFullYear(),
    currentDateTimeIndia: now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  });
}
