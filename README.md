
![Portfolio Logo](/websitelogo.png)

# Tinkal Kumar - Full Stack Developer Portfolio

Welcome to the official repository for Tinkal Kumar's personal portfolio website. This project showcases his skills, projects, and journey as a passionate MERN Stack Developer and Full Stack Engineer. It's built with modern web technologies, emphasizing clean design, responsiveness, and AI-powered interactions.

**Live Demo:** [https://tinkal-engineer-portfolio.vercel.app/](https://tinkal-engineer-portfolio.vercel.app/)

## ✨ Features

This portfolio is packed with features designed to provide an engaging and informative experience:

*   **Dynamic Hero Section:**
    *   Engaging image slider (Swiper.js) with auto-slide functionality (3-5 seconds).
    *   Pause on mouse hover and resume on mouse out.
    *   Responsive design with rounded corners, shadows, and smooth transitions.
    *   Images are `object-cover` and fit an `aspect-[3/4]` ratio.
    *   Animated "Typewriter" effect for showcasing various developer roles.
*   **Comprehensive "About Me" Section:**
    *   Professional summary, passion for technology, and location details.
    *   Detailed education background.
    *   Professional work experience.
    *   List of certifications with links (if available).
    *   Visually appealing "Tech Toolkit" showcasing key skills with icons, categorized for clarity (e.g., Languages, Frontend, Backend, Databases, AI/Cloud, Tools/DevOps).
*   **Interactive "Projects" Section:**
    *   Displays project cards with titles, descriptions, and tech stacks.
    *   Direct links to live demos (if available) and GitHub repositories.
    *   Smooth hover effects and animations on project cards.
*   **AI-Powered "Blogs" Section:**
    *   Dynamically generated blog titles using Genkit AI (Gemini).
    *   Client-side caching for blog titles to reduce API calls (`localStorage`).
    *   Combination of pre-defined/hardcoded blog content and on-demand AI-generated content for expanded views.
    *   Error handling and fallback content for AI generation failures.
    *   Expandable content sections for reading full blog posts within the list.
*   **Functional "Contact" Section:**
    *   User-friendly contact form for sending messages directly.
    *   Integration with EmailJS for form submissions.
    *   Client-side form validation using React Hook Form and Zod.
    *   Draft saving for form fields in `localStorage`.
    *   Direct email and social media links for alternative contact methods.
*   **🤖 AI Chatbot "Sora":**
    *   Powered by Genkit (Google AI - Gemini models).
    *   Acts as Tinkal Kumar's personal AI assistant, aware of the current year and time for context.
    *   Answers user queries about Tinkal's profile (skills, projects, experience, contact).
    *   Provides relevant suggested follow-up questions to guide the conversation.
    *   Chat history is saved to `localStorage` for persistence.
    *   Loading indicators and error handling for AI responses.
    *   Interactive UI with message suggestions and clear chat functionality.
*   **Modern UI/UX:**
    *   Responsive design ensuring optimal viewing on all devices (desktop, tablet, mobile).
    *   Dark/Light theme toggle with system preference detection (uses `next-themes`).
    *   Smooth animations and page transitions using Framer Motion.
    *   Aesthetically pleasing components from ShadCN UI.
    *   Consistent and professional color palette and typography.
*   **Performance & Optimization:**
    *   Optimized images using `next/image`.
    *   Server Components and App Router from Next.js for better performance.
    *   Lazy loading for components where appropriate (e.g., Chatbot via `next/dynamic`).
*   **Developer Experience:**
    *   Built with TypeScript for type safety and improved code quality.
    *   Utilizes Tailwind CSS for efficient styling.
*   **Accessibility & SEO:**
    *   Semantic HTML and ARIA attributes where applicable.
    *   Dynamic metadata generation for blog posts and main pages for better SEO.
*   **Error Handling:**
    *   Custom global error page (`error.tsx`).
    *   Custom 404 Not Found page (`not-found.tsx`).

## 🛠️ Tech Stack

This project leverages a modern and robust technology stack:

*   **Frontend Framework:** [Next.js](https://nextjs.org/) (v15+ with App Router, Server Components)
*   **Language:** [TypeScript](https://www.typescriptlang.org/), [JavaScript (ES7+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
*   **UI Library:** [React](https://react.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
*   **AI Integration:** [Genkit](https://firebase.google.com/docs/genkit) (with Google AI - Gemini Models)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Image Slider:** [Swiper](https://swiperjs.com/)
*   **Forms:** [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) (for validation)
*   **Email Service:** [EmailJS](https://www.emailjs.com/) (for contact form)
*   **Databases:** [MongoDB](https://www.mongodb.com/) (with Mongoose), [Firestore](https://firebase.google.com/docs/firestore)
*   **State Management:** React Hooks (`useState`, `useEffect`, `useContext`), `localStorage` for client-side persistence (chat history, form drafts, blog titles), Redux Toolkit, Zustand.
*   **Backend Technologies:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Utilities:** `clsx`, `tailwind-merge`, `date-fns`
*   **Deployment:** [Vercel](https://vercel.com/), [Render](https://render.com/), [Firebase App Hosting](https://firebase.google.com/docs/app-hosting) (implied by `apphosting.yaml`)

## 📂 Folder Structure

```
.
├── public/                  # Static assets (images, fonts, resume PDF, websitelogo.png)
├── src/
│   ├── ai/                  # Genkit AI integration
│   │   ├── flows/           # AI flows (chatbot, blog title/content generation)
│   │   ├── genkit.ts        # Genkit initialization & configuration
│   │   └── dev.ts           # Genkit development server entry point
│   ├── app/                 # Next.js App Router (pages, layouts, error boundaries)
│   │   ├── blog/[id]/page.tsx # Dynamic page for individual blog posts
│   │   ├── globals.css      # Global styles, Tailwind directives, CSS variables
│   │   ├── layout.tsx       # Root application layout
│   │   ├── page.tsx         # Homepage component
│   │   ├── error.tsx        # Custom global error page
│   │   └── not-found.tsx    # Custom 404 Not Found page
│   ├── components/          # Reusable UI components
│   │   ├── blog/            # Components specific to the blog section (BlogPostPageClient)
│   │   ├── chatbot/         # Components for the AI Chatbot "Sora" (ChatbotDialog, ChatMessage)
│   │   ├── layout/          # Layout components (Navbar, Footer, DynamicChatbotLoader)
│   │   ├── sections/        # Major page sections (Hero, About, Projects, Blogs, BlogList, Contact)
│   │   ├── ui/              # ShadCN UI components & custom UI elements (ProjectCard, TechBadge, SectionWrapper, etc.)
│   │   └── theme-provider.tsx # Theme (dark/light) management
│   ├── hooks/               # Custom React hooks (useToast, useMobile)
│   ├── lib/                 # Core utilities, constants, and application data
│   │   ├── data.ts          # Centralized data (profile info, project details, tech stack, etc.)
│   │   └── utils.ts         # Utility functions (e.g., cn for classnames)
├── .env                     # Environment variables (needs to be created)
├── next.config.ts           # Next.js configuration (e.g., image remote patterns)
├── package.json             # Project dependencies and npm scripts
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── components.json          # ShadCN UI configuration
├── apphosting.yaml          # Firebase App Hosting configuration (if used)
└── README.md                # This file
```

## 🚀 Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MERNDevTinkal/Portfolio-Website.git # Replace with your actual repo URL if different
    cd Portfolio-Website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of your project by copying the example (if one was provided) or by creating it manually. Add the following variables:

    ```env
    # For EmailJS Contact Form
    NEXT_PUBLIC_EMAILJS_SERVICE_ID=YOUR_EMAILJS_SERVICE_ID
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=YOUR_EMAILJS_TEMPLATE_ID
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=YOUR_EMAILJS_PUBLIC_KEY

    # Email address to receive contact form submissions (This is where emails get sent)
    NEXT_PUBLIC_CONTACT_FORM_RECEIVER_EMAIL=your_actual_receiving_email@example.com

    # For Genkit AI (Google AI - Gemini)
    # You'll typically set this in your environment or use service account authentication for deployed environments.
    # For local development, ensure your gcloud CLI is authenticated or set GOOGLE_API_KEY / GEMINI_API_KEY.
    # GEMINI_API_KEY=YOUR_GOOGLE_AI_API_KEY 
    ```
    *   Replace placeholder values with your actual credentials from [EmailJS](https://www.emailjs.com/) and [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   Ensure `NEXT_PUBLIC_CONTACT_FORM_RECEIVER_EMAIL` is the email address where you want to receive messages from the contact form. This is crucial for the contact form to work.

4.  **Run the Next.js development server:**
    This server handles the frontend application.
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:9002` (as per `package.json`).

5.  **Run the Genkit development server (in a separate terminal):**
    This server handles the AI flows.
    ```bash
    npm run genkit:dev
    # or for auto-reloading on changes:
    npm run genkit:watch
    ```
    The Genkit server usually starts on `http://localhost:4000` and the Genkit Developer UI on `http://localhost:4100`.

### Build for Production

To create a production build:
```bash
npm run build
```

### Start Production Server

To run the production build locally:
```bash
npm run start
```

## 🎯 Key Challenges & Resolutions

Developing this portfolio involved several interesting challenges:

1.  **AI Integration with Genkit:**
    *   **Challenge:** Designing prompts for the "Sora" chatbot to maintain a consistent persona, provide accurate information based *only* on provided context (including dynamic data like current year/time), and generate relevant follow-up questions. Structuring blog content generation for desired length and format.
    *   **Resolution:** Employed detailed system instructions for the AI persona. Used Zod schemas within Genkit to define strict input and output structures, guiding the LLM's responses. Dynamically passed current year and IST date/time to the AI flow for contextual awareness. Iterative prompt engineering and testing were crucial. For blog content, the prompt specified paragraph count and output format.

2.  **Dynamic Content & Caching (Blogs):**
    *   **Challenge:** Efficiently managing AI-generated blog titles and content to provide a good user experience without excessive API calls or long load times.
    *   **Resolution:** Implemented client-side caching for blog titles using `localStorage` with a randomized expiry (48-98 hours) to balance freshness and performance. Blog content is a mix: some articles are hardcoded for immediate display, while others have their full content generated by AI on-demand when the user expands the "Read More" section. Fallback titles and error messages are in place for AI service failures.

3.  **Responsive and Interactive UI:**
    *   **Challenge:** Ensuring all components, especially the Hero image slider (Swiper.js) and the Chatbot dialog, are fully responsive and interactive across various screen sizes. Making text (like titles and card content) wrap correctly without breaking layouts on small screens.
    *   **Resolution:** Leveraged Tailwind CSS extensively for responsive styling (e.g., `sm:`, `md:`, `lg:` prefixes, flexbox, grid). Used `next/image` with `fill` and `sizes` props for optimized, responsive images. The `useIsMobile` hook aids in adapting certain UI elements. CSS Grid was used for the chatbot dialog layout to better manage scrollable areas. Added `break-words` to key title elements to ensure graceful text wrapping.

4.  **State Management for Complex Components:**
    *   **Challenge:** Managing local UI state for the AI Chatbot (messages, loading states, suggestions, input) and the BlogList (expanded posts, AI content loading/errors).
    *   **Resolution:** Primarily used React Hooks (`useState`, `useEffect`). Chat history and suggestions are updated carefully to reflect the conversation flow. `localStorage` is used for persisting chat history and form drafts.

5.  **Environment Variable Handling (EmailJS & AI):**
    *   **Challenge:** Ensuring that EmailJS and Genkit AI services are correctly configured with API keys and service IDs, and providing clear instructions for users setting up the project locally. Also, ensuring the contact form directs emails to the intended recipient.
    *   **Resolution:** Clearly documented the required `.env` variables (`NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`, `NEXT_PUBLIC_CONTACT_FORM_RECEIVER_EMAIL`, and `GEMINI_API_KEY`). Added conditional checks in the contact form logic to provide helpful error messages if credentials are missing or use placeholders. The `CONTACT_FORM_RECEIVER_EMAIL` is now distinctly defined.

6.  **Chatbot Scrolling & Layout:**
    *   **Challenge:** The chat message area in the chatbot dialog initially had scrolling issues, where older messages would not scroll out of view correctly or the suggestions area would take too much space.
    *   **Resolution:** Refactored the chatbot dialog's layout to use CSS Grid (`grid-template-rows`) to explicitly define how space is allocated, with the message area (`ScrollArea`) set to take `1fr` (all remaining flexible space) and the suggestions area adjusting based on content. The `ScrollArea` itself uses `min-h-0` to work correctly within the grid/flex context.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, bug fixes, or new features, please feel free to:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or fix:
    ```bash
    git checkout -b feature/your-feature-name
    # or
    git checkout -b fix/your-bug-fix
    ```
3.  **Make your changes.** Ensure your code follows the existing style and patterns.
4.  **Commit your changes** with a clear and descriptive commit message:
    ```bash
    git commit -m "feat: Add X feature" -m "Detailed description of changes."
    # or
    git commit -m "fix: Resolve Y bug" -m "Explanation of the fix and impact."
    ```
    (Consider using [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.)
5.  **Push to your forked repository:**
    ```bash
    git push origin feature/your-feature-name
    ```
6.  **Open a Pull Request** against the `main` branch of this repository.
7.  **Provide a clear description** of your changes in the Pull Request.

If you find any bugs or have a feature request, please open an issue on GitHub.

## 📄 License

This project is licensed under the **MIT License**. You can create a `LICENSE` file with the MIT license text if you wish.

## 🙏 Acknowledgements

*   [Next.js](https://nextjs.org/) team for the powerful React framework.
*   [ShadCN UI](https://ui.shadcn.com/) for the excellent, accessible component library.
*   [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework.
*   [Genkit Team (Firebase/Google)](https://firebase.google.com/docs/genkit) for the intuitive AI integration toolkit.
*   [Framer Motion](https://www.framer.com/motion/) for the animation library.
*   [SwiperJS](https://swiperjs.com/) for the versatile slider component.
*   [Lucide React](https://lucide.dev/) for the beautiful icon set.
*   [EmailJS](https://www.emailjs.com/) for simplifying client-side email sending.
*   [Vercel](https://vercel.com/) for seamless deployment.

## 📞 Contact

Tinkal Kumar
*   **GitHub:** [MERNDevTinkal](https://github.com/MERNDevTinkal)
*   **LinkedIn:** [Tinkal Kumar](https://linkedin.com/in/tinkal-kumar-9b8013186)
*   **Email:** [tinkalkumar67693@gmail.com](mailto:tinkalkumar67693@gmail.com)

---

Thank you for checking out my portfolio project!
