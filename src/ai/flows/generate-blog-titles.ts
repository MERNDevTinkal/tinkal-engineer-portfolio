'use server';

/**
 * @fileOverview Generates blog titles for a portfolio using Groq SDK.
 *
 * - generateBlogTitles - A function that generates 11-20 blog titles.
 * - GenerateBlogTitlesInput - The input type for the generateBlogTitles function.
 * - GenerateBlogTitlesOutput - The return type for the generateBlogTitles function.
 */

import Groq from 'groq-sdk';
import { z } from 'zod';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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
  const topic = input.topic || 'technology, software development, and DevOps practices';
  const numTitles = input.numTitles || 12;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are a blog title generator for a tech portfolio. 
          Generate exactly ${numTitles} engaging and professional blog titles for the topic of '${topic}'. 
          The titles should be relevant to professionals in tech.
          Return the response as a JSON object with a single key "titles" containing an array of strings.`
        },
        {
          role: "user",
          content: `Generate ${numTitles} titles about ${topic}.`
        }
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Empty response from Groq");

    const parsed = JSON.parse(content);
    return {
      titles: Array.isArray(parsed.titles) ? parsed.titles.slice(0, numTitles) : [],
    };
  } catch (error) {
    console.error("Error generating blog titles with Groq:", error);
    return {
      titles: [
        "Unlocking Scalability: A Deep Dive into Cloud Architectures",
        "Serverless vs. Containers: Choosing the Right Path",
        "The Future of Web Development in 2026",
        "Mastering the MERN Stack for Modern Apps",
        "DevOps Best Practices for High-Performance Teams",
        "AI Integration: Transforming User Experiences",
      ].slice(0, numTitles)
    };
  }
}
