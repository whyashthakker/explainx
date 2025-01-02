import type { Metadata } from "next";
import { Separator } from "@repo/ui/components/ui/separator";
import { FeatureSection } from "./_components/feature-section";
import { InstallGuide } from "./_components/install-guide";
import { AnalyticsDemo } from "./_components/analytics-demo";
import { PricingCTA } from "./_components/pricing-cta";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.infloq.com"),
  title: "Infloq Chrome Extension | Free Analytics for Any Creator",
  description: "Get instant access to creator analytics, engagement metrics, and audience insights directly in your browser with Infloq's free Chrome extension.",
  keywords: "infloq chrome extension, upfluence chrome extension, grin chrome extension, creator analytics, influencer marketing tools, social media analytics, engagement rate calculator, fake follower check",
  appLinks: {
    web: {
      url: "https://www.infloq.com/chrome-extension",
      should_fallback: false,
    },
  },
  openGraph: {
    title: "Infloq Chrome Extension | Creator Analytics at Your Fingertips",
    description: "Access detailed creator analytics and insights directly in your browser. Free Chrome extension for influencer marketing professionals.",
    url: "https://www.infloq.com/extension",
    siteName: "Infloq - Performance-Based Influencer Marketing",
    images: [
      {
        url: "/extension-og-image.png",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  }
};

export default function ExtensionPage() {
  return (
    <div className="container max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center space-y-6 mb-16">
        <h1 className="font-cal text-4xl md:text-5xl lg:text-6xl">
          Creator Analytics in Your Browser
        </h1>
        <p className="text-muted-foreground max-w-[700px] text-lg">
          Get instant access to engagement metrics, audience insights, and performance data for any creator across major social platforms.
        </p>
        <a 
          href="https://chrome.google.com/webstore/detail/infloq"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Add to Chrome - It's Free
        </a>
      </div>

      <FeatureSection />
      <Separator className="my-16" />
      <InstallGuide />
      <Separator className="my-16" />
      <AnalyticsDemo />
      <PricingCTA />
    </div>
  );
}