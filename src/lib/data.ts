
import type { LucideIcon } from 'lucide-react';
import {
  Github, Linkedin, Briefcase, MapPin, Mail, Phone, CodeXml, Database,
  ServerCog, Wand2, Palette, Settings2, ShoppingCart, FileText, BookOpen,
  GraduationCap, Building, Award, ExternalLink, UserCircle2, KeyRound, ShieldCheck,
  UploadCloud, Smartphone, Layers, Puzzle, Lightbulb, TerminalSquare, GitCommit, Wrench,
  Send, Brain, MessageSquareText, Rocket, NotebookText, Scale, Instagram
} from 'lucide-react';

export const APP_NAME = "Tinkal";
export const AUTHOR_NAME = "Tinkal Kumar";
export const AUTHOR_EMAIL = "tinkalkumar67693@gmail.com";

export const CONTACT_FORM_RECEIVER_EMAIL = process.env.NEXT_PUBLIC_CONTACT_FORM_RECEIVER_EMAIL || AUTHOR_EMAIL;

export const LOGO_PATH = "/websitelogo.png";
export const SORA_AVATAR_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQISscdGPN0f7hp7m9wka0VumVDqmaJYAkDLPnWCjeb7WhsvMBICoPLDHfD_3uWziaZeAc&usqp=CAU";

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
  { name: "Instagram", Icon: Instagram, href: "https://www.instagram.com/tinkal_kumar__/" },
  { name: "Email", Icon: Mail, href: `mailto:${AUTHOR_EMAIL}` },
];

export const HERO_TITLES = [
  "Full Stack Engineer",
  "DevOps-Oriented Software Engineer",
  "Cloud-Focused Application Engineer",
  "AWS Cloud Practitioner",
  "Infrastructure as Code Engineer",
  "Automation-Driven Engineer",
  "Scalable Systems Engineer",
  "Terraform Infrastructure Engineer",
  "Production-Ready Application Developer",
  "Cloud-Native Software Engineer",
  "Reliability-Focused Engineer",
  "Next.js Specialist",
  "React Virtuoso",
  "Node.js Architect",
  "TypeScript Advocate",
  "AI Integration Specialist"
];

export const PROFILE_IMAGES = [
  { src: "/profile-1.jpg", alt: "Tinkal Kumar - Professional Headshot", dataAiHint: "professional man" },
  { src: "/profile-2.jpg", alt: "Tinkal Kumar - Working at a desk", dataAiHint: "developer coding" },
];

export const RESUME_PATH = "/Tinkal_Resume.pdf";

export const ABOUT_ME = {
  summary: `Results-driven software engineer with strong experience in full-stack web development and growing expertise in DevOps and AWS cloud technologies. Skilled in building scalable applications using MongoDB, Express.js, React.js, and Node.js.`,
  passion: "Driven by a strong curiosity for cloud computing and automation, I enjoy working at the intersection of development and operations.",
  location: "Jaipur, India",
  relocation: "Open to relocating for compelling opportunities",
  IconLocation: MapPin,
  IconRelocation: Briefcase,
  IconAbout: UserCircle2,
  image: {
    src: "/Tech-focused-image.png",
    alt: "Tinkal Kumar - Tech focused image",
    dataAiHint: "technology developer",
  },
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
    degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
    institution: "Raj Kumar Goel Institute of Technology, Ghaziabad",
    graduationYear: "2020 - 2024",
    details: [
      "Core CS concepts: DSA, OOP, DBMS, OS, Networking.",
      "Specialized in web technologies and full-stack development."
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
    title: "IT Executive",
    company: "Apex Hospitals, Jaipur",
    duration: "Aug 2024 – Feb 2025",
    location: "Jaipur, Rajasthan",
    responsibilities: [
      "Managed website content and internal apps.",
      "Provided tech support for HMS systems.",
      "Built reusable UI components with modern stacks."
    ],
    Icon: Building,
  },
];

export interface CertificationEntry {
  name: string;
  issuingOrganization: string;
  credentialUrl?: string;
  Icon: LucideIcon;
}

export const CERTIFICATIONS_DATA: CertificationEntry[] = [
  { name: "Full Stack Web Development", issuingOrganization: "Internshala", Icon: Award },
  { name: "MERN Stack Web Development", issuingOrganization: "Coding Ninjas", Icon: Award },
  { name: "DevOps Fundamentals", issuingOrganization: "PW Skills", Icon: Award },
];

export interface TechStackItem {
  name: string;
  Icon: LucideIcon | string;
  category: string;
}

export const TECH_STACK_CATEGORIES_ORDER = [
  "Languages & Core Technologies",
  "Frontend Development",
  "Backend Development",
  "Databases & Storage",
  "AI, Cloud & Specialized Tech",
  "Developer Tools & DevOps",
];

export const TECH_STACK: TechStackItem[] = [
  { name: "Java", Icon: CodeXml, category: "Languages & Core Technologies" },
  { name: "TypeScript", Icon: CodeXml, category: "Languages & Core Technologies" },
  { name: "JavaScript", Icon: CodeXml, category: "Languages & Core Technologies" },
  { name: "React.js", Icon: CodeXml, category: "Frontend Development" },
  { name: "Next.js", Icon: CodeXml, category: "Frontend Development" },
  { name: "Tailwind CSS", Icon: Palette, category: "Frontend Development" },
  { name: "Node.js", Icon: ServerCog, category: "Backend Development" },
  { name: "Express.js", Icon: ServerCog, category: "Backend Development" },
  { name: "MongoDB", Icon: Database, category: "Databases & Storage" },
  { name: "Groq Cloud AI", Icon: Wand2, category: "AI, Cloud & Specialized Tech" },
  { name: "Git", Icon: GitCommit, category: "Developer Tools & DevOps" },
  { name: "GitHub", Icon: Github, category: "Developer Tools & DevOps" },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  liveDemoUrl?: string;
  githubRepoUrl: string;
  techStack: Pick<TechStackItem, 'name' | 'Icon'>[];
  Icon: LucideIcon;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "job-portal",
    title: "Job Portal App",
    description: "Full-stack MERN platform with role-based auth and file uploads.",
    liveDemoUrl: "#",
    githubRepoUrl: "https://github.com/MERNDevTinkal/Job-Portal-App",
    techStack: [
      { name: "Next.js", Icon: CodeXml },
      { name: "Node.js", Icon: ServerCog },
      { name: "MongoDB", Icon: Database }
    ],
    Icon: Briefcase,
  },
  {
    id: "notes-app",
    title: "Notes App",
    description: "Secure note-taking app with JWT auth and CRUD.",
    liveDemoUrl: "https://notes-application-2-vv1k.onrender.com/",
    githubRepoUrl: "https://github.com/MERNDevTinkal/Notes-Application",
    techStack: [
      { name: "React", Icon: CodeXml },
      { name: "MongoDB", Icon: Database }
    ],
    Icon: FileText,
  },
];

export const hardcodedBlogPosts = [
  {
    id: "0",
    title: "The Future of Web Development",
    paragraphs: ["AI and SSR are transforming the web."]
  }
];

export const BLOG_SECTION_DETAILS = {
  title: "My Tech Narratives",
  description: "Exploring technology and software craftsmanship.",
  Icon: BookOpen,
};

export const CONTACT_DETAILS = {
  title: "Let's Build Together",
  description: "Eager to discuss new ideas and potential collaborations.",
  Icon: Mail,
  phone: "+91-9102496140",
  PhoneIcon: Phone,
};

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};
