import type { CollectionConfig } from "payload";
import { isLoggedIn } from "../access";
import { pageBlocks } from "../blocks/page-blocks";
import { bandOptions } from "../../content/band-keys";
import { revalidateSite } from "../revalidate";

// Die Seiten der Website, eine pro Adresse und mit demselben Aufbau wie im Frontend.
// Seiten lassen sich bearbeiten, aber weder anlegen noch löschen: Die Struktur der
// Website ist festgelegt. Neue Seiten bräuchten Navigation und Programmierung.
export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Seite", plural: "Seiten" },
  defaultSort: "slug",
  admin: {
    useAsTitle: "title",
    group: "Website",
    defaultColumns: ["title", "slug", "updatedAt"],
    description: "Alle Seiten der Website, so aufgebaut wie auf der Website. Zum Ändern eine Seite öffnen.",
  },
  access: {
    read: () => true,
    create: () => false,
    update: isLoggedIn,
    delete: () => false,
  },
  hooks: { afterChange: [() => revalidateSite()] },
  fields: [
    { name: "title", type: "text", label: "Überschrift der Seite", required: true },
    {
      name: "intro",
      type: "textarea",
      label: "Einleitung unter der Überschrift",
    },
    {
      name: "band",
      type: "select",
      label: "Illustration im Seitenkopf",
      options: [...bandOptions],
      admin: { description: "Bild aus der Broschüre neben der Überschrift. Leer: Seitenkopf ohne Bild." },
    },
    { name: "blocks", type: "blocks", label: "Inhalt der Seite", blocks: pageBlocks },
    {
      type: "collapsible",
      label: "Suchmaschinen und Browser-Tab",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: "Titel im Browser-Tab",
          admin: { description: "Leer lassen, dann gilt die Überschrift der Seite." },
        },
        { name: "description", type: "textarea", label: "Kurzbeschreibung für Suchmaschinen" },
      ],
    },
    {
      name: "slug",
      type: "text",
      label: "Adresse",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar", readOnly: true, description: "Die Adresse der Seite ist festgelegt." },
    },
    {
      name: "layout",
      type: "select",
      label: "Seitenaufbau",
      required: true,
      defaultValue: "stack-lg",
      options: [
        { label: "Startseite", value: "home" },
        { label: "Abschnitte mit großem Abstand", value: "stack-lg" },
        { label: "Schmale Textseite", value: "measure-stack" },
        { label: "Breite Seite", value: "wide" },
      ],
      admin: { position: "sidebar", description: "Bestimmt Breite und Abstände. Nur im Notfall ändern." },
    },
  ],
};
