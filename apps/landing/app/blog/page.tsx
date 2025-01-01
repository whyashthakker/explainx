import { BasicLayout } from "./components/basic-layout";
import { Posts } from "./components/posts";
import postData from "../../data/post-data";

// This is a Server Component that fetches and passes data
export default async function BlogPage() {
  return (
    <BasicLayout>
      {/* Pass the pre-fetched data to the client component */}
      <Posts initialPosts={postData} />
    </BasicLayout>
  );
}
