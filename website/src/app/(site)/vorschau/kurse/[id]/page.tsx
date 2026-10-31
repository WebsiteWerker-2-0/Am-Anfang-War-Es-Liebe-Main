import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PreviewRefresh } from "@/components/PreviewRefresh";
import { Rich } from "@/lib/rich";
import { requirePreviewCms } from "@/lib/preview";

// Vorschau eines Kurses im Backend (Auge-Symbol), nur für angemeldete Redakteurinnen
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Vorschau", robots: { index: false, follow: false } };

export default async function CourseOfferPreview({ params }: PageProps<"/vorschau/kurse/[id]">) {
  const { id } = await params;
  const cms = await requirePreviewCms();
  const doc = await cms.findByID({ collection: "course-offers", id, depth: 1 }).catch(() => null);
  if (!doc) notFound();
  return (
    <div className="wide" style={{ paddingBlock: "var(--space-6)" }}>
      <PreviewRefresh />
      <section className="service">
        <h2>{doc.title}</h2>
        <div className="measure stack">
          <Rich value={(doc.content ?? null) as never} />
        </div>
      </section>
    </div>
  );
}
