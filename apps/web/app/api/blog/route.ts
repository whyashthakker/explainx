import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "../../../auth";
import db from "@repo/db";

// Helper function to extract title and description from content
function extractMetadata(content: string) {
  // Check for metadata block
  const metadataStart = content.indexOf("export const metadata = {");
  const metadataEnd = content.indexOf("};", metadataStart);

  let title = "";
  let description = "";
  let cleanedContent = content;

  if (metadataStart !== -1 && metadataEnd !== -1) {
    // Extract the metadata block
    const metadataBlock = content.substring(metadataStart, metadataEnd + 2);

    // Split the metadata block into lines for easier processing
    const lines = metadataBlock.split("\n");

    // Process each line to find title and description
    for (const line of lines) {
      // Check for title
      if (line.includes("title:")) {
        const titleMatch = line.match(/title\s*:\s*["'](.+?)["']/);
        if (titleMatch && titleMatch[1]) {
          title = titleMatch[1].trim();
        }
      }

      // Check for description
      if (line.includes("description:")) {
        const descMatch = line.match(/description\s*:\s*["'](.+?)["']/);
        if (descMatch && descMatch[1]) {
          description = descMatch[1].trim();
        }
      }
    }

    // Remove the metadata block from content
    cleanedContent = content.replace(metadataBlock, "").trim();
  } else {
    // Fallback to the original extraction method if no metadata block is found
    const lines = content.split("\n").filter((line) => line.trim().length > 0);

    // First non-empty line is likely the title
    title = lines.length > 0 ? lines[0]?.trim() || "" : "";

    // Next few lines (up to 150 chars) could be the description
    if (lines.length > 1) {
      // Skip the title and join the next few lines
      const potentialDescription = lines.slice(1).join(" ").trim();
      // Limit to a reasonable description length
      description = potentialDescription.substring(0, 150);
      // Add ellipsis if truncated
      if (potentialDescription.length > 150) {
        description += "...";
      }
    }

    // Clean up the content by removing the extracted title if it's at the beginning
    if (title && content.startsWith(title)) {
      cleanedContent = content.substring(title.length).trim();
    }
  }

  return { title, description, cleanedContent };
}

// Helper function to check if user is authenticated
async function isAuthenticated(): Promise<boolean> {
  try {
    // This is a simplified auth check - in a real app, you'd validate a session token
    const session = await auth();
    return !!session?.user?.isAdmin;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}

// Helper function to get the current authenticated user
async function getCurrentUser() {
  try {
    const { user } = await auth();
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

// GET /api/blog - Get all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language");
    const search = searchParams.get("search");
    const publishedOnly = searchParams.get("publishedOnly") === "true";
    const baseSlug = searchParams.get("baseSlug");

    // Build filter conditions
    const where: any = {};

    if (language) {
      where.language = language;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    if (publishedOnly) {
      where.isPublished = true;
    }

    // Handle baseSlug parameter for finding related posts
    if (baseSlug) {
      where.slug = baseSlug; // Exact match for slug
    }

    const posts = await db.blogPost.findMany({
      where,
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 },
    );
  }
}

// POST /api/blog - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if the combination of language and slug already exists
    const language = data.language || "en";
    const existingPost = await db.blogPost.findFirst({
      where: {
        slug: data.slug,
        language: language,
      },
    });

    if (existingPost) {
      return NextResponse.json(
        {
          error: `A post with this slug already exists for language '${language}'`,
        },
        { status: 400 },
      );
    }

    // Find Yash's user ID or create a hardcoded author ID
    const yashUser = await db.user.findFirst({
      where: { name: "Yash" },
    });

    const authorId = yashUser?.id || null;

    // Create new blog post
    const newPost = await db.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug, // Use slug as is without language suffix
        content: data.content,
        description: data.description || "",
        date: data.date ? new Date(data.date) : new Date(),
        language: language,
        categories: data.categories || [],
        isPublished: data.isPublished || false,
        image: data.image || "",
        authorId: authorId, // Use Yash as the author
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}

// PUT /api/blog - Update a blog post
export async function PUT(request: NextRequest) {
  try {
    // Check if user is authenticated
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.id || !data.title || !data.slug || !data.content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const language = data.language || "en";

    // Check if the combination of language and slug already exists for a different post
    const existingPost = await db.blogPost.findFirst({
      where: {
        slug: data.slug,
        language: language,
        NOT: { id: data.id },
      },
    });

    if (existingPost) {
      return NextResponse.json(
        {
          error: `A different post with this slug already exists for language '${language}'`,
        },
        { status: 400 },
      );
    }

    // Find Yash's user ID or create a hardcoded author ID
    const yashUser = await db.user.findFirst({
      where: { name: "Yash" },
    });

    const authorId = yashUser?.id || null;

    // Update blog post
    const updatedPost = await db.blogPost.update({
      where: { id: data.id },
      data: {
        title: data.title,
        slug: data.slug, // Use slug as is without language suffix
        content: data.content,
        description: data.description || "",
        date: data.date ? new Date(data.date) : new Date(),
        language: language,
        categories: data.categories || [],
        isPublished: data.isPublished || false,
        image: data.image || "",
        authorId: authorId, // Use Yash as the author
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 },
    );
  }
}

// DELETE /api/blog - Delete a blog post
export async function DELETE(request: NextRequest) {
  try {
    // Check if user is authenticated
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const deleteAll = searchParams.get("deleteAll") === "true";

    if (deleteAll) {
      // Delete all blog posts
      await db.blogPost.deleteMany({});
      return NextResponse.json({
        success: true,
        message: "All blog posts deleted",
      });
    }

    if (!id) {
      return NextResponse.json({ error: "Missing post ID" }, { status: 400 });
    }

    // Delete blog post
    await db.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 },
    );
  }
}
