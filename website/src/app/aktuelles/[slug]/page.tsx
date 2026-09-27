import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { beitraege, findeBeitrag, formatDatum } from "@/content/beitraege";

export function generateStaticParams() {
  return beitraege.map((b) => ({ slug: b.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/aktuelles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = findeBeitrag(slug);
  return b ? { title: b.title, description: b.excerpt || undefined } : {};
}

export default async function BeitragSeite({ params }: PageProps<"/aktuelles/[slug]">) {
  const { slug } = await params;
  const b = findeBeitrag(slug);
  if (!b) notFound();

  return (
    <article className="wide" style={{ paddingBlock: "var(--space-6)" }}>
      <p className="small">
        <Link href="/aktuelles">Aktuelles</Link>
      </p>
      <header className="measure" style={{ marginBlock: "var(--space-4) var(--space-6)" }}>
        <h1>{b.title}</h1>
        <p className="muted" style={{ marginBlockStart: "var(--space-3)" }}>
          <time dateTime={b.date}>{formatDatum(b.date)}</time>
        </p>
      </header>
      {/* Inhalt aus der Altseite, bereinigt durch altseite/beitraege-uebernehmen.py */}
      <div className="prose" dangerouslySetInnerHTML={{ __html: b.html }} />
    </article>
  );
}
