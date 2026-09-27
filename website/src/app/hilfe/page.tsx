import type { Metadata } from "next";
import band from "@/assets/illustrationen/band-07.jpg";
import { Anlaufstelle } from "@/components/Anlaufstelle";
import { Seitenkopf } from "@/components/Seitenkopf";
import { Telefon } from "@/components/Telefon";
import { gruppen, hauptstellen, hilfetelefon } from "@/content/anlaufstellen";

export const metadata: Metadata = {
  title: "Hilfe im Kreis Höxter",
  description: "Anlaufstellen bei häuslicher Gewalt im Kreis Höxter: Beratung, Schutzhaus, Polizei und Hilfetelefon.",
};

export default function HilfeSeite() {
  return (
    <>
      <Seitenkopf
        titel="Hilfe im Kreis Höxter"
        band={band}
        einleitung="Frauen und Kinder, die Gewalt erleben oder erlebt haben, können sich an diese Stellen wenden. Das gilt auch für alle, die Betroffenen helfen möchten."
      />

      <div className="wide stack-lg">
        <div className="notfall measure" role="note">
          <p>
            <strong>Sind Sie oder Ihre Kinder jetzt in Gefahr?</strong> Rufen Sie die Polizei.
          </p>
          <Telefon nummer="110" className="notfall__nummer" />
        </div>

        <div>
          <Anlaufstelle stelle={hilfetelefon} />
          {hauptstellen.map((s) => (
            <Anlaufstelle key={s.id} stelle={s} />
          ))}
        </div>

        <section className="anlaufstelle" aria-labelledby="spurensicherung">
          <h2 id="spurensicherung">Was sollen Sie nach einer Sexualstraftat tun, um Beweise zu sichern?</h2>
          <p className="measure">
            Im St. Ansgar Krankenhaus in Höxter können Frauen und Mädchen die Spuren einer Tat rund um die Uhr sichern
            lassen, auch ohne Anzeige und auf Wunsch anonym. Ob Sie Anzeige erstatten, können Sie später in Ruhe
            entscheiden. Die Untersuchung ist vertraulich und kostenlos.
          </p>
          <ol className="liste-schritte measure" style={{ marginBlockStart: "var(--space-5)" }}>
            <li>
              <span>
                <strong>Nicht waschen oder duschen</strong>, auch wenn es schwerfällt. Sonst gehen Spuren verloren.
              </span>
            </li>
            <li>
              <span>
                <strong>Kleidung trocken aufbewahren</strong>, am besten in einer Papiertüte, und mitbringen.
              </span>
            </li>
            <li>
              <span>
                <strong>So schnell wie möglich ins Krankenhaus</strong>, am besten innerhalb von 24 Stunden. Bei
                Verdacht auf K.-o.-Tropfen ist der Nachweis nur etwa 12 Stunden möglich. Melden Sie sich an der
                Pforte und fragen Sie nach der gynäkologischen Ambulanz.
              </span>
            </li>
          </ol>
          <dl className="daten">
            <dt>Untersuchungsstelle</dt>
            <dd>Klinikum Weser-Egge, St. Ansgar Krankenhaus Höxter, Gynäkologische Ambulanz</dd>
            <dt>Adresse</dt>
            <dd>Brenkhäuser Straße 71, 37671 Höxter</dd>
            <dt>Telefon</dt>
            <dd>
              <Telefon nummer="05271 660" />
            </dd>
          </dl>
          <p className="measure">
            Die gesicherten Spuren werden unter einer Chiffrenummer in der Rechtsmedizin aufbewahrt. Die Polizei kann
            erst darauf zugreifen, wenn Sie selbst Anzeige erstatten.
          </p>
        </section>

        <section className="anlaufstelle" aria-labelledby="selbst-tun">
          <h2 id="selbst-tun">Was können Sie für sich selbst tun?</h2>
          <div className="measure stack">
            <p>
              Viele Frauen fühlen sich nach erlebter Gewalt wie gelähmt. Trotzdem können Sie erste Schritte planen, so
              wie es für Sie sicher ist.
            </p>
            <ul className="liste-punkte">
              <li>
                <strong>Sprechen Sie mit einer Vertrauensperson</strong> oder einer Beratungsstelle, zum Beispiel mit
                Ihrer Ärztin, einer Nachbarin oder der Erzieherin Ihres Kindes.
              </li>
              <li>
                <strong>Packen Sie einen Notfallkoffer</strong>, wenn das gefahrlos möglich ist: Ausweis,
                Geburtsurkunde, Bankkarte, Krankenkarte, Impfpass, Verdienstnachweise und was Ihnen wichtig ist.
                Bewahren Sie ihn an einem sicheren Ort auf, etwa bei einer Vertrauensperson.
              </li>
              <li>
                <strong>Halten Sie fest, was passiert</strong>: Datum, Uhrzeit, was geschehen ist, Fotos von
                Verletzungen, ärztliche Atteste. Das hilft später bei Anträgen und Anzeigen.
              </li>
            </ul>
          </div>
        </section>

        <section className="anlaufstelle" aria-labelledby="stalking">
          <h2 id="stalking">Am Anfang war es Liebe, und am Ende ist es Stalking?</h2>
          <div className="measure stack">
            <p>
              Stalking hat mit Liebe nichts zu tun. Es geht um Überwachung und Macht, und es ist eine Straftat. Oft ist
              es der Ex-Partner, der auflauert, verfolgt, ständig anruft, Nachrichten oder „Liebesbeweise“ schickt.
            </p>
            <ul className="liste-punkte">
              <li>
                <strong>Erstatten Sie Anzeige bei der Polizei.</strong> Schnelles und konsequentes Einschreiten zeigt
                oft Wirkung.
              </li>
              <li>
                <strong>Beantragen Sie eine Schutzanordnung</strong> nach dem Gewaltschutzgesetz beim Amtsgericht. Die
                Frauenberatungsstelle unterstützt Sie dabei.
              </li>
              <li>
                <strong>Sammeln Sie Beweise</strong>: Nachrichten, Anrufliste, Briefe, Zeuginnen und Zeugen.
              </li>
            </ul>
          </div>
        </section>

        <section className="anlaufstelle" id="angehoerige" aria-labelledby="angehoerige-titel">
          <h2 id="angehoerige-titel">Was können Nachbarn, Angehörige und Freunde tun?</h2>
          <div className="measure stack">
            <p>
              Oft sind es die Nachbarin, die Freundin oder der Kollege, die als Erste etwas bemerken. Ihre Reaktion
              kann für die betroffene Frau der erste Schritt aus der Gewalt sein.
            </p>
            <dl className="stack">
              <div>
                <dt>
                  <strong>Sehen Sie hin.</strong>
                </dt>
                <dd>
                  Achten Sie auf Warnzeichen: Verletzungen, die versteckt werden, verändertes Verhalten, Rückzug.
                </dd>
              </div>
              <div>
                <dt>
                  <strong>Hören Sie zu.</strong>
                </dt>
                <dd>
                  Machen Sie keine Vorwürfe wie „Warum lässt du dir das gefallen?“. Hören Sie geduldig zu und weisen Sie
                  auf professionelle Hilfe hin.
                </dd>
              </div>
              <div>
                <dt>
                  <strong>Bieten Sie Hilfe an.</strong>
                </dt>
                <dd>
                  Schon der Satz „Sprich mich an, wenn ich etwas für dich tun kann“ zeigt, dass die Not gesehen wird.
                  Halten Sie wichtige Nummern bereit.
                </dd>
              </div>
              <div>
                <dt>
                  <strong>Holen Sie Hilfe, wenn Sie Gewalt miterleben.</strong>
                </dt>
                <dd>Rufen Sie die Polizei unter 110, ohne sich selbst in Gefahr zu bringen.</dd>
              </div>
              <div>
                <dt>
                  <strong>Respektieren Sie ihre Entscheidungen.</strong>
                </dt>
                <dd>
                  Nur die betroffene Frau kann entscheiden, welcher Schritt für sie richtig ist. Auch Sie selbst können
                  sich jederzeit kostenlos bei den Beratungsstellen Rat holen.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section aria-labelledby="weitere">
          <h2 id="weitere" style={{ marginBlockEnd: "var(--space-4)" }}>
            Weitere Anlaufstellen
          </h2>
          {gruppen.map((g) => (
            <details className="gruppe" key={g.titel}>
              <summary>{g.titel}</summary>
              <div className="gruppe__inhalt">
                {g.stellen.map((s) => (
                  <Anlaufstelle key={s.id} stelle={s} ebene={3} />
                ))}
              </div>
            </details>
          ))}
          <p className="small muted measure" style={{ marginBlockStart: "var(--space-5)" }}>
            Stand der Angaben: Übernahme von der bisherigen Website. Alle Nummern und Zeiten werden vor der
            Veröffentlichung geprüft.
          </p>
        </section>
      </div>
    </>
  );
}
