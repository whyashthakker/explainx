import dynamic from 'next/dynamic';
import { BasicLayout } from "./basic-layout";
import { Prose } from './Prose';

// Dynamically import EmailPopup with ssr disabled
// const EmailPopup = dynamic(() => import('./blog-visitor-email'), {
//   ssr: false,
// });

export function BlogPost(props: {
  date: string;
  title: string;
  author: string;
  content: React.ReactNode;
}) {
  const { date, title = '', author, content } = props;

  // Function to safely generate the blog path
  const generateBlogPath = (title: string) => {
    if (!title) return '/blog';
    
    // Get the last segment of the path if it contains slashes
    const titleSegment = title.split('/').pop() || '';
    return `/blog/${titleSegment.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <BasicLayout>
      <div className="mx-auto max-w-7xl px-6 py-20 flex">
        <div className="flex-1">
          <article>
            {/* Mobile floating element */}
            {/* <div className="md:hidden mb-8">
              <BlogPostHeader />
            </div> */}

            {/* Email Popup */}
            {/* <EmailPopup currentPath={generateBlogPath(title)} /> */}

            <div className="mt-12">
              <Prose>{content}</Prose>
            </div>
          </article>
        </div>

        {/* Desktop floating element */}
        {/* <div className="ml-8 sticky top-20 self-start max-w-xs hidden md:block">
          <BlogPostHeader />
        </div> */}
      </div>
    </BasicLayout>
  );
}