
import type { LucideIcon } from 'lucide-react';
import { 
  Github, Linkedin, Briefcase, MapPin, Mail, Phone, CodeXml, Database, 
  ServerCog, Wand2, Palette, Settings2, ShoppingCart, FileText, BookOpen, 
  GraduationCap, Building, Award, ExternalLink, UserCircle2, KeyRound, ShieldCheck,
  UploadCloud, Smartphone, Layers, Puzzle, Lightbulb, TerminalSquare, GitCommit, Wrench
} from 'lucide-react';

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
  "MERN Stack Developer",
  "Full Stack Engineer",
  "Next.js Specialist",
  "React Virtuoso",
  "Node.js Architect",
  "TypeScript Advocate",
  "AI Integration Specialist",
  "Innovative Problem Solver"
];

export const PROFILE_IMAGES = [
  { src: "https://placehold.co/600x800.png", alt: "Tinkal Kumar Profile 1", dataAiHint: "professional portrait" },
  { src: "https://placehold.co/600x800.png", alt: "Tinkal Kumar Profile 2", dataAiHint: "developer coding" },
  { src: "https://placehold.co/600x800.png", alt: "Tinkal Kumar Profile 3", dataAiHint: "casual outdoor tech" },
];

export const RESUME_PATH = "/Tinkal_Resume.pdf"; 

export const ABOUT_ME = {
  summary: `An Indian software engineer hailing from Jamui district, Bihar, I am a results-driven MERN Stack Developer with expertise in building scalable full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Passionate about clean code, component reusability, performance optimization, and collaborating on real-world client projects. I thrive on solving complex challenges with innovation and continuously learning new technologies.`,
  passion: "My journey in tech is fueled by a relentless curiosity and a love for building impactful digital solutions. I'm particularly excited by AI integration in web apps, advanced JavaScript frameworks, and contributing to the open-source community to drive innovation.",
  location: "Chandigarh, India (Originally from Jamui, Bihar)",
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
    degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
    institution: "Raj Kumar Goel Institute of Technology, Ghaziabad (Affiliated to Dr. A.P.J. Abdul Kalam Technical University, Lucknow)",
    graduationYear: "2020 - 2024",
    details: [
      "Specialized in software development principles and full-stack technologies.",
      "Key Coursework: Data Structures & Algorithms, Web Development (HTML, CSS, JavaScript), Database Management Systems (SQL, NoSQL), Operating Systems, Computer Networks, Object-Oriented Programming, Software Engineering.",
      "Skills Gained: Proficient in C++ and Java for core concepts; Strong analytical and problem-solving abilities developed through coursework and projects; Practical experience with version control systems (Git); Understanding of agile development methodologies and teamwork in project settings."
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
    title: "MERN Stack Developer",
    company: "OweBest Technologies Pvt Ltd",
    duration: "Feb 2025 – Present", 
    location: "Jaipur, Rajasthan",
    responsibilities: [
      "Developing and maintaining scalable full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js) and TypeScript.",
      "Designing and implementing RESTful APIs for seamless frontend-backend communication.",
      "Focusing on writing clean, maintainable, and efficient code with an emphasis on component reusability and performance optimization.",
      "Collaborating closely with cross-functional teams in an agile environment to deliver high-quality software solutions for real-world client projects.",
      "Implementing user authentication and authorization mechanisms using JWT and Bcrypt.",
      "Integrating third-party services and APIs as per project requirements."
    ],
    Icon: Building,
  },
  {
    title: "Web Developer",
    company: "Apex Hospitals, Jaipur",
    duration: "Aug 2024 – Feb 2025",
    location: "Jaipur, Rajasthan",
    responsibilities: [ 
      "Managed and updated content for the hospital's official website and internal applications, ensuring accuracy and timeliness.",
      "Provided technical support and troubleshooting for the Hospital Management System (HMS), resolving issues to ensure smooth operations.",
      "Facilitated communication between medical staff and software vendors to address system requirements and enhancements.",
      "Built reusable UI components using HTML, CSS, and JavaScript to improve website consistency and development speed."
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
  {
    name: "Full Stack Web Development",
    issuingOrganization: "Internshala Trainings",
    credentialUrl: "#", // Replace with actual URL
    Icon: Award,
  },
  {
    name: "MERN Stack Web Development",
    issuingOrganization: "Coding Ninjas",
    credentialUrl: "#", // Replace with actual URL
    Icon: Award,
  },
  {
    name: "Frontend Web Development",
    issuingOrganization: "PW Skills",
    credentialUrl: "#", // Replace with actual URL
    Icon: Award,
  },
  {
    name: "Backend Web Development",
    issuingOrganization: "PW Skills",
    credentialUrl: "#", // Replace with actual URL
    Icon: Award,
  },
  {
    name: "DevOps Fundamentals",
    issuingOrganization: "PW Skills",
    credentialUrl: "#", // Replace with actual URL
    Icon: Award,
  },
  {
    name: "Skills India Program Completion",
    issuingOrganization: "Skills India", 
    credentialUrl: "#", // Replace with actual URL
    Icon: Award,
  },
];
// Add a comment to remind the user to update these URLs:
// TODO: Update the credentialUrl for each certification with the actual link.

export interface TechStackItem {
  name: string;
  Icon: LucideIcon | string; 
}

export const TECH_STACK: TechStackItem[] = [
  // Frontend
  { name: "React.js", Icon: CodeXml },
  { name: "Next.js", Icon: CodeXml },
  { name: "TypeScript", Icon: CodeXml },
  { name: "JavaScript (ES6+)", Icon: CodeXml },
  { name: "HTML5", Icon: CodeXml },
  { name: "CSS3", Icon: Palette },
  { name: "Tailwind CSS", Icon: Palette },
  { name: "Redux", Icon: CodeXml }, 
  { name: "Zustand", Icon: CodeXml },
  // Backend
  { name: "Node.js", Icon: ServerCog },
  { name: "Express.js", Icon: ServerCog },
  { name: "REST APIs", Icon: Settings2 },
  { name: "JWT Auth", Icon: KeyRound },
  { name: "Bcrypt", Icon: ShieldCheck },
  { name: "Multer", Icon: UploadCloud },
  { name: "Nodemailer", Icon: Mail },
  // Databases
  { name: "MongoDB", Icon: Database },
  { name: "Mongoose", Icon: Database },
  { name: "SQL", Icon: Database },
  { name: "MySQL", Icon: Database },
  // Tools
  { name: "Git", Icon: GitCommit },
  { name: "GitHub", Icon: Github },
  { name: "Postman", Icon: Settings2 }, 
  { name: "Redux DevTools", Icon: Wrench }, 
  // AI & Cloud
  { name: "Firebase", Icon: Wand2 }, 
  { name: "Genkit AI", Icon: Wand2 },
  // Methodologies & Other
  { name: "DevOps", Icon: TerminalSquare },
  { name: "Responsive Design", Icon: Smartphone },
  { name: "Clean Architecture", Icon: Layers }, 
  { name: "Component Reusability", Icon: Puzzle },
  { name: "Problem Solving", Icon: Lightbulb },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  liveDemoUrl?: string; 
  githubRepoUrl: string;
  techStack: TechStackItem[]; 
  Icon: LucideIcon;
  // image?: string; // Optional image URL
  // dataAiHint?: string; // Optional AI hint for image
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "job-portal",
    title: "Job Portal App (MERN, TypeScript)",
    description: "A comprehensive MERN stack platform for job seekers and employers, featuring advanced search, application tracking, user management, and built with TypeScript for robust development. Includes JWT authentication and protected routes.",
    liveDemoUrl: "https://job-portal-tinkal.vercel.app/", 
    githubRepoUrl: "https://github.com/MERNDevTinkal/Job-Portal-App",
    techStack: [
      { name: "React", Icon: CodeXml },
      { name: "Node.js", Icon: ServerCog },
      { name: "MongoDB", Icon: Database },
      { name: "TypeScript", Icon: CodeXml },
      { name: "Express.js", Icon: ServerCog},
    ],
    Icon: Briefcase,
  },
  {
    id: "notes-app",
    title: "Notes App (MERN)",
    description: "A secure and intuitive MERN stack application for creating, organizing, and managing personal notes. Features JWT-based authentication, protected routes, and complete CRUD operations for effective note management.",
    liveDemoUrl: "#", // Update this if you have a live demo
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
    title: "E-commerce Frontend (Redux)",
    description: "A dynamic online shopping experience with product listings, cart functionality, and efficient global state management using Redux Toolkit, styled with Tailwind CSS for a modern, responsive UI.",
    liveDemoUrl: "", // Update this if you have a live demo
    githubRepoUrl: "https://github.com/MERNDevTinkal/Ecommerce-Using-Redux",
    techStack: [
      { name: "React", Icon: CodeXml },
      { name: "Redux Toolkit", Icon: CodeXml }, 
      { name: "Tailwind CSS", Icon: Palette },
      { name: "JavaScript", Icon: CodeXml },
    ],
    Icon: ShoppingCart,
  },
];
// Add a comment to remind the user to update these URLs:
// TODO: Update the liveDemoUrl for each project with the actual link if available, or remove/comment out the liveDemoUrl field.

export const BLOG_SECTION_DETAILS = {
  title: "My Tech Narratives",
  description: "Exploring the frontiers of technology, software craftsmanship, DevOps methodologies, AI advancements, and beyond. Join my musings on the ever-evolving tech landscape.",
  Icon: BookOpen,
};

export const CONTACT_DETAILS = {
  title: "Let's Build Together",
  description: "Have an innovative project, a burning question, or just want to connect? I'm eager to discuss new ideas and potential collaborations. Reach out!",
  Icon: Mail,
  phone: "+91-9102496140",
  PhoneIcon: Phone,
};

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};

    
