
"use client";

import Image from "next/image";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { HERO_TITLES, SOCIAL_LINKS, RESUME_PATH, AUTHOR_NAME } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton"; // Kept for potential future use or if image fails

// Removed Swiper and related imports

export function Hero() {
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <SectionWrapper id="home" className="pt-8 md:pt-12 bg-gradient-to-br from-background via-card to-secondary/10 dark:to-secondary/20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-center md:text-left"
        >
          <div className="space-y-4 mb-8">
            <motion.h1
              variants={textItemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-headline"
            >
              Hi, I&apos;m <span className="text-primary">{AUTHOR_NAME}</span>
            </motion.h1>

            <motion.div
              variants={textItemVariants}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold h-20 md:h-12 text-accent dark:text-accent"
            >
              <Typewriter
                words={HERO_TITLES}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </motion.div>

            <motion.p
              variants={textItemVariants}
              className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0"
            >
              A passionate developer transforming ideas into powerful and engaging web experiences.
            </motion.p>
          </div>

          <motion.div
            variants={textItemVariants}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-8"
          >
            <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50 transition-all duration-300 ease-in-out transform hover:scale-105">
              <Link href={RESUME_PATH} target="_blank" download>
                <Download className="mr-2 h-5 w-5 inline" />
                Download Resume
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-accent/50 transition-all duration-300 ease-in-out transform hover:scale-105">
              <Link href="#contact">
                Contact Me
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={textItemVariants}
            className="flex items-center justify-center md:justify-start space-x-4"
          >
            {SOCIAL_LINKS.map(({ name, Icon, href }) => (
               <motion.div
                key={name}
                whileHover={{ scale: 1.2, rotate: 3, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button variant="ghost" size="icon" asChild className="h-12 w-12">
                  <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                    <Icon className="h-8 w-8 text-muted-foreground hover:text-primary" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 100 }}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
        >
          {/* Simplified to display a single static image */}
          <div className="rounded-xl shadow-xl aspect-[3/4] border-4 border-card hover:border-primary/30 transition-colors duration-300 overflow-hidden relative">
            <Image
              src="/profile-1.jpg" // Directly accessing from public folder
              alt="Tinkal Kumar - Profile Image"
              fill
              className="object-cover"
              priority // Prioritize loading for LCP
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw"
              data-ai-hint="professional man"
            />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
