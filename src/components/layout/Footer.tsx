
"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { SOCIAL_LINKS, AUTHOR_NAME, NAV_LINKS, APP_NAME, AUTHOR_EMAIL } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility(); // Call once to set initial state
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const footerLinkedIn = SOCIAL_LINKS.find(link => link.name === "LinkedIn");

  return (
    <>
      <footer className="border-t border-border/50 bg-card text-card-foreground py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
            <div>
              <h3 className="text-lg font-semibold text-primary font-headline mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary font-headline mb-4">Connect With Me</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`mailto:${AUTHOR_EMAIL}`} className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center justify-center md:justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    {AUTHOR_EMAIL}
                  </Link>
                </li>
                {footerLinkedIn && (
                  <li>
                    <Link href={footerLinkedIn.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center justify-center md:justify-start">
                      <footerLinkedIn.Icon className="h-4 w-4 mr-2" /> {footerLinkedIn.name}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary font-headline mb-4">{APP_NAME}</h3>
              <p className="text-sm text-muted-foreground">
                Crafting digital experiences with passion and precision.
              </p>
               <div className="mt-4 flex justify-center md:justify-start space-x-3">
                {SOCIAL_LINKS.filter(link => link.name === "GitHub" || link.name === "LinkedIn").map(({ name, Icon, href }) => (
                  <Button variant="ghost" size="icon" asChild key={name} className="text-muted-foreground hover:text-primary">
                    <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                      <span> 
                        <Icon className="h-5 w-5" />
                      </span>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-border/30 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {currentYear !== null ? (
                `© ${currentYear} ${AUTHOR_NAME}. All rights reserved.`
              ) : (
                `© ${AUTHOR_NAME}. All rights reserved.` 
              )}
            </p>
          </div>
        </div>
      </footer>
      
      <Button
        onClick={scrollToTop}
        variant="default"
        size="icon"
        className={cn(
          "fixed bottom-6 left-6 h-12 w-12 rounded-full shadow-lg z-50 transition-all duration-300 ease-in-out hover:scale-110", // Changed right-6 to left-6
          isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </>
  );
}
