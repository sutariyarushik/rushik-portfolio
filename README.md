<div align="center">

# Rushik Sutariya — Portfolio

**Personal portfolio website built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Framer Motion.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-BB4B96?style=flat-square&logo=framer)](https://www.framer.com/motion)
[![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E699?style=flat-square&logo=neon)](https://neon.tech)
[![Resend](https://img.shields.io/badge/Resend-Email-000000?style=flat-square)](https://resend.com)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

[Live Demo](#) · [LinkedIn](https://www.linkedin.com/in/rushik-sutariya)

</div>

---

## ✨ Features

- **Single-page scroll layout** — Hero → About → Skills → Projects → Experience → Contact
- **Profile photo hero** — Circular profile image with animated gradient ring, floating experience & tech badges
- **Dark / Light mode** — persistent via `next-themes`, no flash on load
- **Animated mobile menu** — custom Framer Motion clip-path panel with staggered nav items
- **Scroll-driven timeline** — Framer Motion `useScroll` line-drawing animation on the Experience section
- **Contact form** — fully dynamic: client-side field validation + `POST /api/contact` route handler
- **Email notifications** — every submission sends a rich HTML email via [Resend](https://resend.com)
- **Message storage** — submissions persisted to [Neon](https://neon.tech) (serverless PostgreSQL), table auto-created on first run
- **Active section indicator** — `IntersectionObserver` highlights current nav link on desktop
- **Typewriter hero** — animated role cycling with `react-type-animation`
- **Glassmorphism cards** — across Projects, Contact, and Experience sections
- **Resume download** — PDF linked from Hero, Contact, Footer, and mobile menu
- **Fully responsive** — mobile-first, tested at 375px–1440px

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16.2.9 (App Router + Turbopack) |
| **Language** | TypeScript 5 |
| **UI Library** | Material UI v9 + Emotion (Skills & About cards only) |
| **Styling** | Tailwind CSS v4 + Vanilla CSS variables |
| **Animations** | Framer Motion 12 |
| **Icons** | React Icons v5 |
| **Theme** | next-themes |
| **Font** | Inter via `next/font/google` |
| **Contact API** | Next.js Route Handler — `app/api/contact/route.ts` |
| **Email** | Resend API (HTML email, reply-to support) |
| **Database** | Neon Serverless PostgreSQL (`@neondatabase/serverless`) |
| **Deploy** | Vercel (zero-config) |
| **Runtime** | React 19.2 |

---

## 📁 Project Structure

```
rushik-portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts     # POST handler — validates, stores in Neon, sends email via Resend
│   ├── globals.css          # Design system (CSS custom properties, animations)
│   ├── layout.tsx           # Root layout — Inter font, metadata, Providers
│   ├── page.tsx             # Composes all page sections
│   ├── providers.tsx        # next-themes ThemeProvider + MUI emotion registry
│   └── mui-registry.tsx     # Emotion SSR cache for App Router
│
├── components/
│   ├── Navbar.tsx           # Sticky navbar + animated mobile menu overlay
│   ├── Hero.tsx             # Profile photo, gradient ring, floating badges, typewriter, CTA buttons
│   ├── About.tsx            # Bio + animated MUI stat cards
│   ├── Skills.tsx           # Grouped MUI Chips with react-icons
│   ├── Projects.tsx         # Glassmorphism project cards with glow border
│   ├── Experience.tsx       # Scroll-driven timeline line animation
│   ├── Contact.tsx          # Custom validated form + contact cards + success state
│   ├── Footer.tsx           # LinkedIn + Resume download icons
│   └── ThemeToggle.tsx      # Dark/light mode switcher
│
├── lib/
│   ├── data.ts              # All portfolio content (single source of truth)
│   └── actions.ts           # (legacy stub — form now uses /api/contact directly)
│
└── public/
    ├── my_profile.webp      # Profile photo (displayed in Hero)
    └── Rushik_Sutariya_Resume.pdf
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

Copy `.env.local.example` to `.env.local` and fill in the values:

```bash
cp .env.local.example .env.local
```

```env
# ── Neon PostgreSQL (Message Storage) ─────────────────────────────────────────
# Vercel Dashboard → Storage → Connect Store → Neon (auto-fills DATABASE_URL)
DATABASE_URL=postgresql://user:password@host.neon.tech/neondb?sslmode=require

# ── Resend API (Email Notifications) ──────────────────────────────────────────
# Sign up free at https://resend.com → Dashboard → API Keys → Create Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ── Owner Email (where contact form messages land) ────────────────────────────
OWNER_EMAIL=rushiks.work@gmail.com
```

> **Both `DATABASE_URL` and `RESEND_API_KEY` are optional for local development.**
> Without them the app still runs — the API logs form submissions to the console instead.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app uses **Turbopack** for fast HMR.

### Build

```bash
npm run build
npm run start
```

---

## 📬 Contact Form — How It Works

The contact form is a fully dynamic, end-to-end flow:

```
Browser                  Next.js API Route (/api/contact)          External Services
  │                               │                                        │
  │── POST JSON {name,email, ────▶│                                        │
  │   subject, message}           │── Validate (server-side)               │
  │                               │── INSERT INTO contact_messages ───────▶│ Neon PostgreSQL
  │                               │── POST /emails ────────────────────────▶│ Resend API
  │◀── { success: true } ─────────│                                        │
```

1. **Client validation** — required fields, email format, min length — errors shown inline before any request is made
2. **Server validation** — same rules re-checked on the API for security
3. **Neon storage** — `contact_messages` table is created automatically on first request; stores `name`, `email`, `subject`, `message`, `ip`, `created_at`
4. **Resend email** — rich HTML email sent to `OWNER_EMAIL` with a one-click **Reply** button
5. **Graceful degradation** — if Neon is unavailable the email still sends; if Resend is unconfigured the submission is logged to console

---

## ⚙️ Next.js 16 Notes

This project targets **Next.js 16.2.9** and uses several modern features:

| Feature | Usage |
|---|---|
| **Turbopack** | Default bundler — no webpack config |
| **`'use cache'`** | Enabled via `cacheComponents: true` in `next.config.ts` |
| **Route Handlers** | `app/api/contact/route.ts` — standard Web `Request`/`Response` API |
| **`use client`** | All interactive components |
| **`next/font/google`** | Inter loaded server-side (no CDN, no FOUT) |
| **`next/image`** | Profile photo in Hero with `fill` + `priority` |
| **App Router** | All pages and layouts use the `app/` directory |

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

Key animations defined in globals:

| Class / Keyframe | Purpose |
|---|---|
| `.hero-blob` | Floating gradient background blobs |
| `@keyframes blobFloat` | Continuous translate + scale oscillation |
| `@keyframes profileRingRotate` | Rotating gradient ring on profile photo |
| `@keyframes spin` | Loading spinner in contact form submit button |
| `.glass-card` | Frosted-glass card surface |
| `.gradient-text` | Blue → Purple gradient heading text |
| `.skill-chip` | Hover lift + glow on skill chips |

---

## 📦 Deployment

### Vercel (Recommended)

1. Push your fork to GitHub
2. Import the repository on [vercel.com/new](https://vercel.com/new)
3. **Add storage** — Vercel Dashboard → Storage → Connect Store → **Neon** (auto-adds `DATABASE_URL`)
4. **Add environment variables** in Vercel Project Settings:

   | Variable | Value |
   |---|---|
   | `RESEND_API_KEY` | Your Resend API key from [resend.com](https://resend.com) |
   | `OWNER_EMAIL` | `rushiks.work@gmail.com` |

5. Click **Deploy** ✅

> `DATABASE_URL` is automatically injected by the Neon integration — no manual copy needed.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

Feel free to use it as inspiration or a template for your own portfolio — just don't deploy it as-is with my personal information. Give it a ⭐ if you find it useful!

---

## 🙋 Contact

**Rushik Sutariya** — Software Developer

- 📧 [rushiks.work@gmail.com](mailto:rushiks.work@gmail.com)
- 💼 [linkedin.com/in/rushik-sutariya](https://www.linkedin.com/in/rushik-sutariya)
