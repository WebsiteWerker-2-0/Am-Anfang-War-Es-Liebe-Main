import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseList } from "@/components/CourseList";
import { PreviewRefresh } from "@/components/PreviewRefresh";
import { takenSeats, toPublicCourse } from "@/lib/courses";
import { requirePreviewCms } from "@/lib/preview";

// Vorschau einer Veranstaltung im Backend, nur für angemeldete Redakteurinnen
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Vorschau",
  robots: { index: false, follow: false },
};

export default async function CoursePreview({
  params,
}: PageProps<"/vorschau/veranstaltungen/[id]">) {
  const { id } = await params;
  const cms = await requirePreviewCms();
  const doc = await cms
    .findByID({ collection: "courses", id, depth: 1, joins: false })
    .catch(() => null);
  if (!doc) notFound();
  const taken = await takenSeats(cms, [doc.id]);
  return (
    <div className="wide" style={{ paddingBlock: "var(--space-6)" }}>
      <PreviewRefresh />
      <CourseList
        preview
        initial={[toPublicCourse(doc, taken.get(doc.id) ?? 0)]}
        heading="Veranstaltung"
        empty={null}
      />
    </div>
  );
}
