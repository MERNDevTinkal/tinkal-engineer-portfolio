
import Link from 'next/link';
import { motion } from 'framer-motion'; 
import { FileQuestion, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

// This can be a Server Component or a Client Component.
// For motion animations, it would typically be a Client Component.
// Add "use client"; if you uncomment framer-motion parts and want client-side animation.

export default function NotFoundPage() {
  return (
    <SectionWrapper id="not-found-page" className="min-h-screen flex items-center justify-center bg-background">
      {/* 
      If using framer-motion client-side, uncomment this and "use client"
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 max-w-md w-full bg-card rounded-xl shadow-2xl"
      > 
      */}
      <div className="text-center p-8 max-w-md w-full bg-card rounded-xl shadow-2xl">
        <FileQuestion className="mx-auto h-16 w-16 text-primary mb-6" />
        <h1 className="text-4xl font-bold text-primary font-headline mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild size="lg" className="shadow-md">
          <Link href="/">
            <span>
              <Home className="mr-2 h-5 w-5" />
              Go to Homepage
            </span>
          </Link>
        </Button>
      </div>
      {/* </motion.div> */}
    </SectionWrapper>
  );
}
