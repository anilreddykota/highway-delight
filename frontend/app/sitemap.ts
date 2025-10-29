import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all experiences to generate dynamic routes
  const baseUrl = 'https://highwaydelite.com'

  // Static routes
  const routes = [
    '',
    '/search',
    '/experiences',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

  return [...routes]
}