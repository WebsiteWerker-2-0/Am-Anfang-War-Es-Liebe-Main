import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

// Veranstaltungen: ausführlicher Text (Textfeld mit Dateien im Text).
// Von Hand gekürzt: Payload wollte wegen des neuen Standardwerts „veröffentlicht“ ganze Tabellen neu bauen
// (DROP TABLE posts) und hätte dabei Dokumente und Versionen löschen können. Der Standardwert gilt
// ohnehin nur in der Anwendung, die Datenbank braucht nur die neue Spalte.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`courses\` ADD \`details\` text;`)
  await db.run(sql`ALTER TABLE \`_courses_v\` ADD \`version_details\` text;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`courses\` DROP COLUMN \`details\`;`)
  await db.run(sql`ALTER TABLE \`_courses_v\` DROP COLUMN \`version_details\`;`)
}
