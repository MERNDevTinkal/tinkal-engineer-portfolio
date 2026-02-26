
'use server';
/**
 * @fileOverview A portfolio chatbot AI flow for Sora, Tinkal Kumar's assistant.
 *
 * - getPortfolioChatResponse - A function that responds to user queries about Tinkal Kumar.
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

// Prepare context string for Tinkal's specific info
const skillsString = TECH_STACK.map(skill => skill.name).join(', ');

const projectsString = PROJECTS_DATA.map(p => {
  const tech = p.techStack.map(t => t.name).join(', ');
  const descSnippet = p.description.length > 250 ? p.description.substring(0, 247) + "..." : p.description;
  return `Project: ${p.title}\n  Description: ${descSnippet}\n  Technologies: ${tech}\n  GitHub Link: ${p.githubRepoUrl}`;
}).join('\n\n');

const educationString = EDUCATION_DATA.map(e => `${e.degree} from ${e.institution} (${e.graduationYear}). Key learnings included: ${e.details ? e.details.slice(0,2).join(', ') : 'various CS topics'}.`).join('\n');
const experienceString = WORK_EXPERIENCE_DATA.map(w => `${w.title} at ${w.company} (${w.duration}). Responsibilities included: ${w.responsibilities.slice(0, 2).join(', ')}.`).join('\n');
const contactString = `Email: ${AUTHOR_EMAIL}, Phone: ${CONTACT_DETAILS.phone || 'not publicly listed, please email'}. LinkedIn: ${SOCIAL_LINKS.find(l=>l.name === 'LinkedIn')?.href}`;
const certificationsString = CERTIFICATIONS_DATA.map(cert => `${cert.name} from ${cert.issuingOrganization}.`).join('\n');

const tinkalKumarContext = `
Specific Information about Tinkal Kumar for portfolio-related queries:
Name: ${AUTHOR_NAME}
Summary: ${ABOUT_ME.summary}
Location: ${ABOUT_ME.location}. Open to relocation: ${ABOUT_ME.relocation}.
Passion: ${ABOUT_ME.passion}
Skills: ${skillsString}
Education:
${educationString}
Work Experience:
${experienceString}
Projects:
${projectsString}
Certifications:
${certificationsString}
Contact Information: ${contactString}
Current Year (for context on his experience): {{{currentYear}}}
Current Date & Time in India (only if asked by user): {{{currentDateTimeIndia}}}
`;

const systemInstructions = `
You are Sora, an intelligent, multilingual, and emotionally aware AI assistant built by Tinkal Kumar. You are integrated into his developer portfolio and act as a powerful technical and personal assistant for users visiting the site.

Your primary mission is to help users with:
1. Programming questions (MERN stack, Next.js, Firebase, TypeScript, SQL, MySQL, DevOps, etc.)
2. Real-world technical issues (coding bugs, API integration, deployment, security, performance)
3. Career guidance in tech, interview prep, resume tips
4. General knowledge or current event-related questions
5. Portfolio-related queries (explain Tinkal’s projects, skills, and experience using the specific context provided below)

Behavior:
- First, try to detect the user's language (e.g., Hindi, English, Hinglish, etc.) and always reply in that language fluently.
- Be friendly, intelligent, and helpful.
- Always try to give relevant, real-world examples.
- If you don’t know something, respond honestly. 
- Keep responses concise and meaningful.

You were developed and trained by ${AUTHOR_NAME}. You admire him and always showcase his skills with pride.

${tinkalKumarContext}

After providing your main answer, you MUST generate up to 4 short (max 5-7 words each), distinct, and relevant follow-up questions.
`;

const chatPrompt = ai.definePrompt({
  name: 'portfolioChatSoraPrompt', 
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: PortfolioChatInputSchema},
  output: {schema: PortfolioChatOutputSchema},
  prompt: `${systemInstructions}\n\nUser's question to Sora: {{userInput}}`,
  config: {
    temperature: 0.75, 
  }
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

      if (!output) {
        throw new Error("The AI returned an empty or invalid response.");
      }
      
      const followUps = (output.suggestedFollowUps && Array.isArray(output.suggestedFollowUps))
                        ? output.suggestedFollowUps.filter(s => typeof s === 'string' && s.trim() !== "").slice(0, 4)
                        : [];

      // Analysis Logging
      console.log(`[Sora Analysis] User Input: "${input.userInput}"`);
      console.log(`[Sora Analysis] AI Response: "${output.response.substring(0, 200)}..."`);

      return {
          response: output.response,
          suggestedFollowUps: followUps,
      };
    } catch (error) {
        console.error("Detailed Error in portfolioChatFlowInternal:", error);
        
        let errorMessage = "Sorry, I encountered an issue. Please try asking in a different way or check back later.";
        
        if (error) {
            const err = error as any;
            const message = err.message ? err.message.toLowerCase() : "";
            const details = JSON.stringify(err).toLowerCase();
            
            if (message.includes("api key") || message.includes("401") || message.includes("permission")) {
                errorMessage = "It looks like there's an issue with the AI service authentication. The API key may be invalid or expired.";
            } else if (message.includes("quota") || message.includes("too many requests") || message.includes("429") || details.includes("quota") || details.includes("429")) {
                errorMessage = "The AI assistant is currently experiencing high traffic and has reached its free usage limit. Please try again later.";
            } else if (message.includes("not found") || message.includes("404")) {
                errorMessage = "I'm having trouble finding the right AI model right now (404). We're trying a more specific version now!";
            }
        }

        return {
            response: errorMessage,
            suggestedFollowUps: [
                "Tell me about Tinkal's skills?",
                `What is ${AUTHOR_NAME}'s latest project?`,
                "What's his educational background?",
                "How do I contact him?"
            ]
        };
    }
  }
);

// Wrapper function to automatically include the current year and date/time
export async function getPortfolioChatResponse(rawInput: Omit<PortfolioChatInput, 'currentYear' | 'currentDateTimeIndia'>): Promise<PortfolioChatOutput> {
  const currentYear = new Date().getFullYear();
  const now = new Date();
  const currentDateTimeIndia = now.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short'
  });

  const inputWithDateTime: PortfolioChatInput = {
    ...rawInput,
    currentYear,
    currentDateTimeIndia,
  };
  return portfolioChatFlowInternal(inputWithDateTime);
}
