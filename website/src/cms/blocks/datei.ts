import type { Block } from "payload";

// Datei oder Bild an einer bestimmten Stelle im Text (Aktuelles und Veranstaltungen).
// Bilder erscheinen als Bild, alle anderen Dateien (PDF, Word, Video) als Download-Link.
// Dargestellt wird der Baustein in lib/rich.tsx (Beiträge) und lib/rich-html.ts (Veranstaltungen).
export const FileBlock: Block = {
  slug: "datei",
  admin: { disableBlockName: true },
  labels: { singular: "Datei oder Bild", plural: "Dateien und Bilder" },
  fields: [
    {
      name: "file",
      type: "upload",
      relationTo: "media",
      label: "Datei oder Bild",
      required: true,
      admin: {
        description:
          "Wählen Sie eine Datei aus dem Archiv oder laden Sie eine neue hoch.",
      },
    },
    {
      name: "position",
      type: "radio",
      label: "Position (nur für Bilder)",
      defaultValue: "center",
      options: [
        { label: "Mittig, volle Breite", value: "center" },
        { label: "Links, Text daneben", value: "left" },
        { label: "Rechts, Text daneben", value: "right" },
      ],
      admin: {
        layout: "horizontal",
        description:
          "Links und rechts ist das Bild halb so breit, Text und Listen stehen daneben. Zwei Bilder „Links“ hintereinander stehen nebeneinander.",
      },
    },
    {
      name: "label",
      type: "text",
      label: "Beschriftung (freiwillig)",
      admin: {
        description:
          "Bei Dateien der Linktext, bei Bildern die Bildunterschrift. Leer: Titel der Datei.",
      },
    },
  ],
};
