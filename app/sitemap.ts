import type {MetadataRoute} from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://niche-collector.vercel.app";
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/collection`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/studio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];
}
