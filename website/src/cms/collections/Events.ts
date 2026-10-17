import type { CollectionConfig } from "payload";
import { isLoggedIn, publishedOrLoggedIn } from "../access";
import { documentsField } from "../fields/documents";
import { publicationFields, syncArchivedAt } from "../fields/publication";
import { slugField } from "../fields/slug";
import { bodyEditor } from "../editors";
import { revalidateSite } from "../revalidate";

// Veranstaltungen und Termine (F-06). Die Plätze sind die Grundlage für den
// Zähler bei der Anmeldung (F-11).
export const Events: CollectionConfig = {
  slug: "events",
  labels: { singular: "Veranstaltung", plural: "Veranstaltungen" },
  orderable: true,
  admin: {
    useAsTitle: "title",
    group: "Verwaltung",
    // Noch nicht auf der Website angebunden, deshalb im Menü ausgeblendet
    hidden: true,
    defaultColumns: ["title", "startsAt", "location", "status"],
    description: "Termine und Kurse. Vergangene Termine bleiben erhalten und lassen sich archivieren.",
  },
  access: {
    read: publishedOrLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: {
    beforeChange: [syncArchivedAt],
    afterChange: [() => revalidateSite()],
    afterDelete: [() => revalidateSite()],
  },
  fields: [
    { name: "title", type: "text", label: "Titel", required: true },
    {
      name: "startsAt",
      type: "date",
      label: "Beginn",
      required: true,
      admin: { date: { pickerAppearance: "dayAndTime", displayFormat: "dd.MM.yyyy HH:mm" } },
    },
    {
      name: "endsAt",
      type: "date",
      label: "Ende",
      admin: { date: { pickerAppearance: "dayAndTime", displayFormat: "dd.MM.yyyy HH:mm" } },
    },
    { name: "location", type: "text", label: "Ort" },
    { name: "image", type: "upload", relationTo: "media", label: "Bild" },
    { name: "description", type: "richText", label: "Beschreibung", editor: bodyEditor },
    {
      type: "row",
      fields: [
        {
          name: "capacity",
          type: "number",
          label: "Plätze",
          min: 0,
          admin: { description: "Leer lassen für unbegrenzt." },
        },
        {
          name: "registrationOpen",
          type: "checkbox",
          label: "Anmeldung offen",
          defaultValue: false,
        },
      ],
    },
    documentsField,
    slugField,
    ...publicationFields,
  ],
};
