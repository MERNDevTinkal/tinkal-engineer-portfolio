
import type { Metadata, ResolvingMetadata } from 'next'; // Import ResolvingMetadata
import { AUTHOR_NAME } from '@/lib/data';
import BlogPostPageClient from '@/components/blog/BlogPostPageClient';

// Props type definition, can still be used by the Page component
export type BlogPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// generateMetadata with inline types for its parameters
export async function generateMetadata(
  { params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] | undefined } },
  parent?: ResolvingMetadata // parent is optional and can be omitted if not used
): Promise<Metadata> {
  let pageTitle = 'Blog Post'; // Default title

  if (searchParams) { // Check if searchParams object exists
    let titleValue = searchParams.title;

    // Handle if titleValue is an array (take the first element)
    if (Array.isArray(titleValue)) {
      titleValue = titleValue[0];
    }

    // Ensure titleValue is a string and not empty before decoding
    if (typeof titleValue === 'string' && titleValue.trim() !== '') {
      try {
        pageTitle = decodeURIComponent(titleValue);
      } catch (e) {
        // console.error("Error decoding title for metadata:", e);
        // pageTitle remains 'Blog Post' or some other default if decoding fails
      }
    }
  }

  return {
    title: `${pageTitle} | ${AUTHOR_NAME}'s Blog`,
    description: `Read more about ${pageTitle} on ${AUTHOR_NAME}'s tech blog.`,
    // Example of using parent metadata if needed:
    // const previousImages = (await parent)?.openGraph?.images || []
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}

// This is now a Server Component, using BlogPageProps for its own props
export default function BlogPostPage({ params, searchParams }: BlogPageProps) {
  // It renders the client component, passing props through
  return <BlogPostPageClient params={params} searchParams={searchParams} />;
}
