"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Switch } from "@repo/ui/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  AlertCircle,
  Calendar,
  Globe,
  Image,
  Tag,
  Save,
  X,
  ArrowLeft,
  Loader2,
} from "lucide-react";

type Params = Promise<{ id: string }>;

// Strict interface for LanguageContent with required fields
interface LanguageContent {
  id: string;
  content: string;
  description: string;
  title: string;
  isEnabled: boolean;
}

// Interface for blog post form data
interface BlogPostFormData {
  slug: string;
  date: string;
  categories: string[];
  isPublished: boolean;
  image: string;
  languages: Record<string, LanguageContent>;
}

// Helper function to ensure all LanguageContent fields have values
function ensureLanguageContent(
  data: Partial<LanguageContent> = {},
): LanguageContent {
  return {
    id: data.id || "",
    content: data.content || "",
    description: data.description || "",
    title: data.title || "",
    isEnabled: data.isEnabled || false,
  };
}

const AVAILABLE_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish (Español)" },
  { code: "fr", name: "French (Français)" },
  { code: "de", name: "German (Deutsch)" },
  { code: "it", name: "Italian (Italiano)" },
  { code: "hi", name: "Hindi (हिन्दी)" },
  { code: "ar", name: "Arabic (العربية)" },
  { code: "zh-cn", name: "Chinese (Simplified)" },
  { code: "ja", name: "Japanese (日本語)" },
  { code: "ko", name: "Korean (한국어)" },
  { code: "nl", name: "Dutch (Nederlands)" },
  { code: "ru", name: "Russian (Русский)" },
];

// Simple wrapper component for the layout
const BasicLayout = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export default function EditBlogPostPage(props: { params: Params }) {
  const router = useRouter();
  const [formData, setFormData] = useState<BlogPostFormData>({
    slug: "",
    //@ts-ignore
    date: new Date().toISOString().split("T")[0],
    categories: [],
    isPublished: false,
    image: "",
    languages: AVAILABLE_LANGUAGES.reduce(
      (acc, lang) => {
        acc[lang.code] = ensureLanguageContent();
        return acc;
      },
      {} as Record<string, LanguageContent>,
    ),
  });
  const params = use(props.params);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("edit");
  const [activeLanguageTab, setActiveLanguageTab] = useState("en");
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the main post and related posts
        const response = await fetch(`/api/blog/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await response.json();
        const mainPost = data.mainPost || {};
        const fetchedRelatedPosts = data.relatedPosts || [];

        // Initialize form data with the main post
        const initialFormData: BlogPostFormData = {
          slug: mainPost.slug || "",
          //@ts-ignore
          date: mainPost.date
            ? new Date(mainPost.date).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          categories: mainPost.categories || [],
          isPublished: mainPost.isPublished || false,
          image: mainPost.image || "",
          languages: AVAILABLE_LANGUAGES.reduce(
            (acc, lang) => {
              // Default all languages to disabled
              acc[lang.code] = ensureLanguageContent();
              return acc;
            },
            {} as Record<string, LanguageContent>,
          ),
        };

        // Set the main post language
        if (mainPost.language && typeof mainPost.language === "string") {
          initialFormData.languages[mainPost.language] = ensureLanguageContent({
            id: mainPost.id,
            content: mainPost.content,
            description: mainPost.description,
            title: mainPost.title,
            isEnabled: true,
          });

          // Set active language tab to the language of the main post
          setActiveLanguageTab(mainPost.language);
        }

        // Add all related posts to the form data
        fetchedRelatedPosts.forEach((relatedPost: any) => {
          if (
            relatedPost.language &&
            initialFormData.languages[relatedPost.language]
          ) {
            initialFormData.languages[relatedPost.language] =
              ensureLanguageContent({
                id: relatedPost.id,
                content: relatedPost.content,
                description: relatedPost.description,
                title: relatedPost.title,
                isEnabled: true,
              });
          }
        });

        setFormData(initialFormData);
        setRelatedPosts(fetchedRelatedPosts);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    // Only handle non-language specific fields here
    if (name !== "title") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Auto-generate slug from title if slug is empty
    if (name === "title" && !formData.slug && activeLanguageTab === "en") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleLanguageContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    langCode: string,
    field: "content" | "description" | "title",
  ) => {
    const newValue = e.target.value;

    setFormData((prev) => {
      // Create a deep copy of the languages object to avoid mutation
      const updatedLanguages = { ...prev.languages };

      // Create a deep copy of the specific language object
      //@ts-ignore
      updatedLanguages[langCode] = {
        ...updatedLanguages[langCode],
        [field]: newValue,
      };

      // Return the updated form data
      return {
        ...prev,
        languages: updatedLanguages,
      };
    });

    // Auto-generate slug from title if it's the English title and slug is empty
    if (field === "title" && !formData.slug && langCode === "en") {
      const slug = newValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleLanguageToggle = (langCode: string, isEnabled: boolean) => {
    setFormData((prev) => {
      // Create a deep copy of the languages object to avoid mutation
      const updatedLanguages = { ...prev.languages };

      // Create a deep copy of the specific language object
      //@ts-ignore
      updatedLanguages[langCode] = {
        ...updatedLanguages[langCode],
        isEnabled,
      };

      // Return the updated form data
      return {
        ...prev,
        languages: updatedLanguages,
      };
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const addCategory = () => {
    if (newCategory && !formData.categories.includes(newCategory)) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory],
      }));
      setNewCategory("");
    }
  };

  const removeCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Create an array of blog posts to update or create
      const blogPosts = Object.entries(formData.languages)
        .filter(
          ([_, langData]) => langData.isEnabled && langData.content.trim(),
        )
        .map(([langCode, langData]) => ({
          id: langData.id || undefined, // Only include ID if it exists
          title: langData.title,
          slug: formData.slug, // Use the same slug for all languages
          content: langData.content,
          description: langData.description,
          date: formData.date,
          language: langCode,
          categories: formData.categories,
          isPublished: formData.isPublished,
          image: formData.image,
        }));

      if (blogPosts.length === 0) {
        throw new Error("No content provided for any enabled language");
      }

      // Update or create each blog post
      const responses = await Promise.all(
        blogPosts.map((post) => {
          if (post.id) {
            // Update existing post
            return fetch("/api/blog", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(post),
            });
          } else {
            // Create new post
            return fetch("/api/blog", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(post),
            });
          }
        }),
      );

      // Check if any request failed
      const failedResponse = responses.find((response) => !response.ok);
      if (failedResponse) {
        const errorData = await failedResponse.json();
        throw new Error(errorData.error || "Failed to update blog posts");
      }

      // Handle posts that were disabled (delete them)
      const postsToDelete = relatedPosts
        .filter((post) => {
          const langCode = post?.language;
          // Only include posts that have a valid language code and the language is disabled
          return (
            langCode &&
            formData.languages[langCode] &&
            !formData.languages[langCode].isEnabled
          );
        })
        .map((post) => post.id || "");

      if (postsToDelete.length > 0) {
        await Promise.all(
          postsToDelete.map((id) =>
            fetch(`/api/blog?id=${id}`, {
              method: "DELETE",
            }),
          ),
        );
      }

      router.push("/admin/blog");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Count enabled languages
  const enabledLanguagesCount = Object.values(formData.languages).filter(
    (lang) => lang.isEnabled,
  ).length;

  if (loading) {
    return (
      <BasicLayout>
        <div className="container mx-auto py-10">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
                <p className="text-slate-600 text-lg">Loading post data...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout>
      <div className="container mx-auto py-10">
        <Card className="border-0 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl font-bold text-slate-800">
                Edit Blog Post
              </CardTitle>
              <Button
                variant="outline"
                onClick={() => router.push("/admin/blog")}
                className="flex items-center gap-1"
              >
                <ArrowLeft size={16} />
                Back to Posts
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-2"
            >
              <TabsList className="mb-6 w-full bg-slate-100 p-1">
                <TabsTrigger
                  value="edit"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Edit Post
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="edit">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Common fields - Column 1 */}
                    <div className="space-y-5">
                      <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
                        <h3 className="font-medium text-slate-800 mb-4 flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-600 p-1 rounded">
                            <Globe size={16} />
                          </span>
                          Post Details
                        </h3>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="slug" className="text-slate-700">
                              Slug
                            </Label>
                            <Input
                              id="slug"
                              name="slug"
                              value={formData.slug}
                              onChange={handleChange}
                              required
                              className="mt-1 border-slate-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            <p className="text-xs text-slate-500 mt-1">
                              The same slug will be used for all language
                              versions. This helps group related posts together.
                            </p>
                          </div>

                          <div>
                            <Label
                              htmlFor="date"
                              className="text-slate-700 flex items-center gap-1"
                            >
                              <Calendar size={14} />
                              Date
                            </Label>
                            <Input
                              id="date"
                              name="date"
                              type="date"
                              value={formData.date}
                              onChange={handleChange}
                              required
                              className="mt-1 border-slate-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          </div>

                          <div>
                            <Label
                              htmlFor="image"
                              className="text-slate-700 flex items-center gap-1"
                            >
                              <Image size={14} />
                              Featured Image URL
                            </Label>
                            <Input
                              id="image"
                              name="image"
                              value={formData.image}
                              onChange={handleChange}
                              placeholder="https://example.com/image.jpg"
                              className="mt-1 border-slate-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
                        <h3 className="font-medium text-slate-800 mb-4 flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-600 p-1 rounded">
                            <Tag size={16} />
                          </span>
                          Categories
                        </h3>

                        <div>
                          <div className="flex gap-2 mb-2">
                            <Input
                              id="newCategory"
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                              placeholder="Add a category"
                              className="border-slate-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            <Button
                              type="button"
                              onClick={addCategory}
                              variant="outline"
                              className="border-slate-200 hover:bg-slate-50"
                            >
                              Add
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {formData.categories.map((category) => (
                              <Badge
                                key={category}
                                variant="secondary"
                                className="bg-slate-100 text-slate-700 px-3 py-1 flex items-center gap-1"
                              >
                                <span>{category}</span>
                                <button
                                  type="button"
                                  onClick={() => removeCategory(category)}
                                  className="text-slate-500 hover:text-red-500 focus:outline-none"
                                >
                                  <X size={14} />
                                </button>
                              </Badge>
                            ))}
                            {formData.categories.length === 0 && (
                              <p className="text-xs text-slate-500 italic">
                                No categories added
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
                        <div className="flex items-center space-x-2 mb-2">
                          <Switch
                            id="isPublished"
                            checked={formData.isPublished}
                            onCheckedChange={(checked) =>
                              handleSwitchChange("isPublished", checked)
                            }
                          />
                          <Label
                            htmlFor="isPublished"
                            className="text-slate-700"
                          >
                            Published
                          </Label>
                        </div>
                        <p className="text-xs text-slate-500">
                          {formData.isPublished
                            ? "This post is visible to the public"
                            : "This post is saved as a draft"}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
                        <h3 className="font-medium text-slate-800 mb-4 flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-600 p-1 rounded">
                            <Globe size={16} />
                          </span>
                          Languages ({enabledLanguagesCount} selected)
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                          {AVAILABLE_LANGUAGES.map((lang) => (
                            <div
                              key={lang.code}
                              className={`flex items-center space-x-2 p-2 rounded ${
                                formData.languages[lang.code]?.isEnabled
                                  ? "bg-blue-50 border border-blue-100"
                                  : "hover:bg-slate-100"
                              }`}
                            >
                              <Checkbox
                                id={`lang-${lang.code}`}
                                checked={
                                  formData.languages[lang.code]?.isEnabled
                                }
                                onCheckedChange={(checked) =>
                                  handleLanguageToggle(
                                    lang.code,
                                    checked === true,
                                  )
                                }
                              />
                              <Label
                                htmlFor={`lang-${lang.code}`}
                                className={`cursor-pointer text-sm ${
                                  formData.languages[lang.code]?.isEnabled
                                    ? "font-medium text-blue-700"
                                    : "text-slate-600"
                                }`}
                                onClick={() => {
                                  if (
                                    formData.languages[lang.code]?.isEnabled
                                  ) {
                                    setActiveLanguageTab(lang.code);
                                  }
                                }}
                              >
                                {lang.name}
                                {formData.languages[lang.code]?.id && (
                                  <Badge
                                    variant="outline"
                                    className="ml-1 text-xs py-0 px-1"
                                  >
                                    Existing
                                  </Badge>
                                )}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Language-specific content - Columns 2-3 */}
                    <div className="md:col-span-2">
                      <div className="border border-slate-200 rounded-lg overflow-hidden">
                        <Tabs
                          value={activeLanguageTab}
                          onValueChange={(value) => {
                            if (formData.languages[value]?.isEnabled) {
                              setActiveLanguageTab(value);
                            }
                          }}
                        >
                          <div className="bg-slate-50 border-b border-slate-200 p-2">
                            <div className="overflow-x-auto pb-1">
                              <TabsList className="flex flex-nowrap bg-slate-100 p-1 min-w-max">
                                {AVAILABLE_LANGUAGES.filter(
                                  (lang) =>
                                    formData.languages[lang.code]?.isEnabled,
                                ).map((lang) => (
                                  <TabsTrigger
                                    key={lang.code}
                                    value={lang.code}
                                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
                                  >
                                    {lang.name}
                                  </TabsTrigger>
                                ))}
                              </TabsList>
                            </div>
                          </div>

                          {AVAILABLE_LANGUAGES.map((lang) => (
                            <TabsContent
                              key={lang.code}
                              value={lang.code}
                              className="p-4 bg-white"
                            >
                              <div className="space-y-4">
                                <div>
                                  <Label
                                    htmlFor={`title-${lang.code}`}
                                    className="text-slate-700"
                                  >
                                    Title ({lang.name})
                                  </Label>
                                  <Input
                                    id={`title-${lang.code}`}
                                    value={formData.languages[lang.code]?.title}
                                    onChange={(e) =>
                                      handleLanguageContentChange(
                                        e,
                                        lang.code,
                                        "title",
                                      )
                                    }
                                    required={
                                      formData.languages[lang.code]?.isEnabled
                                    }
                                    className="mt-1 border-slate-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    placeholder="Enter title for your blog post"
                                  />
                                </div>

                                <div>
                                  <Label
                                    htmlFor={`description-${lang.code}`}
                                    className="text-slate-700"
                                  >
                                    Description ({lang.name})
                                  </Label>
                                  <Textarea
                                    id={`description-${lang.code}`}
                                    value={
                                      formData.languages[lang.code]?.description
                                    }
                                    onChange={(e) =>
                                      handleLanguageContentChange(
                                        e,
                                        lang.code,
                                        "description",
                                      )
                                    }
                                    required={
                                      formData.languages[lang.code]?.isEnabled
                                    }
                                    rows={3}
                                    className="mt-1 border-slate-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    placeholder="Enter a brief description of your blog post"
                                  />
                                </div>

                                <div>
                                  <Label
                                    htmlFor={`content-${lang.code}`}
                                    className="text-slate-700"
                                  >
                                    Content ({lang.name}) - Markdown
                                  </Label>
                                  <Textarea
                                    id={`content-${lang.code}`}
                                    value={
                                      formData.languages[lang.code]?.content
                                    }
                                    onChange={(e) =>
                                      handleLanguageContentChange(
                                        e,
                                        lang.code,
                                        "content",
                                      )
                                    }
                                    required={
                                      formData.languages[lang.code]?.isEnabled
                                    }
                                    rows={20}
                                    className="mt-1 font-mono border-slate-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    disabled={
                                      !formData.languages[lang.code]?.isEnabled
                                    }
                                    placeholder={`export const metadata = {
  title: "Your Post Title",
  description: "A brief description of your post",
  date: "${new Date().toISOString().split("T")[0]}",
  author: "Yash Thakker"
}

Write your content in ${lang.name} using Markdown...`}
                                  />
                                  <p className="text-xs text-slate-500 mt-1">
                                    You can include a metadata block at the top
                                    of your content, but title and description
                                    must be entered manually above.
                                  </p>
                                </div>
                              </div>
                            </TabsContent>
                          ))}
                        </Tabs>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-slate-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/admin/blog")}
                      className="border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={saving}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center gap-1"
                    >
                      {saving ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          Save Posts ({enabledLanguagesCount})
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="preview">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-200 p-2">
                    <Tabs defaultValue={activeLanguageTab}>
                      <div className="overflow-x-auto pb-1">
                        <TabsList className="flex flex-nowrap bg-slate-100 p-1 min-w-max">
                          {AVAILABLE_LANGUAGES.filter(
                            (lang) => formData.languages[lang.code]?.isEnabled,
                          ).map((lang) => (
                            <TabsTrigger
                              key={lang.code}
                              value={lang.code}
                              className="data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
                            >
                              {lang.name}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </div>

                      {AVAILABLE_LANGUAGES.filter(
                        (lang) => formData.languages[lang.code]?.isEnabled,
                      ).map((lang) => (
                        <TabsContent
                          key={lang.code}
                          value={lang.code}
                          className="p-6 bg-white"
                        >
                          <article className="prose max-w-none">
                            <h1 className="text-3xl font-bold mb-4">
                              {formData.languages[lang.code]?.title ||
                                "Untitled"}
                            </h1>
                            <div className="text-slate-500 mb-4 flex items-center gap-2">
                              <Calendar size={16} />
                              {new Date(formData.date).toLocaleDateString()} •
                              <Globe size={16} />
                              {lang.name}
                            </div>

                            {formData.image && (
                              <img
                                src={formData.image}
                                alt={formData.languages[lang.code]?.title}
                                className="w-full h-64 object-cover rounded-lg mb-6"
                              />
                            )}

                            <div className="flex flex-wrap gap-2 mb-6">
                              {formData.categories.map((category) => (
                                <Badge
                                  key={category}
                                  variant="secondary"
                                  className="bg-slate-100 text-slate-700"
                                >
                                  {category}
                                </Badge>
                              ))}
                            </div>

                            <p className="text-slate-700 mb-6 text-lg font-medium">
                              {formData.languages[lang.code]?.description ||
                                "No description provided"}
                            </p>

                            <div className="prose max-w-none">
                              <div className="whitespace-pre-wrap">
                                {formData.languages[lang.code]?.content ||
                                  "No content provided"}
                              </div>
                            </div>
                          </article>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </BasicLayout>
  );
}
