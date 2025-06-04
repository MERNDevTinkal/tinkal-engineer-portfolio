
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { APP_NAME, AUTHOR_NAME } from "@/lib/data";
import { ChatbotDialog } from "@/components/chatbot/ChatbotDialog";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${APP_NAME} | ${AUTHOR_NAME} - Full Stack Developer`,
  description: `Portfolio of ${AUTHOR_NAME}, a passionate Full Stack Developer specializing in MERN stack, Next.js, and modern web technologies.`,
  keywords: "Tinkal Kumar, Full Stack Developer, MERN Stack, Next.js, React, Node.js, TypeScript, Portfolio",
  authors: [{ name: AUTHOR_NAME }],
  creator: AUTHOR_NAME,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Original font links from scaffold - Keep or remove based on direct usage preference */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Inter and Space Grotesk are now handled by next/font, but keeping example structure if needed for other fonts */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" /> */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" /> */}
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow pt-20"> {/* Added pt-20 for navbar height */}
            {children}
          </main>
          <Footer />
          <Toaster />
          <ChatbotDialog />
        </ThemeProvider>
      </body>
    </html>
  );
}
