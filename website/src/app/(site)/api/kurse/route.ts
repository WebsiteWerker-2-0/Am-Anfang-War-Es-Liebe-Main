import { getCms } from "@/lib/cms-client";
import { listPublicCourses } from "@/lib/courses";

// Aktueller Stand der Kurse (freie Plätze). Die Seite „Kurse“ ruft ihn regelmäßig ab,
// damit die Anzeige stimmt, auch wenn die Seite selbst zwischengespeichert ist.
export const dynamic = "force-dynamic";

export async function GET() {
  const cms = await getCms();
  const courses = cms ? await listPublicCourses(cms).catch(() => []) : [];
  return Response.json({ courses }, { headers: { "Cache-Control": "no-store" } });
}
