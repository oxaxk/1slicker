import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

type Body = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  consent?: boolean;
  // legacy
  service?: string;
  date?: string;
  // honeypot
  website?: string;
};

const RATE = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clampText(value: string, max: number) {
  const v = value.trim();
  return v.length > max ? v.slice(0, max) : v;
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nl2br(input: string) {
  return input.replace(/\r\n|\n|\r/g, '<br/>');
}

function getClientIp(req: VercelRequest) {
  const xf = req.headers['x-forwarded-for'];
  if (typeof xf === 'string' && xf.length) return xf.split(',')[0].trim();
  if (Array.isArray(xf) && xf[0]) return xf[0].split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'METHOD_NOT_ALLOWED' });

  const body: Body = (req.body || {}) as Body;

  // Honeypot (bots)
  if (body.website && String(body.website).trim().length > 0) {
    return res.status(200).json({ ok: true });
  }

  // Best-effort rate limit
  const ip = getClientIp(req);
  const now = Date.now();
  const bucket = (RATE.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (bucket.length >= MAX_PER_WINDOW) {
    RATE.set(ip, bucket);
    return res.status(429).json({ ok: false, error: 'RATE_LIMIT' });
  }
  bucket.push(now);
  RATE.set(ip, bucket);

  const nameRaw = typeof body.name === 'string' ? body.name : '';
  const emailRaw = typeof body.email === 'string' ? body.email : '';
  const subjectRaw = typeof body.subject === 'string' ? body.subject : '';
  const messageRaw = typeof body.message === 'string' ? body.message : '';

  // legacy fallback
  const legacyService = typeof body.service === 'string' ? body.service : '';
  const legacyDate = typeof body.date === 'string' ? body.date : '';

  const name = clampText(nameRaw, 120);
  const email = clampText(emailRaw, 180);
  const subject = clampText(subjectRaw || legacyService || 'Allgemeine Anfrage', 160);
  const message = clampText(messageRaw, 5000);
  const date = clampText(legacyDate, 120);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessageHtml = nl2br(escapeHtml(message));

  // Consent required
  const consent = body.consent === true;
  if (!consent) {
    return res.status(400).json({ ok: false, error: 'CONSENT_REQUIRED' });
  }

  if (!name || name.length < 2) {
    return res.status(400).json({ ok: false, error: 'INVALID_NAME' });
  }
  if (!email || !isEmail(email)) {
    return res.status(400).json({ ok: false, error: 'INVALID_EMAIL' });
  }
  if (!message || message.length < 10) {
    return res.status(400).json({ ok: false, error: 'INVALID_MESSAGE' });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const recipient = process.env.CONTACT_RECIPIENT;

  if (!host || !user || !pass || !recipient) {
    return res.status(500).json({ ok: false, error: 'SMTP_NOT_CONFIGURED' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user, pass }
    });

    // Verify SMTP config early for clearer error reporting
    await transporter.verify();

    await transporter.sendMail({
      from: `"Slicker Agency" <${user}>`,
      to: recipient,
      replyTo: email,
      subject: `Neue Anfrage über das Kontaktformular`,
      text: [
        `Neue Kontaktanfrage`,
        '',
        `Name: ${name}`,
        `E-Mail: ${email}`,
        '',
        'Nachricht:',
        message
      ].join('\n'),
      html: `
        <div style="background:#070b12;padding:28px 16px">
          <div style="max-width:640px;margin:0 auto">
            <div style="background:linear-gradient(135deg, rgba(34,211,238,0.22), rgba(34,211,238,0.06));border:1px solid rgba(34,211,238,0.22);border-radius:22px;padding:18px 18px 16px;box-shadow:0 24px 70px rgba(0,0,0,0.45)">
              <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;color:#e6f0ff;letter-spacing:0.08em;text-transform:uppercase;font-size:12px;opacity:0.9">Slicker Agency · Kontakt</div>
              <h2 style="margin:10px 0 6px;font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;font-size:22px;line-height:1.25;color:#e6f0ff">Neue Kontaktanfrage</h2>
              <p style="margin:0 0 12px;font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;font-size:13px;color:rgba(230,240,255,0.78)">Eine neue Nachricht ist über das Kontaktformular eingegangen.</p>

              <div style="display:block;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);border-radius:18px;padding:14px 14px 12px;margin-top:14px">
                <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;font-size:13px;color:rgba(230,240,255,0.82)">
                  <div style="margin:0 0 6px"><strong style="color:#e6f0ff">Name:</strong> ${safeName}</div>
                  <div style="margin:0 0 6px"><strong style="color:#e6f0ff">E-Mail:</strong> <a href="mailto:${safeEmail}" style="color:#22d3ee;text-decoration:none">${safeEmail}</a></div>
                </div>
              </div>

              <div style="margin-top:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:14px">
                <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(230,240,255,0.70)">Nachricht</div>
                <div style="margin-top:10px;font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;font-size:14px;line-height:1.65;color:rgba(230,240,255,0.90)">${safeMessageHtml}</div>
              </div>

              <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
                <a href="mailto:${safeEmail}" style="display:inline-block;padding:10px 14px;border-radius:999px;background:#22d3ee;color:#06121f;font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;font-weight:700;font-size:13px;text-decoration:none">Antworten</a>
                <span style="display:inline-block;padding:10px 14px;border-radius:999px;border:1px solid rgba(255,255,255,0.14);background:rgba(255,255,255,0.03);color:rgba(230,240,255,0.72);font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;font-size:13px">Betreff: ${safeSubject}</span>
              </div>

              <div style="margin-top:14px;font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;font-size:12px;color:rgba(230,240,255,0.55)">
                Hinweis: Diese Nachricht wurde automatisch über das Kontaktformular gesendet.
              </div>
            </div>
          </div>
        </div>
      `
    });

    await transporter.sendMail({
      from: `"Slicker Agency" <${user}>`,
      to: email,
      subject: 'Wir haben deine Nachricht erhalten',
      text: [
        `Hallo ${name},`,
        '',
        'vielen Dank für deine Nachricht. Wir melden uns in der Regel innerhalb von 24 Stunden.',
        '',
        'Deine Nachricht:',
        message,
        '',
        '—',
        'Slicker Agency'
      ].join('\n'),
      html: `
        <div style="background:#070b12;padding:28px 16px">
          <div style="max-width:640px;margin:0 auto">
            <div style="background:linear-gradient(135deg, rgba(34,211,238,0.18), rgba(34,211,238,0.05));border:1px solid rgba(34,211,238,0.20);border-radius:22px;padding:18px 18px 16px;box-shadow:0 24px 70px rgba(0,0,0,0.45)">
              <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;color:#e6f0ff;letter-spacing:0.08em;text-transform:uppercase;font-size:12px;opacity:0.9">Slicker Agency</div>
              <h2 style="margin:10px 0 6px;font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;font-size:22px;line-height:1.25;color:#e6f0ff">Wir haben deine Nachricht erhalten</h2>
              <p style="margin:0 0 12px;font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;font-size:13px;color:rgba(230,240,255,0.78)">Hallo ${safeName}, wir melden uns in der Regel innerhalb von <strong style="color:#e6f0ff">24 Stunden</strong>.</p>

              <div style="margin-top:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:14px">
                <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(230,240,255,0.70)">Deine Nachricht</div>
                <div style="margin-top:10px;font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;font-size:14px;line-height:1.65;color:rgba(230,240,255,0.90)">${safeMessageHtml}</div>
              </div>

              <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
                <span style="display:inline-block;padding:10px 14px;border-radius:999px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.12);color:rgba(230,240,255,0.70);font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;font-size:13px">Wir antworten an: ${safeEmail}</span>
              </div>

              <div style="margin-top:14px;font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;font-size:12px;color:rgba(230,240,255,0.55)">
                —<br/>Slicker Agency
              </div>
            </div>
          </div>
        </div>
      `
    });

    return res.status(200).json({ ok: true });
  } catch (err: unknown) {
    const e = err as { message?: string; code?: string; responseCode?: number };
    // Do not log form content. Only log SMTP failure metadata.
    console.error('MAIL_FAILED', {
      message: e?.message,
      code: e?.code,
      responseCode: e?.responseCode,
      host,
      port,
      secure: process.env.SMTP_SECURE === 'true'
    });
    return res.status(500).json({ ok: false, error: 'MAIL_FAILED' });
  }
}
