
'use server';
/**
 * @fileOverview A portfolio chatbot AI flow.
 *
 * - portfolioChatFlow - A function that responds to user queries about Tinkal Kumar.
 * - PortfolioChatInput - The input type for the portfolioChatFlow.
 * - PortfolioChatOutput - The return type for the portfolioChatFlow.
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
  userInput: z.string().describe('The user query about Tinkal Kumar.'),
});
export type PortfolioChatInput = z.infer<typeof PortfolioChatInputSchema>;

const PortfolioChatOutputSchema = z.object({
  response: z.string().describe("The chatbot's response to the user query."),
  suggestedFollowUps: z.array(z.string()).optional().describe('Up to 3 brief suggested follow-up questions a user might ask next. These should be relevant to the conversation or other key aspects of Tinkal\'s profile.'),
});
export type PortfolioChatOutput = z.infer<typeof PortfolioChatOutputSchema>;

// Prepare context string
const skillsString = TECH_STACK.map(skill => skill.name).join(', ');
const projectsString = PROJECTS_DATA.map(p => `- ${p.title}: ${p.description.substring(0, 100)}... (Tech: ${p.techStack.map(t => t.name).join(', ')})`).join('\n');
const educationString = EDUCATION_DATA.map(e => `${e.degree} from ${e.institution} (${e.graduationYear}). Key learnings included: ${e.details ? e.details.slice(0,2).join(', ') : 'various CS topics'}.`).join('\n');
const experienceString = WORK_EXPERIENCE_DATA.map(w => `${w.title} at ${w.company} (${w.duration}). Responsibilities included: ${w.responsibilities.slice(0, 2).join(', ')}.`).join('\n');
const contactString = `Email: ${AUTHOR_EMAIL}, Phone: ${CONTACT_DETAILS.phone || 'not publicly listed, please email'}. LinkedIn: ${SOCIAL_LINKS.find(l=>l.name === 'LinkedIn')?.href}`;
const certificationsString = CERTIFICATIONS_DATA.map(cert => `${cert.name} from ${cert.issuingOrganization}.`).join('\n');

const systemPrompt = `
You are a friendly, professional, and concise AI assistant for ${AUTHOR_NAME}'s portfolio.
Your goal is to answer questions from recruiters and visitors about ${AUTHOR_NAME}.
Use ONLY the following information about ${AUTHOR_NAME} to answer questions.
Do NOT make up information or answer questions outside of this context.
If a question cannot be answered with the provided information, politely state that you don't have that specific detail but can help with other information about ${AUTHOR_NAME}.

Information about ${AUTHOR_NAME}:
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

After providing your main answer, also generate up to 3 short, relevant follow-up questions that a user might ask next. Return these as an array of strings in the 'suggestedFollowUps' field of your JSON output. If the conversation is just starting or no specific follow-up is obvious, suggest general questions about key areas like my skills, prominent projects, or overall experience.

Keep your answers brief and to the point, ideally 2-3 sentences unless more detail is specifically requested and available.
When asked about contact, guide them to the contact section or provide the email/LinkedIn.
Do not engage in general conversation or topics unrelated to ${AUTHOR_NAME}'s professional profile.
`;

const chatPrompt = ai.definePrompt({
  name: 'portfolioChatPrompt',
  input: {schema: PortfolioChatInputSchema},
  output: {schema: PortfolioChatOutputSchema},
  system: systemPrompt,
  prompt: `User's question: {{userInput}}`,
  config: {
    temperature: 0.4, // Slightly increased for potentially more varied suggestions
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
    name: 'portfolioChatFlowInternal',
    inputSchema: PortfolioChatInputSchema,
    outputSchema: PortfolioChatOutputSchema,
  },
  async (input) => {
    const llmResponse = await chatPrompt(input);
    const output = llmResponse.output; 
    if (!output || !output.response) {
      return { response: "I'm sorry, I couldn't generate a response at this moment. Please try again or rephrase your question.", suggestedFollowUps: [] };
    }
    // Ensure suggestedFollowUps is an array even if undefined from LLM
    return {
        ...output,
        suggestedFollowUps: output.suggestedFollowUps || [],
    };
  }
);

export async function getPortfolioChatResponse(input: PortfolioChatInput): Promise<PortfolioChatOutput> {
  return portfolioChatFlowInternal(input);
}
