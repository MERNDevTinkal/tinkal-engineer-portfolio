"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { ABOUT_ME, TECH_STACK, AUTHOR_NAME } from "@/lib/data";
import { TechBadge } from "@/components/ui/TechBadge";
import { UserCircle2 } from "lucide-react";

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <SectionWrapper id="about">
      <SectionHeader title="About Me" Icon={UserCircle2} />
      <div className="grid md:grid-cols-5 gap-12 items-start">
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src="https://placehold.co/500x600.png?text=Tinkal+Coding"
            alt={`${AUTHOR_NAME} coding`}
            width={500}
            height={600}
            className="rounded-lg shadow-xl object-cover w-full aspect-[4/5]"
            data-ai-hint="developer workspace"
          />
        </motion.div>
        <motion.div
          className="md:col-span-3 space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-primary font-headline">Professional Summary</h3>
            <p className="text-muted-foreground leading-relaxed">{ABOUT_ME.summary}</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-primary font-headline">Passion for Technology</h3>
            <p className="text-muted-foreground leading-relaxed">{ABOUT_ME.passion}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-muted-foreground">
              <ABOUT_ME.IconLocation className="h-5 w-5 mr-2 text-accent" />
              <span>{ABOUT_ME.location}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <ABOUT_ME.IconRelocation className="h-5 w-5 mr-2 text-accent" />
              <span>{ABOUT_ME.relocation}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h3 className="text-2xl font-semibold text-center mb-8 text-primary font-headline">My Tech Toolkit</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {TECH_STACK.map((tech, index) => (
            <TechBadge key={tech.name} name={tech.name} Icon={tech.Icon} index={index} />
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
