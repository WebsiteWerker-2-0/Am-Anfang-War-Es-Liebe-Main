import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`course_offers\` (
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
  await db.run(sql`CREATE INDEX \`course_offers__order_idx\` ON \`course_offers\` (\`_order\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`course_offers_slug_idx\` ON \`course_offers\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`course_offers_status_idx\` ON \`course_offers\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`course_offers_updated_at_idx\` ON \`course_offers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`course_offers_created_at_idx\` ON \`course_offers\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_course_offers_v\` (
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
  await db.run(sql`CREATE INDEX \`_course_offers_v_parent_idx\` ON \`_course_offers_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_course_offers_v_version_version__order_idx\` ON \`_course_offers_v\` (\`version__order\`);`)
  await db.run(sql`CREATE INDEX \`_course_offers_v_version_version_slug_idx\` ON \`_course_offers_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_course_offers_v_version_version_status_idx\` ON \`_course_offers_v\` (\`version_status\`);`)
  await db.run(sql`CREATE INDEX \`_course_offers_v_version_version_updated_at_idx\` ON \`_course_offers_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_course_offers_v_version_version_created_at_idx\` ON \`_course_offers_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_course_offers_v_created_at_idx\` ON \`_course_offers_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_course_offers_v_updated_at_idx\` ON \`_course_offers_v\` (\`updated_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`course_offers_id\` integer REFERENCES course_offers(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_course_offers_id_idx\` ON \`payload_locked_documents_rels\` (\`course_offers_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`course_offers\`;`)
  await db.run(sql`DROP TABLE \`_course_offers_v\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	\`courses_id\` integer,
  	\`registrations_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`courses_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`registrations_id\`) REFERENCES \`registrations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "posts_id", "courses_id", "registrations_id", "media_id", "users_id") SELECT "id", "order", "parent_id", "path", "posts_id", "courses_id", "registrations_id", "media_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_courses_id_idx\` ON \`payload_locked_documents_rels\` (\`courses_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_registrations_id_idx\` ON \`payload_locked_documents_rels\` (\`registrations_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
}
