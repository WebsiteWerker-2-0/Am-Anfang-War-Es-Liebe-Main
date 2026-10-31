import type { MemberData } from "./model";

// Mitglieder des Arbeitskreises für „Wer im Arbeitskreis mitarbeitet“ (Seite Arbeitskreis).
// Lieferung des AG vom 28.10.2026, ohne Namen von Personen. Diese Liste füllt beim ersten Start das Backend
// (cms/seed.ts) und gilt, solange das CMS fehlt. Danach pflegt die Redaktion sie im Backend unter „Mitglieder“.
export const defaultMembers: MemberData[] = [
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
