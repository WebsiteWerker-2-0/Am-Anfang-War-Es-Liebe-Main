import { staticImages } from "@/content/assets";
import type { ImageValue, Img } from "@/content/model";

// Löst ein Bild des Modells auf: Verweis auf ein mitgeliefertes Bild oder fertiges Bild aus dem CMS
export function toImg(value: ImageValue): Img | null {
  if (!value) return null;
  if ("asset" in value) return staticImages[value.asset] ?? null;
  return value;
}
