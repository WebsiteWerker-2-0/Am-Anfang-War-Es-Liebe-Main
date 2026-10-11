import type { Metadata, Viewport } from "next";
import { SiteDocument } from "@/components/SiteDocument";
import { siteMetadata, siteViewport } from "@/lib/site-metadata";
import NotFoundContent from "./(site)/not-found";
import "./(site)/globals.css";

// Unbekannte Adressen: Die Website und das Backend haben je ein eigenes Root-Layout,
// deshalb braucht Next.js hier ein vollständiges Dokument. Es ist dasselbe Gerüst
// und dieselben Meta-Angaben wie auf allen Seiten, inklusive Notausgang.
export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = siteViewport;

export default function GlobalNotFound() {
  return (
    <SiteDocument>
      <NotFoundContent />
    </SiteDocument>
  );
}
