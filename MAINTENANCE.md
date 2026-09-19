# Maintenance mode

A kill switch that takes the whole site down behind a branded 503 page, flips
on/off in seconds from the Vercel dashboard (no redeploy), and lets you keep
browsing the real site while it's down.

## How it works

- [proxy.ts](proxy.ts) (Next.js 16's replacement for `middleware.ts`) runs on
  every request and checks a boolean flag called `maintenanceMode` stored in
  a Vercel Global Config store (formerly called "Edge Config" — same thing,
  Vercel renamed the product).
- If the flag is `true`, it returns a self-contained HTML page
  ([lib/maintenance.ts](lib/maintenance.ts)) with `503 Service Unavailable`,
  a `Retry-After` header, and `no-store` caching — so it's never cached and
  search engines treat it as temporary rather than deindexing the site.
- If the flag is `false`, `undefined`, or the Global Config read fails for
  any reason, the site behaves exactly as it does today.

> **Do not use Vercel's "Pause Project" button for this.** Pausing stops
> your whole deployment from executing, including `proxy.ts` — so this
> branded page, the 503 headers, and your owner-bypass cookie all stop
> working too. Visitors (and you) just get Vercel's generic
> "DEPLOYMENT_PAUSED" page instead, with no bypass. Only use the
> `maintenanceMode` toggle described below.

## Turning it ON

1. Go to **Vercel dashboard → your project → Storage**.
2. If you haven't already: **Create Database → Global Config**, then connect
   it to this project (this auto-adds a `GLOBAL_CONFIG` environment variable
   — you don't set this yourself).
3. Open the Global Config store → **Items** → add/edit a key:
   - Key: `maintenanceMode`
   - Value: `true`
4. Save. It takes effect on the next request — no redeploy.

## Turning it OFF

Same place, flip the value back to `false` (or delete the key). Effective
immediately.

## Bypassing it yourself (viewing the real site while it's down)

1. Set an environment variable in Vercel: **Settings → Environment
   Variables → `MAINTENANCE_BYPASS_SECRET`**. Generate a strong value with:
   ```
   openssl rand -hex 32
   ```
   Redeploy once after adding this (it's a build-time env var, unlike the
   Global Config flag).
2. Visit your site with:
   ```
   https://your-domain.com/?preview=<SECRET>
   ```
   This sets an `httpOnly` cookie and redirects you to the clean URL. From
   then on, every page (including `/api` routes) works normally for you,
   even while everyone else sees the maintenance page. The cookie lasts 24
   hours.
3. To stop bypassing (go back to seeing what visitors see), visit:
   ```
   https://your-domain.com/?preview=clear
   ```

Keep the secret private — anyone with it can bypass maintenance mode too.

## What's blocked

Everything is blocked while maintenance mode is on, **including `/api`
routes** (e.g. the contact form) — this was a deliberate choice so "down"
means fully down. The only paths excluded from the check are `/_next/static`,
`/_next/image`, and `/favicon.ico`, so the maintenance page itself always
has its styling and icon (it's fully self-contained CSS, though, so it
doesn't actually depend on those — they're excluded purely so Next's own
internals keep working).

## Testing locally before you rely on it

You can't easily fake the Global Config store locally, so to verify the
maintenance page itself:

1. Temporarily edit [proxy.ts](proxy.ts): change `let maintenanceMode = false;`
   to `let maintenanceMode = true;` (do **not** commit this).
2. Add a throwaway `MAINTENANCE_BYPASS_SECRET=test123` to `.env.local`.
3. `npm run dev`, then check in a browser:
   - `http://localhost:3000/` → should show the maintenance page with a
     `503` status (check via browser devtools Network tab).
   - `http://localhost:3000/?preview=test123` → should redirect you to `/`
     with the real site now visible.
   - `http://localhost:3000/?preview=clear` → should put you back into
     maintenance mode.
   - `http://localhost:3000/favicon.ico` → should still load (200, not 503).
4. Revert your temporary edit to `proxy.ts` before committing.

To test against the *real* Global Config store from your machine instead,
run `vercel env pull` to get the real `GLOBAL_CONFIG` connection string into
`.env.local`, then flip the flag in the dashboard as described above — your
local dev server will pick it up like production does.

## What you need to do in the Vercel dashboard (can't be done from code)

- Create the Global Config store and connect it to this project (Step
  "Turning it ON", step 1–2 above) — one-time setup.
- Make sure the project is not in Vercel's "Paused" state — resume it if it
  is (see the warning above); maintenance mode only works while the project
  is actually running.
- Add the `MAINTENANCE_BYPASS_SECRET` environment variable and redeploy once.
- Flipping `maintenanceMode` true/false going forward — that's the whole
  point, it's a dashboard action, not a code change.
