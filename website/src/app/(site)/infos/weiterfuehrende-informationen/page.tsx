import { CmsPage, metadataFor } from "@/components/CmsPage";

// Unterseite von Infos (content/pages/info.ts, infoSections)
export const revalidate = 60;

export const generateMetadata = () => metadataFor("infos/weiterfuehrende-informationen");

export default function FurtherInformationPage() {
  return <CmsPage slug="infos/weiterfuehrende-informationen" />;
}
