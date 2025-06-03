
"use client"; // Make this a client component

import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { BLOG_SECTION_DETAILS } from "@/lib/data";
import { BookOpen } from "lucide-react"; // Import the icon here
// Suspense is no longer needed here as BlogList will handle its own loading state
import { BlogList } from "./BlogList"; 

export default function Blogs() { 
  return (
    <SectionWrapper id="blogs">
      <SectionHeader
        title={BLOG_SECTION_DETAILS.title}
        subtitle={BLOG_SECTION_DETAILS.description}
        Icon={BookOpen} 
      />
      {/* BlogList now handles its own loading/error states */}
      <BlogList />
    </SectionWrapper>
  );
}
