import config from "@payload-config";
import { getPayload } from "payload";

// npm run cms:create-admin – legt ein Konto mit Rolle „admin“ an.
// Zugangsdaten werden nur für diesen Aufruf übergeben und nirgends gespeichert:
//   ADMIN_EMAIL=… ADMIN_PASSWORD=… npm run cms:create-admin
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) {
  console.error("ADMIN_EMAIL und ADMIN_PASSWORD müssen gesetzt sein.");
  process.exit(1);
}
if (password.length < 12) {
  console.error("Das Passwort muss mindestens 12 Zeichen lang sein.");
  process.exit(1);
}

const payload = await getPayload({ config });
await payload.create({ collection: "users", data: { email, password, role: "admin" } });
console.log(`Admin-Konto für ${email} angelegt.`);
process.exit(0);
