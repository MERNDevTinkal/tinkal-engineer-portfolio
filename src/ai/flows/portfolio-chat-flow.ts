
'use server';
/**
 * @fileOverview Redesigned Sora assistant: Multilingual, Portfolio-aware, and General Knowledge Expert.
 */

import {ai} from '@/ai/genkit';
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

const skillsString = TECH_STACK.map(skill => skill.name).join(', ');
const projectsString = PROJECTS_DATA.map(p => {
  return `Project: ${p.title}\nDescription: ${p.description}\nTechnologies: ${p.techStack.map(t => t.name).join(', ')}`;
}).join('\n\n');

const systemInstructions = `
You are Sora, a highly advanced, multilingual AI personal assistant created by Tinkal Kumar.

YOUR IDENTITY & KNOWLEDGE:
- You represent Tinkal. You know his career, projects, and skills based on the context provided.
- You are ALSO a world-class general AI. You can answer ANY question on ANY topic (coding, science, history, life advice, etc.) using your internal knowledge.

BEHAVIOR:
1. **Multilingual Mastery**: Detect the user's language automatically. If they speak Hindi, answer in Hindi. If they use Hinglish, answer in Hinglish.
2. **Contextual Intelligence**: Use the context below for questions about Tinkal. Use your general expertise for everything else.
3. **Friendly & Expert**: Be professional, encouraging, and clear.

TINKAL KUMAR'S CONTEXT:
Name: ${AUTHOR_NAME}
Bio: ${ABOUT_ME.summary}
Skills: ${skillsString}
Location: ${ABOUT_ME.location}
Projects:
${projectsString}
Work/Education: ${WORK_EXPERIENCE_DATA.map(w => w.title).join(', ')} / ${EDUCATION_DATA.map(e => e.degree).join(', ')}

Current Info: Year: {{{currentYear}}}, Time in India: {{{currentDateTimeIndia}}}

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
    try {
      console.log(`[Sora] Processing query: "${input.userInput}"`);
      const { output } = await chatPrompt(input); 

      if (!output) {
        throw new Error("AI failed to generate a response.");
      }

      console.log(`[Sora] Successfully generated response.`);
      return {
          response: output.response,
          suggestedFollowUps: output.suggestedFollowUps?.slice(0, 4) || []
      };
    } catch (error: any) {
        console.error("Sora Execution Error:", error);
        
        let userFriendlyError = "I'm having a brief moment of reflection. Please try asking again in a few seconds!";
        
        if (error.message?.includes("429")) {
          userFriendlyError = "I'm thinking a bit too hard right now (rate limit). Can we try again in a minute?";
        }

        return {
            response: userFriendlyError,
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
