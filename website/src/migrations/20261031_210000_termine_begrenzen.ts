import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

// Termine: Teilnehmerzahl nur noch auf Wunsch begrenzen (Wunsch Steffen 31.10.2026).
// Nur neue Spalten (ADD COLUMN). Alle bisherigen Termine hatten eine Platzzahl und behalten sie:
// Sie bekommen das Häkchen „Teilnehmerzahl begrenzen“, neue Termine starten ohne.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`courses\` ADD \`limit_seats\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_courses_v\` ADD \`version_limit_seats\` integer DEFAULT false;`)
  await db.run(sql`UPDATE \`courses\` SET \`limit_seats\` = true;`)
  await db.run(sql`UPDATE \`_courses_v\` SET \`version_limit_seats\` = true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`courses\` DROP COLUMN \`limit_seats\`;`)
  await db.run(sql`ALTER TABLE \`_courses_v\` DROP COLUMN \`version_limit_seats\`;`)
}
