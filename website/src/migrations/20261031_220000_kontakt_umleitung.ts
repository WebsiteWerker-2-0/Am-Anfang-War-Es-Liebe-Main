import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

// Kontaktformular: optionale Umleitung aller Kontaktanfragen zum Testen (Wunsch Steffen 31.10.2026). Nur ADD COLUMN.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`mail\` ADD \`contact_redirect\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`mail\` DROP COLUMN \`contact_redirect\`;`)
}
