
'use server';
/**
 * @fileOverview Generates blog post content based on a given title.
 *
 * - generateBlogContent - A function that generates blog content.
 * - GenerateBlogContentInput - The input type for the generateBlogContent function.
 * - GenerateBlogContentOutput - The return type for the generateBlogContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogContentInputSchema = z.object({
  title: z.string().describe('The title of the blog post for which to generate content.'),
});
export type GenerateBlogContentInput = z.infer<typeof GenerateBlogContentInputSchema>;

const GenerateBlogContentOutputSchema = z.object({
  content: z.string().describe('The AI-generated content for the blog post.'),
});
export type GenerateBlogContentOutput = z.infer<typeof GenerateBlogContentOutputSchema>;

export async function generateBlogContent(input: GenerateBlogContentInput): Promise<GenerateBlogContentOutput> {
  return generateBlogContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogContentPrompt',
  input: {schema: GenerateBlogContentInputSchema},
  output: {schema: GenerateBlogContentOutputSchema},
  prompt: `You are a helpful AI assistant that writes blog posts for a tech portfolio website.
The blog focuses on topics like technology, software development, and DevOps practices.

Generate a blog post of approximately 3-5 paragraphs for the following title:
"{{title}}"

The content should be informative, engaging, and relevant to professionals and enthusiasts in the tech field.
Ensure the output is plain text. You can use newline characters for paragraph separation.

Example output format:
{
  "content": "This is the first paragraph introducing the topic of '{{title}}'. It sets the stage for further discussion.\\n\\nThis second paragraph delves deeper into the core concepts related to '{{title}}'. It might provide some examples or expand on key ideas.\\n\\nFinally, the third paragraph can offer some concluding thoughts, future implications, or a call to action regarding '{{title}}'."
}
`,
});

const generateBlogContentFlow = ai.defineFlow(
  {
    name: 'generateBlogContentFlow',
    inputSchema: GenerateBlogContentInputSchema,
    outputSchema: GenerateBlogContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
