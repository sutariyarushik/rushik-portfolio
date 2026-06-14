import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// ─── Neon DB helper (only initialised when DATABASE_URL is set) ──────────────
function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

// ─── Auto-create the messages table on first run ─────────────────────────────
async function ensureTable() {
  const sql = getDb();
  if (!sql) return;
  await sql`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id          SERIAL PRIMARY KEY,
      name        TEXT        NOT NULL,
      email       TEXT        NOT NULL,
      subject     TEXT        NOT NULL DEFAULT '',
      message     TEXT        NOT NULL,
      ip          TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

// ─── POST /api/contact ────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    // ── Server-side validation ─────────────────────────────────────────────
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters.' },
        { status: 400 }
      );
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown';

    const subjectText = subject?.trim() || '(no subject)';

    // ── 1. Store in Neon PostgreSQL ────────────────────────────────────────
    let stored = false;
    try {
      await ensureTable();
      const sql = getDb();
      if (sql) {
        await sql`
          INSERT INTO contact_messages (name, email, subject, message, ip)
          VALUES (${name.trim()}, ${email.trim()}, ${subjectText}, ${message.trim()}, ${ip})
        `;
        stored = true;
      }
    } catch (dbErr) {
      // DB failure is non-fatal — still try to send the email
      console.error('[Neon DB Error]', dbErr);
    }

    // ── 2. Send email via Resend ───────────────────────────────────────────
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const OWNER_EMAIL = process.env.OWNER_EMAIL ?? 'rushiks.work@gmail.com';

    let emailSent = false;
    if (RESEND_API_KEY) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [OWNER_EMAIL],
            reply_to: email.trim(),
            subject: `📬 ${subjectText} — from ${name.trim()}`,
            html: buildEmailHtml(name.trim(), email.trim(), subjectText, message.trim(), stored),
          }),
        });

        if (res.ok) emailSent = true;
        else {
          const errText = await res.text();
          console.error('[Resend Error]', errText);
        }
      } catch (emailErr) {
        console.error('[Email send error]', emailErr);
      }
    } else {
      // Development fallback: log to console
      console.log('[Contact Form — Dev Mode]', { name, email, subject: subjectText, message, stored });
      emailSent = true; // treat as success in dev
    }

    if (!stored && !emailSent) {
      return NextResponse.json(
        { success: false, error: 'Failed to send. Please email me directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, stored }, { status: 200 });
  } catch (err) {
    console.error('[Contact API Error]', err);
    return NextResponse.json(
      { success: false, error: 'Network error. Please try again.' },
      { status: 500 }
    );
  }
}

// ─── HTML email template ──────────────────────────────────────────────────────
function buildEmailHtml(
  name: string,
  email: string,
  subject: string,
  message: string,
  stored: boolean
): string {
  const now = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2563eb,#7c3aed);border-radius:16px 16px 0 0;padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;background:rgba(255,255,255,0.2);border-radius:12px;font-weight:800;font-size:15px;color:#fff;letter-spacing:-0.5px;margin-bottom:16px;">RS</div>
                    <h1 style="margin:0;font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.5px;">New Portfolio Message</h1>
                    <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.75);">Received ${now} IST</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:32px 40px;">

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;vertical-align:top;width:90px;">
                    <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;">Name</span>
                  </td>
                  <td style="padding:14px 0 14px 16px;border-bottom:1px solid #f1f5f9;">
                    <span style="font-size:15px;font-weight:700;color:#0f172a;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;vertical-align:top;">
                    <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;">Email</span>
                  </td>
                  <td style="padding:14px 0 14px 16px;border-bottom:1px solid #f1f5f9;">
                    <a href="mailto:${email}" style="font-size:15px;color:#2563eb;text-decoration:none;font-weight:600;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;vertical-align:top;">
                    <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;">Subject</span>
                  </td>
                  <td style="padding:14px 0 14px 16px;border-bottom:1px solid #f1f5f9;">
                    <span style="font-size:15px;color:#0f172a;font-weight:600;">${subject}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;vertical-align:top;">
                    <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;">Message</span>
                  </td>
                  <td style="padding:14px 0 14px 16px;">
                    <p style="font-size:15px;color:#334155;line-height:1.7;margin:0;white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <div style="margin-top:28px;text-align:center;">
                <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#2563eb,#7c3aed);color:#fff;border-radius:12px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:-0.2px;">
                  Reply to ${name} →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                ${stored ? '✅ Stored in database' : '⚠️ DB storage unavailable'} · 
                Rushik Sutariya Portfolio · rushiks.work@gmail.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
