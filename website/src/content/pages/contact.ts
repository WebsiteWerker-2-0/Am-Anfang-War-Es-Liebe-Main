import type { PageData } from "../model";
import { tel } from "./helpers";

// Anliegen im Kontaktformular und das Postfach, an das die Kontaktanfrage zugestellt wird (F-04),
// Angaben vom AG am 11.10.2026 (Z-09, teilweise).
// OFFEN: Anliegen-Kategorien vom AG bestätigen lassen
export const contact: PageData = {
  slug: "kontakt",
  title: "Kontakt",
  description: "So erreichen Sie den Arbeitskreis gegen Gewalt an Frauen und Kindern im Kreis Höxter.",
  intro:
    "Sie haben eine Frage an den Arbeitskreis oder möchten eine Veranstaltung anfragen? Schreiben Sie uns oder rufen Sie an.",
  layout: "stack-lg",
  blocks: [
    {
      blockType: "callout",
      kind: "emergency",
      content: `<p><strong>Brauchen Sie jetzt Hilfe?</strong> Das Formular ist nicht für Notfälle gedacht. Rufen Sie im Notfall die Polizei unter ${tel("110")} oder das Hilfetelefon unter ${tel("116 016")} an.</p>`,
    },
    {
      blockType: "section",
      variant: "stack",
      anchor: "anschrift",
      heading: "Anschrift",
      items: [
        {
          blockType: "rich",
          content: `<p>Arbeitskreis „Gegen Gewalt an Frauen und Kindern im Kreis Höxter“<br>c/o Gleichstellungsbeauftragte des Kreises Höxter<br>Moltkestraße 12<br>37671 Höxter</p>
<p>Telefon ${tel("05271 9659904")}</p>`,
        },
      ],
    },
    {
      blockType: "section",
      variant: "stack",
      anchor: "e-mail",
      heading: "E-Mail",
      items: [
        {
          blockType: "facts",
          entries: [
            { mailbox: "help", note: "Frauenberatungsstelle der AWO für den Kreis Höxter" },
            { mailbox: "information", note: "Gleichstellungsstelle des Kreises Höxter" },
          ],
        },
      ],
    },
    {
      blockType: "contactForm",
      anchor: "formular",
      heading: "Nachricht schreiben",
      concerns: [
        { label: "Ich brauche Hilfe für mich", mailbox: "help" },
        { label: "Ich mache mir Sorgen um eine andere Person", mailbox: "help" },
        { label: "Ich habe eine Frage an den Arbeitskreis", mailbox: "information" },
        { label: "Etwas anderes", mailbox: "information" },
      ],
    },
  ],
};
