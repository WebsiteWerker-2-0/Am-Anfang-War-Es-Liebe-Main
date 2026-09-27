import type { Metadata } from "next";
import band from "@/assets/illustrations/band-p12.jpg";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Infos und Dokumente",
  description: "Broschüre, Flyer und weiterführende Informationen zu Gewalt gegen Frauen und Kinder.",
};

// Dokumente nach Abschnitt 6.8: Titel, Dateityp, Größe, Sprache, Stand
const documents = [
  {
    title: "Broschüre „Am Anfang war es Liebe … Wege aus der körperlichen und seelischen häuslichen Gewalt“",
    file: "/downloads/broschuere-am-anfang-war-es-liebe-2016.pdf",
    size: "2,1 MB",
    asOf: "August 2016",
  },
  {
    title: "Flyer „Lass Spuren sichern“: anonyme Spurensicherung im Kreis Höxter",
    file: "/downloads/flyer-lass-spuren-sichern-2017.pdf",
    size: "2,7 MB",
    asOf: "2017",
  },
  {
    title: "Flyer des Weissen Rings zu K.-o.-Tropfen",
    file: "/downloads/flyer-ko-tropfen-weisser-ring.pdf",
    size: "0,3 MB",
    asOf: "ohne Datum",
  },
  {
    title: "Plakat zur Wanderausstellung „Am Anfang war es Liebe …“",
    file: "/downloads/plakat-ausstellung-2022.pdf",
    size: "1,5 MB",
    asOf: "November 2022",
  },
];

const furtherReading = [
  {
    title: "Informationen in vielen Sprachen",
    links: [{ url: "https://www.gewaltschutz.info", label: "gewaltschutz.info" }],
  },
  {
    title: "Gewalt im Internet",
    links: [
      { url: "https://www.buendnis-gegen-cybermobbing.de", label: "buendnis-gegen-cybermobbing.de" },
      { url: "https://www.klicksafe.de", label: "klicksafe.de" },
    ],
  },
  {
    title: "Für Kinder und Jugendliche",
    links: [
      { url: "http://gewalt-ist-nie-okay.de", label: "gewalt-ist-nie-okay.de" },
      { url: "https://www.trau-dich.de", label: "trau-dich.de" },
    ],
  },
];

export default function InfoPage() {
  return (
    <>
      <PageHeader
        title="Infos und Dokumente"
        band={band}
        intro="Die Broschüre des Arbeitskreises, Flyer zum Mitnehmen und weiterführende Informationen."
      />
      <div className="wide stack-lg">
        <section aria-labelledby="downloads">
          <h2 id="downloads" style={{ marginBlockEnd: "var(--space-4)" }}>
            Zum Herunterladen
          </h2>
          <ul className="documents">
            {documents.map((doc) => (
              <li key={doc.file}>
                <a href={doc.file} download>
                  {doc.title}
                </a>
                <span className="small muted">
                  PDF, {doc.size} · Deutsch · Stand: {doc.asOf}
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
          <ul className="documents">
            {furtherReading.map((topic) => (
              <li key={topic.title}>
                <span>{topic.title}</span>
                <span>
                  {topic.links.map((link, index) => (
                    <span key={link.url}>
                      {index > 0 && " · "}
                      <a href={link.url} rel="noreferrer">
                        {link.label}
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
