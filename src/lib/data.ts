import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin, Briefcase, MapPin, Mail, Phone, CodeXml, Database, ServerCog, Wand2, Palette, Settings2, ShoppingCart, FileText, BookOpen } from 'lucide-react';

export const APP_NAME = "Tinkal's HQ";
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
  "MERN Stack Engineer",
  "React Specialist",
  "Node.js Developer",
  "TypeScript Enthusiast",
  "JavaScript Ninja",
  "Web Architect",
  "Software Craftsman",
  "Problem Solver",
  "Creative Coder",
  "Tech Innovator"
];

export const PROFILE_IMAGES = [
  { src: "https://placehold.co/600x800.png?text=Profile+1", alt: "Tinkal Kumar Profile 1", dataAiHint: "professional portrait" },
  { src: "https://placehold.co/600x800.png?text=Profile+2", alt: "Tinkal Kumar Profile 2", dataAiHint: "developer coding" },
  { src: "https://placehold.co/600x800.png?text=Profile+3", alt: "Tinkal Kumar Profile 3", dataAiHint: "casual outdoor" },
];

export const RESUME_PATH = "/Tinkal_Resume.pdf";

export const ABOUT_ME = {
  summary: "A passionate and results-driven Full Stack Developer with expertise in the MERN stack and a strong affinity for creating efficient, scalable, and user-friendly web applications. I thrive on tackling complex challenges and continuously expanding my skillset to stay at the forefront of technology.",
  passion: "My journey in tech is fueled by a deep curiosity and a love for building things that make a difference. I'm particularly excited about leveraging modern JavaScript frameworks, exploring new architectural patterns, and contributing to open-source projects.",
  location: "Currently based in [Your City, Country].",
  relocation: "Open to relocation for exciting opportunities.",
  IconLocation: MapPin,
  IconRelocation: Briefcase,
};

export interface TechStackItem {
  name: string;
  Icon: LucideIcon | string; // string for custom SVG path or text
}

export const TECH_STACK: TechStackItem[] = [
  { name: "React", Icon: CodeXml },
  { name: "Next.js", Icon: CodeXml },
  { name: "Node.js", Icon: ServerCog },
  { name: "Express.js", Icon: ServerCog },
  { name: "MongoDB", Icon: Database },
  { name: "TypeScript", Icon: CodeXml },
  { name: "JavaScript", Icon: CodeXml },
  { name: "Tailwind CSS", Icon: Palette },
  { name: "Firebase", Icon: Wand2 },
  { name: "Git", Icon: Github },
  { name: "REST APIs", Icon: Settings2 },
  { name: "GraphQL", Icon: Settings2 }, // Placeholder
];

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  dataAiHint: string;
  liveDemoUrl: string;
  githubRepoUrl: string;
  techStack: TechStackItem[];
  Icon: LucideIcon;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "job-portal",
    title: "Job Portal App",
    description: "A comprehensive platform for job seekers and employers, featuring advanced search, application tracking, and user management.",
    image: "https://placehold.co/600x400.png?text=Job+Portal",
    dataAiHint: "job board interface",
    liveDemoUrl: "#",
    githubRepoUrl: "https://github.com/MERNDevTinkal/Job-Portal-App", // Example, update with actual if different
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
    title: "Notes App",
    description: "A secure and intuitive MERN stack application for creating, organizing, and managing personal notes with JWT authentication.",
    image: "https://placehold.co/600x400.png?text=Notes+App",
    dataAiHint: "note taking application",
    liveDemoUrl: "#",
    githubRepoUrl: "https://github.com/MERNDevTinkal/Notes-Application",
    techStack: [
      { name: "React", Icon: CodeXml },
      { name: "Express.js", Icon: ServerCog },
      { name: "MongoDB", Icon: Database },
      { name: "JavaScript", Icon: CodeXml },
    ],
    Icon: FileText,
  },
  {
    id: "e-commerce",
    title: "E-commerce Platform",
    description: "A feature-rich online shopping experience with product listings, cart management, and secure checkout, built using modern web technologies.",
    image: "https://placehold.co/600x400.png?text=E-commerce",
    dataAiHint: "online store product",
    liveDemoUrl: "#",
    githubRepoUrl: "https://github.com/MERNDevTinkal/Ecommerce-Using-Redux", // Example, update with actual
    techStack: [
      { name: "React", Icon: CodeXml },
      { name: "Redux", Icon: CodeXml }, // Generic for state management
      { name: "Tailwind CSS", Icon: Palette },
      { name: "Firebase", Icon: Wand2 },
    ],
    Icon: ShoppingCart,
  },
];

export const BLOG_SECTION_DETAILS = {
  title: "My Tech Musings",
  description: "Exploring the latest in web development, software engineering, and more. Here are some topics I'm thinking about:",
  Icon: BookOpen,
};

export const CONTACT_DETAILS = {
  title: "Let's Connect",
  description: "Have a project in mind, a question, or just want to say hi? Feel free to reach out!",
  Icon: Mail,
  phone: "+91-XXXXXXXXXX", // Placeholder, user to fill
  PhoneIcon: Phone,
};

export const EMAILJS_CONFIG = {
  serviceId: "YOUR_EMAILJS_SERVICE_ID", // User needs to replace
  templateId: "YOUR_EMAILJS_TEMPLATE_ID", // User needs to replace
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY", // User needs to replace
};
