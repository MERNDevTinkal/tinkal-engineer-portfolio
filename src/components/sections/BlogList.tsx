
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { generateBlogTitles, type GenerateBlogTitlesOutput } from "@/ai/flows/generate-blog-titles";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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


export function BlogList() {
  const [blogData, setBlogData] = useState<GenerateBlogTitlesOutput>({ titles: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await generateBlogTitles({ topic: "technology, software development, and DevOps", numTitles: 12 });
        setBlogData(data);
        setError(null);
      } catch (err) {
        // Set a generic error message for any failure.
        const genericErrorMessage = "Failed to load blog titles. Please try again later.";
        setError(genericErrorMessage);
        // Fallback titles in case of error
        setBlogData({ titles: ["Exploring the Latest in Tech.", "DevOps Best Practices.", "Software Engineering Insights.", "The Future of Development.", "AI in Modern Applications.", "Cloud Computing Trends.", "Cybersecurity Essentials.", "Data Science Breakthroughs.", "Web Performance Optimization.", "Mobile App Development Innovations.", "Blockchain Technology Explained.", "Mastering New Programming Languages."].slice(0,12) });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
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

  if (error) { // Display error and fallback titles
    return (
        <div className="text-center py-8">
            <p className="text-destructive mb-4 text-lg">{error}</p>
            <h3 className="text-xl font-semibold mb-6 text-muted-foreground">Meanwhile, here are some default topics:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogData.titles.map((title, index) => (
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
                       <Link href={`/blog/${index}?title=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer">
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
      {blogData.titles.map((title, index) => (
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
              <Link href={`/blog/${index}?title=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer">
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
