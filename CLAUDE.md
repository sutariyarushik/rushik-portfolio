# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## This is Next.js 16, not Next.js 15

This project runs **Next.js 16.2.9 / React 19.2**, which has real breaking changes from the Next.js in most training data (Turbopack-by-default, fully-async `params`/`searchParams`/`cookies`/`headers`, `middleware` renamed to `proxy`, `cacheComponents` replacing experimental PPR, etc.). Before writing App Router code, check `node_modules/next/dist/docs/01-app/` — in particular `02-guides/upgrading/version-16.md` for the full breaking-changes list and `01-getting-started/08-caching.md` for the Cache Components model described below.

**Cache Components is enabled** (`cacheComponents: true` in `next.config.ts`). This is the single most important architectural fact for this codebase:
- Any component/route that reads a runtime API (`cookies()`, `headers()`, `searchParams`, non-deterministic values) must be wrapped in `<Suspense>` or the build fails with an "Uncached data was accessed outside of `<Suspense>`" error.
- Data or UI that should be cached needs an explicit `'use cache'` directive (optionally with `cacheLife`/`cacheTag` from `next/cache`).
- `GET` Route Handlers are prerendered the same as pages under this model — see the caching guide before adding new API routes that read request data.

## Commands

```bash
npm run dev      # next dev — Turbopack, http://localhost:3000
npm run build    # next build
npm run start    # serve production build
npm run lint     # eslint (flat config; next lint was removed in v16)
```

There is no test suite/runner configured in this repo.

## Architecture

- **Single-page app**: `app/page.tsx` is the entire site — it just stacks section components (`Navbar`, `Hero`, `About`, `Skills`, `Projects`, `Experience`, `Blog`, `Contact`, `Footer`) from `components/`. There is no routing beyond this one route.
- **Content lives in one place**: `lib/data.ts` is the single source of truth for all site copy — `siteConfig`, `navLinks`, bio text, `stats`, `skillGroups`, `projects`, `experience`, `blogPosts`. Edit content here, not inside components.
- **`lib/actions.ts` is a dead stub** kept only for backwards compatibility (re-exports nothing); the contact form talks to `app/api/contact/route.ts` directly via `fetch`, not a server action.
- **Providers stack** (`app/providers.tsx`, client component): `next-themes` `ThemeProvider` (attribute `data-theme`, default dark, no system detection) wraps `MuiRegistry` (`app/mui-registry.tsx`, Emotion SSR cache for MUI under the App Router). MUI + Emotion is only used for Skills/About cards; everything else is Tailwind v4 + plain CSS.
- **Design tokens**: all colors/spacing/animation keyframes are CSS custom properties in `app/globals.css`, themed via `:root` (light) and `[data-theme="dark"]`. Prefer adding to these tokens over hardcoding values in components.
- **Contact flow** (`app/api/contact/route.ts`): validates input server-side, then does two independent, best-effort steps — insert into a Neon Postgres `contact_messages` table (auto-created via `CREATE TABLE IF NOT EXISTS` on first request, only if `DATABASE_URL` is set) and send a notification email via the Resend HTTP API (only if `RESEND_API_KEY` is set). Missing either env var degrades gracefully (DB skipped / email logged to console) rather than failing the request; only fails 500 if *both* storage and email fail.
- **SEO/metadata surface**: `app/layout.tsx` (metadata + viewport export), `components/StructuredData.tsx` (JSON-LD), `app/opengraph-image.tsx` / `app/twitter-image.tsx` (generated OG images), `app/sitemap.ts`, `app/robots.ts`. Keep these in sync with `lib/data.ts`/`siteConfig` when changing name, role, or URLs.
- **Not yet implemented**: `.env.local.example` documents `GEMINI_API_KEY`/`INIT_SECRET` and an `/api/chat` RAG chatbot plus `scripts/ingest.py`, but `app/api/chat/init/` and `scripts/` are currently empty — this is aspirational/in-progress, not working code.

## Environment variables

Copy `.env.local.example` to `.env.local`. All variables are optional for local dev — the app degrades gracefully without them (see Contact flow above). Documented vars: `DATABASE_URL` (Neon), `RESEND_API_KEY` + `OWNER_EMAIL` (contact form), plus the not-yet-wired-up `GEMINI_API_KEY`/`INIT_SECRET` for the planned chat feature.
