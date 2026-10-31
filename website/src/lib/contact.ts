import type { Payload } from "payload";
import { contact } from "@/content/pages/contact";
import { defaultSite } from "@/content/site";
import { getMailSettings, sendMail } from "./mail";

// Kontaktanfrage (F-04): wird nur per E-Mail zugestellt, nie gespeichert und nie protokolliert (ADR-0003).
// Das Anliegen bestimmt das Postfach (content/site.ts, „mailboxes“). Verschickt wird über das Postfach
// aus dem Backend („E-Mail und Anmeldungen“), dasselbe wie bei Anmeldungen. Steht dort „Kontaktanfragen
// umleiten an“, gehen alle Anfragen dorthin (zum Testen).

export type ContactInput = { concern: string; message: string; name?: string; replyTo?: string };

export type ContactResult = { ok: true } | { ok: false; code: "invalid" | "unavailable"; message: string };

const EMAIL = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/;

/** Die Anliegen aus dem Formular der Seite „Kontakt“ mit ihrem Postfach */
export function contactConcerns() {
  const block = contact.blocks.find((item) => item.blockType === "contactForm");
  return block?.blockType === "contactForm" ? block.concerns : [];
}

export function validateContact(input: Partial<ContactInput>): string | null {
  if (!input.concern || !contactConcerns().some((concern) => concern.label === input.concern)) return "Bitte wählen Sie aus, worum es geht.";
  if (!input.message || input.message.trim().length < 2) return "Bitte schreiben Sie eine Nachricht.";
  if (input.message.length > 5000) return "Die Nachricht ist zu lang (höchstens 5000 Zeichen).";
  if (input.name && input.name.length > 100) return "Der Name ist zu lang.";
  if (input.replyTo && input.replyTo.length > 200) return "Die Angabe für eine Antwort ist zu lang.";
  return null;
}

export async function sendContact(payload: Payload, input: ContactInput): Promise<ContactResult> {
  const concern = contactConcerns().find((item) => item.label === input.concern);
  if (!concern) return { ok: false, code: "invalid", message: "Bitte wählen Sie aus, worum es geht." };

  const settings = await getMailSettings(payload);
  const to = settings.contactRedirect ?? defaultSite.mailboxes[concern.mailbox].email;
  const replyTo = input.replyTo?.trim();
  const name = input.name?.trim();

  const result = await sendMail(settings, {
    to,
    // Antworten gehen direkt an die Person, wenn sie eine E-Mail-Adresse angegeben hat
    replyTo: replyTo && EMAIL.test(replyTo) ? replyTo : undefined,
    subject: `Kontaktanfrage über die Website: ${concern.label}`,
    text: [
      "Neue Kontaktanfrage über das Formular der Website.",
      "",
      `Worum geht es: ${concern.label}`,
      `Name: ${name || "(nicht angegeben)"}`,
      `Telefon oder E-Mail für eine Antwort: ${replyTo || "(nicht angegeben, keine Antwort möglich)"}`,
      "",
      "Nachricht:",
      input.message.trim(),
      "",
      "Die Anfrage ist nur in dieser E-Mail enthalten, die Website speichert sie nicht.",
      replyTo && !EMAIL.test(replyTo) ? "Bitte antworten Sie nicht per E-Mail, sondern über die angegebene Telefonnummer." : "",
    ]
      .filter((line, index, all) => line !== "" || all[index - 1] !== "")
      .join("\n"),
  });

  // Fehler nur mit Grund, nie mit Inhalt der Anfrage
  if (!result.ok) {
    console.error(`Kontaktanfrage nicht zugestellt: ${result.reason}`);
    return {
      ok: false,
      code: "unavailable",
      message: "Die Nachricht konnte gerade nicht verschickt werden. Bitte schreiben Sie uns direkt eine E-Mail oder rufen Sie an.",
    };
  }
  return { ok: true };
}
