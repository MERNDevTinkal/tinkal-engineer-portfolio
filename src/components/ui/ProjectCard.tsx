"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Github, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project, TechStackItem } from "@/lib/data";
import { Badge } from "./badge";


interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.03, y: -5, boxShadow: "0px 10px 20px hsla(var(--primary), 0.2)" }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
        <div className="relative w-full h-56">
           <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            data-ai-hint={project.dataAiHint}
          />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary">{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            {project.description}
          </p>
          <div className="mb-4">
            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech.name} variant="secondary" className="text-xs">
                  {typeof tech.Icon !== 'string' && <tech.Icon className="h-3 w-3 mr-1" />}
                  {tech.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-auto grid grid-cols-2 gap-2">
          <Button asChild variant="outline">
            <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={project.githubRepoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
