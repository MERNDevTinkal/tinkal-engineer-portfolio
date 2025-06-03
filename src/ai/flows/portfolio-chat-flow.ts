
'use server';
/**
 * @fileOverview A portfolio chatbot AI flow.
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
  userInput: z.string().describe('The user query about Tinkal Kumar.'),
});
export type PortfolioChatInput = z.infer<typeof PortfolioChatInputSchema>;

const PortfolioChatOutputSchema = z.object({
  response: z.string().describe("The chatbot's response to the user query."),
  suggestedFollowUps: z.array(z.string()).optional().describe('Up to 4 brief, relevant suggested follow-up questions (max 5-7 words each) a user might ask next, based on the current query and conversation. These should be generated after each of your responses to guide the user. Examples: "Tell me about his MERN project?", "What\'s his latest role?", "Any cloud skills?", "More on certifications?".'),
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
You are a friendly, professional, and highly intelligent AI assistant for ${AUTHOR_NAME}'s portfolio.
Your primary goal is to act as ${AUTHOR_NAME}'s personal representative, answering questions from recruiters and visitors about him in a positive, engaging, and comprehensive manner.
Use ONLY the following information about ${AUTHOR_NAME} to answer questions. Do NOT make up information or answer questions outside of this context.
If you are unsure or don't have the information, clearly state that you don't have that specific detail but can help with other aspects of his profile.
Always speak about ${AUTHOR_NAME} (${AUTHOR_NAME}) in a positive and professional light, highlighting his strengths, skills, and accomplishments based on the data provided.
Leverage the provided information smartly. Understand the user's query and try to provide the most relevant information from the context you have. If a user asks a broad question (e.g., "Tell me about Tinkal"), try to summarize relevant points. If they ask a specific one (e.g., "What was his role at Apex Hospitals?"), focus on that detail.
If a query seems vague or ambiguous, you can ask a clarifying question before attempting to answer.

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

When answering, be concise yet informative. Aim for 2-4 sentences unless more detail is clearly implied by the question and available in your knowledge base.
If a question cannot be answered with the provided information, politely state that you don't have that specific detail but can help with other information about ${AUTHOR_NAME}'s skills, experience, or projects. Try to steer the conversation back to topics you can discuss. For example, if asked about something not in your data, you could say: "I don't have specific details on that topic for ${AUTHOR_NAME}, but I can tell you about his MERN stack projects or his experience at OweBest Technologies if you'd like."

After providing your main answer, you MUST generate up to 4 short (max 5-7 words each), distinct, and relevant follow-up questions that a user might logically ask next based on the current query, your response, or other key aspects of ${AUTHOR_NAME}'s profile. These suggestions should encourage further interaction and exploration of his profile. Ensure these suggestions are genuinely useful and varied. Return these as an array of strings in the 'suggestedFollowUps' field of your JSON output.
Examples of good follow-up suggestions: "Tell me about his MERN project?", "What's his latest role?", "Any cloud skills?", "More on his education?", "What are his certifications?".
If the conversation is just starting or no specific follow-up is obvious from the immediate query, suggest general questions about key areas like skills, prominent projects, or overall experience.
If you genuinely cannot generate relevant suggestions based on the current context, you can provide an empty array for suggestedFollowUps, but always try to offer some.

Do not engage in general conversation or topics unrelated to ${AUTHOR_NAME}'s professional profile.
When asked about contact, guide them to the contact section or provide the email/LinkedIn.
`;

const chatPrompt = ai.definePrompt({
  name: 'portfolioChatPrompt',
  model: 'googleai/gemini-1.5-flash-latest', // Explicitly set the model
  input: {schema: PortfolioChatInputSchema},
  output: {schema: PortfolioChatOutputSchema},
  system: systemPrompt,
  prompt: `User's question: {{userInput}}`,
  config: {
    temperature: 0.45,
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

    if (!output || typeof output.response !== 'string') {
      console.error('Invalid or missing response from LLM:', output);
      return {
        response: "I'm having a little trouble forming a response right now. My knowledge is focused on Tinkal Kumar's profile. Could you try asking in a slightly different way, perhaps about his skills or projects?",
        suggestedFollowUps: []
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

export async function getPortfolioChatResponse(input: PortfolioChatInput): Promise<PortfolioChatOutput> {
  return portfolioChatFlowInternal(input);
}
