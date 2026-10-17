import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

// Aktuelles: Pflichtfeld „Verfasst von“. Von Hand ergänzt: SQLite kann eine NOT-NULL-Spalte nur mit
// Standardwert an eine gefüllte Tabelle hängen. Bestehende Beiträge bekommen den Arbeitskreis als Verfasser.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` ADD \`author\` text DEFAULT 'Arbeitskreis gegen Gewalt an Frauen und Kindern' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_author\` text DEFAULT 'Arbeitskreis gegen Gewalt an Frauen und Kindern' NOT NULL;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`author\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_author\`;`)
}
