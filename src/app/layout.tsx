
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { APP_NAME, AUTHOR_NAME, AUTHOR_EMAIL, SOCIAL_LINKS, LOGO_PATH } from "@/lib/data";
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

const siteUrl = "https://tinkal-engineer-portfolio.vercel.app"; 

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${AUTHOR_NAME} | Full Stack Developer & AI Engineer`,
    template: `%s | ${AUTHOR_NAME}`,
  },
  description: `Explore the portfolio of ${AUTHOR_NAME}, a passionate and skilled Full Stack Developer specializing in MERN stack, Next.js, TypeScript, and AI integration.`,
  keywords: [
    "Tinkal Kumar",
    "Full Stack Developer",
    "MERN Stack",
    "Next.js Developer",
    "Software Engineer",
    "AI Integration",
    "Portfolio"
  ],
  authors: [{ name: AUTHOR_NAME, url: SOCIAL_LINKS.find(l => l.name === "LinkedIn")?.href }],
  creator: AUTHOR_NAME,
  icons: {
    icon: LOGO_PATH,
    shortcut: LOGO_PATH,
    apple: LOGO_PATH,
  },
  openGraph: {
    title: `${AUTHOR_NAME} - Full Stack Developer Portfolio`,
    description: `Discover ${AUTHOR_NAME}'s projects and skills in MERN stack, Next.js, and more.`,
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
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": AUTHOR_NAME,
  "url": siteUrl,
  "image": `${siteUrl}/profile-1.jpg`, 
  "sameAs": SOCIAL_LINKS.map(link => link.href),
  "jobTitle": "Full Stack Developer",
  "knowsAbout": ["MERN Stack", "Next.js", "AI Integration", "TypeScript"],
  "email": `mailto:${AUTHOR_EMAIL}`,
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
