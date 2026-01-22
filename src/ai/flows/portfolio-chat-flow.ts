
'use server';
/**
 * @fileOverview A portfolio chatbot AI flow for Sora, Tinkal Kumar's assistant.
 *
 * - getPortfolioChatResponse - A function that responds to user queries about Tinkal Kumar.
 * - PortfolioChatInput - The input type for the getPortfolioChatResponse.
 * - PortfolioChatOutput - The return type for the getPortfolioChatResponse.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
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

const PortfolioChatInputSchema = z.object({
  userInput: z.string().describe('The user query for Sora about Tinkal Kumar.'),
  currentYear: z.number().describe('The current calendar year.'),
  currentDateTimeIndia: z.string().describe('The current date and time in India (e.g., "Saturday, October 26, 2024, 10:00 AM IST"). This should be used if the user specifically asks for the current date or time.'),
});
type PortfolioChatInput = z.infer<typeof PortfolioChatInputSchema>;

const PortfolioChatOutputSchema = z.object({
  response: z.string().describe("Sora's response to the user query about Tinkal Kumar."),
  suggestedFollowUps: z.array(z.string()).optional().describe('Up to 4 brief, relevant suggested follow-up questions (max 5-7 words each) a user might ask Sora next, based on the current query and conversation. These should be generated after each of your responses to guide the user. Examples: "Tell me about his MERN project?", "What\'s his latest role?", "Any cloud skills?", "More on certifications?".'),
});
type PortfolioChatOutput = z.infer<typeof PortfolioChatOutputSchema>;

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
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: PortfolioChatInputSchema},
  output: {schema: PortfolioChatOutputSchema},
  prompt: `${systemInstructions}\n\nUser's question to Sora: {{userInput}}`,
  config: {
    temperature: 0.75, 
     safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
    ],
  }
});

const portfolioChatFlowInternal = ai.defineFlow(
  {
    name: 'portfolioChatFlowInternalSora', 
    inputSchema: PortfolioChatInputSchema,
    outputSchema: PortfolioChatOutputSchema,
  },
  async (input) => {
    const llmResponse = await chatPrompt(input); 
    const output = llmResponse.output;

    if (!output || typeof output.response !== 'string') {
      console.error('Invalid or missing response from LLM:', output);
      return {
        response: `I'm having a little trouble forming a response right now. My knowledge is focused on ${AUTHOR_NAME}'s profile and general tech topics. Could you try asking in a slightly different way?`,
        suggestedFollowUps: ["Tell me about Tinkal's skills?", "What is Next.js?", "MERN stack explained?", "Firebase basics?"]
      };
    }
    
    const followUps = (output.suggestedFollowUps && Array.isArray(output.suggestedFollowUps))
                      ? output.suggestedFollowUps.filter(s => typeof s === 'string' && s.trim() !== "").slice(0, 4)
                      : [];
    return {
        response: output.response,
        suggestedFollowUps: followUps,
    };
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

