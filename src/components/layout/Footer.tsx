
"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { SOCIAL_LINKS, AUTHOR_NAME, NAV_LINKS, APP_NAME, AUTHOR_EMAIL } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Skeleton } from "@/components/ui/skeleton";

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setCurrentYear(new Date().getFullYear()); // Dynamically sets the current year

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility(); 
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const footerLinkedIn = SOCIAL_LINKS.find(link => link.name === "LinkedIn");
  const footerInstagram = SOCIAL_LINKS.find(link => link.name === "Instagram");

  const renderSocialIcons = () => (
     <div className="mt-4 flex justify-center md:justify-start space-x-3">
      {SOCIAL_LINKS.filter(link => link.name === "GitHub" || link.name === "LinkedIn" || link.name === "Instagram").map(({ name, Icon, href }) => (
        <Button
          variant="ghost"
          size="icon"
          key={name}
          onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
          aria-label={name}
          className="text-foreground/70 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-300 ease-in-out h-11 w-11"
        >
          <Icon className="h-6 w-6" />
        </Button>
      ))}
    </div>
  );

  const renderSocialIconsSkeleton = () => (
    <div className="mt-4 flex justify-center md:justify-start space-x-3">
      <Skeleton className="h-11 w-11 rounded-md" />
      <Skeleton className="h-11 w-11 rounded-md" />
      <Skeleton className="h-11 w-11 rounded-md" />
    </div>
  );

  const renderScrollToTopButton = () => (
     <Button
        onClick={scrollToTop}
        variant="default"
        size="icon"
        className={cn(
          "fixed bottom-6 left-6 h-12 w-12 rounded-full shadow-lg z-50 transition-all duration-300 ease-in-out hover:scale-105",
          isVisible && isMounted ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
  );

   const renderScrollToTopSkeleton = () => (
    <Skeleton className={cn(
        "fixed bottom-6 left-6 h-12 w-12 rounded-full shadow-lg z-50",
         isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none" // Keep visibility logic
    )} />
  );


  return (
    <>
      <footer className="relative border-t border-border/50 py-12 bg-card dark:bg-background overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/tech-stackmern.png')` }}
          data-ai-hint="tech abstract background"
        />
        <div className="absolute inset-0 z-10 bg-card/70 dark:bg-background/75" />

        <div className="container relative z-20 mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
            <div>
              <h3 className="text-lg font-semibold text-primary font-headline mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-foreground/80 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-300 ease-in-out text-sm">
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary font-headline mb-4">Connect With Me</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`mailto:${AUTHOR_EMAIL}`} className="text-foreground/80 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-300 ease-in-out text-sm flex items-center justify-center md:justify-start">
                    <span className="flex items-center">
                      <Mail className="h-5 w-5 mr-2" />
                      {AUTHOR_EMAIL}
                    </span>
                  </Link>
                </li>
                {footerLinkedIn && (
                  <li>
                    <Link href={footerLinkedIn.href} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-300 ease-in-out text-sm flex items-center justify-center md:justify-start">
                       <span className="flex items-center">
                        <footerLinkedIn.Icon className="h-5 w-5 mr-2" /> {footerLinkedIn.name}
                      </span>
                    </Link>
                  </li>
                )}
                {footerInstagram && (
                  <li>
                    <Link href={footerInstagram.href} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-300 ease-in-out text-sm flex items-center justify-center md:justify-start">
                       <span className="flex items-center">
                        <footerInstagram.Icon className="h-5 w-5 mr-2" /> {footerInstagram.name}
                      </span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary font-headline mb-4">{APP_NAME}</h3>
              <p className="text-sm text-foreground/70 dark:text-gray-400">
                Crafting digital experiences with passion and precision.
              </p>
              {isMounted ? renderSocialIcons() : renderSocialIconsSkeleton()}
            </div>
          </div>
          <div className="border-t border-border/30 pt-8 text-center">
            {isMounted && currentYear !== null ? (
              <p className="text-sm font-medium text-foreground/70 dark:text-gray-300">
                {`© ${currentYear} ${AUTHOR_NAME}. All rights reserved.`}
              </p>
            ) : (
               <Skeleton className="h-4 w-48 inline-block" />
            )}
          </div>
        </div>
      </footer>
      
      {isMounted ? renderScrollToTopButton() : renderScrollToTopSkeleton()}
    </>
  );
}
