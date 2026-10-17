import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

// Download-Bereich (einblendbar, Vorschaubild je Dokument). Bildposition steckt im Text (JSON), braucht keine Spalte.
// Von Hand auf ADD COLUMN gekürzt: Payload wollte posts_documents per DROP TABLE neu bauen (siehe Übergabe-Doku,
// Fallstrick 2). Beiträge, die schon Dokumente haben, zeigen den Download-Bereich weiter an.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts_documents\` ADD \`preview_id\` integer REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null;`)
  await db.run(sql`CREATE INDEX \`posts_documents_preview_idx\` ON \`posts_documents\` (\`preview_id\`);`)
  await db.run(sql`ALTER TABLE \`_posts_v_version_documents\` ADD \`preview_id\` integer REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null;`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_documents_preview_idx\` ON \`_posts_v_version_documents\` (\`preview_id\`);`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`show_downloads\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_show_downloads\` integer DEFAULT false;`)
  await db.run(sql`UPDATE \`posts\` SET \`show_downloads\` = true WHERE \`id\` IN (SELECT \`_parent_id\` FROM \`posts_documents\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX IF EXISTS \`posts_documents_preview_idx\`;`)
  await db.run(sql`DROP INDEX IF EXISTS \`_posts_v_version_documents_preview_idx\`;`)
  await db.run(sql`ALTER TABLE \`posts_documents\` DROP COLUMN \`preview_id\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v_version_documents\` DROP COLUMN \`preview_id\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`show_downloads\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_show_downloads\`;`)
}
