import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.infloq.com"),
  title: {
    default: "Authentication - Infloq",
    template: "%s | Infloq",
  },
  description: "Access your Infloq account - the platform revolutionizing influencer marketing for creators and brands.",
  openGraph: {
    title: "Authentication - Infloq",
    description: "Access your Infloq account - connecting creators and brands in innovative ways.",
    url: "https://www.infloq.com",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Authentication - Infloq",
    description: "Access your Infloq account - connecting creators and brands in innovative ways.",
    images: ["/og-image.png"],
  }
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="text-center space-y-6">
        <Image
          src="/icons/infloq.png"
          alt="Infloq Logo"
          width={120}
          height={40}
          className="mx-auto"
          priority
        />
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-gray-900">Please wait</h1>
          <p className="text-gray-600">We're taking you to the relevant page...</p>
        </div>
        <div className="w-16 h-16 mx-auto border-t-4 border-indigo-600 border-solid rounded-full animate-spin" />
      </div>
      {children}
    </div>
  );
}