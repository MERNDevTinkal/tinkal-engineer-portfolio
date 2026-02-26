'use server';
/**
 * @fileOverview Generates blog post content based on a given title using Groq SDK.
 *
 * - generateBlogContent - A function that generates blog content.
 * - GenerateBlogContentInput - The input type for the generateBlogContent function.
 * - GenerateBlogContentOutput - The return type for the generateBlogContent function.
 */

import Groq from 'groq-sdk';
import { z } from 'zod';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const GenerateBlogContentInputSchema = z.object({
  title: z.string().describe('The title of the blog post for which to generate content.'),
});
export type GenerateBlogContentInput = z.infer<typeof GenerateBlogContentInputSchema>;

const GenerateBlogContentOutputSchema = z.object({
  content: z.string().describe('The AI-generated content for the blog post.'),
});
export type GenerateBlogContentOutput = z.infer<typeof GenerateBlogContentOutputSchema>;

export async function generateBlogContent(input: GenerateBlogContentInput): Promise<GenerateBlogContentOutput> {
  const { title } = input;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a professional tech blogger. Write an informative and engaging blog post of 3-5 paragraphs based on the provided title. Use plain text. Return the response as a JSON object with a single key 'content' containing the blog text."
        },
        {
          role: "user",
          content: `Write a blog post titled: "${title}"`
        }
      ],
      response_format: { type: "json_object" },
    });

    const messageContent = completion.choices[0]?.message?.content;
    if (!messageContent) throw new Error("Empty response from Groq");

    const parsed = JSON.parse(messageContent);
    return {
      content: parsed.content || "Content generation failed. Please try again later.",
    };
  } catch (error) {
    console.error("Error generating blog content with Groq:", error);
    return {
      content: "I'm sorry, I was unable to generate the content for this post at this time due to a connection issue with the AI service. Please try expanding this section again in a moment."
    };
  }
}
