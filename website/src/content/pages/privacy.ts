import type { PageData } from "../model";

// OFFEN: Datenschutzerklärung für Produktion (Hostinger) erstellen
export const privacy: PageData = {
  slug: "datenschutz",
  title: "Datenschutz",
  layout: "measure-stack",
  blocks: [
    {
      blockType: "callout",
      kind: "notice",
      small: true,
      content: `<p>Entwurf: Die vollständige Datenschutzerklärung wird vor der Veröffentlichung erstellt.</p>`,
    },
    {
      blockType: "section",
      variant: "plain",
      heading: "Das Wichtigste in Kürze",
      items: [
        {
          blockType: "rich",
          content: `<ul><li>Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Werkzeuge.</li><li>Alle Schriften, Bilder und Skripte werden vom eigenen Server geladen, nicht von fremden Diensten.</li><li>Der Selbstcheck läuft nur in Ihrem Browser. Ihre Antworten werden weder gespeichert noch gesendet.</li><li>Nachrichten über das Kontaktformular werden nicht auf der Website gespeichert.</li></ul>`,
        },
      ],
    },
  ],
};
