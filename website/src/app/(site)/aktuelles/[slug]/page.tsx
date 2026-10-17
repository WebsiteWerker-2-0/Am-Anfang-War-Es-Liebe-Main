import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PostArticle } from "@/components/PostArticle";
import { defaultPostSlugs, getPost } from "@/lib/content";

// Beiträge aus dem CMS. Neue Beiträge entstehen beim ersten Aufruf, bestehende werden
// regelmäßig und nach jeder Änderung im Backend neu erzeugt.
export const revalidate = 60;

export function generateStaticParams() {
  return defaultPostSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/aktuelles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return post ? { title: post.title, description: post.excerpt || undefined } : {};
}

export default async function PostPage({ params }: PageProps<"/aktuelles/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  // Unbekannte, archivierte oder gelöschte Beiträge führen zur Liste.
  // (notFound() liefert bei neu im CMS angelegten Adressen nur eine Hülle ohne Inhalt.)
  if (!post) redirect("/aktuelles");

  return <PostArticle post={post} />;
}
