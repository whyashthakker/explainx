import { Metadata } from "next";
import ContactForm from "./_components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | AISolo Technologies - AI Agents & SaaS Platform Development",
  description: "Get in touch with AISolo Technologies for partnerships, hiring, and business inquiries. We build AI agents for automation, SaaS platforms like Infloq and Olly.social, and provide training services.",
  alternates: {
    canonical: "/contact",
  },
  keywords: [
    "aisolo technologies contact",
    "ai agents partnerships",
    "ai company hiring",
    "influencer marketing platform",
    "social media automation tool",
    "privacy tools for creators",
    "infloq partnerships",
    "olly social business",
    "bgblur collaborations",
    "ai automation services",
    "ai training programs",
    "business partnerships ai",
    "ai development hiring",
    "saas platform partnerships",
    "ai education services",
    "automation solutions contact",
    "ai consulting services",
    "technology partnerships",
    "ai startup collaboration",
    "business development ai"
  ].join(", "),
  openGraph: {
    title: "Connect with AISolo Technologies - AI Agents & SaaS Development",
    description: "Partner with AISolo Technologies for AI automation, SaaS platform development, and business collaboration opportunities. Contact us for partnerships and hiring.",
    url: "https://explainx.ai/contact",
    siteName: "AISolo Technologies",
    images: [
      {
        url: "/images/main/landing.png",
        width: 1200,
        height: 630,
        alt: "Contact ExplainX AI Development Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Support from ExplainX - AI Agents Development Experts",
    description: "Connect with our AI development team for custom agents, automation solutions, and technical implementation support.",
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
      name: "ExplainX AI Development Team",
      url: "https://explainx.ai/team",
    },
  ],
  category: "AI Development",
  verification: {
    google: "your-google-verification-code",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-[#0A0A0A]">
       <div className="bg-[#0A0A0A] container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto mt-20">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Contact AISolo Technologies</h1>
        <p className="text-center text-gray-300 mb-12 text-lg">Get in touch for partnerships, hiring opportunities, or business inquiries</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900 p-6 rounded-lg shadow border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-white">Partnerships & Business</h2>
            <ul className="space-y-2 mb-4 text-gray-300">
              <li>• Strategic partnerships</li>
              <li>• Business development opportunities</li>
              <li>• Platform integrations (Infloq, Olly.social)</li>
              <li>• Enterprise AI solutions</li>
            </ul>
            <div className="mt-4 p-3 bg-orange-600/20 rounded-lg">
              <p className="text-orange-300 font-semibold">📧 yash@explainx.ai</p>
              <p className="text-orange-200 text-sm">For partnerships & hiring inquiries</p>
            </div>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg shadow border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-white">Our Ecosystem</h2>
            <ul className="space-y-2 mb-4 text-gray-300">
              <li>• <a href="https://aisolo.tech" className="text-orange-400 hover:text-orange-300">aisolo.tech</a> - Core homepage</li>
              <li>• <a href="https://goyashy.com" className="text-orange-400 hover:text-orange-300">goyashy.com</a> - Founder page</li>
              <li>• <a href="https://infloq.com" className="text-orange-400 hover:text-orange-300">infloq.com</a> - Influencer management</li>
              <li>• <a href="https://olly.social" className="text-orange-400 hover:text-orange-300">olly.social</a> - Social media toolkit</li>
              <li>• <a href="https://bgblur.com" className="text-orange-400 hover:text-orange-300">bgblur.com</a> - Privacy tools</li>
            </ul>
          </div>
        </div>

        <ContactForm />

        <div className="mt-12 text-center text-gray-400">
          <p className="mb-2">For partnerships & hiring: <span className="text-orange-400">yash@explainx.ai</span></p>
          <p>Response time: Within 24 hours</p>
        </div>
      </div>
    </div>
    </div>
   
  );
}