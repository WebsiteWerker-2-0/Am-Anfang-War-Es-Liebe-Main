import type { Img, PostData } from "@/content/model";

// Wandelt Beiträge aus dem CMS in das Modell der Website um (content/model.ts).

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
