import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.infloq.com"),
  title: "Login | Access Your Infloq Dashboard",
  description: "Log in to your Infloq account to access your dashboard, manage campaigns, and connect with leading brands in the influencer marketing space.",
  openGraph: {
    title: "Login to Infloq | Creator Dashboard",
    description: "Access your Infloq dashboard to manage your influencer marketing journey and brand partnerships.",
    url: "https://www.infloq.com/login",
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
    title: "Login to Infloq",
    description: "Access your Infloq dashboard to manage your influencer marketing journey and brand partnerships.",
    images: ["/og-image.png"],
  }
};

export default function LoginPage() {
  redirect("https://brand.infloq.com/login");
  return null;
}