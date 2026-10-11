import type { Metadata } from "next";
import Image from "next/image";
import poster from "@/assets/campaigns/anonymous-evidence-collection-poster.jpg";
import band from "@/assets/illustrations/band-p12.jpg";
import { PageHeader } from "@/components/PageHeader";
import { PhoneLink } from "@/components/PhoneLink";

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
        {/* Kampagne Anonyme Spurensicherung (F-08), Inhalt nach Flyer und Plakat 2017 vom AG.
            OFFEN: Flyer und Plakat werden laut AG überarbeitet, dann Bild, Text und Download austauschen */}
        <section className="campaign" aria-labelledby="spurensicherung">
          <div className="stack">
            <h2 id="spurensicherung">Sexuelle Gewalt? Lassen Sie Spuren sichern.</h2>
            <p className="lead">Ob Sie eine Anzeige erstatten wollen, können Sie später überlegen.</p>
            <p>
              Im St. Ansgar Krankenhaus in Höxter können Sie Spuren einer Gewalttat rund um die Uhr sichern lassen,
              auf Ihren Wunsch anonym, also ohne die Polizei. Die Untersuchung ist kostenlos und vertraulich. Sie können
              eine Person Ihres Vertrauens mitnehmen.
            </p>
            <ol className="list-steps">
              <li>
                <span>
                  Gehen Sie so schnell wie möglich ins Krankenhaus, am besten innerhalb von 24 Stunden. Wenn Sie
                  K.-o.-Tropfen vermuten, ist Eile besonders wichtig: Sie lassen sich nur etwa 12 Stunden nachweisen.
                </span>
              </li>
              <li>
                <span>
                  Waschen oder duschen Sie sich vorher nicht, auch wenn es schwerfällt. Wechseln Sie Ihre Kleidung
                  möglichst nicht und bringen Sie sie auf jeden Fall mit.
                </span>
              </li>
              <li>
                <span>
                  Melden Sie sich an der Pforte, fragen Sie nach der gynäkologischen Ambulanz und sagen Sie, dass Sie eine
                  anonyme Spurensicherung möchten.
                </span>
              </li>
            </ol>
            <p>
              Die Spuren werden unter einer Chiffrenummer zehn Jahre in der Rechtsmedizin aufbewahrt. Entscheiden Sie
              sich in dieser Zeit für eine Anzeige, kann die Polizei darauf zurückgreifen. Sonst werden sie vernichtet.
            </p>
            <p>
              <strong>Klinikum Weser-Egge, St. Ansgar Krankenhaus Höxter</strong>
              <br />
              Gynäkologische Ambulanz, Brenkhäuser Straße 71, 37671 Höxter
              <br />
              Telefon <PhoneLink number="05271 660" />
            </p>
            <p>
              <a href="/downloads/flyer-lass-spuren-sichern-2017.pdf" download>
                Flyer „Lass Spuren sichern“ herunterladen
              </a>{" "}
              <span className="small muted">(PDF, 2,7 MB)</span>
            </p>
          </div>
          <Image
            src={poster}
            alt="Plakat „Sexuelle Gewalt? Lass Spuren sichern. Jetzt. Tu’s für dich.“: Beine einer Frau, die barfuß nachts über eine Straße geht."
            sizes="(min-width: 64em) 22rem, 100vw"
            className="campaign__poster"
          />
        </section>

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
