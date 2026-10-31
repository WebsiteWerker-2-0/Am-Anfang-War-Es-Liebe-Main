import { getCms } from "@/lib/cms-client";
import { sendContact, validateContact } from "@/lib/contact";
import { clientIp, rateLimiter, sameOrigin } from "@/lib/rate-limit";

// Kontaktanfrage (F-04). Nichts davon wird gespeichert oder protokolliert (ADR-0003): Die Anfrage geht
// nur als E-Mail an das Postfach des Anliegens. Auch die Adresse der Besucherin wird nicht gespeichert.
export const dynamic = "force-dynamic";

// Höchstens 5 Nachrichten je Adresse und Stunde (CONTACT_LIMIT)
const tooMany = rateLimiter(Number(process.env.CONTACT_LIMIT ?? 5));

const reply = (body: Record<string, unknown>, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  if (!sameOrigin(request)) return reply({ message: "Anfrage nicht erlaubt." }, 403);

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return reply({ message: "Die Anfrage war nicht lesbar." }, 400);

  // Verstecktes Feld: Menschen lassen es leer. Bots bekommen eine Erfolgsmeldung, aber es passiert nichts.
  if (typeof body.website === "string" && body.website.trim() !== "") return reply({ ok: true });

  if (tooMany(clientIp(request))) return reply({ message: "Zu viele Nachrichten in kurzer Zeit. Bitte versuchen Sie es später noch einmal." }, 429);

  const input = {
    concern: String(body.concern ?? ""),
    message: String(body.message ?? ""),
    name: body.name ? String(body.name) : undefined,
    replyTo: body.replyTo ? String(body.replyTo) : undefined,
  };
  const problem = validateContact(input);
  if (problem) return reply({ message: problem }, 400);

  const cms = await getCms();
  if (!cms) return reply({ message: "Das Formular ist im Moment nicht erreichbar. Bitte schreiben Sie uns direkt eine E-Mail oder rufen Sie an." }, 503);

  const result = await sendContact(cms, input).catch(() => null);
  if (!result) return reply({ message: "Die Nachricht konnte gerade nicht verschickt werden. Bitte schreiben Sie uns direkt eine E-Mail oder rufen Sie an." }, 500);
  if (!result.ok) return reply({ message: result.message }, result.code === "invalid" ? 400 : 503);
  return reply({ ok: true });
}
