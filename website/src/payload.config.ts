import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { de } from "@payloadcms/translations/languages/de";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Courses } from "./cms/collections/Courses";
import { Media } from "./cms/collections/Media";
import { Posts } from "./cms/collections/Posts";
import { Registrations } from "./cms/collections/Registrations";
import { Mail } from "./cms/globals/Mail";
import { Users } from "./cms/collections/Users";
import { databaseUrl } from "./cms/env";
import { migrations } from "./migrations";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Redaktionsbereich unter /backend. Er ist von der Website aus nirgends verlinkt
// und für Suchmaschinen gesperrt (siehe next.config.ts). Konten gibt es nur nach
// Anlage durch eine Admin (docs/adr/0004-payload-cms-unter-backend.md).
export default buildConfig({
  // Ohne PAYLOAD_SECRET startet das Backend nicht, die öffentliche Website ist davon unabhängig.
  secret: process.env.PAYLOAD_SECRET || "",
  routes: { admin: "/backend", api: "/backend/api" },
  graphQL: { disable: true },
  admin: {
    user: Users.slug,
    dateFormat: "dd.MM.yyyy",
    meta: { titleSuffix: " – Redaktion Am Anfang war es Liebe" },
    components: {
      beforeDashboard: ["/cms/components/Dashboard#Dashboard"],
      graphics: { Logo: "/cms/components/Logo#Logo", Icon: "/cms/components/Logo#Icon" },
    },
    importMap: {
      baseDir: dirname,
      importMapFile: path.resolve(dirname, "app/(payload)/backend/importMap.js"),
    },
  },
  // Die Reihenfolge ist die Reihenfolge im Menü des Backends
  collections: [Posts, Courses, Registrations, Media, Users],
  globals: [Mail],
  editor: lexicalEditor(),
  i18n: { supportedLanguages: { de }, fallbackLanguage: "de" },
  // Nur gesetzt, wenn die Seite unter mehreren Adressen erreichbar ist und strenger geprüft werden soll
  csrf:
    process.env.CMS_CSRF_ORIGINS?.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean) ?? [],
  db: sqliteAdapter({
    client: { url: databaseUrl, authToken: process.env.DATABASE_AUTH_TOKEN },
    // Auf dem Server laufen die Migrationen beim Start, es gibt keinen Dev-Push
    prodMigrations: migrations,
  }),
  sharp,
  upload: { limits: { fileSize: 30_000_000 } },
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  async onInit(payload) {
    // Ein leeres CMS füllt sich beim ersten Start mit dem Inhalt der bisherigen Website
    if (process.env.CMS_SEED !== "false") {
      const { seedExistingContent } = await import("./cms/seed");
      await seedExistingContent(payload);
    }
  },
});
