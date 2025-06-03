
"use client";

import { useState, useEffect } from 'react';
import { generateBlogTitles, type GenerateBlogTitlesOutput } from "@/ai/flows/generate-blog-titles";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BlogList() {
  const [blogData, setBlogData] = useState<GenerateBlogTitlesOutput>({ titles: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        // Use new default topic from the flow, or specify if needed. numTitles will also use flow's default (12).
        const data = await generateBlogTitles({ topic: "technology, software development, and DevOps", numTitles: 12 });
        setBlogData(data);
        setError(null);
      } catch (err) {
        console.error("Failed to generate blog titles:", err);
        setError("Failed to load blog titles. Please try again later.");
        // Provide fallback titles or handle error appropriately
        setBlogData({ titles: ["Error fetching titles. Please try again later.", "Exploring the latest in tech.", "DevOps best practices.", "Software engineering insights.", "The future of development.", "AI in modern applications.", "Cloud computing trends.", "Cybersecurity essentials.", "Data science breakthroughs.", "Web performance optimization.", "Mobile app development innovations.", "Blockchain technology explained."].slice(0,12) });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const placeholderTags = ["Tech", "Development", "DevOps", "AI", "Cloud", "Security"];

  if (isLoading) {
    return <div className="text-center py-8"><p className="text-muted-foreground">Loading blog articles...</p></div>;
  }

  if (error) {
    // You might want to display the fallback titles here as well, or just the error.
    // For now, just showing the error message.
    return (
        <div className="text-center py-8">
            <p className="text-destructive mb-4">{error}</p>
            <h3 className="text-xl font-semibold mb-4">Meanwhile, here are some default topics:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogData.titles.map((title, index) => (
                <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
                <CardHeader>
                    <CardTitle className="text-xl font-headline text-primary">{title}</CardTitle>
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
                    <Button variant="link" className="text-accent p-0 hover:text-accent/80">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
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
        <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-headline text-primary">{title}</CardTitle>
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
            <Button variant="link" className="text-accent p-0 hover:text-accent/80">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
