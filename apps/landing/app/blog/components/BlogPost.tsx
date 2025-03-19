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
      <div className="mx-auto max-w-7xl px-6 py-20 min-h-[800px]">
        <article className="mx-auto max-w-3xl">
          <div className="mt-12">
            <Prose>
              {/* Add metadata before MDX content */}
              <div className="mb-8 not-prose">
                <time dateTime={date} className="text-sm text-slate-500">
                  {date}
                </time>
                <span className="text-sm text-slate-500"> • {author}</span>
              </div>
              {/* Wrap content in a div that ensures first child is h1 with title */}
              <div className="mdx-content">
                <h1 className="font-cal text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  {title}
                </h1>
                <MDXContent>{content}</MDXContent>
              </div>
            </Prose>
          </div>
          <RelatedPosts />
        </article>
      </div>
    </BasicLayout>
  );
}