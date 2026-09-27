import daten from "./beitraege.json";

export type Beitrag = {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  excerpt: string;
  image: string | null;
  html: string;
  source: string;
};

// Übernommen aus der Altseite, siehe altseite/beitraege-uebernehmen.py
export const beitraege = daten as Beitrag[];

export function findeBeitrag(slug: string) {
  return beitraege.find((b) => b.slug === slug);
}

const datumLang = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Berlin",
});

export function formatDatum(iso: string) {
  return datumLang.format(new Date(iso + "T12:00:00"));
}

export function datumTeile(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return {
    tag: d.getDate().toString(),
    monat: new Intl.DateTimeFormat("de-DE", { month: "short", timeZone: "Europe/Berlin" }).format(d),
    jahr: d.getFullYear().toString(),
  };
}
