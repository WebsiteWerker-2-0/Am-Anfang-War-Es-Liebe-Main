import type { PageData } from "../model";

export const courses: PageData = {
  slug: "kurse",
  title: "Selbstverteidigung und Selbstbehauptung",
  description: "Krav Maga und WenDo: Kurse für Frauen, Mädchen und Kinder im Kreis Höxter.",
  intro:
    "Mit einer Förderung des Landes NRW bietet der Arbeitskreis Kurse für Frauen, Mädchen und Kinder an. Wer weiß, wie man Grenzen setzt und sich wehrt, geht sicherer durchs Leben.",
  band: "courses",
  layout: "stack-lg",
  blocks: [
    {
      blockType: "courseList",
      anchor: "termine",
      heading: "Termine und Anmeldung",
      emptyNotice: `<p><strong>Termine 2026:</strong> folgen. Die Anmeldung ist künftig direkt hier auf der Website möglich.</p>`,
    },
    {
      blockType: "section",
      variant: "service",
      anchor: "krav-maga",
      heading: "Krav Maga für Frauen, Mädchen und Kinder",
      items: [
        {
          blockType: "rich",
          content: `<p>In Zusammenarbeit mit SAMI-X Krav Maga TC Höxter.</p>
<p>Krav Maga ist ein modernes, einfaches Selbstverteidigungssystem. Es setzt auf natürliche Bewegungen und wirklichkeitsnahe Übungen und ist reine Selbstverteidigung, keine Kampfkunst. Alle Trainerinnen und Trainer sind zertifiziert.</p>
<h3>Für Frauen und Mädchen ab 15 Jahren</h3>
<p>Die Kurse bereiten auf bedrohliche Situationen und sexuelle Übergriffe vor. Sie lernen einfache, wirksame Techniken und wie Sie sich in Gefahrensituationen taktisch richtig verhalten. Auf Wunsch können Sie Situationen realitätsnah an einem Trainer in voller Schutzausrüstung üben.</p>
<h3>Kids Krav Maga für 8- bis 13-Jährige</h3>
<p>Fit und stark fürs Leben: Im Mittelpunkt stehen Freude an der Bewegung, Selbstbewusstsein und Grenzen setzen. Dazu gehören:</p>
<ul><li>Vorbeugen: Was kann ich tun, damit ich nicht in gefährliche Situationen gerate?</li><li>Laut werden: schreien, Nein sagen</li><li>Hilfe holen</li><li>Abstand halten und weglaufen</li><li>Situationen einschätzen: Was ist gut, was nicht?</li><li>Hilfsmittel nutzen, etwa das Handy</li></ul>
<p>Mehr Informationen: <a href="https://www.kravmaga-hoexter.de">kravmaga-hoexter.de</a></p>`,
        },
      ],
    },
    {
      blockType: "section",
      variant: "service",
      anchor: "wendo",
      heading: "WenDo für Frauen und Mädchen",
      items: [
        {
          blockType: "rich",
          content: `<p>WenDo ist feministische Selbstbehauptung und Selbstverteidigung für Frauen und Mädchen. Der Name setzt sich zusammen aus „Wen“ für das englische „women“ (Frauen) und dem japanischen „Do“ (Weg) und bedeutet „Weg der Frauen“. WenDo ist kein Kampfsport, sondern ein Programm zur Vorbeugung gegen Gewalt.</p>
<p>Anders als im klassischen Kampfsport geht es im Training auch um gesellschaftliche Machtverhältnisse und um erlernte Rollenbilder. Die Kurse stärken die Teilnehmerinnen und zeigen Möglichkeiten für ein selbstbestimmtes Leben.</p>
<p>Die Kurse richten sich nach den Bedürfnissen der Teilnehmerinnen und verbinden wirksame Techniken mit Rollenspielen und Wahrnehmungsübungen. Ein Schwerpunkt: Konflikte, Übergriffe und Gewaltsituationen früh erkennen, wenn möglich entschärfen und handlungsfähig bleiben, um die eigene Unversehrtheit zu schützen.</p>
<p>2019 hat der Arbeitskreis zehn WenDo-Kurse im ganzen Kreis angeboten, rund 120 Frauen und Mädchen haben teilgenommen.</p>`,
        },
      ],
    },
  ],
};
