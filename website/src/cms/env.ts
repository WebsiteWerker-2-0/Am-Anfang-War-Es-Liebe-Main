import fs from "node:fs";
import path from "node:path";

// Speicherorte des CMS. Alles, was die Redaktion erzeugt (Datenbank, Uploads),
// liegt unter CMS_DATA_DIR und gehört nicht ins Git.
//
// Hostinger: CMS_DATA_DIR auf einen absoluten Pfad außerhalb des Deploy-Ordners
// setzen, damit ein neues Deployment die Daten nicht überschreibt.
// Vercel: nur /tmp ist beschreibbar, die Daten sind dort flüchtig (nur Vorschau).
const isVercel = Boolean(process.env.VERCEL);

export const dataDir = path.resolve(process.env.CMS_DATA_DIR || (isVercel ? "/tmp/cms-data" : "./data"));
export const uploadDir = path.join(dataDir, "uploads");

// SQLite-Datei (Standard) oder libSQL-Server (libsql://…) über DATABASE_URL.
export const databaseUrl = process.env.DATABASE_URL || `file:${path.join(dataDir, "payload.db")}`;

try {
  fs.mkdirSync(uploadDir, { recursive: true });
} catch {
  // Beim Build oder auf schreibgeschütztem Dateisystem nicht kritisch
}
