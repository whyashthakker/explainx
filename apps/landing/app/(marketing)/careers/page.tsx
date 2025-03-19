import type { Metadata } from "next";
import { Separator } from "@repo/ui/components/ui/separator";
import { CultureSection } from "./_components/culture";
import { PerksSection } from "./_components/perks";
import { OpenPositions } from "./_components/open-positions";
import { ContactCTA } from "./_components/contact-cta";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.explainx.ai"),
  title: "Careers at ExplainX | Join the Leading AI Agents Development Agency",
  description: "Join ExplainX in building the future of AI agents. We're seeking talented individuals passionate about AI development, LangChain, CrewAI, and innovative automation solutions.",
  keywords: [
    "ai agent developer jobs",
    "ai development careers",
    "langchain developer positions",
    "crewai engineering jobs",
    "ai automation jobs",
    "openai integration developer",
    "ai agent architect",
    "remote ai jobs",
    "ai agency careers",
    "machine learning jobs",
    "ai solutions engineer",
    "startup jobs india",
    "tech jobs mumbai",
    "remote jobs india"
  ].join(", "),
  appLinks: {
    web: {
      url: "https://www.explainx.ai/careers",
      should_fallback: false,
    },
  },
  openGraph: {
    title: "Join ExplainX | Pioneer the Future of AI Agents Development",
    description: "Build cutting-edge AI agents and automation solutions at ExplainX. Work with technologies like LangChain, CrewAI, and OpenAI to create innovative business solutions.",
    url: "https://www.explainx.ai/careers",
    siteName: "ExplainX - AI Agents Development Agency",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers in AI Agent Development | ExplainX",
    description: "Join the team building next-gen AI agents. Work with LangChain, CrewAI, and cutting-edge AI technologies.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default function CareersPage() {
  return (
    <div className="container max-w-7xl mx-auto px-6 py-12 mt-16">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <h1 className="font-cal text-4xl md:text-5xl">Build the Future of AI</h1>
        <p className="text-muted-foreground max-w-[700px]">
          Join our mission to revolutionize business automation through innovative AI agents and intelligent solutions.
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