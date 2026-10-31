import type { CollectionConfig } from "payload";
import { isLoggedIn } from "../access";
import { revalidateSite } from "../revalidate";

// Mitglieder des Arbeitskreises für „Wer im Arbeitskreis mitarbeitet“ (Seite Arbeitskreis, /arbeitskreis#mitglieder).
// Erste Fassung aus der Lieferung des AG vom 28.10.2026 (content/members.ts, eingespielt von cms/seed.ts).
export const Members: CollectionConfig = {
  slug: "members",
  labels: { singular: "Mitglied", plural: "Mitglieder" },
  // Reihenfolge auf der Website per Ziehen in der Liste
  orderable: true,
  admin: {
    useAsTitle: "name",
    group: "Mitglieder",
    defaultColumns: ["name", "role", "url"],
    listSearchableFields: ["name", "role"],
    description:
      "Die Liste „Wer im Arbeitskreis mitarbeitet“ auf der Seite Arbeitskreis. Reihenfolge per Ziehen ändern. Namen von Personen bitte nur mit deren Einverständnis.",
  },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: {
    afterChange: [() => revalidateSite()],
    afterDelete: [() => revalidateSite()],
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Einrichtung",
      required: true,
      admin: { placeholder: "Zum Beispiel: Frauenberatungsstelle der AWO für den Kreis Höxter" },
    },
    {
      name: "role",
      type: "text",
      label: "Bereich oder Funktion (optional)",
      admin: { placeholder: "Zum Beispiel: Gleichstellungsbeauftragte" },
    },
    {
      name: "url",
      type: "text",
      label: "Internetseite (optional)",
      admin: { placeholder: "https://www.beispiel.de", description: "Vollständige Adresse mit https://. Der Name wird dann verlinkt." },
      validate: (value: unknown) =>
        !value || /^https?:\/\/[^\s]+\.[^\s]+$/.test(String(value)) ? true : "Bitte eine vollständige Adresse mit https:// eingeben.",
    },
    { name: "viewOnSite", type: "ui", admin: { position: "sidebar", components: { Field: "/cms/components/ViewOnSite#ViewOnSite" } } },
  ],
};
