import fs from "node:fs/promises";
import path from "node:path";
import { convertHTMLToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical";
import { JSDOM } from "jsdom";
import type { Payload } from "payload";
import posts from "@/content/posts.json";

// Spielt die Beiträge der Altseite (src/content/posts.json) mit Bildern und
// Dokumenten (public/medien) ins CMS ein. Läuft nur, solange es noch keine
// Beiträge gibt, und kann gefahrlos wiederholt werden.

type LegacyPost = (typeof posts)[number];

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const DOCUMENT_EXTENSION = /\.(pdf|docx?|mp4)$/i;

// Dateien der Altseite hängen unter /medien/… und /downloads/… im Ordner public
function resolvePublicFile(webPath: string) {
  const file = path.resolve(PUBLIC_DIR, "." + webPath);
  return file.startsWith(PUBLIC_DIR + path.sep) ? file : null;
}

async function exists(file: string) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

export async function seedExistingContent(payload: Payload) {
  const { totalDocs } = await payload.count({ collection: "posts" });
  if (totalDocs > 0) return;

  const editorConfig = await editorConfigFactory.default({ config: payload.config });
  const mediaByPath = new Map<string, number>();

  async function importMedia(webPath: string, title: string, alt?: string) {
    const known = mediaByPath.get(webPath);
    if (known) return known;

    const file = resolvePublicFile(webPath);
    if (!file || !(await exists(file))) {
      payload.logger.warn(`Datei nicht gefunden, übersprungen: ${webPath}`);
      return null;
    }
    const filename = path.basename(file);
    const existing = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1 });
    if (existing.docs[0]) {
      mediaByPath.set(webPath, existing.docs[0].id);
      return existing.docs[0].id;
    }
    const created = await payload.create({
      collection: "media",
      data: { title, alt: alt || undefined, isPublic: true },
      filePath: file,
    });
    mediaByPath.set(webPath, created.id);
    return created.id;
  }

  for (const post of posts as LegacyPost[]) {
    const dom = new JSDOM(`<body>${post.html}</body>`);
    const doc = dom.window.document;

    // Bilder: das erste ist das Titelbild, weitere kommen in „Weitere Bilder“
    const imageSources = [...new Set([...doc.querySelectorAll("img")].map((img) => img.getAttribute("src") ?? ""))]
      .filter(Boolean)
      .filter((src) => src !== post.image);
    const imageAlt = new Map([...doc.querySelectorAll("img")].map((img) => [img.getAttribute("src") ?? "", img.getAttribute("alt") ?? ""]));

    // Dokumente: verlinkte PDFs und Videos werden zu Anhängen, der Link im Text entfällt
    const documents: { label: string; path: string }[] = [];
    for (const link of [...doc.querySelectorAll("a[href]")]) {
      const href = link.getAttribute("href") ?? "";
      if (!DOCUMENT_EXTENSION.test(href) || !href.startsWith("/")) continue;
      if (!documents.some((d) => d.path === href)) {
        documents.push({ label: link.textContent?.trim() || path.basename(href), path: href });
      }
      link.replaceWith(...link.childNodes);
    }
    for (const video of [...doc.querySelectorAll("video[src]")]) {
      const src = video.getAttribute("src") ?? "";
      if (src.startsWith("/") && !documents.some((d) => d.path === src)) documents.push({ label: "Video", path: src });
    }

    // Bildunterschriften werden zu Absätzen, Bilder und Videos stehen als eigene Felder
    for (const caption of [...doc.querySelectorAll("figcaption")]) {
      const paragraph = doc.createElement("p");
      paragraph.innerHTML = caption.innerHTML;
      caption.replaceWith(paragraph);
    }
    doc.querySelectorAll("img, video, figure:empty").forEach((el) => el.remove());

    const image = post.image ? await importMedia(post.image, post.title, imageAlt.get(post.image) || post.title) : null;
    const gallery: number[] = [];
    for (const src of imageSources) {
      const id = await importMedia(src, post.title, imageAlt.get(src) || post.title);
      if (id) gallery.push(id);
    }
    const attachments: { label: string; file: number }[] = [];
    for (const attachment of documents) {
      const id = await importMedia(attachment.path, attachment.label);
      if (id) attachments.push({ label: attachment.label, file: id });
    }

    await payload.create({
      collection: "posts",
      data: {
        title: post.title,
        slug: post.slug,
        date: new Date(post.date + "T12:00:00.000Z").toISOString(),
        excerpt: post.excerpt || undefined,
        image: image ?? undefined,
        gallery,
        documents: attachments,
        content: convertHTMLToLexical({ editorConfig, html: doc.body.innerHTML, JSDOM }),
        legacyHtml: post.html,
        status: "published",
      },
    });
  }

  payload.logger.info(`${posts.length} Beiträge der Altseite eingespielt.`);
}
