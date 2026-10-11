import type { CollectionConfig } from "payload";
import { isLoggedIn, publishedOrLoggedIn } from "../access";
import { publicationFields, syncArchivedAt } from "../fields/publication";
import { slugField } from "../fields/slug";

// Seitentexte in den fünf Sprachfassungen (F-03). Noch nicht mit den Seiten
// verbunden: die Texte der Seiten stehen vorerst im Quelltext.
export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Seitentext", plural: "Seitentexte" },
  admin: {
    useAsTitle: "title",
    group: "Inhalte",
    defaultColumns: ["title", "slug", "status"],
    description: "Texte der festen Seiten, je Sprache. Oben rechts die Sprache wählen.",
  },
  access: {
    read: publishedOrLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: { beforeChange: [syncArchivedAt] },
  fields: [
    { name: "title", type: "text", label: "Titel", required: true, localized: true },
    { name: "intro", type: "textarea", label: "Einleitung", localized: true },
    { name: "content", type: "richText", label: "Text", localized: true },
    slugField,
    ...publicationFields,
  ],
};
