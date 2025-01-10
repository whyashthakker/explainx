import { Metadata } from "next";
import ContactForm from "./_components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | ExplainX - AI Agents Development Agency",
  description: "Connect with ExplainX's technical team for assistance with AI agent development, automation solutions, integrations, and implementation support. We help businesses build and optimize custom AI solutions.",
  alternates: {
    canonical: "/contact",
  },
  keywords: [
    "ai agent development support",
    "langchain integration help",
    "crewai implementation",
    "custom ai solutions",
    "ai automation support",
    "enterprise ai assistance",
    "ai development consulting",
    "ai agents for seo help",
    "ai agents for marketing",
    "technical integration support",
    "ai deployment assistance",
    "automation consulting",
    "api integration help",
    "ai performance optimization",
    "business automation support",
    "free ai agents help",
    "ai development guidance",
    "openai integration support",
    "technical implementation help",
    "ai architecture consulting"
  ].join(", "),
  openGraph: {
    title: "Contact ExplainX Technical Team - AI Development Support",
    description: "Get expert assistance with AI agent development. Our technical team helps businesses implement and optimize custom AI solutions.",
    url: "https://explainx.ai/contact",
    siteName: "ExplainX",
    images: [
      {
        url: "/images/main/landing-og.png",
        width: 1200,
        height: 630,
        alt: "Contact ExplainX Technical Support",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Support from ExplainX - AI Agents Development",
    description: "Need help with AI development? Our team assists with custom AI solutions, automation, and technical implementation.",
    images: ["/images/main/landing-og.png"],
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
      name: "ExplainX Technical Team",
      url: "https://explainx.ai/team",
    },
  ],
  category: "Technical Support",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Our Technical Team</h1>
          <p className="text-xl text-gray-600">We're here to help you succeed with AI agent development</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Development Support</h2>
            <ul className="space-y-2 mb-6">
              <li>• Custom AI agent development</li>
              <li>• LangChain integration</li>
              <li>• Performance optimization</li>
              <li>• API implementation</li>
              <li>• Architecture consulting</li>
            </ul>
            <p className="text-sm text-gray-600">Average response time: 4 hours</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Implementation Support</h2>
            <ul className="space-y-2 mb-6">
              <li>• Technical deployment</li>
              <li>• System integration</li>
              <li>• Security configuration</li>
              <li>• Performance monitoring</li>
              <li>• Automation setup</li>
            </ul>
            <p className="text-sm text-gray-600">Average response time: 4 hours</p>
          </div>
        </div>

        <ContactForm />

        <div className="mt-12 text-center">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Emergency Support</h2>
            <p className="text-gray-600">For urgent technical assistance:</p>
            <p className="font-medium">urgent@explainx.ai</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="font-medium mb-2">Technical Support</h3>
              <p className="text-gray-600">developers@explainx.ai</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium mb-2">Enterprise Solutions</h3>
              <p className="text-gray-600">enterprise@explainx.ai</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium mb-2">General Inquiries</h3>
              <p className="text-gray-600">hello@explainx.ai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}