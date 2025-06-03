"use client"; // Make this a client component

import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { BLOG_SECTION_DETAILS } from "@/lib/data";
import { BookOpen } from "lucide-react"; // Import the icon here
import { Suspense } from "react";
import { BlogList } from "./BlogList"; // Import the new Server Component

export default function Blogs() { // No longer async
  return (
    <SectionWrapper id="blogs">
      <SectionHeader
        title={BLOG_SECTION_DETAILS.title}
        subtitle={BLOG_SECTION_DETAILS.description}
        Icon={BookOpen} // Pass the imported BookOpen component
      />
      <Suspense fallback={<div className="text-center py-8"><p className="text-muted-foreground">Loading blog articles...</p></div>}>
        <BlogList />
      </Suspense>
    </SectionWrapper>
  );
}
