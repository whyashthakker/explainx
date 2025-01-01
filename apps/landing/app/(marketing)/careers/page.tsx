import type { Metadata } from "next";
import { Separator } from "@repo/ui/components/ui/separator";
import { CultureSection } from "./_components/culture";
import { PerksSection } from "./_components/perks";
import { OpenPositions } from "./_components/open-positions";
import { ContactCTA } from "./_components/contact-cta";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.infloq.com"),
  title: "Careers at Infloq | Join Us in Revolutionizing Influencer Marketing",
  description: "Join Infloq and help shape the future of influencer marketing. We're looking for passionate individuals who want to make a real impact in the creator economy.",
  keywords: "Infloq careers, influencer marketing jobs, startup jobs india, marketing technology careers, tech jobs mumbai, remote jobs india",
  appLinks: {
    web: {
      url: "https://www.infloq.com/careers",
      should_fallback: false,
    },
  },
  openGraph: {
    title: "Join Infloq | Building the Future of Influencer Marketing",
    description: "Work with us to transform how brands and creators collaborate. Explore exciting opportunities at Infloq.",
    url: "https://www.infloq.com/careers",
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

export default function CareersPage() {
    return (
      <div className="container max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h1 className="font-cal text-4xl md:text-5xl">Work With Us</h1>
          <p className="text-muted-foreground max-w-[700px]">
            Join our mission to revolutionize influencer marketing and create meaningful connections between brands and creators.
          </p>
        </div>
  
        <CultureSection />
        <PerksSection />
        <Separator className="my-16" />
        <OpenPositions />
        <ContactCTA />
      </div>
    );
  }