import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PageData } from "@/content/model";
import { getPage } from "@/lib/content";
import type { NewsPagingParams } from "@/lib/news-paging";
import { pageBands } from "@/content/page-bands";
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

export async function CmsPage({ slug, newsParams }: { slug: string; newsParams?: NewsPagingParams }) {
  const page = await getPage(slug);
  if (!page) notFound();

  const blocks = <PageBlocks blocks={page.blocks} newsParams={newsParams} />;
  if (page.layout === "home") return blocks;

  return (
    <>
      <PageHeader title={page.title} intro={page.intro} band={page.band ? pageBands[page.band] : undefined} />
      <div className={WRAPPER_CLASS[page.layout]}>{blocks}</div>
    </>
  );
}
