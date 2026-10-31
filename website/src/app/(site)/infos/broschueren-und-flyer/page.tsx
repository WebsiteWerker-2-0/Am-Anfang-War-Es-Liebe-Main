import { CmsPage, metadataFor } from "@/components/CmsPage";

// Unterseite von Infos (content/pages/info.ts, infoSections)
export const revalidate = 60;

export const generateMetadata = () => metadataFor("infos/broschueren-und-flyer");

export default function BrochuresPage() {
  return <CmsPage slug="infos/broschueren-und-flyer" />;
}
