import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.explainx.ai"),
  title:
    "ExplainX: Connect with Top Influencers & Course Creators for Performance-Based Marketing",
  description:
    "ExplainX is the premier platform connecting founders and brands with influential content creators for performance-based marketing campaigns. Track real-time metrics across LinkedIn, Twitter, and more to maximize your ROI. Our data-driven approach ensures you only pay for actual engagement and clicks, making influencer marketing measurable and efficient.",
  keywords:
    "ExplainX, Influencer Marketing, Performance Marketing, Content Creators, Course Creators, LinkedIn Marketing, Twitter Marketing, Social Media Marketing, ROI Tracking, Digital Marketing, Brand Collaboration, Founder Marketing, B2B Marketing, Influencer Platform, Marketing Analytics, Click-Based Marketing, Performance Metrics, Social Media ROI, Brand Partnerships, Marketing Dashboard",
  appLinks: {
    web: {
      url: "https://www.explainx.ai",
      should_fallback: false,
    },
  },
  generator: "ExplainX",
  referrer: "no-referrer-when-downgrade",
  authors: [
    {
      name: "ExplainX Team",
      url: "https://www.explainx.ai/team",
    },
  ],
  creator: "ExplainX",
  publisher: "ExplainX",
  openGraph: {
    title: "ExplainX: Performance-Based Influencer Marketing Platform",
    description:
      "Connect with vetted influencers and course creators to grow your brand through measurable, performance-based marketing campaigns. Track engagement, clicks, and conversions across LinkedIn, Twitter, and more. Pay for results, not promises.",
    url: "https://www.explainx.ai",
    siteName: "ExplainX - Performance-Based Influencer Marketing",
    images: [
      {
        url: "/og-image.png", // Replace with actual OG image URL
        width: 1200,
        height: 630,
      },
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "Marketing Technology",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning={true}      >
      <SessionProvider>
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
