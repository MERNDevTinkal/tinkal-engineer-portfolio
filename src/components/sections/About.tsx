
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { ABOUT_ME, TECH_STACK, AUTHOR_NAME, EDUCATION_DATA, WORK_EXPERIENCE_DATA } from "@/lib/data";
import { TechBadge } from "@/components/ui/TechBadge";
import { UserCircle2, Briefcase, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <SectionWrapper id="about">
      <SectionHeader title="About Me" Icon={UserCircle2} />
      <div className="grid md:grid-cols-5 gap-12 items-start mb-16">
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

      {/* Education Section */}
      <motion.div 
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <h3 className="text-3xl font-semibold text-center mb-10 text-primary font-headline flex items-center justify-center">
          <GraduationCap className="h-10 w-10 mr-3 text-primary" /> My Education
        </h3>
        <div className="space-y-8">
          {EDUCATION_DATA.map((edu, index) => (
            <motion.div key={`${edu.degree}-${index}`} variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start sm:items-center space-x-4">
                    {edu.Icon && <edu.Icon className="h-10 w-10 sm:h-12 sm:w-12 text-accent flex-shrink-0 mt-1 sm:mt-0" />}
                    <div>
                      <CardTitle className="text-xl lg:text-2xl font-headline text-primary">{edu.degree}</CardTitle>
                      <p className="text-md text-muted-foreground font-medium">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.graduationYear}</p>
                    </div>
                  </div>
                </CardHeader>
                {edu.details && edu.details.length > 0 && (
                  <CardContent>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-2">
                      {edu.details.map((detail, i) => <li key={i}>{detail}</li>)}
                    </ul>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Work Experience Section */}
      <motion.div 
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <h3 className="text-3xl font-semibold text-center mb-10 text-primary font-headline flex items-center justify-center">
          <Briefcase className="h-10 w-10 mr-3 text-primary" /> Work Experience
        </h3>
        <div className="space-y-8">
          {WORK_EXPERIENCE_DATA.map((exp, index) => (
             <motion.div key={`${exp.title}-${index}`} variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start sm:items-center space-x-4">
                    {exp.Icon && <exp.Icon className="h-10 w-10 sm:h-12 sm:w-12 text-accent flex-shrink-0 mt-1 sm:mt-0" />}
                    <div>
                      <CardTitle className="text-xl lg:text-2xl font-headline text-primary">{exp.title}</CardTitle>
                      <p className="text-md text-muted-foreground font-medium">{exp.company} ({exp.location})</p>
                      <p className="text-sm text-muted-foreground">{exp.duration}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2 text-foreground/90">Key Responsibilities:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-2">
                    {exp.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.div
        className="mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <h3 className="text-3xl font-semibold text-center mb-10 text-primary font-headline">My Tech Toolkit</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {TECH_STACK.map((tech, index) => (
            <TechBadge key={`${tech.name}-${index}`} name={tech.name} Icon={tech.Icon} index={index} />
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
