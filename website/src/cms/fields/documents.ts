import type { Field } from "payload";

// Download-Bereich unter einem Beitrag: optional einblendbar, nur PDFs, je Dokument ein Name
// und auf Wunsch ein kleines Vorschaubild (sonst zeigt die Website ein PDF-Symbol).
// Ältere Einträge mit anderem Dateityp (ein Video aus der Altseite) bleiben gültig, bis man sie austauscht.
export const documentsFields: Field[] = [
  {
    name: "showDownloads",
    type: "checkbox",
    label: "Download-Bereich mit Dokumenten anzeigen",
    defaultValue: false,
    admin: { description: "Zeigt unter dem Text eine Liste mit PDFs zum Herunterladen." },
  },
  {
    name: "documents",
    type: "array",
    label: "Dokumente zum Download",
    labels: { singular: "Dokument", plural: "Dokumente" },
    admin: {
      condition: (data) => Boolean(data?.showDownloads),
      description: "Nur PDF-Dateien. Die Reihenfolge ändern Sie per Ziehen.",
    },
    fields: [
      { name: "label", type: "text", label: "Name des Dokuments", required: true, admin: { placeholder: "Zum Beispiel: Flyer Anonyme Spurensicherung" } },
      {
        name: "file",
        type: "upload",
        relationTo: "media",
        label: "PDF-Datei",
        required: true,
        // Nur PDFs zur Auswahl; die bisher gewählte Datei bleibt erlaubt
        filterOptions: ({ siblingData }) => {
          const current = (siblingData as { file?: number | { id: number } } | undefined)?.file;
          const currentId = typeof current === "object" ? current?.id : current;
          const pdf = { mimeType: { equals: "application/pdf" } };
          return currentId ? { or: [pdf, { id: { equals: currentId } }] } : pdf;
        },
      },
      {
        name: "preview",
        type: "upload",
        relationTo: "media",
        label: "Vorschaubild (optional)",
        filterOptions: { mimeType: { contains: "image/" } },
        admin: { description: "Zum Beispiel ein Bild der Titelseite. Ohne Bild erscheint ein PDF-Symbol." },
      },
    ],
  },
];
