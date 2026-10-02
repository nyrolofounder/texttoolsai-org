import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://texttoolsai.org";
  const lastModified = new Date();

  const toolRoutes = [
    "ai-humanizer",
    "tone-shifter",
    "transcript-summarizer",
    "seo-meta-generator",
    "grammar-doctor",
  ];

  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#workspace`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#pricing`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#features`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = toolRoutes.map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...mainPages, ...toolPages];
}
