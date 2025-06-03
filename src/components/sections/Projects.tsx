"use client";

import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS_DATA } from "@/lib/data";
import { Briefcase } from "lucide-react";

export function Projects() {
  return (
    <SectionWrapper id="projects" className="bg-secondary/30 dark:bg-card/50">
      <SectionHeader title="My Creations" subtitle="A selection of projects I've passionately built." Icon={Briefcase} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS_DATA.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
