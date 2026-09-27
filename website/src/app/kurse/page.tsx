import type { Metadata } from "next";
import band from "@/assets/illustrationen/band-06-b.jpg";
import { Seitenkopf } from "@/components/Seitenkopf";

export const metadata: Metadata = {
  title: "Selbstverteidigung und Selbstbehauptung",
  description: "Krav Maga und WenDo: Kurse für Frauen, Mädchen und Kinder im Kreis Höxter.",
};

export default function KurseSeite() {
  return (
    <>
      <Seitenkopf
        titel="Selbstverteidigung und Selbstbehauptung"
        band={band}
        einleitung="Mit einer Förderung des Landes NRW bietet der Arbeitskreis Kurse für Frauen, Mädchen und Kinder an. Wer weiß, wie man Grenzen setzt und sich wehrt, geht sicherer durchs Leben."
      />
      <div className="wide stack-lg">
        <div className="hinweis measure">
          <p>
            <strong>Termine 2026:</strong> folgen. Die Anmeldung ist künftig direkt hier auf der Website möglich.
          </p>
        </div>

        <section className="anlaufstelle" aria-labelledby="krav-maga">
          <h2 id="krav-maga">Krav Maga für Frauen, Mädchen und Kinder</h2>
          <div className="measure stack">
            <p>In Zusammenarbeit mit SAMI-X Krav Maga TC Höxter.</p>
            <p>
              Krav Maga ist ein modernes, einfaches Selbstverteidigungssystem. Es setzt auf natürliche Bewegungen und
              wirklichkeitsnahe Übungen und ist reine Selbstverteidigung, keine Kampfkunst. Alle Trainerinnen und
              Trainer sind zertifiziert.
            </p>
            <h3>Für Frauen und Mädchen ab 15 Jahren</h3>
            <p>
              Die Seminare bereiten auf bedrohliche Situationen und sexuelle Übergriffe vor. Sie lernen einfache,
              wirksame Techniken und wie Sie sich in Gefahrensituationen taktisch richtig verhalten. Auf Wunsch können
              Sie Situationen realitätsnah an einem Trainer in voller Schutzausrüstung üben.
            </p>
            <h3>Kids Krav Maga für 8- bis 13-Jährige</h3>
            <p>
              Fit und stark fürs Leben: Im Mittelpunkt stehen Freude an der Bewegung, Selbstbewusstsein und Grenzen
              setzen. Dazu gehören:
            </p>
            <ul className="liste-punkte">
              <li>Vorbeugen: Was kann ich tun, damit ich nicht in gefährliche Situationen gerate?</li>
              <li>Laut werden: schreien, Nein sagen</li>
              <li>Hilfe holen</li>
              <li>Abstand halten und weglaufen</li>
              <li>Situationen einschätzen: Was ist gut, was nicht?</li>
              <li>Hilfsmittel nutzen, etwa das Handy</li>
            </ul>
            <p>
              Mehr Informationen: <a href="https://www.kravmaga-hoexter.de" rel="noreferrer">kravmaga-hoexter.de</a>
            </p>
          </div>
        </section>

        <section className="anlaufstelle" aria-labelledby="wendo">
          <h2 id="wendo">WenDo für Frauen und Mädchen</h2>
          <div className="measure stack">
            <p>
              WenDo bedeutet „Weg der Frauen“. Es ist kein Kampfsport, sondern ein Programm zur Vorbeugung gegen
              Gewalt: Selbstbehauptung und Selbstverteidigung für Frauen und Mädchen.
            </p>
            <p>
              Die Kurse richten sich nach den Teilnehmerinnen und verbinden einfache Techniken mit Rollenspielen und
              Wahrnehmungsübungen. Sie lernen, bedrohliche Situationen früh zu erkennen, wenn möglich zu entschärfen
              und handlungsfähig zu bleiben.
            </p>
            <p>
              2019 hat der Arbeitskreis zehn WenDo-Kurse im ganzen Kreis angeboten, rund 120 Frauen und Mädchen haben
              teilgenommen.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
