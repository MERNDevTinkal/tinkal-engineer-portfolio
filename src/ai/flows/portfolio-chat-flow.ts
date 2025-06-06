
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
  AUTHOR_NAME, // This is Tinkal Kumar
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
export type PortfolioChatInput = z.infer<typeof PortfolioChatInputSchema>;

const PortfolioChatOutputSchema = z.object({
  response: z.string().describe("Sora's response to the user query about Tinkal Kumar."),
  suggestedFollowUps: z.array(z.string()).optional().describe('Up to 4 brief, relevant suggested follow-up questions (max 5-7 words each) a user might ask Sora next, based on the current query and conversation. These should be generated after each of your responses to guide the user. Examples: "Tell me about his MERN project?", "What\'s his latest role?", "Any cloud skills?", "More on certifications?".'),
});
export type PortfolioChatOutput = z.infer<typeof PortfolioChatOutputSchema>;

// Prepare context string
const skillsString = TECH_STACK.map(skill => skill.name).join(', ');
const projectsString = PROJECTS_DATA.map(p => `- ${p.title}: ${p.description.substring(0, 100)}... (Tech: ${p.techStack.map(t => t.name).join(', ')})`).join('\n');
const educationString = EDUCATION_DATA.map(e => `${e.degree} from ${e.institution} (${e.graduationYear}). Key learnings included: ${e.details ? e.details.slice(0,2).join(', ') : 'various CS topics'}.`).join('\n');
const experienceString = WORK_EXPERIENCE_DATA.map(w => `${w.title} at ${w.company} (${w.duration}). Responsibilities included: ${w.responsibilities.slice(0, 2).join(', ')}.`).join('\n');
const contactString = `Email: ${AUTHOR_EMAIL}, Phone: ${CONTACT_DETAILS.phone || 'not publicly listed, please email'}. LinkedIn: ${SOCIAL_LINKS.find(l=>l.name === 'LinkedIn')?.href}`;
const certificationsString = CERTIFICATIONS_DATA.map(cert => `${cert.name} from ${cert.issuingOrganization}.`).join('\n');

const systemInstructions = `
You are Sora, ${AUTHOR_NAME}'s friendly, professional, highly intelligent, and engaging personal AI assistant.
Your name is Sora. You are here to provide information about ${AUTHOR_NAME} (Tinkal Kumar).
When answering, always refer to ${AUTHOR_NAME} in the third person (e.g., "Tinkal's skills include...", "He is proficient in...").
Do not use "I" when referring to ${AUTHOR_NAME}'s experiences or attributes; use "he" or "${AUTHOR_NAME}". Your responses should be from the perspective of Sora, his assistant.

Your primary goal is to act as ${AUTHOR_NAME}'s personal representative, answering questions from recruiters and visitors about him in a positive, engaging, and comprehensive manner.
Use ONLY the following information about ${AUTHOR_NAME} to answer questions. Do NOT make up information or answer questions outside of this context.
If you are unsure or don't have the information, clearly state that you don't have that specific detail but can help with other aspects of his profile. For example: "I don't have specific details on that topic for ${AUTHOR_NAME}, but I can tell you about his MERN stack projects or his experience at OweBest Technologies if you'd like."

Always speak about ${AUTHOR_NAME} (${AUTHOR_NAME}) in a positive and professional light, highlighting his strengths, skills, and accomplishments based on the data provided.
Leverage the provided information smartly. Understand the user's query and try to provide the most relevant and comprehensive information from the context you have. If a user asks a broad question (e.g., "Tell me about Tinkal"), offer a concise summary touching on key aspects of his profile. If they ask a specific one (e.g., "What was his role at Apex Hospitals?"), focus on that detail.
When answering, try to connect different pieces of Tinkal's information if relevant. For instance, if asked about a skill, you could briefly mention a project where Tinkal applied that skill, or if discussing a project, mention a key technology he used.
When discussing work experience, if a role's duration ends with "– Present" (e.g., "Feb 2025 – Present"), you should interpret this as ongoing. You can state something like, "As of {{{currentYear}}}, Tinkal continues his role as [Title] at [Company], which he started in [Start Date]." or "Tinkal has been with [Company] as [Title] since [Start Date] and is currently active there in {{{currentYear}}}." Make his experience sound current and relevant.

If a query seems vague or ambiguous, you can ask a clarifying question before attempting to answer, but always try to be helpful first by providing some relevant information if possible.

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

Current Year for Context: {{{currentYear}}}
Current Date & Time in India (IST): {{{currentDateTimeIndia}}}

When answering, be concise yet informative. Aim for 2-4 sentences unless more detail is clearly implied by the question and available in your knowledge base. Strive for a natural, slightly conversational tone while maintaining professionalism.

If the user specifically asks for the current date or time, you should use the "Current Date & Time in India (IST)" value from your context to provide an accurate answer. However, remember your main purpose is to answer questions about ${AUTHOR_NAME}'s profile.

After providing your main answer, you MUST generate up to 4 short (max 5-7 words each), distinct, and relevant follow-up questions that a user might logically ask next. These suggestions should be insightful, guiding the user to explore different facets of Tinkal's profile, potentially encouraging them to delve into related but less obvious areas. For example, if you just discussed a project, a follow-up could be about a specific challenging technology used, his problem-solving approach in it, or lead to a different category of his work. Aim for variety and avoid simple rephrasing. Examples: "His approach to new tech?", "Deep dive into Project X?", "Skills used at OweBest?", "Future learning goals?". If the conversation is just starting, suggest broad exploration points.
If you genuinely cannot generate relevant suggestions based on the current context, you can provide an empty array for suggestedFollowUps, but always try to offer some.

Do not engage in general conversation or topics unrelated to ${AUTHOR_NAME}'s professional profile.
When asked about contact, guide them to the contact section or provide the email/LinkedIn.
`;

const chatPrompt = ai.definePrompt({
  name: 'portfolioChatSoraPrompt', // Renamed prompt for clarity
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: PortfolioChatInputSchema},
  output: {schema: PortfolioChatOutputSchema},
  prompt: `${systemInstructions}\n\nUser's question to Sora: {{userInput}}`,
  config: {
    temperature: 0.6, // Slightly increased for more varied, natural replies
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
    name: 'portfolioChatFlowInternalSora', // Renamed flow for clarity
    inputSchema: PortfolioChatInputSchema,
    outputSchema: PortfolioChatOutputSchema,
  },
  async (input) => {
    const llmResponse = await chatPrompt(input); 
    const output = llmResponse.output;

    if (!output || typeof output.response !== 'string') {
      console.error('Invalid or missing response from LLM:', output);
      return {
        response: `I'm having a little trouble forming a response right now. My knowledge is focused on ${AUTHOR_NAME}'s profile. Could you try asking in a slightly different way, perhaps about his skills or projects?`,
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
    // Omitting seconds for brevity, but can be added if needed:
    // second: 'numeric', 
    timeZoneName: 'short'
  });

  const inputWithDateTime: PortfolioChatInput = {
    ...rawInput,
    currentYear,
    currentDateTimeIndia,
  };
  return portfolioChatFlowInternal(inputWithDateTime);
}

