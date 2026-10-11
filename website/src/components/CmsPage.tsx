import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PageData } from "@/content/model";
import { getPage } from "@/lib/content";
import { toImg } from "@/lib/images";
import { PageBlocks } from "./blocks";
import { PageHeader } from "./PageHeader";

// Eine Seite der Website aus dem CMS (oder dem Standardinhalt) mit dem Rahmen des alten Aufbaus:
// Seitenkopf mit Illustrationsband und Einleitung, darunter die Blöcke in der Breite des Layouts.

const WRAPPER_CLASS: Record<Exclude<PageData["layout"], "home">, string> = {
  "stack-lg": "wide stack-lg",
  "measure-stack": "wide measure stack",
  wide: "wide",
};

export async function metadataFor(slug: string): Promise<Metadata> {
  const page = await getPage(slug);
  if (!page) return {};
  const metadata: Metadata = {};
  // Die Startseite behält den Titel des Seitenrahmens
  if (slug !== "start") metadata.title = page.metaTitle || page.title;
  if (page.description) metadata.description = page.description;
  return metadata;
}

export async function CmsPage({ slug }: { slug: string }) {
  const page = await getPage(slug);
  if (!page) notFound();

  const blocks = <PageBlocks blocks={page.blocks} />;
  if (page.layout === "home") return blocks;

  return (
    <>
      <PageHeader title={page.title} intro={page.intro} band={toImg(page.band) ?? undefined} />
      <div className={WRAPPER_CLASS[page.layout]}>{blocks}</div>
    </>
  );
}
