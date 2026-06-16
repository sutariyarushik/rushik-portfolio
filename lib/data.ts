// ─────────────────────────────────────────────
//  lib/data.ts  –  All portfolio content lives here
// ─────────────────────────────────────────────

export const siteConfig = {
  name: "Rushik Sutariya",
  role: "Software Developer",
  email: "rushiks.work@gmail.com",
  phone: "+91 7043234063",
  linkedin: "https://www.linkedin.com/in/rushik-sutariya",
  resume: "/Rushik_Sutariya_Resume.pdf",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const heroTypewriterStrings = [
  "Software Developer",
  "React.js Developer",
  "Next.js Developer",
  "Frontend Engineer",
];

export const heroBio =
  "Software Developer with 3+ years of experience building fast, accessible, and modern web applications with React.js & Next.js.";

export const aboutBio =
  "Software Developer with 3+ years of experience at Vivansh Infotech Pvt Ltd, Ahmedabad. I specialise in building dynamic, CMS-driven web applications with React.js and Next.js across the F&B, print, SaaS, and assessment industries — delivering pixel-perfect UIs and scalable architectures.";

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "3+", label: "Years Experience" },
  { value: "7+", label: "Projects Delivered" },
  { value: "5+", label: "Tech Stacks Mastered" },
  { value: "90+", label: "Lighthouse Score" },
];

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Core",
    skills: ["JavaScript", "TypeScript", "HTML5", "CSS3"],
  },
  {
    category: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "ShadCN UI",
      "Material UI",
    ],
  },
  {
    category: "Backend & Services",
    skills: ["Node.js", "REST APIs", "PDF Generation", "Socket.io"],
  },
  {
    category: "Data & Visualisation",
    skills: ["Chart.js", "Recharts", "TanStack Query", "Axios", "CMS Integration"],
  },
  {
    category: "Performance",
    skills: ["Web Vitals", "Lighthouse", "Image Optimization", "Code Splitting"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Figma", "Vercel", "npm"],
  },
  {
    category: "AI Tools",
    skills: ["GitHub Copilot", "Cursor AI", "Claude AI"],
  },
];

export interface Project {
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
  badge: string;
  accentColor: string;
}

export const projects: Project[] = [
  {
    title: "Performance Assessment & Digital Reporting Platform",
    description:
      "A large-scale enterprise web application for managing multi-step dynamic and static assessment workflows. Supports configurable forms, conditional logic, reusable components, and complex user input scenarios for collecting structured performance data.",
    highlights: [
      "Interactive data visualisation dashboards with charts & graphical summaries",
      "Node.js microservice for high-quality PDF report generation (async, scalable)",
      "Conditional form logic with configurable multi-step workflow engine",
      "RESTful API integration with optimised performance & responsive UX",
    ],
    tags: ["Next.js", "TypeScript", "Node.js", "REST APIs", "PDF Generation", "Chart Libraries", "Tailwind CSS"],
    badge: "Featured",
    accentColor: "#F59E0B",
  },
  {
    title: "SafetyTrack",
    description:
      "An enterprise-grade Safety & Training Management Platform to track compliance, certifications, and training schedules for global organisations — built with real-time chat and collaborative features.",
    highlights: [
      "Real-time in-app chat built with Socket.io (Skote) + Node.js server",
      "Safety compliance tracking with certification expiry alerts",
      "Training schedule management with automated notifications",
      "Role-based access control for multi-organisation environments",
    ],
    tags: ["Next.js", "TypeScript", "Socket.io", "Node.js", "Tailwind CSS", "TanStack Query"],
    badge: "Client Project",
    accentColor: "#059669",
  },
  {
    title: "PrintFlow360",
    description:
      "A comprehensive SaaS dashboard for managing print jobs, orders, and clients across multiple fulfilment centres — streamlining end-to-end print business operations with a modern, data-rich interface.",
    highlights: [
      "Multi-centre order & job management with real-time status tracking",
      "Client portal with order history, invoicing, and approval workflows",
      "Custom data tables with filtering, sorting, and bulk actions",
      "Scalable ShadCN UI component library for consistent design system",
    ],
    tags: ["React.js", "Next.js", "TypeScript", "ShadCN UI", "REST APIs"],
    badge: "Client Project",
    accentColor: "#7C3AED",
  },
  {
    title: "Dip'n'Dip",
    description:
      "A fully responsive marketing website and custom CMS-driven admin panel for Dip'n'Dip — an international café chain operating across multiple countries, requiring multilingual content and dynamic menu management.",
    highlights: [
      "Custom admin panel with CMS-driven content management",
      "Dynamic menu & location pages with server-side rendering",
      "International brand guidelines with pixel-perfect Figma implementation",
      "90+ Lighthouse score with optimised images and Core Web Vitals",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "CMS"],
    badge: "Client Project",
    accentColor: "#2563EB",
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Software Developer",
    company: "Vivansh Infotech Pvt Ltd",
    period: "January 2023 – Present",
    bullets: [
      "Built and maintained 7+ production-grade web applications using React.js and Next.js for international clients across F&B, print, SaaS, and assessment industries.",
      "Developed a large-scale Performance Assessment Platform with multi-step dynamic forms, conditional logic, and interactive charting dashboards in Next.js & TypeScript.",
      "Contributed to a Node.js microservice for PDF report generation — designed for async processing and scalability to handle large datasets efficiently.",
      "Implemented real-time in-app chat in SafetyTrack using Socket.io (Skote) with a Node.js server, enabling seamless team collaboration across global organisations.",
      "Architected CMS-driven frontends with dynamic routing, SSR, and optimised data-fetching using TanStack Query and REST APIs.",
      "Delivered pixel-perfect, fully responsive UIs from Figma designs achieving 90+ Lighthouse performance scores across all client projects.",
      "Collaborated with cross-functional teams across time zones, managing Git workflows and deploying to Vercel via CI/CD pipelines.",
    ],
  },
];

export interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  accentColor: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Building Scalable PDF Report Generation with a Node.js Microservice",
    excerpt:
      "How we architected an async Node.js microservice to generate high-quality, data-rich PDF reports from dynamic assessment data — handling large datasets without blocking the main application.",
    category: "Architecture",
    readTime: "6 min read",
    date: "May 2026",
    accentColor: "#F59E0B",
    slug: "pdf-report-generation-nodejs-microservice",
  },
  {
    title: "Dynamic Multi-Step Assessment Forms in Next.js: Conditional Logic at Scale",
    excerpt:
      "A deep dive into building configurable, multi-step form workflows with conditional field logic, reusable components, and complex validation — lessons learned from a real enterprise project.",
    category: "Frontend",
    readTime: "8 min read",
    date: "April 2026",
    accentColor: "#2563EB",
    slug: "dynamic-multistep-forms-nextjs",
  },
  {
    title: "Real-Time Chat in React with Socket.io: From Setup to Production",
    excerpt:
      "A practical guide to integrating Socket.io into a React/Next.js app with a Node.js server — covering rooms, events, reconnection strategies, and the gotchas we hit in production.",
    category: "Real-Time",
    readTime: "7 min read",
    date: "March 2026",
    accentColor: "#059669",
    slug: "realtime-chat-react-socketio",
  },
];
