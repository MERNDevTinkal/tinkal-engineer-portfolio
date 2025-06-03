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
    blogData = await generateBlogTitles({ topic: "web development", numTitles: 12 });
  } catch (error) {
    console.error("Failed to generate blog titles:", error);
    // Provide fallback titles or handle error appropriately
    blogData = { titles: ["Error fetching titles. Please try again later."] };
  }

  const placeholderTags = ["React", "Node.js", "DevOps", "TypeScript", "AI"];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogData.titles.map((title, index) => (
        <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-headline text-primary">{title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex flex-wrap gap-2 mb-4">
              {placeholderTags.slice(index % placeholderTags.length, (index % placeholderTags.length) + 2).map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              A deep dive into {title.toLowerCase().split(" ").slice(0,3).join(" ")}... Explore insights and best practices.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="text-accent p-0">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
