"use client";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { BlogPost } from "../../../components/BlogPost";
import ReactMarkdown from "react-markdown";

// Korean translations
const koTranslations = {
  errorLoading: "콘텐츠 로드 중 오류 발생",
  failedToLoad: "콘텐츠를 로드하지 못했습니다",
  loading: "로딩 중...",
};

type ContentProps = {
  slug: string;
  metadata: {
    title: string;
    date: string;
    author: string;
  };
  dbContent?: string; // Add support for database content
  language?: string; // Add language prop with default to 'ko'
};

type MDXModule = {
  default: React.ComponentType;
  metadata: any;
};

export function Content({
  slug,
  metadata,
  dbContent,
  language = "ko",
}: ContentProps) {
  const [module, setModule] = useState<MDXModule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState(language);

  useEffect(() => {
    setIsMounted(true);

    // If language is changed, update activeLanguage
    if (language !== activeLanguage) {
      setActiveLanguage(language);
    }

    // If we have database content, no need to load MDX
    if (dbContent) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Wrap dynamic imports in a try-catch to handle errors gracefully
    const loadMDXContent = async () => {
      try {
        // First try to load from the specific language directory (ko)
        try {
          const mod = await import(`../../../_posts/ko/${slug}.mdx`);
          setModule(mod as MDXModule);
          setIsLoading(false);
          return; // Exit if successful
        } catch (koError) {
          // If not found in ko, continue to fallback logic
        }

        // Try to load from the ar directory
        const mod = await import(`../../../_posts/ar/${slug}.mdx`);
        setModule(mod as MDXModule);
        setIsLoading(false);
      } catch (arError) {
        try {
          // If not found in ar or ko, try other language directories
          const languageDirs = [
            "en",
            "de",
            "es",
            "fr",
            "hi",
            "it",
            "ja",
            "nl",
            "ru",
            "zh-cn",
          ];

          // Try each language directory sequentially
          for (const lang of languageDirs) {
            try {
              const mod = await import(`../../../_posts/${lang}/${slug}.mdx`);
              setModule(mod as MDXModule);
              setIsLoading(false);
              return; // Exit if successful
            } catch (langError) {
              // Continue to next language
            }
          }

          // If we get here, we couldn't find the MDX in any language directory
          throw new Error("MDX file not found in any language directory");
        } catch (error) {
          console.error("Failed to load MDX:", error);
          setError(
            error instanceof Error
              ? error.message
              : "콘텐츠 로드 중 알 수 없는 오류가 발생했습니다",
          );
          setIsLoading(false);
        }
      }
    };

    loadMDXContent();
  }, [slug, dbContent, language, activeLanguage]);

  // During SSR or before mounting, return a minimal loading state
  // This ensures the server and client render the same initial content
  if (!isMounted) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 h-6 w-24 rounded"></div>
      </div>
    );
  }

  // If we have database content, render it with ReactMarkdown
  if (dbContent) {
    return (
      <BlogPost
        date={metadata.date}
        title={metadata.title}
        author={metadata.author}
        content={<ReactMarkdown>{dbContent}</ReactMarkdown>}
      />
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error || !module) {
    return (
      <div className="p-4 text-red-600">
        <h2 className="text-xl font-bold">{koTranslations.errorLoading}</h2>
        <p>{error || koTranslations.failedToLoad}</p>
      </div>
    );
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

