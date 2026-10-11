import type { Metadata, Viewport } from "next";
import { SiteDocument } from "@/components/SiteDocument";
import { siteMetadata, siteViewport } from "@/lib/site-metadata";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = siteViewport;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <SiteDocument>{children}</SiteDocument>;
}
