
import {z} from 'zod';

export const PortfolioChatInputSchema = z.object({
  userInput: z.string().describe('The user query for Sora about Tinkal Kumar.'),
  currentYear: z.number().describe('The current calendar year.'),
  currentDateTimeIndia: z.string().describe('The current date and time in India (e.g., "Saturday, October 26, 2024, 10:00 AM IST"). This should be used if the user specifically asks for the current date or time.'),
});
export type PortfolioChatInput = z.infer<typeof PortfolioChatInputSchema>;

export const PortfolioChatOutputSchema = z.object({
  response: z.string().describe("Sora's response to the user query about Tinkal Kumar."),
  suggestedFollowUps: z.array(z.string()).optional().describe('Up to 4 brief, relevant suggested follow-up questions (max 5-7 words each) a user might ask Sora next, based on the current query and conversation. These should be generated after each of your responses to guide the user. Examples: "Tell me about his MERN project?", "What\'s his latest role?", "Any cloud skills?", "More on certifications?".'),
});
export type PortfolioChatOutput = z.infer<typeof PortfolioChatOutputSchema>;
