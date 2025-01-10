import { Metadata } from "next";
import { SalesContactForm } from "./_components/component-contact-sales";

export const metadata: Metadata = {
  title: "Enterprise AI Agent Solutions | ExplainX - Custom AI Development Agency",
  description: "Scale your business with ExplainX's enterprise AI agent solutions. Custom AI development for large enterprises, agencies, and global operations. Get dedicated support, advanced automation, and intelligent process optimization.",
  alternates: {
    canonical: "/contact-sales",
  },
  keywords: [
    "enterprise ai agents",
    "custom ai development",
    "langchain enterprise solutions",
    "crewai for business",
    "ai agent automation",
    "enterprise ai solutions",
    "openai integration services",
    "ai development platform",
    "business process automation",
    "ai consulting services",
    "enterprise automation ROI",
    "global ai solutions",
    "agency ai tools",
    "ai agent marketplace",
    "intelligent automation platform",
    "free ai agents enterprise",
    "ai agents for seo enterprise",
    "ai agents for marketing teams",
    "enterprise automation tools",
    "custom ai implementation"
  ].join(", "),
  openGraph: {
    title: "Enterprise AI Agent Development Solutions | ExplainX",
    description: "Transform your business processes with ExplainX's enterprise AI platform. Get custom AI agents, advanced automation, and comprehensive implementation support.",
    url: "https://explainx.ai/contact-sales",
    siteName: "ExplainX",
    images: [
      {
        url: "/images/main/landing.png",
        width: 1200,
        height: 630,
        alt: "ExplainX Enterprise AI Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scale Your Business with ExplainX Enterprise AI Agents",
    description: "Connect with our enterprise team to discover how ExplainX's custom AI agents can transform your business operations.",
    images: ["/images/main/landing.png"],
    site: "@ExplainX",
    creator: "@ExplainX"
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  authors: [
    {
      name: "ExplainX Enterprise AI Team",
      url: "https://explainx.ai/enterprise",
    },
  ],
  category: "Enterprise AI Solutions",
  verification: {
    google: "your-google-verification-code",
  },
};

export default function ContactSalesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Enterprise AI Agent Solutions</h1>
          <p className="text-xl text-gray-600">Scale your operations with intelligent automation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">For Enterprises</h2>
            <ul className="space-y-3">
              <li>• Multi-department AI solutions</li>
              <li>• Custom AI agent development</li>
              <li>• Advanced performance analytics</li>
              <li>• Enterprise-grade security</li>
              <li>• Dedicated AI architect team</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">For Agencies</h2>
            <ul className="space-y-3">
              <li>• White-label AI solutions</li>
              <li>• Multi-client AI deployment</li>
              <li>• Process automation tools</li>
              <li>• Custom reporting systems</li>
              <li>• Agency AI dashboard</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Technical Features</h2>
            <ul className="space-y-3">
              <li>• LangChain & CrewAI integration</li>
              <li>• Custom AI agent development</li>
              <li>• Priority technical support</li>
              <li>• Advanced API access</li>
              <li>• Security compliance tools</li>
            </ul>
          </div>
        </div>

        <SalesContactForm />

        <div className="mt-12 text-center text-gray-600">
          <p className="mb-2">Contact our enterprise AI team directly:</p>
          <p className="font-semibold">enterprise@explainx.ai</p>
          <p className="mt-4 text-sm">Expected response time: Within 12 hours</p>
        </div>
      </div>
    </div>
  );
}