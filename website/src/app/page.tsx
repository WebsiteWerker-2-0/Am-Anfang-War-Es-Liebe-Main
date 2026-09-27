import Image from "next/image";
import Link from "next/link";
import zuversicht from "@/assets/illustrationen/zuversicht.jpg";
import gedanken from "@/assets/illustrationen/gedanken.jpg";
import { Ausstellung } from "@/components/Ausstellung";
import { Telefon } from "@/components/Telefon";
import { tafeln } from "@/content/ausstellung";
import { beitraege, datumTeile } from "@/content/beitraege";

// OFFEN: Formulierungen auf Basis der Broschüre, Textfreigabe durch den AG (Z-01)
const wege = [
  {
    satz: "Sie in Ihrer Beziehung verletzt, bedroht oder kontrolliert werden",
    ziel: "Selbstcheck und Hilfe",
    href: "/selbstcheck",
  },
  {
    satz: "Sie von Ihrem Ex-Partner verfolgt oder belästigt werden",
    ziel: "Anlaufstellen und Ihre Rechte",
    href: "/hilfe",
  },
  {
    satz: "Sie jemanden kennen, der Gewalt erlebt",
    ziel: "Hilfe für Angehörige und Freunde",
    href: "/hilfe#angehoerige",
  },
  {
    satz: "Sie helfen möchten oder sich informieren wollen",
    ziel: "Infos und Arbeitskreis",
    href: "/infos",
  },
];

const sofort = [
  { name: "Polizei im Notfall", hinweis: "Wenn Sie oder Ihre Kinder in Gefahr sind", nummer: "110" },
  {
    name: "Hilfetelefon „Gewalt gegen Frauen“",
    hinweis: "Rund um die Uhr, anonym, kostenlos, in 18 Sprachen",
    nummer: "116 016",
  },
  {
    name: "Frauen- und Kinderschutzhaus im Kreis Höxter",
    hinweis: "Rund um die Uhr erreichbar",
    nummer: "0171 5430155",
  },
  {
    name: "Frauenberatungsstelle der AWO",
    hinweis: "Montag bis Donnerstag 9 bis 17 Uhr, Freitag 9 bis 12:30 Uhr",
    nummer: "0160 93793030",
  },
];

export default function Startseite() {
  const neueste = beitraege.slice(0, 3);

  return (
    <>
      <section className="einstieg wide" aria-labelledby="einstieg-titel">
        <div>
          <h1 id="einstieg-titel" className="einstieg__titel">
            Sie sind hier, weil …
          </h1>
          <ul className="wege">
            {wege.map((w) => (
              <li key={w.href}>
                <Link href={w.href}>
                  <span className="wege__satz">{w.satz}</span>
                  <span className="wege__ziel">{w.ziel}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="einstieg__bild">
          <Image src={zuversicht} alt="" priority sizes="(min-width: 64em) 40vw, 100vw" />
        </div>
      </section>

      <div className="wide">
        <ul className="zusagen">
          <li>
            <strong>Vertraulich</strong>
            <span>Die Beraterinnen haben Schweigepflicht.</span>
          </li>
          <li>
            <strong>Kostenlos</strong>
            <span>Beratung und Schutz kosten Sie nichts.</span>
          </li>
          <li>
            <strong>Sie entscheiden</strong>
            <span>Niemand drängt Sie zu einem Schritt, den Sie nicht wollen.</span>
          </li>
        </ul>
      </div>

      <section className="abschnitt wide" aria-labelledby="sofort-titel">
        <div className="abschnitt__kopf">
          <h2 id="sofort-titel">Hier bekommen Sie sofort Hilfe</h2>
          <Link href="/hilfe" className="textlink">
            Alle Anlaufstellen im Kreis Höxter
          </Link>
        </div>
        <ul className="stellen-kurz">
          {sofort.map((s) => (
            <li key={s.nummer}>
              <span className="stellen-kurz__name">{s.name}</span>
              <span className="muted">{s.hinweis}</span>
              <Telefon nummer={s.nummer} className="stellen-kurz__nummer" />
            </li>
          ))}
        </ul>
      </section>

      <section className="band" aria-labelledby="selbstcheck-titel">
        <div className="band__inner wide">
          <div className="band__text stack">
            <h2 id="selbstcheck-titel">Gewalt hat viele Gesichter</h2>
            <p className="lead measure">
              Nicht jede Gewalt hinterlässt blaue Flecken. Kontrolle, Drohungen und Demütigungen gehören genauso dazu.
              Der Selbstcheck hilft Ihnen, Ihre Situation in Ruhe für sich zu hinterfragen.
            </p>
            <p className="hinweis-privat">
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <rect x="4" y="9" width="12" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M7 9V6.5a3 3 0 0 1 6 0V9" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              Ihr Selbstcheck wird nicht gespeichert.
            </p>
            <p>
              <Link href="/selbstcheck" className="button">
                Zum Selbstcheck
              </Link>
            </p>
          </div>
          <div className="band__bild">
            <Image src={gedanken} alt="" sizes="(min-width: 64em) 50vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="abschnitt wide" aria-labelledby="ausstellung-titel">
        <div className="abschnitt__kopf">
          <h2 id="ausstellung-titel">Die Wanderausstellung</h2>
        </div>
        <p className="lead measure" style={{ marginBlockEnd: "var(--space-5)" }}>
          „Am Anfang war es Liebe … Wege aus der körperlichen und seelischen Gewalt“ ist seit 2022 im ganzen Kreis
          Höxter unterwegs, in Rathäusern, Banken und Gesundheitszentren. Hier sehen Sie alle zwölf Tafeln.
        </p>
        <Ausstellung tafeln={tafeln} />
      </section>

      <section className="abschnitt wide" aria-labelledby="aktuelles-titel">
        <div className="abschnitt__kopf">
          <h2 id="aktuelles-titel">Aktuelles</h2>
          <Link href="/aktuelles" className="textlink">
            Alle Meldungen
          </Link>
        </div>
        <ul className="meldungen">
          {neueste.map((b) => {
            const d = datumTeile(b.date);
            return (
              <li key={b.slug}>
                <time className="datum" dateTime={b.date}>
                  <span className="datum__tag">{d.tag}</span>
                  <span className="datum__monat">{d.monat}</span>
                  <span className="datum__jahr">{d.jahr}</span>
                </time>
                <div>
                  <h3>
                    <Link href={`/aktuelles/${b.slug}`}>{b.title}</Link>
                  </h3>
                  {b.excerpt && <p className="muted measure">{b.excerpt}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
