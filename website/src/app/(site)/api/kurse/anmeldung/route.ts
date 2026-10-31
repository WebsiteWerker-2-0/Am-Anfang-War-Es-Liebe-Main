import { getCms } from "@/lib/cms-client";
import { clientIp, rateLimiter, sameOrigin } from "@/lib/rate-limit";
import { register, validate } from "@/lib/registration";

// Anmeldung zu einem Kurs. Nichts davon landet in Logs oder bei Dritten: gespeichert wird die Anmeldung
// im CMS, dazu geht eine E-Mail an den Arbeitskreis. Die Adresse der Besucherin wird nicht gespeichert.
export const dynamic = "force-dynamic";

// Höchstens 10 Anmeldungen je Adresse und Stunde (CMS_REGISTRATION_LIMIT), nur im Arbeitsspeicher
const tooMany = rateLimiter(Number(process.env.CMS_REGISTRATION_LIMIT ?? 10));

const reply = (body: Record<string, unknown>, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  if (!sameOrigin(request)) return reply({ message: "Anfrage nicht erlaubt." }, 403);

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return reply({ message: "Die Anfrage war nicht lesbar." }, 400);

  // Verstecktes Feld: Menschen lassen es leer. Bots bekommen eine Erfolgsmeldung, aber es passiert nichts.
  if (typeof body.website === "string" && body.website.trim() !== "") return reply({ ok: true, status: "confirmed", free: 0 });

  if (tooMany(clientIp(request))) return reply({ message: "Zu viele Anmeldungen in kurzer Zeit. Bitte versuchen Sie es später noch einmal." }, 429);

  const input = {
    courseId: Number(body.courseId),
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    phone: body.phone ? String(body.phone) : undefined,
    message: body.message ? String(body.message) : undefined,
    consent: body.consent === true,
  };
  if (!Number.isInteger(input.courseId)) return reply({ message: "Bitte wählen Sie einen Termin." }, 400);
  const problem = validate(input);
  if (problem) return reply({ message: problem }, 400);

  const cms = await getCms();
  if (!cms) return reply({ message: "Die Anmeldung ist im Moment nicht möglich. Bitte versuchen Sie es später noch einmal." }, 503);

  const result = await register(cms, input, new URL(request.url).origin).catch((error) => {
    console.error("Kursanmeldung fehlgeschlagen", error);
    return null;
  });
  if (!result) return reply({ message: "Die Anmeldung hat nicht geklappt. Bitte versuchen Sie es später noch einmal." }, 500);
  if (!result.ok) return reply({ message: result.message, code: result.code }, result.code === "invalid" ? 404 : 409);
  return reply({ ok: true, status: result.status, free: result.free });
}
