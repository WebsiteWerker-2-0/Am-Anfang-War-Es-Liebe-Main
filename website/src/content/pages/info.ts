import type { PageData } from "../model";
import { exhibitionBooking, exhibitionPanels, tel } from "./helpers";

export const info: PageData = {
  slug: "infos",
  title: "Infos und Broschüren",
  description: "Broschüre, Flyer und weiterführende Informationen zu Gewalt gegen Frauen und Kinder.",
  intro: "Die Broschüre des Arbeitskreises, Flyer zum Herunterladen und weiterführende Informationen.",
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
    {
      blockType: "documentList",
      anchor: "downloads",
      heading: "Broschüren und Flyer zum Herunterladen",
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
          title: "Flyer der Frauenberatungsstelle der AWO",
          file: "/downloads/flyer-frauenberatungsstelle-2026.pdf",
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
          title: "Das Rad der Gewalt: Gewalt ist keine Privatsache",
          file: "/downloads/rad-der-gewalt.pdf",
          meta: "PDF, 0,5 MB · Deutsch · Stand: 2026",
        },
        {
          title: "Die Gewaltspirale bei häuslicher Gewalt",
          file: "/downloads/gewaltspirale.pdf",
          meta: "PDF, 0,5 MB · Deutsch · Stand: 2026",
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
      blockType: "topicLinks",
      anchor: "links",
      heading: "Weiterführende Informationen",
      topics: [
        {
          title: "Für Frauen und Erwachsene, etwa zu den Formen von Gewalt",
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
          title: "Bei digitaler Gewalt",
          links: [
            { url: "https://sicher-gegen-digitale-gewalt.org", label: "sicher-gegen-digitale-gewalt.org" },
            { url: "https://www.buendnis-gegen-cybermobbing.de", label: "buendnis-gegen-cybermobbing.de" },
          ],
        },
      ],
    },
    {
      blockType: "exhibition",
      anchor: "wanderausstellung",
      heading: "Unsere Wanderausstellung",
      intro:
        "„Am Anfang war es Liebe … Wege aus der körperlichen und seelischen Gewalt“ ist seit 2022 im ganzen Kreis Höxter unterwegs, in Rathäusern, Banken und Gesundheitszentren.",
      panels: exhibitionPanels,
      note: exhibitionBooking,
    },
  ],
};
