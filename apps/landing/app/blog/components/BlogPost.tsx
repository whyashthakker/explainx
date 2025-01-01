import postData from "../../../data/post-data";
import { BasicLayout } from "./basic-layout";
import { Prose } from './Prose';
import { RelatedPosts } from "./related-posts";

interface BlogPostProps {
  date: string;
  title: string;
  author: string;
  content: React.ReactNode;
}

export function BlogPost(props: BlogPostProps) {
  const { date, title = '', author, content } = props;

  return (
    <BasicLayout>
      <div className="mx-auto max-w-7xl px-6 py-20">
        <article className="mx-auto max-w-3xl">
          <div className="mt-12">
            <Prose>{content}</Prose>
          </div>

          {/* Add this line */}
          <RelatedPosts />
        </article>
      </div>
    </BasicLayout>
  );
}