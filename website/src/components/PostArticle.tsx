import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/content/posts";
import type { PostData, PostDocument } from "@/content/model";
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
          {post.author && <> · Verfasst von {post.author}</>}
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
            <figure className="figure figure--center">
              <Image
                src={post.image}
                alt={post.imageAlt ?? ""}
                sizes="(min-width: 64em) 40rem, 100vw"
              />
            </figure>
          )}
          <Rich value={post.content} prose />
          {post.gallery.map((item, index) => (
            <figure key={index} className="figure figure--center">
              <Image
                src={item.image}
                alt={item.alt ?? ""}
                sizes="(min-width: 64em) 40rem, 100vw"
              />
            </figure>
          ))}
        </div>
      )}
      {post.documents.length > 0 && <Downloads documents={post.documents} />}
    </article>
  );
}

// Download-Bereich unter dem Text: Name, kleine Vorschau (Bild oder PDF-Symbol) und ein klarer Download-Knopf
function Downloads({ documents }: { documents: PostDocument[] }) {
  return (
    <section className="downloads measure" aria-labelledby="downloads-titel">
      <h2 id="downloads-titel">Downloads</h2>
      <ul className="downloads__list">
        {documents.map((doc) => (
          <li key={doc.file} className="download">
            <span className="download__preview" aria-hidden="true">
              {doc.preview ? <Image src={doc.preview} alt="" sizes="4rem" /> : <PdfIcon />}
            </span>
            <span className="download__text">
              <span className="download__name">{doc.label}</span>
              {doc.meta && <span className="small muted">{doc.meta}</span>}
            </span>
            <a className="button download__button" href={doc.file} download>
              <DownloadIcon />
              Download<span className="visually-hidden">: {doc.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PdfIcon() {
  return (
    <svg viewBox="0 0 40 52" width="40" height="52" focusable="false">
      <path d="M2 2h26l10 10v38H2z" fill="var(--c-paper)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 2v10h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <text x="20" y="38" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">PDF</text>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path d="M12 3v12m0 0-5-5m5 5 5-5M4 19h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
