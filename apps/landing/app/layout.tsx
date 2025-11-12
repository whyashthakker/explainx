import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import localFont from "next/font/local";
import Navbar from "./_components/navbar-1";
import { PreFooter } from "./_components/pre-footer";
import { Toaster } from "@repo/ui/components/ui/toaster";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "./_components/theme-provider";
import { HeroHeader } from "./_components/hero5-header";
import { Toaster as SonnerToaster } from "sonner";
import Script from "next/script";
// import {} from "";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: true,
  display: "swap",
});

const calFont = localFont({
  src: "../styles/CalSans-SemiBold.woff2",
  variable: "--font-cal",
  preload: true,
  display: "swap",
});

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;



export const metadata: Metadata = {
  metadataBase: new URL("https://www.explainx.ai"),
  title:
    "AISolo Technologies Private Limited - AI Agents, SaaS Platforms & Education Services",
  description:
    "AISolo Technologies builds AI agents for automation, training & education services. Creators of Infloq (influencer management), Olly.social (social media toolkit), and BGBlur (privacy tools). Quality work over surface-level solutions.",
  keywords: [
    "aisolo technologies",
    "ai agents automation",
    "infloq influencer management",
    "olly social media toolkit",
    "bgblur privacy tools",
    "ai training services",
    "ai education programs",
    "saas platform development",
    "business automation ai",
    "social media automation",
    "influencer marketing platform",
    "creator privacy tools",
    "ai consulting services",
    "quality ai solutions",
    "enterprise ai development",
    "ai agents training",
    "business process automation",
    "ai technology company",
    "mumbai ai startup",
    "privacy-first ai tools",
  ].join(", "),
  appLinks: {
    web: {
      url: "https://www.explainx.ai",
      should_fallback: false,
    },
  },
  generator: "ExplainX",
  referrer: "no-referrer-when-downgrade",
  authors: [
    {
      name: "ExplainX AI Development Team",
      url: "https://www.explainx.ai/team",
    },
  ],
  creator: "ExplainX",
  publisher: "ExplainX",
  openGraph: {
    title: "ExplainX: Enterprise AI Agents Development Platform",
    description:
      "Create custom AI agents for business automation and growth. Build intelligent solutions using LangChain and CrewAI, with comprehensive analytics and deployment tools. Transform your operations with measurable AI-powered automation.",
    url: "https://www.explainx.ai",
    siteName: "ExplainX - AI Agents Development Platform",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "Technology",
  twitter: {
    card: "summary_large_image",
    title: "ExplainX: Build Custom AI Agents for Your Business",
    description:
      "Create intelligent automation solutions with our AI development platform. From SEO to marketing, transform your operations with custom AI agents.",
    images: ["/og-image.png"],
    site: "@ExplainX",
    creator: "@ExplainX",
  },
  alternates: {
    canonical: "https://www.explainx.ai",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full overflow-x-hidden dark" style={{ colorScheme: "dark" }}
    >
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <body
        className={`h-full ${inter.variable} ${calFont.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Suspense>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" disableTransitionOnChange>
    
               
          <div className="flex flex-col min-h-screen dark:bg-[#0A0A0A]">
            <HeroHeader />
            <main className="flex-grow">{children}</main>
            <PreFooter />
          </div>

          <Toaster />
          <SonnerToaster />
          </ThemeProvider>
        </Suspense>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt="facebook pixel noscript"
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </body>
    </html>
  );
}

