import type { PageData } from "../model";

export const help: PageData = {
  slug: "hilfe",
  title: "Hilfe im Kreis Höxter",
  description: "Anlaufstellen bei häuslicher Gewalt im Kreis Höxter: Beratung, Schutzhaus, Polizei und Hilfetelefon.",
  intro:
    "Frauen und Kinder, die Gewalt erleben oder erlebt haben, können sich an diese Stellen wenden. Das gilt auch für alle, die Betroffenen helfen möchten.",
  band: "help",
  layout: "stack-lg",
  blocks: [
    {
      blockType: "callout",
      kind: "emergency",
      content: `<p><strong>Sind Sie oder Ihre Kinder jetzt in Gefahr?</strong> Rufen Sie die Polizei.</p>`,
      number: "110",
    },
    {
      blockType: "linkHub",
      ariaLabel: "Bereiche dieser Seite",
      items: [
        { label: "Hier bekommen Sie Hilfe", note: "Hilfetelefon, Frauenberatungsstelle, Schutzhaus, Polizei", href: "#anlaufstellen" },
        { label: "Was Sie jetzt tun können", note: "Spuren sichern, erste Schritte, Stalking", href: "#was-tun" },
        { label: "Wenn Sie helfen möchten", note: "Für Nachbar*innen, Angehörige und Freund*innen", href: "#helfen" },
        { label: "Weitere Anlaufstellen", note: "Familie, Kreis und Städte, junge Frauen, Telefon und online", href: "#weitere" },
      ],
    },
    { blockType: "chapter", anchor: "anlaufstellen", heading: "Hier bekommen Sie Hilfe", blocks: [{ blockType: "supportServices" }] },
    {
      blockType: "chapter",
      anchor: "was-tun",
      heading: "Was Sie jetzt tun können",
      blocks: [
        {
          blockType: "section",
          variant: "service",
          anchor: "spurensicherung",
          collapsible: "open",
          heading: "Was sollen Sie nach einer Sexualstraftat tun, um Beweise zu sichern?",
          items: [
            {
              blockType: "rich",
              content: `<p>Im St. Ansgar Krankenhaus in Höxter können Frauen und Mädchen die Spuren einer Tat rund um die Uhr sichern lassen, auch ohne Anzeige und auf Wunsch anonym. Ob Sie Anzeige erstatten, können Sie später in Ruhe entscheiden. Die Untersuchung ist vertraulich und kostenlos.</p>
    <ol><li><strong>Nicht waschen oder duschen</strong>, auch wenn es schwerfällt. Sonst gehen Spuren verloren.</li><li><strong>Kleidung trocken aufbewahren</strong>, am besten in einer Papiertüte, und mitbringen.</li><li><strong>So schnell wie möglich ins Krankenhaus</strong>, am besten innerhalb von 24 Stunden. Bei Verdacht auf K.-o.-Tropfen ist der Nachweis nur etwa 12 Stunden möglich. Melden Sie sich an der Pforte und fragen Sie nach der gynäkologischen Ambulanz.</li></ol>`,
            },
            {
              blockType: "facts",
              entries: [
                { term: "Untersuchungsstelle", value: "Klinikum Weser-Egge, St. Ansgar Krankenhaus Höxter, Gynäkologische Ambulanz" },
                { term: "Adresse", value: "Brenkhäuser Straße 71, 37671 Höxter" },
                { term: "Telefon", phone: "05271 660" },
              ],
            },
            {
              blockType: "rich",
              content: `<p>Die gesicherten Spuren werden unter einer Chiffrenummer in der Rechtsmedizin aufbewahrt. Die Polizei kann erst darauf zugreifen, wenn Sie selbst Anzeige erstatten.</p>`,
            },
          ],
        },
        {
          blockType: "section",
          variant: "service",
          anchor: "selbst-tun",
          collapsible: "closed",
          heading: "Was können Sie für sich selbst tun?",
          items: [
            {
              blockType: "rich",
              content: `<p>Viele Frauen fühlen sich nach erlebter Gewalt wie gelähmt. Trotzdem können Sie erste Schritte planen, so wie es für Sie sicher ist.</p>
    <ul><li><strong>Sprechen Sie mit einer Vertrauensperson</strong> oder einer Anlaufstelle, zum Beispiel mit Ihrer Ärztin, einer Nachbarin oder der Erzieherin Ihres Kindes.</li><li><strong>Packen Sie einen Notfallkoffer</strong>, wenn das gefahrlos möglich ist: Ausweis, Geburtsurkunde, Bankkarte, Krankenkarte, Impfpass, Verdienstnachweise und was Ihnen wichtig ist. Bewahren Sie ihn an einem sicheren Ort auf, etwa bei einer Vertrauensperson.</li><li><strong>Halten Sie fest, was passiert</strong>: Datum, Uhrzeit, was geschehen ist, Fotos von Verletzungen, ärztliche Atteste. Das hilft später bei Anträgen und Anzeigen.</li></ul>`,
            },
          ],
        },
        {
          blockType: "section",
          variant: "service",
          anchor: "stalking",
          collapsible: "closed",
          heading: "Am Anfang war es Liebe, und am Ende ist es Stalking?",
          items: [
            {
              blockType: "rich",
              content: `<p>Stalking hat mit Liebe nichts zu tun. Es geht um Überwachung und Macht, und es ist eine Straftat. Oft ist es der Ex-Partner, der auflauert, verfolgt, ständig anruft, Nachrichten oder „Liebesbeweise“ schickt.</p>
    <ul><li><strong>Erstatten Sie Anzeige bei der Polizei.</strong> Schnelles und konsequentes Einschreiten zeigt oft Wirkung.</li><li><strong>Beantragen Sie eine Schutzanordnung</strong> nach dem Gewaltschutzgesetz beim Amtsgericht. Die Frauenberatungsstelle unterstützt Sie dabei.</li><li><strong>Sammeln Sie Beweise</strong>: Nachrichten, Anrufliste, Briefe, Zeuginnen und Zeugen.</li></ul>`,
            },
          ],
        },
      ],
    },
    {
      blockType: "chapter",
      anchor: "helfen",
      heading: "Wenn Sie helfen möchten",
      blocks: [
        {
          blockType: "section",
          variant: "service",
          sectionId: "angehoerige",
          headingLevel: 3,
          anchor: "angehoerige-titel",
          heading: "Was können Nachbar*innen, Angehörige und Freund*innen tun?",
          items: [
            {
              blockType: "rich",
              content: `<p>Oft sind es die Nachbarin, die Freundin oder der Kollege, die als Erste etwas bemerken. Ihre Reaktion kann für die betroffene Frau der erste Schritt aus der Gewalt sein.</p>`,
            },
            {
              blockType: "definitions",
              entries: [
                {
                  term: "Sehen Sie hin.",
                  text: "Achten Sie auf Warnzeichen: Verletzungen, die versteckt werden, verändertes Verhalten, Rückzug.",
                },
                {
                  term: "Hören Sie zu.",
                  text: "Machen Sie keine Vorwürfe wie „Warum lässt du dir das gefallen?“. Hören Sie geduldig zu und weisen Sie auf professionelle Hilfe hin.",
                },
                {
                  term: "Bieten Sie Hilfe an.",
                  text: "Schon der Satz „Sprich mich an, wenn ich etwas für dich tun kann“ zeigt, dass die Not gesehen wird. Halten Sie wichtige Nummern bereit.",
                },
                {
                  term: "Holen Sie Hilfe, wenn Sie Gewalt miterleben.",
                  text: "Rufen Sie die Polizei unter 110, ohne sich selbst in Gefahr zu bringen.",
                },
                {
                  term: "Respektieren Sie ihre Entscheidungen.",
                  text: "Nur die betroffene Frau kann entscheiden, welcher Schritt für sie richtig ist. Auch Sie selbst können sich jederzeit kostenlos bei den Anlaufstellen Rat holen.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      blockType: "chapter",
      anchor: "weitere",
      heading: "Weitere Anlaufstellen",
      blocks: [
        {
          blockType: "serviceGroups",
          note: "Stand der Angaben: Übernahme von der bisherigen Website. Alle Nummern und Zeiten werden vor der Veröffentlichung geprüft.",
        },
      ],
    },
  ],
};
