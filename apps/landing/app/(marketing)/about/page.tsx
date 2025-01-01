// app/about/page.tsx
import type { Metadata } from "next";
import { HeroSection } from "./_components/hero-section";
import { Timeline } from "./_components/timeline";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.infloq.com"),
  title: "About Infloq | Our Journey from Creation to Innovation",
  description: "Discover how Infloq evolved from a creator's journey to a platform revolutionizing influencer marketing. Learn about our mission, values, and the story behind our innovative approach.",
  openGraph: {
    title: "The Infloq Story | From Creator to Platform Builder",
    description: "From content creation to empowering creators globally, discover the journey that led to Infloq's mission to revolutionize influencer marketing.",
    url: "https://www.infloq.com/about",
    siteName: "Infloq",
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

export default function AboutPage() {
  return (
    <div className="container max-w-5xl mx-auto px-6 py-12 space-y-16">
      <HeroSection />
      <Timeline />
      
      {/* Present & Future Section */}
      <div className="text-center space-y-4">
        <h2 className="font-cal text-3xl">Building the Future</h2>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          Today, we're building Infloq with a clear mission: to make influencer marketing 
          accessible, measurable, and effective for both creators and brands. Join us in 
          shaping the future of digital marketing.
        </p>
      </div>
    </div>
  );
}