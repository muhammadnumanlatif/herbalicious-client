/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cms.herbalicious-shop.com',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'herbalicious-wp.local',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    // WordPress Headless specific optimizations
    env: {
        WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
    },
};

export default nextConfig;
