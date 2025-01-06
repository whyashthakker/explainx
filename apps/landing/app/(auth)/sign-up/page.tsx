import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.infloq.com"),
  title: "Sign Up | Start Your Journey with Infloq",
  description: "Create an account to join Infloq - where brands and creators collaborate seamlessly.",
  openGraph: {
    title: "Join Infloq | Elevate Your Brand Collaborations",
    description: "Sign up for Infloq and transform how you connect with brands and manage influencer partnerships.",
    url: "https://www.infloq.com/signup",
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
    title: "Join Infloq | Elevate Your Brand Collaborations",
    description: "Sign up for Infloq and transform how you connect with brands and manage influencer partnerships.",
    images: ["/og-image.png"],
  }
};

export default async function SignUpPage() {
  // Add a small delay to show the loading state from the layout
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Redirect to the brand signup page
  redirect("https://brand.infloq.com/sign-up");
}