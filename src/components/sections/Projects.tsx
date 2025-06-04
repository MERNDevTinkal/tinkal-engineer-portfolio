
"use client";

import Link from "next/link";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/button";
import { PROJECTS_DATA, SOCIAL_LINKS } from "@/lib/data";
import { Briefcase, Github } from "lucide-react";

export function Projects() {
  const githubProfileUrl = SOCIAL_LINKS.find(link => link.name === "GitHub")?.href || "https://github.com/MERNDevTinkal";

  return (
    <SectionWrapper id="projects" className="bg-secondary/30 dark:bg-card/50">
      <SectionHeader title="My Creations" subtitle="A selection of projects I've passionately built." Icon={Briefcase} />
      {PROJECTS_DATA.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground mb-12">
          <p>More projects coming soon! Check out my GitHub for my latest work.</p>
        </div>
      )}
      <div className="text-center">
        <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <Link href={githubProfileUrl} target="_blank" rel="noopener noreferrer">
            <span>
              <Github className="mr-2 h-5 w-5 inline" /> {/* Default icon size from button.tsx */}
              View More on GitHub
            </span>
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
