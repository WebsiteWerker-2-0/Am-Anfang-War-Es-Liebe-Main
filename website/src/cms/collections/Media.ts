import type { CollectionConfig } from "payload";
import { isLoggedIn } from "../access";
import { uploadDir } from "../env";
import { revalidateSite } from "../revalidate";

// Mediathek (F-07): Bilder, Dokumente und Videos für Beiträge, Termine und Kurse.
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Datei", plural: "Dateiarchiv" },
  admin: {
    useAsTitle: "title",
    group: "Dateiarchiv",
    defaultColumns: ["title", "filename", "mimeType", "isPublic", "updatedAt"],
    description:
      "Das Archiv aller hochgeladenen Bilder, PDFs und Videos. Hochladen Sie neue Dateien am besten direkt im Beitrag, im Termin oder im Kurs.",
  },
  access: {
    // Öffentlich abrufbar ist nur, was als öffentlich markiert ist
    read: ({ req }) => (req.user ? true : { isPublic: { equals: true } }),
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  upload: {
    staticDir: uploadDir,
    mimeTypes: [
      "image/*",
      "application/pdf",
      "video/mp4",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    imageSizes: [{ name: "thumbnail", width: 400 }],
    adminThumbnail: "thumbnail",
  },
  hooks: {
    afterChange: [() => revalidateSite()],
    beforeValidate: [
      ({ data, req }) => {
        // Ohne Titel den Dateinamen übernehmen
        if (data && !data.title) data.title = req.file?.name ?? data.filename;
        return data;
      },
    ],
  },
  fields: [
    { name: "title", type: "text", label: "Titel", required: true },
    {
      name: "alt",
      type: "text",
      label: "Alternativtext",
      admin: { description: "Für Bilder: kurze Beschreibung für Screenreader und wenn das Bild nicht lädt." },
    },
    { name: "description", type: "textarea", label: "Beschreibung (intern)" },
    {
      name: "isPublic",
      type: "checkbox",
      label: "Öffentlich abrufbar",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
  ],
};
