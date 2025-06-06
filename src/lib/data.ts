
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
export const AUTHOR_EMAIL = "tinkalkumar67693@gmail.com"; // General author email for display

// Email address that will RECEIVE contact form submissions. Configured via .env
export const CONTACT_FORM_RECEIVER_EMAIL = process.env.NEXT_PUBLIC_CONTACT_FORM_RECEIVER_EMAIL || AUTHOR_EMAIL;

export const LOGO_PATH = "/websitelogo.png"; // Use websitelogo.png for the site logo

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
  "MERN Stack Developer",
  "Full Stack Engineer",
  "Next.js Specialist",
  "React Virtuoso",
  "Node.js Architect",
  "TypeScript Advocate",
  "AI Integration Specialist",
  "Innovative Problem Solver",
  "End-to-End Application Developer",
  "Versatile Software Engineer",
  "Cross-Functional Developer",
  "Dynamic Web App Creator",
  "Interactive UI Developer",
  "Responsive Design Expert",
  "Frontend Performance Optimizer",
  "Modern JavaScript Artisan",
  "Scalable Backend Developer",
  "API Design Specialist",
  "Server-Side Logic Expert",
  "Database Integration Pro",
  "Cloud-Native Developer",
  "Agile Software Developer",
  "DevOps-Minded Engineer",
  "E-commerce Solutions Developer",
  "SaaS Application Engineer",
  "Real-time Application Developer",
  "Secure Software Developer",
  "AI-Powered Solutions Developer",
  "Intelligent Systems Engineer",
  "Machine Learning Implementer",
  "Smart Application Architect",
  "Next-Gen Web Innovator",
  "Complex Problem Tackler",
  "User-Centric Solutions Builder",
  "Technology Modernization Expert",
  "Digital Experience Enhancer",
  "Code Craftsman",
  "Digital Product Developer",
  "Performance-Driven Developer",
  "Proficient Full Stack Specialist",
  "Next.js Application Architect",
  "Creative React Developer",
  "Robust Node.js Developer",
  "GraphQL API Developer",
  "Headless CMS Integrator",
  "Progressive Web App (PWA) Developer",
  "Solution-Oriented Programmer",
  "Web Performance Guru",
  "Cloud Solutions Developer",
  "Full Stack JavaScript Expert",
  "Serverless Application Developer",
  "API-First Developer",
  "User Experience Advocate",
  "Agile Methodology Practitioner",
  "Scalable Systems Designer",
  "Code Quality Champion",
  "Emerging Tech Explorer",
  "Digital Transformation Agent"
];

export const PROFILE_IMAGES = [
  { src: "/profile-1.jpg", alt: "Tinkal Kumar - Professional Headshot", dataAiHint: "professional man" },
  { src: "/profile-2.jpg", alt: "Tinkal Kumar - Working at a desk", dataAiHint: "developer coding" },
 /* { src: "/profile-3.jpg", alt: "Tinkal Kumar - Casual Portrait", dataAiHint: "man portrait" },
  { src: "/profile-4.jpg", alt: "Tinkal Kumar - Tech Event", dataAiHint: "developer conference" },*/
];

export const RESUME_PATH = "/Tinkal_Resume.pdf"; 

export const ABOUT_ME = {
  summary: `An Indian software engineer hailing from Jamui district, Bihar, I am a results-driven MERN Stack Developer with expertise in building scalable full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Passionate about clean code, component reusability, performance optimization, and collaborating on real-world client projects. I thrive on solving complex challenges with innovation and continuously learning new technologies.`,
  passion: "My journey in tech is fueled by a relentless curiosity and a love for building impactful digital solutions. I'm particularly excited by AI integration in web apps, advanced JavaScript frameworks, and contributing to the open-source community to drive innovation.",
  location: "Jaipur, India (Originally from Jamui, Bihar)",
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
    institution: "Raj Kumar Goel Institute of Technology, Ghaziabad (Affiliated to Dr. A.P.J. Abdul Kalam Technical University, Lucknow)",
    graduationYear: "2020 - 2024",
    details: [
      "Comprehensive curriculum covering core CS concepts: Data Structures & Algorithms, Object-Oriented Programming (Java, C++), Database Management Systems (SQL, NoSQL fundamentals), Operating Systems, Computer Networks, and Software Engineering principles.",
      "Specialized in web development technologies including HTML, CSS, JavaScript, and gained foundational knowledge for full-stack development.",
      "Developed strong analytical and problem-solving skills through various academic projects and assignments.",
      "Gained practical experience with version control systems like Git and GitHub for collaborative projects.",
      "Acquired understanding of agile development methodologies and the importance of teamwork in software development lifecycles.",
      "Focused on building a solid theoretical and practical foundation for a career in software engineering."
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
  credentialUrl?: string; // Optional URL to the credential
  Icon: LucideIcon;
}

export const CERTIFICATIONS_DATA: CertificationEntry[] = [
  {
    name: "Full Stack Web Development",
    issuingOrganization: "Internshala Trainings",
    credentialUrl: "#",
    Icon: Award,
  },
  {
    name: "MERN Stack Web Development",
    issuingOrganization: "Coding Ninjas",
    credentialUrl: "#",
    Icon: Award,
  },
  {
    name: "Frontend Web Development",
    issuingOrganization: "PW Skills",
    credentialUrl: "#",
    Icon: Award,
  },
  {
    name: "Backend Web Development",
    issuingOrganization: "PW Skills",
    credentialUrl: "#",
    Icon: Award,
  },
  {
    name: "DevOps Fundamentals",
    issuingOrganization: "PW Skills",
    credentialUrl: "#",
    Icon: Award,
  },
  {
    name: "Skills India Program Completion",
    issuingOrganization: "Skills India",
    credentialUrl: "#",
    Icon: Award,
  },
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
  "Methodologies & Practices",
];

export const TECH_STACK: TechStackItem[] = [
  // Languages & Core Technologies
  { name: "Java", Icon: CodeXml, category: "Languages & Core Technologies" },
  { name: "TypeScript", Icon: CodeXml, category: "Languages & Core Technologies" },
  { name: "JavaScript (ES7+)", Icon: CodeXml, category: "Languages & Core Technologies" },
  // Frontend Development
  { name: "HTML5", Icon: CodeXml, category: "Frontend Development" },
  { name: "CSS3", Icon: Palette, category: "Frontend Development" },
  { name: "React.js", Icon: CodeXml, category: "Frontend Development" },
  { name: "Next.js", Icon: CodeXml, category: "Frontend Development" },
  { name: "ShadCN UI", Icon: Layers, category: "Frontend Development" },
  { name: "Tailwind CSS", Icon: Palette, category: "Frontend Development" },
  { name: "Redux", Icon: CodeXml, category: "Frontend Development" },
  { name: "Zustand", Icon: CodeXml, category: "Frontend Development" },
  { name: "Responsive Design", Icon: Smartphone, category: "Frontend Development" },
  // Backend Development
  { name: "Node.js", Icon: ServerCog, category: "Backend Development" },
  { name: "Express.js", Icon: ServerCog, category: "Backend Development" },
  { name: "REST APIs", Icon: Settings2, category: "Backend Development" },
  { name: "JWT Auth", Icon: KeyRound, category: "Backend Development" },
  { name: "Bcrypt", Icon: ShieldCheck, category: "Backend Development" },
  { name: "Multer", Icon: UploadCloud, category: "Backend Development" },
  { name: "Nodemailer", Icon: Mail, category: "Backend Development" },
  { name: "EmailJS", Icon: Send, category: "Backend Development" },
  // Databases & Storage
  { name: "MongoDB", Icon: Database, category: "Databases & Storage" },
  { name: "Mongoose", Icon: Database, category: "Databases & Storage" },
  { name: "SQL", Icon: Database, category: "Databases & Storage" },
  { name: "MySQL", Icon: Database, category: "Databases & Storage" },
  { name: "Firestore", Icon: Database, category: "Databases & Storage" },
  // AI, Cloud & Specialized Tech
  { name: "Firebase", Icon: Wand2, category: "AI, Cloud & Specialized Tech" },
  { name: "Genkit AI", Icon: Wand2, category: "AI, Cloud & Specialized Tech" },
  { name: "Machine Learning Integration", Icon: Brain, category: "AI, Cloud & Specialized Tech" },
  { name: "Natural Language Processing (NLP)", Icon: MessageSquareText, category: "AI, Cloud & Specialized Tech" },
  { name: "AI Model Deployment", Icon: Rocket, category: "AI, Cloud & Specialized Tech" },
  { name: "Large Language Models (LLMs)", Icon: NotebookText, category: "AI, Cloud & Specialized Tech" },
  { name: "Responsible AI & Ethics", Icon: Scale, category: "AI, Cloud & Specialized Tech" },
  // Developer Tools & DevOps
  { name: "Git", Icon: GitCommit, category: "Developer Tools & DevOps" },
  { name: "GitHub", Icon: Github, category: "Developer Tools & DevOps" },
  { name: "Postman", Icon: Settings2, category: "Developer Tools & DevOps" },
  { name: "Redux DevTools", Icon: Wrench, category: "Developer Tools & DevOps" },
  { name: "DevOps", Icon: TerminalSquare, category: "Developer Tools & DevOps" },
  { name: "Basic CI/CD", Icon: Layers, category: "Developer Tools & DevOps" },
  { name: "Kubernetes", Icon: ServerCog, category: "Developer Tools & DevOps" },
  { name: "Vercel", Icon: Rocket, category: "Developer Tools & DevOps" },
  { name: "Render", Icon: Rocket, category: "Developer Tools & DevOps" },
  // Methodologies & Practices
  { name: "Clean Architecture", Icon: Layers, category: "Methodologies & Practices" },
  { name: "Component Reusability", Icon: Puzzle, category: "Methodologies & Practices" },
  { name: "Problem Solving", Icon: Lightbulb, category: "Methodologies & Practices" },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  liveDemoUrl?: string;
  githubRepoUrl: string;
  techStack: Pick<TechStackItem, 'name' | 'Icon'>[]; // Use Pick to only get name and Icon
  Icon: LucideIcon;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "job-portal",
    title: "Job Portal App (Next.js & MERN)",
    description: "A comprehensive platform for job seekers and employers, featuring a Next.js frontend and a robust MERN stack backend (MongoDB, Express.js, Node.js). Implements JWT authentication, Nodemailer for notifications, Multer for file uploads, Bcrypt for password hashing, protected routes, and role-based authorization. Currently undergoing enhancements by Tinkal.",
    liveDemoUrl: "#",
    githubRepoUrl: "https://github.com/MERNDevTinkal/Job-Portal-App",
    techStack: [
      { name: "Next.js", Icon: CodeXml },
      { name: "Node.js", Icon: ServerCog },
      { name: "MongoDB", Icon: Database },
      { name: "Express.js", Icon: ServerCog},
      { name: "TypeScript", Icon: CodeXml },
      { name: "JWT Auth", Icon: KeyRound },
      { name: "Nodemailer", Icon: Mail },
      { name: "Multer", Icon: UploadCloud },
      { name: "Bcrypt", Icon: ShieldCheck },
    ],
    Icon: Briefcase,
  },
  {
    id: "notes-app",
    title: "Notes App (MERN)",
    description: "A secure and intuitive MERN stack application for creating, organizing, and managing personal notes. Features JWT-based authentication, protected routes, and complete CRUD operations for effective note management.",
    liveDemoUrl: "https://notes-application-2-vv1k.onrender.com/",
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
    liveDemoUrl: "https://ecommerce-using-redux-alpha.vercel.app/",
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

    
