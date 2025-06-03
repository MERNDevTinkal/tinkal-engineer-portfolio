"use client"

import type { HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id: string;
  className?: string;
  delay?: number;
}

export function SectionWrapper({ id, className, children, delay = 0.2, ...props }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={cn("py-16 md:py-24 min-h-screen flex flex-col justify-center", className)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      {...props}
    >
      <div className="container mx-auto px-4 md:px-6">
        {children}
      </div>
    </motion.section>
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
