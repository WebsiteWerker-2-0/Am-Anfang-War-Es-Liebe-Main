import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { formatDate } from "@/content/posts";
import { defaultPostSlugs, getPost } from "@/lib/content";
import { Rich } from "@/lib/rich";

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
      {typeof post.content === "string" ? (
        // Beitrag der Altseite ohne CMS: Inhalt bereinigt durch altseite/import-posts.py
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
      ) : (
        <div className="prose">
          {post.image && (
            <figure>
              <Image src={post.image} alt={post.imageAlt ?? ""} sizes="(min-width: 64em) 40rem, 100vw" />
            </figure>
          )}
          <Rich value={post.content} prose />
          {post.gallery.map((item, index) => (
            <figure key={index}>
              <Image src={item.image} alt={item.alt ?? ""} sizes="(min-width: 64em) 40rem, 100vw" />
            </figure>
          ))}
          {post.documents.length > 0 && (
            <>
              <h2>Dokumente</h2>
              <ul>
                {post.documents.map((doc) => (
                  <li key={doc.file}>
                    <a href={doc.file} download>
                      {doc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </article>
  );
}
