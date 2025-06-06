
import type { MetadataRoute } from 'next';
import { NAV_LINKS, hardcodedBlogPosts } from '@/lib/data'; // Assuming hardcodedBlogPosts is exported from data.ts for blog IDs

const siteUrl = 'https://tinkal-engineer-portfolio.vercel.app'; // Your production URL

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPageEntries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Add main navigation sections if they were distinct pages,
    // but for a single-page app with hash links, the root URL covers them.
    // Example for a true separate page:
    // {
    //   url: `${siteUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];

  // Generate sitemap entries for blog posts
  // This example uses hardcodedBlogPosts IDs.
  // If your blog titles/IDs are purely dynamic from AI, sitemap generation becomes more complex.
  const blogPostEntries: MetadataRoute.Sitemap = hardcodedBlogPosts.map((post, index) => {
    // The title from hardcodedBlogPosts might not match the one used in URL searchParams exactly.
    // For sitemap, we just need the base path.
    // If your BlogPage component requires the title param for basic rendering,
    // this sitemap won't provide it, but Google should still index the core page content.
    return {
      url: `${siteUrl}/blog/${post.id}`, // Using post.id, assuming it's the '0', '1', etc.
      lastModified: new Date(), // Ideally, use actual post modification date
      changeFrequency: 'weekly',
      priority: 0.7,
    };
  });

  // You can also add a generic /blog path if you have a listing page there
  // staticPageEntries.push({
  //   url: `${siteUrl}/blog`,
  //   lastModified: new Date(),
  //   changeFrequency: 'weekly',
  //   priority: 0.7,
  // });

  return [...staticPageEntries, ...blogPostEntries];
}
