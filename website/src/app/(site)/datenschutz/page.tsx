import { CmsPage, metadataFor } from "@/components/CmsPage";

// Inhalt dieser Seite: Backend, Seiten, „datenschutz“. Ohne CMS gilt der Standardinhalt (content/pages/).
export const revalidate = 60;

export const generateMetadata = () => metadataFor("datenschutz");

export default function PrivacyPage() {
  return <CmsPage slug="datenschutz" />;
}
