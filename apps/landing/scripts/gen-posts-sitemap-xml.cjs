const fs = require("fs");
const path = require("path");

function getTodayISO() {
  const date = new Date();
  return date.toISOString().split("T")[0];
}

// Updated directory paths
const postsDirectory = path.join(process.cwd(), "apps/landing/app/blog/_posts");
const outputDir = path.join(process.cwd(), "apps/landing/public/sitemaps");
const dataDir = path.join(process.cwd(), "apps/landing/data");

// Create necessary directories
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const categories = [
  {
    id: "influencer-marketing",
    name: "Influencer Marketing",
    keywords: [
      "influencer marketing",
      "creator marketing",
      "influencer",
      "brand collaboration",
      "brand partnership",
      "sponsored content",
    ],
  },
  {
    id: "creator-economy",
    name: "Creator Economy",
    keywords: [
      "creator economy",
      "content creator",
      "digital creator",
      "ugc creator",
      "creator",
      "influencer",
    ],
  },
  {
    id: "social-media-marketing",
    name: "Social Media Marketing",
    keywords: [
      "social media marketing",
      "social media strategy",
      "social marketing",
      "digital marketing",
      "social campaign",
    ],
  },
  {
    id: "ai-tools",
    name: "AI Tools",
    keywords: [
      "ai",
      "artificial intelligence",
      "machine learning",
      "automation",
      "ai-powered",
      "ai matching",
    ],
  },
  {
    id: "analytics",
    name: "Analytics & ROI",
    keywords: [
      "analytics",
      "roi",
      "metrics",
      "performance tracking",
      "engagement rates",
      "conversion rates",
      "data-driven",
    ],
  },
  {
    id: "instagram",
    name: "Instagram",
    keywords: [
      "instagram",
      "ig",
      "reels",
      "instagram stories",
      "instagram posts",
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    keywords: ["tiktok", "tiktok creator", "short-form video"],
  },
  {
    id: "youtube",
    name: "YouTube",
    keywords: [
      "youtube",
      "youtube creator",
      "youtube channel",
      "video content",
    ],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    keywords: [
      "linkedin",
      "professional networking",
      "b2b influencer",
      "business influencer",
    ],
  },
  {
    id: "campaign-management",
    name: "Campaign Management",
    keywords: [
      "campaign management",
      "campaign tracking",
      "campaign optimization",
      "influencer campaign",
    ],
  },
  {
    id: "brand-collaboration",
    name: "Brand Collaboration",
    keywords: [
      "brand collaboration",
      "brand partnership",
      "sponsored content",
      "brand deals",
      "product seeding",
    ],
  },
  {
    id: "verification",
    name: "Creator Verification",
    keywords: [
      "verification",
      "verified creator",
      "authenticity check",
      "quality assurance",
      "fraud detection",
    ],
  },
];

function getContentString(content) {
  if (typeof content === "string") {
    return content;
  }

  if (typeof content === "object" && content !== null) {
    const relevantFields = [
      "title",
      "description",
      "content",
      "excerpt",
      "tags",
      "categories",
    ]
      .filter((field) => content[field])
      .map((field) => content[field]);

    return relevantFields.join(" ");
  }

  return "";
}

function assignCategories(content) {
  const contentString = getContentString(content);
  const contentToAnalyze = contentString.toLowerCase();

  // Assign categories based on keyword matches
  const matchedCategories = categories
    .filter((category) =>
      category.keywords.some((keyword) =>
        contentToAnalyze.includes(keyword.toLowerCase()),
      ),
    )
    .map((category) => category.id);

  // Always include 'social-media-marketing' if any platform-specific category is present
  const platformCategories = ["instagram", "tiktok", "youtube", "linkedin"];
  if (
    matchedCategories.some((cat) => platformCategories.includes(cat)) &&
    !matchedCategories.includes("social-media-marketing")
  ) {
    matchedCategories.push("social-media-marketing");
  }

  // If brand collaboration or campaign management is detected, include 'influencer-marketing'
  if (
    (matchedCategories.includes("brand-collaboration") ||
      matchedCategories.includes("campaign-management")) &&
    !matchedCategories.includes("influencer-marketing")
  ) {
    matchedCategories.push("influencer-marketing");
  }

  // If AI-related content is detected, include analytics category
  if (
    matchedCategories.includes("ai-tools") &&
    !matchedCategories.includes("analytics")
  ) {
    matchedCategories.push("analytics");
  }

  return matchedCategories.length > 0
    ? matchedCategories
    : ["influencer-marketing"]; // Default to 'influencer-marketing'
}

function extractCompetitorIds(content) {
  try {
    const regex =
      /export\s+const\s+competitors\s*:\s*Record<string,\s*Competitor>\s*=\s*({[\s\S]*?});/;
    const match = content.match(regex);

    if (!match) {
      throw new Error("Could not find competitors object");
    }

    const objectContent = match[1]
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*/g, "")
      .replace(/\s+/g, " ");

    const obj = new Function(`return ${objectContent}`)();
    return Object.keys(obj);
  } catch (error) {
    console.log("Content being parsed:", content.substring(0, 200) + "...");
    console.error("Error extracting competitor IDs:", error);
    return [];
  }
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const languages = [
  "en",
  "es",
  "de",
  "fr",
  "it",
  "hi",
  "ar",
  "zh-cn",
  "ko",
  "ja",
  "nl",
  "ru",
  "(en)",
];

function extractMetadata(content) {
  const metadataMatch = content.match(/export const metadata = {([\s\S]*?)}/);
  if (!metadataMatch) return null;

  const metadataContent = metadataMatch[1];

  const title = metadataContent.match(/title:\s*"([^"]+)"/)?.[1];
  const description = metadataContent.match(/description:\s*"([^"]+)"/)?.[1];
  const date = metadataContent.match(/date:\s*"([^"]+)"/)?.[1];
  const author = metadataContent.match(/author:\s*"([^"]+)"/)?.[1];

  return {
    title,
    description,
    date,
    author,
  };
}

function cleanFileName(filename) {
  // First remove .mdx extension if it exists
  const withoutExt = filename.replace(".mdx", "");

  // Clean any copy patterns, including those without parentheses
  return withoutExt
    .replace(/\s+\(copy(?:[-\s]?\d+)?\)$/i, "") // Remove (copy) patterns
    .replace(/\s+copy(?:[-\s]?\d+)?$/i, "") // Remove copy patterns without parentheses
    .trim(); // Clean any remaining whitespace
}

// Updated version of isCopyFile to catch more patterns
function isCopyFile(filename) {
  const copyPatterns = [
    /\s+\(copy(?:[-\s]?\d+)?\)/i, // Matches " (copy)", " (copy 1)", etc.
    /\s+copy(?:[-\s]?\d+)?$/i, // Matches " copy", " copy 1", etc.
    /\s+copy(?:[-\s]?\d+)?\s+/i, // Matches copy patterns in middle of string
  ];

  return copyPatterns.some((pattern) => pattern.test(filename));
}

function processProducts() {
  try {
    // Updated path for productPageData
    const productDataPath = path.join(
      process.cwd(),
      "apps/landing/data/productPageData.ts",
    );
    const productDataContent = fs.readFileSync(productDataPath, "utf8");

    // Extract product slugs using regex
    const productDataRegex = /slug:\s*"([^"]+)"/g;
    const slugs = [];
    let match;

    while ((match = productDataRegex.exec(productDataContent)) !== null) {
      slugs.push(match[1]);
    }

    const today = getTodayISO();
    console.log("Found product slugs:", slugs);

    // Create product pages data
    return slugs.map((slug) => ({
      url: `https://www.explainx.ai/products/${slug}`,
      lastmod: today,
      datetime: today,
      priority: "0.90",
    }));
  } catch (error) {
    console.error("Error processing products:", error);
    console.error(
      "Attempted to read from:",
      path.join(process.cwd(), "apps/landing/data/productPageData.ts"),
    );
    return [];
  }
}

function processCompetitors() {
  try {
    const competitorsPath = path.join(
      process.cwd(),
      "apps/landing/data/competitors.ts",
    );
    const competitorContent = fs.readFileSync(competitorsPath, "utf8");
    const competitorIds = extractCompetitorIds(competitorContent);
    const today = getTodayISO();

    console.log("Found competitors:", competitorIds);

    const competitorPages = [
      {
        url: "https://www.explainx.ai/compare",
        lastmod: today,
        datetime: today,
        priority: "0.90",
      },
      ...competitorIds.map((id) => ({
        url: `https://www.explainx.ai/compare/${id}`,
        lastmod: today,
        datetime: today,
        priority: "0.85",
      })),
    ];

    return competitorPages;
  } catch (error) {
    console.error("Error processing competitors:", error);
    console.error(
      "Attempted to read from:",
      path.join(process.cwd(), "apps/landing/data/competitors.ts"),
    );
    return [];
  }
}

function generateSitemapContent(items, type) {
  const today = getTodayISO();
  const sitemapEntries = items.map((item) => {
    const { url } = item;
    const lastmod = item.datetime || item.lastmod || today;
    const priority = getPriority(type);
    return `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join("")}
</urlset>`;
}

// ... (previous imports and initial setup remain the same)

function extractUseCaseData(content) {
  try {
    // Match the export const useCases array
    const regex =
      /export\s+const\s+useCases\s*:\s*UseCase\[\]\s*=\s*(\[[\s\S]*?\];)/;
    const match = content.match(regex);

    if (!match) {
      console.log("Primary regex match failed, trying fallback...");
      throw new Error("Could not find useCases array");
    }

    const arrayContent = match[1];
    console.log("Found array content, looking for slugs...");

    // Extract slugs using regex pattern that matches the exact structure
    const slugRegex = /\s+slug:\s*"([^"]+)"/g;
    const slugs = [];
    let slugMatch;

    while ((slugMatch = slugRegex.exec(arrayContent)) !== null) {
      slugs.push(slugMatch[1]);
    }

    if (slugs.length === 0) {
      throw new Error("No slugs found in content");
    }

    console.log("Found slugs:", slugs);
    return slugs;
  } catch (error) {
    console.error("Error in extractUseCaseData:", error);
    return [];
  }
}

function processUseCases() {
  try {
    const useCasesPath = path.join(
      process.cwd(),
      "apps/landing/data/use-cases/data.ts",
    );
    console.log("Reading use cases from:", useCasesPath);

    const useCaseContent = fs.readFileSync(useCasesPath, "utf8");
    console.log("File content length:", useCaseContent.length);

    const useCaseSlugs = extractUseCaseData(useCaseContent);
    console.log("Extracted slugs:", useCaseSlugs);

    const today = getTodayISO();

    const useCasePages = useCaseSlugs.map((slug) => ({
      url: `https://www.explainx.ai/use-cases/${slug}`,
      lastmod: today,
      datetime: today,
      priority: "0.85",
    }));

    // Generate use case data TypeScript file
    if (useCaseSlugs.length > 0) {
      generateUseCaseDataTypeScript(useCaseContent);
    }

    console.log("Generated pages:", useCasePages);
    return useCasePages;
  } catch (error) {
    console.error("Error processing use cases:", error);
    return [];
  }
}

function generateUseCaseDataTypeScript(content) {
  try {
    const useCaseDataContent = `// Generated on ${new Date().toISOString()}
interface UseCase {
  title: string;
  slug: string;
  description: string;
  subtitle: string;
  url: string;
}

const useCaseData: UseCase[] = ${content.match(/export\s+const\s+useCases\s*:\s*UseCase\[\]\s*=\s*(\[[\s\S]*?\]);/)[1]}
  .map(useCase => ({
    title: useCase.title,
    slug: useCase.slug,
    description: useCase.description,
    subtitle: useCase.subtitle,
    url: \`https://www.explainx.ai/use-cases/\${useCase.slug}\`
  }));

export default useCaseData;
`;

    fs.writeFileSync(
      path.join(dataDir, "use-case-data.ts"),
      useCaseDataContent,
    );
    console.log("Generated use-case-data.ts");
  } catch (error) {
    console.error("Error generating use case data TypeScript file:", error);
  }
}

function processTools() {
  try {
    const toolDataPath = path.join(
      process.cwd(),
      "apps/landing/data/tool-data.ts",
    );
    const content = fs.readFileSync(toolDataPath, "utf8");

    // Extract the tools array using regex
    const toolsMatch = content.match(
      /export const tools: Tool\[\] = \[([\s\S]*?)\];/,
    );

    if (!toolsMatch) {
      throw new Error("Could not find tools array");
    }

    const toolsContent = toolsMatch[1];

    // Extract tool IDs using regex
    const idRegex = /id:\s*'([^']+)'/g;
    const tools = [];
    let match;

    while ((match = idRegex.exec(toolsContent)) !== null) {
      const toolId = match[1];
      tools.push({
        url: `https://www.explainx.ai/tools/${toolId}`,
        lastmod: getTodayISO(),
        datetime: getTodayISO(),
        priority: "0.85",
      });
    }

    // Add the main tools page
    tools.unshift({
      url: "https://www.explainx.ai/tools",
      lastmod: getTodayISO(),
      datetime: getTodayISO(),
      priority: "0.90",
    });

    return tools;
  } catch (error) {
    console.error("Error processing tools:", error);
    return [];
  }
}

function getPriority(type) {
  switch (type) {
    case "product":
      return "0.90";
    case "comparison":
      return "0.85";
    case "blog":
      return "0.80";
    default:
      return "0.50";
  }
}

function processAllPosts() {
  const posts = [];

  function processLanguagePosts(lang, subdir) {
    const langPostsDirectory = path.join(postsDirectory, subdir);

    if (!fs.existsSync(langPostsDirectory)) {
      console.warn(`Warning: Directory not found for language ${lang}`);
      return;
    }

    const files = fs
      .readdirSync(langPostsDirectory)
      .filter((file) => file.endsWith(".mdx"))
      .filter((file) => !isCopyFile(file));

    files.forEach((file) => {
      const fullPath = path.join(langPostsDirectory, file);
      const content = fs.readFileSync(fullPath, "utf8");
      const metadata = extractMetadata(content);

      if (metadata) {
        const cleanSlug = cleanFileName(file);

        // Skip if the cleaned filename still contains copy patterns
        if (isCopyFile(cleanSlug)) {
          console.warn(`Skipping file with copy pattern: ${file}`);
          return;
        }

        // Generate URL based on language
        let urlPath;
        if (lang === "(en)") {
          // For (en) folder, don't include the language in the path
          urlPath = `https://www.explainx.ai/blog/post/${cleanSlug}`;
        } else {
          // For other languages, include the language code
          const langPrefix = lang === "en" ? "" : `/${lang}`;
          urlPath = `https://www.explainx.ai/blog/post${langPrefix}/${cleanSlug}`;
        }

        const post = {
          title: metadata.title,
          file: cleanSlug,
          description: metadata.description,
          date: formatDateToString(metadata.date),
          datetime: metadata.date,
          author: {
            name: metadata.author,
            role: metadata.author === "Yash Thakker" ? "Founder" : "",
            href: "#",
            imageUrl: "/images/blog/yt.jpg",
          },
          language: lang === "(en)" ? "en" : lang,
          url: urlPath,
          categories: [],
        };

        post.categories = assignCategories(post);

        // Double check the URL doesn't contain copy patterns
        if (!isCopyFile(post.url)) {
          posts.push(post);
        } else {
          console.warn(`Skipping post with copy pattern in URL: ${post.url}`);
        }
      } else {
        console.warn(`Warning: No metadata found for ${fullPath}`);
      }
    });
  }

  processLanguagePosts("en", "");
  languages
    .filter((lang) => lang !== "en")
    .forEach((lang) => {
      processLanguagePosts(lang, lang);
    });

  posts.sort(
    (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
  );
  return posts;
}

function generatePostDataTypeScript(posts) {
  const postDataContent = `// Generated on ${new Date().toISOString()}
interface Author {
  name: string;
  role: string;
  href: string;
  imageUrl: string;
}

interface Post {
  title: string;
  file: string;
  description: string;
  date: string;
  datetime: string;
  author: Author;
  language: string;
  url: string;
  categories: string[];
}

const postData: Post[] = ${JSON.stringify(posts, null, 2)};

export default postData;
`;

  return postDataContent;
}

function generateProductData(productPageData) {
  try {
    const productDataPath = path.join(
      process.cwd(),
      "apps/landing/data/productPageData.ts",
    );
    const content = fs.readFileSync(productDataPath, "utf8");

    // Extract products data
    // This part "(?::[^=]+)?" allows optional ": someType" text before the equals sign
    const match = content.match(
      /export\s+const\s+productPageData\s*(?::[^=]+)?=\s*\[([\s\S]*?)\];/,
    );

    if (!match) {
      throw new Error("Could not find productPageData array");
    }

    // Parse the products data using regex
    const productObjectRegex =
      /{[\s\S]*?slug:\s*"([^"]+)"[\s\S]*?metadata:\s*{[\s\S]*?title:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"[\s\S]*?}/g;
    const products = [];
    let productMatch;

    while ((productMatch = productObjectRegex.exec(match[1])) !== null) {
      const [_, slug, title, description] = productMatch;
      products.push({
        title,
        file: slug,
        description,
        datetime: getTodayISO(),
        url: `https://www.explainx.ai/products/${slug}`,
      });
    }

    // Generate the product-data.ts content
    const productDataContent = `// Generated on ${new Date().toISOString()}

const productData = ${JSON.stringify(products, null, 2)};

export default productData;
`;

    // Write the file
    const outputPath = path.join(dataDir, "product-data.ts");
    fs.writeFileSync(outputPath, productDataContent);
    console.log(`Generated product-data.ts with ${products.length} products`);

    return products;
  } catch (error) {
    console.error("Error generating product data:", error);
    return [];
  }
}

function formatDateToString(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

function extractProductDetails(content) {
  const titleMatch = content.match(/title:\s*"(.+)"/);
  const descriptionMatch = content.match(/description:\s*"(.+)"/);

  return {
    title: titleMatch ? titleMatch[1] : "",
    description: descriptionMatch ? descriptionMatch[1] : "",
  };
}

try {
  console.log("Starting sitemap generation...");

  // Process all content types
  const allPosts = processAllPosts();
  console.log(`Processed ${allPosts.length} blog posts`);

  const tools = processTools();
  console.log(
    `Processed ${tools.length} tools:`,
    tools.map((t) => t.url).join(", "),
  );

  const products = processProducts();
  console.log(
    `Processed ${products.length} products:`,
    products.map((p) => p.url).join(", "),
  );

  const competitors = processCompetitors();
  console.log(
    `Processed ${competitors.length} competitor pages:`,
    competitors.map((c) => c.url).join(", "),
  );

  const useCases = processUseCases();
  console.log(
    `Processed ${useCases.length} use cases:`,
    useCases.map((u) => u.url).join("\n"),
  );

  // Generate individual sitemaps
  const blogSitemapContent = generateSitemapContent(allPosts, "blog");
  const productSitemapContent = generateSitemapContent(products, "product");
  const comparisonSitemapContent = generateSitemapContent(
    competitors,
    "comparison",
  );
  const useCaseSitemapContent = generateSitemapContent(useCases, "use-case");
  const toolsSitemapContent = generateSitemapContent(tools, "tools");

  // Write sitemaps to files
  fs.writeFileSync(
    path.join(outputDir, "blog-sitemap.xml"),
    blogSitemapContent,
  );
  fs.writeFileSync(
    path.join(outputDir, "product-sitemap.xml"),
    productSitemapContent,
  );
  fs.writeFileSync(
    path.join(outputDir, "comparison-sitemap.xml"),
    comparisonSitemapContent,
  );
  fs.writeFileSync(
    path.join(outputDir, "use-case-sitemap.xml"),
    useCaseSitemapContent,
  );
  fs.writeFileSync(
    path.join(outputDir, "tools-sitemap.xml"),
    toolsSitemapContent,
  );

  //   // Generate sitemap index
  //   const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
  // <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  //   <sitemap>
  //     <loc>https://www.explainx.ai/blog-sitemap.xml</loc>
  //     <lastmod>${getTodayISO()}</lastmod>
  //   </sitemap>
  //   <sitemap>
  //     <loc>https://www.explainx.ai/product-sitemap.xml</loc>
  //     <lastmod>${getTodayISO()}</lastmod>
  //   </sitemap>
  //   <sitemap>
  //     <loc>https://www.explainx.ai/comparison-sitemap.xml</loc>
  //     <lastmod>${getTodayISO()}</lastmod>
  //   </sitemap>
  // </sitemapindex>`;

  //   fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemapIndex);

  // Write post-data.ts if needed
  if (allPosts.length > 0) {
    const postDataContent = generatePostDataTypeScript(allPosts);
    fs.writeFileSync(path.join(dataDir, "post-data.ts"), postDataContent);
  }

  const productData = generateProductData();
  console.log(`Generated product data for ${productData.length} products`);

  console.log("Successfully generated all sitemaps and data files");
} catch (error) {
  console.error("Error during sitemap generation:", error);
  process.exit(1);
}

