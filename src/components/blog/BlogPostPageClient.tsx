
"use client"; // This component is a Client Component

import type { BlogPageProps } from '@/app/blog/[id]/page'; // Import the props type
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, Loader2, AlertTriangle } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AUTHOR_NAME, AUTHOR_EMAIL } from '@/lib/data';
import { useEffect, useState } from 'react';
import { generateBlogContent } from '@/ai/flows/generate-blog-content-flow';
import { Skeleton } from '@/components/ui/skeleton';

function BlogContentSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-full" />
      <Separator className="my-6" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  );
}

export default function BlogPostPageClient({ params, searchParams }: BlogPageProps) {
  const { id } = params;
  const titleFromParams = searchParams.title ? decodeURIComponent(searchParams.title as string) : 'Untitled Blog Post';
  
  const [publicationDate, setPublicationDate] = useState<string | null>(null);
  const [blogContent, setBlogContent] = useState<string | null>(null);
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [contentError, setContentError] = useState<string | null>(null);
  const [isTitleMissingError, setIsTitleMissingError] = useState(false); // New state for specific error type

  useEffect(() => {
    // Calculate date on the client-side after hydration
    setPublicationDate(
      new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );

    async function fetchBlogContent() {
      setIsContentLoading(true);
      setContentError(null);
      setIsTitleMissingError(false); // Reset error type

      if (!titleFromParams || titleFromParams === 'Untitled Blog Post') {
        setContentError("This blog post cannot be displayed as its title is missing. Please select an article from the main blog page.");
        setIsTitleMissingError(true); // Mark as missing title error
        // Fallback content for missing title specifically
        setBlogContent("To view a blog post, please return to the main blog page and click on one of the available titles. This page requires a title to load the correct content.");
        setIsContentLoading(false);
        return;
      }

      try {
        const result = await generateBlogContent({ title: titleFromParams });
        if (result && result.content) {
          setBlogContent(result.content);
        } else {
          throw new Error("No content received from AI.");
        }
      } catch (err) {
        let message = "Failed to generate blog content.";
        if (err instanceof Error) {
            message = err.message.includes("API key not valid") 
                      ? "AI service API key is invalid. Please check configuration."
                      : err.message.includes("overloaded") || err.message.includes("503")
                      ? "The AI service for generating content is currently busy. Please try again shortly."
                      : `An error occurred: ${err.message}`;
        }
        setContentError(message);
        // Fallback content in case of error
        setBlogContent(`This is a placeholder because we couldn't load the AI-generated content for "${titleFromParams}". We were hoping to tell you all about the nuances and exciting developments related to this topic. Please try refreshing the page or checking back later.`);
      } finally {
        setIsContentLoading(false);
      }
    }

    fetchBlogContent();
  }, [titleFromParams]);


  return (
    <SectionWrapper id={`blog-post-${id}`} className="min-h-screen bg-card dark:bg-background py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto">
        <Link href="/#blogs" className="inline-flex items-center text-sm text-primary hover:underline mb-8 group">
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Blogs
        </Link>

        <article className="bg-background dark:bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline text-primary mb-4 leading-tight">
              {isTitleMissingError ? "Blog Post Unavailable" : titleFromParams}
            </h1>
            <div className="text-sm text-muted-foreground flex items-center space-x-4">
              <span>By {AUTHOR_NAME}</span>
              <span>&bull;</span>
              {publicationDate ? (
                <span>Published on {publicationDate}</span>
              ) : (
                <Skeleton className="h-4 w-24 inline-block" />
              )}
            </div>
          </header>

          {!isTitleMissingError && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
              <Image
                src={`https://placehold.co/1200x675.png?text=${encodeURIComponent(titleFromParams.substring(0,30))}`}
                alt={`Hero image for ${titleFromParams}`}
                fill
                className="object-cover"
                priority
                data-ai-hint="blog article header"
              />
            </div>
          )}

          <div className="prose sm:prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed space-y-6">
            {isContentLoading && <BlogContentSkeleton />}
            {contentError && !isContentLoading && (
              <div className="bg-destructive/10 border-l-4 border-destructive text-destructive p-4 rounded-md" role="alert">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 " />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">
                       {isTitleMissingError ? "Blog Post Unavailable" : "Content Generation Failed"}
                    </h3>
                    <div className="text-sm mt-2">
                      <p>{contentError}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!isContentLoading && !contentError && blogContent && (
              blogContent.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            )}
             {/* This case handles when title is missing and we set specific blogContent for it */}
            {!isContentLoading && isTitleMissingError && blogContent && (
                blogContent.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
            )}
            {!isContentLoading && !contentError && !isTitleMissingError && !blogContent && (
                 <p>No content available for this topic yet. Check back soon!</p>
            )}
          </div>

          <Separator className="my-12" />

          <footer className="text-center">
            <p className="text-lg text-muted-foreground mb-4">Enjoyed this article? Let's connect!</p>
            <Button asChild size="lg">
              <Link href={`mailto:${AUTHOR_EMAIL}?subject=Regarding your blog post: ${encodeURIComponent(titleFromParams)}`}>
                <span>
                  <Mail className="mr-2 h-5 w-5 inline" /> Contact Me
                </span>
              </Link>
            </Button>
          </footer>
        </article>
      </div>
    </SectionWrapper>
  );
}
