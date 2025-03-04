// app/sitemap/page.tsx
import type { Metadata } from 'next'
import { BasicLayout } from "../components/basic-layout";
import postData from "../../../data/post-data";
import { SitemapContent } from '../components/sitemap-content';

export const metadata: Metadata = {
  title: "Blog Archive | Revns - Complete E-commerce Resource Library",
  description: "Access our complete library of e-commerce guides, marketplace solutions, and business strategies for Amazon, Flipkart, Zepto, Blinkit, and Nykaa success.",
  keywords: [
    "e-commerce articles",
    "marketplace guides",
    "Amazon seller resources",
    "Flipkart seller guides",
    "e-commerce blog archive",
    "marketplace tutorials",
    "online business guides",
    "Zepto seller resources",
    "Blinkit business guides",
    "Nykaa seller resources",
    "seller success guides",
    "e-commerce library",
    "Revns resources",
  ].join(", "),
  openGraph: {
    title: "Complete E-commerce Resource Library | Revns",
    description: "Access our comprehensive collection of e-commerce guides and marketplace success strategies for leading platforms.",
    type: "website",
    images: [
      {
        url: 'https://www.google.com/maps/uv?viewerState=lb&pb=!1s0x11ae81c94242f451:0x2a6b0cac40414137!5sGlobstand+technologies&imagekey=!1e10!2sAF1QipPrTTNGxsOszQTXFD3b68e40o0V_LiVsTWwh-H6&cr=rp_35',
        width: 1200,
        height: 630,
        alt: 'Revns Resource Library',
      },
    ],
    siteName: "Revns Resource Library",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark.png', media: '(prefers-color-scheme: dark)' }
    ],
    apple: [
      { url: '/apple-icon.png' }
    ]
  },
};

export default async function SitemapPage() {
  return (
    <BasicLayout>
      <SitemapContent posts={postData} />
    </BasicLayout>
  );
}