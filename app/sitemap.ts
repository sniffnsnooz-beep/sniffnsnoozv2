import { MetadataRoute } from 'next'
import { locations } from '../data/locations'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sniffnsnooz.in'
  const now = new Date()

  const staticRoutes: Array<{
    url: string
    priority: number
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  }> = [
    // ── Tier 1: Core conversion pages ──────────────────────────
    { url: '',                      priority: 1.0, changeFrequency: 'weekly'  },
    { url: '/booking',              priority: 0.95, changeFrequency: 'weekly' },
    { url: '/store-booking',        priority: 0.95, changeFrequency: 'weekly' },
    { url: '/veterinary-booking',   priority: 0.9,  changeFrequency: 'weekly' },

    // ── Tier 2: High-traffic discovery pages ───────────────────
    { url: '/gallery',              priority: 0.9,  changeFrequency: 'weekly' },
    { url: '/services',             priority: 0.9,  changeFrequency: 'monthly'},
    { url: '/packages',             priority: 0.85, changeFrequency: 'monthly'},
    { url: '/veterinary',           priority: 0.85, changeFrequency: 'monthly'},
    { url: '/find-a-companion',     priority: 0.8,  changeFrequency: 'weekly' },
    { url: '/pet-insurance',        priority: 0.8,  changeFrequency: 'monthly'},

    // ── Tier 3: Services sub-pages ─────────────────────────────
    { url: '/services/bath-spa-addons',       priority: 0.75, changeFrequency: 'monthly'},
    { url: '/services/coat-skin-treatment',   priority: 0.75, changeFrequency: 'monthly'},
    { url: '/services/ear-care',              priority: 0.75, changeFrequency: 'monthly'},
    { url: '/services/hair-styling',          priority: 0.75, changeFrequency: 'monthly'},
    { url: '/services/nail-paw-care',         priority: 0.75, changeFrequency: 'monthly'},
    { url: '/services/oral-hygiene-care',     priority: 0.75, changeFrequency: 'monthly'},

    // ── Tier 4: Trust & social proof pages ────────────────────
    { url: '/testimonials',         priority: 0.7,  changeFrequency: 'weekly' },
    { url: '/reviews',              priority: 0.7,  changeFrequency: 'weekly' },
    { url: '/news',                 priority: 0.7,  changeFrequency: 'daily'  },
    { url: '/contact',              priority: 0.65, changeFrequency: 'monthly'},

    // ── Tier 5: Legal / utility pages ─────────────────────────
    { url: '/privacy-policy',       priority: 0.3,  changeFrequency: 'yearly' },
    { url: '/terms',                priority: 0.3,  changeFrequency: 'yearly' },
  ]

  const sitemapRoutes: MetadataRoute.Sitemap = staticRoutes.map(({ url, priority, changeFrequency }) => ({
    url: `${baseUrl}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  // Location pages — high local SEO priority
  const locationRoutes: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${baseUrl}/locations/${location.city}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...sitemapRoutes, ...locationRoutes]
}