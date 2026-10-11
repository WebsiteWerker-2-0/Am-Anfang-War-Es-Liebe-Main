import type { Access, FieldAccess } from "payload";

// Zugriffsregeln des CMS. Rollen: admin (verwaltet auch Redakteurinnen) und editor.
export const isLoggedIn: Access = ({ req }) => Boolean(req.user);

export const isAdmin: Access = ({ req }) => req.user?.role === "admin";

export const isAdminField: FieldAccess = ({ req }) => req.user?.role === "admin";

// Besucherinnen sehen nur Veröffentlichtes, Redaktion sieht alles (auch Entwürfe und Archiv).
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true;
  return { status: { equals: "published" } };
};
