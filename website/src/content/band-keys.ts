// Illustrationsbänder der Seitenköpfe (Gestaltung und Bilder: content/page-bands.ts).
// Nur die Schlüssel stehen hier, damit das CMS sie ohne Bildimporte kennt.
export const bandOptions = [
  { value: "help", label: "Hilfe (magenta)" },
  { value: "courses", label: "Kurse (sand)" },
  { value: "dates", label: "Termine (magenta)" },
  { value: "info", label: "Infos (orange)" },
  { value: "workingGroup", label: "Arbeitskreis (orange)" },
  { value: "news", label: "Aktuelles (magenta)" },
] as const;

export type BandKey = (typeof bandOptions)[number]["value"];
