import { APIError, type CollectionConfig } from "payload";
import { isLoggedIn } from "../access";
import { uploadDir } from "../env";
import { revalidateSite } from "../revalidate";

// HEIC (Fotos vom iPhone) zeigen die meisten Browser nicht an: lieber beim Hochladen ablehnen und sagen, was zu tun ist.
const HEIC = /\.(heic|heif)$|^image\/(heic|heif)/i;
const HEIC_MESSAGE =
  "Dieses Foto hat das iPhone-Format HEIC und lässt sich auf der Website nicht anzeigen. Bitte speichern Sie es als JPG und laden Sie es erneut hoch.";

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
      // Bewusst aufgezählt statt image/*: nur Formate, die alle Browser anzeigen (kein HEIC)
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/avif",
      "image/svg+xml",
      "application/pdf",
      "video/mp4",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    imageSizes: [{ name: "thumbnail", width: 400 }],
    adminThumbnail: "thumbnail",
  },
  hooks: {
    // Läuft vor der Typprüfung von Payload, deren Meldung für die Redaktion nicht verständlich wäre
    beforeOperation: [
      ({ req }) => {
        const file = req.file;
        if (file && (HEIC.test(file.name) || HEIC.test(file.mimetype))) throw new APIError(HEIC_MESSAGE, 400, undefined, true);
      },
    ],
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
