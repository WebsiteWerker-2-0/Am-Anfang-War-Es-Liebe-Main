import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findPost, formatDate, posts } from "@/content/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/aktuelles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  return post ? { title: post.title, description: post.excerpt || undefined } : {};
}

export default async function PostPage({ params }: PageProps<"/aktuelles/[slug]">) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  return (
    <article className="wide" style={{ paddingBlock: "var(--space-6)" }}>
      <p className="small">
        <Link href="/aktuelles">Aktuelles</Link>
      </p>
      <header className="measure" style={{ marginBlock: "var(--space-4) var(--space-6)" }}>
        <h1>{post.title}</h1>
        <p className="muted" style={{ marginBlockStart: "var(--space-3)" }}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
      </header>
      {/* Inhalt aus der Altseite, bereinigt durch altseite/import-posts.py */}
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
