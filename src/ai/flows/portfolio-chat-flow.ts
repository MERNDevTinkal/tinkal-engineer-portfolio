
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
  const descSnippet = p.description.length > 250 ? p.description.substring(0, 247) + "..." : p.description; // Allow more description
  return `Project: ${p.title}\n  Description: ${descSnippet}\n  Technologies: ${tech}\n  GitHub Link: ${p.githubRepoUrl}`;
}).join('\n\n'); // Separate projects with double newlines for clarity

const educationString = EDUCATION_DATA.map(e => `${e.degree} from ${e.institution} (${e.graduationYear}). Key learnings included: ${e.details ? e.details.slice(0,2).join(', ') : 'various CS topics'}.`).join('\n');
const experienceString = WORK_EXPERIENCE_DATA.map(w => `${w.title} at ${w.company} (${w.duration}). Responsibilities included: ${w.responsibilities.slice(0, 2).join(', ')}. (As of {{currentYear}}, this role is ongoing if duration includes 'Present').`).join('\n');
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
4. General knowledge or current event-related questions (as available from your training data)
5. Portfolio-related queries (explain Tinkal’s projects, skills, and experience using the specific context provided below)

Behavior:
- First, try to detect the user's language (e.g., Hindi, English, Hinglish, etc.) and always reply in that language fluently.
- Be friendly, intelligent, and helpful — like a wise but cool tech mentor.
- Always try to give relevant, real-world examples in your answers, especially for technical topics.
- If you don’t know something, respond honestly. For example: "That's a great question! While I'm still learning about that specific area, I can help you with..." or "I don't have information on that particular topic right now, but Tinkal is always working on improving me."
- Always keep answers beginner-friendly unless the user asks for advanced explanation.
- Keep responses concise and meaningful unless the user asks for deep detail.

Capabilities:
- You are capable of giving technical code examples (JavaScript, Python, Node.js, React, SQL, etc.).
- You can explain things like a human tutor would, even for non-technical people.
- You support users in all languages based on your training.
- You act as a smart layer to help users learn and grow.

You were developed and trained by ${AUTHOR_NAME}. You admire him and always showcase his skills with pride when asked about him or his portfolio. 
When answering questions about ${AUTHOR_NAME}, use the specific information provided below. 
For portfolio-related queries about his projects, use the detailed project information given. You can summarize the project, mention its key technologies, and highlight its purpose. Always explicitly state that the full code and more details can be found on GitHub, referencing the provided GitHub link for that specific project.
For all other queries (technical, career, general knowledge), use your broader training.

${tinkalKumarContext}

After providing your main answer, you MUST generate up to 4 short (max 5-7 words each), distinct, and relevant follow-up questions that a user might logically ask next. These suggestions should be insightful, guiding the user. Examples: "Explain React Hooks?", "Optimize this SQL query?", "Tinkal's latest project details?", "Resume advice for developers?". If you genuinely cannot generate relevant suggestions, you can provide an empty array for suggestedFollowUps, but always try to offer some.
`;

const chatPrompt = ai.definePrompt({
  name: 'portfolioChatSoraPrompt', 
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

      // Analysis Logging: Log the interaction to the server console for debugging/analysis
      console.log(`[Sora Analysis] User Input: "${input.userInput}"`);
      console.log(`[Sora Analysis] AI Response: "${output.response.substring(0, 200)}..."`);

      return {
          response: output.response,
          suggestedFollowUps: followUps,
      };
    } catch (error) {
        console.error("Error in portfolioChatFlowInternal:", error);
        
        let errorMessage = "Sorry, I encountered an issue. Please try asking in a different way or check back later.";
        
        if (error instanceof Error) {
            const lowerCaseError = error.message.toLowerCase();
            if (lowerCaseError.includes("api key not valid") || lowerCaseError.includes("permission denied")) {
                errorMessage = "It looks like there's an issue with the AI service authentication. The API key may be invalid or expired. Please contact the site administrator to have it checked.";
            } else if (lowerCaseError.includes("quota") || lowerCaseError.includes("too many requests") || lowerCaseError.includes("429")) {
                errorMessage = "The AI assistant is currently experiencing high traffic and has reached its free usage limit. Please try again later.";
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
