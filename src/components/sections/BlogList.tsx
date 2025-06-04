
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { generateBlogTitles, type GenerateBlogTitlesOutput } from "@/ai/flows/generate-blog-titles";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const BLOG_TITLES_CACHE_KEY = 'aiBlogTitlesCache_v1'; // Incremented cache key version
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CachedBlogTitles {
  timestamp: number;
  data: GenerateBlogTitlesOutput;
}

function BlogCardSkeleton() {
  return (
    <Card className="flex flex-col shadow-lg bg-card">
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
    "Cybersecurity Essentials for Developers",
    "Data Science Breakthroughs This Year",
    "Web Performance Optimization Techniques",
    "Mobile App Development Innovations and Ideas",
    "Blockchain Technology Explained Simply",
    "Mastering New Programming Languages Efficiently",
  ].slice(0, 12)
};

export function BlogList() {
  const [blogData, setBlogData] = useState<GenerateBlogTitlesOutput>({ titles: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlogTitles() {
      setIsLoading(true);
      setError(null);

      try {
        const cachedItem = localStorage.getItem(BLOG_TITLES_CACHE_KEY);
        if (cachedItem) {
          const cached: CachedBlogTitles = JSON.parse(cachedItem);
          if (cached && cached.timestamp && cached.data && cached.data.titles && (Date.now() - cached.timestamp < CACHE_DURATION_MS)) {
            const validCachedTitles = cached.data.titles.filter(title => title && title.trim() !== "");
            if (validCachedTitles.length > 0) {
              setBlogData({ titles: validCachedTitles });
              setIsLoading(false);
              return;
            }
          }
        }
      } catch (e) {
        // console.error("Failed to read blog titles from localStorage:", e);
      }

      try {
        const data = await generateBlogTitles({ topic: "technology, software development, and DevOps", numTitles: 12 });
        const validTitles = (data.titles || []).filter(title => title && title.trim() !== "");
        
        if (validTitles.length > 0) {
          setBlogData({ titles: validTitles });
          try {
            localStorage.setItem(BLOG_TITLES_CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: { titles: validTitles } }));
          } catch (e) {
            // console.error("Failed to write blog titles to localStorage:", e);
          }
        } else {
          // console.warn("AI generated no valid titles, using fallbacks.");
          setError("Could not fetch fresh blog titles. Displaying defaults."); // More user-friendly error
          setBlogData(FALLBACK_TITLES);
        }
      } catch (err) {
        // console.error("Error fetching blog titles from AI:", err);
        setError("Failed to load blog titles. Displaying default topics.");
        setBlogData(FALLBACK_TITLES);
      } finally {
        setIsLoading(false);
      }
    }

    loadBlogTitles();
  }, []);

  const placeholderTags = ["Tech", "Development", "DevOps", "AI", "Cloud", "Security", "Web", "Software", "Engineering", "Trends", "Guide", "Insights"];

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error && (!blogData.titles || blogData.titles.length === 0 || blogData.titles === FALLBACK_TITLES.titles)) {
    return (
        <div className="text-center py-8">
            <p className="text-destructive mb-4 text-lg">{error}</p>
            <h3 className="text-xl font-semibold mb-6 text-muted-foreground">Meanwhile, here are some default topics:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FALLBACK_TITLES.titles.map((title, index) => (
                <Card key={index} className="flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card">
                <CardHeader>
                  <Link href={`/blog/${index}?title=${encodeURIComponent(title)}`} legacyBehavior={false}>
                    <CardTitle className="text-xl font-headline text-primary hover:underline cursor-pointer">{title}</CardTitle>
                  </Link>
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{placeholderTags[index % placeholderTags.length]}</Badge>
                    <Badge variant="outline">{placeholderTags[(index + 1) % placeholderTags.length]}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                    An insightful article exploring {title.toLowerCase().split(" ").slice(0,3).join(" ")}... Discover key concepts and practical advice.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button asChild variant="link" className="text-accent p-0 hover:text-accent/80">
                       <Link href={`/blog/${index}?title=${encodeURIComponent(title)}`}>
                        <span>
                          Read More <ArrowRight className="ml-2 h-4 w-4 inline" />
                        </span>
                      </Link>
                    </Button>
                </CardFooter>
                </Card>
            ))}
            </div>
        </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {(blogData.titles || []).map((title, index) => (
        <Card key={index} className="flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card">
          <CardHeader>
            <Link href={`/blog/${index}?title=${encodeURIComponent(title)}`} legacyBehavior={false}>
             <CardTitle className="text-xl font-headline text-primary hover:underline cursor-pointer">{title}</CardTitle>
            </Link>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{placeholderTags[index % placeholderTags.length]}</Badge>
              <Badge variant="outline">{placeholderTags[(index + 2) % placeholderTags.length]}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              An insightful article exploring {title.toLowerCase().split(" ").slice(0,3).join(" ")}... Discover key concepts and practical advice.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="link" className="text-accent p-0 hover:text-accent/80">
              <Link href={`/blog/${index}?title=${encodeURIComponent(title)}`}>
                <span>
                  Read More <ArrowRight className="ml-2 h-4 w-4 inline" />
                </span>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
