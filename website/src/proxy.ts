import { NextResponse, type NextRequest } from "next/server";

// Das erste Admin-Konto darf nur angelegt werden, wenn CMS_ALLOW_FIRST_USER=true gesetzt ist.
// Sonst könnte auf einer frisch aufgesetzten Seite jede Besucherin das erste Konto anlegen.
// Normalweg: `npm run cms:create-admin` auf dem Server.
const FIRST_USER_PATHS = ["/backend/create-first-user", "/backend/api/users/first-register"];

export function proxy(request: NextRequest) {
  if (process.env.CMS_ALLOW_FIRST_USER !== "true" && FIRST_USER_PATHS.includes(request.nextUrl.pathname)) {
    return new NextResponse("Der Redaktionsbereich ist noch nicht eingerichtet.", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  return NextResponse.next();
}

export const config = { matcher: "/backend/:path*" };
