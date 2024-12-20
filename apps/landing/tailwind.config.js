import baseConfig from "@repo/ui/tailwind.config";

const config = {
  content: [
    ...(baseConfig.content || []),
    './app/**/*.{js,ts,jsx,tsx,md,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx,md,mdx}',
    './content/**/*.{js,ts,jsx,tsx,md,mdx}',
    './landing/**/*.{js,ts,jsx,tsx,md,mdx}'
  ],
  presets: [baseConfig],
}

export default config