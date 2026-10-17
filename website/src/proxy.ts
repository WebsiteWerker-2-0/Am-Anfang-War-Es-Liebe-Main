import { NextResponse, type NextRequest } from "next/server";

// Das erste Admin-Konto darf nur angelegt werden, wenn CMS_ALLOW_FIRST_USER=true gesetzt ist.
// Sonst könnte auf einer frisch aufgesetzten Seite jede Besucherin das erste Konto anlegen.
// Normalweg: `npm run cms:create-admin` auf dem Server.
const FIRST_USER_PATHS = ["/backend/create-first-user", "/backend/api/users/first-register"];

const text = (message: string, status: number) =>
  new NextResponse(message, { status, headers: { "Content-Type": "text/plain; charset=utf-8" } });

export function proxy(request: NextRequest) {
  // Ohne geheimen Schlüssel kann das Backend nicht starten: klare Meldung statt Serverfehler
  if (!process.env.PAYLOAD_SECRET) {
    return text("Der Redaktionsbereich ist noch nicht eingerichtet: PAYLOAD_SECRET fehlt in den Umgebungsvariablen.", 503);
  }
  if (process.env.CMS_ALLOW_FIRST_USER !== "true" && FIRST_USER_PATHS.includes(request.nextUrl.pathname)) {
    return text("Der Redaktionsbereich ist noch nicht eingerichtet.", 404);
  }
  return NextResponse.next();
}

export const config = { matcher: "/backend/:path*" };
