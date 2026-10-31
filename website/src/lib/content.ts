import { cache } from "react";
import { defaultPageBySlug, defaultPages } from "@/content/pages";
import { defaultCourseOffers } from "@/content/course-offers";
import { defaultMembers } from "@/content/members";
import type { CourseOfferData, MemberData, PageData, PostData, SiteData } from "@/content/model";
import { defaultSite } from "@/content/site";
import posts from "@/content/posts.json";
import { mainServices, quickAccess, serviceGroups } from "@/content/support-services";
import { getCms } from "./cms-client";
import { normalizePost } from "./cms-content";
import { listPublicCourses, type PublicCourse } from "./courses";

// Inhalte der Website.
//  - Seiten, Anlaufstellen, Menü und Fuß stehen im Code (`src/content/`) und sind bewusst nicht im Backend
//    änderbar (Entscheidung vom 17.10.2026, docs/adr/0005-…).
//  - Aktuelles, Termine und Kurse kommen aus dem CMS. Fehlt es, zeigt die Website den Altbestand, keine Termine
//    und die Kurse aus content/course-offers.ts.

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

/** Veröffentlichte Termine mit freien Plätzen; ohne CMS gibt es keine */
export const getPublicCourses = cache(async (): Promise<PublicCourse[]> => {
  const cms = await getCms();
  if (!cms) return [];
  try {
    return await listPublicCourses(cms);
  } catch (error) {
    console.error("Termine aus dem CMS nicht lesbar.", error);
    return [];
  }
});

/** Veröffentlichte Kurse in der Reihenfolge aus dem Backend; ohne CMS (oder leeres CMS) die Standardfassung */
export const getCourseOffers = cache(async (): Promise<CourseOfferData[]> => {
  const cms = await getCms();
  if (!cms) return defaultCourseOffers;
  try {
    const { docs } = await cms.find({
      collection: "course-offers",
      where: { status: { equals: "published" } },
      depth: 1,
      limit: 50,
      pagination: false,
      sort: "_order",
    });
    if (!docs.length && (await cms.count({ collection: "course-offers" })).totalDocs === 0) return defaultCourseOffers;
    return docs.map((doc) => ({ slug: doc.slug, title: doc.title, content: (doc.content ?? null) as CourseOfferData["content"] }));
  } catch (error) {
    console.error("Kurse aus dem CMS nicht lesbar.", error);
    return defaultCourseOffers;
  }
});

/** Mitglieder des Arbeitskreises in der Reihenfolge aus dem Backend; ohne CMS (oder leeres CMS) die Standardliste */
export const getMembers = cache(async (): Promise<MemberData[]> => {
  const cms = await getCms();
  if (!cms) return defaultMembers;
  try {
    const { docs } = await cms.find({ collection: "members", depth: 0, limit: 200, pagination: false, sort: "_order" });
    if (!docs.length) return defaultMembers;
    return docs.map((doc) => ({ name: doc.name, role: doc.role ?? undefined, url: doc.url ?? undefined }));
  } catch (error) {
    console.error("Mitglieder aus dem CMS nicht lesbar.", error);
    return defaultMembers;
  }
});

/** Seiten und Beiträge, die schon beim Bauen entstehen */
export const defaultPostSlugs = defaultPosts.map((post) => post.slug);
export const defaultPageSlugs = defaultPages.map((page) => page.slug);
