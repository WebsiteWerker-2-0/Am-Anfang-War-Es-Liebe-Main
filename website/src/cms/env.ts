import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Speicherorte und Zugangsgeheimnis des CMS. Alles, was die Redaktion erzeugt
// (Datenbank, Uploads, Geheimnis), liegt unter dataDir und gehört nicht ins Git.
//
// Ohne Einstellungen läuft das CMS auf Hostinger sofort:
// - Daten:       ~/cms-data (außerhalb des App-Ordners, übersteht Deployments)
// - Geheimnis:   wird beim ersten Start erzeugt und in <Daten>/.secret gespeichert
// - Erstes Konto: erlaubt, solange die Datei <Daten>/ALLOW_FIRST_USER existiert
// Jede dieser Einstellungen lässt sich mit einer Umgebungsvariable übersteuern.
const isBuild = process.env.NEXT_PHASE === "phase-production-build";
const isVercel = Boolean(process.env.VERCEL);

function defaultDataDir() {
  if (isVercel) return "/tmp/cms-data"; // nur /tmp ist beschreibbar, die Daten sind dort flüchtig
  if (process.env.NODE_ENV === "production") return path.join(os.homedir(), "cms-data");
  return "./data";
}

export const dataDir = path.resolve(process.env.CMS_DATA_DIR || defaultDataDir());
export const uploadDir = path.join(dataDir, "uploads");

// SQLite-Datei (Standard) oder libSQL-Server (libsql://…) über DATABASE_URL.
export const databaseUrl = process.env.DATABASE_URL || `file:${path.join(dataDir, "payload.db")}`;

// Beim Bauen wird nichts angelegt: die Seiten entstehen dort aus dem Standardinhalt.
if (!isBuild) {
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
  } catch {
    // schreibgeschütztes Dateisystem: das CMS bleibt dann aus (siehe cmsSecret)
  }
}

let secret: string | undefined;

/** Geheimnis zum Signieren der Anmeldungen: Umgebungsvariable, sonst Datei im Datenordner (wird angelegt) */
export function cmsSecret(): string {
  if (process.env.PAYLOAD_SECRET) return process.env.PAYLOAD_SECRET;
  if (isBuild) return "";
  if (secret) return secret;
  const file = path.join(dataDir, ".secret");
  const read = () => {
    try {
      return fs.readFileSync(file, "utf8").trim();
    } catch {
      return "";
    }
  };
  secret = read();
  if (!secret) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
      // wx: legt nur an, wenn es die Datei noch nicht gibt (zwei Prozesse starten gleichzeitig)
      fs.writeFileSync(file, crypto.randomBytes(32).toString("hex"), { mode: 0o600, flag: "wx" });
    } catch {
      // schon von einem anderen Prozess angelegt oder nicht beschreibbar
    }
    secret = read();
  }
  return secret;
}

const firstUserFile = path.join(dataDir, "ALLOW_FIRST_USER");

/** Darf das erste Konto im Browser angelegt werden? Nur mit Umgebungsvariable oder Freigabedatei. */
export function firstUserAllowed(): boolean {
  return process.env.CMS_ALLOW_FIRST_USER === "true" || fs.existsSync(firstUserFile);
}

/** Die Freigabedatei gilt nur für das erste Konto und wird danach entfernt */
export function consumeFirstUserFlag() {
  try {
    fs.rmSync(firstUserFile, { force: true });
  } catch {
    // nichts zu entfernen
  }
}
