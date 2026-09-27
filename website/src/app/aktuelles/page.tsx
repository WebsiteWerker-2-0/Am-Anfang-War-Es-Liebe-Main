import type { Metadata } from "next";
import Link from "next/link";
import band from "@/assets/illustrationen/band-15.jpg";
import { Seitenkopf } from "@/components/Seitenkopf";
import { beitraege, datumTeile } from "@/content/beitraege";

export const metadata: Metadata = {
  title: "Aktuelles",
  description: "Aktionen, Ausstellungen und Meldungen des Arbeitskreises gegen Gewalt an Frauen und Kindern im Kreis Höxter.",
};

export default function AktuellesSeite() {
  return (
    <>
      <Seitenkopf
        titel="Aktuelles"
        band={band}
        einleitung="Aktionen, Ausstellungen und Meldungen des Arbeitskreises."
      />
      <div className="wide">
        <ul className="meldungen">
          {beitraege.map((b) => {
            const d = datumTeile(b.date);
            return (
              <li key={b.slug}>
                <time className="datum" dateTime={b.date}>
                  <span className="datum__tag">{d.tag}</span>
                  <span className="datum__monat">{d.monat}</span>
                  <span className="datum__jahr">{d.jahr}</span>
                </time>
                <div>
                  <h2>
                    <Link href={`/aktuelles/${b.slug}`}>{b.title}</Link>
                  </h2>
                  {b.excerpt && <p className="muted measure">{b.excerpt}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
