import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://bilaltechy.com',
            lastModified: new Date()
        },
        {
            url: 'https://bilaltechy.com/contact',
            lastModified: new Date()
        }
    ]
}