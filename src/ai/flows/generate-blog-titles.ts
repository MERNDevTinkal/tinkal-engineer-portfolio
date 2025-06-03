'use server';

/**
 * @fileOverview Generates blog titles for a portfolio.
 *
 * - generateBlogTitles - A function that generates 11-20 blog titles.
 * - GenerateBlogTitlesInput - The input type for the generateBlogTitles function.
 * - GenerateBlogTitlesOutput - The return type for the generateBlogTitles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogTitlesInputSchema = z.object({
  topic: z
    .string()
    .default('technology, software development, and DevOps practices')
    .describe('The topic for the blog titles.'),
  numTitles: z
    .number()
    .default(12)
    .describe('The number of blog titles to generate. Must be between 11 and 20.')
    .refine(val => val >= 11 && val <= 20, {
      message: 'Number of titles must be between 11 and 20.',
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
  prompt: `You are a blog title generator. You will generate {{numTitles}} blog titles for the topic of '{{topic}}'. 
The titles should be engaging and relevant to professionals interested in technology, software development, and DevOps.
Return the titles as a JSON array of strings.

Example for {{numTitles}} = 3 and topic = "cloud computing":
{
  "titles": [
    "Unlocking Scalability: A Deep Dive into Cloud Architectures",
    "Serverless vs. Containers: Choosing the Right Path for Your Next Project",
    "The Future of Cloud-Native: Trends to Watch in 2024"
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
