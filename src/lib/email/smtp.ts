import nodemailer, { type Transporter } from "nodemailer";

// Reuse a single transporter across requests. In dev, Next.js hot-reload
// re-evaluates modules, so cache it on globalThis to avoid leaking connections.
const globalForSmtp = globalThis as unknown as { __smtpTransporter?: Transporter };

function readConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS in .env.local"
    );
  }

  return {
    host,
    port,
    // Port 465 uses implicit TLS; 587/25 upgrade via STARTTLS. Allow an
    // explicit override for hosts that need it.
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user, pass },
  };
}

export function getTransporter(): Transporter {
  if (!globalForSmtp.__smtpTransporter) {
    globalForSmtp.__smtpTransporter = nodemailer.createTransport(readConfig());
  }
  return globalForSmtp.__smtpTransporter;
}

// Address the inquiry email is delivered to. Falls back to the company inbox.
export const INQUIRY_TO = process.env.SMTP_TO || "priyam.sheth@ocexports.com";

// Envelope "from" — many SMTP hosts require this to match the authenticated
// mailbox or a verified domain, so default it to SMTP_USER.
export const INQUIRY_FROM =
  process.env.SMTP_FROM || process.env.SMTP_USER || INQUIRY_TO;
