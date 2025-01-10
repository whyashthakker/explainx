import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Suspense } from "react";
import localFont from "next/font/local";
import Navbar from "./_components/navbar-1";
import { PreFooter } from "./_components/pre-footer";
import { Toaster } from '@repo/ui/components/ui/toaster';
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: true,
  display: "swap",
});

const calFont = localFont({
  src: "../styles/CalSans-SemiBold.woff2",
  variable: "--font-cal",
  preload: true,
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

export const metadata: Metadata = {
  "metadataBase": new URL("https://www.explainx.ai"),
  "title": "ExplainX: Connect with Top Influencers & Course Creators for Performance-Based Marketing",
  "description": "ExplainX is the premier platform connecting founders and brands with influential content creators for performance-based marketing campaigns. Track real-time metrics across LinkedIn, Twitter, and more to maximize your ROI. Our data-driven approach ensures you only pay for actual engagement and clicks, making influencer marketing measurable and efficient.",
  "keywords": "ExplainX, Influencer Marketing, Performance Marketing, Content Creators, Course Creators, LinkedIn Marketing, Twitter Marketing, Social Media Marketing, ROI Tracking, Digital Marketing, Brand Collaboration, Founder Marketing, B2B Marketing, Influencer Platform, Marketing Analytics, Click-Based Marketing, Performance Metrics, Social Media ROI, Brand Partnerships, Marketing Dashboard",
  "appLinks": {
    web: {
      url: "https://www.explainx.ai",
      should_fallback: false,
    },
  },
  "generator": "ExplainX",
  "referrer": "no-referrer-when-downgrade",
  "authors": [
    {
      name: "ExplainX Team",
      url: "https://www.explainx.ai/team",
    }
  ],
  "creator": 'ExplainX',
  "publisher": "ExplainX",
  "openGraph": {
    title: "ExplainX: Performance-Based Influencer Marketing Platform",
    description: "Connect with vetted influencers and course creators to grow your brand through measurable, performance-based marketing campaigns. Track engagement, clicks, and conversions across LinkedIn, Twitter, and more. Pay for results, not promises.",
    url: "https://www.explainx.ai",
    siteName: "ExplainX - Performance-Based Influencer Marketing",
    images: [
      {
        url: "/og-image.png", // Replace with actual OG image URL
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  "icons": {
    icon: "/favicon.ico"
  },
  "category": "Marketing Technology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full ${inter.variable} ${calFont.variable} font-sans antialiased`}>
        <Suspense>
          <div className="flex flex-col min-h-screen dark:bg-[#1F1F1F]">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <GoogleAnalytics gaId={GA_ID} />
            <PreFooter />
          </div>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}