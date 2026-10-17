// Illustrationsbänder der Seitenköpfe (Gestaltung und Bilder: content/page-bands.ts).
// Nur die Schlüssel stehen hier, damit das CMS sie ohne Bildimporte kennt.
export const bandOptions = [
  { value: "help", label: "Hilfe (orange)" },
  { value: "courses", label: "Kurse (sand)" },
  { value: "info", label: "Infos (magenta)" },
  { value: "workingGroup", label: "Arbeitskreis (orange)" },
  { value: "news", label: "Aktuelles (magenta)" },
] as const;

export type BandKey = (typeof bandOptions)[number]["value"];
