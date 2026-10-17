import type { Payload, PayloadRequest } from "payload";
import { getMailSettings, sendMail, type SendResult } from "@/lib/mail";

// Zugangs-E-Mail für neue Konten: Adresse des Backends und wie die Anmeldung abläuft.
// Das Passwort steht bewusst nicht in der E-Mail; die Admin gibt es auf anderem Weg weiter.

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
  return sendMail(await getMailSettings(payload), {
    to: user.email,
    subject: "Ihr Zugang zum Redaktionsbereich „Am Anfang war es Liebe …“",
    text: [
      `Guten Tag${user.name ? ` ${user.name}` : ""},`,
      "",
      "für Sie wurde ein Konto im Redaktionsbereich der Website „Am Anfang war es Liebe …“ angelegt.",
      `Ihre Rolle: ${user.role === "admin" ? "Admin" : "Redaktion"}.`,
      "",
      `Anmelden: ${url}`,
      `E-Mail-Adresse: ${user.email}`,
      "Passwort: erhalten Sie von der Person, die Ihr Konto angelegt hat.",
      "",
      "Nach dem Passwort schicken wir Ihnen jedes Mal einen Code an diese E-Mail-Adresse. Geben Sie ihn auf der Anmeldeseite ein.",
      "",
      "Bitte geben Sie die Adresse des Redaktionsbereichs nicht weiter. Sie ist auf der Website bewusst nicht verlinkt.",
    ].join("\n"),
  });
}
