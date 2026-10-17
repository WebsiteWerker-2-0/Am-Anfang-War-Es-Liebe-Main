import { NextResponse, type NextRequest } from "next/server";
import { cmsSecret, firstUserAllowed } from "@/cms/env";

// Das erste Admin-Konto darf nur angelegt werden, wenn es freigegeben ist (CMS_ALLOW_FIRST_USER=true
// oder die Datei ALLOW_FIRST_USER im Datenordner).
// Sonst könnte auf einer frisch aufgesetzten Seite jede Besucherin das erste Konto anlegen.
// Normalweg: `npm run cms:create-admin` auf dem Server.
const FIRST_USER_PATHS = ["/backend/create-first-user", "/backend/api/users/first-register"];

const text = (message: string, status: number) =>
  new NextResponse(message, { status, headers: { "Content-Type": "text/plain; charset=utf-8" } });

export function proxy(request: NextRequest) {
  // Ohne geheimen Schlüssel kann das Backend nicht starten: klare Meldung statt Serverfehler
  if (!cmsSecret()) {
    return text("Der Redaktionsbereich kann nicht starten: Im Datenordner ist kein Geheimnis lesbar oder anlegbar.", 503);
  }
  if (!firstUserAllowed() && FIRST_USER_PATHS.includes(request.nextUrl.pathname)) {
    return text("Der Redaktionsbereich ist noch nicht eingerichtet.", 404);
  }
  return NextResponse.next();
}

export const config = { matcher: "/backend/:path*" };
