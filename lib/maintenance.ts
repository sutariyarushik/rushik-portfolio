import { siteConfig } from '@/lib/data';

export const MAINTENANCE_BYPASS_COOKIE = 'maintenance_bypass';
export const MAINTENANCE_BYPASS_MAX_AGE = 60 * 60 * 24; // 24 hours
export const MAINTENANCE_RETRY_AFTER_SECONDS = 60 * 60; // 1 hour
export const MAINTENANCE_FLAG_KEY = 'maintenanceMode';

export function getMaintenanceHtml(): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Down for maintenance | ${siteConfig.name}</title>
<meta name="description" content="${siteConfig.name}'s site is briefly down for maintenance. Back shortly.">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#030712">
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff">
<link rel="icon" href="/favicon.ico">
<style>
:root {
  --bg: #030712;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --accent: #2563eb;
  --accent-2: #7c3aed;
  --accent-glow: rgba(37, 99, 235, 0.4);
  --card-bg: rgba(17, 24, 39, 0.82);
  --card-border: rgba(241, 245, 249, 0.08);
}
@media (prefers-color-scheme: light) {
  :root {
    --bg: #ffffff;
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --card-bg: rgba(255, 255, 255, 0.82);
    --card-border: rgba(15, 23, 42, 0.08);
  }
}
* { box-sizing: border-box; }
html, body {
  height: 100%;
  margin: 0;
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  background: var(--bg);
  color: var(--text-primary);
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  overflow: hidden;
}
.blob {
  position: absolute;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent), var(--accent-2));
  filter: blur(90px);
  opacity: 0.18;
  top: -120px;
  right: -120px;
  animation: blobFloat 9s ease-in-out infinite;
  pointer-events: none;
}
@keyframes blobFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(24px, -30px) scale(1.05); }
  66% { transform: translate(-16px, 16px) scale(0.96); }
}
.card {
  position: relative;
  z-index: 1;
  max-width: 460px;
  width: 100%;
  padding: 40px 36px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  text-align: center;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 20px;
}
.dot {
  position: relative;
  width: 8px;
  height: 8px;
  flex-shrink: 0;
}
.dot-inner {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent);
}
.dot-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--accent);
  animation: statusPing 1.8s ease-out infinite;
}
@keyframes statusPing {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2.8); opacity: 0; }
}
h1 {
  margin: 0 0 14px;
  font-size: 28px;
  line-height: 1.2;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
p {
  margin: 0 0 12px;
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.6;
}
.contact {
  display: inline-block;
  margin-top: 12px;
  color: var(--accent);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}
.contact:hover { text-decoration: underline; }
.signature {
  margin-top: 24px;
  font-size: 13px;
  color: var(--text-secondary);
  opacity: 0.7;
}
@media (prefers-reduced-motion: reduce) {
  .blob, .dot-ring { animation: none; }
}
</style>
</head>
<body>
<div class="blob"></div>
<main class="card">
  <div class="badge">
    <span class="dot"><span class="dot-ring"></span><span class="dot-inner"></span></span>
    Under maintenance
  </div>
  <h1>Down for maintenance</h1>
  <p>Making a few updates to the site right now.</p>
  <p>Back shortly. Thanks for your patience.</p>
  <a class="contact" href="mailto:${siteConfig.email}">Contact: ${siteConfig.email}</a>
  <p class="signature">&mdash; ${siteConfig.name}</p>
</main>
</body>
</html>`;
}
