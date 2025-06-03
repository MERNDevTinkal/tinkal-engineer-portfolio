
import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin, Briefcase, MapPin, Mail, Phone, CodeXml, Database, ServerCog, Wand2, Palette, Settings2, ShoppingCart, FileText, BookOpen, GraduationCap, Building, Award, ExternalLink, UserCircle2 } from 'lucide-react';

export const APP_NAME = "Tinkal's HQ"; // Updated App Name
export const AUTHOR_NAME = "Tinkal Kumar";
export const AUTHOR_EMAIL = "tinkalkumar67693@gmail.com";

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blogs", href: "#blogs" },
  { name: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS = [
  { name: "GitHub", Icon: Github, href: "https://github.com/MERNDevTinkal" },
  { name: "LinkedIn", Icon: Linkedin, href: "https://linkedin.com/in/tinkal-kumar-9b8013186" },
  { name: "Email", Icon: Mail, href: `mailto:${AUTHOR_EMAIL}` },
];

export const HERO_TITLES = [
  "Full Stack Developer",
  "MERN Stack Expert",
  "Next.js Enthusiast",
  "React Virtuoso",
  "Node.js Architect",
  "TypeScript Pro",
  "AI/ML Explorer",
  "Software Innovator",
  "Problem Solver",
  "Creative Technologist"
];

export const PROFILE_IMAGES = [
  { src: "https://placehold.co/600x800.png", alt: "Tinkal Kumar Profile 1", dataAiHint: "professional portrait" },
  { src: "https://placehold.co/600x800.png", alt: "Tinkal Kumar Profile 2", dataAiHint: "developer coding" },
  { src: "https://placehold.co/600x800.png", alt: "Tinkal Kumar Profile 3", dataAiHint: "casual outdoor tech" },
];

export const RESUME_PATH = "/Tinkal_Resume.pdf"; 

export const ABOUT_ME = {
  summary: "A results-driven Full Stack Developer with expertise in the MERN stack, Next.js, and modern web technologies. Passionate about crafting efficient, scalable, and user-centric applications. I thrive on solving complex problems and continuously learning to stay at the cutting edge of technology.",
  passion: "My journey in tech is fueled by a relentless curiosity and a love for building impactful digital solutions. I'm particularly excited by AI integration in web apps, advanced JavaScript frameworks, and contributing to the open-source community to drive innovation.",
  location: "Chandigarh, India",
  relocation: "Open to relocating for compelling opportunities",
  IconLocation: MapPin,
  IconRelocation: Briefcase,
  IconAbout: UserCircle2,
};

export interface EducationEntry {
  degree: string;
  institution: string;
  graduationYear: string;
  details?: string[];
  Icon: LucideIcon;
}

export const EDUCATION_DATA: EducationEntry[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Chandigarh University, Punjab",
    graduationYear: "2022 - 2024",
    details: [
      "Specialized in Full Stack Development and Cloud Computing.",
      "Achieved a CGPA of 7.8/10.",
      "Key Coursework: Advanced Web Technologies (React, Node.js), Database Management (MongoDB, SQL), Software Engineering Principles, AI/ML Fundamentals, Cloud Platforms (AWS basics).",
      "Developed a capstone project on an 'AI-Powered E-learning Platform'.",
    ],
    Icon: GraduationCap,
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Patliputra University, Patna",
    graduationYear: "2018 - 2021",
    details: [
      "Gained a strong foundation in computer science principles and application development.",
      "Secured 75% aggregate marks.",
      "Final Year Project: 'Inventory Management System' using Java and MySQL.",
      "Active member of the college coding club.",
    ],
    Icon: Award, // Using Award for a different icon visual
  },
];

export interface ExperienceEntry {
  title: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
  Icon: LucideIcon;
}

export const WORK_EXPERIENCE_DATA: ExperienceEntry[] = [
  {
    title: "Software Development Intern",
    company: "Celebal Technologies",
    duration: "January 2024 - June 2024",
    location: "Jaipur, Rajasthan (Remote)",
    responsibilities: [
      "Developed and maintained features for enterprise web applications using the MERN stack (MongoDB, Express.js, React, Node.js) and Next.js.",
      "Contributed to designing and implementing RESTful APIs for data exchange.",
      "Integrated third-party services and APIs to enhance application functionality.",
      "Collaborated within an Agile team, participating in sprint planning, daily stand-ups, and code reviews.",
      "Utilized Git for version control and Jira for task management and issue tracking.",
      "Gained hands-on experience with CI/CD pipelines and cloud deployment basics.",
    ],
    Icon: Building,
  },
  // Add more experience entries here if applicable
];


export interface TechStackItem {
  name: string;
  Icon: LucideIcon | string; 
}

export const TECH_STACK: TechStackItem[] = [
  { name: "React", Icon: CodeXml },
  { name: "Next.js", Icon: CodeXml },
  { name: "Node.js", Icon: ServerCog },
  { name: "Express.js", Icon: ServerCog },
  { name: "MongoDB", Icon: Database },
  { name: "TypeScript", Icon: CodeXml },
  { name: "JavaScript (ES6+)", Icon: CodeXml },
  { name: "Tailwind CSS", Icon: Palette },
  { name: "Firebase", Icon: Wand2 },
  { name: "Genkit AI", Icon: Wand2 },
  { name: "Git & GitHub", Icon: Github },
  { name: "RESTful APIs", Icon: Settings2 },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  dataAiHint: string;
  liveDemoUrl?: string; 
  githubRepoUrl: string;
  techStack: TechStackItem[];
  Icon: LucideIcon;
}

// PLEASE UPDATE liveDemoUrl for your projects where available.
// If a project does not have a live demo, leave liveDemoUrl empty or as "#".
export const PROJECTS_DATA: Project[] = [
  {
    id: "job-portal",
    title: "Job Portal App",
    description: "A comprehensive platform for job seekers and employers, featuring advanced search, application tracking, and user management. Built with MERN stack & TypeScript.",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "job board interface",
    liveDemoUrl: "https://job-portal-tinkal.vercel.app/", 
    githubRepoUrl: "https://github.com/MERNDevTinkal/Job-Portal-App",
    techStack: [
      { name: "React", Icon: CodeXml },
      { name: "Node.js", Icon: ServerCog },
      { name: "MongoDB", Icon: Database },
      { name: "TypeScript", Icon: CodeXml },
    ],
    Icon: Briefcase,
  },
  {
    id: "notes-app",
    title: "Notes App (MERN)",
    description: "A secure and intuitive MERN stack application for creating, organizing, and managing personal notes with JWT authentication and CRUD operations.",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "note taking application",
    liveDemoUrl: "#", // Example: No live demo or under maintenance
    githubRepoUrl: "https://github.com/MERNDevTinkal/Notes-Application",
    techStack: [
      { name: "React", Icon: CodeXml },
      { name: "Express.js", Icon: ServerCog },
      { name: "MongoDB", Icon: Database },
      { name: "Node.js", Icon: ServerCog },
    ],
    Icon: FileText,
  },
  {
    id: "e-commerce",
    title: "E-commerce Frontend",
    description: "A feature-rich online shopping experience with product listings, cart management, and global state management using Redux Toolkit.",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "online store product",
    liveDemoUrl: "", // Example: No live demo
    githubRepoUrl: "https://github.com/MERNDevTinkal/Ecommerce-Using-Redux",
    techStack: [
      { name: "React", Icon: CodeXml },
      { name: "Redux Toolkit", Icon: CodeXml }, // Representing Redux with CodeXml
      { name: "Tailwind CSS", Icon: Palette },
      { name: "JavaScript", Icon: CodeXml },
    ],
    Icon: ShoppingCart,
  },
];

export const BLOG_SECTION_DETAILS = {
  title: "My Tech Insights",
  description: "Diving into technology, software development, DevOps, AI, and more. Explore my thoughts on the evolving tech landscape:",
  Icon: BookOpen,
};

export const CONTACT_DETAILS = {
  title: "Let's Collaborate",
  description: "Have an exciting project, a question, or just want to connect? I'm always open to new ideas and collaborations. Reach out!",
  Icon: Mail,
  phone: "+91-9102496140",
  PhoneIcon: Phone,
};

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};
