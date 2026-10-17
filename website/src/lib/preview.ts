import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCms } from "./cms-client";

// Vorschau für angemeldete Redakteurinnen: zeigt den gespeicherten Stand, auch Entwürfe und Archiviertes.
// Wer nicht angemeldet ist, landet auf der Startseite.
export async function requirePreviewCms() {
  const cms = await getCms();
  if (!cms) redirect("/");
  const { user } = await cms.auth({ headers: await headers() });
  if (!user) redirect("/");
  return cms;
}
