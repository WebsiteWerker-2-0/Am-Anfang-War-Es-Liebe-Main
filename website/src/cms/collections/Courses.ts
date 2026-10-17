import { APIError, type CollectionConfig } from "payload";
import { isLoggedIn, publishedOrLoggedIn } from "../access";
import { publicationFields, syncArchivedAt } from "../fields/publication";
import { slugField } from "../fields/slug";
import { revalidateSite } from "../revalidate";

// Kurse mit Plätzen und Anmeldung (F-11). Die Website zeigt veröffentlichte Kurse auf der Seite „Kurse“
// mit der Zahl der freien Plätze und einem Anmeldeformular, siehe components/blocks/CourseList.tsx.
export const Courses: CollectionConfig = {
  slug: "courses",
  labels: { singular: "Kurs", plural: "Kurse" },
  versions: { maxPerDoc: 20 },
  defaultSort: "startsAt",
  admin: {
    useAsTitle: "title",
    group: "Aktuelles und Kurse",
    defaultColumns: ["title", "startsAt", "booked", "capacity", "status"],
    listSearchableFields: ["title", "location"],
    description:
      "Hier legen Sie Kurse an. Sobald ein Kurs „Veröffentlicht“ ist, erscheint er mit freien Plätzen und Anmeldeformular auf der Seite „Kurse“.",
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
      // Anmeldungen enthalten persönliche Daten und gehören zu genau einem Kurs
      async ({ id, req }) => {
        const { totalDocs } = await req.payload.count({ collection: "registrations", where: { course: { equals: id } }, req });
        if (totalDocs > 0) {
          throw new APIError(
            `Dieser Kurs hat ${totalDocs} Anmeldung(en) und kann nicht gelöscht werden. Stellen Sie ihn stattdessen auf „Archiviert“.`,
            400,
            undefined,
            true,
          );
        }
      },
    ],
  },
  fields: [
    { name: "title", type: "text", label: "Name des Kurses", required: true, admin: { placeholder: "Zum Beispiel: WenDo für Frauen und Mädchen" } },
    {
      type: "row",
      fields: [
        {
          name: "startsAt",
          type: "date",
          label: "Beginn",
          required: true,
          admin: { date: { pickerAppearance: "dayAndTime", displayFormat: "dd.MM.yyyy HH:mm" }, width: "50%" },
        },
        {
          name: "endsAt",
          type: "date",
          label: "Ende",
          admin: {
            date: { pickerAppearance: "dayAndTime", displayFormat: "dd.MM.yyyy HH:mm" },
            width: "50%",
            description: "Optional, zum Beispiel bei Kursen über mehrere Tage.",
          },
        },
      ],
    },
    { name: "location", type: "text", label: "Ort", admin: { placeholder: "Zum Beispiel: Kreishaus Höxter, Raum 12" } },
    {
      type: "row",
      fields: [
        { name: "audience", type: "text", label: "Für wen", admin: { placeholder: "Frauen und Mädchen ab 15 Jahren", width: "50%" } },
        { name: "price", type: "text", label: "Kosten", admin: { placeholder: "kostenlos", width: "50%" } },
      ],
    },
    { name: "instructor", type: "text", label: "Kursleitung" },
    {
      name: "description",
      type: "textarea",
      label: "Beschreibung",
      admin: { description: "Kurzer Text für die Website. Eine Leerzeile beginnt einen neuen Absatz." },
    },
    {
      type: "row",
      fields: [
        {
          name: "capacity",
          type: "number",
          label: "Plätze insgesamt",
          required: true,
          min: 1,
          defaultValue: 12,
          admin: { width: "50%" },
        },
        {
          name: "booked",
          type: "number",
          label: "Angemeldet",
          virtual: true,
          admin: { readOnly: true, width: "50%", description: "Wird aus den Kursanmeldungen berechnet." },
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
      name: "notifyEmail",
      type: "email",
      label: "Anmeldungen für diesen Kurs gehen an",
      access: { read: ({ req }) => Boolean(req.user) },
      admin: { description: "Leer lassen: Es gilt die Adresse unter „E-Mail und Anmeldungen“." },
    },
    { name: "viewOnSite", type: "ui", admin: { position: "sidebar", components: { Field: "/cms/components/ViewOnSite#ViewOnSite" } } },
    slugField,
    ...publicationFields,
  ],
};
