import { revalidatePath } from "next/cache";

// Nach jeder Änderung im Backend die öffentlichen Seiten neu erzeugen lassen,
// damit sie sofort den neuen Stand zeigen. Außerhalb von Next.js (Skripte, Seeding)
// gibt es keinen Cache, dort ist der Aufruf wirkungslos.
export function revalidateSite() {
  try {
    revalidatePath("/", "layout");
  } catch {
    // kein Next.js-Kontext
  }
}
