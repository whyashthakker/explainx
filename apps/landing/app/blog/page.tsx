'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BasicLayout } from "./components/basic-layout";
import { Button } from "@repo/ui/components/ui/button";
import postData from "../../data/post-data";

export default async function BlogPage() {
  return (
    <BasicLayout>
      <Posts />
    </BasicLayout>
  );
}

function Posts() {
  const posts = postData;
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  
  const languages = ["all", ...Array.from(new Set(posts.map(post => post.language)))
    .filter(lang => lang !== 'all')
    .sort()
  ];
  
  const categories = ["all", ...Array.from(new Set(
    posts.flatMap(post => post.categories)
  ))
    .filter(cat => cat !== 'all')
    .sort()
  ];
  
  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesLanguage = selectedLanguage === "all" || post.language === selectedLanguage;
    const matchesCategory = selectedCategory === "all" || post.categories.includes(selectedCategory);
    return matchesLanguage && matchesCategory;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const getLanguageDisplay = (lang: string) => {
    const displayNames: Record<string, string> = {
        all: "All Languages",
        en: "English",
        es: "Spanish (Español)",
        fr: "French (Français)",
        de: "German (Deutsch)",
        it: "Italian (Italiano)",
        hi: "Hindi (हिन्दी)",
        ar: "Arabic (العربية)",
        "zh-cn": "Chinese (Simplified)",
        ja: "Japanese (日本語)",
        ko: "Korean (한국어)",
        nl: "Dutch (Nederlands)",
        ru: "Russian (Русский)"
    };
    return displayNames[lang] || lang.toUpperCase();
};


  const formatCategory = (category: string) => {
    if (category === 'all') return 'All Topics';
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleFilterChange = (type: 'language' | 'category', value: string) => {
    if (type === 'language') setSelectedLanguage(value);
    if (type === 'category') setSelectedCategory(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="font-cal text-3xl tracking-tight text-gray-900 sm:text-4xl">
                From the blog
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                To keep up to date with the future of AI.
              </p>
            </div>
            <Button
              variant="default"
              className="mt-3 sm:mt-0"
            >
              Get Olly
            </Button>
          </div>

      {/* Balanced Filters */}
      <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleFilterChange('language', 'all')}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all
                  ${selectedLanguage === 'all' 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'text-gray-600 hover:bg-gray-100'}`}
              >
                All Languages
              </button>
              {languages.slice(1).map((language) => (
                <button
                  key={language}
                  onClick={() => handleFilterChange('language', language)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all
                    ${selectedLanguage === language 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {getLanguageDisplay(language)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Topics:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleFilterChange('category', 'all')}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all
                  ${selectedCategory === 'all' 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'text-gray-600 hover:bg-gray-100'}`}
              >
                All Topics
              </button>
              {categories.slice(1, 7).map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange('category', category)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all
                    ${selectedCategory === category 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {formatCategory(category)}
                </button>
              ))}
              {categories.length > 8 && (
                <select
                  value={selectedCategory}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="text-sm text-gray-600 rounded-full px-3 py-1.5 border-gray-200 focus:ring-gray-500 focus:border-gray-500"
                >
                  <option value="all">More topics...</option>
                  {categories.slice(7).map((category) => (
                    <option key={category} value={category}>
                      {formatCategory(category)}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

          {/* Posts List */}
          {currentPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No posts available with selected filters.</p>
            </div>
          ) : (
            <div className="mt-5 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
              {currentPosts.map((post) => (
                <article
                  key={post.title}
                  className="flex max-w-xl flex-col items-start justify-between group hover:transform hover:scale-[1.02] transition-all duration-200"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <time dateTime={post.datetime} className="text-gray-500">
                      {post.date}
                    </time>
                    <span className="text-gray-600 font-medium">
                      {getLanguageDisplay(post.language)}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {post.categories.map(category => (
                        <button
                          key={category}
                          onClick={() => handleFilterChange('category', category)}
                          className="text-gray-600 hover:text-gray-800 font-medium cursor-pointer"
                        >
                          #{formatCategory(category)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 font-cal text-lg leading-6 text-gray-900 group-hover:text-gray-700">
                      <Link href={post.url} locale={post.language}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.description}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <Image
                      src={post.author.imageUrl}
                      alt=""
                      className="h-10 w-10 rounded-full bg-gray-50"
                      width={40}
                      height={40}
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <a href={post.author.href} hrefLang={post.language}>
                          <span className="absolute inset-0" />
                          {post.author.name}
                        </a>
                      </p>
                      <p className="text-gray-600">{post.author.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="text-gray-700 border-gray-200 hover:bg-gray-50"
              >
                Previous
              </Button>
              
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="text-gray-700 border-gray-200 hover:bg-gray-50"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}