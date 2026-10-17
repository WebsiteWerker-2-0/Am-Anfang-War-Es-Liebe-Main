import { NextResponse, type NextRequest } from "next/server";
import { PAYLOAD_TOKEN_COOKIE, TWO_FACTOR_COOKIE, TWO_FACTOR_PATH, sessionKey, tokenFrom, twoFactorEnabled, verifyProof } from "./lib/two-factor";

// Das erste Admin-Konto darf nur angelegt werden, wenn CMS_ALLOW_FIRST_USER=true gesetzt ist.
// Sonst könnte auf einer frisch aufgesetzten Seite jede Besucherin das erste Konto anlegen.
// Normalweg: `npm run cms:create-admin` auf dem Server.
const FIRST_USER_PATHS = ["/backend/create-first-user", "/backend/api/users/first-register"];

const text = (message: string, status: number) =>
  new NextResponse(message, { status, headers: { "Content-Type": "text/plain; charset=utf-8" } });

// Ohne zweiten Faktor erreichbar: Anmeldung, Abmeldung, Passwort vergessen und die Code-Seite selbst
const TWO_FACTOR_FREE = [
  TWO_FACTOR_PATH,
  "/backend/login",
  "/backend/logout",
  "/backend/forgot",
  "/backend/reset",
  "/backend/api/users/login",
  "/backend/api/users/logout",
  "/backend/api/users/forgot-password",
  "/backend/api/users/reset-password",
];

/** Angemeldet (Cookie oder Token in der Kopfzeile), aber Code aus der E-Mail noch nicht bestätigt? */
async function missingSecondFactor(request: NextRequest) {
  if (!twoFactorEnabled()) return false;
  const { pathname } = request.nextUrl;
  if (TWO_FACTOR_FREE.some((path) => pathname === path || pathname.startsWith(`${path}/`))) return false;
  const token = tokenFrom(request.cookies.get(PAYLOAD_TOKEN_COOKIE)?.value, request.headers.get("authorization"));
  if (!token) return false; // nicht angemeldet: Payload selbst verlangt die Anmeldung
  return !(await verifyProof(request.cookies.get(TWO_FACTOR_COOKIE)?.value, sessionKey(token)));
}

async function backend(request: NextRequest) {
  // Ohne geheimen Schlüssel kann das Backend nicht starten: klare Meldung statt Serverfehler
  if (!process.env.PAYLOAD_SECRET) {
    return text("Der Redaktionsbereich ist noch nicht eingerichtet: PAYLOAD_SECRET fehlt in den Umgebungsvariablen.", 503);
  }
  if (process.env.CMS_ALLOW_FIRST_USER !== "true" && FIRST_USER_PATHS.includes(request.nextUrl.pathname)) {
    return text("Der Redaktionsbereich ist noch nicht eingerichtet.", 404);
  }
  if (await missingSecondFactor(request)) {
    if (request.nextUrl.pathname.startsWith("/backend/api/")) {
      return NextResponse.json({ errors: [{ message: "Bitte bestätigen Sie zuerst die Anmeldung mit dem Code aus der E-Mail." }] }, { status: 403 });
    }
    return NextResponse.redirect(new URL(TWO_FACTOR_PATH, request.url));
  }
  return NextResponse.next();
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/backend" || pathname.startsWith("/backend/")) return backend(request);

  // Seiten der Website nie im Browser ablegen (Abschnitt 6.2): kein Back-Forward-Cache, keine
  // Kopie im Zwischenspeicher als Internetspur. Hier und nicht in next.config.ts, weil Next.js
  // dort gesetztes Cache-Control bei vorgerenderten Seiten überschreibt.
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  return response;
}

// Alles außer Build-Dateien und Adressen mit Dateiendung (Bilder, Dokumente, Schriften)
export const config = { matcher: ["/backend/:path*", "/((?!_next/|.*\\.\\w+$).*)"] };
