import type { CollectionConfig } from "payload";
import { isAdmin, isAdminField } from "../access";
import { sendWelcomeMail } from "../welcome-mail";

// Redakteurinnen (F-05). Es gibt keine Registrierung: Konten legt eine Admin an,
// das allererste Konto wird über `npm run cms:create-admin` erzeugt.
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Redakteur:in", plural: "Redakteur:innen" },
  admin: {
    useAsTitle: "email",
    group: "Verwaltung",
    // Redakteurinnen sehen die Kontenverwaltung nicht; ihr eigenes Konto erreichen sie über das Symbol oben rechts
    hidden: ({ user }) => user?.role !== "admin",
    defaultColumns: ["name", "email", "role"],
    description:
      "Neues Konto: E-Mail-Adresse, Name, Rolle und ein beliebiges Passwort eintragen. Die Person bekommt eine E-Mail mit einem Link, über den sie ihr eigenes Passwort festlegt.",
  },
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    cookies: {
      // Strict: das Cookie wird nie bei Anfragen von fremden Seiten mitgeschickt (Schutz vor CSRF)
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    },
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: ({ req }) => {
      if (req.user?.role === "admin") return true;
      return req.user ? { id: { equals: req.user.id } } : false;
    },
    update: ({ req }) => {
      if (req.user?.role === "admin") return true;
      return req.user ? { id: { equals: req.user.id } } : false;
    },
  },
  endpoints: [
    {
      // Knopf „Zugangs-E-Mail senden“ (components/WelcomeMailButton.tsx)
      path: "/:id/zugang",
      method: "post",
      handler: async (req) => {
        if (req.user?.role !== "admin") return Response.json({ message: "Nur Admins dürfen das." }, { status: 403 });
        const user = await req.payload.findByID({ collection: "users", id: String(req.routeParams?.id), depth: 0, req }).catch(() => null);
        if (!user) return Response.json({ message: "Konto nicht gefunden." }, { status: 404 });
        const result = await sendWelcomeMail(req.payload, user, req);
        return result.ok
          ? Response.json({ message: `Zugangs-E-Mail an ${user.email} gesendet.` })
          : Response.json({ message: `Das Senden hat nicht geklappt: ${result.message}` }, { status: 502 });
      },
    },
  ],
  hooks: {
    afterChange: [
      // Neues Konto: Zugangs-E-Mail mit Link zum Backend. Scheitert der Versand, bleibt das Konto bestehen.
      async ({ doc, operation, req }) => {
        if (operation !== "create") return doc;
        const result = await sendWelcomeMail(req.payload, doc, req);
        if (!result.ok) req.payload.logger.warn(`Zugangs-E-Mail an ${doc.email} nicht gesendet: ${result.message}`);
        return doc;
      },
    ],
    beforeChange: [
      // Das erste Konto ist immer Admin, sonst könnte niemand weitere Konten anlegen.
      async ({ data, operation, req }) => {
        if (operation !== "create") return data;
        const { totalDocs } = await req.payload.count({ collection: "users", req });
        if (totalDocs === 0) data.role = "admin";
        return data;
      },
    ],
  },
  fields: [
    { name: "name", type: "text", label: "Name" },
    {
      name: "role",
      type: "select",
      label: "Rolle",
      required: true,
      defaultValue: "editor",
      saveToJWT: true,
      options: [
        { label: "Redaktion (Inhalte pflegen)", value: "editor" },
        { label: "Admin (zusätzlich Konten verwalten)", value: "admin" },
      ],
      access: { create: isAdminField, update: isAdminField },
    },
    {
      name: "welcomeMail",
      type: "ui",
      admin: {
        position: "sidebar",
        condition: (_data, _siblingData, { user }) => user?.role === "admin",
        components: { Field: "/cms/components/WelcomeMailButton#WelcomeMailButton" },
      },
    },
  ],
};
