import type { Config } from 'tailwindcss'
import baseConfig from "@repo/ui/tailwind.config";

const config: Config = {
  content: [
    ...(baseConfig.content || []),
    // Update patterns to include mdx files
    'app/**/*.{js,ts,jsx,tsx,md,mdx}',
    'pages/**/*.{js,ts,jsx,tsx,md,mdx}',
    'components/**/*.{js,ts,jsx,tsx,md,mdx}',
    'src/**/*.{js,ts,jsx,tsx,md,mdx}',
    // Specific path for blog posts
    'app/blog/_posts/**/*.mdx'
  ],
  presets: [baseConfig],
}

export default config