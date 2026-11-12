import type { MetadataRoute } from "next";

// A private wedding site: ask search engines not to crawl it.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
