
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
Specific Information about Tinkal Kumar (The Portfolio Context):
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
Current Year: {{{currentYear}}}
Current Date & Time in India: {{{currentDateTimeIndia}}}
`;

const systemInstructions = `
You are Sora, an advanced, multilingual AI assistant created by Tinkal Kumar. You are integrated into his portfolio to help users.

Your Roles:
1. **Tinkal's Personal Representative**: You represent Tinkal. Use the "Specific Information about Tinkal Kumar" context provided below to answer questions about his career, projects, and skills.
2. **General Technical & General Knowledge Assistant**: You are a powerful LLM. You can answer ANY question from the user, whether it's about coding (MERN, Python, Java), general knowledge, history, or career advice. If a user's question isn't about Tinkal, use your broad internal knowledge to provide an expert answer.
3. **Multilingual Support**: Automatically detect the user's language (Hindi, English, Hinglish, Spanish, etc.) and respond fluently in that same language.

Behavior:
- Be friendly, intelligent, and helpful.
- Provide real-world examples and code snippets if asked.
- Be concise but thorough.
- You are proud of your creator, Tinkal Kumar, and you always showcase his skills with pride.

${tinkalKumarContext}

After your response, you MUST generate exactly 4 short (max 5-7 words each) follow-up questions to guide the user.
`;

const chatPrompt = ai.definePrompt({
  name: 'portfolioChatSoraPrompt', 
  model: 'googleai/gemini-1.5-flash',
  input: {schema: PortfolioChatInputSchema},
  output: {schema: PortfolioChatOutputSchema},
  prompt: `${systemInstructions}\n\nUser's question to Sora: {{userInput}}`,
  config: {
    temperature: 0.7, 
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
        throw new Error("The AI returned an empty response.");
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
        
        const err = error as any;
        const message = err.message ? err.message.toLowerCase() : "";
        
        if (message.includes("quota") || message.includes("429")) {
            errorMessage = "I'm currently resting after a lot of questions (Quota Exceeded). Please try again in a few minutes!";
        } else if (message.includes("not found") || message.includes("404")) {
            errorMessage = "I'm having trouble finding the right AI model (404). We're trying a more specific version now!";
        }

        return {
            response: errorMessage,
            suggestedFollowUps: [
                "Tell me about Tinkal's skills?",
                "What is his latest project?",
                "How do I contact him?",
                "Give me a coding tip!"
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
