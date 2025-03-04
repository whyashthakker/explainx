import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Content } from "./content";
import fs from "fs";
import path from "path";
import prismadb from "@repo/db";
import { StructuredData } from "../../StructuredData";

// ----- 1. CONFIGURATION -----

// Define supported languages and their configurations
const SUPPORTED_LANGUAGES = {
  en: { dir: "ltr", prefix: "" },
  ar: { dir: "rtl", prefix: "/ar" },
  de: { dir: "ltr", prefix: "/de" },
  es: { dir: "ltr", prefix: "/es" },
  fr: { dir: "ltr", prefix: "/fr" },
  hi: { dir: "ltr", prefix: "/hi" },
  it: { dir: "ltr", prefix: "/it" },
  ja: { dir: "ltr", prefix: "/ja" },
  ko: { dir: "ltr", prefix: "/ko" },
  nl: { dir: "ltr", prefix: "/nl" },
  ru: { dir: "ltr", prefix: "/ru" },
  "zh-cn": { dir: "ltr", prefix: "/zh-cn" },
} as const;

// ----- 2. TYPE DEFINITIONS -----

type Params = Promise<{
  slug: string;
}>;

type BlogPostMetadata = {
  title: string;
  description: string;
  date: string;
  author: string;
  language?: string;
  wordCount?: number;
};

// ----- 3. DATA FETCHING FUNCTIONS -----

// Function to get post from database
async function getPostFromDatabase(slug: string) {
  try {
    const post = await prismadb.blogPost.findFirst({
      where: {
        slug,
        isPublished: true,
        language: "it",
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!post) return null;

    return {
      type: "database",
      metadata: {
        title: post.title,
        description: post.description,
        date: post.date
          ? post.date.toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        author: "Yash Thakker",
        language: post.language || "it",
        wordCount: post.content ? post.content.split(/\s+/).length : undefined,
      },
      content: post.content,
      categories: post.categories,
    };
  } catch (error) {
    console.error("Error fetching post from database:", error);
    return null;
  }
}

// Function to get post from MDX file
async function getPostFromMDX(
  slug: string,
): Promise<{ type: "mdx"; metadata: BlogPostMetadata | null }> {
  try {
    const postsDirectory = path.join(process.cwd(), "app/blog/_posts/it");
    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return { type: "mdx", metadata: null };
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const metadataMatch = fileContent.match(
      /export const metadata = ({[\s\S]*?})/,
    );
    if (!metadataMatch) return { type: "mdx", metadata: null };

    const metadata = eval(`(${metadataMatch[1]})`) as Omit<
      BlogPostMetadata,
      "language"
    >;
    return {
      type: "mdx",
      metadata: {
        ...metadata,
        language: "it",
      },
    };
  } catch (error) {
    console.error("Error reading post metadata:", error);
    return { type: "mdx", metadata: null };
  }
}

// Combined function to get post from either source
async function getPost(slug: string) {
  // First try to get from database
  const dbPost = await getPostFromDatabase(slug);
  if (dbPost) return dbPost;

  // If not in database, try MDX
  const mdxPost = await getPostFromMDX(slug);
  if (mdxPost.metadata) return mdxPost;

  // Post not found in either source
  return null;
}

// ----- 4. NEXT.JS PAGE CONFIGURATION -----

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;
  const post = await getPost(slug);

  if (!post || !post.metadata) {
    return {
      title: "Post non trovato",
      robots: { index: false },
    };
  }

  const defaultImage = "/images/main/landing.png";
  const baseUrl = "https://www.revns.com";

  // Generate hreflang entries for all supported languages
  const alternates: Record<string, string> = {};

  // Generate alternates for all supported languages
  Object.entries(SUPPORTED_LANGUAGES).forEach(([lang, config]) => {
    const langPath =
      lang === "en"
        ? `/blog/post/${slug}`
        : `/blog/post${config.prefix}/${slug}`;
    alternates[lang] = `${baseUrl}${langPath}`;
  });

  // Add x-default to the alternates object
  alternates["x-default"] = `${baseUrl}/blog/post/${slug}`;

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    alternates: {
      canonical: `${baseUrl}/blog/post/it/${slug}`,
      languages: alternates,
    },
    robots: { index: true, follow: true },
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: "article",
      locale: "it_IT",
      url: `${baseUrl}/blog/post/it/${slug}`,
      title: post.metadata.title,
      description: post.metadata.description,
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description,
      images: [defaultImage],
    },
    authors: [{ url: "https://goyashy.com", name: post.metadata.author }],
    keywords: [
      "Agenti AI",
      "Soluzioni MVP",
      "Automazione degli agenti AI",
      "Sviluppo degli agenti AI",
      "Formazione degli agenti AI",
      "Implementazione degli agenti AI",
      "Ottimizzazione degli agenti AI",
      "Monitoraggio degli agenti AI",
      "Risoluzione dei problemi degli agenti AI",
      "Manutenzione degli agenti AI",
    ],
    referrer: "origin-when-cross-origin",
    category: "technology",
    other: {
      "html-lang": "it",
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // Get MDX files from the Italian directory
  const postsDirectory = path.join(process.cwd(), "app/blog/_posts/it");

  // Check if directory exists first
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const mdxPosts = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(/\.mdx$/, "") }));

  // We can't get database posts at build time for static generation
  // They will be handled by dynamic rendering

  return mdxPosts;
}

// For ISR, we want to allow dynamic parameters
export const dynamicParams = true;

// Use the Next.js 13+ segment configuration
export const revalidate = 3600; // Revalidate every hour

// ----- 5. PAGE COMPONENT -----

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  const post = await getPost(slug);

  if (!post || !post.metadata) {
    notFound();
  }

  const defaultImage = ["/images/main/landing.png"];

  // Estimate reading time and word count for structured data
  let wordCount = 0;
  let timeToRead = "";

  if (post.type === "database" && "content" in post) {
    // Rough estimate of word count for database content
    wordCount = post.content.split(/\s+/).length;
    // Estimate reading time (average reading speed of 200-250 words per minute)
    const minutes = Math.ceil(wordCount / 225);
    timeToRead = `PT${minutes}M`;
  }

  return (
    <>
      <StructuredData
        headline={post.metadata.title}
        datePublished={post.metadata.date!}
        dateModified={post.metadata.date!}
        authorName={post.metadata.author}
        authorUrl="https://goyashy.com"
        image={defaultImage}
        language="it"
        categories={post.type === "database" ? post.categories : undefined}
        keywords={[
          "Agenti AI",
          "Soluzioni MVP",
          "Automazione degli agenti AI",
          "Sviluppo degli agenti AI",
          "Formazione degli agenti AI",
          "Implementazione degli agenti AI",
          "Ottimizzazione degli agenti AI",
          "Monitoraggio degli agenti AI",
          "Risoluzione dei problemi degli agenti AI",
          "Manutenzione degli agenti AI",
        ]}
        description={post.metadata.description}
        mainEntityOfPage={`https://www.explainx.ai/blog/post/it/${slug}`}
        publisher={{
          name: "AISOLO Technologies Pvt. Ltd. (Parent of explainx.ai)",
          logo: "https://www.explainx.ai/icons/ExplainX.png",
        }}
        timeToRead={timeToRead || undefined}
        wordCount={wordCount || undefined}
        isOriginal={true}
      />
      {post.type === "mdx" ? (
        <Content
          slug={slug}
          metadata={{
            title: post.metadata.title,
            date: post.metadata.date!,
            author: post.metadata.author,
          }}
        />
      ) : (
        <Content
          slug={slug}
          metadata={{
            title: post.metadata.title,
            date: post.metadata.date!,
            author: post.metadata.author,
          }}
          dbContent={"content" in post ? post.content : ""}
        />
      )}
    </>
  );
}
