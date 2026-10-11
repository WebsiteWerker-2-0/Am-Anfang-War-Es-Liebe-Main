import fs from "node:fs/promises";
import path from "node:path";
import { uploadDir } from "@/cms/env";
import { getCms } from "@/lib/cms-client";

// Öffentliche Auslieferung der Dateien aus der Mediathek unter /dateien/<Name>.
// Die Dateien selbst liegen im CMS-Speicher; nur als „öffentlich abrufbar“ markierte
// Dateien werden ausgeliefert. So erscheint /backend nie in einer Adresse für Besucherinnen.
export async function GET(request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const filename = decodeURIComponent(name);
  if (filename !== path.basename(filename) || filename.startsWith(".")) return new Response(null, { status: 404 });

  const cms = await getCms();
  if (!cms) return new Response(null, { status: 404 });
  const result = await cms.find({
    collection: "media",
    where: { and: [{ filename: { equals: filename } }, { isPublic: { equals: true } }] },
    depth: 0,
    limit: 1,
  });
  const media = result.docs[0];
  if (!media) return new Response(null, { status: 404 });

  let data: Buffer;
  try {
    data = await fs.readFile(path.join(uploadDir, filename));
  } catch {
    return new Response(null, { status: 404 });
  }

  const headers: Record<string, string> = {
    "Content-Type": media.mimeType ?? "application/octet-stream",
    "Cache-Control": "public, max-age=3600",
    "Accept-Ranges": "bytes",
  };

  // Videos lassen sich nur mit Teilabrufen (Range) vor- und zurückspulen
  const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get("range") ?? "");
  if (range && (range[1] || range[2])) {
    const start = range[1] ? Number(range[1]) : Math.max(data.length - Number(range[2]), 0);
    const end = range[1] && range[2] ? Math.min(Number(range[2]), data.length - 1) : data.length - 1;
    if (start > end || start >= data.length) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${data.length}` } });
    return new Response(new Uint8Array(data.subarray(start, end + 1)), {
      status: 206,
      headers: { ...headers, "Content-Range": `bytes ${start}-${end}/${data.length}`, "Content-Length": String(end - start + 1) },
    });
  }
  return new Response(new Uint8Array(data), { headers: { ...headers, "Content-Length": String(data.length) } });
}
