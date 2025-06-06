
// Removed "use client"; directive

import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { APP_NAME, AUTHOR_NAME, AUTHOR_EMAIL, SOCIAL_LINKS } from "@/lib/data";
import { DynamicChatbotLoader } from "@/components/layout/DynamicChatbotLoader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

// Enhanced Metadata for SEO
const siteUrl = "https://tinkal-engineer-portfolio.vercel.app"; // Replace with your actual deployed URL if different

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${AUTHOR_NAME} - Full Stack Developer | MERN, Next.js Portfolio`,
    template: `%s | ${AUTHOR_NAME} - Portfolio`,
  },
  description: `Explore the portfolio of ${AUTHOR_NAME}, a passionate and skilled Full Stack Developer specializing in MERN stack (MongoDB, Express.js, React, Node.js), Next.js, TypeScript, and AI integration. Discover projects, skills, and blog insights.`,
  keywords: [
    "Tinkal Kumar",
    "Tinkal",
    "Kumar",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "TypeScript",
    "JavaScript",
    "Portfolio",
    "Software Engineer",
    "Web Developer",
    "AI Integration",
    "MongoDB",
    "Express.js",
    "Genkit AI",
    "Jaipur Developer",
    "Bihar Developer"
  ],
  authors: [{ name: AUTHOR_NAME, url: SOCIAL_LINKS.find(l => l.name === "LinkedIn")?.href }],
  creator: AUTHOR_NAME,
  openGraph: {
    title: `${AUTHOR_NAME} - Full Stack Developer Portfolio`,
    description: `Discover ${AUTHOR_NAME}'s projects and skills in MERN stack, Next.js, and more.`,
    url: siteUrl,
    siteName: `${AUTHOR_NAME}'s Portfolio`,
    images: [
      {
        url: `${siteUrl}/websitelogo.png`, // Path to your logo in the public folder
        width: 512, // Adjust to your logo's dimensions
        height: 512,
        alt: `${AUTHOR_NAME}'s Portfolio Logo`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${AUTHOR_NAME} - Full Stack Developer Portfolio`,
    description: `Explore ${AUTHOR_NAME}'s work as a Full Stack Developer with expertise in MERN, Next.js, and AI.`,
    // creator: "@yourTwitterHandle", // Add your Twitter handle if you have one
    images: [`${siteUrl}/websitelogo.png`], // Path to your logo
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // manifest: "/site.webmanifest", // If you have a manifest file
  // icons: { // If you have specific favicons
  //   icon: "/favicon.ico",
  //   apple: "/apple-touch-icon.png",
  // },
};

// JSON-LD Structured Data for Person
const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": AUTHOR_NAME,
  "url": siteUrl,
  "image": `${siteUrl}/profile-1.jpg`, // A representative profile image
  "sameAs": SOCIAL_LINKS.map(link => link.href),
  "jobTitle": "Full Stack Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "OweBest Technologies Pvt Ltd" // Current company
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Raj Kumar Goel Institute of Technology, Ghaziabad"
  },
  "knowsAbout": metadata.keywords,
  "email": `mailto:${AUTHOR_EMAIL}`,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "addressCountry": "IN"
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow pt-20"> {/* Added pt-20 for navbar height */}
            {children}
          </main>
          <Footer />
          <Toaster />
          <DynamicChatbotLoader /> {/* Use the new loader component */}
        </ThemeProvider>
      </body>
    </html>
  );
}
