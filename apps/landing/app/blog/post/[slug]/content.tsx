// app/blog/post/[slug]/content.tsx
"use client";

import { useEffect, useState } from "react";
import Loading from "./loading";
import { BlogPost } from "../../components/BlogPost";

type ContentProps = {
    slug: string;
    metadata: {
        title: string;
        date: string;
        author: string;
    };
};

type MDXModule = {
    default: React.ComponentType;
    metadata: any;
};

export function Content({ slug, metadata }: ContentProps) {
    const [module, setModule] = useState<MDXModule | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        import(`../../_posts/(en)/${slug}.mdx`)
            .then((mod) => {
                setModule(mod as MDXModule);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Failed to load MDX:', error);
                setIsLoading(false);
            });
    }, [slug]);

    if (isLoading || !module) {
      return <Loading />;
    }

    const MDXContent = module.default;

    return (
        <BlogPost
            date={metadata.date}
            title={metadata.title}
            author={metadata.author}
            content={<MDXContent />}
        />
    );
}