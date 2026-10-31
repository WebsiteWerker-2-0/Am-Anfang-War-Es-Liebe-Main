import type { PageData } from "../model";
import { exhibitionBooking, exhibitionPanels, tel } from "./helpers";

// Infos: Navigationsseite mit vier Wegweisern, jeder Bereich hat eine eigene Seite unter /infos/…
// (Wunsch Frauenberatungsstelle 21.10.2026, Entscheidung Steffen 31.10.2026). Die Unterpunkte im Menü
// (content/site.ts) und die Wegweiser kommen beide aus `infoSections`.

export const infoSections = [
  {
    slug: "infos/spurensicherung",
    label: "Vertrauliche Spurensicherung im Kreis Höxter",
    menuLabel: "Vertrauliche Spurensicherung",
    note: "Nach sexueller Gewalt Spuren sichern lassen, auch ohne Anzeige",
  },
  {
    slug: "infos/broschueren-und-flyer",
    label: "Broschüren und Flyer zum Download",
    menuLabel: "Broschüren und Flyer",
    note: "Broschüre des Arbeitskreises, Flyer, Rad der Gewalt und Gewaltspirale",
  },
  {
    slug: "infos/weiterfuehrende-informationen",
    label: "Weiterführende Informationen",
    menuLabel: "Weiterführende Informationen",
    note: "Für Erwachsene, für Kinder und Jugendliche, zu digitaler Gewalt",
  },
  {
    slug: "infos/wanderausstellung",
    label: "Unsere Wanderausstellung",
    menuLabel: "Unsere Wanderausstellung",
    note: "Alle zwölf Tafeln ansehen und die Ausstellung buchen",
  },
] as const;

export const info: PageData = {
  slug: "infos",
  title: "Infos und Broschüren",
  description: "Broschüre, Flyer und weiterführende Informationen zu Gewalt gegen Frauen und Kinder.",
  intro: "Die Broschüre des Arbeitskreises, Flyer zum Herunterladen und weiterführende Informationen.",
  band: "info",
  layout: "stack-lg",
  blocks: [
    // Navigationsseite (Entscheidung Steffen 31.10.2026): jeder Wegweiser führt auf eine eigene Seite unter /infos/…
    {
      blockType: "linkHub",
      ariaLabel: "Bereiche der Infos",
      items: infoSections.map((section) => ({ label: section.label, note: section.note, href: `/${section.slug}` })),
    },
  ],
};

export const evidenceCollection: PageData = {
  slug: "infos/spurensicherung",
  title: "Vertrauliche Spurensicherung im Kreis Höxter",
  description: "Nach sexueller Gewalt Spuren sichern lassen, anonym und kostenlos, im St. Ansgar Krankenhaus Höxter.",
  intro: "Nach sexueller Gewalt können Sie Spuren sichern lassen, auch ohne Anzeige.",
  band: "info",
  layout: "stack-lg",
  blocks: [
    // Kampagne Anonyme Spurensicherung (F-08), Inhalt nach Flyer und Plakat 2017 vom AG.
    // OFFEN: Flyer und Plakat werden laut AG überarbeitet, dann Bild, Text und Download austauschen
    {
      blockType: "campaign",
      anchor: "spurensicherung",
      heading: "Sexuelle Gewalt? Lassen Sie Spuren sichern.",
      lead: "Ob Sie eine Anzeige erstatten wollen, können Sie später überlegen.",
      body: `<p>Im St. Ansgar Krankenhaus in Höxter können Sie Spuren einer Gewalttat rund um die Uhr sichern lassen, auf Ihren Wunsch anonym, also ohne die Polizei. Die Untersuchung ist kostenlos und vertraulich. Sie können eine Person Ihres Vertrauens mitnehmen.</p>
<ol><li>Gehen Sie so schnell wie möglich ins Krankenhaus, am besten innerhalb von 24 Stunden. Wenn Sie K.-o.-Tropfen vermuten, ist Eile besonders wichtig: Sie lassen sich nur etwa 12 Stunden nachweisen.</li><li>Waschen oder duschen Sie sich vorher nicht, auch wenn es schwerfällt. Wechseln Sie Ihre Kleidung möglichst nicht und bringen Sie sie auf jeden Fall mit.</li><li>Melden Sie sich an der Pforte, fragen Sie nach der gynäkologischen Ambulanz und sagen Sie, dass Sie eine anonyme Spurensicherung möchten.</li></ol>
<p>Die Spuren werden unter einer Chiffrenummer zehn Jahre in der Rechtsmedizin aufbewahrt. Entscheiden Sie sich in dieser Zeit für eine Anzeige, kann die Polizei darauf zurückgreifen. Sonst werden sie vernichtet.</p>
<p><strong>Klinikum Weser-Egge, St. Ansgar Krankenhaus Höxter</strong><br>Gynäkologische Ambulanz, Brenkhäuser Straße 71, 37671 Höxter<br>Telefon ${tel("05271 660")}</p>`,
      download: {
        label: "Flyer „Lass Spuren sichern“ herunterladen",
        file: "/downloads/flyer-lass-spuren-sichern-2017.pdf",
        meta: "(PDF, 2,7 MB)",
      },
      poster: { asset: "campaigns/anonymous-evidence-collection-poster" },
      posterAlt:
        "Plakat „Sexuelle Gewalt? Lass Spuren sichern. Jetzt. Tu’s für dich.“: Beine einer Frau, die barfuß nachts über eine Straße geht.",
    },
  ],
};

export const brochures: PageData = {
  slug: "infos/broschueren-und-flyer",
  title: "Broschüren und Flyer zum Download",
  description: "Broschüre des Arbeitskreises, Flyer der Beratungsstellen, Rad der Gewalt und Gewaltspirale zum Herunterladen.",
  intro: "Die Broschüre des Arbeitskreises, Flyer und Grafiken zum Herunterladen.",
  band: "info",
  layout: "stack-lg",
  blocks: [
    {
      blockType: "documentList",
      anchor: "downloads",
      heading: "Broschüren und Flyer",
      // Dokumente nach Abschnitt 6.8: Titel, Dateityp, Größe, Sprache, Stand
      items: [
        {
          title: "Broschüre „Am Anfang war es Liebe … Wege aus der körperlichen und seelischen häuslichen Gewalt“",
          file: "/downloads/broschuere-am-anfang-war-es-liebe-2016.pdf",
          meta: "PDF, 2,1 MB · Deutsch · Stand: August 2016",
        },
        {
          title: "Flyer „Lass Spuren sichern“: anonyme Spurensicherung im Kreis Höxter",
          file: "/downloads/flyer-lass-spuren-sichern-2017.pdf",
          meta: "PDF, 2,7 MB · Deutsch · Stand: 2017",
        },
        {
          title: "Flyer der Frauenberatungsstelle der AWO für den Kreis Höxter „Neue Wege ohne Gewalt“",
          file: "/downloads/flyer-frauenberatungsstelle-awo-2026.pdf",
          meta: "PDF, 1,2 MB · Deutsch · Stand: 2026",
        },
        {
          title: "Flyer des Frauen- und Kinderschutzhauses im Kreis Höxter",
          file: "/downloads/flyer-frauenhaus.pdf",
          meta: "PDF, 0,8 MB · Deutsch · Stand: ohne Datum",
        },
        {
          title: "Flyer „Sicher feiern“: Tipps für dich und deine Freund*innen",
          file: "/downloads/flyer-sicher-feiern.pdf",
          meta: "PDF, 1,3 MB · Deutsch · Stand: 2026",
        },
        {
          title: "Flyer des Weissen Rings zu K.-o.-Tropfen",
          file: "/downloads/flyer-ko-tropfen-weisser-ring.pdf",
          meta: "PDF, 0,3 MB · Deutsch · Stand: ohne Datum",
        },
        {
          title: "Plakat zur Wanderausstellung „Am Anfang war es Liebe …“",
          file: "/downloads/plakat-ausstellung-2022.pdf",
          meta: "PDF, 1,5 MB · Deutsch · Stand: November 2022",
        },
      ],
    },
    {
      // Grafiken der Frauenberatungsstelle (Mail vom 21.10.2026), gefördert vom Land NRW
      blockType: "graphics",
      anchor: "grafiken",
      heading: "Rad der Gewalt und Gewaltspirale",
      items: [
        {
          image: { asset: "infos/rad-der-gewalt" },
          alt: "Rad der Gewalt: In der Mitte „Macht und Kontrolle“, darum die Formen von Gewalt mit Beispielen: körperliche, psychische, sexualisierte, digitale, soziale und finanzielle Gewalt, Instrumentalisierung der Kinder und Abschieben der Verantwortung.",
          title: "Das Rad der Gewalt: Gewalt ist keine Privatsache",
          file: "/downloads/rad-der-gewalt.pdf",
          meta: "PDF, 0,5 MB · Stand: 2026",
        },
        {
          image: { asset: "infos/gewaltspirale" },
          alt: "Gewaltspirale bei häuslicher Gewalt: fünf Phasen, die sich wiederholen: Spannungsaufbau, akute Gewalt, Reue und Entschuldigung, Versöhnung, Entspannungsphase.",
          title: "Die Gewaltspirale bei häuslicher Gewalt",
          file: "/downloads/gewaltspirale.pdf",
          meta: "PDF, 0,5 MB · Stand: 2026",
        },
      ],
    },
  ],
};

export const furtherInformation: PageData = {
  slug: "infos/weiterfuehrende-informationen",
  title: "Weiterführende Informationen",
  description: "Internetseiten zu Gewalt gegen Frauen und Kinder: für Erwachsene, für Kinder und Jugendliche, zu digitaler Gewalt.",
  intro: "Ausgewählte Internetseiten für Erwachsene, für Kinder und Jugendliche und zu digitaler Gewalt.",
  band: "info",
  layout: "stack-lg",
  blocks: [
    {
      blockType: "topicLinks",
      anchor: "links",
      heading: "Empfohlene Internetseiten",
      // Links nach Vorschlag der Frauenberatungsstelle (21.10.2026); gewaltschutz.info entfernt (veraltet)
      topics: [
        {
          title: "Für Erwachsene, z. B. ausführliche Infos zu den verschiedenen Gewaltformen",
          links: [
            { url: "https://frauen-info-netz.de", label: "frauen-info-netz.de" },
            { url: "https://www.frauen-gegen-gewalt.de", label: "frauen-gegen-gewalt.de" },
            { url: "https://www.frauenhauskoordinierung.de", label: "frauenhauskoordinierung.de" },
            { url: "https://www.big-berlin.info", label: "big-berlin.info" },
          ],
        },
        {
          title: "Für Kinder und Jugendliche",
          links: [
            { url: "https://www.klicksafe.de", label: "klicksafe.de" },
            { url: "https://www.trau-dich.de", label: "trau-dich.de" },
            { url: "https://www.juuuport.de", label: "juuuport.de" },
          ],
        },
        {
          title: "Digitale Gewalt",
          links: [
            { url: "https://sicher-gegen-digitale-gewalt.org", label: "sicher-gegen-digitale-gewalt.org" },
            { url: "https://buendnis-gegen-cybermobbing.de", label: "buendnis-gegen-cybermobbing.de" },
          ],
        },
      ],
    },
  ],
};

export const exhibitionPage: PageData = {
  slug: "infos/wanderausstellung",
  title: "Unsere Wanderausstellung",
  description: "Die Wanderausstellung „Am Anfang war es Liebe …“ des Arbeitskreises: alle zwölf Tafeln und Buchung.",
  intro: "Die Ausstellung des Arbeitskreises zeigt Wege aus der körperlichen und seelischen Gewalt.",
  band: "info",
  layout: "stack-lg",
  blocks: [
    {
      blockType: "exhibition",
      anchor: "wanderausstellung",
      heading: "Die zwölf Tafeln",
      intro:
        "„Am Anfang war es Liebe … Wege aus der körperlichen und seelischen Gewalt“ ist seit 2022 im ganzen Kreis Höxter unterwegs, in Rathäusern, Banken und Gesundheitszentren. Hier sehen Sie alle zwölf Tafeln.",
      panels: exhibitionPanels,
      booking: exhibitionBooking,
    },
  ],
};
