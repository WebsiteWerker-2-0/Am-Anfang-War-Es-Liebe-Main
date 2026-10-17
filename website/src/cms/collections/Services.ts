import type { CollectionConfig } from "payload";
import { isLoggedIn } from "../access";
import { revalidateSite } from "../revalidate";

// Anlaufstellen im Kreis Höxter (Z-03). Hauptanlaufstellen stehen auf der Hilfeseite
// zuerst und ausführlich, die übrigen aufklappbar nach Gruppen.
export const Services: CollectionConfig = {
  slug: "services",
  labels: { singular: "Anlaufstelle", plural: "Anlaufstellen" },
  orderable: true,
  admin: {
    useAsTitle: "name",
    group: "Seiten der Website",
    defaultColumns: ["name", "placement", "groupTitle"],
    description:
      "Beratungsstellen, Schutzhaus, Polizei und weitere Hilfen. Die Reihenfolge lässt sich in der Liste per Ziehen ändern.",
  },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: { afterChange: [() => revalidateSite()], afterDelete: [() => revalidateSite()] },
  fields: [
    { name: "name", type: "text", label: "Name der Stelle", required: true },
    {
      name: "serviceId",
      type: "text",
      label: "Kennung",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar", description: "Kurzer Name ohne Leerzeichen, auch als Sprungmarke genutzt." },
    },
    {
      name: "placement",
      type: "select",
      label: "Platz auf der Hilfeseite",
      required: true,
      defaultValue: "group",
      options: [
        { label: "Hauptanlaufstelle (immer sichtbar)", value: "main" },
        { label: "Weitere Anlaufstelle (aufklappbar)", value: "group" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "groupTitle",
      type: "text",
      label: "Gruppe",
      admin: {
        position: "sidebar",
        condition: (data) => data?.placement === "group",
        description: "Überschrift der aufklappbaren Gruppe, zum Beispiel „Telefonische Beratung“.",
      },
    },
    {
      name: "question",
      type: "text",
      label: "Überschrift als Frage",
      admin: { description: "Nur bei Hauptanlaufstellen, zum Beispiel „Was kann die Polizei für Sie tun?“." },
    },
    { name: "provider", type: "text", label: "Träger" },
    {
      name: "phones",
      type: "array",
      label: "Telefonnummern",
      labels: { singular: "Nummer", plural: "Nummern" },
      fields: [
        { name: "label", type: "text", label: "Bezeichnung (zum Beispiel Im Notfall)" },
        { name: "number", type: "text", label: "Nummer", required: true },
        { name: "note", type: "text", label: "Hinweis in Klammern" },
      ],
    },
    { name: "availability", type: "textarea", label: "Erreichbarkeit" },
    {
      name: "addresses",
      type: "array",
      label: "Adressen",
      labels: { singular: "Adresse", plural: "Adressen" },
      fields: [{ name: "address", type: "text", label: "Adresse", required: true }],
    },
    { name: "email", type: "email", label: "E-Mail" },
    {
      name: "website",
      type: "group",
      label: "Website",
      fields: [
        { name: "url", type: "text", label: "Adresse (https://…)" },
        { name: "label", type: "text", label: "Anzeigetext" },
      ],
    },
    { name: "description", type: "textarea", label: "Beschreibung" },
    {
      name: "offers",
      type: "array",
      label: "Angebote („Die Beraterinnen bieten:“)",
      labels: { singular: "Angebot", plural: "Angebote" },
      fields: [{ name: "text", type: "textarea", label: "Angebot", required: true }],
    },
    {
      name: "quick",
      type: "group",
      label: "Schnellzugriff auf der Startseite",
      admin: { description: "Nur ausfüllen, wenn die Stelle im Block „Hier bekommen Sie sofort Hilfe“ erscheinen soll." },
      fields: [
        { name: "label", type: "text", label: "Name im Schnellzugriff" },
        { name: "note", type: "text", label: "Hinweis darunter" },
        { name: "order", type: "number", label: "Reihenfolge", admin: { description: "Kleine Zahl steht zuerst." } },
      ],
    },
  ],
};
