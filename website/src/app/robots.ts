import type { MetadataRoute } from "next";

// Entwurf: Suchmaschinen aussperren (Abschnitt 10.6)
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
