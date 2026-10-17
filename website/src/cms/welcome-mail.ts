import type { Payload, PayloadRequest } from "payload";
import { getMailSettings, sendMail, type SendResult } from "@/lib/mail";

// Zugangs-E-Mail für neue Konten: Link „Passwort festlegen“ (7 Tage gültig) und Adresse des Backends.
// Ein Passwort steht nie in der E-Mail: Die Person legt ihr eigenes über den Link fest
// (Payload-Funktion „Passwort zurücksetzen“, Token ohne Payloads eigenen E-Mail-Versand erzeugt).

const LINK_VALID_DAYS = 7;

/** Öffentliche Adresse der Website: SITE_URL, sonst aus der Anfrage (Hostinger setzt x-forwarded-*) */
export function siteUrl(req?: PayloadRequest) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const headers = req?.headers;
  const host = headers?.get("x-forwarded-host") ?? headers?.get("host");
  const proto = headers?.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  return host ? `${proto}://${host}` : "";
}

export async function sendWelcomeMail(
  payload: Payload,
  user: { email: string; name?: string | null; role?: string | null },
  req?: PayloadRequest,
): Promise<SendResult> {
  const url = `${siteUrl(req)}/backend`;
  const token = await payload.forgotPassword({
    collection: "users",
    data: { email: user.email },
    disableEmail: true,
    expiration: LINK_VALID_DAYS * 24 * 60 * 60 * 1000,
    req,
  });
  return sendMail(await getMailSettings(payload), {
    to: user.email,
    subject: "Ihr Zugang zum Redaktionsbereich „Am Anfang war es Liebe …“",
    text: [
      `Guten Tag${user.name ? ` ${user.name}` : ""},`,
      "",
      "für Sie wurde ein Konto im Redaktionsbereich der Website „Am Anfang war es Liebe …“ angelegt.",
      `Ihre Rolle: ${user.role === "admin" ? "Admin" : "Redaktion"}.`,
      "",
      `1. Passwort festlegen (der Link gilt ${LINK_VALID_DAYS} Tage):`,
      `${url}/reset/${token}`,
      "",
      `2. Danach anmelden unter: ${url}`,
      `   E-Mail-Adresse: ${user.email}`,
      "",
      "Nach dem Passwort schicken wir Ihnen jedes Mal einen Code an diese E-Mail-Adresse. Geben Sie ihn auf der Anmeldeseite ein.",
      "",
      "Bitte geben Sie die Adresse des Redaktionsbereichs nicht weiter. Sie ist auf der Website bewusst nicht verlinkt.",
    ].join("\n"),
  });
}
