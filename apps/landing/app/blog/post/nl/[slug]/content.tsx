"use client";

import { BlogPost } from "../../../components/BlogPost";

import { useEffect, useState } from "react";
import Loading from "./loading";

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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        const importPath = `../../../_posts/nl/${slug}.mdx`;
        console.log('Attempting to import:', importPath, 'with slug:', slug);

        import(`../../../_posts/nl/${slug}.mdx`)
            .then((mod) => {
                console.log('Successfully loaded module:', mod);
                setModule(mod as MDXModule);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Failed to load MDX:', {
                    error,
                    slug,
                    importPath,
                    stackTrace: error.stack
                });
                setError(error.message);
                setIsLoading(false);
            });
    }, [slug]);

    if (error) {
        return (
            <div className="p-4 text-red-600">
                <h2>Error loading content</h2>
                <p>{error}</p>
                <p>Attempted to load slug: {slug}</p>
            </div>
        );
    }

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