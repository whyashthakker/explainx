import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'

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
}

const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
        // Use string format for plugins
        remarkPlugins: [['remark-gfm']],
        rehypePlugins: [['rehype-prism-plus'], ['rehype-slug']], // Added rehype-slug as string
        providerImportSource: "@mdx-js/react"
    },
})


export default withMDX(nextConfig)