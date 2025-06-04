
import type { Metadata } from 'next';
import { AUTHOR_NAME } from '@/lib/data';
import BlogPostPageClient from '@/components/blog/BlogPostPageClient'; // Import the new client component

// Props type definition, can be used by both generateMetadata and the Page component
export type BlogPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// generateMetadata remains a server-side function in this file
export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const title = searchParams.title ? decodeURIComponent(searchParams.title as string) : 'Blog Post';
  return {
    title: `${title} | ${AUTHOR_NAME}'s Blog`,
    description: `Read more about ${title} on ${AUTHOR_NAME}'s tech blog.`,
  };
}

// This is now a Server Component
export default function BlogPostPage({ params, searchParams }: BlogPageProps) {
  // It renders the client component, passing props through
  return <BlogPostPageClient params={params} searchParams={searchParams} />;
}
