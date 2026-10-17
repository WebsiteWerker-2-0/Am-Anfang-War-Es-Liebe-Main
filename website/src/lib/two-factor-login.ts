import config from "@payload-config";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import { getMailSettings, sendMail } from "./mail";
import { PAYLOAD_TOKEN_COOKIE, sessionKey } from "./two-factor";
import { issueCode } from "./two-factor-codes";

// Serverseitige Bausteine der Seite /backend/zwei-faktor (keine Server-Aktionen, nicht von außen aufrufbar)

/** Angemeldetes Konto (nach dem Passwort) und seine Sitzung, sonst zurück zur Anmeldung */
export async function currentLogin() {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });
  const session = sessionKey((await cookies()).get(PAYLOAD_TOKEN_COOKIE)?.value);
  if (!user || !session) redirect("/backend/login");
  return { payload, user: user as { id: number; email: string }, session };
}

export type SendState = "sent" | "active" | "wait" | "hourly" | "not-configured" | "failed";

/** Code erzeugen und per E-Mail schicken (über das Postfach aus „E-Mail und Anmeldungen“) */
export async function deliverCode(force: boolean): Promise<{ state: SendState; message?: string }> {
  const { payload, user, session } = await currentLogin();
  const settings = await getMailSettings(payload);
  if (!settings.host || !settings.fromAddress) return { state: "not-configured" };
  const issued = issueCode(session, force);
  if ("active" in issued) return { state: "active" };
  if ("wait" in issued) return { state: issued.wait === "resend" ? "wait" : "hourly" };
  const result = await sendMail(settings, {
    to: user.email,
    subject: `Ihr Anmeldecode: ${issued.code}`,
    text: [
      "Guten Tag,",
      "",
      `Ihr Code für die Anmeldung im Redaktionsbereich lautet: ${issued.code}`,
      "",
      "Er gilt 10 Minuten. Geben Sie ihn auf der Anmeldeseite ein.",
      "Haben Sie sich nicht gerade angemeldet? Dann kennt jemand Ihr Passwort: Bitte ändern Sie es sofort und informieren Sie eine Admin.",
    ].join("\n"),
  });
  if (!result.ok) {
    payload.logger.error(`Anmeldecode nicht versendet: ${result.message}`);
    return { state: "failed", message: result.message };
  }
  return { state: "sent" };
}

