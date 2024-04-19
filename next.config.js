/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.hdqwalls.com', 'as1.ftcdn.net'],
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
