
import type { LucideIcon } from 'lucide-react';
import { 
  Github, Linkedin, Briefcase, MapPin, Mail, Phone, CodeXml, Database, 
  ServerCog, Wand2, Palette, Settings2, ShoppingCart, FileText, BookOpen, 
  GraduationCap, Building, Award, ExternalLink, UserCircle2, KeyRound, ShieldCheck,
  UploadCloud, Smartphone, Layers, Puzzle, Lightbulb, TerminalSquare, GitCommit, Wrench,
  Send, Brain, MessageSquareText, Rocket, NotebookText, Scale // Added new icons
} from 'lucide-react';

export const APP_NAME = "Tinkal";
export const AUTHOR_NAME = "Tinkal Kumar";
export const AUTHOR_EMAIL = "tinkalkumar67693@gmail.com"; // General author email for display

// Email address that will RECEIVE contact form submissions. Configured via .env
export const CONTACT_FORM_RECEIVER_EMAIL = process.env.NEXT_PUBLIC_CONTACT_FORM_RECEIVER_EMAIL || AUTHOR_EMAIL;

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
  { src: "/images/profile-1.jpg", alt: "Tinkal Kumar - Professional Profile", dataAiHint: "professional portrait" },
  { src: "/images/profile-2.jpg", alt: "Tinkal Kumar - Coding Environment", dataAiHint: "developer coding" },
  { src: "/images/profile-3.jpg", alt: "Tinkal Kumar - Casual Tech Look", dataAiHint: "casual tech" },
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
    src: "/images/about-me-image.jpg",
    alt: "Tinkal Kumar at work or a professional setting",
    dataAiHint: "developer workspace",
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
    credentialUrl: "#", // Replace # with your actual credential URL or remove if N/A
    Icon: Award,
  },
  {
    name: "MERN Stack Web Development",
    issuingOrganization: "Coding Ninjas",
    credentialUrl: "#", // Replace # with your actual credential URL or remove if N/A
    Icon: Award,
  },
  {
    name: "Frontend Web Development",
    issuingOrganization: "PW Skills",
    credentialUrl: "#", // Replace # with your actual credential URL or remove if N/A
    Icon: Award,
  },
  {
    name: "Backend Web Development",
    issuingOrganization: "PW Skills",
    credentialUrl: "#", // Replace # with your actual credential URL or remove if N/A
    Icon: Award,
  },
  {
    name: "DevOps Fundamentals",
    issuingOrganization: "PW Skills",
    credentialUrl: "#", // Replace # with your actual credential URL or remove if N/A
    Icon: Award,
  },
  {
    name: "Skills India Program Completion",
    issuingOrganization: "Skills India", 
    credentialUrl: "#", // Replace # with your actual credential URL or remove if N/A
    Icon: Award,
  },
];


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
  { name: "EmailJS", Icon: Send }, // Added
  // Databases
  { name: "MongoDB", Icon: Database },
  { name: "Mongoose", Icon: Database },
  { name: "SQL", Icon: Database },
  { name: "MySQL", Icon: Database },
  // Tools & DevOps
  { name: "Git", Icon: GitCommit },
  { name: "GitHub", Icon: Github },
  { name: "Postman", Icon: Settings2 }, 
  { name: "Redux DevTools", Icon: Wrench }, 
  { name: "DevOps", Icon: TerminalSquare },
  { name: "Basic CI/CD", Icon: Layers }, // Added
  { name: "Kubernetes", Icon: ServerCog }, // Added
  // AI & Cloud
  { name: "Firebase", Icon: Wand2 }, 
  { name: "Genkit AI", Icon: Wand2 },
  { name: "Machine Learning Integration", Icon: Brain }, // Added AI
  { name: "Natural Language Processing (NLP)", Icon: MessageSquareText }, // Added AI
  { name: "AI Model Deployment", Icon: Rocket }, // Added AI
  { name: "Large Language Models (LLMs)", Icon: NotebookText }, // Added AI
  { name: "Responsible AI & Ethics", Icon: Scale }, // Added AI
  // Methodologies & Other
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
    liveDemoUrl: "#",
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
    liveDemoUrl: "", 
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
    

    

