import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

// Kurse wie Aktuelles (Wunsch Steffen 31.10.2026): Kurzfassung für die Übersicht und Titelbild.
// Nur neue Spalten (ADD COLUMN), keine Tabelle wird neu gebaut. Danach bekommen die beiden Kurse
// des AG eine Kurzfassung (wie in content/course-offers.ts), aber nur, wo noch keine eingetragen ist.
const EXCERPTS: Record<string, string> = {
  'krav-maga':
    'Krav-Maga-Selbstverteidigung für Frauen und Mädchen ab 15 Jahren und Kids Krav Maga für Kinder von 8 bis 13 Jahren, in Zusammenarbeit mit KMC Höxter.',
  'wen-do':
    'Feministische Selbstbehauptung und Selbstverteidigung für Frauen und Mädchen: Gefahren früh erkennen, Grenzen setzen und handlungsfähig bleiben.',
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`course_offers\` ADD \`excerpt\` text;`)
  await db.run(sql`ALTER TABLE \`course_offers\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`course_offers_image_idx\` ON \`course_offers\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`_course_offers_v\` ADD \`version_excerpt\` text;`)
  await db.run(sql`ALTER TABLE \`_course_offers_v\` ADD \`version_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_course_offers_v_version_version_image_idx\` ON \`_course_offers_v\` (\`version_image_id\`);`)
  for (const [slug, excerpt] of Object.entries(EXCERPTS)) {
    await db.run(sql`UPDATE \`course_offers\` SET \`excerpt\` = ${excerpt} WHERE \`slug\` = ${slug} AND \`excerpt\` IS NULL;`)
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_course_offers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_order\` text,
  	\`title\` text NOT NULL,
  	\`content\` text,
  	\`slug\` text NOT NULL,
  	\`status\` text DEFAULT 'published' NOT NULL,
  	\`archived_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_course_offers\`("id", "_order", "title", "content", "slug", "status", "archived_at", "updated_at", "created_at") SELECT "id", "_order", "title", "content", "slug", "status", "archived_at", "updated_at", "created_at" FROM \`course_offers\`;`)
  await db.run(sql`DROP TABLE \`course_offers\`;`)
  await db.run(sql`ALTER TABLE \`__new_course_offers\` RENAME TO \`course_offers\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`course_offers__order_idx\` ON \`course_offers\` (\`_order\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`course_offers_slug_idx\` ON \`course_offers\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`course_offers_status_idx\` ON \`course_offers\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`course_offers_updated_at_idx\` ON \`course_offers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`course_offers_created_at_idx\` ON \`course_offers\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__course_offers_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version__order\` text,
  	\`version_title\` text NOT NULL,
  	\`version_content\` text,
  	\`version_slug\` text NOT NULL,
  	\`version_status\` text DEFAULT 'published' NOT NULL,
  	\`version_archived_at\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`course_offers\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__course_offers_v\`("id", "parent_id", "version__order", "version_title", "version_content", "version_slug", "version_status", "version_archived_at", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version__order", "version_title", "version_content", "version_slug", "version_status", "version_archived_at", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_course_offers_v\`;`)
  await db.run(sql`DROP TABLE \`_course_offers_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__course_offers_v\` RENAME TO \`_course_offers_v\`;`)
  await db.run(sql`CREATE INDEX \`_course_offers_v_parent_idx\` ON \`_course_offers_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_course_offers_v_version_version__order_idx\` ON \`_course_offers_v\` (\`version__order\`);`)
  await db.run(sql`CREATE INDEX \`_course_offers_v_version_version_slug_idx\` ON \`_course_offers_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_course_offers_v_version_version_status_idx\` ON \`_course_offers_v\` (\`version_status\`);`)
  await db.run(sql`CREATE INDEX \`_course_offers_v_version_version_updated_at_idx\` ON \`_course_offers_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_course_offers_v_version_version_created_at_idx\` ON \`_course_offers_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_course_offers_v_created_at_idx\` ON \`_course_offers_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_course_offers_v_updated_at_idx\` ON \`_course_offers_v\` (\`updated_at\`);`)
}
