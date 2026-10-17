import type { PageData } from "../model";

// OFFEN: Mitgliederliste von der Altseite. Der AG schickt nach dem Treffen am 13.10.2026 die aktuelle Liste in einheitlichem Format
const members = [
  { name: "Anna Lütkefend", role: "Gleichstellungsbeauftragte des Kreises Höxter" },
  { name: "Nadine Nolte", role: "Gleichstellungsbeauftragte der Stadt Höxter" },
  { name: "Karin Apel", role: "Gleichstellungsbeauftragte der Stadt Beverungen" },
  { name: "Frauenberatungsstelle der AWO", role: "Beratungsstelle gegen Gewalt an Frauen, Kreis Höxter" },
  { name: "Frauen- und Kinderschutzhaus im Kreis Höxter", role: "Sozialdienst katholischer Frauen e.V., Warburg" },
  { name: "Isabell Schröder", role: "AWO Migrationsberatung Kreis Höxter" },
  { name: "Mareike Stöver", role: "AWO Beratungsstellen für Schwangerschaft, Partnerschaft und Sexualität" },
  { name: "Daniela Resem und Sandra Pflug", role: "Caritas Beratungszentrum Brakel, Beratung für Eltern, Kinder und Jugendliche" },
  { name: "M. Merschbrock", role: "Caritas Beratungszentrum Brakel, Ehe-, Familien- und Lebensberatung" },
  { name: "Judith Fabeck", role: "Kreispolizeibehörde Höxter, Opferschutzbeauftragte" },
  { name: "Stephanie Werk-Ferber", role: "Kreis Höxter, Abteilung Kinder, Jugend und Familie" },
  { name: "Fachberatung Kinderschutz", role: "Kreis Höxter" },
  { name: "Britta Kukuk", role: "Kreissportbund Höxter e.V." },
  { name: "Christiane Tewes-Assauer", role: "Lebenshilfe Höxter, Werkstätten am Grünen Berg" },
  { name: "Eleonore Horst", role: "Weisser Ring, Außenstelle Höxter" },
  { name: "Ingrid Roland", role: "Ehrenamtliche Mitarbeiterin" },
  { name: "Martina Weskamp-Dittmann", role: "Ehrenamtliche Mitarbeiterin" },
];

export const workingGroup: PageData = {
  slug: "arbeitskreis",
  title: "Gemeinsam gegen Gewalt an Frauen und Kindern",
  metaTitle: "Der Arbeitskreis",
  description: "Seit 1997 setzt sich der Arbeitskreis gegen Gewalt an Frauen und Kindern im Kreis Höxter ein.",
  intro:
    "Gewalt gegen Frauen und Kinder findet überall statt, auch im Kreis Höxter. Sie betrifft Personen aller kulturellen und sozialen Hintergründe.",
  band: "workingGroup",
  layout: "stack-lg",
  blocks: [
    // Text vom AG, Lieferung 11.10.2026 (Z-01)
    {
      blockType: "section",
      variant: "stack",
      ariaLabel: "Über den Arbeitskreis",
      items: [
        {
          blockType: "rich",
          content: `<p>Die Gewalt findet häufig im Verborgenen statt. Viel zu häufig bleibt sie unsichtbar. Genau hier setzt der Arbeitskreis „Gegen Gewalt an Frauen und Kindern im Kreis Höxter“ an.</p>
<p>Auf Initiative des Frauen- und Kinderschutzhauses wurde der Arbeitskreis im Juni 1997 gegründet. Seitdem arbeiten Expertinnen aus unterschiedlichen Einrichtungen und Institutionen gemeinsam daran, Gewalt sichtbar zu machen, Ursachen zu diskutieren und Veränderungen anzustoßen.</p>
<p>Der Arbeitskreis beschäftigt sich mit unterschiedlichen Formen von Gewalt gegen Frauen und Kinder und nimmt dabei auch die gesellschaftlichen Aspekte der strukturellen Gewalt gegen Frauen in den Blick. Gemeinsam werden aktuelle Entwicklungen diskutiert, Erfahrungen ausgetauscht und konkrete Aktionen und Veranstaltungen auf den Weg gebracht.</p>`,
        },
      ],
    },
    // OFFEN: Bildunterschrift mit Namen nur, wenn der AG sie liefert und alle Abgebildeten einverstanden sind (Z-08)
    {
      blockType: "photo",
      image: { asset: "photos/working-group" },
      alt: "Gruppenfoto: rund zwanzig Frauen aus dem Arbeitskreis stehen auf einer Treppe vor einem Fachwerkhaus.",
      caption: "Der Arbeitskreis „Gegen Gewalt an Frauen und Kindern im Kreis Höxter“",
    },
    {
      blockType: "section",
      variant: "stack",
      anchor: "ziele",
      heading: "Was wir tun",
      items: [
        {
          blockType: "rich",
          content: `<p>Die Vertreterinnen des Arbeitskreises kommen regelmäßig zusammen, um:</p>
<ul><li>die verschiedenen Formen und Anzeichen von Gewalt gegen Frauen und Kinder im Kreis Höxter ernst zu nehmen und sichtbar zu machen</li><li>die Öffentlichkeit zu diversen Aspekten der Gewalt gegen Frauen und Kinder zu informieren und zu sensibilisieren</li><li>betroffene Frauen und Kinder zu unterstützen</li><li>Prävention zu stärken, beispielsweise durch Fachtage und andere Veranstaltungen</li><li>Beratungs- und Informationsdefizite im Kreis Höxter aufzudecken und deren Abbau zu unterstützen</li><li>notwendige politische Änderungen anzuregen.</li></ul>`,
        },
      ],
    },
    {
      blockType: "section",
      variant: "stack",
      anchor: "sichtbar",
      heading: "Gemeinsam sichtbar werden",
      items: [
        {
          blockType: "rich",
          content: `<p>Gewalt ist keine Privatsache. Sie geht uns alle an. Deshalb ist Vernetzung ein zentraler Bestandteil unserer Arbeit. Im Arbeitskreis kommen unterschiedliche Fachstellen und Institutionen zusammen, bündeln ihre Erfahrungen und entwickeln gemeinsame Ideen. So entsteht ein Netzwerk, das nicht nur reagiert, sondern auch präventiv arbeitet und neue Impulse setzt.</p>
<p>Ein besonderer Schwerpunkt liegt auf der Öffentlichkeitsarbeit: Wir wollen Wissen vermitteln, Aufmerksamkeit für dieses wichtige Thema schaffen und dazu beitragen, dass Betroffene Unterstützung finden, ohne Angst, Scham oder Vorurteile.</p>`,
        },
      ],
    },
    {
      blockType: "section",
      variant: "stack",
      anchor: "austausch",
      heading: "Im Austausch bleiben",
      items: [
        {
          blockType: "rich",
          content: `<p>Der Arbeitskreis trifft sich regelmäßig alle zwei Monate. Wir planen Veranstaltungen und Aktionen, besprechen aber auch aktuelle Probleme, fachliche Fragen oder akute Notfälle.</p>
<p>Der Arbeitskreis arbeitet aus der Perspektive der betroffenen Frauen und richtet seinen Blick deshalb besonders auf die Belange und Lebensrealitäten von Frauen und Mädchen.</p>`,
        },
        {
          blockType: "lead",
          text: "Seit 1997 gilt dabei: Wir schauen hin, wir vernetzen uns und setzen uns gemeinsam dafür ein, Gewalt gegen Frauen und Kinder im Kreis Höxter in all ihren Formen entgegenzuwirken.",
        },
      ],
    },
    { blockType: "peopleList", anchor: "mitglieder", heading: "Wer im Arbeitskreis mitarbeitet", people: members },
  ],
};
