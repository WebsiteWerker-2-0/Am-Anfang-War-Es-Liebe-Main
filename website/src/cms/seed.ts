import fs from "node:fs/promises";
import path from "node:path";
import { convertHTMLToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical";
import { JSDOM } from "jsdom";
import type { Payload } from "payload";
import type { ImageValue, PageBlock, PageData, Rich, SectionItem, SiteData } from "@/content/model";
import { defaultPages } from "@/content/pages";
import posts from "@/content/posts.json";
import { defaultSite } from "@/content/site";
import { mainServices, quickAccess, serviceGroups, type SupportService } from "@/content/support-services";

// Spielt den Inhalt der bisherigen Website ins CMS ein: Seiten, Anlaufstellen, Seitenrahmen,
// Beiträge der Altseite samt Bildern und Dokumenten. Jeder Teil läuft nur, solange seine
// Sammlung leer ist, und kann gefahrlos wiederholt werden.

type LegacyPost = (typeof posts)[number];

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const ASSETS_DIR = path.resolve(process.cwd(), "src/assets");
const DOCUMENT_EXTENSION = /\.(pdf|docx?|mp4)$/i;

async function exists(file: string) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

/** Dateien der Altseite hängen unter /medien/… und /downloads/… im Ordner public */
function resolvePublicFile(webPath: string) {
  const file = path.resolve(PUBLIC_DIR, "." + webPath);
  return file.startsWith(PUBLIC_DIR + path.sep) ? file : null;
}

/** Bilder der Website: Schlüssel wie "illustrations/band-p07" zeigt auf src/assets/<Schlüssel>.<Endung> */
async function resolveAsset(key: string) {
  for (const extension of ["jpg", "png", "webp"]) {
    const file = path.resolve(ASSETS_DIR, `${key}.${extension}`);
    if (file.startsWith(ASSETS_DIR + path.sep) && (await exists(file))) return file;
  }
  return null;
}

export async function seedExistingContent(payload: Payload) {
  const editorConfig = await editorConfigFactory.default({ config: payload.config });
  const mediaByFile = new Map<string, number>();

  async function importFile(file: string | null, label: string, title: string, alt?: string) {
    if (!file || !(await exists(file))) {
      payload.logger.warn(`Datei nicht gefunden, übersprungen: ${label}`);
      return null;
    }
    const known = mediaByFile.get(file);
    if (known) return known;
    const filename = path.basename(file);
    const existing = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1 });
    if (existing.docs[0]) {
      mediaByFile.set(file, existing.docs[0].id);
      return existing.docs[0].id;
    }
    const created = await payload.create({
      collection: "media",
      data: { title, alt: alt || undefined, isPublic: true },
      filePath: file,
    });
    mediaByFile.set(file, created.id);
    return created.id;
  }

  const importPublic = (webPath: string, title: string, alt?: string) =>
    importFile(resolvePublicFile(webPath), webPath, title, alt);

  async function importAsset(value: ImageValue, alt?: string) {
    if (!value || !("asset" in value)) return null;
    return importFile(await resolveAsset(value.asset), value.asset, path.basename(value.asset), alt);
  }

  // Zwischenüberschriften und Zeilenumbrüche im Quelltext sind Formatierung, kein Text
  const lexical = (html: Rich) => {
    if (typeof html !== "string") return html;
    return convertHTMLToLexical({ editorConfig, html: html.replace(/>\s*\n\s*</g, "><"), JSDOM });
  };

  // ---- Anlaufstellen -------------------------------------------------------
  if ((await payload.count({ collection: "services" })).totalDocs === 0) {
    const create = (service: SupportService, placement: "main" | "group", groupTitle?: string) => {
      const quickIndex = quickAccess.findIndex((entry) => entry.id === service.id);
      return payload.create({
        collection: "services",
        data: {
          serviceId: service.id,
          name: service.name,
          placement,
          groupTitle,
          question: service.question,
          provider: service.provider,
          phones: service.phones,
          availability: service.availability,
          addresses: service.addresses?.map((address) => ({ address })),
          email: service.email,
          website: service.website,
          description: service.description,
          offers: service.offers?.map((text) => ({ text })),
          quick: service.quick ? { ...service.quick, order: quickIndex } : undefined,
        },
      });
    };
    for (const service of mainServices) await create(service, "main");
    for (const group of serviceGroups) for (const service of group.services) await create(service, "group", group.title);
    payload.logger.info("Anlaufstellen eingespielt.");
  }

  // ---- Seitenrahmen --------------------------------------------------------
  const site = await payload.findGlobal({ slug: "site" });
  if (!site.navigation?.length) {
    const footer: SiteData["footer"] = defaultSite.footer;
    await payload.updateGlobal({
      slug: "site",
      data: {
        navigation: defaultSite.navigation,
        languages: defaultSite.languages,
        helpline: defaultSite.helpline,
        mailboxes: defaultSite.mailboxes,
        footer: {
          ...footer,
          address: lexical(footer.address) as never,
          emergency: lexical(footer.emergency) as never,
          fundingLogo: (await importAsset(footer.fundingLogo, footer.fundingAlt)) ?? undefined,
        },
      },
    });
    payload.logger.info("Kopf und Fuß eingespielt.");
  }

  // ---- Seiten --------------------------------------------------------------
  async function convertItem(item: SectionItem): Promise<unknown> {
    if (item.blockType === "rich" || item.blockType === "note" || item.blockType === "callout") {
      return { ...item, content: lexical(item.content) };
    }
    return item;
  }

  async function convertBlock(block: PageBlock): Promise<unknown> {
    switch (block.blockType) {
      case "section":
        return { ...block, items: await Promise.all(block.items.map(convertItem)) };
      case "callout":
        return { ...block, content: lexical(block.content) };
      case "documentList": {
        const items = [];
        for (const item of block.items) {
          items.push({ ...item, file: await importPublic(item.file, item.title) });
        }
        return { ...block, items, note: block.note ? lexical(block.note) : undefined };
      }
      case "campaign":
        return {
          ...block,
          body: lexical(block.body),
          download: block.download
            ? { ...block.download, file: await importPublic(block.download.file, block.download.label) }
            : undefined,
          poster: await importAsset(block.poster, block.posterAlt),
        };
      case "photo":
        return { ...block, image: await importAsset(block.image, block.alt) };
      case "exhibition": {
        const panels = [];
        for (const panel of block.panels) {
          panels.push({
            title: panel.title,
            image: await importAsset(panel.image, `Tafel der Wanderausstellung: ${panel.title}`),
          });
        }
        return { ...block, panels };
      }
      case "entry":
      case "teaserBand":
        return { ...block, image: await importAsset(block.image) };
      default:
        return block;
    }
  }

  async function createPage(page: PageData) {
    await payload.create({
      collection: "pages",
      data: {
        slug: page.slug,
        title: page.title,
        metaTitle: page.metaTitle,
        description: page.description,
        intro: page.intro,
        layout: page.layout,
        band: (await importAsset(page.band)) ?? undefined,
        blocks: (await Promise.all(page.blocks.map(convertBlock))) as never,
      },
    });
  }

  if ((await payload.count({ collection: "pages" })).totalDocs === 0) {
    for (const page of defaultPages) await createPage(page);
    payload.logger.info(`${defaultPages.length} Seiten eingespielt.`);
  }

  // ---- Beiträge der Altseite -----------------------------------------------
  if ((await payload.count({ collection: "posts" })).totalDocs > 0) return;

  for (const post of posts as LegacyPost[]) {
    const doc = new JSDOM(`<body>${post.html}</body>`).window.document;

    // Bilder: das erste ist das Titelbild, weitere kommen in „Weitere Bilder“
    const imageSources = [...new Set([...doc.querySelectorAll("img")].map((img) => img.getAttribute("src") ?? ""))]
      .filter(Boolean)
      .filter((src) => src !== post.image);
    const imageAlt = new Map(
      [...doc.querySelectorAll("img")].map((img) => [img.getAttribute("src") ?? "", img.getAttribute("alt") ?? ""]),
    );

    // Dokumente: verlinkte PDFs und Videos werden zu Anhängen, der Link im Text entfällt
    const documents: { label: string; path: string }[] = [];
    for (const link of [...doc.querySelectorAll("a[href]")]) {
      const href = link.getAttribute("href") ?? "";
      if (!DOCUMENT_EXTENSION.test(href) || !href.startsWith("/")) continue;
      if (!documents.some((entry) => entry.path === href)) {
        documents.push({ label: link.textContent?.trim() || path.basename(href), path: href });
      }
      link.replaceWith(...link.childNodes);
    }
    for (const video of [...doc.querySelectorAll("video[src]")]) {
      const src = video.getAttribute("src") ?? "";
      if (src.startsWith("/") && !documents.some((entry) => entry.path === src)) documents.push({ label: "Video", path: src });
    }

    // Bildunterschriften werden zu Absätzen, Bilder und Videos stehen als eigene Felder
    for (const caption of [...doc.querySelectorAll("figcaption")]) {
      const paragraph = doc.createElement("p");
      paragraph.innerHTML = caption.innerHTML;
      caption.replaceWith(paragraph);
    }
    doc.querySelectorAll("img, video, figure:empty").forEach((el) => el.remove());

    const image = post.image ? await importPublic(post.image, post.title, imageAlt.get(post.image) || post.title) : null;
    const gallery: number[] = [];
    for (const src of imageSources) {
      const id = await importPublic(src, post.title, imageAlt.get(src) || post.title);
      if (id) gallery.push(id);
    }
    const attachments: { label: string; file: number }[] = [];
    for (const attachment of documents) {
      const id = await importPublic(attachment.path, attachment.label);
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
        content: lexical(doc.body.innerHTML) as never,
        legacyHtml: post.html,
        status: "published",
      },
    });
  }
  payload.logger.info(`${posts.length} Beiträge der Altseite eingespielt.`);
}
