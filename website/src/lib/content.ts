import { cache } from "react";
import { defaultPageBySlug, defaultPages } from "@/content/pages";
import type { PageData, PostData, SiteData } from "@/content/model";
import { defaultSite } from "@/content/site";
import posts from "@/content/posts.json";
import { mainServices, quickAccess, serviceGroups } from "@/content/support-services";
import { getCms } from "./cms-client";
import { groupServices, normalizePage, normalizePost, normalizeSite } from "./cms-content";
import { listPublicCourses, type PublicCourse } from "./courses";

// Inhalte der Website. Quelle ist das CMS; fehlt es oder sind seine Tabellen noch leer,
// gilt der Standardinhalt aus `content/`. Die Website funktioniert damit auch ohne CMS.

export const getPage = cache(async (slug: string): Promise<PageData | null> => {
  const fallback = defaultPageBySlug.get(slug) ?? null;
  const cms = await getCms();
  if (!cms) return fallback;
  try {
    const result = await cms.find({ collection: "pages", where: { slug: { equals: slug } }, depth: 1, limit: 1, pagination: false });
    return result.docs[0] ? normalizePage(result.docs[0] as never) : fallback;
  } catch (error) {
    console.error(`Seite ${slug} aus dem CMS nicht lesbar.`, error);
    return fallback;
  }
});

export const getSite = cache(async (): Promise<SiteData> => {
  const cms = await getCms();
  if (!cms) return defaultSite;
  try {
    const doc = await cms.findGlobal({ slug: "site", depth: 1 });
    return doc.navigation?.length ? normalizeSite(doc as never) : defaultSite;
  } catch (error) {
    console.error("Seitenrahmen aus dem CMS nicht lesbar.", error);
    return defaultSite;
  }
});

export const getServices = cache(async () => {
  const fallback = { main: mainServices, quick: quickAccess, groups: serviceGroups };
  const cms = await getCms();
  if (!cms) return fallback;
  try {
    const result = await cms.find({ collection: "services", depth: 0, limit: 200, pagination: false, sort: "_order" });
    return result.docs.length ? groupServices(result.docs as never[]) : fallback;
  } catch (error) {
    console.error("Anlaufstellen aus dem CMS nicht lesbar.", error);
    return fallback;
  }
});

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

/** Veröffentlichte Beiträge in der Reihenfolge der Position (Standard: neueste zuerst) */
export const getPosts = cache(async (): Promise<PostData[]> => {
  const cms = await getCms();
  if (!cms) return defaultPosts;
  try {
    const result = await cms.find({
      collection: "posts",
      where: { status: { equals: "published" } },
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

export async function getPost(slug: string) {
  return (await getPosts()).find((post) => post.slug === slug) ?? null;
}

/** Seiten und Beiträge, die schon beim Bauen entstehen */
export const defaultPostSlugs = defaultPosts.map((post) => post.slug);
export const defaultPageSlugs = defaultPages.map((page) => page.slug);

/** Veröffentlichte Kurse mit freien Plätzen; ohne CMS gibt es keine */
export const getPublicCourses = cache(async (): Promise<PublicCourse[]> => {
  const cms = await getCms();
  if (!cms) return [];
  try {
    return await listPublicCourses(cms);
  } catch (error) {
    console.error("Kurse aus dem CMS nicht lesbar.", error);
    return [];
  }
});
