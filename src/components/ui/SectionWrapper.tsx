
"use client"

import type { HTMLAttributes } from "react";
// Removed motion import as SectionWrapper itself will no longer be a motion component
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id: string;
  className?: string;
  // delay prop is no longer used by SectionWrapper if it's not animating itself
}

export function SectionWrapper({ id, className, children, ...props }: SectionWrapperProps) {
  return (
    // Changed from motion.section to section
    // Removed initial, whileInView, viewport, transition props
    <section
      id={id}
      className={cn("py-16 md:py-24 min-h-screen flex flex-col justify-center", className)}
      {...props}
    >
      <div className="container mx-auto px-4 md:px-6">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  Icon?: React.ElementType;
}

export function SectionHeader({ title, subtitle, Icon }: SectionHeaderProps) {
  return (
    <div className="mb-12 text-center">
      {Icon && <Icon className="mx-auto mb-4 h-12 w-12 text-primary" />}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
