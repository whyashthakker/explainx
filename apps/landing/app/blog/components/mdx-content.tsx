// components/MDXContent.tsx
import React from 'react';
import { TableOfContents } from './table-of-content';

export function MDXContent({ children }: { children: React.ReactNode }) {
  const [headings, setHeadings] = React.useState<Array<{ text: string; id: string; level: number }>>([]);
  const [content, setContent] = React.useState<React.ReactNode>(children);

  React.useEffect(() => {
    const article = document.querySelector('article');
    if (article) {
      const elements = article.querySelectorAll('h2, h3');
      const headingsList = Array.from(elements)
        .filter(element => element.textContent !== 'Table of Contents') // Exclude TOC itself
        .map((element) => {
          if (!element.id) {
            element.id = element.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
          }
          return {
            text: element.textContent || '',
            id: element.id,
            level: parseInt(element.tagName[1] || '0')
          };
        });
      
      if (headingsList.length > 0) {
        setHeadings(headingsList);
      }
    }
  }, []);

  return (
    <>
      {headings.length > 0 && (
        <div className="mb-8">
          <TableOfContents links={headings} />
        </div>
      )}
      {content}
    </>
  );
}