'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Badge } from '@repo/ui/components/ui/badge';
import { usePathname } from 'next/navigation';
import postData from '../../../data/post-data';

export function RelatedPosts() {
  const pathname = usePathname();
  
  const relatedPosts = useMemo(() => {
    // Find current post from the path
    const currentPost = postData.find(post => {
      const postPath = new URL(post.url).pathname;
      return postPath === pathname;
    });

    if (!currentPost) return [];

    // First, get all posts in the same language (excluding current post)
    const sameLanguagePosts = postData.filter(post => 
      post.language === currentPost.language && post.title !== currentPost.title
    );

    // Then sort them by number of matching categories
    const postsWithRelevanceScore = sameLanguagePosts.map(post => ({
      ...post,
      matchingCategories: post.categories.filter(category => 
        currentPost.categories.includes(category)
      ).length
    }));

    // Sort by matching categories count (most matches first)
    return postsWithRelevanceScore
      .sort((a, b) => b.matchingCategories - a.matchingCategories)
      .slice(0, 3) // Get top 3 most relevant posts
      .map(({ matchingCategories, ...post }) => post); // Remove the temporary matchingCategories field
  }, [pathname]);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 print:hidden">
      <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link 
            key={post.file} 
            href={post.url}
            className="group no-underline"
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4">
                {/* Author Info */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={post.author.imageUrl}
                      alt={post.author.name}
                      fill
                      sizes="(max-width: 32px) 100vw, 32px"
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {post.author.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {post.date}
                    </p>
                  </div>
                </div>

                {/* Post Title */}
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                  {post.title}
                </h3>

                {/* Post Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {post.description}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <Badge 
                      key={category} 
                      variant="secondary"
                      className="capitalize"
                    >
                      {category.replace(/-/g, ' ')}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}