import { CmsPage, metadataFor } from "@/components/CmsPage";

// Inhalt dieser Seite: Backend, Seiten, „hilfe“. Ohne CMS gilt der Standardinhalt (content/pages/).
export const revalidate = 60;

export const generateMetadata = () => metadataFor("hilfe");

export default function HelpPage() {
  return <CmsPage slug="hilfe" />;
}
