
"use client"; // Required for top-level framer-motion on the page

import { motion } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import Blogs from "@/components/sections/Blogs";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15, // Stagger delay for each section
        duration: 0.5,
      },
    }),
  };

  const sections = [
    <Hero key="hero" />,
    <About key="about" />,
    <Projects key="projects" />,
    <Blogs key="blogs" />,
    <Contact key="contact" />,
  ];

  return (
    <>
      {sections.map((section, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          whileInView="visible" // Animate when section scrolls into view
          viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the section is visible, only once
          variants={sectionVariants}
        >
          {section}
        </motion.div>
      ))}
    </>
  );
}
