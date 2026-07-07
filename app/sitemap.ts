import { MetadataRoute } from 'next'
import { locations } from '../data/locations'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sniffnsnooz.in'
  
  const staticRoutes = [
    '',
    '/services',
    '/packages',
    '/gallery',
    '/booking',
    '/store-booking',
    '/news',
    '/testimonials',
    '/contact',
    '/veterinary',
    '/veterinary-booking',
    '/privacy-policy',
    '/terms',
  ]

  const sitemapRoutes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : route === '/news' ? 'daily' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))

  const locationRoutes: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${baseUrl}/locations/${location.city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9, // High priority for local SEO
  }))

  return [...sitemapRoutes, ...locationRoutes]
}