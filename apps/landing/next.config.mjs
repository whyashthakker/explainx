import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pbs.twimg.com',
            },
            {
                protocol: 'https',
                hostname: 'ph-avatars.imgix.net',
            },
            {
                protocol: 'https',
                hostname: 'api.producthunt.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'appsumo2ppnuxt.b-cdn.net',
            },
            {
                protocol: 'https',
                hostname: 'appsumo2-cdn.appsumo.com',
            },
            {
                protocol: 'https',
                hostname: 'oaidalleapiprodscus.blob.core.windows.net'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            }
        ],
    },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    
    experimental: {
        mdxRs: true,
    },
    
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "chrome-extension://pkomeokalhjlopcgnoefibpdhphfcgam" },
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ],
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: '/api/openai/free-comments-generate-daily/',
                destination: 'https://www.olly.social/api/openai/free-comments-generate-daily/',
            },
        ];
    },
}

// Apply MDX configuration and export
export default withMDX(nextConfig)