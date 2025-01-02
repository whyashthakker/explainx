// app/demo/page.tsx
import type { Metadata } from "next";
import { DemoBookingForm } from "./_components/demo-booking-form";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.infloq.com"),
  title: "Book a Demo | Infloq - Performance-Based Influencer Marketing",
  description: "Schedule a personalized demo of Infloq's AI-powered influencer marketing platform. Learn how we can help you find the perfect creators and maximize ROI.",
  keywords: "Infloq demo, book demo, influencer marketing demo, creator marketing platform, AI marketing demo",
  openGraph: {
    title: "Book a Demo with Infloq | Transform Your Influencer Marketing",
    description: "Get a personalized walkthrough of Infloq's performance-based influencer marketing platform.",
    url: "https://www.infloq.com/demo",
    siteName: "Infloq - Performance-Based Influencer Marketing",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Book a Demo with Infloq"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transform Your Influencer Marketing | Book a Demo",
    description: "Schedule a personalized demo of Infloq's AI-powered platform.",
    images: ["/og-image.png"],
  }
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Information */}
          <div className="space-y-6">
            <h1 className="font-cal text-4xl md:text-5xl mb-4">
              Book Your Personalized Demo
            </h1>
            <p className="text-muted-foreground text-lg">
              Learn how Infloq can transform your influencer marketing with AI-powered creator matching and performance-based pricing.
            </p>
            
            <div className="space-y-4 mt-8">
              <h2 className="font-cal text-2xl">What you'll learn:</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <CheckIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">AI-Powered Creator Discovery</h3>
                    <p className="text-muted-foreground">See how our AI matches you with the perfect creators for your brand</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <CheckIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Performance-Based Pricing</h3>
                    <p className="text-muted-foreground">Learn about our unique pay-per-click model and ROI tracking</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <CheckIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Campaign Management</h3>
                    <p className="text-muted-foreground">Explore our suite of tools for managing and optimizing campaigns</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <CheckIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Analytics & Reporting</h3>
                    <p className="text-muted-foreground">Get insights into our real-time analytics and performance tracking</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right Column - Booking Form */}
          <div className="bg-card rounded-lg border p-6">
            <DemoBookingForm />
          </div>
        </div>
      </div>
    </main>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}