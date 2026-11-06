import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// Nur Daten (Rückmeldung der Frauenberatungsstelle vom 06.11.2026): Kurs Krav Maga
//  - Kurstitel einheitlich „Krav Maga: Selbstverteidigung …“ und „Kids Krav Maga: Selbstverteidigung …“,
//    in der Aufzählung oben und in den Zwischenüberschriften (Vorschlag „Krav Maga - Selbstverteidigung“,
//    Doppelpunkt statt Bindestrich)
//  - Satz zu den laufenden Kursen und Workshops entfernt: Das sind Angebote von KMC Höxter, nicht des Arbeitskreises
// Ändert nur genau diese Stellen im Eintrag im Backend; was die Redaktion sonst geändert hat, bleibt.
// Leerzeichen dürfen auch geschützte Leerzeichen sein. Wiederholbar ohne Wirkung.

const WOMEN = 'Krav Maga: Selbstverteidigung für Frauen und Mädchen ab 15 Jahren'
const KIDS = 'Kids Krav Maga: Selbstverteidigung für Kinder im Alter von 8 bis 13 Jahren'

export const REPLACEMENTS: [string, string][] = [
  ['Krav-Maga-Selbstverteidigung für Frauen und Mädchen ab 15 Jahren', WOMEN],
  ['Kids Krav Maga für Kinder im Alter von 8 bis 13 Jahren', KIDS],
  [
    ' Das nach pädagogischen Richtlinien ausgearbeitete Konzept zur Selbstverteidigung für Kinder und Jugendliche von 8 bis 13 Jahren wird einerseits in laufenden Kursen im Trainingscenter von KMC Höxter, andererseits in Workshops vermittelt.',
    '',
  ],
  [
    'Das nach pädagogischen Richtlinien ausgearbeitete Konzept zur Selbstverteidigung für Kinder und Jugendliche von 8 bis 13 Jahren wird einerseits in laufenden Kursen im Trainingscenter von KMC Höxter, andererseits in Workshops vermittelt.',
    '',
  ],
]

/** Textknoten, die als Ganzes ersetzt werden (Zwischenüberschrift „Kids Krav Maga“) */
const WHOLE_TEXT: [string, string][] = [['Kids Krav Maga', KIDS]]

type Node = { type?: string; text?: string; children?: Node[]; [key: string]: unknown }

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const pattern = (from: string) => new RegExp(from.split(' ').map(escape).join('[  ]+'), 'g')
const normalize = (value: string) => value.replace(/ /g, ' ').trim()

function replaceText(node: Node, inHeading = false): boolean {
  let changed = false
  if (typeof node.text === 'string') {
    let text = node.text
    for (const [from, to] of REPLACEMENTS) {
      if (to && text.includes(to)) continue
      text = text.replace(pattern(from), to)
    }
    if (inHeading) {
      for (const [from, to] of WHOLE_TEXT) if (normalize(text) === from) text = to
    }
    if (text !== node.text) {
      node.text = text
      changed = true
    }
  }
  const heading = inHeading || node.type === 'heading'
  for (const child of node.children ?? []) changed = replaceText(child, heading) || changed
  // Leer gewordene Textknoten entfernen (der entfernte Satz stand womöglich allein in einem Knoten)
  if (node.children) {
    const kept = node.children.filter((child) => !(child.type === 'text' && child.text === ''))
    if (kept.length !== node.children.length) {
      node.children = kept
      changed = true
    }
  }
  return changed
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  if ((await payload.count({ collection: 'course-offers', req })).totalDocs === 0) return

  const { docs } = await payload.find({
    collection: 'course-offers',
    select: { slug: true, content: true },
    where: { slug: { equals: 'krav-maga' } },
    depth: 0,
    limit: 1,
    pagination: false,
    req,
  })

  for (const doc of docs) {
    const content = structuredClone(doc.content) as { root: Node } | null
    if (content && replaceText(content.root)) {
      await payload.update({ collection: 'course-offers', id: doc.id, data: { content: content as never }, req })
      payload.logger.info('Kurs krav-maga: Rückmeldung vom 06.11.2026 eingearbeitet.')
    }
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Keine Rücknahme: frühere Fassungen stehen im Backend unter „Versionen“
  payload.logger.info('kurse_rueckmeldung: keine Rücknahme')
}
