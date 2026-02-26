
'use server';
/**
 * @fileOverview Sora: Tinkal's Personal Assistant powered by Groq SDK.
 * Handles multilingual queries and general knowledge expert tasks.
 */

import { ai } from '@/ai/genkit';
import Groq from 'groq-sdk';
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

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const skillsString = TECH_STACK.map(skill => skill.name).join(', ');
const projectsString = PROJECTS_DATA.map(p => {
  return `Project: ${p.title}\nDescription: ${p.description}\nTechnologies: ${p.techStack.map(t => t.name).join(', ')}`;
}).join('\n\n');

const systemInstructions = `
You are Sora, a highly advanced, multilingual AI personal assistant created by Tinkal Kumar.
Today is {{currentDateTimeIndia}}.

YOUR IDENTITY & EXPERTISE:
1. Tinkal's Representative: You know everything about Tinkal's career, MERN stack skills, projects, and education.
2. Global Expert: You are a world-class AI with knowledge on ANY topic (coding, science, history, etc.).

BEHAVIORAL RULES:
- Language: Detect the user's language. If they speak Hindi, answer in Hindi. If they use Hinglish, answer in Hinglish.
- Tone: Professional, friendly, and expert.
- Format: You MUST respond in valid JSON format only.

TINKAL KUMAR'S CONTEXT:
Name: ${AUTHOR_NAME}
Bio: ${ABOUT_ME.summary}
Skills: ${skillsString}
Location: ${ABOUT_ME.location}
Projects:
${projectsString}
Work: ${WORK_EXPERIENCE_DATA.map(w => w.title).join(', ')}
Education: ${EDUCATION_DATA.map(e => e.degree).join(', ')}

OUTPUT JSON STRUCTURE:
{
  "response": "Your actual answer text here",
  "suggestedFollowUps": ["Question 1?", "Question 2?", "Question 3?", "Question 4?"]
}
`;

export async function getPortfolioChatResponse(rawInput: Omit<PortfolioChatInput, 'currentYear' | 'currentDateTimeIndia'>): Promise<PortfolioChatOutput> {
  const now = new Date();
  const currentDateTimeIndia = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const userInput = rawInput.userInput;

  serverLog('Sora Request (Groq SDK)', { userInput });

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: systemInstructions.replace('{{currentDateTimeIndia}}', currentDateTimeIndia),
        },
        {
          role: "user",
          content: userInput,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Empty response from Groq");

    const parsed = JSON.parse(content);
    
    const finalOutput = {
      response: parsed.response || "I'm sorry, I couldn't formulate a proper response.",
      suggestedFollowUps: (parsed.suggestedFollowUps || []).slice(0, 4),
    };

    serverLog('Sora Success (Groq SDK)', finalOutput);
    return finalOutput;

  } catch (error: any) {
    serverLog('Sora Error (Groq SDK)', {
      message: error.message,
      stack: error.stack,
    });

    return {
      response: `I'm having a brief moment of reflection (Groq Connection). Details: ${error.message}`,
      suggestedFollowUps: ["Tell me about Tinkal?", "What are his skills?", "Show me projects", "How to contact him?"]
    };
  }
}
