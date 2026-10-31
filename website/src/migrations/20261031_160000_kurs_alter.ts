import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

// Nur Daten: Altersangabe im Kurs Krav Maga vereinheitlicht (Entscheidung Steffen 31.10.2026, Prüfung durch den AG):
// Frauen und Mädchen „ab 15 Jahren“ statt „ab 14 Jahren“ in der Aufzählung oben. Ersetzt nur genau diese Stelle,
// auch in der neuesten Version, damit „Versionen“ im Backend denselben Stand zeigt. Wiederholbar ohne Wirkung.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`UPDATE \`course_offers\` SET \`content\` = replace(\`content\`, 'Mädchen ab 14 Jahren', 'Mädchen ab 15 Jahren') WHERE \`slug\` = 'krav-maga';`)
  await db.run(sql`UPDATE \`_course_offers_v\` SET \`version_content\` = replace(\`version_content\`, 'Mädchen ab 14 Jahren', 'Mädchen ab 15 Jahren') WHERE \`version_slug\` = 'krav-maga';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Keine Rücknahme: Die Korrektur soll erhalten bleiben
}
