
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { ABOUT_ME, TECH_STACK, AUTHOR_NAME, EDUCATION_DATA, WORK_EXPERIENCE_DATA, CERTIFICATIONS_DATA } from "@/lib/data";
import { TechBadge } from "@/components/ui/TechBadge";
import { UserCircle2, Briefcase, GraduationCap, Award, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
            src={ABOUT_ME.image.src} 
            alt={ABOUT_ME.image.alt}
            width={500}
            height={300} 
            className="rounded-lg shadow-xl w-full h-auto"
            data-ai-hint={ABOUT_ME.image.dataAiHint}
            priority
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
        <h3 className="text-3xl font-semibold mb-10 text-primary font-headline flex items-center justify-center">
          <GraduationCap className="h-10 w-10 mr-3 text-primary" /> My Education
        </h3>
        <div className="space-y-8">
          {EDUCATION_DATA.map((edu, index) => (
            <motion.div key={`edu-${edu.degree.replace(/\s+/g, '-')}-${index}`} variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start sm:items-center space-x-4">
                    {edu.Icon && <edu.Icon className="h-10 w-10 sm:h-12 sm:w-12 text-accent flex-shrink-0 mt-1 sm:mt-0" />}
                    <div>
                      <CardTitle className="text-xl lg:text-2xl font-headline text-primary">{edu.degree}</CardTitle>
                      <CardDescription className="text-md text-muted-foreground font-medium">{edu.institution}</CardDescription>
                      <p className="text-sm text-muted-foreground">{edu.graduationYear}</p>
                    </div>
                  </div>
                </CardHeader>
                {edu.details && edu.details.length > 0 && (
                  <CardContent>
                    <h4 className="font-semibold mb-2 text-foreground/90">Key Learnings & Skills:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-2">
                      {edu.details.map((detail, i) => <li key={`edu-detail-${index}-${i}`}>{detail}</li>)}
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
        <h3 className="text-3xl font-semibold mb-10 text-primary font-headline flex items-center justify-center">
          <Briefcase className="h-10 w-10 mr-3 text-primary" /> Work Experience
        </h3>
        <div className="space-y-8">
          {WORK_EXPERIENCE_DATA.map((exp, index) => (
             <motion.div key={`exp-${exp.title.replace(/\s+/g, '-')}-${index}`} variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start sm:items-center space-x-4">
                    {exp.Icon && <exp.Icon className="h-10 w-10 sm:h-12 sm:w-12 text-accent flex-shrink-0 mt-1 sm:mt-0" />}
                    <div>
                      <CardTitle className="text-xl lg:text-2xl font-headline text-primary">{exp.title}</CardTitle>
                      <CardDescription className="text-md text-muted-foreground font-medium">{exp.company} ({exp.location})</CardDescription>
                      <p className="text-sm text-muted-foreground">{exp.duration}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2 text-foreground/90">Key Responsibilities:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-2">
                    {exp.responsibilities.map((resp, i) => <li key={`exp-resp-${index}-${i}`}>{resp}</li>)}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Certifications Section */}
      {CERTIFICATIONS_DATA && CERTIFICATIONS_DATA.length > 0 && (
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <h3 className="text-3xl font-semibold text-center mb-10 text-primary font-headline flex items-center justify-center">
            <Award className="h-10 w-10 mr-3 text-primary" /> My Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {CERTIFICATIONS_DATA.map((cert, index) => (
              <motion.div key={`cert-${cert.name.replace(/\s+/g, '-')}-${index}`} variants={itemVariants}>
                <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      {cert.Icon && <cert.Icon className="h-10 w-10 text-accent flex-shrink-0 mt-1" />}
                      <div>
                        <CardTitle className="text-xl font-headline text-primary">{cert.name}</CardTitle>
                        <CardDescription className="text-md text-muted-foreground font-medium">{cert.issuingOrganization}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  {cert.credentialUrl && cert.credentialUrl !== "#" && (
                    <CardFooter className="mt-auto pt-4">
                      <Button asChild variant="outline" className="w-full">
                        <Link href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                          <span>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Credential
                          </span>
                        </Link>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

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
            <TechBadge key={`tech-${tech.name.replace(/\s+/g, '-')}-${index}`} name={tech.name} Icon={tech.Icon} index={index} />
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
