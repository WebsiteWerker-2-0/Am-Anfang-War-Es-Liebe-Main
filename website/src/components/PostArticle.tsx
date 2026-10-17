import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/content/posts";
import type { PostData } from "@/content/model";
import { Rich } from "@/lib/rich";

// Ein Beitrag aus Aktuelles, gemeinsam für die Seite und die Vorschau im Backend
export function PostArticle({ post }: { post: PostData }) {
  return (
    <article className="wide" style={{ paddingBlock: "var(--space-6)" }}>
      <p className="small">
        <Link href="/aktuelles">Aktuelles</Link>
      </p>
      <header
        className="measure"
        style={{ marginBlock: "var(--space-4) var(--space-6)" }}
      >
        <h1>{post.title}</h1>
        <p className="muted" style={{ marginBlockStart: "var(--space-3)" }}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
      </header>
      {typeof post.content === "string" ? (
        // Beitrag der Altseite ohne CMS: Inhalt bereinigt durch altseite/import-posts.py
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      ) : (
        <div className="prose">
          {post.image && (
            <figure>
              <Image
                src={post.image}
                alt={post.imageAlt ?? ""}
                sizes="(min-width: 64em) 40rem, 100vw"
              />
            </figure>
          )}
          <Rich value={post.content} prose />
          {post.gallery.map((item, index) => (
            <figure key={index}>
              <Image
                src={item.image}
                alt={item.alt ?? ""}
                sizes="(min-width: 64em) 40rem, 100vw"
              />
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
