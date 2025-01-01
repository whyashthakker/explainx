import type { Config } from 'tailwindcss'
import baseConfig from "@repo/ui/tailwind.config";

const config: Config = {
  content: [
    ...(baseConfig.content || []),
    './app/**/*.{js,ts,jsx,tsx,md,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx,md,mdx}',
    './src/**/*.{js,ts,jsx,tsx,md,mdx}',
    './app/blog/_posts/**/*.mdx'
  ],
  presets: [baseConfig],
  plugins: [
    ...baseConfig.plugins || [],
    require('@tailwindcss/typography'),
  ],
}

export default config