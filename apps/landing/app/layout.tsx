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



export const metadata: Metadata = {
  metadataBase: new URL("https://www.explainx.ai"),
  title:
    "ExplainX: Custom AI Agents Development Agency and Platform for Business Automation & Growth",
  description:
    "ExplainX is the leading platform for developing custom AI agents and automation solutions. Build intelligent agents for SEO, marketing, and business processes using LangChain and CrewAI. Our enterprise-grade platform enables businesses to create, deploy, and manage AI agents with measurable results.",
  keywords: [
    "ai agents development",
    "custom ai solutions",
    "langchain integration",
    "crewai platform",
    "business automation",
    "ai agents for seo",
    "ai agents for marketing",
    "enterprise ai solutions",
    "free ai agents",
    "automation platform",
    "ai development",
    "intelligent automation",
    "ai integration",
    "openai solutions",
    "business process automation",
    "ai development platform",
    "custom automation",
    "ai deployment",
    "technical integration",
    "ai analytics",
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
      <body
        className={`h-full ${inter.variable} ${calFont.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Suspense>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
    
               
          <div className="flex flex-col min-h-screen dark:bg-[#0A0A0A]">
            <HeroHeader />
            <main className="flex-grow">{children}</main>
            <PreFooter />
          </div>

          <Toaster />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}

