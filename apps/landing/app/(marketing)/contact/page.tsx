import { Metadata } from "next";
import ContactForm from "./_components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Infloq - AI-Powered Influencer Marketing Platform",
  description: "Get in touch with Infloq's support team for assistance with brand collaborations, creator partnerships, or platform inquiries. We're here to help both brands and creators succeed in their influencer marketing journey.",
  alternates: {
    canonical: "/contact",
  },
  keywords: [
    "Infloq support",
    "influencer marketing help",
    "brand collaboration support",
    "creator partnership assistance",
    "influencer platform contact",
    "Infloq customer service",
    "brand campaign help",
    "creator support",
    "influencer marketing assistance",
    "AI matchmaking support",
    "brand creator connection",
    "marketing campaign help",
    "content creator support",
    "brand partnership assistance",
    "influencer platform contact",
    "digital marketing support",
    "campaign management help",
    "social media marketing support",
    "influencer collaboration assistance",
    "performance tracking help"
  ].join(", "),
  openGraph: {
    title: "Connect with Infloq Support - For Brands & Creators",
    description: "Need help with influencer marketing? Our team assists both brands and creators with campaign management, partnerships, and platform features. Reach out for personalized support.",
    url: "https://infloq.com/contact",
    siteName: "Infloq",
    images: [
      {
        url: "/images/main/landing.png",
        width: 1200,
        height: 630,
        alt: "Contact Infloq Support Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Support from Infloq - AI-Powered Influencer Marketing",
    description: "Connect with our support team for assistance with brand-creator collaborations, campaign management, and platform features.",
    images: ["/images/main/landing.png"],
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
      name: "Infloq Support Team",
      url: "https://infloq.com/team",
    },
  ],
  category: "Support",
  verification: {
    google: "your-google-verification-code",
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Infloq Support</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">For Brands</h2>
            <ul className="space-y-2 mb-4">
              <li>• Campaign setup assistance</li>
              <li>• Creator discovery help</li>
              <li>• ROI tracking support</li>
              <li>• Platform features guidance</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">For Creators</h2>
            <ul className="space-y-2 mb-4">
              <li>• Profile optimization help</li>
              <li>• Partnership assistance</li>
              <li>• Payment support</li>
              <li>• Performance tracking help</li>
            </ul>
          </div>
        </div>

        <ContactForm />

        <div className="mt-12 text-center text-gray-600">
          <p className="mb-2">Email us directly: support@infloq.com</p>
          <p>Response time: Within 24 hours</p>
        </div>
      </div>
    </div>
  );
}