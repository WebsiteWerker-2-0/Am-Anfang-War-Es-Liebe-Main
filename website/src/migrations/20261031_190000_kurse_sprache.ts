import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// Nur Daten (Entscheidung Steffen 31.10.2026): Kurse Krav Maga und Wendo sprachlich vereinheitlicht und korrigiert
//  - Schreibweisen: Wendo (wie Wikipedia), KMC Höxter, Kurse statt Seminare, deutsche Anführungszeichen
//  - Rechtschreibung und Grammatik (heißt, zu Hilfe eilen, 8- bis 13-Jährige, unvollständige Sätze)
// Ändert nur genau diese Stellen im Eintrag im Backend; was die Redaktion sonst geändert hat, bleibt.
// Leerzeichen dürfen auch geschützte Leerzeichen sein (kommen aus dem Word-Dokument).
// Schon geänderte Stellen werden übersprungen, die Migration lässt sich also gefahrlos wiederholen.

export const REPLACEMENTS: [string, string][] = [
  ['In Zusammenarbeit mit SAMI-X Krav Maga -TC Höxter bietet der Arbeitskreis im Rahmen einer Förderung des Landes NRW folgende Seminare an:', 'In Zusammenarbeit mit SAMI-X Krav Maga TC Höxter (KMC Höxter) bietet der Arbeitskreis im Rahmen einer Förderung des Landes NRW folgende Kurse an:'],
  ['Krav Maga Selbstverteidigung von Frauen und Mädchen ab 15 Jahren und', 'Krav-Maga-Selbstverteidigung für Frauen und Mädchen ab 15 Jahren'],
  ['Krav Maga Selbstverteidigung von Frauen und Mädchen ab 15 Jahren', 'Krav-Maga-Selbstverteidigung für Frauen und Mädchen ab 15 Jahren'],
  ['So heisst es auf der Internetseite des SAMI-X-Krav Maga- TC Höxter:', 'So heißt es auf der Internetseite von KMC Höxter:'],
  ['Krav Maga Concept bedeutet auf hebräisch “Kontaktkampf”.', 'Krav Maga bedeutet auf Hebräisch „Kontaktkampf“.'],
  ['so dass ein Jeder eine Notsituation erkennen, sicher und unverletzt überstehen oder ggf. anderen effektiv zur Hilfe eilen kann.', 'sodass jede und jeder eine Notsituation erkennen, sicher und unverletzt überstehen oder ggf. anderen effektiv zu Hilfe eilen kann.'],
  ['Das System beruht auf der natürlichen “Kampf-oder-Flucht” Reaktion, die Idee ist, schnell', 'Das System beruht auf der natürlichen „Kampf-oder-Flucht-Reaktion“. Die Idee ist, schnell'],
  ['KMC-Höxter', 'KMC Höxter'],
  ['Personen, welche zuvor mit dem Gesetz (Gewaltdelikte) der Bundesrepublik Deutschland in Konflikt geraten sind,', 'Personen, die zuvor wegen Gewaltdelikten mit dem Gesetz in Konflikt geraten sind,'],
  ['Diese Seminare im Rahmen des Selbstverteidigungstrainings sollen', 'Diese Kurse sollen'],
  ['anderen effektiv zur Hilfe zu eilen.', 'anderen effektiv zu Hilfe zu eilen.'],
  ['in Gefahrensituationen, soll Frauen', 'in Gefahrensituationen soll Frauen'],
  ['sehr realitätsnah, d.h. an einem Trainer', 'sehr realitätsnah, d. h. an einem Trainer'],
  ['Fit und stark fürs Leben!  ', 'Fit und stark fürs Leben! '],
  ['Das unter pädagogischen Richtlinien ausgearbeitete Konzept für Kinder- und Jugendselbstverteidigung für 8- bis 13-jährige wird einerseits in laufenden Kursen im Trainingscenter von KMC Höxter, andererseits auch als Workshops vermittelt.', 'Das nach pädagogischen Richtlinien ausgearbeitete Konzept zur Selbstverteidigung für Kinder und Jugendliche von 8 bis 13 Jahren wird einerseits in laufenden Kursen im Trainingscenter von KMC Höxter, andererseits in Workshops vermittelt.'],
  ['Hauptfokus liegt dabei auf Freude an der Bewegung, Spaß und Spiel sowie der Thematik der Selbstbehauptung und Selbstverteidigung als Selbstverständlichkeit in das Leben der Kinder und Jugendlichen zu integrieren.', 'Im Mittelpunkt stehen dabei die Freude an der Bewegung, Spaß und Spiel. Selbstbehauptung und Selbstverteidigung sollen zu einer Selbstverständlichkeit im Leben der Kinder und Jugendlichen werden.'],
  ['Grenzen setzen können und viel Know-How im Bereich persönliche Sicherheit', 'Grenzen setzen können und viel Know-how zur persönlichen Sicherheit'],
  ['Hier handelt es sich um einfache Abwehr- und Befreiungstechniken, Bewegungsmuster, Schlag- und Tritttechniken uvm.', 'Vermittelt werden einfache Abwehr- und Befreiungstechniken, Bewegungsmuster, Schlag- und Tritttechniken und vieles mehr.'],
  ['Zudem Teil des Unterrichts:', 'Außerdem gehören zum Unterricht:'],
  ['damit ich nicht in gefährliche Situationen gerate),', 'damit ich nicht in gefährliche Situationen gerate)'],
  ['verbale Mittel (schreien, nein sagen),', 'verbale Mittel (schreien, Nein sagen)'],
  ['Hilfe organisieren,', 'Hilfe organisieren'],
  ['Taktik (Beweglichkeit, Flucht-Prinzip, Distanzen),', 'Taktik (Beweglichkeit, Fluchtprinzip, Distanzen)'],
  ['(was ist gut, was ist nicht gut),', '(was ist gut, was ist nicht gut)'],
  ['Hilfsmittel einsetzen (Handy, Alltagsgegenstände) etc.', 'Hilfsmittel einsetzen (Handy, Alltagsgegenstände)'],
  ['Was ist „Wen Do“?', 'Was ist Wendo?'],
  ['Wen Do ist eine feministische', 'Wendo ist eine feministische'],
  ['Wen Do zählt sich nicht', 'Wendo zählt sich nicht'],
  ['Wendo Kurse vermitteln einen Mädchen- und Frauenbezogenen Standpunkt, der sich u. a. mit feministischer Gesellschaftsanalyse und -kritik sowie in einer feministischen, gendersensiblen Sprache manifestiert.', 'Wendo-Kurse vermitteln einen mädchen- und frauenbezogenen Standpunkt, der sich u. a. in feministischer Gesellschaftsanalyse und -kritik sowie in einer feministischen, gendersensiblen Sprache zeigt.'],
  ['Wendo hat zum Ziel die Prävention und das Empowerment sowie die Stärkung der Teilnehmenden zu verbessern und Möglichkeiten', 'Wendo hat zum Ziel, Prävention und Empowerment zu fördern, die Teilnehmenden zu stärken und Möglichkeiten'],
  ['Ein Fokus liegt auch im Umgang mit als bedrohlich wahrgenommenen Situationen umzugehen', 'Ein Schwerpunkt liegt auch darauf, mit als bedrohlich wahrgenommenen Situationen umzugehen'],
  ['Der Wen Do-Kurs orientiert sich nach den Bedürfnissen', 'Der Wendo-Kurs orientiert sich an den Bedürfnissen'],
  ['Ein Schwerpunkt liegt darin, mögliche', 'Ein weiterer Schwerpunkt liegt darauf, mögliche'],
  ['Text nach dem Artikel ', 'Sprachlich bearbeiteter Text nach dem Artikel '],
]

const TITLES: Record<string, [string, string]> = {
  'krav-maga': ['Krav Maga/ Kids Krav Maga', 'Krav Maga und Kids Krav Maga'],
  'wen-do': ['Wen Do', 'Wendo'],
}

type Node = { text?: string; children?: Node[]; [key: string]: unknown }

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const pattern = (from: string) => new RegExp(from.split(' ').map(escape).join('[ \u00a0]+'), 'g')

function replaceText(node: Node): boolean {
  let changed = false
  if (typeof node.text === 'string') {
    for (const [from, to] of REPLACEMENTS) {
      if (to.includes(from) && node.text.includes(to)) continue
      const next = node.text.replace(pattern(from), to)
      if (next !== node.text) {
        node.text = next
        changed = true
      }
    }
  }
  for (const child of node.children ?? []) changed = replaceText(child) || changed
  return changed
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const { docs } = await payload.find({
    collection: 'course-offers',
    where: { slug: { in: Object.keys(TITLES) } },
    depth: 0,
    limit: 10,
    pagination: false,
    req,
  })

  for (const doc of docs) {
    const content = structuredClone(doc.content) as { root: Node } | null
    const data: { content?: never; title?: string } = {}
    if (content && replaceText(content.root)) data.content = content as never
    const [oldTitle, newTitle] = TITLES[doc.slug as string] ?? []
    if (oldTitle && doc.title === oldTitle) data.title = newTitle

    if (Object.keys(data).length) {
      await payload.update({ collection: 'course-offers', id: doc.id, data, req })
      payload.logger.info(`Kurs ${doc.slug}: Sprache vereinheitlicht.`)
    }
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Keine Rücknahme: frühere Fassungen stehen im Backend unter „Versionen“
  payload.logger.info('kurse_sprache: keine Rücknahme')
}
