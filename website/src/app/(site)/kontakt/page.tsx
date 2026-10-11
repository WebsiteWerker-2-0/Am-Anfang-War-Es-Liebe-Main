import { CmsPage, metadataFor } from "@/components/CmsPage";

// Inhalt dieser Seite: Backend, Seiten, „kontakt“. Ohne CMS gilt der Standardinhalt (content/pages/).
export const revalidate = 60;

export const generateMetadata = () => metadataFor("kontakt");

export default function ContactPage() {
  return <CmsPage slug="kontakt" />;
}
