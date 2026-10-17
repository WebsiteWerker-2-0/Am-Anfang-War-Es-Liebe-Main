import type { CollectionConfig } from "payload";
import { isLoggedIn, publishedOrLoggedIn } from "../access";
import { bodyEditor } from "../editors";
import { publicationFields, syncArchivedAt } from "../fields/publication";
import { hiddenSlugField } from "../fields/slug";
import { revalidateSite } from "../revalidate";

// Veranstaltungen (Kurse und Termine) mit Plätzen und Anmeldung (F-06, F-11). Die Website zeigt
// veröffentlichte Veranstaltungen auf der Seite „Kurse“ mit freien Plätzen und einem Anmeldeformular,
// siehe components/CourseList.tsx. Der Name der Sammlung bleibt „courses“ (Datenbank, Adressen),
// im Backend heißt sie „Veranstaltungen“.
export const Courses: CollectionConfig = {
  slug: "courses",
  labels: { singular: "Veranstaltung", plural: "Veranstaltungen" },
  versions: { maxPerDoc: 20 },
  defaultSort: "startsAt",
  admin: {
    useAsTitle: "title",
    group: "Veranstaltungen",
    defaultColumns: ["title", "startsAt", "booked", "capacity", "status"],
    listSearchableFields: ["title", "location"],
    // Auge-Symbol: Vorschau der Veranstaltung, wie sie auf der Website erscheint
    livePreview: { url: ({ data }) => `/vorschau/veranstaltungen/${data.id}` },
    description:
      "Kurse und Termine mit Anmeldung. Mit „Speichern“ erscheint die Veranstaltung sofort mit freien Plätzen und Anmeldeformular auf der Website (Status „Veröffentlicht“). Mit dem Auge-Symbol oben sehen Sie die Vorschau.",
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
    beforeDelete: [
      // Löschen ist immer möglich (Payload fragt vorher „Sind Sie sicher?“). Die Anmeldungen der
      // Veranstaltung werden mitgelöscht, sie enthalten persönliche Daten und gehören nur zu ihr.
      async ({ id, req }) => {
        await req.payload.delete({ collection: "registrations", where: { course: { equals: id } }, req });
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Name der Veranstaltung",
      required: true,
      admin: { placeholder: "Zum Beispiel: WenDo für Frauen und Mädchen" },
    },
    {
      name: "startsAt",
      type: "date",
      label: "Wann beginnt es?",
      required: true,
      admin: {
        date: { pickerAppearance: "dayAndTime", displayFormat: "dd.MM.yyyy HH:mm" },
        description: "Vergangene Termine erscheinen nicht auf der Website (ab dem Tag nach Beginn bzw. Ende).",
      },
    },
    { name: "location", type: "text", label: "Wo findet es statt?", admin: { placeholder: "Zum Beispiel: Kreishaus Höxter, Raum 12" } },
    {
      name: "description",
      type: "textarea",
      label: "Worum geht es?",
      admin: { description: "Kurzer Text für die Website. Eine Leerzeile beginnt einen neuen Absatz." },
    },
    {
      name: "details",
      type: "richText",
      label: "Ausführlicher Text (optional)",
      editor: bodyEditor,
      admin: {
        description:
          "Zum Beispiel Ablauf, Mitbringen, Hinweise. Datei oder Bild an einer bestimmten Stelle einfügen: im Text an die Stelle klicken, dann in der Leiste ganz links auf das erste Symbol und „Datei oder Bild“ wählen.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "capacity",
          type: "number",
          label: "Wie viele Plätze gibt es?",
          required: true,
          min: 1,
          defaultValue: 12,
          admin: { width: "50%" },
        },
        {
          name: "booked",
          type: "number",
          label: "Schon angemeldet",
          virtual: true,
          admin: { readOnly: true, width: "50%", description: "Zählt das System selbst, aus den Anmeldungen unten." },
          hooks: {
            afterRead: [
              async ({ data, req }) => {
                if (!data?.id) return 0;
                const { totalDocs } = await req.payload.count({
                  collection: "registrations",
                  where: { and: [{ course: { equals: data.id } }, { status: { equals: "confirmed" } }] },
                  req,
                });
                return totalDocs;
              },
            ],
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "registrationOpen",
          type: "checkbox",
          label: "Anmeldung auf der Website möglich",
          defaultValue: true,
          admin: { width: "50%" },
        },
        {
          name: "waitlist",
          type: "checkbox",
          label: "Warteliste anbieten, wenn alle Plätze belegt sind",
          defaultValue: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "registrationList",
      type: "join",
      collection: "registrations",
      on: "course",
      label: "Anmeldungen",
      admin: {
        defaultColumns: ["name", "email", "status", "createdAt"],
        allowCreate: false,
        description:
          "Wer sich angemeldet hat. Zum Stornieren (Platz wird frei) oder zum Nachrücken von der Warteliste eine Zeile öffnen und den Status ändern. Nach der Veranstaltung bitte löschen: Die Angaben sind persönliche Daten.",
      },
    },
    {
      type: "collapsible",
      label: "Weitere Angaben (optional)",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "endsAt",
          type: "date",
          label: "Wann endet es?",
          admin: {
            date: { pickerAppearance: "dayAndTime", displayFormat: "dd.MM.yyyy HH:mm" },
            description: "Zum Beispiel bei Veranstaltungen über mehrere Tage.",
          },
        },
        {
          type: "row",
          fields: [
            { name: "audience", type: "text", label: "Für wen", admin: { placeholder: "Frauen und Mädchen ab 15 Jahren", width: "50%" } },
            { name: "price", type: "text", label: "Kosten", admin: { placeholder: "kostenlos", width: "50%" } },
          ],
        },
        { name: "instructor", type: "text", label: "Leitung" },
        {
          name: "notifyEmail",
          type: "email",
          label: "Anmeldungen für diese Veranstaltung gehen an",
          access: { read: ({ req }) => Boolean(req.user) },
          admin: { description: "Leer lassen: Es gilt die Adresse, die ein Admin unter „E-Mail und Anmeldungen“ eingetragen hat." },
        },
      ],
    },
    { name: "viewOnSite", type: "ui", admin: { position: "sidebar", components: { Field: "/cms/components/ViewOnSite#ViewOnSite" } } },
    hiddenSlugField,
    ...publicationFields(),
  ],
};
