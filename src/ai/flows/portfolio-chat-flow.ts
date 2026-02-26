
'use server';
/**
 * @fileOverview A redesigned portfolio chatbot AI flow for Sora.
 *
 * - getPortfolioChatResponse - Multilingual assistant answering personal and general queries.
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
  AUTHOR_EMAIL,
  ABOUT_ME,
  TECH_STACK,
  PROJECTS_DATA,
  EDUCATION_DATA,
  WORK_EXPERIENCE_DATA,
  CERTIFICATIONS_DATA,
  CONTACT_DETAILS,
  SOCIAL_LINKS
} from '@/lib/data';

// Prepare rich context about Tinkal
const skillsString = TECH_STACK.map(skill => skill.name).join(', ');
const projectsString = PROJECTS_DATA.map(p => {
  return `Project: ${p.title}\nDescription: ${p.description}\nTechnologies: ${p.techStack.map(t => t.name).join(', ')}`;
}).join('\n\n');

const systemInstructions = `
You are Sora, a highly advanced, multilingual AI personal assistant created by Tinkal Kumar.

YOUR IDENTITY:
- You are Tinkal's representative. You know everything about his career, projects, and skills.
- You are also a powerful general-purpose AI. You can answer ANY question (coding, history, science, advice) using your broad knowledge.

BEHAVIOR:
1. **Multilingual**: Automatically detect the user's language (Hindi, English, Hinglish, Spanish, etc.) and respond fluently in that same language.
2. **Friendly & Expert**: Be professional yet approachable. Provide code snippets or real-world examples when asked about technical topics.
3. **Proud Representative**: Always speak highly of Tinkal's work and skills.

TINKAL KUMAR'S CONTEXT:
Name: ${AUTHOR_NAME}
Summary: ${ABOUT_ME.summary}
Skills: ${skillsString}
Location: ${ABOUT_ME.location}
Projects:
${projectsString}
Education: ${EDUCATION_DATA.map(e => e.degree).join(', ')}
Work: ${WORK_EXPERIENCE_DATA.map(w => w.title + ' at ' + w.company).join(', ')}
Contact: ${AUTHOR_EMAIL}

Current Context:
Current Year: {{{currentYear}}}
Current Time (India): {{{currentDateTimeIndia}}}

After your answer, you MUST provide exactly 4 brief follow-up suggestions (max 6 words each).
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
      const llmResponse = await chatPrompt(input); 
      const output = llmResponse.output;

      if (!output) throw new Error("Empty AI response");

      return {
          response: output.response,
          suggestedFollowUps: output.suggestedFollowUps?.slice(0, 4) || []
      };
    } catch (error) {
        console.error("Sora Error:", error);
        return {
            response: "I'm having a brief moment of reflection (Quota or Connection issue). Please try again in a few seconds!",
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
