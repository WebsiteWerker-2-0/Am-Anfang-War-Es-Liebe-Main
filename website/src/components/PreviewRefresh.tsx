"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

// Vorschau im Backend: nach dem Speichern lädt sich die Vorschau neu.
export function PreviewRefresh() {
  const router = useRouter();
  return (
    <RefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={typeof window === "undefined" ? "" : window.location.origin}
      apiRoute="/backend/api"
    />
  );
}
