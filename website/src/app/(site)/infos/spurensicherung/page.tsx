import { CmsPage, metadataFor } from "@/components/CmsPage";

// Unterseite von Infos (content/pages/info.ts, infoSections)
export const revalidate = 60;

export const generateMetadata = () => metadataFor("infos/spurensicherung");

export default function EvidenceCollectionPage() {
  return <CmsPage slug="infos/spurensicherung" />;
}
