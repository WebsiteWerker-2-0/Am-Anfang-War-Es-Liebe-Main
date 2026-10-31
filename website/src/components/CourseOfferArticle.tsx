import Image from "next/image";
import Link from "next/link";
import type { CourseOfferData } from "@/content/model";
import { Rich } from "@/lib/rich";

// Ein Kurs mit ausführlicher Beschreibung, gemeinsam für die Seite und die Vorschau im Backend.
// Aufbau wie ein Beitrag aus Aktuelles (PostArticle), dazu der Weg zu den Terminen.
export function CourseOfferArticle({ offer }: { offer: CourseOfferData }) {
  return (
    <article className="wide" style={{ paddingBlock: "var(--space-6)" }}>
      <p className="small">
        <Link href="/kurse">Kurse</Link>
      </p>
      <header className="measure" style={{ marginBlock: "var(--space-4) var(--space-6)" }}>
        <h1>{offer.title}</h1>
      </header>
      <div className="prose">
        {offer.image && (
          <figure className="figure figure--center">
            <Image src={offer.image} alt={offer.imageAlt ?? ""} sizes="(min-width: 64em) 40rem, 100vw" />
          </figure>
        )}
        <Rich value={offer.content ?? offer.html ?? null} prose />
      </div>
      <p className="measure" style={{ marginBlockStart: "var(--space-6)" }}>
        <Link className="button" href="/termine">
          Termine und Anmeldung
        </Link>
      </p>
    </article>
  );
}
