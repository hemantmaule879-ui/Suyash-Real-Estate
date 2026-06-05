import { propertiesDb } from "@/lib/db";

export default async function sitemap() {
  // Can be configured to env.NEXT_PUBLIC_SITE_URL in production
  const baseUrl = "http://localhost:3000"; 

  // Core static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Dynamic property routes
  try {
    const properties = propertiesDb.getAll();
    const dynamicRoutes = properties.map((prop) => ({
      url: `${baseUrl}/properties/${prop.id}`,
      lastModified: new Date(prop.dateAdded || Date.now()),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error("Failed to generate dynamic sitemap entries:", error);
    return staticRoutes;
  }
}
