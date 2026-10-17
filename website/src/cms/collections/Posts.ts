import type { CollectionBeforeChangeHook, CollectionConfig } from "payload";
import { generateKeyBetween } from "payload/shared";
import { isLoggedIn, publishedOrLoggedIn } from "../access";
import { documentsFields } from "../fields/documents";
import { publicationFields, syncArchivedAt } from "../fields/publication";
import { hiddenSlugField } from "../fields/slug";
import { bodyEditor } from "../editors";
import { revalidateSite } from "../revalidate";

// Neue Beiträge kommen an die erste Stelle der Liste (und der Website), nicht ans Ende.
// Payload hängt sie sonst hinten an, die Redaktion hielt sie dann für verschwunden.
// Läuft vor dem Hook von „orderable“, der nur einspringt, wenn _order noch fehlt.
const newPostsFirst: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation !== "create" || data._order) return data;
  const first = await req.payload.find({
    collection: "posts",
    depth: 0,
    limit: 1,
    pagination: false,
    req,
    select: { _order: true } as never,
    sort: "_order",
    where: { _order: { exists: true } },
  });
  const firstKey = (first.docs[0] as { _order?: string } | undefined)?._order ?? null;
  data._order = generateKeyBetween(null, firstKey);
  return data;
};

// Aktuelles (F-05): Beiträge des Arbeitskreises.
export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Beitrag", plural: "Aktuelles" },
  versions: { maxPerDoc: 20 },
  // Reihenfolge per Ziehen in der Liste (Position)
  orderable: true,
  admin: {
    useAsTitle: "title",
    group: "Aktuelles",
    defaultColumns: ["title", "date", "status"],
    description:
      "Meldungen für den Bereich Aktuelles auf der Website. Mit „Speichern“ erscheint der Beitrag sofort ganz oben. Soll er noch nicht erscheinen, wählen Sie rechts den Status „Entwurf“. Das Auge-Symbol zeigt die Vorschau. Die Reihenfolge ändern Sie in der Liste per Ziehen.",
    listSearchableFields: ["title"],
    // Auge-Symbol: Vorschau des Beitrags, wie er auf der Website erscheint
    livePreview: { url: ({ data }) => `/vorschau/aktuelles/${data.id}` },
  },
  access: {
    read: publishedOrLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: {
    beforeChange: [syncArchivedAt, newPostsFirst],
    afterChange: [() => revalidateSite()],
    afterDelete: [() => revalidateSite()],
  },
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
    {
      name: "content",
      type: "richText",
      label: "Text",
      editor: bodyEditor,
      admin: {
        description:
          "Datei oder Bild an einer bestimmten Stelle einfügen: im Text an die Stelle klicken, dann in der Leiste ganz links auf das erste Symbol und „Datei oder Bild“ wählen.",
      },
    },
    {
      name: "gallery",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      label: "Weitere Bilder",
      // Entfällt: Bilder gehören direkt in den Text (Baustein „Datei oder Bild“).
      // Sichtbar bleibt das Feld nur, wo die Altseite schon Bilder eingetragen hat.
      admin: {
        condition: (data) => Array.isArray(data?.gallery) && data.gallery.length > 0,
        description: "Altes Feld. Neue Bilder bitte direkt in den Text setzen. Leeren Sie das Feld, verschwindet es.",
      },
    },
    ...documentsFields,
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
    { name: "viewOnSite", type: "ui", admin: { position: "sidebar", components: { Field: "/cms/components/ViewOnSite#ViewOnSite" } } },
    hiddenSlugField,
    ...publicationFields("Archiviert (eingeklappt im Archiv unten auf Aktuelles)"),
  ],
};
