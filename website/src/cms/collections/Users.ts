import type { CollectionConfig } from "payload";
import { isAdmin, isAdminField } from "../access";

// Redakteurinnen (F-05). Es gibt keine Registrierung: Konten legt eine Admin an,
// das allererste Konto wird über `npm run cms:create-admin` erzeugt.
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Redakteur:in", plural: "Redakteur:innen" },
  admin: {
    useAsTitle: "email",
    group: "Verwaltung",
    defaultColumns: ["name", "email", "role"],
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
  hooks: {
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
  ],
};
