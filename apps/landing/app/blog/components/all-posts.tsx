// app/sitemap/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { BasicLayout } from "../components/basic-layout";
import postData from "../../../data/post-data";

export const metadata: Metadata = {
  title: "ExplainX: Transform Your Business with Transparent AI Solutions",
  description:
    "Discover how ExplainX is revolutionizing business AI implementation with their explainable AI framework, custom agent development, and comprehensive training solutions.",
  keywords: [
    "AI agents",
    "MVP solutions",
    "AI agent automation",
    "AI agent development",
    "AI agent training",
    "AI agent implementation",
    "AI agent optimization",
    "AI agent monitoring",
    "AI agent troubleshooting",
    "AI agent maintenance",
  ].join(", "),
  openGraph: {
    title: "ExplainX: Pioneering Transparent and Trustworthy AI Solutions",
    description:
      "Explore ExplainX's comprehensive AI agent solutions, including custom agent development, agent training, and agent monitoring.",
    type: "website",
    images: [
      {
        url: "https://www.google.com/maps/uv?viewerState=lb&pb=!1s0x11ae81c94242f451:0x2a6b0cac40414137!5sGlobstand+technologies&imagekey=!1e10!2sAF1QipPrTTNGxsOszQTXFD3b68e40o0V_LiVsTWwh-H6&cr=rp_35",
        width: 1200,
        height: 630,
        alt: "ExplainX AI Agent Automation Solutions",
      },
    ],
    siteName: "Explainx Resource Library",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
  return posts.reduce(
    (acc, post) => {
      const date = new Date(post.datetime);
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "long" });

      if (!acc[year]) {
        acc[year] = {};
      }
      if (!acc[year][month]) {
        acc[year][month] = [];
      }

      acc[year][month].push(post);
      return acc;
    },
    {} as Record<number, Record<string, Post[]>>,
  );
}

export default function SitemapPage() {
  const groupedPosts = groupPostsByDate(postData);
  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a));

  return (
    <BasicLayout>
      <div className="bg-[#0A0A0A] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="mb-16">
              <h1 className="font-cal text-4xl tracking-tight text-white mb-4">
                Complete Article Archive
              </h1>
              <p className="text-lg text-gray-400">
                Browse our comprehensive collection of e-commerce insights and
                marketplace strategies.
              </p>
            </div>

            {/* Archive List */}
            <div className="space-y-16">
              {years.map((year) => (
                <section key={year} className="border-t border-gray-800 pt-10">
                  <h2 className="text-2xl font-cal text-white mb-8">
                    {year}
                  </h2>

                  {Object.entries(groupedPosts[Number(year)] || {}).map(
                    ([month, posts]) => (
                      <div key={month} className="mb-12">
                        <h3 className="text-lg font-medium text-white mb-6">
                          {month}
                        </h3>
                        <ul className="space-y-4">
                          {posts.map((post) => (
                            <li key={post.url} className="group">
                              <article className="relative">
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                                  <time
                                    dateTime={post.datetime}
                                    className="text-sm text-gray-500 w-28 shrink-0"
                                  >
                                    {new Date(post.datetime).toLocaleDateString(
                                      "en-US",
                                      {
                                        day: "2-digit",
                                        month: "short",
                                      },
                                    )}
                                  </time>
                                  <div className="flex-1">
                                    <Link
                                      href={post.url}
                                      className="text-white hover:text-gray-400 transition-colors"
                                      hrefLang={post.language}
                                    >
                                      <h4 className="text-base font-medium group-hover:text-gray-400">
                                        {post.title}
                                      </h4>
                                    </Link>
                                    <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                                      {post.description}
                                    </p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {post.categories.map((category) => (
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
                    ),
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}