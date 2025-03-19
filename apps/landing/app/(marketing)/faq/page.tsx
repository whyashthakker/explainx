import type { Metadata } from "next";
import { FAQSection } from "./_components/faq-section";
import { Separator } from "@repo/ui/components/ui/separator";
import { faqData } from "../../../data/landing/faq-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.explainx.ai"),
  title: "FAQ - ExplainX | Performance-Based Influencer Marketing Platform",
  description: "Find answers to common questions about ExplainX's AI-powered influencer marketing platform. Learn about our performance-based pricing, creator discovery, and campaign management.",
  keywords: [
    "ExplainX FAQ",
    "influencer marketing platform",
    "creator marketing help",
    "influencer platform support",
    "performance-based marketing",
    "AI influencer matching",
    "creator discovery platform"
  ].join(", "),
  appLinks: {
    web: {
      url: "https://www.explainx.ai/faq",
      should_fallback: false,
    },
  },
  openGraph: {
    title: "ExplainX FAQ | AI-Powered Influencer Marketing Made Simple",
    description: "Get answers to all your questions about ExplainX's performance-based influencer marketing platform. Discover how our AI helps you find and work with the perfect creators.",
    url: "https://www.explainx.ai/faq",
    siteName: "ExplainX - Performance-Based Influencer Marketing",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ExplainX FAQ"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExplainX FAQ | Performance-Based Influencer Marketing",
    description: "Everything you need to know about using ExplainX's AI-powered influencer marketing platform.",
    images: ["/og-image.png"],
    creator: "@ExplainX",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.explainx.ai/faq",
  }
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12 mt-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-cal text-4xl md:text-5xl mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about using ExplainX for your influencer marketing campaigns.
            Can't find what you're looking for? <a href="/contact" className="text-primary hover:underline">Contact our support team</a>.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqData.map((category, index) => (
            <div key={category.title}>
              <FAQSection category={category} />
              {index < faqData.length - 1 && (
                <Separator className="my-12" />
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="font-cal text-2xl mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of brands using ExplainX to scale their influencer marketing.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/signup" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
            >
              Start Free Trial
            </a>
            <a 
              href="/demo" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
            >
              Request Demo
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}