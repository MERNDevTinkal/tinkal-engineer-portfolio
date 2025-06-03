'use server';

/**
 * @fileOverview Generates blog titles for a portfolio.
 *
 * - generateBlogTitles - A function that generates 10-15 blog titles.
 * - GenerateBlogTitlesInput - The input type for the generateBlogTitles function.
 * - GenerateBlogTitlesOutput - The return type for the generateBlogTitles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogTitlesInputSchema = z.object({
  topic: z
    .string()
    .default('web development')
    .describe('The topic for the blog titles.'),
  numTitles: z
    .number()
    .default(10)
    .describe('The number of blog titles to generate. Must be between 10 and 15.')
    .refine(val => val >= 10 && val <= 15, {
      message: 'Number of titles must be between 10 and 15.',
    }),
});

export type GenerateBlogTitlesInput = z.infer<typeof GenerateBlogTitlesInputSchema>;

const GenerateBlogTitlesOutputSchema = z.object({
  titles: z.array(z.string()).describe('An array of generated blog titles.'),
});

export type GenerateBlogTitlesOutput = z.infer<typeof GenerateBlogTitlesOutputSchema>;

export async function generateBlogTitles(input: GenerateBlogTitlesInput): Promise<GenerateBlogTitlesOutput> {
  return generateBlogTitlesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogTitlesPrompt',
  input: {schema: GenerateBlogTitlesInputSchema},
  output: {schema: GenerateBlogTitlesOutputSchema},
  prompt: `You are a blog title generator. You will generate {{numTitles}} blog titles for the topic of {{topic}}. Return the titles as a JSON array of strings.  The titles should be engaging and relevant to web developers.

Example:
{
  "titles": [
    "Title 1",
    "Title 2",
    "Title 3"
  ]
}
`,
});

const generateBlogTitlesFlow = ai.defineFlow(
  {
    name: 'generateBlogTitlesFlow',
    inputSchema: GenerateBlogTitlesInputSchema,
    outputSchema: GenerateBlogTitlesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
