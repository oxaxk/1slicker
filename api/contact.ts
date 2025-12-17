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
      from: `"Kontaktformular" <${user}>`,
      to: recipient,
      replyTo: email,
      subject: `Neue Anfrage – ${subject}`,
      text: [
        `Name: ${name}`,
        `E-Mail: ${email}`,
        `Betreff/Leistung: ${subject}`,
        date ? `Wunschtermin: ${date}` : `Wunschtermin: -`,
        '',
        'Nachricht:',
        message
      ].join('\n')
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
