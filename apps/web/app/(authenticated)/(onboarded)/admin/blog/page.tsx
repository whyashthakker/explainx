"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Switch } from "@repo/ui/components/ui/switch";
import { Label } from "@repo/ui/components/ui/label";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { AlertCircle, Trash2, Plus, RefreshCw, Search } from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  date: string;
  language: string;
  categories: string[];
  isPublished: boolean;
  authorId: string | null;
  author: {
    name: string | null;
    picture: string | null;
  } | null;
};

type GroupedBlogPost = {
  slug: string;
  posts: BlogPost[];
  languages: string[];
  title: string;
  date: string;
  categories: string[];
  isPublished: boolean;
  mainPost: BlogPost;
};

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("all");
  const [showPublishedOnly, setShowPublishedOnly] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [language, showPublishedOnly]);

  useEffect(() => {
    // Update selectAll state based on whether all posts are selected
    if (
      filteredPosts.length > 0 &&
      selectedPosts.length === filteredPosts.length
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedPosts]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      setSelectedPosts([]);

      // Build query parameters
      const params = new URLSearchParams();
      if (language !== "all") {
        params.append("language", language);
      }
      if (showPublishedOnly) {
        params.append("publishedOnly", "true");
      }
      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const response = await fetch(`/api/blog?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError("Error loading posts. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const response = await fetch(`/api/blog?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      fetchPosts();
    } catch (err) {
      setError("Error deleting post. Please try again.");
      console.error(err);
    }
  };

  const handleDeleteSelected = async () => {
    if (
      !confirm(
        `Are you sure you want to delete ${selectedPosts.length} selected posts?`,
      )
    ) {
      return;
    }

    try {
      await Promise.all(
        selectedPosts.map((id) =>
          fetch(`/api/blog?id=${id}`, {
            method: "DELETE",
          }),
        ),
      );

      fetchPosts();
      setSelectedPosts([]);
    } catch (err) {
      setError("Error deleting selected posts. Please try again.");
      console.error(err);
    }
  };

  const handleDeleteAllPosts = async () => {
    if (
      !confirm(
        "Are you sure you want to delete ALL posts? This action cannot be undone!",
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/blog?deleteAll=true`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete all posts");
      }

      fetchPosts();
    } catch (err) {
      setError("Error deleting all posts. Please try again.");
      console.error(err);
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      // First, get the post
      const response = await fetch(`/api/blog/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }

      const data = await response.json();
      const post = data.mainPost;
      const relatedPosts = data.relatedPosts || [];

      // Update the main post
      const updateResponse = await fetch("/api/blog", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...post,
          isPublished: !currentStatus,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update post");
      }

      // Update all related posts with the same publish status
      await Promise.all(
        relatedPosts.map((relatedPost: BlogPost) =>
          fetch("/api/blog", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...relatedPost,
              isPublished: !currentStatus,
            }),
          }),
        ),
      );

      fetchPosts();
    } catch (err) {
      setError("Error updating post. Please try again.");
      console.error(err);
    }
  };

  const togglePostSelection = (id: string) => {
    setSelectedPosts((prev) => {
      if (prev.includes(id)) {
        return prev.filter((postId) => postId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map((post) => post.id));
    }
    setSelectAll(!selectAll);
  };

  // Group posts by slug
  const groupPostsBySlug = (posts: BlogPost[]): GroupedBlogPost[] => {
    const groupedMap = new Map<string, BlogPost[]>();

    // Group posts by slug
    posts.forEach((post) => {
      if (!groupedMap.has(post.slug)) {
        groupedMap.set(post.slug, []);
      }
      groupedMap.get(post.slug)!.push(post);
    });

    // Convert map to array of grouped posts and filter out any with no posts
    return Array.from(groupedMap.entries())
      .map(([slug, posts]) => {
        // Sort posts by language, with English first
        const sortedPosts = [...posts].sort((a, b) => {
          if (a.language === "en") return -1;
          if (b.language === "en") return 1;
          return a.language.localeCompare(b.language);
        });

        // Use the first post (preferably English) as the main post
        const mainPost = sortedPosts[0];

        // Only proceed if we have a main post
        if (!mainPost) {
          return null; // This will be filtered out
        }

        return {
          slug,
          posts: sortedPosts,
          languages: sortedPosts.map((p) => p.language),
          title: mainPost.title || slug, // Provide default value
          date: mainPost.date || new Date().toISOString(), // Provide default value
          categories: mainPost.categories || [], // Provide default value
          isPublished: mainPost.isPublished ?? false, // Use nullish coalescing
          mainPost: mainPost,
        };
      })
      .filter((group): group is GroupedBlogPost => group !== null); // TypeScript type guard
  };
  // Filter and group posts
  const filteredPosts = posts.filter((post) => {
    if (searchTerm === "") return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.description.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      post.categories.some((cat) => cat.toLowerCase().includes(searchLower))
    );
  });

  const groupedPosts = groupPostsBySlug(filteredPosts);

  return (
    <>
      <div className="container mx-auto py-10">
        <Card className="border-0 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl font-bold text-slate-800">
                Blog Posts
              </CardTitle>
              <div className="flex gap-2">
                {selectedPosts.length > 0 && (
                  <Button
                    variant="destructive"
                    onClick={handleDeleteSelected}
                    className="flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Delete Selected ({selectedPosts.length})
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={handleDeleteAllPosts}
                  className="flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  Delete All
                </Button>
                <Button
                  onClick={() => router.push("/admin/blog/new")}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center gap-1"
                >
                  <Plus size={16} />
                  Add New Post
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border-slate-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md"
                  />
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                </div>
                <Button
                  type="submit"
                  variant="outline"
                  className="border-slate-200 hover:bg-slate-50"
                >
                  Search
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={fetchPosts}
                  className="border-slate-200 hover:bg-slate-50 flex items-center gap-1"
                >
                  <RefreshCw size={16} />
                  Refresh
                </Button>
              </form>

              <div className="flex gap-4 items-center">
                <div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="p-2 border border-slate-200 rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option value="all">All Languages</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="hi">Hindi</option>
                    <option value="ar">Arabic</option>
                    <option value="zh-cn">Chinese</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                    <option value="nl">Dutch</option>
                    <option value="ru">Russian</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published-filter"
                    checked={showPublishedOnly}
                    onCheckedChange={setShowPublishedOnly}
                  />
                  <Label htmlFor="published-filter">Published only</Label>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-200 border-t-blue-500 mb-2"></div>
                <p className="text-slate-500">Loading posts...</p>
              </div>
            ) : groupedPosts.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-lg">
                <p className="text-slate-500">No posts found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 text-sm">
                      <th className="py-3 px-4 border-b border-slate-200 text-left">
                        <div className="flex items-center">
                          <Checkbox
                            checked={selectAll}
                            onCheckedChange={toggleSelectAll}
                            className="mr-2"
                          />
                          Title
                        </div>
                      </th>
                      <th className="py-3 px-4 border-b border-slate-200 text-left">
                        Date
                      </th>
                      <th className="py-3 px-4 border-b border-slate-200 text-left">
                        Languages
                      </th>
                      <th className="py-3 px-4 border-b border-slate-200 text-left">
                        Categories
                      </th>
                      <th className="py-3 px-4 border-b border-slate-200 text-center">
                        Published
                      </th>
                      <th className="py-3 px-4 border-b border-slate-200 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedPosts.map((group) => (
                      <tr
                        key={group.slug}
                        className="hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Checkbox
                              checked={group.posts.every((post) =>
                                selectedPosts.includes(post.id),
                              )}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  // Add all posts in this group to selected
                                  setSelectedPosts((prev) => [
                                    ...prev,
                                    ...group.posts
                                      .map((p) => p.id)
                                      .filter((id) => !prev.includes(id)),
                                  ]);
                                } else {
                                  // Remove all posts in this group from selected
                                  setSelectedPosts((prev) =>
                                    prev.filter(
                                      (id) =>
                                        !group.posts.some((p) => p.id === id),
                                    ),
                                  );
                                }
                              }}
                              className="mr-2"
                            />
                            <div>
                              <div className="font-medium text-slate-800">
                                {group.title}
                              </div>
                              <div className="text-sm text-slate-500">
                                {group.slug}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {new Date(group.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {group.languages.map((lang) => (
                              <Badge
                                key={lang}
                                variant="outline"
                                className="text-xs font-normal"
                              >
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {group.categories.map((category) => (
                              <Badge
                                key={category}
                                variant="secondary"
                                className="text-xs font-normal bg-slate-100 text-slate-700"
                              >
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Switch
                            checked={group.isPublished}
                            onCheckedChange={() =>
                              handleTogglePublish(
                                group.mainPost.id,
                                group.isPublished,
                              )
                            }
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                router.push(
                                  `/admin/blog/edit/${group.mainPost.id}`,
                                )
                              }
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                              Edit All
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (
                                  confirm(
                                    `Are you sure you want to delete all ${group.languages.length} language versions of this post?`,
                                  )
                                ) {
                                  // Delete all posts in this group
                                  Promise.all(
                                    group.posts.map((post) =>
                                      fetch(`/api/blog?id=${post.id}`, {
                                        method: "DELETE",
                                      }),
                                    ),
                                  ).then(() => {
                                    fetchPosts();
                                  });
                                }
                              }}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              Delete All
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
