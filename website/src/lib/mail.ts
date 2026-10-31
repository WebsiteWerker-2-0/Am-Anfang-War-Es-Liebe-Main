import nodemailer from "nodemailer";
import type { Payload } from "payload";

// Versand von E-Mails an den Arbeitskreis (Anmeldungen und Kontaktanfragen). Die Zugangsdaten stehen im Backend unter
// „E-Mail und Anmeldungen“ (nur für Admins sichtbar); Umgebungsvariablen SMTP_HOST, SMTP_PORT,
// SMTP_SECURE, SMTP_USER, SMTP_PASSWORD, MAIL_FROM haben Vorrang.

export type MailSettings = {
  courseRecipient?: string;
  /** Alle Kontaktanfragen an diese Adresse(n) statt an das Postfach des Anliegens (zum Testen) */
  contactRedirect?: string;
  fromName?: string;
  fromAddress?: string;
  host?: string;
  port: number;
  secure: boolean;
  user?: string;
  password?: string;
};

export async function getMailSettings(payload: Payload): Promise<MailSettings> {
  const doc = (await payload.findGlobal({ slug: "mail", depth: 0, context: { mailSecret: true } }).catch(() => ({}))) as Record<string, unknown>;
  const text = (value: unknown) => (typeof value === "string" && value.trim() ? value.trim() : undefined);
  const port = Number(process.env.SMTP_PORT ?? doc.smtpPort ?? 465);
  return {
    courseRecipient: text(doc.courseRecipient),
    contactRedirect: text(doc.contactRedirect),
    fromName: text(doc.fromName),
    fromAddress: text(process.env.MAIL_FROM) ?? text(doc.fromAddress) ?? text(doc.smtpUser),
    host: text(process.env.SMTP_HOST) ?? text(doc.smtpHost),
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : doc.smtpSecure !== false && port === 465,
    user: text(process.env.SMTP_USER) ?? text(doc.smtpUser),
    password: text(process.env.SMTP_PASSWORD) ?? text(doc.smtpPassword),
  };
}

export type SendResult = { ok: true } | { ok: false; reason: "not-configured" | "failed"; message: string };

export async function sendMail(
  settings: MailSettings,
  mail: { to: string; subject: string; text: string; replyTo?: string; bcc?: string },
): Promise<SendResult> {
  if (!settings.host || !settings.fromAddress) {
    return { ok: false, reason: "not-configured", message: "Der E-Mail-Versand ist noch nicht eingerichtet (Server und Absender fehlen)." };
  }
  try {
    const transport = nodemailer.createTransport({
      host: settings.host,
      port: settings.port,
      secure: settings.secure,
      auth: settings.user ? { user: settings.user, pass: settings.password } : undefined,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
    await transport.sendMail({
      from: settings.fromName ? { name: settings.fromName, address: settings.fromAddress } : settings.fromAddress,
      to: mail.to,
      bcc: mail.bcc,
      subject: mail.subject,
      text: mail.text,
      replyTo: mail.replyTo,
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: "failed", message: error instanceof Error ? error.message : String(error) };
  }
}
