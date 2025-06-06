
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
const siteUrl = "https://tinkal-engineer-portfolio.vercel.app"; 

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${AUTHOR_NAME} - Full Stack Developer | MERN, Next.js Portfolio`,
    template: `%s | ${AUTHOR_NAME} - Portfolio`,
  },
  description: `Explore the portfolio of ${AUTHOR_NAME}, a passionate and skilled Full Stack Developer and software engineer from Jamui, Bihar, specializing in MERN stack (MongoDB, Express.js, React, Node.js), Next.js, TypeScript, and AI integration. Discover projects, skills, and blog insights. Alumnus of RKGIT and AKTU.`,
  keywords: [
    "Tinkal Kumar",
    "Tinkal",
    "Kumar",
    "Tinkal Engineer",
    "engineer",
    "software engineer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "TypeScript",
    "JavaScript",
    "Portfolio",
    "Web Developer",
    "AI Integration",
    "MongoDB",
    "Express.js",
    "Genkit AI",
    "Jaipur Developer",
    "Bihar Developer",
    "Jamui", // Hometown
    "RKGIT", // College short name
    "Raj Kumar Goel Institute of Technology", // College full name
    "AKTU", // University short name
    "Dr. A.P.J. Abdul Kalam Technical University", // University full name
    "MERN stack engineer",
    "Next.js engineer",
    "tech portfolio",
    "developer portfolio"
  ],
  authors: [{ name: AUTHOR_NAME, url: SOCIAL_LINKS.find(l => l.name === "LinkedIn")?.href }],
  creator: AUTHOR_NAME,
  openGraph: {
    title: `${AUTHOR_NAME} - Full Stack Developer Portfolio`,
    description: `Discover ${AUTHOR_NAME}'s projects and skills in MERN stack, Next.js, and more. Software engineer from Jamui, Bihar. RKGIT & AKTU alumnus.`,
    url: siteUrl,
    siteName: `${AUTHOR_NAME}'s Portfolio`,
    images: [
      {
        url: `${siteUrl}/websitelogo.png`, 
        width: 512, 
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
    description: `Explore ${AUTHOR_NAME}'s work as a Full Stack Developer with expertise in MERN, Next.js, and AI. Software engineer from Jamui, Bihar.`,
    images: [`${siteUrl}/websitelogo.png`], 
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
};

// JSON-LD Structured Data for Person
const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": AUTHOR_NAME,
  "url": siteUrl,
  "image": `${siteUrl}/profile-1.jpg`, 
  "sameAs": SOCIAL_LINKS.map(link => link.href),
  "jobTitle": "Full Stack Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "OweBest Technologies Pvt Ltd" 
  },
  "alumniOf": [
    {
      "@type": "CollegeOrUniversity",
      "name": "Raj Kumar Goel Institute of Technology, Ghaziabad"
    },
    {
      "@type": "CollegeOrUniversity",
      "name": "Dr. A.P.J. Abdul Kalam Technical University, Lucknow"
    }
  ],
  "knowsAbout": metadata.keywords, // Uses the comprehensive keywords list
  "email": `mailto:${AUTHOR_EMAIL}`,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "addressCountry": "IN"
  },
  "homeLocation": { // Added for hometown context
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jamui",
      "addressRegion": "Bihar",
      "addressCountry": "IN"
    }
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
          <main className="flex-grow pt-20"> 
            {children}
          </main>
          <Footer />
          <Toaster />
          <DynamicChatbotLoader /> 
        </ThemeProvider>
      </body>
    </html>
  );
}
