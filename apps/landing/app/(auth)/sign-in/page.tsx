import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.infloq.com"),
  title: "Sign In | Access Your Infloq Account",
  description: "Sign in to your Infloq account to manage your influencer marketing campaigns, connect with brands, and grow your creator business.",
  openGraph: {
    title: "Sign In to Infloq | Creator Dashboard Access",
    description: "Access your Infloq dashboard to manage your influencer marketing campaigns and brand collaborations.",
    url: "https://www.infloq.com/signin",
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
    title: "Sign In to Infloq",
    description: "Access your Infloq dashboard to manage your influencer marketing campaigns and brand collaborations.",
    images: ["/og-image.png"],
  }
};

export default function SignInPage() {
  redirect("https://brand.infloq.com/login");
  return null;
}