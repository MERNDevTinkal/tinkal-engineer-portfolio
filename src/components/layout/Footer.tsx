
"use client"; // Add "use client" directive

import { useState, useEffect } from 'react'; // Import useState and useEffect
import { SOCIAL_LINKS, AUTHOR_NAME } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    // Set the current year on the client side after hydration
    setCurrentYear(new Date().getFullYear());
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <footer className="border-t border-border/50 bg-card text-card-foreground py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground mb-4 md:mb-0">
          {currentYear !== null ? (
            `© ${currentYear} ${AUTHOR_NAME}. All rights reserved.`
          ) : (
            // Fallback or loading state for the year
            `© ${new Date().getFullYear()} ${AUTHOR_NAME}. All rights reserved.` // Or a placeholder like "Loading year..."
          )}
        </p>
        <div className="flex items-center space-x-4">
          {SOCIAL_LINKS.map(({ name, Icon, href }) => (
            <Button variant="ghost" size="icon" asChild key={name}>
              <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                <span> {/* Ensure single child for Link when Button is asChild */}
                  <Icon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
