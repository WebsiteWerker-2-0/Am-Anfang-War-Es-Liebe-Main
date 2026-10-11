import type { CollectionConfig } from "payload";
import { isLoggedIn, publishedOrLoggedIn } from "../access";
import { documentsField } from "../fields/documents";
import { publicationFields, syncArchivedAt } from "../fields/publication";
import { slugField } from "../fields/slug";

// Aktuelles (F-05): Beiträge des Arbeitskreises.
export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Beitrag (Aktuelles)", plural: "Beiträge (Aktuelles)" },
  // Reihenfolge per Ziehen in der Liste (Position)
  orderable: true,
  admin: {
    useAsTitle: "title",
    group: "Inhalte",
    defaultColumns: ["title", "date", "status"],
    description: "Meldungen für den Bereich Aktuelles. Die Reihenfolge lässt sich in der Liste per Ziehen ändern.",
  },
  access: {
    read: publishedOrLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: { beforeChange: [syncArchivedAt] },
  fields: [
    { name: "title", type: "text", label: "Titel", required: true },
    {
      name: "date",
      type: "date",
      label: "Datum",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { date: { pickerAppearance: "dayOnly", displayFormat: "dd.MM.yyyy" } },
    },
    { name: "excerpt", type: "textarea", label: "Kurzfassung", admin: { description: "Erscheint in der Liste unter dem Titel." } },
    { name: "image", type: "upload", relationTo: "media", label: "Titelbild" },
    { name: "content", type: "richText", label: "Text" },
    {
      name: "gallery",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      label: "Weitere Bilder",
    },
    documentsField,
    {
      name: "legacyHtml",
      type: "textarea",
      label: "Originaltext der Altseite (nur lesbar)",
      admin: {
        readOnly: true,
        condition: (data) => Boolean(data?.legacyHtml),
        description:
          "Vollständiger Originaltext aus der alten Website. Tabellen und Videos sind im Textfeld oben nicht übernommen, hier ist alles erhalten.",
      },
    },
    slugField,
    ...publicationFields,
  ],
};
