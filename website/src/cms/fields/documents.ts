import type { Field } from "payload";

// Verlinkte Dokumente zu einem Beitrag oder einer Veranstaltung.
export const documentsField: Field = {
  name: "documents",
  type: "array",
  label: "Dokumente zum Download",
  labels: { singular: "Dokument", plural: "Dokumente" },
  admin: { initCollapsed: true, description: "PDFs, Flyer, Plakate oder Videos, die unter dem Text verlinkt werden." },
  fields: [
    { name: "label", type: "text", label: "Linktext", required: true },
    { name: "file", type: "upload", relationTo: "media", label: "Datei", required: true },
  ],
};
