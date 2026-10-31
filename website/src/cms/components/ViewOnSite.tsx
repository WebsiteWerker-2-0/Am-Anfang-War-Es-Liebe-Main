"use client";

import { useDocumentInfo } from "@payloadcms/ui";

// Link „Auf der Website ansehen“ in der Seitenleiste von Aktuelles, Termine und Kurse
export function ViewOnSite() {
  const { collectionSlug, savedDocumentData } = useDocumentInfo();
  const slug = (savedDocumentData as { slug?: string } | undefined)?.slug;
  if (!slug) return null;

  const href =
    collectionSlug === "posts" ? `/aktuelles/${slug}` : collectionSlug === "course-offers" ? `/kurse#${slug}` : "/termine";

  return (
    <p style={{ marginBlock: "1rem" }}>
      <a href={href} target="_blank" rel="noreferrer">
        Auf der Website ansehen ↗
      </a>
    </p>
  );
}
