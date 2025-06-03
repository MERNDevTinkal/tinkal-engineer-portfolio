import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin, Briefcase, MapPin, Mail, Phone, CodeXml, Database, ServerCog, Wand2, Palette, Settings2, ShoppingCart, FileText, BookOpen, GraduationCap, Building, Award } from 'lucide-react';

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
  location: "Currently based in [Your City, Country].", // Please update this
  relocation: "Open to relocation for exciting opportunities.",
  IconLocation: MapPin,
  IconRelocation: Briefcase,
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
    institution: "Chandigarh University",
    graduationYear: "2024",
    details: [
      "Specialized in Full Stack Development and Cloud Computing.",
      "Key coursework: Advanced Web Technologies, Database Management, Software Engineering.",
    ],
    Icon: GraduationCap,
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Your Previous University Name", // Please update this
    graduationYear: "2021",
    details: [
      "Focused on core computer science principles and application development.",
      "Capstone Project: 'Inventory Management System'.",
    ],
    Icon: GraduationCap,
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
    title: "Full Stack Developer Intern",
    company: "Company X Technologies", // Please update this
    duration: "Jun 2023 - Dec 2023",
    location: "City, Country", // Please update this
    responsibilities: [
      "Developed and maintained web applications using the MERN stack (MongoDB, Express.js, React, Node.js).",
      "Collaborated with senior developers on feature implementation and bug fixing.",
      "Participated in agile development cycles and contributed to API design.",
      "Gained experience with version control systems like Git and project management tools.",
    ],
    Icon: Building,
  },
  // Add more experience entries if you have them
  // {
  //   title: "Junior Software Engineer",
  //   company: "Another Tech Company",
  //   duration: "Jan 2022 - May 2023",
  //   location: "Another City, Country",
  //   responsibilities: [
  //     "Contributed to developing new features for a SaaS product.",
  //     "Worked with TypeScript, React, and Node.js.",
  //     "Wrote unit and integration tests to ensure code quality.",
  //   ],
  //   Icon: Building,
  // },
];


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
  liveDemoUrl: string; // Kept for structure, but won't be used in card
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
    liveDemoUrl: "#", // Not shown
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
    title: "Notes App",
    description: "A secure and intuitive MERN stack application for creating, organizing, and managing personal notes with JWT authentication.",
    image: "https://placehold.co/600x400.png?text=Notes+App",
    dataAiHint: "note taking application",
    liveDemoUrl: "#", // Not shown
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
    liveDemoUrl: "#", // Not shown
    githubRepoUrl: "https://github.com/MERNDevTinkal/Ecommerce-Using-Redux", 
    techStack: [
      { name: "React", Icon: CodeXml },
      { name: "Redux", Icon: CodeXml }, 
      { name: "Tailwind CSS", Icon: Palette },
      { name: "Firebase", Icon: Wand2 },
    ],
    Icon: ShoppingCart,
  },
];

export const BLOG_SECTION_DETAILS = {
  title: "My Tech Musings",
  description: "Exploring the latest in technology, software development, DevOps, and more. Here are some topics I'm thinking about:",
  Icon: BookOpen,
};

export const CONTACT_DETAILS = {
  title: "Let's Connect",
  description: "Have a project in mind, a question, or just want to say hi? Feel free to reach out!",
  Icon: Mail,
  phone: "+91-XXXXXXXXXX", // Please update this
  PhoneIcon: Phone,
};

export const EMAILJS_CONFIG = {
  serviceId: "YOUR_EMAILJS_SERVICE_ID", 
  templateId: "YOUR_EMAILJS_TEMPLATE_ID", 
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY", 
};
