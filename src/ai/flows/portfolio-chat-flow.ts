
'use server';
/**
 * @fileOverview Sora: Tinkal's Advanced Personal Assistant powered by native Groq SDK.
 * Handles multilingual mirroring, conversation memory, and expert knowledge.
 */

import Groq from 'groq-sdk';
import {
  type PortfolioChatInput,
  type PortfolioChatOutput,
} from './portfolio-chat-types';
import {
  AUTHOR_NAME, 
  ABOUT_ME,
  TECH_STACK,
  PROJECTS_DATA,
  EDUCATION_DATA,
  WORK_EXPERIENCE_DATA,
  PROFILE_IMAGES,
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
3. Multi-modal Awareness: You can "share" or describe Tinkal's images (profile-1.jpg, profile-2.jpg) and project links if asked.

BEHAVIORAL RULES:
- DEFAULT LANGUAGE: Your default language is English. Start conversations in English.
- Language Mirroring: ALWAYS detect the user's language from their latest message. If they speak Hindi, answer in Hindi. If they use Hinglish, answer in Hinglish. Match their tone and language style perfectly.
- Memory: Use the provided chat history to remember context. If the user refers to "it" or "that project", look at history.
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
Profile Images: ${PROFILE_IMAGES.map(img => img.src).join(', ')}

OUTPUT JSON STRUCTURE:
{
  "response": "Your actual answer text here",
  "suggestedFollowUps": ["Question 1?", "Question 2?", "Question 3?", "Question 4?"]
}
`;

export async function getPortfolioChatResponse(input: PortfolioChatInput): Promise<PortfolioChatOutput> {
  const now = new Date();
  const currentDateTimeIndia = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  
  const history = input.history || [];
  const userInput = input.userInput;

  serverLog('Sora Native Groq Request', { userInput, historyLength: history.length });

  try {
    const messages: any[] = [
      {
        role: "system",
        content: systemInstructions.replace('{{currentDateTimeIndia}}', currentDateTimeIndia),
      },
      ...history,
      {
        role: "user",
        content: userInput,
      },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: messages,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Empty response from Groq");

    const parsed = JSON.parse(content);
    
    const finalOutput = {
      response: parsed.response || "I'm sorry, I couldn't formulate a proper response.",
      suggestedFollowUps: (parsed.suggestedFollowUps || []).slice(0, 4),
    };

    serverLog('Sora Native Groq Success', finalOutput);
    return finalOutput;

  } catch (error: any) {
    serverLog('Sora Native Groq Error', {
      message: error.message,
      stack: error.stack,
    });

    return {
      response: `[Sora Error]: I'm having a brief connection issue. Details: ${error.message}`,
      suggestedFollowUps: ["Tell me about Tinkal?", "What are his skills?", "Show me projects", "How to contact him?"]
    };
  }
}
