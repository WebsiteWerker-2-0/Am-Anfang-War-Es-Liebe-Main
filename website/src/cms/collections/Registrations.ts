import type { CollectionConfig } from "payload";
import { isLoggedIn } from "../access";

// Kursanmeldungen. Sie entstehen nur über das Formular der Website (lib/registration.ts), nicht im Backend.
// Persönliche Daten: Anmeldungen dürfen gespeichert werden (ADR-0003), Kontaktanfragen nicht.
// OFFEN: Löschfrist mit dem AG festlegen (Pflichtenheft § 13); bis dahin nach dem Kurs von Hand löschen.
export const Registrations: CollectionConfig = {
  slug: "registrations",
  labels: { singular: "Anmeldung", plural: "Anmeldungen" },
  defaultSort: "-createdAt",
  admin: {
    useAsTitle: "name",
    // Nicht im Menü: die Redaktion sieht die Anmeldungen in der jeweiligen Veranstaltung
    group: false,
    defaultColumns: ["name", "course", "status", "createdAt"],
    listSearchableFields: ["name", "email"],
    description:
      "Anmeldungen über die Website. Sie enthalten persönliche Daten: bitte nur für die Veranstaltung verwenden und danach löschen.",
  },
  access: {
    read: isLoggedIn,
    create: () => false,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    { name: "course", type: "relationship", relationTo: "courses", label: "Veranstaltung", required: true, admin: { readOnly: true } },
    { name: "name", type: "text", label: "Name", required: true },
    { name: "email", type: "email", label: "E-Mail", required: true },
    { name: "phone", type: "text", label: "Telefon" },
    { name: "message", type: "textarea", label: "Nachricht der Teilnehmerin" },
    {
      name: "status",
      type: "select",
      label: "Status",
      required: true,
      defaultValue: "confirmed",
      index: true,
      options: [
        { label: "Angemeldet (Platz belegt)", value: "confirmed" },
        { label: "Warteliste", value: "waitlist" },
        { label: "Storniert (Platz wieder frei)", value: "cancelled" },
      ],
      admin: {
        position: "sidebar",
        description: "Bei „Storniert“ wird der Platz sofort wieder auf der Website frei.",
      },
    },
    { name: "consent", type: "checkbox", label: "Datenschutzhinweis bestätigt", admin: { readOnly: true, position: "sidebar" } },
    {
      name: "mailStatus",
      type: "select",
      label: "E-Mail an den Arbeitskreis",
      options: [
        { label: "Gesendet", value: "sent" },
        { label: "Nicht gesendet", value: "failed" },
        { label: "Nicht eingerichtet", value: "skipped" },
      ],
      admin: { readOnly: true, position: "sidebar", description: "Bei „Nicht gesendet“ bitte „E-Mail und Anmeldungen“ prüfen." },
    },
    { name: "mailError", type: "textarea", label: "Fehlermeldung beim Senden", admin: { readOnly: true, condition: (data) => Boolean(data?.mailError) } },
  ],
};
