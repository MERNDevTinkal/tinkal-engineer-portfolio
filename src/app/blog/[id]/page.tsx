
"use client"; // Make this a Client Component

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AUTHOR_NAME, AUTHOR_EMAIL } from '@/lib/data';
import { useEffect, useState } from 'react';

type BlogPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// generateMetadata remains a server-side function
export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const title = searchParams.title ? decodeURIComponent(searchParams.title as string) : 'Blog Post';
  return {
    title: `${title} | ${AUTHOR_NAME}'s Blog`,
    description: `Read more about ${title} on ${AUTHOR_NAME}'s tech blog.`,
  };
}

export default function BlogPostPage({ params, searchParams }: BlogPageProps) {
  const { id } = params;
  const title = searchParams.title ? decodeURIComponent(searchParams.title as string) : 'Untitled Blog Post';
  
  const [publicationDate, setPublicationDate] = useState<string | null>(null);

  useEffect(() => {
    // Calculate date on the client-side after hydration
    setPublicationDate(
      new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);

  // Simple way to vary placeholder content slightly
  const contentVariant = parseInt(id, 10) % 3;

  const placeholderContent = {
    summary: [
      "This post delves into the core concepts and practical applications of the topic at hand. We aim to provide a comprehensive overview that is both informative and accessible to readers of various technical backgrounds. Expect to find clear explanations, illustrative examples, and actionable insights.",
      "Exploring the multifaceted nature of this subject, we uncover its significance in the current technological landscape. This article offers a deep dive into its mechanisms, benefits, and potential challenges, providing readers with a well-rounded understanding.",
      "Join us as we journey through the intricacies of this topic. From foundational principles to advanced strategies, this post is designed to equip you with the knowledge needed to navigate and leverage this technology effectively in your own projects or research."
    ],
    about: [
      "The perspectives shared here are based on extensive research and hands-on experience. We believe in the transformative power of this technology and aim to highlight its potential to drive innovation and solve complex problems. Our goal is to foster a deeper appreciation and understanding among our readers.",
      "In this section, we reflect on the broader implications and future trends related to the subject. Considering its evolution and impact, we offer insights into how it might shape the future and what opportunities and challenges lie ahead for developers and businesses alike.",
      "This exploration is driven by a passion for continuous learning and sharing knowledge within the tech community. We encourage readers to engage with the material critically, share their own experiences, and contribute to the ongoing dialogue surrounding this exciting field."
    ],
    more: [
      "For those looking to expand their knowledge further, we recommend exploring official documentation, related academic papers, and community forums. Engaging with hands-on tutorials and contributing to open-source projects can also provide invaluable practical experience. Stay curious and keep learning!",
      "To deepen your understanding, consider a comparative analysis with alternative technologies or methodologies. Look into case studies that demonstrate real-world applications and outcomes. Furthermore, attending webinars or workshops can offer new perspectives and networking opportunities.",
      "The journey doesn't end here. We suggest setting up a personal project to apply these concepts. Experimentation is key to mastery. Also, following thought leaders and research groups in this domain will keep you updated on the latest advancements and discussions."
    ]
  };

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
              {title}
            </h1>
            <div className="text-sm text-muted-foreground flex items-center space-x-4">
              <span>By {AUTHOR_NAME}</span>
              <span>&bull;</span>
              {publicationDate ? (
                <span>Published on {publicationDate}</span>
              ) : (
                <span>Loading date...</span>
              )}
            </div>
          </header>

          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
            <Image
              src={`https://placehold.co/1200x675.png?text=Blog+${id}+Content`}
              alt={`Hero image for ${title}`}
              fill
              className="object-cover"
              priority
              data-ai-hint="blog article header"
            />
          </div>

          <div className="prose sm:prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed space-y-6">
            <h2 className="text-2xl font-semibold font-headline text-primary/90 !mt-0">Detailed Summary</h2>
            <p>{placeholderContent.summary[contentVariant]}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

            <Separator className="my-8" />

            <h2 className="text-2xl font-semibold font-headline text-primary/90">About this Topic/Perspective</h2>
            <p>{placeholderContent.about[contentVariant]}</p>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.</p>
            
            <Separator className="my-8" />

            <h2 className="text-2xl font-semibold font-headline text-primary/90">Further Thoughts & More</h2>
            <p>{placeholderContent.more[contentVariant]}</p>
            <p>Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>
            <p>Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.</p>
          </div>

          <Separator className="my-12" />

          <footer className="text-center">
            <p className="text-lg text-muted-foreground mb-4">Enjoyed this article? Let's connect!</p>
            <Button asChild size="lg">
              <Link href={`mailto:${AUTHOR_EMAIL}`}>
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
