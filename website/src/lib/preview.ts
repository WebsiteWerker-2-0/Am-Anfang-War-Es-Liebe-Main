import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCms } from "./cms-client";
import { PAYLOAD_TOKEN_COOKIE, TWO_FACTOR_COOKIE, sessionKey, twoFactorEnabled, verifyProof } from "./two-factor";

// Vorschau für angemeldete Redakteurinnen: zeigt den gespeicherten Stand, auch Entwürfe und Archiviertes.
// Wer nicht angemeldet ist, landet auf der Startseite.
export async function requirePreviewCms() {
  const cms = await getCms();
  if (!cms) redirect("/");
  const { user } = await cms.auth({ headers: await headers() });
  if (!user) redirect("/");
  const jar = await cookies();
  if (twoFactorEnabled() && !(await verifyProof(jar.get(TWO_FACTOR_COOKIE)?.value, sessionKey(jar.get(PAYLOAD_TOKEN_COOKIE)?.value)))) {
    redirect("/");
  }
  return cms;
}
