import type { Metadata } from "next";
import { PricingHeader } from "./_components/pricing-header";
import { PricingCalculator } from "./_components/pricing-calculator";
import { PricingFAQ } from "./_components/pricing-faq";
import { PricingFeatures } from "./_components/pricing-features";
import { ContactCTA } from "./_components/contact-cta";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.infloq.com"),
  title: "Pricing | Infloq - Performance-Based Influencer Marketing Platform",
  description: "Simple, transparent pricing based on performance. Pay only for actual engagement and results. Start with our credit-based system and scale as you grow.",
  keywords: "influencer marketing pricing, performance marketing pricing, pay per click marketing, influencer campaign costs",
  openGraph: {
    title: "Transparent, Performance-Based Pricing | Infloq",
    description: "Only pay for real results with our credit-based system. Simple onboarding, no hidden fees.",
    url: "https://www.infloq.com/pricing",
    siteName: "Infloq - Performance-Based Influencer Marketing",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  }
};

export default function PricingPage() {
  return (
    <div className="container max-w-7xl mx-auto px-6 py-12">
      <PricingHeader />
      <PricingFeatures />
      <PricingCalculator />
      <PricingFAQ />
      <ContactCTA />
    </div>
  );
}