import type { GlobalConfig } from "payload";
import { isLoggedIn } from "../access";
import { inlineEditor } from "../editors";
import { revalidateSite } from "../revalidate";

// Seitenrahmen, der auf jeder Seite erscheint: Navigation, Sprachwahl,
// Hilfetelefon in der Hilfeleiste, Postfächer und Fuß der Seite.
// Der Notausgang (Ziel und Beschriftung) ist bewusst nicht änderbar.
export const Site: GlobalConfig = {
  slug: "site",
  label: "Kopf und Fuß der Seite",
  admin: { group: "Website", description: "Erscheint auf jeder Seite: Menü, Sprachwahl, Hilfetelefon und Fußbereich." },
  access: { read: () => true, update: isLoggedIn },
  hooks: { afterChange: [() => revalidateSite()] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Kopf",
          fields: [
            {
              name: "navigation",
              type: "array",
              label: "Menü",
              labels: { singular: "Menüpunkt", plural: "Menüpunkte" },
              fields: [
                { name: "label", type: "text", label: "Beschriftung", required: true },
                { name: "href", type: "text", label: "Ziel", required: true, admin: { description: "Zum Beispiel /hilfe" } },
              ],
            },
            {
              name: "languages",
              type: "array",
              label: "Sprachwahl",
              labels: { singular: "Sprache", plural: "Sprachen" },
              fields: [
                { name: "code", type: "text", label: "Kürzel", required: true },
                { name: "label", type: "text", label: "Name in der Sprache", required: true },
                { name: "href", type: "text", label: "Ziel", required: true },
              ],
            },
            {
              name: "helpline",
              type: "group",
              label: "Hilfetelefon in der Hilfeleiste",
              fields: [
                { name: "number", type: "text", label: "Nummer", required: true },
                { name: "suffix", type: "text", label: "Zusatz hinter der Nummer", admin: { description: "Zum Beispiel „, rund um die Uhr“. Erscheint nur auf breiten Bildschirmen." } },
              ],
            },
          ],
        },
        {
          label: "Postfächer",
          fields: [
            {
              name: "mailboxes",
              type: "group",
              label: "Postfächer des Arbeitskreises",
              admin: { description: "Werden auf der Kontaktseite angezeigt und für die Zustellung des Formulars genutzt." },
              fields: [
                {
                  name: "help",
                  type: "group",
                  label: "Sie suchen Hilfe",
                  fields: [
                    { name: "label", type: "text", label: "Bezeichnung", required: true },
                    { name: "email", type: "email", label: "E-Mail", required: true },
                  ],
                },
                {
                  name: "information",
                  type: "group",
                  label: "Sie möchten sich informieren",
                  fields: [
                    { name: "label", type: "text", label: "Bezeichnung", required: true },
                    { name: "email", type: "email", label: "E-Mail", required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Fuß",
          fields: [
            {
              name: "footer",
              type: "group",
              label: "Fußbereich",
              fields: [
                { name: "organisation", type: "text", label: "Name des Arbeitskreises", required: true },
                { name: "address", type: "richText", label: "Anschrift", editor: inlineEditor, required: true },
                { name: "emergency", type: "richText", label: "Notfallzeile", editor: inlineEditor, required: true },
                {
                  name: "serviceLinks",
                  type: "array",
                  label: "Links unter „Service“",
                  labels: { singular: "Link", plural: "Links" },
                  fields: [
                    { name: "label", type: "text", label: "Beschriftung", required: true },
                    { name: "href", type: "text", label: "Ziel", required: true },
                  ],
                },
                {
                  name: "legalLinks",
                  type: "array",
                  label: "Links unter „Rechtliches“",
                  labels: { singular: "Link", plural: "Links" },
                  fields: [
                    { name: "label", type: "text", label: "Beschriftung", required: true },
                    { name: "href", type: "text", label: "Ziel", required: true },
                  ],
                },
                { name: "fundingLabel", type: "text", label: "Text über dem Förderlogo" },
                { name: "fundingLogo", type: "upload", relationTo: "media", label: "Förderlogo" },
                { name: "fundingAlt", type: "textarea", label: "Bildbeschreibung des Förderlogos" },
                { name: "draftNote", type: "textarea", label: "Hinweis zum Entwurf", admin: { description: "Leer lassen, sobald die Website freigegeben ist." } },
              ],
            },
          ],
        },
      ],
    },
  ],
};
