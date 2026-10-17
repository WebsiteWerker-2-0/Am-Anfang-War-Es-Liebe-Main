import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArticle } from "@/components/PostArticle";
import { PreviewRefresh } from "@/components/PreviewRefresh";
import { normalizePost } from "@/lib/cms-content";
import { requirePreviewCms } from "@/lib/preview";

// Vorschau eines Beitrags im Backend (Reiter „Vorschau“), nur für angemeldete Redakteurinnen
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Vorschau",
  robots: { index: false, follow: false },
};

export default async function PostPreview({
  params,
}: PageProps<"/vorschau/aktuelles/[id]">) {
  const { id } = await params;
  const cms = await requirePreviewCms();
  const doc = await cms
    .findByID({ collection: "posts", id, depth: 1, draft: false })
    .catch(() => null);
  if (!doc) notFound();
  return (
    <>
      <PreviewRefresh />
      <PostArticle post={normalizePost(doc as never)} />
    </>
  );
}
