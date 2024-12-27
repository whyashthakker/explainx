import { Metadata } from "next";
import { SalesContactForm } from "./_components/component-contact-sales";

export const metadata: Metadata = {
  title: "Enterprise Solutions | Infloq - AI-Powered Influencer Marketing Platform",
  description: "Scale your influencer marketing with Infloq's enterprise solutions. Custom features for large brands, agencies, and multi-market campaigns. Get dedicated support, advanced analytics, and AI-powered campaign optimization.",
  alternates: {
    canonical: "/contact-sales",
  },
  keywords: [
    "enterprise influencer marketing",
    "brand collaboration platform",
    "agency influencer tools",
    "scaled influencer campaigns",
    "multi-market influencer management",
    "enterprise marketing solutions",
    "AI campaign optimization",
    "influencer analytics platform",
    "brand partnership tools",
    "creator relationship management",
    "enterprise marketing ROI",
    "global influencer campaigns",
    "agency marketing tools",
    "brand safety tools",
    "campaign automation platform"
  ].join(", "),
  openGraph: {
    title: "Enterprise Influencer Marketing Solutions | Infloq",
    description: "Transform your influencer marketing strategy with Infloq's enterprise platform. Get custom solutions, advanced AI matching, and comprehensive campaign management tools.",
    url: "https://infloq.com/contact-sales",
    siteName: "Infloq",
    images: [
      {
        url: "/images/enterprise-og.png",
        width: 1200,
        height: 630,
        alt: "Infloq Enterprise Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scale Your Influencer Marketing with Infloq Enterprise",
    description: "Connect with our enterprise team to discover how Infloq's AI-powered platform can transform your influencer marketing strategy.",
    images: ["/images/enterprise-og.png"],
    site: "@infloq",
    creator: "@infloq"
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
      name: "Infloq Enterprise Team",
      url: "https://infloq.com/enterprise",
    },
  ],
  category: "Enterprise",
  verification: {
    google: "your-google-verification-code",
  },
};

export default function ContactSalesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Enterprise Influencer Marketing Solutions</h1>
          <p className="text-xl text-gray-600">Scale your influencer campaigns with AI-powered precision</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">For Global Brands</h2>
            <ul className="space-y-3">
              <li>• Multi-market campaign management</li>
              <li>• Brand safety controls</li>
              <li>• Advanced ROI tracking</li>
              <li>• Custom creator vetting</li>
              <li>• Dedicated account team</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">For Agencies</h2>
            <ul className="space-y-3">
              <li>• Multi-client management</li>
              <li>• White-label options</li>
              <li>• Campaign automation</li>
              <li>• Client reporting tools</li>
              <li>• Agency dashboard</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Enterprise Features</h2>
            <ul className="space-y-3">
              <li>• Advanced AI matching</li>
              <li>• Custom integrations</li>
              <li>• Priority support</li>
              <li>• Compliance tools</li>
              <li>• API access</li>
            </ul>
          </div>
        </div>

        <SalesContactForm />

        <div className="mt-12 text-center text-gray-600">
          <p className="mb-2">Contact our enterprise team directly:</p>
          <p className="font-semibold">enterprise@infloq.com</p>
          <p className="mt-4 text-sm">Expected response time: Within 12 hours</p>
        </div>
      </div>
    </div>
  );
}