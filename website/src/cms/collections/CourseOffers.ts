import type { CollectionConfig } from "payload";
import { isLoggedIn, publishedOrLoggedIn } from "../access";
import { bodyEditor } from "../editors";
import { publicationFields, syncArchivedAt } from "../fields/publication";
import { hiddenSlugField } from "../fields/slug";
import { revalidateSite } from "../revalidate";

// Kurse (Krav Maga, Wendo …): Beschreibung je Kurs für die Seite „Kurse“ (/kurse). Ohne Termin und Anmeldung;
// die datierten Angebote mit Anmeldung sind die „Termine“ (Sammlung courses, historischer Name).
// Erste Fassung aus dem offiziellen Dokument des AG (content/course-offers.ts, eingespielt von cms/seed.ts).
export const CourseOffers: CollectionConfig = {
  slug: "course-offers",
  labels: { singular: "Kurs", plural: "Kurse" },
  versions: { maxPerDoc: 20 },
  // Reihenfolge auf der Website per Ziehen in der Liste
  orderable: true,
  admin: {
    useAsTitle: "title",
    group: "Kurse",
    defaultColumns: ["title", "status", "updatedAt"],
    description:
      "Die Kurse auf der Seite „Kurse“, zum Beispiel Krav Maga und Wendo. Die Übersicht zeigt Name und Kurzfassung, jeder Kurs hat seine eigene Seite mit dem ganzen Text. Termine mit Anmeldung legen Sie unter „Termine“ an. Das Auge-Symbol zeigt die Vorschau.",
    livePreview: { url: ({ data }) => `/vorschau/kurse/${data.id}` },
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
    { name: "title", type: "text", label: "Name des Kurses", required: true },
    // Wie bei Aktuelles: Kurzfassung in der Übersicht, der ganze Text auf der eigenen Seite des Kurses
    { name: "excerpt", type: "textarea", label: "Kurzfassung", admin: { description: "Erscheint in der Übersicht unter dem Namen des Kurses." } },
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
    { name: "viewOnSite", type: "ui", admin: { position: "sidebar", components: { Field: "/cms/components/ViewOnSite#ViewOnSite" } } },
    hiddenSlugField,
    ...publicationFields(),
  ],
};
