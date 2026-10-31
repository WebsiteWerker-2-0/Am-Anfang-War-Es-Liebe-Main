import type { PageData } from "../model";

// Mitgliederliste vom AG, 28.10.2026. Der Arbeitskreis hat sich gegen Namen entschieden, hier stehen nur Einrichtungen.
// Links auf Wunsch der Frauenberatungsstelle (21.10.2026). Telefonnummern stehen auf der Hilfeseite.
const members = [
  { name: "Frauen- und Kinderschutzhaus im Kreis Höxter", role: "Sozialdienst katholischer Frauen e.V.", url: "https://www.skf-warburg.de" },
  { name: "Kreis Höxter", role: "Gleichstellungsbeauftragte", url: "https://www.kreis-hoexter.de" },
  { name: "Kreis Höxter", role: "Fachberatung Kinderschutz", url: "https://www.kreis-hoexter.de" },
  { name: "Kreis Höxter", role: "Abteilung Kinder, Jugend und Familie", url: "https://www.kreis-hoexter.de" },
  { name: "Kreissportbund Höxter e.V.", url: "https://www.ksb-hoexter.de" },
  { name: "Lebenshilfe Höxter", role: "Werkstätten am Grünen Berg", url: "https://www.lebenshilfe-hoexter.de" },
  { name: "Caritas Beratungszentrum Brakel", role: "Beratungsstelle für Eltern, Kinder und Jugendliche", url: "https://www.caritas-hx.de" },
  { name: "Caritas Beratungszentrum Brakel", role: "Ehe-, Familien- und Lebensberatung", url: "https://www.caritas-hx.de" },
  { name: "Frauenberatungsstelle der AWO für den Kreis Höxter", role: "Beratungsstelle gegen Gewalt an Frauen", url: "https://awo-hx.de/einrichtungen/beratungsstellen/frauenberatung/" },
  { name: "AWO Migrationsberatung Kreis Höxter", url: "https://awo-hx.de/einrichtungen/beratungsstellen/migrationsdienst/" },
  { name: "AWO Kreisverband Höxter e.V.", role: "Beratungsstelle Schwangerschaft, Partnerschaft und Sexualität", url: "https://awo-hx.de/einrichtungen/beratungsstellen/schwangerschaftsberatung/" },
  { name: "Kreispolizeibehörde Höxter", role: "Opferschutzbeauftragte", url: "https://hoexter.polizei.nrw" },
  { name: "Stadt Höxter", role: "Gleichstellungsbeauftragte", url: "https://www.hoexter.de" },
  { name: "Stadt Beverungen", role: "Gleichstellungsbeauftragte", url: "https://www.beverungen.de" },
  { name: "Stadt Bad Driburg", role: "Gleichstellungsbeauftragte", url: "https://www.bad-driburg.de" },
  { name: "Ambulanter sozialer Dienst im Landgerichtsbezirk Paderborn", url: "https://www.lg-paderborn.nrw.de" },
  { name: "Jobcenter Kreis Höxter", role: "Gleichstellungsbeauftragte", url: "https://www.jobcenter-kreis-hoexter.de" },
  { name: "Ehrenamtliche Mitglieder" },
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
    // Ohne Namen, Entscheidung des AG vom 28.10.2026 zum Schutz der Abgebildeten (Z-08)
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
