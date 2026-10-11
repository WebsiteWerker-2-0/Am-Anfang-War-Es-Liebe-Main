import { CmsPage, metadataFor } from "@/components/CmsPage";

// Inhalt dieser Seite: Backend, Seiten, „infos“. Ohne CMS gilt der Standardinhalt (content/pages/).
export const revalidate = 60;

export const generateMetadata = () => metadataFor("infos");

export default function InfoPage() {
  return <CmsPage slug="infos" />;
}
