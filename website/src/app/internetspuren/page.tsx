import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Internetspuren löschen",
  description: "So verlassen Sie diese Seite schnell und löschen Ihren Browserverlauf.",
};

// OFFEN: Anleitungen vor Livegang gegen aktuelle Browserversionen prüfen
export default function BrowsingTracesPage() {
  return (
    <>
      <PageHeader
        title="Internetspuren löschen"
        intro="Wenn Sie nicht möchten, dass jemand sieht, dass Sie auf dieser Seite waren, helfen diese Schritte."
      />
      <div className="wide stack-lg">
        <section className="measure stack" aria-labelledby="notausgang">
          <h2 id="notausgang">Seite schnell verlassen</h2>
          <p>
            Oben auf jeder Seite und auf dem Handy unten rechts finden Sie den Knopf <strong>„Seite verlassen“</strong>.
            Er bringt Sie sofort zu einer Wettervorhersage bei Google. Mit der Tastatur geht es noch schneller:
            Drücken Sie <strong>zweimal kurz hintereinander die Esc-Taste</strong>.
          </p>
          <p className="notice">
            Wichtig: Der Knopf ersetzt nur die aktuelle Seite. Andere Seiten dieser Website, die Sie vorher angesehen
            haben, stehen weiter im Verlauf. Löschen Sie deshalb danach Ihren Verlauf, wie unten beschrieben.
          </p>
        </section>

        <section className="measure stack" aria-labelledby="privat">
          <h2 id="privat">Am besten: privates Fenster nutzen</h2>
          <p>
            In einem privaten Fenster speichert der Browser keinen Verlauf. Sobald Sie es schließen, sind die Spuren
            weg.
          </p>
          <ul className="list-bullets">
            <li>Chrome und Edge: Strg + Umschalt + N (Mac: Cmd + Umschalt + N)</li>
            <li>Firefox: Strg + Umschalt + P (Mac: Cmd + Umschalt + P)</li>
            <li>Safari auf dem Mac: Cmd + Umschalt + N</li>
            <li>Auf dem Handy: im Browser-Menü „Neuer Inkognito-Tab“ oder „Privat“ wählen</li>
          </ul>
        </section>

        <section className="measure stack" aria-labelledby="loeschen">
          <h2 id="loeschen">Verlauf nachträglich löschen</h2>
          <h3>Chrome, Edge und Firefox am Computer</h3>
          <ol className="list-steps">
            <li>
              <span>Drücken Sie Strg + Umschalt + Entf (Mac: Cmd + Umschalt + Entf).</span>
            </li>
            <li>
              <span>Wählen Sie als Zeitraum „Gesamte Zeit“ oder „Letzte Stunde“.</span>
            </li>
            <li>
              <span>Setzen Sie Haken bei Verlauf, Cookies und zwischengespeicherten Dateien und bestätigen Sie.</span>
            </li>
          </ol>
          <h3>Safari am Mac</h3>
          <ol className="list-steps">
            <li>
              <span>Öffnen Sie oben im Menü „Verlauf“ und wählen Sie „Verlauf löschen …“.</span>
            </li>
            <li>
              <span>Wählen Sie den Zeitraum und klicken Sie auf „Verlauf löschen“.</span>
            </li>
          </ol>
          <h3>iPhone und iPad</h3>
          <ol className="list-steps">
            <li>
              <span>Öffnen Sie die Einstellungen und dann Apps, Safari.</span>
            </li>
            <li>
              <span>Tippen Sie auf „Verlauf und Websitedaten löschen“.</span>
            </li>
          </ol>
          <h3>Android mit Chrome</h3>
          <ol className="list-steps">
            <li>
              <span>Tippen Sie oben rechts auf die drei Punkte und dann auf „Verlauf“.</span>
            </li>
            <li>
              <span>Tippen Sie auf „Browserdaten löschen“, wählen Sie den Zeitraum und bestätigen Sie.</span>
            </li>
          </ol>
        </section>

        <section className="measure stack" aria-labelledby="mehr">
          <h2 id="mehr">Was Sie außerdem bedenken sollten</h2>
          <ul className="list-bullets">
            <li>Anrufe bei Beratungsstellen stehen in der Anrufliste Ihres Telefons. Löschen Sie sie bei Bedarf.</li>
            <li>
              Ein gemeinsam genutzter Computer oder ein Handy, zu dem jemand anderes das Passwort kennt, ist nicht
              sicher. Nutzen Sie wenn möglich das Gerät einer Vertrauensperson.
            </li>
            <li>
              Wenn Sie vermuten, dass Ihr Handy überwacht wird, sprechen Sie die Frauenberatungsstelle darauf an.
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
