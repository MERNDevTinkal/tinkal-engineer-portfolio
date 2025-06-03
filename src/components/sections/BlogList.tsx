// This component is implicitly a Server Component as it's async and not marked "use client"
// The generateBlogTitles flow it calls is already "use server".

import { generateBlogTitles, type GenerateBlogTitlesOutput } from "@/ai/flows/generate-blog-titles";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export async function BlogList() {
  let blogData: GenerateBlogTitlesOutput = { titles: [] };
  try {
    // Use new default topic from the flow, or specify if needed. numTitles will also use flow's default (12).
    blogData = await generateBlogTitles({ topic: "technology, software development, and DevOps", numTitles: 12 });
  } catch (error) {
    console.error("Failed to generate blog titles:", error);
    // Provide fallback titles or handle error appropriately
    blogData = { titles: ["Error fetching titles. Please try again later.", "Exploring the latest in tech.", "DevOps best practices.", "Software engineering insights.", "The future of development.", "AI in modern applications.", "Cloud computing trends.", "Cybersecurity essentials.", "Data science breakthroughs.", "Web performance optimization.", "Mobile app development innovations.", "Blockchain technology explained."].slice(0,12) };
  }

  const placeholderTags = ["Tech", "Development", "DevOps", "AI", "Cloud", "Security"];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogData.titles.map((title, index) => (
        <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-headline text-primary">{title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex flex-wrap gap-2 mb-4">
              {/* Cycle through placeholder tags for variety */}
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
