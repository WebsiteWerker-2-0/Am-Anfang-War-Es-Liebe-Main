import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_rich\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_order_idx\` ON \`pages_blocks_rich\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_parent_id_idx\` ON \`pages_blocks_rich\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_path_idx\` ON \`pages_blocks_rich\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_lead\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_lead_order_idx\` ON \`pages_blocks_lead\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_lead_parent_id_idx\` ON \`pages_blocks_lead\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_lead_path_idx\` ON \`pages_blocks_lead\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_note\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_note_order_idx\` ON \`pages_blocks_note\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_note_parent_id_idx\` ON \`pages_blocks_note\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_note_path_idx\` ON \`pages_blocks_note\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_callout\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text DEFAULT 'notice' NOT NULL,
  	\`content\` text NOT NULL,
  	\`number\` text,
  	\`small\` integer,
  	\`measure\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_callout_order_idx\` ON \`pages_blocks_callout\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_callout_parent_id_idx\` ON \`pages_blocks_callout\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_callout_path_idx\` ON \`pages_blocks_callout\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_button\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_button_order_idx\` ON \`pages_blocks_button\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_button_parent_id_idx\` ON \`pages_blocks_button\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_button_path_idx\` ON \`pages_blocks_button\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_facts_entries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`term\` text,
  	\`value\` text,
  	\`phone\` text,
  	\`mailbox\` text,
  	\`note\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_facts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_facts_entries_order_idx\` ON \`pages_blocks_facts_entries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_facts_entries_parent_id_idx\` ON \`pages_blocks_facts_entries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_facts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_facts_order_idx\` ON \`pages_blocks_facts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_facts_parent_id_idx\` ON \`pages_blocks_facts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_facts_path_idx\` ON \`pages_blocks_facts\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_definitions_entries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`term\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_definitions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_definitions_entries_order_idx\` ON \`pages_blocks_definitions_entries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_definitions_entries_parent_id_idx\` ON \`pages_blocks_definitions_entries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_definitions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_definitions_order_idx\` ON \`pages_blocks_definitions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_definitions_parent_id_idx\` ON \`pages_blocks_definitions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_definitions_path_idx\` ON \`pages_blocks_definitions\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`anchor\` text,
  	\`variant\` text DEFAULT 'stack' NOT NULL,
  	\`section_id\` text,
  	\`aria_label\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_order_idx\` ON \`pages_blocks_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_parent_id_idx\` ON \`pages_blocks_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_section_path_idx\` ON \`pages_blocks_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_support_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_support_services_order_idx\` ON \`pages_blocks_support_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_support_services_parent_id_idx\` ON \`pages_blocks_support_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_support_services_path_idx\` ON \`pages_blocks_support_services\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_service_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`note\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_groups_order_idx\` ON \`pages_blocks_service_groups\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_groups_parent_id_idx\` ON \`pages_blocks_service_groups\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_groups_path_idx\` ON \`pages_blocks_service_groups\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_document_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`file_id\` integer NOT NULL,
  	\`meta\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_document_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_document_list_items_order_idx\` ON \`pages_blocks_document_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_document_list_items_parent_id_idx\` ON \`pages_blocks_document_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_document_list_items_file_idx\` ON \`pages_blocks_document_list_items\` (\`file_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_document_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`note\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_document_list_order_idx\` ON \`pages_blocks_document_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_document_list_parent_id_idx\` ON \`pages_blocks_document_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_document_list_path_idx\` ON \`pages_blocks_document_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_topic_links_topics_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_topic_links_topics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_topic_links_topics_links_order_idx\` ON \`pages_blocks_topic_links_topics_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_topic_links_topics_links_parent_id_idx\` ON \`pages_blocks_topic_links_topics_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_topic_links_topics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_topic_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_topic_links_topics_order_idx\` ON \`pages_blocks_topic_links_topics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_topic_links_topics_parent_id_idx\` ON \`pages_blocks_topic_links_topics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_topic_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_topic_links_order_idx\` ON \`pages_blocks_topic_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_topic_links_parent_id_idx\` ON \`pages_blocks_topic_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_topic_links_path_idx\` ON \`pages_blocks_topic_links\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_people_list_people\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_people_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_people_list_people_order_idx\` ON \`pages_blocks_people_list_people\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_people_list_people_parent_id_idx\` ON \`pages_blocks_people_list_people\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_people_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_people_list_order_idx\` ON \`pages_blocks_people_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_people_list_parent_id_idx\` ON \`pages_blocks_people_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_people_list_path_idx\` ON \`pages_blocks_people_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_campaign\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`lead\` text,
  	\`body\` text,
  	\`download_label\` text,
  	\`download_file_id\` integer,
  	\`download_meta\` text,
  	\`poster_id\` integer,
  	\`poster_alt\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`download_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_campaign_order_idx\` ON \`pages_blocks_campaign\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_campaign_parent_id_idx\` ON \`pages_blocks_campaign\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_campaign_path_idx\` ON \`pages_blocks_campaign\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_campaign_download_download_file_idx\` ON \`pages_blocks_campaign\` (\`download_file_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_campaign_poster_idx\` ON \`pages_blocks_campaign\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_photo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`alt\` text,
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_photo_order_idx\` ON \`pages_blocks_photo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_photo_parent_id_idx\` ON \`pages_blocks_photo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_photo_path_idx\` ON \`pages_blocks_photo\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_photo_image_idx\` ON \`pages_blocks_photo\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_self_check_statements\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_self_check\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_self_check_statements_order_idx\` ON \`pages_blocks_self_check_statements\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_self_check_statements_parent_id_idx\` ON \`pages_blocks_self_check_statements\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_self_check\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`legend\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_self_check_order_idx\` ON \`pages_blocks_self_check\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_self_check_parent_id_idx\` ON \`pages_blocks_self_check\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_self_check_path_idx\` ON \`pages_blocks_self_check\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_form_concerns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`mailbox\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_form\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_concerns_order_idx\` ON \`pages_blocks_contact_form_concerns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_concerns_parent_id_idx\` ON \`pages_blocks_contact_form_concerns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_order_idx\` ON \`pages_blocks_contact_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_parent_id_idx\` ON \`pages_blocks_contact_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_path_idx\` ON \`pages_blocks_contact_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_language_versions_versions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`direction\` text DEFAULT 'ltr' NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`helpline_label\` text NOT NULL,
  	\`emergency_label\` text NOT NULL,
  	\`exit_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_language_versions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_language_versions_versions_order_idx\` ON \`pages_blocks_language_versions_versions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_language_versions_versions_parent_id_idx\` ON \`pages_blocks_language_versions_versions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_language_versions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_language_versions_order_idx\` ON \`pages_blocks_language_versions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_language_versions_parent_id_idx\` ON \`pages_blocks_language_versions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_language_versions_path_idx\` ON \`pages_blocks_language_versions\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_exhibition_panels\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_exhibition\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_exhibition_panels_order_idx\` ON \`pages_blocks_exhibition_panels\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_exhibition_panels_parent_id_idx\` ON \`pages_blocks_exhibition_panels\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_exhibition_panels_image_idx\` ON \`pages_blocks_exhibition_panels\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_exhibition\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_exhibition_order_idx\` ON \`pages_blocks_exhibition\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_exhibition_parent_id_idx\` ON \`pages_blocks_exhibition\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_exhibition_path_idx\` ON \`pages_blocks_exhibition\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_news_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'page' NOT NULL,
  	\`heading\` text,
  	\`anchor\` text,
  	\`link_label\` text,
  	\`count\` numeric DEFAULT 3,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_news_list_order_idx\` ON \`pages_blocks_news_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_news_list_parent_id_idx\` ON \`pages_blocks_news_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_news_list_path_idx\` ON \`pages_blocks_news_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_entry_paths\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`reason\` text NOT NULL,
  	\`target\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_entry\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_entry_paths_order_idx\` ON \`pages_blocks_entry_paths\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_entry_paths_parent_id_idx\` ON \`pages_blocks_entry_paths\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_entry\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_entry_order_idx\` ON \`pages_blocks_entry\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_entry_parent_id_idx\` ON \`pages_blocks_entry\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_entry_path_idx\` ON \`pages_blocks_entry\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_entry_image_idx\` ON \`pages_blocks_entry\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_promises_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_promises\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_promises_items_order_idx\` ON \`pages_blocks_promises_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_promises_items_parent_id_idx\` ON \`pages_blocks_promises_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_promises\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_promises_order_idx\` ON \`pages_blocks_promises\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_promises_parent_id_idx\` ON \`pages_blocks_promises\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_promises_path_idx\` ON \`pages_blocks_promises\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_quick_access\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`link_label\` text NOT NULL,
  	\`link_url\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_quick_access_order_idx\` ON \`pages_blocks_quick_access\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_quick_access_parent_id_idx\` ON \`pages_blocks_quick_access\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_quick_access_path_idx\` ON \`pages_blocks_quick_access\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_teaser_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`anchor\` text,
  	\`lead\` text NOT NULL,
  	\`privacy_note\` text,
  	\`button_label\` text NOT NULL,
  	\`button_url\` text NOT NULL,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_teaser_band_order_idx\` ON \`pages_blocks_teaser_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_teaser_band_parent_id_idx\` ON \`pages_blocks_teaser_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_teaser_band_path_idx\` ON \`pages_blocks_teaser_band\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_teaser_band_image_idx\` ON \`pages_blocks_teaser_band\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`band_id\` integer,
  	\`meta_title\` text,
  	\`description\` text,
  	\`slug\` text NOT NULL,
  	\`layout\` text DEFAULT 'stack-lg' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`band_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_band_idx\` ON \`pages\` (\`band_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`posts_documents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`file_id\` integer NOT NULL,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_documents_order_idx\` ON \`posts_documents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_documents_parent_id_idx\` ON \`posts_documents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_documents_file_idx\` ON \`posts_documents\` (\`file_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_order\` text,
  	\`title\` text NOT NULL,
  	\`date\` text NOT NULL,
  	\`excerpt\` text,
  	\`image_id\` integer,
  	\`content\` text,
  	\`legacy_html\` text,
  	\`slug\` text NOT NULL,
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`archived_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`posts__order_idx\` ON \`posts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_image_idx\` ON \`posts\` (\`image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_status_idx\` ON \`posts\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_media_id_idx\` ON \`posts_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`events_documents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`file_id\` integer NOT NULL,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_documents_order_idx\` ON \`events_documents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_documents_parent_id_idx\` ON \`events_documents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_documents_file_idx\` ON \`events_documents\` (\`file_id\`);`)
  await db.run(sql`CREATE TABLE \`events\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_order\` text,
  	\`title\` text NOT NULL,
  	\`starts_at\` text NOT NULL,
  	\`ends_at\` text,
  	\`location\` text,
  	\`image_id\` integer,
  	\`description\` text,
  	\`capacity\` numeric,
  	\`registration_open\` integer DEFAULT false,
  	\`slug\` text NOT NULL,
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`archived_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`events__order_idx\` ON \`events\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_image_idx\` ON \`events\` (\`image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`events_slug_idx\` ON \`events\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`events_status_idx\` ON \`events\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`events_updated_at_idx\` ON \`events\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`events_created_at_idx\` ON \`events\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`services_phones\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`number\` text NOT NULL,
  	\`note\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_phones_order_idx\` ON \`services_phones\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_phones_parent_id_idx\` ON \`services_phones\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_addresses\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`address\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_addresses_order_idx\` ON \`services_addresses\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_addresses_parent_id_idx\` ON \`services_addresses\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_offers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_offers_order_idx\` ON \`services_offers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_offers_parent_id_idx\` ON \`services_offers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_order\` text,
  	\`name\` text NOT NULL,
  	\`service_id\` text NOT NULL,
  	\`placement\` text DEFAULT 'group' NOT NULL,
  	\`group_title\` text,
  	\`question\` text,
  	\`provider\` text,
  	\`availability\` text,
  	\`email\` text,
  	\`website_url\` text,
  	\`website_label\` text,
  	\`description\` text,
  	\`quick_label\` text,
  	\`quick_note\` text,
  	\`quick_order\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`services__order_idx\` ON \`services\` (\`_order\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`services_service_id_idx\` ON \`services\` (\`service_id\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`alt\` text,
  	\`description\` text,
  	\`is_public\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`role\` text DEFAULT 'editor' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
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
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_events_id_idx\` ON \`payload_locked_documents_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_navigation\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_navigation_order_idx\` ON \`site_navigation\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_navigation_parent_id_idx\` ON \`site_navigation\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_languages\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_languages_order_idx\` ON \`site_languages\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_languages_parent_id_idx\` ON \`site_languages\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_footer_service_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_footer_service_links_order_idx\` ON \`site_footer_service_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_footer_service_links_parent_id_idx\` ON \`site_footer_service_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_footer_legal_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_footer_legal_links_order_idx\` ON \`site_footer_legal_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_footer_legal_links_parent_id_idx\` ON \`site_footer_legal_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`helpline_number\` text NOT NULL,
  	\`helpline_suffix\` text,
  	\`mailboxes_help_label\` text NOT NULL,
  	\`mailboxes_help_email\` text NOT NULL,
  	\`mailboxes_information_label\` text NOT NULL,
  	\`mailboxes_information_email\` text NOT NULL,
  	\`footer_organisation\` text NOT NULL,
  	\`footer_address\` text NOT NULL,
  	\`footer_emergency\` text NOT NULL,
  	\`footer_funding_label\` text,
  	\`footer_funding_logo_id\` integer,
  	\`footer_funding_alt\` text,
  	\`footer_draft_note\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`footer_funding_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_footer_footer_funding_logo_idx\` ON \`site\` (\`footer_funding_logo_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_rich\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_lead\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_note\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_callout\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_button\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_facts_entries\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_facts\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_definitions_entries\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_definitions\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_section\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_support_services\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_service_groups\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_document_list_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_document_list\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_topic_links_topics_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_topic_links_topics\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_topic_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_people_list_people\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_people_list\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_campaign\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_photo\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_self_check_statements\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_self_check\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_form_concerns\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_form\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_language_versions_versions\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_language_versions\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_exhibition_panels\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_exhibition\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_news_list\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_entry_paths\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_entry\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_promises_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_promises\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_quick_access\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_teaser_band\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`posts_documents\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`events_documents\`;`)
  await db.run(sql`DROP TABLE \`events\`;`)
  await db.run(sql`DROP TABLE \`services_phones\`;`)
  await db.run(sql`DROP TABLE \`services_addresses\`;`)
  await db.run(sql`DROP TABLE \`services_offers\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`site_navigation\`;`)
  await db.run(sql`DROP TABLE \`site_languages\`;`)
  await db.run(sql`DROP TABLE \`site_footer_service_links\`;`)
  await db.run(sql`DROP TABLE \`site_footer_legal_links\`;`)
  await db.run(sql`DROP TABLE \`site\`;`)
}
