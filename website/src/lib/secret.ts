import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

// Verschlüsselung für Zugangsdaten, die die Website im Klartext braucht (Passwort des Postfachs).
// Ein Hash ginge nicht, denn zum Versand muss das Passwort wieder lesbar sein. Schlüssel aus PAYLOAD_SECRET:
// Wer nur die Datenbank hat, kann das Passwort nicht lesen. Ändert sich PAYLOAD_SECRET, muss es neu eingetragen werden.

const PREFIX = "enc:v1:";

const key = () => createHash("sha256").update(`postfach:${process.env.PAYLOAD_SECRET ?? ""}`).digest();

export const isEncrypted = (value: unknown): value is string => typeof value === "string" && value.startsWith(PREFIX);

export function encryptSecret(plain: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const data = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return `${PREFIX}${iv.toString("base64")}:${cipher.getAuthTag().toString("base64")}:${data.toString("base64")}`;
}

/** Entschlüsselt; ältere, unverschlüsselt gespeicherte Werte kommen unverändert zurück */
export function decryptSecret(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  if (!isEncrypted(value)) return value;
  try {
    const [iv, tag, data] = value.slice(PREFIX.length).split(":").map((part) => Buffer.from(part, "base64"));
    const decipher = createDecipheriv("aes-256-gcm", key(), iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
  } catch {
    return undefined;
  }
}
