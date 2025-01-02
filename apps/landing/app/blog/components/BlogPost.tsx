import { BasicLayout } from "./basic-layout";
import { MDXContent } from "./mdx-content";
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
      {/* Add min-height to reserve space */}
      <div className="mx-auto max-w-7xl px-6 py-20 min-h-[800px]">
        <article className="mx-auto max-w-3xl">
          <div className="mt-12">
            <Prose>
              <MDXContent>{content}</MDXContent>
            </Prose>
          </div>
          <RelatedPosts />
        </article>
      </div>
    </BasicLayout>
  );
}