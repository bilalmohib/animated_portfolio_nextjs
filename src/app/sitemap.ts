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
        },
        {
            url: 'https://www.upwork.com/freelancers/~013a136c7081592898',
            lastModified: new Date()
        }
    ]
}