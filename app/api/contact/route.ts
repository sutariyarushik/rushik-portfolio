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
  <title>New Portfolio Message</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:20px;border:1px solid #e2e8f0;box-shadow:0 4px 20px rgba(0,0,0,0.03);overflow:hidden;border-collapse:separate;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a8a,#4c1d95);padding:40px;border-top-left-radius:19px;border-top-right-radius:19px;text-align:left;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="display:inline-block;padding:6px 12px;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.2);border-radius:8px;font-weight:700;font-size:13px;color:#ffffff;letter-spacing:1px;text-transform:uppercase;margin-bottom:16px;">
                      Portfolio Inquiry
                    </div>
                    <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;line-height:1.2;">
                      You received a new message
                    </h1>
                    <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.7);font-weight:500;">
                      Received ${now} IST
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:40px;background-color:#ffffff;">
              
              <!-- Contact Details Grid -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-bottom:28px;">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;width:100px;vertical-align:top;">
                    <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Sender</span>
                  </td>
                  <td style="padding:12px 0 12px 16px;border-bottom:1px solid #f1f5f9;vertical-align:top;">
                    <strong style="font-size:15px;color:#0f172a;">${name}</strong>
                    <div style="margin-top:2px;">
                      <a href="mailto:${email}" style="font-size:14px;color:#2563eb;text-decoration:none;font-weight:500;">${email}</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;vertical-align:top;">
                    <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Subject</span>
                  </td>
                  <td style="padding:12px 0 12px 16px;border-bottom:1px solid #f1f5f9;vertical-align:top;">
                    <span style="font-size:15px;color:#334155;font-weight:600;">${subject}</span>
                  </td>
                </tr>
              </table>

              <!-- Message Block -->
              <div style="margin-top:20px;margin-bottom:32px;">
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin-bottom:8px;">
                  Message Content
                </div>
                <div style="background-color:#f8fafc;border-left:4px solid #2563eb;border-radius:4px;padding:20px;margin:0;">
                  <p style="font-size:15px;color:#334155;line-height:1.6;margin:0;white-space:pre-wrap;font-style:normal;">${message}</p>
                </div>
              </div>

              <!-- Bulletproof Table-Based CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:12px;margin-bottom:12px;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                      <tr>
                        <td align="center" style="background-color:#2563eb;border-radius:12px;">
                          <a href="mailto:${email}?subject=Re: ${subject}" target="_blank" style="display:inline-block;padding:14px 36px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:12px;letter-spacing:-0.2px;">
                            Reply to ${name} &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;border-bottom-left-radius:19px;border-bottom-right-radius:19px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <div style="display:inline-flex;align-items:center;padding:6px 12px;background-color:${stored ? 'rgba(34,197,94,0.08)' : 'rgba(234,179,8,0.08)'};border-radius:20px;margin-bottom:12px;">
                      <span style="font-size:12px;font-weight:600;color:${stored ? '#16a34a' : '#ca8a04'};">
                        ${stored ? '✓ Stored in Postgres Database' : '⚠ Database storage bypassed'}
                      </span>
                    </div>
                    <p style="margin:0;font-size:12px;color:#94a3b8;font-weight:500;">
                      Rushik Sutariya Portfolio &bull; <a href="mailto:rushiks.work@gmail.com" style="color:#94a3b8;text-decoration:none;">rushiks.work@gmail.com</a>
                    </p>
                  </td>
                </tr>
              </table>
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
