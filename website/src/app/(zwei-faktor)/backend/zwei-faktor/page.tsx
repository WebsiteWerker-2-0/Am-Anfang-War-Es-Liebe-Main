import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TWO_FACTOR_COOKIE, twoFactorEnabled, verifyProof } from "@/lib/two-factor";
import { currentLogin, deliverCode, type SendState } from "@/lib/two-factor-login";
import { resendCode, verifyCode } from "./actions";

// Zweiter Schritt der Anmeldung: Code aus der E-Mail eingeben (siehe lib/two-factor.ts)
export const dynamic = "force-dynamic";

const errors: Record<string, string> = {
  wrong: "Der Code stimmt nicht. Bitte prüfen Sie die Ziffern.",
  expired: "Der Code ist abgelaufen. Bitte fordern Sie einen neuen an.",
  locked: "Zu viele falsche Versuche. Bitte fordern Sie einen neuen Code an.",
};

const sendMessages: Record<SendState, string> = {
  sent: "Wir haben Ihnen einen Code geschickt.",
  active: "Ihr Code ist unterwegs. Er gilt 10 Minuten.",
  wait: "Bitte warten Sie eine Minute, bevor Sie einen neuen Code anfordern.",
  hourly: "Es wurden zu viele Codes angefordert. Bitte versuchen Sie es in einer Stunde wieder.",
  "not-configured": "",
  failed: "Die E-Mail mit dem Code konnte nicht verschickt werden. Bitte wenden Sie sich an eine Admin.",
};

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  return `${name.slice(0, 2)}${"•".repeat(Math.max(1, name.length - 2))}@${domain}`;
}

export default async function TwoFactorPage({ searchParams }: PageProps<"/backend/zwei-faktor">) {
  if (!twoFactorEnabled()) redirect("/backend");
  const { user, session } = await currentLogin();
  if (await verifyProof((await cookies()).get(TWO_FACTOR_COOKIE)?.value, session)) redirect("/backend");

  const params = await searchParams;
  const error = typeof params.fehler === "string" ? errors[params.fehler] : undefined;
  // Beim ersten Aufruf geht der Code automatisch raus, danach nur auf Wunsch
  const sent = typeof params.versand === "string" ? { state: params.versand as SendState } : await deliverCode(false);

  if (sent.state === "not-configured") {
    return (
      <main className="tf__card">
        <h1>E-Mail-Versand fehlt</h1>
        <p>
          Für die Anmeldung schickt die Website einen Code per E-Mail. Der Versand ist noch nicht eingerichtet, deshalb ist eine
          Anmeldung gerade nicht möglich.
        </p>
        <p className="tf__muted">
          Für Website Werker: In hPanel die Umgebungsvariable <code>CMS_TWO_FACTOR=false</code> setzen, anmelden, unter
          „E-Mail und Anmeldungen“ das Postfach eintragen, Variable wieder entfernen.
        </p>
        <p className="tf__secondary">
          <Link href="/backend/logout" prefetch={false}>
            Abmelden
          </Link>
        </p>
      </main>
    );
  }

  const notice = sendMessages[sent.state as SendState];
  return (
    <main className="tf__card">
      <h1>Anmeldung bestätigen</h1>
      <p>
        Wir haben einen Code an <strong>{maskEmail(user.email)}</strong> geschickt. Geben Sie ihn hier ein.
      </p>
      {error && (
        <p className="tf__message tf__message--error" role="alert">
          {error}
        </p>
      )}
      {!error && notice && sent.state !== "active" && (
        <p className={`tf__message${sent.state === "failed" || sent.state === "hourly" ? " tf__message--error" : ""}`} role="status">
          {notice}
        </p>
      )}
      <form action={verifyCode}>
        <label htmlFor="code">Code aus der E-Mail</label>
        <input
          id="code"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9 ]{6,7}"
          maxLength={7}
          required
          autoFocus
        />
        <button type="submit" className="tf__primary">
          Bestätigen
        </button>
      </form>
      <div className="tf__secondary">
        <form action={resendCode}>
          <button type="submit" className="tf__link">
            Neuen Code senden
          </button>
        </form>
        <Link href="/backend/logout" prefetch={false}>
            Abmelden
          </Link>
      </div>
      <p className="tf__muted" style={{ marginBlockStart: 16 }}>
        Keine E-Mail? Schauen Sie auch im Spam-Ordner nach. Der Code gilt 10 Minuten.
      </p>
    </main>
  );
}
