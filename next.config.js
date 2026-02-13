/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
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
