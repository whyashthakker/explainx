import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

type TOCLink = {
  text: string;
  id: string;
  level: number;
};

export function TableOfContents({ links }: { links: TOCLink[] }) {
  // Start expanded by default
  const [isExpanded, setIsExpanded] = useState(true);

  // Improve filtering to be more explicit about what we're excluding
  const filteredLinks = links.filter(link => 
    !link.text.toLowerCase().includes('related posts') && 
    !link.text.toLowerCase().includes('table of contents')
  );

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const header = document.querySelector('header');
      const headerHeight = header?.offsetHeight || 0;
      const top = element.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Return null if no valid links
  if (filteredLinks.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="mb-8 bg-[#0A0A0A]/90 rounded-lg p-4 border border-gray-800">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-white hover:text-gray-300 transition-colors"
        aria-expanded={isExpanded}
        aria-controls="toc-list"
      >
        <div className="flex items-center space-x-2">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="font-semibold">On this page</span>
        </div>
      </button>
      
      {isExpanded && (
        <ul 
          id="toc-list" 
          className="mt-3 space-y-2 list-none"
          role="list"
        >
          {filteredLinks.map((link) => (
            <li
              key={link.id}
              className={clsx(
                'leading-normal',
                link.level === 2 ? 'ml-0' : 'ml-4'
              )}
            >
              <a
                href={`#${link.id}`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(e, link.id)}
                className={clsx(
                  'block py-1 text-gray-400',
                  'hover:text-white transition-colors',
                  'no-underline relative',
                  'after:absolute after:bottom-0 after:left-0 after:h-px',
                  'after:w-0 hover:after:w-full after:transition-all',
                  'after:bg-gray-600'
                )}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}