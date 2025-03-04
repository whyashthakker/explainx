import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";

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
async function isAuthenticated(request: NextRequest): Promise<boolean> {
  try {
    const { user } = await auth();
    return !!user?.isAdmin;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}

// POST /api/blog/extract - Extract title and description from content
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const isUserAuthenticated = await isAuthenticated(request);
    if (!isUserAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized", success: false },
        { status: 401 },
      );
    }

    const data = await request.json();

    if (!data.content) {
      return NextResponse.json(
        { error: "Content is required", success: false },
        { status: 400 },
      );
    }

    const extracted = extractMetadata(data.content);

    // Check if extraction was successful
    if (!extracted.title) {
      return NextResponse.json(
        { error: "Could not extract title from content", success: false },
        { status: 422 },
      );
    }

    return NextResponse.json({
      ...extracted,
      success: true,
    });
  } catch (error) {
    console.error("Error extracting metadata:", error);
    return NextResponse.json(
      { error: "Failed to extract metadata", success: false },
      { status: 500 },
    );
  }
}
