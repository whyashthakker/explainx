import { Metadata } from "next";
import ContactForm from "./_components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Infloq - AI-Powered Influencer Marketing Platform",
  description: "Connect with Infloq's support team for assistance with influencer marketing campaigns, brand partnerships, creator collaborations, and platform features. We're here to help both brands and creators succeed.",
  alternates: {
    canonical: "/contact",
  },
  keywords: [
    "infloq contact",
    "influencer marketing support",
    "brand collaboration help",
    "creator partnership assistance",
    "influencer platform support",
    "brand marketing help",
    "content creator support",
    "campaign management assistance",
    "influencer matching help",
    "marketing ROI support",
    "brand safety assistance",
    "creator earnings help",
    "partnership guidance",
    "campaign optimization support",
    "influencer analytics help",
    "platform features support",
    "brand campaign assistance",
    "creator profile help",
    "payment support",
    "performance tracking assistance"
  ].join(", "),
  openGraph: {
    title: "Contact Infloq Support - For Brands & Creators",
    description: "Get expert assistance with your influencer marketing needs. Our support team helps brands and creators optimize their partnerships and campaign performance.",
    url: "https://infloq.com/contact",
    siteName: "Infloq",
    images: [
      {
        url: "/images/main/landing-og.png",
        width: 1200,
        height: 630,
        alt: "Contact Infloq Support",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Support from Infloq - AI-Powered Influencer Marketing",
    description: "Need help with influencer marketing? Our team assists both brands and creators with campaigns, partnerships, and platform features.",
    images: ["/images/main/landing-og.png"],
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
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Our Support Team</h1>
          <p className="text-xl text-gray-600">We're here to help you succeed with influencer marketing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Brand Support</h2>
            <ul className="space-y-2 mb-6">
              <li>• Campaign setup assistance</li>
              <li>• Creator discovery help</li>
              <li>• ROI tracking guidance</li>
              <li>• Brand safety support</li>
              <li>• Partnership optimization</li>
            </ul>
            <p className="text-sm text-gray-600">Average response time: 4 hours</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Creator Support</h2>
            <ul className="space-y-2 mb-6">
              <li>• Profile optimization</li>
              <li>• Partnership guidance</li>
              <li>• Payment assistance</li>
              <li>• Performance tracking</li>
              <li>• Content strategy help</li>
            </ul>
            <p className="text-sm text-gray-600">Average response time: 4 hours</p>
          </div>
        </div>

        <ContactForm />

        <div className="mt-12 text-center">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Emergency Support</h2>
            <p className="text-gray-600">For urgent assistance:</p>
            <p className="font-medium">urgent@infloq.com</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="font-medium mb-2">Technical Support</h3>
              <p className="text-gray-600">support@infloq.com</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium mb-2">Partnership Inquiries</h3>
              <p className="text-gray-600">partners@infloq.com</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium mb-2">General Questions</h3>
              <p className="text-gray-600">hello@infloq.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}