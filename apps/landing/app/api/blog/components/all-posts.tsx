// app/sitemap/page.tsx
import type { Metadata } from 'next'
import Link from "next/link";
import { BasicLayout } from "../components/basic-layout";
import postData from "../../../data/post-data";

export const metadata: Metadata = {
  title: "Blog Archive | Revns - Complete E-commerce Resource Library",
  description: "Browse our complete library of e-commerce articles, guides, and insights for Amazon, Flipkart, Zepto, Blinkit, and Nykaa marketplace success.",
  keywords: [
    "e-commerce articles",
    "marketplace guides",
    "seller resources",
    "e-commerce blog archive",
    "online business guides",
    "marketplace tutorials",
    "Revns articles",
  ].join(", "),
  openGraph: {
    title: "Complete E-commerce Article Archive | Revns",
    description: "Access our full library of e-commerce and marketplace resources for seller success.",
    type: "website",
    images: [
      {
        url: 'https://www.google.com/maps/uv?viewerState=lb&pb=!1s0x11ae81c94242f451:0x2a6b0cac40414137!5sGlobstand+technologies&imagekey=!1e10!2sAF1QipPrTTNGxsOszQTXFD3b68e40o0V_LiVsTWwh-H6&cr=rp_35',
        width: 1200,
        height: 630,
        alt: 'Revns Blog Archive',
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
};

type Post = {
  title: string;
  description: string;
  date: string;
  datetime: string;
  language: string;
  url: string;
  categories: string[];
};

// Group posts by year and month
function groupPostsByDate(posts: Post[]) {
  return posts.reduce((acc, post) => {
    const date = new Date(post.datetime);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    
    acc[year][month].push(post);
    return acc;
  }, {} as Record<number, Record<string, Post[]>>);
}

export default function SitemapPage() {
  const groupedPosts = groupPostsByDate(postData);
  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a));

  return (
    <BasicLayout>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="mb-16">
              <h1 className="font-cal text-4xl tracking-tight text-gray-900 mb-4">
                Complete Article Archive
              </h1>
              <p className="text-lg text-gray-600">
                Browse our comprehensive collection of e-commerce insights and marketplace strategies.
              </p>
            </div>

            {/* Archive List */}
            <div className="space-y-16">
              {years.map(year => (
                <section key={year} className="border-t border-gray-200 pt-10">
                  <h2 className="text-2xl font-cal text-gray-900 mb-8">{year}</h2>
                  
                  {Object.entries(groupedPosts[Number(year)] || {}).map(([month, posts]) => (
                    <div key={month} className="mb-12">
                      <h3 className="text-lg font-medium text-gray-900 mb-6">{month}</h3>
                      <ul className="space-y-4">
                        {posts.map(post => (
                          <li key={post.url} className="group">
                            <article className="relative">
                              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                                <time 
                                  dateTime={post.datetime}
                                  className="text-sm text-gray-500 w-28 shrink-0"
                                >
                                  {new Date(post.datetime).toLocaleDateString('en-US', {
                                    day: '2-digit',
                                    month: 'short'
                                  })}
                                </time>
                                <div className="flex-1">
                                  <Link 
                                    href={post.url}
                                    className="text-gray-900 hover:text-gray-600 transition-colors"
                                    hrefLang={post.language}
                                  >
                                    <h4 className="text-base font-medium group-hover:text-gray-600">
                                      {post.title}
                                    </h4>
                                  </Link>
                                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                    {post.description}
                                  </p>
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {post.categories.map(category => (
                                      <span 
                                        key={category} 
                                        className="text-xs text-gray-500"
                                      >
                                        #{category}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </article>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}