import type { GlobalConfig } from "payload";
import { isAdmin } from "../access";
import { getMailSettings, sendMail } from "../../lib/mail";

// Wohin Kursanmeldungen gehen und wie die E-Mail verschickt wird. Nur Admins sehen diesen Bereich,
// weil hier das Passwort des Postfachs steht.
export const Mail: GlobalConfig = {
  slug: "mail",
  label: "E-Mail und Anmeldungen",
  admin: {
    group: "Verwaltung",
    hidden: ({ user }) => user?.role !== "admin",
    description:
      "Hier legen Sie fest, an welche Adresse Anmeldungen geschickt werden, und mit welchem Postfach die E-Mail verschickt wird.",
  },
  access: { read: isAdmin, update: isAdmin },
  endpoints: [
    {
      // Wird vom Knopf „Test-E-Mail senden“ aufgerufen
      path: "/test-mail",
      method: "post",
      handler: async (req) => {
        if (req.user?.role !== "admin") return Response.json({ message: "Nur Admins dürfen das." }, { status: 403 });
        const settings = await getMailSettings(req.payload);
        if (!settings.courseRecipient) {
          return Response.json({ message: "Bitte tragen Sie zuerst die Adresse für Anmeldungen ein und speichern Sie." }, { status: 400 });
        }
        const result = await sendMail(settings, {
          to: settings.courseRecipient,
          subject: "Test: E-Mail der Website Am Anfang war es Liebe",
          text: "Das ist eine Test-E-Mail. Wenn Sie sie lesen, werden Anmeldungen an diese Adresse zugestellt.",
        });
        return result.ok
          ? Response.json({ message: `Test-E-Mail an ${settings.courseRecipient} gesendet. Bitte prüfen Sie das Postfach.` })
          : Response.json({ message: `Das Senden hat nicht geklappt: ${result.message}` }, { status: 502 });
      },
    },
  ],
  fields: [
    {
      name: "courseRecipient",
      type: "email",
      label: "Anmeldungen gehen an diese E-Mail-Adresse",
      admin: { description: "Zu jeder Anmeldung erhält diese Adresse eine E-Mail mit Name, Kontakt und Kurs." },
    },
    {
      type: "collapsible",
      label: "Postfach für den Versand (Zugangsdaten)",
      admin: { initCollapsed: false },
      fields: [
        {
          name: "smtpHost",
          type: "text",
          label: "Server (SMTP)",
          admin: { description: "Bei Hostinger zum Beispiel smtp.hostinger.com. Die Angaben stehen beim E-Mail-Postfach in hPanel." },
        },
        {
          type: "row",
          fields: [
            { name: "smtpPort", type: "number", label: "Port", defaultValue: 465, admin: { width: "50%" } },
            { name: "smtpSecure", type: "checkbox", label: "Verschlüsselt (SSL)", defaultValue: true, admin: { width: "50%" } },
          ],
        },
        { name: "smtpUser", type: "text", label: "Benutzername (meist die E-Mail-Adresse des Postfachs)" },
        { name: "smtpPassword", type: "text", label: "Passwort des Postfachs", admin: { description: "Nur Admins sehen dieses Feld." } },
        {
          type: "row",
          fields: [
            { name: "fromAddress", type: "email", label: "Absenderadresse", admin: { width: "50%", description: "Leer: Benutzername." } },
            { name: "fromName", type: "text", label: "Absendername", defaultValue: "Website Am Anfang war es Liebe", admin: { width: "50%" } },
          ],
        },
      ],
    },
    { name: "testMail", type: "ui", admin: { components: { Field: "/cms/components/TestMailButton#TestMailButton" } } },
  ],
};
