import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`courses\` ADD \`extra_booked\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`_courses_v\` ADD \`version_extra_booked\` numeric DEFAULT 0;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`courses\` DROP COLUMN \`extra_booked\`;`)
  await db.run(sql`ALTER TABLE \`_courses_v\` DROP COLUMN \`version_extra_booked\`;`)
}
