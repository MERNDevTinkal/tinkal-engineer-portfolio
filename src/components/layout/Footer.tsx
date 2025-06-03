
import { SOCIAL_LINKS, AUTHOR_NAME } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card text-card-foreground py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground mb-4 md:mb-0">
          &copy; {currentYear} {AUTHOR_NAME}. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          {SOCIAL_LINKS.map(({ name, Icon, href }) => (
            <Button variant="ghost" size="icon" asChild key={name}>
              <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                {/* Wrap icon in a span to ensure Link has a single child for asChild prop on Button */}
                <span>
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
