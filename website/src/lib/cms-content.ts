import type { Img, PageData, PostData, SiteData, SupportService, ServiceGroup } from "@/content/model";

// Wandelt Dokumente aus dem CMS in das Modell der Website um (content/model.ts).

type Doc = Record<string, unknown>;

const isObject = (value: unknown): value is Doc => typeof value === "object" && value !== null && !Array.isArray(value);
const isMedia = (value: unknown): value is Doc => isObject(value) && "filename" in value && "mimeType" in value;
const isLexical = (value: unknown) => isObject(value) && isObject(value.root) && "children" in value.root;

/** Öffentliche Adresse einer Datei aus der Mediathek (siehe app/(site)/dateien) */
export function mediaUrl(media: Doc): string {
  return `/dateien/${encodeURIComponent(String(media.filename))}`;
}

export function mediaToImg(media: unknown): Img | null {
  if (!isMedia(media) || !media.width || !media.height) return null;
  return { src: mediaUrl(media), width: Number(media.width), height: Number(media.height) };
}

const IMAGE_KEYS = new Set(["band", "image", "poster", "fundingLogo"]);
const DROP_KEYS = new Set(["id", "blockName", "createdAt", "updatedAt"]);

// Gibt Felder in der Form des Modells zurück: Bilder und Dateien aufgelöst, null entfernt
function convert(value: unknown, key?: string): unknown {
  if (value === null) return undefined;
  if (Array.isArray(value)) return value.map((entry) => convert(entry));
  if (isMedia(value)) return key && IMAGE_KEYS.has(key) ? (mediaToImg(value) ?? undefined) : mediaUrl(value);
  if (isLexical(value)) return value;
  if (isObject(value)) {
    const out: Doc = {};
    for (const [name, entry] of Object.entries(value)) {
      if (DROP_KEYS.has(name)) continue;
      const converted = convert(entry, name);
      if (converted !== undefined) out[name] = converted;
    }
    return out;
  }
  return value;
}

export function normalizePage(doc: Doc): PageData {
  const page = convert(doc) as Doc;
  return {
    slug: String(page.slug),
    title: String(page.title),
    metaTitle: page.metaTitle as string | undefined,
    description: page.description as string | undefined,
    intro: page.intro as string | undefined,
    band: page.band as Img | undefined,
    layout: page.layout as PageData["layout"],
    blocks: (page.blocks ?? []) as PageData["blocks"],
  };
}

export function normalizeSite(doc: Doc): SiteData {
  const site = convert(doc) as Doc;
  return {
    navigation: site.navigation as SiteData["navigation"],
    languages: site.languages as SiteData["languages"],
    helpline: site.helpline as SiteData["helpline"],
    mailboxes: site.mailboxes as SiteData["mailboxes"],
    footer: site.footer as SiteData["footer"],
  };
}

export function normalizeService(doc: Doc): SupportService {
  const text = (value: unknown) => (typeof value === "string" && value ? value : undefined);
  const list = (value: unknown, field: string) =>
    Array.isArray(value) && value.length ? value.map((entry) => String((entry as Doc)[field])) : undefined;
  const website = isObject(doc.website) && text(doc.website.url) ? (doc.website as { url: string; label: string }) : undefined;
  const quick = isObject(doc.quick) && text(doc.quick.label) ? { label: String(doc.quick.label), note: text(doc.quick.note) ?? "" } : undefined;
  return {
    id: String(doc.serviceId),
    question: text(doc.question),
    name: String(doc.name),
    provider: text(doc.provider),
    phones: ((doc.phones ?? []) as Doc[]).map((phone) => ({
      label: text(phone.label),
      number: String(phone.number),
      note: text(phone.note),
    })),
    availability: text(doc.availability),
    addresses: list(doc.addresses, "address"),
    email: text(doc.email),
    website: website && { url: website.url, label: website.label || website.url },
    description: text(doc.description),
    offers: list(doc.offers, "text"),
    quick,
  };
}

/** Anlaufstellen als Hauptanlaufstellen, Schnellzugriff und Gruppen (Dokumente sind nach Position sortiert) */
export function groupServices(docs: Doc[]) {
  const main = docs.filter((doc) => doc.placement === "main").map(normalizeService);
  const quick = docs
    .filter((doc) => isObject(doc.quick) && doc.quick.label)
    .sort((a, b) => Number((a.quick as Doc).order ?? 99) - Number((b.quick as Doc).order ?? 99))
    .map(normalizeService);
  const groups: ServiceGroup[] = [];
  for (const doc of docs.filter((entry) => entry.placement !== "main")) {
    const title = String(doc.groupTitle ?? "Weitere Anlaufstellen");
    let group = groups.find((entry) => entry.title === title);
    if (!group) groups.push((group = { title, services: [] }));
    group.services.push(normalizeService(doc));
  }
  return { main, quick, groups };
}

export function normalizePost(doc: Doc): PostData {
  const post = doc as Doc;
  const image = mediaToImg(post.image);
  const media = isMedia(post.image) ? post.image : null;
  return {
    slug: String(post.slug),
    title: String(post.title),
    date: String(post.date).slice(0, 10),
    excerpt: typeof post.excerpt === "string" ? post.excerpt : "",
    image,
    imageAlt: media && typeof media.alt === "string" ? media.alt : undefined,
    content: isLexical(post.content) ? (post.content as PostData["content"]) : String(post.legacyHtml ?? ""),
    gallery: ((post.gallery ?? []) as unknown[]).flatMap((item) => {
      const img = mediaToImg(item);
      return img ? [{ image: img, alt: isMedia(item) && typeof item.alt === "string" ? item.alt : undefined }] : [];
    }),
    documents: ((post.documents ?? []) as Doc[]).flatMap((entry) =>
      isMedia(entry.file) ? [{ label: String(entry.label), file: mediaUrl(entry.file) }] : [],
    ),
  };
}
