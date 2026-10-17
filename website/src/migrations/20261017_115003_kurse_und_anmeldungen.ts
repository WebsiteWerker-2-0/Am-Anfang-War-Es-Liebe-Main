import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`_posts_v_version_documents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`file_id\` integer NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_version_documents_order_idx\` ON \`_posts_v_version_documents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_documents_parent_id_idx\` ON \`_posts_v_version_documents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_documents_file_idx\` ON \`_posts_v_version_documents\` (\`file_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version__order\` text,
  	\`version_title\` text NOT NULL,
  	\`version_date\` text NOT NULL,
  	\`version_excerpt\` text,
  	\`version_image_id\` integer,
  	\`version_content\` text,
  	\`version_legacy_html\` text,
  	\`version_slug\` text NOT NULL,
  	\`version_status\` text DEFAULT 'draft' NOT NULL,
  	\`version_archived_at\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__order_idx\` ON \`_posts_v\` (\`version__order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_image_idx\` ON \`_posts_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_status_idx\` ON \`_posts_v\` (\`version_status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_media_id_idx\` ON \`_posts_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`courses\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`starts_at\` text NOT NULL,
  	\`ends_at\` text,
  	\`location\` text,
  	\`audience\` text,
  	\`price\` text,
  	\`instructor\` text,
  	\`description\` text,
  	\`capacity\` numeric DEFAULT 12 NOT NULL,
  	\`registration_open\` integer DEFAULT true,
  	\`waitlist\` integer DEFAULT true,
  	\`notify_email\` text,
  	\`slug\` text NOT NULL,
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`archived_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`courses_slug_idx\` ON \`courses\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`courses_status_idx\` ON \`courses\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`courses_updated_at_idx\` ON \`courses\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`courses_created_at_idx\` ON \`courses\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_courses_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_starts_at\` text NOT NULL,
  	\`version_ends_at\` text,
  	\`version_location\` text,
  	\`version_audience\` text,
  	\`version_price\` text,
  	\`version_instructor\` text,
  	\`version_description\` text,
  	\`version_capacity\` numeric DEFAULT 12 NOT NULL,
  	\`version_registration_open\` integer DEFAULT true,
  	\`version_waitlist\` integer DEFAULT true,
  	\`version_notify_email\` text,
  	\`version_slug\` text NOT NULL,
  	\`version_status\` text DEFAULT 'draft' NOT NULL,
  	\`version_archived_at\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_courses_v_parent_idx\` ON \`_courses_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_courses_v_version_version_slug_idx\` ON \`_courses_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_courses_v_version_version_status_idx\` ON \`_courses_v\` (\`version_status\`);`)
  await db.run(sql`CREATE INDEX \`_courses_v_version_version_updated_at_idx\` ON \`_courses_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_courses_v_version_version_created_at_idx\` ON \`_courses_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_courses_v_created_at_idx\` ON \`_courses_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_courses_v_updated_at_idx\` ON \`_courses_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`registrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`course_id\` integer NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone\` text,
  	\`message\` text,
  	\`status\` text DEFAULT 'confirmed' NOT NULL,
  	\`consent\` integer,
  	\`mail_status\` text,
  	\`mail_error\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`registrations_course_idx\` ON \`registrations\` (\`course_id\`);`)
  await db.run(sql`CREATE INDEX \`registrations_status_idx\` ON \`registrations\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`registrations_updated_at_idx\` ON \`registrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`registrations_created_at_idx\` ON \`registrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_course_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Termine und Anmeldung' NOT NULL,
  	\`empty_notice\` text NOT NULL,
  	\`anchor\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_course_list_order_idx\` ON \`pages_blocks_course_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_course_list_parent_id_idx\` ON \`pages_blocks_course_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_course_list_path_idx\` ON \`pages_blocks_course_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_rich\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_order_idx\` ON \`_pages_v_blocks_rich\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_parent_id_idx\` ON \`_pages_v_blocks_rich\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_path_idx\` ON \`_pages_v_blocks_rich\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_lead\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_lead_order_idx\` ON \`_pages_v_blocks_lead\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_lead_parent_id_idx\` ON \`_pages_v_blocks_lead\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_lead_path_idx\` ON \`_pages_v_blocks_lead\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_note\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_note_order_idx\` ON \`_pages_v_blocks_note\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_note_parent_id_idx\` ON \`_pages_v_blocks_note\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_note_path_idx\` ON \`_pages_v_blocks_note\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`kind\` text DEFAULT 'notice' NOT NULL,
  	\`content\` text NOT NULL,
  	\`number\` text,
  	\`small\` integer,
  	\`measure\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_callout_order_idx\` ON \`_pages_v_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_callout_parent_id_idx\` ON \`_pages_v_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_callout_path_idx\` ON \`_pages_v_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_button\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_button_order_idx\` ON \`_pages_v_blocks_button\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_button_parent_id_idx\` ON \`_pages_v_blocks_button\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_button_path_idx\` ON \`_pages_v_blocks_button\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_facts_entries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`term\` text,
  	\`value\` text,
  	\`phone\` text,
  	\`mailbox\` text,
  	\`note\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_facts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_facts_entries_order_idx\` ON \`_pages_v_blocks_facts_entries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_facts_entries_parent_id_idx\` ON \`_pages_v_blocks_facts_entries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_facts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_facts_order_idx\` ON \`_pages_v_blocks_facts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_facts_parent_id_idx\` ON \`_pages_v_blocks_facts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_facts_path_idx\` ON \`_pages_v_blocks_facts\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_definitions_entries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`term\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_definitions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_definitions_entries_order_idx\` ON \`_pages_v_blocks_definitions_entries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_definitions_entries_parent_id_idx\` ON \`_pages_v_blocks_definitions_entries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_definitions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_definitions_order_idx\` ON \`_pages_v_blocks_definitions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_definitions_parent_id_idx\` ON \`_pages_v_blocks_definitions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_definitions_path_idx\` ON \`_pages_v_blocks_definitions\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`anchor\` text,
  	\`variant\` text DEFAULT 'stack' NOT NULL,
  	\`section_id\` text,
  	\`aria_label\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_section_order_idx\` ON \`_pages_v_blocks_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_section_parent_id_idx\` ON \`_pages_v_blocks_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_section_path_idx\` ON \`_pages_v_blocks_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_support_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_support_services_order_idx\` ON \`_pages_v_blocks_support_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_support_services_parent_id_idx\` ON \`_pages_v_blocks_support_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_support_services_path_idx\` ON \`_pages_v_blocks_support_services\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_service_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`note\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_groups_order_idx\` ON \`_pages_v_blocks_service_groups\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_groups_parent_id_idx\` ON \`_pages_v_blocks_service_groups\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_groups_path_idx\` ON \`_pages_v_blocks_service_groups\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_document_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`file_id\` integer NOT NULL,
  	\`meta\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_document_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_document_list_items_order_idx\` ON \`_pages_v_blocks_document_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_document_list_items_parent_id_idx\` ON \`_pages_v_blocks_document_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_document_list_items_file_idx\` ON \`_pages_v_blocks_document_list_items\` (\`file_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_document_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`note\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_document_list_order_idx\` ON \`_pages_v_blocks_document_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_document_list_parent_id_idx\` ON \`_pages_v_blocks_document_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_document_list_path_idx\` ON \`_pages_v_blocks_document_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_topic_links_topics_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_topic_links_topics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_topic_links_topics_links_order_idx\` ON \`_pages_v_blocks_topic_links_topics_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_topic_links_topics_links_parent_id_idx\` ON \`_pages_v_blocks_topic_links_topics_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_topic_links_topics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_topic_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_topic_links_topics_order_idx\` ON \`_pages_v_blocks_topic_links_topics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_topic_links_topics_parent_id_idx\` ON \`_pages_v_blocks_topic_links_topics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_topic_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_topic_links_order_idx\` ON \`_pages_v_blocks_topic_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_topic_links_parent_id_idx\` ON \`_pages_v_blocks_topic_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_topic_links_path_idx\` ON \`_pages_v_blocks_topic_links\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_people_list_people\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_people_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_people_list_people_order_idx\` ON \`_pages_v_blocks_people_list_people\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_people_list_people_parent_id_idx\` ON \`_pages_v_blocks_people_list_people\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_people_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_people_list_order_idx\` ON \`_pages_v_blocks_people_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_people_list_parent_id_idx\` ON \`_pages_v_blocks_people_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_people_list_path_idx\` ON \`_pages_v_blocks_people_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_campaign\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`lead\` text,
  	\`body\` text,
  	\`download_label\` text,
  	\`download_file_id\` integer,
  	\`download_meta\` text,
  	\`poster_id\` integer,
  	\`poster_alt\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`download_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_campaign_order_idx\` ON \`_pages_v_blocks_campaign\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_campaign_parent_id_idx\` ON \`_pages_v_blocks_campaign\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_campaign_path_idx\` ON \`_pages_v_blocks_campaign\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_campaign_download_download_file_idx\` ON \`_pages_v_blocks_campaign\` (\`download_file_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_campaign_poster_idx\` ON \`_pages_v_blocks_campaign\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_photo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`alt\` text,
  	\`caption\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_photo_order_idx\` ON \`_pages_v_blocks_photo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_photo_parent_id_idx\` ON \`_pages_v_blocks_photo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_photo_path_idx\` ON \`_pages_v_blocks_photo\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_photo_image_idx\` ON \`_pages_v_blocks_photo\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_self_check_statements\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_self_check\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_self_check_statements_order_idx\` ON \`_pages_v_blocks_self_check_statements\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_self_check_statements_parent_id_idx\` ON \`_pages_v_blocks_self_check_statements\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_self_check\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`legend\` text NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_self_check_order_idx\` ON \`_pages_v_blocks_self_check\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_self_check_parent_id_idx\` ON \`_pages_v_blocks_self_check\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_self_check_path_idx\` ON \`_pages_v_blocks_self_check\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_form_concerns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`mailbox\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_contact_form\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_form_concerns_order_idx\` ON \`_pages_v_blocks_contact_form_concerns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_form_concerns_parent_id_idx\` ON \`_pages_v_blocks_contact_form_concerns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_form_order_idx\` ON \`_pages_v_blocks_contact_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_form_parent_id_idx\` ON \`_pages_v_blocks_contact_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_form_path_idx\` ON \`_pages_v_blocks_contact_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_language_versions_versions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`direction\` text DEFAULT 'ltr' NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`helpline_label\` text NOT NULL,
  	\`emergency_label\` text NOT NULL,
  	\`exit_label\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_language_versions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_language_versions_versions_order_idx\` ON \`_pages_v_blocks_language_versions_versions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_language_versions_versions_parent_id_idx\` ON \`_pages_v_blocks_language_versions_versions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_language_versions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_language_versions_order_idx\` ON \`_pages_v_blocks_language_versions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_language_versions_parent_id_idx\` ON \`_pages_v_blocks_language_versions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_language_versions_path_idx\` ON \`_pages_v_blocks_language_versions\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_exhibition_panels\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`title\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_exhibition\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_exhibition_panels_order_idx\` ON \`_pages_v_blocks_exhibition_panels\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_exhibition_panels_parent_id_idx\` ON \`_pages_v_blocks_exhibition_panels\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_exhibition_panels_image_idx\` ON \`_pages_v_blocks_exhibition_panels\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_exhibition\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`intro\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_exhibition_order_idx\` ON \`_pages_v_blocks_exhibition\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_exhibition_parent_id_idx\` ON \`_pages_v_blocks_exhibition\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_exhibition_path_idx\` ON \`_pages_v_blocks_exhibition\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_course_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Termine und Anmeldung' NOT NULL,
  	\`empty_notice\` text NOT NULL,
  	\`anchor\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_course_list_order_idx\` ON \`_pages_v_blocks_course_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_course_list_parent_id_idx\` ON \`_pages_v_blocks_course_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_course_list_path_idx\` ON \`_pages_v_blocks_course_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_news_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'page' NOT NULL,
  	\`heading\` text,
  	\`anchor\` text,
  	\`link_label\` text,
  	\`count\` numeric DEFAULT 3,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_news_list_order_idx\` ON \`_pages_v_blocks_news_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_news_list_parent_id_idx\` ON \`_pages_v_blocks_news_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_news_list_path_idx\` ON \`_pages_v_blocks_news_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_entry_paths\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`reason\` text NOT NULL,
  	\`target\` text NOT NULL,
  	\`href\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_entry\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_entry_paths_order_idx\` ON \`_pages_v_blocks_entry_paths\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_entry_paths_parent_id_idx\` ON \`_pages_v_blocks_entry_paths\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_entry\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_entry_order_idx\` ON \`_pages_v_blocks_entry\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_entry_parent_id_idx\` ON \`_pages_v_blocks_entry\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_entry_path_idx\` ON \`_pages_v_blocks_entry\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_entry_image_idx\` ON \`_pages_v_blocks_entry\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_promises_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_promises\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_promises_items_order_idx\` ON \`_pages_v_blocks_promises_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_promises_items_parent_id_idx\` ON \`_pages_v_blocks_promises_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_promises\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_promises_order_idx\` ON \`_pages_v_blocks_promises\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_promises_parent_id_idx\` ON \`_pages_v_blocks_promises\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_promises_path_idx\` ON \`_pages_v_blocks_promises\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_quick_access\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`link_label\` text NOT NULL,
  	\`link_url\` text NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_quick_access_order_idx\` ON \`_pages_v_blocks_quick_access\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_quick_access_parent_id_idx\` ON \`_pages_v_blocks_quick_access\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_quick_access_path_idx\` ON \`_pages_v_blocks_quick_access\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_teaser_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`lead\` text NOT NULL,
  	\`privacy_note\` text,
  	\`button_label\` text NOT NULL,
  	\`button_url\` text NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_teaser_band_order_idx\` ON \`_pages_v_blocks_teaser_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_teaser_band_parent_id_idx\` ON \`_pages_v_blocks_teaser_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_teaser_band_path_idx\` ON \`_pages_v_blocks_teaser_band\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_teaser_band_image_idx\` ON \`_pages_v_blocks_teaser_band\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_intro\` text,
  	\`version_band\` text,
  	\`version_meta_title\` text,
  	\`version_description\` text,
  	\`version_slug\` text NOT NULL,
  	\`version_layout\` text DEFAULT 'stack-lg' NOT NULL,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`mail\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`course_recipient\` text,
  	\`smtp_host\` text,
  	\`smtp_port\` numeric DEFAULT 465,
  	\`smtp_secure\` integer DEFAULT true,
  	\`smtp_user\` text,
  	\`smtp_password\` text,
  	\`from_address\` text,
  	\`from_name\` text DEFAULT 'Website Am Anfang war es Liebe',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`courses_id\` integer REFERENCES courses(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`registrations_id\` integer REFERENCES registrations(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_courses_id_idx\` ON \`payload_locked_documents_rels\` (\`courses_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_registrations_id_idx\` ON \`payload_locked_documents_rels\` (\`registrations_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`_posts_v_version_documents\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`courses\`;`)
  await db.run(sql`DROP TABLE \`_courses_v\`;`)
  await db.run(sql`DROP TABLE \`registrations\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_course_list\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_rich\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_lead\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_note\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_button\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_facts_entries\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_facts\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_definitions_entries\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_definitions\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_section\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_support_services\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_service_groups\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_document_list_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_document_list\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_topic_links_topics_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_topic_links_topics\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_topic_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_people_list_people\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_people_list\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_campaign\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_photo\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_self_check_statements\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_self_check\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_form_concerns\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_form\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_language_versions_versions\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_language_versions\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_exhibition_panels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_exhibition\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_course_list\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_news_list\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_entry_paths\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_entry\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_promises_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_promises\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_quick_access\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_teaser_band\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`mail\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`events_id\` integer,
  	\`services_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "pages_id", "posts_id", "events_id", "services_id", "media_id", "users_id") SELECT "id", "order", "parent_id", "path", "pages_id", "posts_id", "events_id", "services_id", "media_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_events_id_idx\` ON \`payload_locked_documents_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
}
