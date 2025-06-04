
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/lib/data";
import { Badge } from "./badge";
import { useToast } from "@/hooks/use-toast";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { toast } = useToast();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.15,
      },
    },
  };

  const handleLiveDemoClick = () => {
    if (!project.liveDemoUrl || project.liveDemoUrl === "#" || project.liveDemoUrl.trim() === "") {
      toast({
        title: "Project Update",
        description: "This project is currently in maintenance or undergoing improvements. Please check back later!",
        variant: "default",
      });
    }
  };

  const hasValidLiveDemo = project.liveDemoUrl && project.liveDemoUrl !== "#" && project.liveDemoUrl.trim() !== "";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.03, y: -6, boxShadow: "0px 12px 25px hsla(var(--primary), 0.25)" }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-card border border-border/70 hover:border-primary/50">
        <CardHeader className="pb-3 pt-5">
          <CardTitle className="text-xl sm:text-2xl font-headline text-primary">{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pt-0">
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
          <div className="mb-4">
            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2 tracking-wider">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech.name} variant="secondary" className="text-xs px-2.5 py-1">
                  {typeof tech.Icon !== 'string' && <tech.Icon className="h-3.5 w-3.5 mr-1.5" />}
                  {tech.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-auto pt-4 pb-5 px-5 grid grid-cols-2 gap-3">
          {hasValidLiveDemo ? (
            <Button asChild variant="outline" className="w-full transform hover:scale-105">
              <Link href={project.liveDemoUrl!} target="_blank" rel="noopener noreferrer">
                <span>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </span>
              </Link>
            </Button>
          ) : (
            <Button variant="outline" className="w-full transform hover:scale-105" onClick={handleLiveDemoClick}>
              <ExternalLink className="mr-2 h-4 w-4 opacity-50" />
              Live Demo
            </Button>
          )}
          <Button asChild variant="default" className="w-full transform hover:scale-105">
            <Link href={project.githubRepoUrl} target="_blank" rel="noopener noreferrer">
              <span>
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
