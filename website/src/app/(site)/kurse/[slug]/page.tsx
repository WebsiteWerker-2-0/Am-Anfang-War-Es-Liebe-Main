import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CourseOfferArticle } from "@/components/CourseOfferArticle";
import { defaultCourseOfferSlugs, getCourseOffer } from "@/lib/content";

// Eigene Seite je Kurs aus dem Backend (wie Beiträge unter /aktuelles/…). Neue Kurse entstehen beim
// ersten Aufruf, bestehende werden regelmäßig und nach jeder Änderung im Backend neu erzeugt.
export const revalidate = 60;

export function generateStaticParams() {
  return defaultCourseOfferSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/kurse/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const offer = await getCourseOffer(slug);
  return offer ? { title: offer.title, description: offer.excerpt } : {};
}

export default async function CourseOfferPage({ params }: PageProps<"/kurse/[slug]">) {
  const { slug } = await params;
  const offer = await getCourseOffer(slug);
  // Unbekannte, archivierte oder gelöschte Kurse führen zur Übersicht (wie bei Aktuelles)
  if (!offer) redirect("/kurse");

  return <CourseOfferArticle offer={offer} />;
}
