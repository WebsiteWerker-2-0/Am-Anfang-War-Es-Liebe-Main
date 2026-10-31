import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseOfferArticle } from "@/components/CourseOfferArticle";
import { PreviewRefresh } from "@/components/PreviewRefresh";
import { normalizeCourseOffer } from "@/lib/cms-content";
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
    <>
      <PreviewRefresh />
      <CourseOfferArticle offer={normalizeCourseOffer(doc as never)} />
    </>
  );
}
