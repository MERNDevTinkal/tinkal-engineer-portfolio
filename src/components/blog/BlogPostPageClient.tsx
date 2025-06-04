
"use client"; // This component is a Client Component

import type { BlogPageProps } from '@/app/blog/[id]/page'; // Import the props type
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, AlertTriangle } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AUTHOR_NAME, AUTHOR_EMAIL } from '@/lib/data';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Hardcoded blog posts
const hardcodedBlogPosts = [
  {
    id: "0",
    // title: "The Future of Web Development: Trends to Watch", // We'll use searchParams.title for display consistency
    paragraphs: [
      "The web development landscape is a whirlwind of innovation! New frameworks, powerful tools, and cutting-edge paradigms are constantly emerging, reshaping how we craft digital experiences. For developers keen on building modern, efficient, and captivating web applications, staying ahead of the curve is not just beneficial—it's essential.",
      "A significant trend dominating the current discourse is the ascent of server-side rendering (SSR) and static site generation (SSG), championed by frameworks like Next.js. These methodologies deliver substantial improvements in performance, search engine optimization (SEO), and overall user experience. When combined with the principles of Jamstack architecture, developers can construct lightning-fast, highly scalable websites that delight users.",
      "Artificial Intelligence (AI) and Machine Learning (ML) are no longer futuristic concepts but active participants in the web development process. From AI-driven code assistants and automated testing suites to hyper-personalized user journeys and intelligent chatbots, AI is revolutionizing multiple facets of the development lifecycle and the final product. We are on the cusp of even deeper and more transformative integrations in the years to come.",
      "WebAssembly (Wasm) is another groundbreaking technology demanding attention. It empowers developers to run code written in languages such as C++, Rust, and Go directly within the browser at speeds approaching native performance. This capability unlocks new frontiers for sophisticated web applications, including immersive games, professional-grade video editing tools, and complex data visualization platforms, all accessible without leaving the browser.",
      "Finally, an unwavering commitment to web accessibility (a11y) and Core Web Vitals will remain a cornerstone of quality web development. Building inclusive digital products that perform optimally for every user is not merely a best practice—it's a fundamental responsibility. Developers must champion these principles to foster a positive, equitable, and universally accessible web."
    ]
  },
  {
    id: "1",
    // title: "Async JavaScript: Callbacks, Promises, and Async/Await"
    paragraphs: [
      "Understanding asynchronous JavaScript is fundamental for any modern web developer. Callbacks, Promises, and Async/Await are tools that help manage operations that don't complete immediately, like API calls or timeouts. Mastering these concepts is key to writing non-blocking, efficient code.",
      "Callbacks were the traditional way to handle asynchronous operations, but they can lead to 'callback hell' with deeply nested structures. Promises offer a cleaner way to chain asynchronous actions, with .then() for success and .catch() for errors. They represent a value that may be available now, or in the future, or never.",
      "Async/Await, built on top of Promises, provides a more synchronous-looking syntax for asynchronous code. Using the 'async' keyword before a function declaration allows you to use 'await' inside it. 'await' pauses the function execution until a Promise settles, making complex asynchronous logic much easier to read and maintain."
    ]
  },
  {
    id: "2",
    // title: "Introduction to DevOps Principles and Practices"
    paragraphs: [
      "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the systems development life cycle and provide continuous delivery with high software quality. DevOps is complementary with Agile software development; several DevOps aspects came from Agile methodology.",
      "Key principles of DevOps include automation, continuous integration/continuous delivery (CI/CD), infrastructure as code (IaC), monitoring, and collaboration. Tools like Jenkins, GitLab CI, Docker, Kubernetes, Ansible, and Prometheus are commonly used in DevOps workflows.",
      "Adopting DevOps culture and practices can lead to faster release cycles, improved deployment reliability, better collaboration between teams, and increased efficiency. It's about breaking down silos and working together towards common goals."
    ]
  },
  {
    id: "3",
    // title: "The Power of TypeScript in Modern Web Development"
    paragraphs: [
      "TypeScript, a superset of JavaScript, adds static typing to the language. This allows developers to catch errors early during development, rather than at runtime, leading to more robust and maintainable codebases. It's particularly beneficial for large-scale applications and team collaboration.",
      "Key features of TypeScript include interfaces for defining contracts, enums for creating sets of named constants, generics for writing reusable code components, and strong tooling support with autocompletion and refactoring in modern IDEs.",
      "While there's a learning curve, the benefits of using TypeScript—such as improved code quality, better developer experience, and enhanced scalability—often outweigh the initial investment, making it a popular choice for many projects."
    ]
  },
  {
    id: "4",
    // title: "Understanding Microservices Architecture"
    paragraphs: [
      "Microservices architecture is an approach to developing a single application as a suite of small, independently deployable services. Each service runs in its own process and communicates with lightweight mechanisms, often an HTTP resource API. This contrasts with a monolithic architecture where all components are part of a single, large application.",
      "Benefits of microservices include improved scalability (services can be scaled independently), technology diversity (each service can use different tech stacks), resilience (failure in one service doesn't necessarily bring down the whole app), and easier maintenance and updates for individual components.",
      "However, microservices also introduce complexity in terms of managing distributed systems, inter-service communication, data consistency, and increased operational overhead. Careful planning and robust infrastructure are crucial for successful microservices implementation."
    ]
  },
  {
    id: "5",
    // title: "State Management in React: A Comparative Overview"
    paragraphs: [
      "State management in React applications can become complex as they grow. While React's built-in `useState` and `useReducer` hooks are great for local component state, global state shared across many components often requires dedicated libraries like Redux, Zustand, or Recoil, or leveraging the Context API more extensively.",
      "Redux is a predictable state container with a unidirectional data flow, often used for large applications. Zustand offers a more minimalistic and unopinionated approach, using hooks for a simpler API. The Context API is built into React and can be suitable for less complex global state scenarios.",
      "Choosing the right state management solution depends on the project's scale, complexity, team familiarity, and specific requirements. The goal is always to make state predictable, manageable, and easy to debug."
    ]
  }
];

// Helper function to get a clean, processed title from searchParams
function getProcessedTitleParam(titleParam: string | string[] | undefined): string {
  let singleTitle: string | undefined;

  if (Array.isArray(titleParam)) {
    singleTitle = titleParam[0]; // Take the first element if it's an array
  } else {
    singleTitle = titleParam;
  }

  if (typeof singleTitle !== 'string' || singleTitle.trim() === '') {
    return ''; // Return empty if not a string or is an empty/whitespace string before decoding
  }

  try {
    const decoded = decodeURIComponent(singleTitle);
    const trimmedDecoded = decoded.trim(); // Trim after decoding
    return trimmedDecoded; // Return trimmed decoded string, could be empty if original was just encoded whitespace
  } catch (e) {
    // console.error("Error decoding title in getProcessedTitleParam:", e, "Original title:", singleTitle);
    return ''; // URIError if malformed, treat as invalid/empty
  }
}

export default function BlogPostPageClient({ params, searchParams }: BlogPageProps) {
  const { id } = params;
  const pageTitle = getProcessedTitleParam(searchParams.title);

  const [publicationDate, setPublicationDate] = useState<string | null>(null);
  const [actualBlogParagraphs, setActualBlogParagraphs] = useState<string[]>([]);
  
  const [isTitleMissing, setIsTitleMissing] = useState<boolean>(!pageTitle);
  const [isContentUnavailable, setIsContentUnavailable] = useState<boolean>(false);

  useEffect(() => {
    setPublicationDate(
      new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );

    if (!pageTitle) {
      setIsTitleMissing(true);
      setActualBlogParagraphs([]);
      setIsContentUnavailable(false);
      return;
    }

    setIsTitleMissing(false);

    const postIndex = parseInt(id, 10);
    if (!isNaN(postIndex) && postIndex >= 0 && postIndex < hardcodedBlogPosts.length) {
      const selectedPost = hardcodedBlogPosts[postIndex];
      if (selectedPost && selectedPost.paragraphs) {
        setActualBlogParagraphs(selectedPost.paragraphs);
        setIsContentUnavailable(false);
      } else {
        setActualBlogParagraphs([]);
        setIsContentUnavailable(true);
      }
    } else {
      setActualBlogParagraphs([]);
      setIsContentUnavailable(true);
    }
  }, [id, pageTitle]);

  const displayHeading = isTitleMissing ? "Blog Post Unavailable" : pageTitle || "Blog Post";

  return (
    <SectionWrapper id={`blog-post-${id}`} className="min-h-screen bg-card dark:bg-background py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto">
        <Button variant="link" asChild className="inline-flex items-center text-sm text-primary hover:underline mb-8 group p-0">
          <Link href="/#blogs">
            <span>
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Blogs
            </span>
          </Link>
        </Button>

        <article className="bg-background dark:bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline text-primary mb-4 leading-tight">
              {displayHeading}
            </h1>
            <div className="text-sm text-muted-foreground flex items-center space-x-4">
              <span>By {AUTHOR_NAME}</span>
              <span>&bull;</span>
              {publicationDate ? (
                <span>Published on {publicationDate}</span>
              ) : (
                <Skeleton className="h-4 w-32 inline-block" />
              )}
            </div>
          </header>

          {!isTitleMissing && pageTitle && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
              <Image
                src={`https://placehold.co/1200x675.png?text=${encodeURIComponent((pageTitle || "Blog").substring(0,30))}`}
                alt={`Hero image for ${pageTitle || "Blog Post"}`}
                fill
                className="object-cover"
                priority
                data-ai-hint="blog article header"
              />
            </div>
          )}
          
          {isTitleMissing && (
             <div className="bg-destructive/10 border-l-4 border-destructive text-destructive p-4 rounded-md my-6" role="alert">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 " />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Blog Post Unavailable</h3>
                    <div className="text-sm mt-2">
                      <p>This blog post cannot be displayed as its title is missing. Please select an article from the main blog page.</p>
                    </div>
                  </div>
                </div>
              </div>
          )}

          <div className="prose sm:prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed space-y-6">
            {!isTitleMissing && !isContentUnavailable && actualBlogParagraphs.length > 0 && (
              actualBlogParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            )}
            {!isTitleMissing && isContentUnavailable && (
              <p>Content for this topic is currently being crafted. Please check back soon!</p>
            )}
          </div>

          <Separator className="my-12" />

          <footer className="text-center">
            <p className="text-lg text-muted-foreground mb-4">Enjoyed this article? Let's connect!</p>
            <Button asChild size="lg">
              <Link href={`mailto:${AUTHOR_EMAIL}?subject=Regarding your blog post: ${encodeURIComponent(displayHeading)}`}>
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
