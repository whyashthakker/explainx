import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

type TOCLink = {
  text: string;
  id: string;
  level: number;
};

export function TableOfContents({ links }: { links: TOCLink[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredLinks = links.slice(0, links.findIndex(link => link.text.includes('Related Posts')));

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

  return (
    <div className="mb-8 bg-gray-50/50 rounded-lg p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-gray-900 hover:text-gray-600 transition-colors"
        aria-expanded={isExpanded}
        aria-controls="toc-list"
      >
        <div className="flex items-center space-x-2">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <span className="font-semibold">Table of Contents</span>
        </div>
      </button>
      
      {isExpanded && (
        <nav className="mt-3" aria-label="Table of contents">
          <ul id="toc-list" className="space-y-2 list-none">
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
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={clsx(
                    'block py-1 text-gray-600',
                    'hover:text-gray-900 transition-colors',
                    'no-underline relative',
                    'after:absolute after:bottom-0 after:left-0 after:h-px',
                    'after:w-0 hover:after:w-full after:transition-all',
                    'after:bg-gray-300'
                  )}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}