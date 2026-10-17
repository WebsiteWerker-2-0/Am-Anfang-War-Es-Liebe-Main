"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TWO_FACTOR_COOKIE, TWO_FACTOR_MAX_AGE, TWO_FACTOR_PATH, createProof } from "@/lib/two-factor";
import { checkCode } from "@/lib/two-factor-codes";
import { currentLogin, deliverCode } from "@/lib/two-factor-login";

// Server-Aktionen der Seite: neuen Code anfordern, Code prüfen

export async function resendCode() {
  const { state } = await deliverCode(true);
  redirect(`${TWO_FACTOR_PATH}?versand=${state}`);
}

export async function verifyCode(formData: FormData) {
  const { payload, user, session } = await currentLogin();
  const result = checkCode(session, String(formData.get("code") ?? ""));
  if (result !== "ok") {
    payload.logger.warn(`Falscher oder abgelaufener Anmeldecode für Konto ${user.id} (${result})`);
    redirect(`${TWO_FACTOR_PATH}?fehler=${result}`);
  }
  (await cookies()).set(TWO_FACTOR_COOKIE, await createProof(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: TWO_FACTOR_MAX_AGE,
  });
  redirect("/backend");
}
