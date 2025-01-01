// components/TableOfContents.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

type TOCLink = {
  text: string;
  id: string;
  level: number;
};

export function TableOfContents({ links }: { links: TOCLink[] }) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Filter out Related Posts and anything after it
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
    <div className="border rounded-lg border-gray-200 mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <span className="text-lg font-medium text-gray-900">Table of Contents</span>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-500" />
        )}
      </button>
      
      {isExpanded && (
        <nav className="px-4 pb-4">
          <ul className="space-y-2 list-none">
            {filteredLinks.map((link) => (
              <li
                key={link.id}
                className={`${link.level === 2 ? '' : 'ml-4'}`}
              >
                <a
                  href={`#${link.id}`}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(e, link.id)}
                  className="text-gray-600 hover:text-gray-900 transition-colors block py-1"
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