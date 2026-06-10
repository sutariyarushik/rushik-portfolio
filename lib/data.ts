// ─────────────────────────────────────────────
//  lib/data.ts  –  All portfolio content lives here
// ─────────────────────────────────────────────

export const siteConfig = {
  name: "Rushik Sutariya",
  role: "Software Developer",
  email: "rushiks.work@gmail.com",
  linkedin: "https://www.linkedin.com/in/rushik-sutariya",
  github: "https://github.com/rushik-sutariya",
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "xyzabcde",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const heroTypewriterStrings = [
  "Software Developer",
  "React.js Developer",
  "Next.js Developer",
  "Frontend Engineer",
];

export const heroBio =
  "Building fast, accessible, and modern web applications for international clients.";

export const aboutBio =
  "Software Developer with 3+ years of experience at Vivansh Infotech Pvt Ltd, Ahmedabad. I specialise in building dynamic, CMS-driven web applications with React.js and Next.js for international clients across the F&B, print, and SaaS industries.";

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "3+", label: "Years Experience" },
  { value: "7+", label: "Projects Delivered" },
  { value: "3", label: "Industries" },
  { value: "∞", label: "International Clients" },
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
    category: "Performance",
    skills: ["Web Vitals", "Lighthouse", "Image Optimization", "Code Splitting"],
  },
  {
    category: "API & Integrations",
    skills: ["REST APIs", "TanStack Query", "Axios", "Formspree", "CMS Integration"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Figma", "Vercel", "npm"],
  },
  {
    category: "AI Tools",
    skills: ["GitHub Copilot", "ChatGPT", "v0.dev", "Cursor AI"],
  },
];

export interface Project {
  title: string;
  description: string;
  tags: string[];
  badge: string;
  accentColor: string;
}

export const projects: Project[] = [
  {
    title: "Dip'n'Dip",
    description:
      "International Cafe Chain Website & Admin Panel — built a fully responsive marketing site with a custom CMS-driven admin panel for an international F&B brand.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    badge: "Client Project",
    accentColor: "#2563EB",
  },
  {
    title: "PrintFlow360",
    description:
      "Print Business Management Platform — a comprehensive SaaS dashboard for managing print jobs, orders, and clients across multiple fulfilment centres.",
    tags: ["React.js", "Next.js", "TypeScript", "ShadCN UI"],
    badge: "Client Project",
    accentColor: "#7C3AED",
  },
  {
    title: "SafetyTrack",
    description:
      "Safety & Training Management Platform — an enterprise app to track safety compliance, certifications, and training schedules for global organisations.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "TanStack Query"],
    badge: "Client Project",
    accentColor: "#059669",
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
      "Built and maintained 7+ production-grade web applications using React.js and Next.js for international clients across F&B, print, and SaaS industries.",
      "Architected CMS-driven frontends with dynamic routing, server-side rendering, and optimised data-fetching patterns using TanStack Query and REST APIs.",
      "Delivered pixel-perfect, fully responsive UIs from Figma designs using Tailwind CSS, ShadCN UI, and Material UI while achieving 90+ Lighthouse performance scores.",
      "Collaborated with cross-functional teams across time zones, managing version control workflows with Git and GitHub and deploying to Vercel via CI/CD pipelines.",
    ],
  },
];
