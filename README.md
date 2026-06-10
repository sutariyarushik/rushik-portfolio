<div align="center">

# Rushik Sutariya — Portfolio

**Personal portfolio website built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, Material UI v6, and Framer Motion.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![MUI](https://img.shields.io/badge/MUI-v9-007FFF?style=flat-square&logo=mui)](https://mui.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-BB4B96?style=flat-square&logo=framer)](https://www.framer.com/motion)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

[Live Demo](#) · [LinkedIn](https://www.linkedin.com/in/rushik-sutariya) · [GitHub](https://github.com/rushik-sutariya)

</div>

---

## ✨ Features

- **Single-page scroll layout** — Hero → About → Skills → Projects → Experience → Contact
- **Dark / Light mode** — persistent via `next-themes`, no flash on load
- **Animated mobile menu** — custom Framer Motion clip-path panel with staggered nav items
- **Scroll-driven timeline** — Framer Motion `useScroll` line-drawing animation on the Experience section
- **Contact form** — React 19 `useActionState` server action powered by Formspree
- **Active section indicator** — `IntersectionObserver` highlights current nav link on desktop
- **Typewriter hero** — animated role cycling with `react-type-animation`
- **Glassmorphism cards** — across Projects and Contact sections
- **Fully responsive** — mobile-first, tested at 375px–1440px

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16.2.9 (App Router + Turbopack) |
| **Language** | TypeScript 5 |
| **UI Library** | Material UI v9 + Emotion |
| **Styling** | Tailwind CSS v4 + Vanilla CSS variables |
| **Animations** | Framer Motion 12 |
| **Icons** | React Icons v5 |
| **Theme** | next-themes |
| **Font** | Inter via `next/font/google` |
| **Forms** | Formspree (via React 19 Server Action) |
| **Deploy** | Vercel (zero-config) |
| **Runtime** | React 19.2 |

---

## 📁 Project Structure

```
rushik-portfolio/
├── app/
│   ├── globals.css          # Design system (CSS custom properties, animations)
│   ├── layout.tsx           # Root layout — Inter font, metadata, Providers
│   ├── page.tsx             # Composes all page sections
│   ├── providers.tsx        # next-themes ThemeProvider + MUI emotion registry
│   └── mui-registry.tsx     # Emotion SSR cache for App Router
│
├── components/
│   ├── Navbar.tsx           # Sticky navbar + animated mobile menu overlay
│   ├── Hero.tsx             # Floating blobs, dot grid, typewriter, stagger
│   ├── About.tsx            # Bio + animated MUI stat cards
│   ├── Skills.tsx           # Grouped MUI Chips with react-icons
│   ├── Projects.tsx         # Glassmorphism project cards with glow border
│   ├── Experience.tsx       # Scroll-driven timeline line animation
│   ├── Contact.tsx          # Formspree contact form + quick-action cards
│   ├── Footer.tsx           # Social links with micro-animations
│   └── ThemeToggle.tsx      # Dark/light mode switcher
│
└── lib/
    ├── data.ts              # All portfolio content (single source of truth)
    └── actions.ts           # Server action — Formspree form submission
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **20.9.0** or later
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/rushik-sutariya/rushik-portfolio.git
cd rushik-portfolio

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id
```

> Get your free Formspree form ID at [formspree.io](https://formspree.io) — create a form and copy the ID from the endpoint URL (e.g. `https://formspree.io/f/xyzabcde` → ID is `xyzabcde`).

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app uses **Turbopack** by default for fast HMR.

### Build

```bash
npm run build
npm run start
```

---

## ⚙️ Next.js 16 Notes

This project targets **Next.js 16.2.9** and uses several modern features:

| Feature | Usage |
|---|---|
| **Turbopack** | Default bundler — no webpack config |
| **`'use cache'`** | Enabled via `cacheComponents: true` in `next.config.ts` |
| **React 19 `useActionState`** | Contact form server action |
| **`use client` / `use server`** | Server actions extracted to `lib/actions.ts` |
| **`next/font/google`** | Inter loaded server-side (no CDN, no FOUT) |
| **App Router** | All pages and layouts use the `app/` directory |

> **Note:** The React Compiler is enabled — `useMemo`, `useCallback`, and `memo` are intentionally omitted throughout the codebase.

---

## 🎨 Design System

All design tokens live in `app/globals.css` as CSS custom properties, supporting both light and dark themes:

```css
/* Light mode (default) */
:root {
  --accent: #2563eb;
  --bg: #ffffff;
  --text-primary: #0f172a;
  /* ... */
}

/* Dark mode */
[data-theme="dark"] {
  --bg: #030712;
  --text-primary: #f1f5f9;
  /* ... */
}
```

---

## 📦 Deployment

This project is configured for **zero-config Vercel deployment**:

1. Push your fork to GitHub
2. Import the repository on [vercel.com/new](https://vercel.com/new)
3. Add the environment variable: `NEXT_PUBLIC_FORMSPREE_ID`
4. Click **Deploy** ✅

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

Feel free to use it as inspiration or a template for your own portfolio — just don't deploy it as-is with my personal information. Give it a ⭐ if you find it useful!

---

## 🙋 Contact

**Rushik Sutariya** — Software Developer

- 📧 [rushiks.work@gmail.com](mailto:rushiks.work@gmail.com)
- 💼 [linkedin.com/in/rushik-sutariya](https://www.linkedin.com/in/rushik-sutariya)
- 🐙 [github.com/rushik-sutariya](https://github.com/rushik-sutariya)
