import type { Payload } from "payload";
import { getMailSettings, sendMail } from "./mail";
import { courseState, takenSeats } from "./courses";

// Kursanmeldung: prüfen, Platz vergeben, speichern, E-Mail an den Arbeitskreis senden.

export type RegistrationInput = {
  courseId: number;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  consent: boolean;
};

export type RegistrationResult =
  | { ok: true; status: "confirmed" | "waitlist"; free: number }
  | { ok: false; code: "invalid" | "closed" | "full" | "duplicate" | "unavailable"; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(input: Partial<RegistrationInput>): string | null {
  if (!input.name || input.name.trim().length < 2 || input.name.length > 100) return "Bitte geben Sie Ihren Namen an.";
  if (!input.email || !EMAIL.test(input.email.trim()) || input.email.length > 200) return "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  if (input.phone && input.phone.length > 40) return "Die Telefonnummer ist zu lang.";
  if (input.message && input.message.length > 1000) return "Die Nachricht ist zu lang (höchstens 1000 Zeichen).";
  if (!input.consent) return "Bitte bestätigen Sie den Datenschutzhinweis.";
  return null;
}

// Anmeldungen laufen nacheinander, damit zwei gleichzeitige Anfragen nicht denselben letzten Platz bekommen.
// Die App läuft als ein Prozess; bei mehreren Prozessen müsste die Datenbank die Grenze sichern.
let queue: Promise<unknown> = Promise.resolve();
function serialized<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => undefined);
  return run;
}

const dateFormat = new Intl.DateTimeFormat("de-DE", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/Berlin" });

export function register(payload: Payload, input: RegistrationInput, origin: string): Promise<RegistrationResult> {
  return serialized(async () => {
    const course = await payload.findByID({ collection: "courses", id: input.courseId, depth: 0 }).catch(() => null);
    if (!course || course.status !== "published") {
      return { ok: false, code: "invalid", message: "Diese Veranstaltung gibt es nicht mehr." };
    }

    const email = input.email.trim().toLowerCase();
    const existing = await payload.count({
      collection: "registrations",
      where: { and: [{ course: { equals: course.id } }, { email: { equals: email } }, { status: { not_equals: "cancelled" } }] },
    });
    if (existing.totalDocs > 0) {
      return { ok: false, code: "duplicate", message: "Mit dieser E-Mail-Adresse sind Sie schon angemeldet." };
    }

    const taken = (await takenSeats(payload, [course.id])).get(course.id) ?? 0;
    const free = Math.max(course.capacity - taken, 0);
    const state = courseState(course, free);
    if (state === "closed") return { ok: false, code: "closed", message: "Für diese Veranstaltung ist die Anmeldung nicht möglich." };
    if (state === "full") return { ok: false, code: "full", message: "Diese Veranstaltung ist leider ausgebucht." };

    const status = state === "open" ? "confirmed" : "waitlist";
    const registration = await payload.create({
      collection: "registrations",
      data: {
        course: course.id,
        name: input.name.trim(),
        email,
        phone: input.phone?.trim() || undefined,
        message: input.message?.trim() || undefined,
        status,
        consent: true,
        mailStatus: "skipped",
      },
    });

    // E-Mail an den Arbeitskreis. Scheitert sie, bleibt die Anmeldung gespeichert und im Backend sichtbar.
    const settings = await getMailSettings(payload);
    const recipient = course.notifyEmail || settings.courseRecipient;
    let mailStatus: "sent" | "failed" | "skipped" = "skipped";
    let mailError: string | undefined;
    if (recipient) {
      const left = status === "confirmed" ? free - 1 : 0;
      const result = await sendMail(settings, {
        to: recipient,
        replyTo: email,
        subject: `${status === "waitlist" ? "Warteliste" : "Anmeldung"}: ${course.title} – ${input.name.trim()}`,
        text: [
          status === "waitlist" ? "Neue Anmeldung auf der WARTELISTE" : "Neue Anmeldung",
          "",
          `Veranstaltung: ${course.title}`,
          `Termin: ${dateFormat.format(new Date(course.startsAt))}`,
          course.location ? `Ort: ${course.location}` : "",
          `Plätze: ${Math.min(taken + (status === "confirmed" ? 1 : 0), course.capacity)} von ${course.capacity} belegt${left === 0 && status === "confirmed" ? " (jetzt voll)" : ""}`,
          "",
          `Name: ${input.name.trim()}`,
          `E-Mail: ${email}`,
          input.phone ? `Telefon: ${input.phone.trim()}` : "",
          input.message ? `Nachricht: ${input.message.trim()}` : "",
          "",
          `Anmeldung im Backend: ${origin}/backend/collections/registrations/${registration.id}`,
          "Antworten Sie auf diese E-Mail, um die Teilnehmerin direkt zu erreichen.",
        ]
          .filter((line, index, all) => line !== "" || all[index - 1] !== "")
          .join("\n"),
      });
      mailStatus = result.ok ? "sent" : "failed";
      mailError = result.ok ? undefined : result.message;
    }
    await payload.update({ collection: "registrations", id: registration.id, data: { mailStatus, mailError } });

    return { ok: true, status, free: Math.max(free - (status === "confirmed" ? 1 : 0), 0) };
  });
}
