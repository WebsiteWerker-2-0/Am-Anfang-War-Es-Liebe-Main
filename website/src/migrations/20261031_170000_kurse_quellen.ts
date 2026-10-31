import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { JSDOM } from 'jsdom'

// Nur Daten (Entscheidung Steffen 31.10.2026, Kontrolle durch den AG): Kurse Krav Maga und Wen Do
//  - Sätze aus Sicht des Anbieters in die dritte Person („bitten wir … bei uns“, „in unserem Trainingscenter“)
//  - Quellenangaben hinter den übernommenen Abschnitten (KMC Höxter, Wikipedia mit Lizenz CC BY-SA 4.0)
// Ändert nur genau diese Stellen im Eintrag im Backend; was die Redaktion sonst geändert hat, bleibt.
// Schon geänderte Stellen werden übersprungen, die Migration lässt sich also gefahrlos wiederholen.

const KMC_URL = 'https://www.kravmaga-hoexter.de'
const WIKI = 'https://de.wikipedia.org/wiki/Wendo'
const WIKI_HISTORY = 'https://de.wikipedia.org/w/index.php?title=Wendo&action=history'
const LICENSE = 'https://creativecommons.org/licenses/by-sa/4.0/deed.de'

export const REPLACEMENTS: [string, string][] = [
  [
    'bitten wir freundlichst von einer Anmeldung bei uns abzusehen.',
    'bittet KMC Höxter freundlichst, von einer Anmeldung abzusehen.',
  ],
  ['in laufenden Kursen in unserem Trainingscenter', 'in laufenden Kursen im Trainingscenter von KMC Höxter'],
]

export const SOURCE_KMC = `<p><em>Quelle dieses Abschnitts: Internetseite des SAMI-X Krav Maga TC Höxter (KMC Höxter), </em><a href="${KMC_URL}"><em>www.kravmaga-hoexter.de</em></a></p>`
export const SOURCE_KIDS = `<p><em>Angaben zu Kids Krav Maga nach KMC Höxter, </em><a href="${KMC_URL}"><em>www.kravmaga-hoexter.de</em></a></p>`
export const SOURCE_WIKI = `<p><em>Text nach dem Artikel </em><a href="${WIKI}"><em>„Wendo“</em></a><em> der deutschsprachigen Wikipedia, Lizenz </em><a href="${LICENSE}"><em>CC BY-SA 4.0</em></a><em>, Autor*innen siehe </em><a href="${WIKI_HISTORY}"><em>Versionsgeschichte</em></a><em>.</em></p>`

type Node = { type?: string; text?: string; children?: Node[]; [key: string]: unknown }

const textOf = (node: Node): string => (node.text ?? '') + (node.children ?? []).map(textOf).join('')

function replaceText(node: Node): boolean {
  let changed = false
  if (typeof node.text === 'string') {
    for (const [from, to] of REPLACEMENTS) {
      if (node.text.includes(from)) {
        node.text = node.text.replace(from, to)
        changed = true
      }
    }
  }
  for (const child of node.children ?? []) changed = replaceText(child) || changed
  return changed
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const editorConfig = await editorConfigFactory.default({ config: payload.config })
  const paragraph = (html: string) =>
    (convertHTMLToLexical({ editorConfig, html, JSDOM }).root.children[0] as unknown) as Node

  // Neue Datenbank: Es gibt noch keine Kurse (die legt erst cms/seed.ts an), also nichts zu ändern.
  // Wichtig, weil spätere Felder (z. B. „Kurzfassung“) hier noch keine Spalte haben.
  if ((await payload.count({ collection: 'course-offers', req })).totalDocs === 0) return

  const { docs } = await payload.find({
    collection: 'course-offers',
    select: { title: true, slug: true, content: true },
    where: { slug: { in: ['krav-maga', 'wen-do'] } },
    depth: 0,
    limit: 10,
    pagination: false,
    req,
  })

  for (const doc of docs) {
    const content = structuredClone(doc.content) as { root: Node } | null
    const blocks = content?.root.children
    if (!content || !blocks) continue
    let changed = replaceText(content.root)
    const has = (marker: string) => blocks.some((node) => textOf(node).includes(marker))

    if (doc.slug === 'krav-maga') {
      // Quelle hinter „Weitere Infos unter: …“ (Ende des Abschnitts von der Internetseite)
      const more = blocks.findIndex((node) => textOf(node).startsWith('Weitere Infos unter:'))
      if (more >= 0 && !has('Quelle dieses Abschnitts')) {
        blocks.splice(more + 1, 0, paragraph(SOURCE_KMC))
        changed = true
      }
      // Quelle hinter der Liste „Zudem Teil des Unterrichts“ (Ende Kids Krav Maga)
      const list = blocks.findIndex((node) => node.type === 'list' && textOf(node).includes('Hilfsmittel einsetzen'))
      if (list >= 0 && !has('Angaben zu Kids Krav Maga nach')) {
        blocks.splice(list + 1, 0, paragraph(SOURCE_KIDS))
        changed = true
      }
    }

    if (doc.slug === 'wen-do' && !has('der deutschsprachigen Wikipedia')) {
      const info = blocks.findIndex((node) => textOf(node).trim() === '(Info Wikipedia)')
      if (info >= 0) blocks.splice(info, 1, paragraph(SOURCE_WIKI))
      else blocks.push(paragraph(SOURCE_WIKI))
      changed = true
    }

    if (changed) {
      await payload.update({ collection: 'course-offers', id: doc.id, data: { content: content as never }, req })
      payload.logger.info(`Kurs ${doc.slug}: Wortlaut und Quellen angepasst.`)
    }
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Keine Rücknahme: frühere Fassungen stehen im Backend unter „Versionen“
  payload.logger.info('kurse_quellen: keine Rücknahme')
}
