import type { CollectionBeforeChangeHook, Field } from "payload";

// Status und Archiv, gemeinsam für Beiträge, Veranstaltungen und Seitentexte.
// Archiviert heißt: bleibt erhalten, ist aber öffentlich nicht mehr sichtbar.
export const publicationFields: Field[] = [
  {
    name: "status",
    type: "select",
    label: "Status",
    required: true,
    defaultValue: "published",
    index: true,
    options: [
      { label: "Entwurf (nicht öffentlich)", value: "draft" },
      { label: "Veröffentlicht", value: "published" },
      { label: "Archiviert (nicht mehr öffentlich)", value: "archived" },
    ],
    admin: { position: "sidebar" },
  },
  {
    name: "archivedAt",
    type: "date",
    label: "Archiviert am",
    admin: {
      position: "sidebar",
      readOnly: true,
      date: { pickerAppearance: "dayOnly" },
      condition: (data) => data?.status === "archived",
    },
  },
];

// Setzt das Archivdatum automatisch beim Archivieren und entfernt es beim Wiederherstellen.
export const syncArchivedAt: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  const status = data.status ?? originalDoc?.status;
  if (status === "archived") {
    data.archivedAt = data.archivedAt ?? originalDoc?.archivedAt ?? new Date().toISOString();
  } else if (status) {
    data.archivedAt = null;
  }
  return data;
};
