// components/MDXContent.tsx
import React from 'react';
import { TableOfContents } from './table-of-content';

export function MDXContent({ children }: { children: React.ReactNode }) {
  const [headings, setHeadings] = React.useState<Array<{ text: string; id: string; level: number }>>([]);

  React.useEffect(() => {
    // Wait for next tick to ensure content is rendered
    const timer = setTimeout(() => {
      const article = document.querySelector('article');
      if (article) {
        const elements = article.querySelectorAll('h2, h3');
        const headingsList = Array.from(elements).map((element) => {
          // Generate clean IDs for headings that don't have them
          if (!element.id) {
            const cleanId = element.textContent?.toLowerCase()
              .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
              .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
              || '';
            element.id = cleanId;
          }
          
          return {
            text: element.textContent || '',
            id: element.id,
            level: parseInt(element.tagName[1] || '0')
          };
        });
        
        setHeadings(headingsList);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {headings.length > 0 && <TableOfContents links={headings} />}
      {children}
    </>
  );
}