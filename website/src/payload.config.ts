import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { de } from "@payloadcms/translations/languages/de";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Events } from "./cms/collections/Events";
import { Media } from "./cms/collections/Media";
import { Pages } from "./cms/collections/Pages";
import { Posts } from "./cms/collections/Posts";
import { Services } from "./cms/collections/Services";
import { Site } from "./cms/globals/Site";
import { Users } from "./cms/collections/Users";
import { cmsSecret, databaseUrl } from "./cms/env";
import { migrations } from "./migrations";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Redaktionsbereich unter /backend. Er ist von der Website aus nirgends verlinkt
// und für Suchmaschinen gesperrt (siehe next.config.ts). Konten gibt es nur nach
// Anlage durch eine Admin (docs/adr/0004-payload-cms-unter-backend.md).
export default buildConfig({
  // Umgebungsvariable PAYLOAD_SECRET oder ein beim ersten Start erzeugtes Geheimnis (src/cms/env.ts)
  secret: cmsSecret(),
  routes: { admin: "/backend", api: "/backend/api" },
  graphQL: { disable: true },
  admin: {
    user: Users.slug,
    dateFormat: "dd.MM.yyyy",
    meta: { titleSuffix: " – Redaktion Am Anfang war es Liebe" },
    components: { graphics: { Logo: "/cms/components/Logo#Logo", Icon: "/cms/components/Logo#Icon" } },
    importMap: {
      baseDir: dirname,
      importMapFile: path.resolve(dirname, "app/(payload)/backend/importMap.js"),
    },
  },
  collections: [Pages, Posts, Events, Services, Media, Users],
  globals: [Site],
  editor: lexicalEditor(),
  i18n: { supportedLanguages: { de }, fallbackLanguage: "de" },
  // Nur gesetzt, wenn die Seite unter mehreren Adressen erreichbar ist und strenger geprüft werden soll
  csrf: process.env.CMS_CSRF_ORIGINS?.split(",").map((origin) => origin.trim()).filter(Boolean) ?? [],
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
