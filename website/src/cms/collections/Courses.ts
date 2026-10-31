import type { CollectionConfig, PayloadRequest } from "payload";
import { isLoggedIn, publishedOrLoggedIn } from "../access";
import { bodyEditor } from "../editors";
import { publicationFields, syncArchivedAt } from "../fields/publication";
import { emailListField } from "../fields/email-list";
import { hiddenSlugField } from "../fields/slug";
import { revalidateSite } from "../revalidate";

/** Plätze, die über die Website vergeben sind (Anmeldungen mit Status „Angemeldet“) */
async function onlineSeats(courseId: unknown, req: PayloadRequest) {
  if (!courseId) return 0;
  const { totalDocs } = await req.payload.count({
    collection: "registrations",
    where: { and: [{ course: { equals: courseId } }, { status: { equals: "confirmed" } }] },
    req,
  });
  return totalDocs;
}

// Termine mit Plätzen und Anmeldung (F-06, F-11). Die Website zeigt veröffentlichte Termine
// auf der Seite „Termine“ (/termine) mit freien Plätzen und einem Anmeldeformular,
// siehe components/CourseList.tsx. Der Name der Sammlung bleibt „courses“ (Datenbank, Adressen),
// im Backend heißt sie „Termine“. Die Kursbeschreibungen (Krav Maga, Wendo) sind die Sammlung „course-offers“.
export const Courses: CollectionConfig = {
  slug: "courses",
  labels: { singular: "Termin", plural: "Termine" },
  versions: { maxPerDoc: 20 },
  defaultSort: "startsAt",
  admin: {
    useAsTitle: "title",
    group: "Termine",
    defaultColumns: ["title", "startsAt", "status"],
    listSearchableFields: ["title", "location"],
    // Auge-Symbol: Vorschau des Termins, wie er auf der Website erscheint
    livePreview: { url: ({ data }) => `/vorschau/termine/${data.id}` },
    description:
      "Termine mit Anmeldung, zum Beispiel Kurstermine oder Aktionen. Mit „Speichern“ erscheint der Termin sofort mit Anmeldeformular auf der Website (Status „Veröffentlicht“). Mit dem Auge-Symbol oben sehen Sie die Vorschau.",
  },
  access: {
    read: publishedOrLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: {
    beforeChange: [
      syncArchivedAt,
      // „Schon angemeldet“ ist bearbeitbar: Der Teil über den Website-Anmeldungen wird als extraBooked gespeichert.
      // Weniger als die Website-Anmeldungen geht nicht; dafür eine Anmeldung auf „Storniert“ stellen.
      async ({ data, originalDoc, req }) => {
        if (typeof data.booked !== "number") return data;
        const online = await onlineSeats(originalDoc?.id, req);
        data.extraBooked = Math.max(0, Math.round(data.booked) - online);
        return data;
      },
    ],
    afterChange: [() => revalidateSite()],
    afterDelete: [() => revalidateSite()],
    beforeDelete: [
      // Löschen ist immer möglich (Payload fragt vorher „Sind Sie sicher?“). Die Anmeldungen der
      // Termins werden mitgelöscht, sie enthalten persönliche Daten und gehören nur zu ihr.
      async ({ id, req }) => {
        await req.payload.delete({ collection: "registrations", where: { course: { equals: id } }, req });
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Name des Termins",
      required: true,
      admin: { placeholder: "Zum Beispiel: Wendo für Frauen und Mädchen" },
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
    // Wie der Download-Bereich bei Aktuelles: Plätze, Belegung und Warteliste erscheinen erst mit Häkchen.
    // Ohne Häkchen gibt es keine Grenze und keine Angaben zu Plätzen, weder hier noch auf der Website.
    {
      name: "limitSeats",
      type: "checkbox",
      label: "Teilnehmerzahl begrenzen",
      defaultValue: false,
      admin: { description: "Mit Häkchen legen Sie die Zahl der Plätze fest. Die Website zeigt dann die freien Plätze und auf Wunsch eine Warteliste." },
    },
    {
      type: "row",
      admin: { condition: (data) => Boolean(data?.limitSeats) },
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
          min: 0,
          admin: {
            width: "50%",
            description:
              "Zählt die Anmeldungen über die Website mit. Anmeldungen per Telefon oder E-Mail tragen Sie hier dazu: einfach die Zahl erhöhen.",
          },
          hooks: {
            // Anzeige: Anmeldungen über die Website (Status „Angemeldet“) plus von Hand vergebene Plätze
            afterRead: [async ({ data, req }) => (await onlineSeats(data?.id, req)) + Number(data?.extraBooked ?? 0)],
            // Speichern: was über die Website-Anmeldungen hinausgeht, merkt sich „extraBooked“ (siehe beforeChange unten)
          },
        },
        // Von Hand vergebene Plätze (Telefon, E-Mail). Gesetzt über „Schon angemeldet“, nicht direkt sichtbar.
        { name: "extraBooked", type: "number", defaultValue: 0, min: 0, admin: { hidden: true } },
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
          admin: { width: "50%", condition: (data) => Boolean(data?.limitSeats) },
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
          "Wer sich angemeldet hat. Zum Stornieren (Platz wird frei) oder zum Nachrücken von der Warteliste eine Zeile öffnen und den Status ändern. Nach dem Termin bitte löschen: Die Angaben sind persönliche Daten.",
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
            description: "Zum Beispiel bei Terminen über mehrere Tage.",
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
        emailListField({
          name: "notifyEmail",
          label: "Anmeldungen für diesen Termin gehen an",
          access: { read: ({ req }) => Boolean(req.user) },
          description: "Leer lassen: Es gilt die Adresse, die ein Admin unter „E-Mail und Anmeldungen“ eingetragen hat.",
        }),
      ],
    },
    { name: "viewOnSite", type: "ui", admin: { position: "sidebar", components: { Field: "/cms/components/ViewOnSite#ViewOnSite" } } },
    hiddenSlugField,
    ...publicationFields(),
  ],
};
