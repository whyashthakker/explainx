"use client";

import type { MDXComponents } from "mdx/types";

// Add proper types and components you want to use in MDX
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // You can uncomment these once you set up Image properly
    // img: (props) => <Image {...props} width={800} height={400} />,
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mb-3">{children}</h2>,
    p: ({ children }) => <p className="mb-4">{children}</p>,
    ...components,
  };
}