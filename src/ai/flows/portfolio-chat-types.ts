
import {z} from 'zod';

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
});

export const PortfolioChatInputSchema = z.object({
  userInput: z.string().describe('The user query for Sora about Tinkal Kumar.'),
  history: z.array(ChatMessageSchema).optional().describe('The conversation history for context.'),
});
export type PortfolioChatInput = z.infer<typeof PortfolioChatInputSchema>;

export const PortfolioChatOutputSchema = z.object({
  response: z.string().describe("Sora's response to the user query about Tinkal Kumar."),
  suggestedFollowUps: z.array(z.string()).optional().describe('Up to 4 brief, relevant suggested follow-up questions.'),
});
export type PortfolioChatOutput = z.infer<typeof PortfolioChatOutputSchema>;
