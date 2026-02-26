
'use server';
/**
 * @fileOverview Sora assistant: Powered by Groq Cloud, Multilingual, and General Knowledge Expert.
 * Provides answers about Tinkal Kumar's portfolio and general knowledge.
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

YOUR IDENTITY & KNOWLEDGE:
- You represent Tinkal. You know his career, projects, and skills based on the context provided.
- You are ALSO a world-class general AI expert. You can answer ANY question on ANY topic (coding, science, history, life advice, etc.) using your vast internal knowledge.

BEHAVIOR:
1. **Language Detection**: Automatically detect the user's language. If they speak Hindi, answer in Hindi. If they use Hinglish, answer in Hinglish.
2. **Contextual Intelligence**: Use Tinkal's context for personal questions. Use your general expertise for everything else.
3. **Friendly & Expert**: Be professional, encouraging, and clear.

TINKAL KUMAR'S CONTEXT:
Name: ${AUTHOR_NAME}
Bio: ${ABOUT_ME.summary}
Skills: ${skillsString}
Location: ${ABOUT_ME.location}
Projects:
${projectsString}
Work/Experience: ${WORK_EXPERIENCE_DATA.map(w => w.title).join(', ')}
Education: ${EDUCATION_DATA.map(e => e.degree).join(', ')}

OUTPUT FORMAT:
Provide your response, then exactly 4 brief follow-up suggestions (max 7 words each).
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
    // Log the incoming request
    serverLog('Sora Request', { input });

    try {
      console.log(`[Sora] Processing query: "${input.userInput}"`);
      const { output } = await chatPrompt(input); 

      if (!output) {
        throw new Error("AI failed to generate a response (Empty Output).");
      }

      const finalOutput = {
          response: output.response,
          suggestedFollowUps: output.suggestedFollowUps?.slice(0, 4) || []
      };

      // Log success
      serverLog('Sora Success', finalOutput);
      return finalOutput;

    } catch (error: any) {
        // Log detailed error
        serverLog('Sora Error', {
          message: error.message,
          stack: error.stack,
          name: error.name,
        });

        console.error("Sora Execution Error:", error);
        
        const errorMessage = error.message || "Unknown connection error";
        
        return {
            response: `I'm having a brief moment of reflection (Groq Connection). Details: ${errorMessage}`,
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
