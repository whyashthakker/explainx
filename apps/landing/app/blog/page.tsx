import { BasicLayout } from "./components/basic-layout";
import { Posts } from "./components/posts";
import db from "@repo/db";

export const revalidate = 3600; // Revalidate every hour

// Types for post data transformation
type Author = {
  name: string;
  role: string;
  imageUrl: string;
  href: string;
};

type Post = {
  title: string;
  description: string;
  date: string;
  datetime: string;
  author: Author;
  language: string;
  categories: string[];
  url: string;
};

// This is a Server Component that fetches and formats data
export default async function BlogPage() {
  // Fetch blog posts from database
  const dbPosts = await db.blogPost.findMany({
    where: {
      isPublished: true,
    },
    include: {
      author: true, // Include author relation
    },
    orderBy: {
      date: "desc", // Most recent posts first
    },
  });

  // Transform DB posts to the format expected by the Posts component
  const formattedPosts: Post[] = dbPosts.map((post: any) => ({
    title: post.title,
    description: post.description,
    url:
      post.language === "en"
        ? `/blog/post/${post.slug}`
        : `/blog/post/${post.language}/${post.slug}`,
    date: new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    datetime: new Date(post.date).toISOString(),
    language: post.language,
    categories: post.categories,
    author: {
      name: "Yash Thakker",
      role: "Founder", // Default role
      href: "#",
      imageUrl: "/images/blog/yt.jpg",
    },
  }));

  console.log(formattedPosts[0]?.title);

  return (
    <BasicLayout>
      {/* Pass the pre-fetched and formatted data to the client component */}
      <Posts initialPosts={formattedPosts} />
    </BasicLayout>
  );
}
