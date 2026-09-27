import type { Metadata } from "next";
import Link from "next/link";
import { Seitenkopf } from "@/components/Seitenkopf";
import { Selbstcheck } from "@/components/Selbstcheck";
import { Telefon } from "@/components/Telefon";
import { aussagen } from "@/content/selbstcheck";

export const metadata: Metadata = {
  title: "Selbstcheck",
  description: "Gewalt hat viele Gesichter. Hinterfragen Sie Ihre Situation in Ruhe, nichts wird gespeichert.",
};

export default function SelbstcheckSeite() {
  return (
    <>
      <Seitenkopf
        titel="Selbstcheck: Gewalt hat viele Gesichter"
        einleitung="Manchmal ist es schwer zu sagen, ob das, was man erlebt, schon Gewalt ist. Lesen Sie die Sätze in Ruhe und kreuzen Sie an, was auf Sie zutrifft."
      />
      <div className="wide stack-lg">
        <p className="hinweis measure">
          <strong>Ihr Selbstcheck wird nicht gespeichert.</strong> Ihre Antworten bleiben in diesem Fenster und werden
          nirgendwohin gesendet. Wenn Sie die Seite verlassen, sind sie weg.
        </p>

        <div className="measure">
          <Selbstcheck aussagen={aussagen} />
        </div>

        <section className="measure stack" aria-labelledby="bedeutung">
          <h2 id="bedeutung">Was bedeutet das?</h2>
          <p>
            <strong>
              Jede dieser Verhaltensweisen ist Gewalt, ob körperlich, seelisch, sexuell oder wirtschaftlich.
            </strong>{" "}
            Sie verletzt Ihre Würde, macht abhängig und kann seelisch und körperlich krank machen. Häusliche Gewalt
            betrifft immer auch die Kinder.
          </p>
          <p>
            Sie sind damit nicht allein. Frauen aus allen Schichten, jedem Alter, allen Religionen und Kulturen erleben
            Gewalt. Viele schweigen lange aus Scham oder weil sie glauben, selbst schuld zu sein. Das sind Sie nicht.
          </p>
          <p>Sie haben ein Recht auf Respekt, Wertschätzung und ein Leben ohne Gewalt.</p>
        </section>

        <section className="measure stack" aria-labelledby="weiter">
          <h2 id="weiter">Wie kann es weitergehen?</h2>
          <p>
            Sprechen Sie mit jemandem darüber. Das Hilfetelefon ist rund um die Uhr für Sie da, anonym und kostenlos:{" "}
            <Telefon nummer="116 016" />.
          </p>
          <p>
            <Link href="/hilfe" className="button">
              Anlaufstellen im Kreis Höxter
            </Link>
          </p>
          <p className="small muted">
            Möchten Sie Ihre Spuren im Browser löschen? <Link href="/internetspuren">So geht es.</Link>
          </p>
        </section>
      </div>
    </>
  );
}
