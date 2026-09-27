import type { Metadata } from "next";
import band from "@/assets/illustrationen/band-12.jpg";
import { Seitenkopf } from "@/components/Seitenkopf";

export const metadata: Metadata = {
  title: "Infos und Downloads",
  description: "Broschüre, Flyer und weiterführende Informationen zu Gewalt gegen Frauen und Kinder.",
};

// Mediathek-Liste nach Abschnitt 6.8: Titel, Dateityp, Größe, Sprache, Stand
const dokumente = [
  {
    titel: "Broschüre „Am Anfang war es Liebe … Wege aus der körperlichen und seelischen häuslichen Gewalt“",
    datei: "/downloads/broschuere-am-anfang-war-es-liebe-2016.pdf",
    groesse: "2,1 MB",
    stand: "August 2016",
  },
  {
    titel: "Flyer „Lass Spuren sichern“: anonyme Spurensicherung im Kreis Höxter",
    datei: "/downloads/flyer-lass-spuren-sichern-2017.pdf",
    groesse: "2,7 MB",
    stand: "2017",
  },
  {
    titel: "Flyer des Weissen Rings zu K.-o.-Tropfen",
    datei: "/downloads/flyer-ko-tropfen-weisser-ring.pdf",
    groesse: "0,3 MB",
    stand: "ohne Datum",
  },
  {
    titel: "Plakat zur Wanderausstellung „Am Anfang war es Liebe …“",
    datei: "/downloads/plakat-ausstellung-2022.pdf",
    groesse: "1,5 MB",
    stand: "November 2022",
  },
];

const links = [
  {
    titel: "Informationen in vielen Sprachen",
    eintraege: [{ url: "https://www.gewaltschutz.info", label: "gewaltschutz.info" }],
  },
  {
    titel: "Gewalt im Internet",
    eintraege: [
      { url: "https://www.buendnis-gegen-cybermobbing.de", label: "buendnis-gegen-cybermobbing.de" },
      { url: "https://www.klicksafe.de", label: "klicksafe.de" },
    ],
  },
  {
    titel: "Für Kinder und Jugendliche",
    eintraege: [
      { url: "http://gewalt-ist-nie-okay.de", label: "gewalt-ist-nie-okay.de" },
      { url: "https://www.trau-dich.de", label: "trau-dich.de" },
    ],
  },
];

export default function InfosSeite() {
  return (
    <>
      <Seitenkopf
        titel="Infos und Downloads"
        band={band}
        einleitung="Die Broschüre des Arbeitskreises, Flyer zum Mitnehmen und weiterführende Informationen."
      />
      <div className="wide stack-lg">
        <section aria-labelledby="downloads">
          <h2 id="downloads" style={{ marginBlockEnd: "var(--space-4)" }}>
            Zum Herunterladen
          </h2>
          <ul className="dokumente">
            {dokumente.map((d) => (
              <li key={d.datei}>
                <a href={d.datei} download>
                  {d.titel}
                </a>
                <span className="small muted">
                  PDF, {d.groesse} · Deutsch · Stand: {d.stand}
                </span>
              </li>
            ))}
          </ul>
          <p className="small muted measure" style={{ marginBlockStart: "var(--space-4)" }}>
            Die Broschüre stammt von 2016. Einige Angaben, etwa Telefonnummern und Öffnungszeiten, haben sich
            inzwischen geändert. Aktuelle Kontakte finden Sie unter <a href="/hilfe">Hilfe</a>.
          </p>
        </section>

        <section aria-labelledby="links">
          <h2 id="links" style={{ marginBlockEnd: "var(--space-4)" }}>
            Weiterführende Informationen
          </h2>
          <ul className="dokumente">
            {links.map((l) => (
              <li key={l.titel}>
                <span>{l.titel}</span>
                <span>
                  {l.eintraege.map((e, i) => (
                    <span key={e.url}>
                      {i > 0 && " · "}
                      <a href={e.url} rel="noreferrer">
                        {e.label}
                      </a>
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
