
"use client"; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <SectionWrapper id="error-page" className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 max-w-md w-full bg-card rounded-xl shadow-2xl"
      >
        <AlertTriangle className="mx-auto h-16 w-16 text-destructive mb-6" />
        <h1 className="text-3xl font-bold text-destructive font-headline mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-muted-foreground mb-2">
          We encountered an unexpected issue. Please try again.
        </p>
        {error?.message && (
           <p className="text-sm text-muted-foreground/80 mb-6 bg-muted p-3 rounded-md">
             <span className="font-semibold">Details:</span> {error.message}
           </p>
        )}


        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => reset()}
            variant="outline"
            size="lg"
            className="shadow-md"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Try Again
          </Button>
          <Button asChild size="lg" className="shadow-md">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go to Homepage
            </Link>
          </Button>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
