
"use client";

import { useState, useEffect } from 'react';
import { generateBlogTitles, type GenerateBlogTitlesOutput } from "@/ai/flows/generate-blog-titles";
import { generateBlogContent, type GenerateBlogContentInput, type GenerateBlogContentOutput } from "@/ai/flows/generate-blog-content-flow";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronUp, Loader2, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

const BLOG_TITLES_CACHE_KEY = 'aiBlogTitlesCache_v2'; // Cache key version bump

// Min and Max cache duration in hours
const MIN_CACHE_HOURS = 48;
const MAX_CACHE_HOURS = 98;

// Helper to get random cache duration in milliseconds
const getRandomCacheDurationMs = (): number => {
  const minMs = MIN_CACHE_HOURS * 60 * 60 * 1000;
  const maxMs = MAX_CACHE_HOURS * 60 * 60 * 1000;
  return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
};

interface CachedBlogTitles {
  timestamp: number;
  cacheDurationUsed: number; // The specific duration (in ms) this cache entry is valid for
  data: GenerateBlogTitlesOutput;
}

// Hardcoded blog posts (content for expansion - for the first few items)
const hardcodedBlogPosts = [
  {
    id: "0",
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
    paragraphs: [
      "Understanding asynchronous JavaScript is fundamental for any modern web developer. Callbacks, Promises, and Async/Await are tools that help manage operations that don't complete immediately, like API calls or timeouts. Mastering these concepts is key to writing non-blocking, efficient code.",
      "Callbacks were the traditional way to handle asynchronous operations, but they can lead to 'callback hell' with deeply nested structures. Promises offer a cleaner way to chain asynchronous actions, with .then() for success and .catch() for errors. They represent a value that may be available now, or in the future, or never.",
      "Async/Await, built on top of Promises, provides a more synchronous-looking syntax for asynchronous code. Using the 'async' keyword before a function declaration allows you to use 'await' inside it. 'await' pauses the function execution until a Promise settles, making complex asynchronous logic much easier to read and maintain."
    ]
  },
  {
    id: "2",
    paragraphs: [
      "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the systems development life cycle and provide continuous delivery with high software quality. DevOps is complementary with Agile software development; several DevOps aspects came from Agile methodology.",
      "Key principles of DevOps include automation, continuous integration/continuous delivery (CI/CD), infrastructure as code (IaC), monitoring, and collaboration. Tools like Jenkins, GitLab CI, Docker, Kubernetes, Ansible, and Prometheus are commonly used in DevOps workflows.",
      "Adopting DevOps culture and practices can lead to faster release cycles, improved deployment reliability, better collaboration between teams, and increased efficiency. It's about breaking down silos and working together towards common goals."
    ]
  },
  {
    id: "3",
    paragraphs: [
      "TypeScript, a superset of JavaScript, adds static typing to the language. This allows developers to catch errors early during development, rather than at runtime, leading to more robust and maintainable codebases. It's particularly beneficial for large-scale applications and team collaboration.",
      "Key features of TypeScript include interfaces for defining contracts, enums for creating sets of named constants, generics for writing reusable code components, and strong tooling support with autocompletion and refactoring in modern IDEs.",
      "While there's a learning curve, the benefits of using TypeScript—such as improved code quality, better developer experience, and enhanced scalability—often outweigh the initial investment, making it a popular choice for many projects."
    ]
  },
  {
    id: "4",
    paragraphs: [
      "Microservices architecture is an approach to developing a single application as a suite of small, independently deployable services. Each service runs in its own process and communicates with lightweight mechanisms, often an HTTP resource API. This contrasts with a monolithic architecture where all components are part of a single, large application.",
      "Benefits of microservices include improved scalability (services can be scaled independently), technology diversity (each service can use different tech stacks), resilience (failure in one service doesn't necessarily bring down the whole app), and easier maintenance and updates for individual components.",
      "However, microservices also introduce complexity in terms of managing distributed systems, inter-service communication, data consistency, and increased operational overhead. Careful planning and robust infrastructure are crucial for successful microservices implementation."
    ]
  },
  {
    id: "5",
    paragraphs: [
      "State management in React applications can become complex as they grow. While React's built-in `useState` and `useReducer` hooks are great for local component state, global state shared across many components often requires dedicated libraries like Redux, Zustand, or Recoil, or leveraging the Context API more extensively.",
      "Redux is a predictable state container with a unidirectional data flow, often used for large applications. Zustand offers a more minimalistic and unopinionated approach, using hooks for a simpler API. The Context API is built into React and can be suitable for less complex global state scenarios.",
      "Choosing the right state management solution depends on the project's scale, complexity, team familiarity, and specific requirements. The goal is always to make state predictable, manageable, and easy to debug."
    ]
  }
];


function BlogCardSkeleton({ cardKey }: { cardKey: string }) {
  return (
    <Card key={cardKey} className="flex flex-col shadow-lg bg-card">
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-8 w-32" />
      </CardFooter>
    </Card>
  );
}

const FALLBACK_TITLES: GenerateBlogTitlesOutput = {
  titles: [
    "Exploring the Latest in Tech: A Fallback Title",
    "DevOps Best Practices: Essential Guide",
    "Software Engineering Insights for 2024",
    "The Future of Development: Trends to Watch",
    "AI in Modern Applications: An Overview",
    "Cloud Computing Trends and Strategies",
  ].slice(0, 6)
};

export function BlogList() {
  const [blogData, setBlogData] = useState<GenerateBlogTitlesOutput>({ titles: [] });
  const [isTitleLoading, setIsTitleLoading] = useState(true);
  const [titleError, setTitleError] = useState<string | null>(null);
  
  const [expandedPostIndex, setExpandedPostIndex] = useState<number | null>(null);
  const [aiGeneratedContent, setAiGeneratedContent] = useState<Map<number, string>>(new Map());
  const [aiContentLoading, setAiContentLoading] = useState<Set<number>>(new Set());
  const [aiContentError, setAiContentError] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    async function loadBlogTitles() {
      setIsTitleLoading(true);
      setTitleError(null);

      try {
        const cachedItem = localStorage.getItem(BLOG_TITLES_CACHE_KEY);
        if (cachedItem) {
          const cached: CachedBlogTitles = JSON.parse(cachedItem);
          if (cached && cached.timestamp && cached.cacheDurationUsed && cached.data && cached.data.titles) {
            const isCacheValid = (Date.now() - cached.timestamp < cached.cacheDurationUsed);
            const validCachedTitles = cached.data.titles.filter(title => typeof title === 'string' && title.trim() !== "").slice(0, 12);
            
            if (isCacheValid && validCachedTitles.length > 0) {
              setBlogData({ titles: validCachedTitles });
              setIsTitleLoading(false);
              return;
            }
          }
        }
      } catch (e) {
        // console.error("Failed to read blog titles from localStorage:", e);
      }

      try {
        const data = await generateBlogTitles({ topic: "technology, software development, and DevOps", numTitles: 12 });
        const validTitles = (data.titles || []).filter(title => typeof title === 'string' && title.trim() !== "").slice(0,12);
        
        if (validTitles.length > 0) {
          setBlogData({ titles: validTitles });
          const currentCacheDuration = getRandomCacheDurationMs();
          try {
            localStorage.setItem(BLOG_TITLES_CACHE_KEY, JSON.stringify({ 
              timestamp: Date.now(), 
              cacheDurationUsed: currentCacheDuration,
              data: { titles: validTitles } 
            }));
          } catch (e) {
            // console.error("Failed to write blog titles to localStorage:", e);
          }
        } else {
          setTitleError("AI could not generate blog titles. Displaying defaults.");
          setBlogData(FALLBACK_TITLES);
        }
      } catch (err) {
        setTitleError("Failed to load blog titles. Displaying default topics.");
        setBlogData(FALLBACK_TITLES);
      } finally {
        setIsTitleLoading(false);
      }
    }

    loadBlogTitles();
  }, []);

  const placeholderTags = ["Tech", "Development", "DevOps", "AI", "Cloud", "Security", "Web", "Software", "Engineering", "Trends", "Guide", "Insights"];

  const handleToggleExpand = async (index: number) => {
    if (expandedPostIndex === index) {
      setExpandedPostIndex(null);
    } else {
      setExpandedPostIndex(index); 
      
      if (index >= hardcodedBlogPosts.length && 
          !aiGeneratedContent.has(index) && 
          !aiContentLoading.has(index) &&
          !aiContentError.has(index)) {
        
        setAiContentLoading(prev => new Set(prev).add(index));
        setAiContentError(prev => {
          const newMap = new Map(prev);
          newMap.delete(index);
          return newMap;
        });

        try {
          const title = blogData.titles[index];
          if (!title || title.trim() === "") { // Added check for empty/whitespace title
            throw new Error("Blog title is empty or invalid for AI generation.");
          }
          const generated: GenerateBlogContentOutput = await generateBlogContent({ title });
          if (!generated.content || generated.content.trim() === "") { // Check for empty generated content
             throw new Error("AI generated empty content for the blog post.");
          }
          setAiGeneratedContent(prev => new Map(prev).set(index, generated.content));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Failed to load content. Please try again.";
          setAiContentError(prev => new Map(prev).set(index, errorMessage));
        } finally {
          setAiContentLoading(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
          });
        }
      }
    }
  };

  const renderExpandedContent = (index: number) => {
    if (index < hardcodedBlogPosts.length) {
      const post = hardcodedBlogPosts[index];
      return post.paragraphs.map((paragraph, pIndex) => (
        <p key={`hardcoded-p-${index}-${pIndex}`} className="mb-2">{paragraph}</p>
      ));
    }
    if (aiContentLoading.has(index)) {
      return (
        <>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
        </>
      );
    }
    if (aiContentError.has(index)) {
      return (
        <div className="text-destructive flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2" />
          {aiContentError.get(index)}
        </div>
      );
    }
    if (aiGeneratedContent.has(index)) {
      return aiGeneratedContent.get(index)?.split('\n').map((paragraph, pIndex) => (
        paragraph.trim() && <p key={`ai-p-${index}-${pIndex}`} className="mb-2">{paragraph}</p>
      ));
    }
    // This state should ideally not be reached if loading is handled, but as a fallback:
    return <p>Preparing content...</p>; 
  };

  if (isTitleLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:items-start">
        {Array.from({ length: 6 }).map((_, i) => (
          <BlogCardSkeleton key={`skeleton-card-${i}`} />
        ))}
      </div>
    );
  }

  if (titleError && (!blogData.titles || blogData.titles.length === 0 || blogData.titles === FALLBACK_TITLES.titles)) {
    return (
      <div className="text-center py-8 bg-card p-6 rounded-lg shadow-md">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <p className="text-destructive mb-4 text-lg font-semibold">{titleError}</p>
        <h3 className="text-xl font-semibold mb-6 text-muted-foreground">Meanwhile, here are some default topics:</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:items-start">
          {FALLBACK_TITLES.titles.map((title, index) => {
             const cardKey = `fallback-card-${index}-${title.replace(/\s+/g, '-')}`;
             const isExpanded = expandedPostIndex === index; 
             const postContent = hardcodedBlogPosts[index % hardcodedBlogPosts.length]; 
            return (
              <Card key={cardKey} className="flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card">
                <CardHeader>
                  <CardTitle className="text-xl font-headline text-primary cursor-default">{title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{placeholderTags[index % placeholderTags.length]}</Badge>
                    <Badge variant="outline">{placeholderTags[(index + 1) % placeholderTags.length]}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    An insightful article exploring {title.toLowerCase().split(" ").slice(0,3).join(" ")}... Discover key concepts and practical advice.
                  </p>
                  <AnimatePresence>
                    {isExpanded && (
                       <motion.div
                        key={`fallback-content-motion-${index}-${title.replace(/\s+/g, '-')}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="mt-4 prose dark:prose-invert max-w-none text-sm overflow-hidden"
                      >
                        {postContent ? postContent.paragraphs.map((paragraph, pIndex) => (
                          <p key={`fallback-content-paragraph-${index}-${pIndex}`} className="mb-2">{paragraph}</p>
                        )) : <p>Full content for this topic is coming soon!</p>}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
                <CardFooter>
                   <Button 
                    variant="link" 
                    className="text-accent p-0 hover:text-accent/80" 
                    onClick={() => handleToggleExpand(index)}
                  >
                    <span>
                      {isExpanded ? "Read Less" : "Read More"}
                      {isExpanded ? <ChevronUp className="ml-2 h-4 w-4 inline" /> : <ArrowRight className="ml-2 h-4 w-4 inline" />}
                    </span>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:items-start">
      {(blogData.titles || []).map((title, index) => {
        const isExpanded = expandedPostIndex === index;
        const cardKey = `card-${index}-${title.replace(/\s+/g, '-')}`;
        const isLoadingThisCard = aiContentLoading.has(index);

        return (
          <Card key={cardKey} className="flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card">
            <CardHeader>
              <CardTitle className="text-xl font-headline text-primary cursor-default">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{placeholderTags[index % placeholderTags.length]}</Badge>
                <Badge variant="outline">{placeholderTags[(index + 2) % placeholderTags.length]}</Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                An insightful article exploring {title.toLowerCase().split(" ").slice(0,3).join(" ")}... Discover key concepts and practical advice.
              </p>
              <AnimatePresence>
                {isExpanded && ( 
                  <motion.div
                    key={`content-motion-${index}-${title.replace(/\s+/g, '-')}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mt-4 prose dark:prose-invert max-w-none text-sm overflow-hidden"
                  >
                    {renderExpandedContent(index)}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
            <CardFooter>
              <Button 
                variant="link" 
                className="text-accent p-0 hover:text-accent/80" 
                onClick={() => handleToggleExpand(index)}
                disabled={isLoadingThisCard}
              >
                <span>
                  {isLoadingThisCard ? "Loading..." : (isExpanded ? "Read Less" : "Read More")}
                  {isLoadingThisCard ? <Loader2 className="ml-2 h-4 w-4 inline animate-spin" /> : (isExpanded ? <ChevronUp className="ml-2 h-4 w-4 inline" /> : <ArrowRight className="ml-2 h-4 w-4 inline" />)}
                </span>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

