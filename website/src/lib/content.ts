import { cache } from "react";
import { defaultPageBySlug, defaultPages } from "@/content/pages";
import type { PageData, PostData, SiteData } from "@/content/model";
import { defaultSite } from "@/content/site";
import posts from "@/content/posts.json";
import { mainServices, quickAccess, serviceGroups } from "@/content/support-services";
import { getCms } from "./cms-client";
import { normalizePost } from "./cms-content";
import { listPublicCourses, type PublicCourse } from "./courses";

// Inhalte der Website.
//  - Seiten, Anlaufstellen, Menü und Fuß stehen im Code (`src/content/`) und sind bewusst nicht im Backend
//    änderbar (Entscheidung vom 17.10.2026, docs/adr/0005-…).
//  - Aktuelles und Veranstaltungen kommen aus dem CMS. Fehlt es, zeigt die Website den Altbestand und keine Termine.

export const getPage = cache(async (slug: string): Promise<PageData | null> => defaultPageBySlug.get(slug) ?? null);

export const getSite = cache(async (): Promise<SiteData> => defaultSite);

export const getServices = cache(async () => ({ main: mainServices, quick: quickAccess, groups: serviceGroups }));

const defaultPosts: PostData[] = posts.map((post) => ({
  slug: post.slug,
  title: post.title,
  date: post.date,
  excerpt: post.excerpt,
  image: null,
  content: post.html,
  gallery: [],
  documents: [],
}));

/** Veröffentlichte und archivierte Beiträge in der Reihenfolge der Position (neue stehen oben) */
const getAllPosts = cache(async (): Promise<PostData[]> => {
  const cms = await getCms();
  if (!cms) return defaultPosts;
  try {
    const result = await cms.find({
      collection: "posts",
      where: { status: { in: ["published", "archived"] } },
      depth: 1,
      limit: 500,
      pagination: false,
      sort: "_order",
    });
    // Ein leeres CMS zeigt den Altbestand, ein CMS ohne veröffentlichte Beiträge nicht
    if (!result.docs.length) {
      const total = await cms.count({ collection: "posts" });
      if (total.totalDocs === 0) return defaultPosts;
    }
    return result.docs.map((doc) => normalizePost(doc as never));
  } catch (error) {
    console.error("Beiträge aus dem CMS nicht lesbar.", error);
    return defaultPosts;
  }
});

/** Beiträge für die Liste auf „Aktuelles“ und der Startseite */
export const getPosts = cache(async (): Promise<PostData[]> => (await getAllPosts()).filter((post) => !post.archived));

/** Archivierte Beiträge (eingeklappt unten auf „Aktuelles“) */
export const getArchivedPosts = cache(async (): Promise<PostData[]> => (await getAllPosts()).filter((post) => post.archived));

/** Ein Beitrag, auch archiviert (aus dem Archiv verlinkt) */
export async function getPost(slug: string) {
  return (await getAllPosts()).find((post) => post.slug === slug) ?? null;
}

/** Veröffentlichte Veranstaltungen mit freien Plätzen; ohne CMS gibt es keine */
export const getPublicCourses = cache(async (): Promise<PublicCourse[]> => {
  const cms = await getCms();
  if (!cms) return [];
  try {
    return await listPublicCourses(cms);
  } catch (error) {
    console.error("Veranstaltungen aus dem CMS nicht lesbar.", error);
    return [];
  }
});

/** Seiten und Beiträge, die schon beim Bauen entstehen */
export const defaultPostSlugs = defaultPosts.map((post) => post.slug);
export const defaultPageSlugs = defaultPages.map((page) => page.slug);
