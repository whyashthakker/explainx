"use server";

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: "1234",
});

// Sample blog to use as a reference for the model
const SAMPLE_BLOG = `

# ExplainX: Pioneering Transparent and Trustworthy AI Solutions

![ExplainX AI Agent Automation Solutions](/images/blog/explainx-ai-agent-automation-solutions.jpeg)

In the rapidly evolving landscape of artificial intelligence, businesses are increasingly seeking solutions that not only leverage AI's power but also ensure transparency and trustworthiness. Enter ExplainX, a pioneering company that's revolutionizing how businesses implement and understand AI systems.

## Bridging the Gap Between AI Complexity and Business Understanding

At its core, [ExplainX](https://www.explainx.ai/) addresses one of the most pressing challenges in modern AI adoption: making artificial intelligence explainable and trustworthy. Through their comprehensive explainable AI framework, they're helping organizations demystify the black box of AI decision-making, ensuring that businesses can confidently implement AI solutions while maintaining transparency and eliminating biases.

## Comprehensive AI Solutions Portfolio

ExplainX's service offerings span the entire AI implementation spectrum:

### Custom AI Agent Development
The company excels in creating tailored AI agents that cater to specific business needs. From free basic agents to sophisticated enterprise-level solutions, ExplainX ensures that each implementation is optimized for performance and security. Their rapid deployment capability – 24-48 hours for standard cases and 3-5 days for custom configurations – sets them apart in the industry.

### Revolutionary Explainability Framework
What truly distinguishes ExplainX is their modular explainability framework. This innovative approach allows data scientists and business users to:
- Analyze dataframes with predictions
- Access comprehensive model metrics
- Utilize global level SHAP values
- Conduct what-if scenario analyses
- Generate partial dependence plots
- Perform detailed cohort analyses

### Training and Support Excellence
Understanding that AI implementation is just the beginning, ExplainX provides comprehensive training programs and ongoing support. Their commitment to education extends beyond mere implementation, encompassing:
- Generative AI training
- AI agent training programs
- Continuous mentoring
- 24/7 technical support

## Driving Business Transformation

The impact of ExplainX's solutions on business operations is substantial. Their claim of 60-80% cost reduction through AI agent implementation represents a significant value proposition for businesses looking to optimize their operations. This efficiency is achieved while maintaining high standards of transparency and accountability.

## Expert Leadership

Behind ExplainX's success stands a team of dedicated professionals led by:
- Yash Thakker (CEO & Product Lead)
- Geeta Thakker (CMO & Operations)

Their combined expertise in AI strategy, product development, machine learning, and AI architecture ensures that ExplainX remains at the forefront of AI innovation.

## The Open-Source Advantage

ExplainX's commitment to transparency extends to their open-source AI platform, which empowers data scientists to:
- Monitor AI model performance
- Debug complex systems
- Ensure unbiased operation
- Maintain transparency in AI decisions

## Looking Ahead

As businesses continue to navigate the complexities of AI implementation, ExplainX's approach to combining cutting-edge technology with transparency and trustworthiness positions them as a crucial partner in the AI transformation journey. Their comprehensive suite of solutions, coupled with their commitment to explainability, makes them an invaluable ally for organizations seeking to leverage AI while maintaining transparency and trust.

For businesses looking to embark on their AI journey or enhance their existing AI capabilities, ExplainX offers a unique value proposition: the ability to implement powerful AI solutions while ensuring they remain explainable, unbiased, and trustworthy. In an era where AI transparency is becoming increasingly crucial, ExplainX's approach may well represent the future of responsible AI implementation.

## FAQs

**Q: How long does it take to implement ExplainX solutions?**
A: Basic implementations can be completed in 24-48 hours, while custom solutions typically take 3-5 days.

**Q: What kind of support is provided?**
A: ExplainX offers 24/7 technical support, comprehensive training programs, and ongoing mentoring.

**Q: How does the explainability framework work?**
A: The framework provides detailed insights into AI decision-making through SHAP values, partial dependence plots, and cohort analyses.

**Q: What is the cost reduction potential?**
A: Organizations typically see 60-80% cost reduction through efficient AI agent implementation.

## Conclusion

ExplainX represents the future of responsible AI implementation, offering organizations the tools and support needed to leverage artificial intelligence while maintaining transparency and trust. Their comprehensive approach to explainable AI, combined with rapid deployment capabilities and extensive support, makes them an ideal partner for businesses looking to transform their operations through AI.

For organizations seeking to implement AI solutions that are both powerful and trustworthy, ExplainX provides the perfect balance of innovation, transparency, and practical business value. Their commitment to open-source development and continuous improvement ensures that clients always have access to the latest advancements in explainable AI technology.
`;

// Function to generate blog writing guidelines based on language and topic
function getBlogWritingGuidelines(
  language: string,
  title: string,
  extraContext: string,
): string {
  const languageGuidelines: Record<string, string> = {
    en: "Write in clear, professional English with proper grammar and punctuation.",
    es: "Write in fluent Spanish (Español) with proper grammar, accents, and punctuation.",
    fr: "Write in fluent French (Français) with proper grammar, accents, and punctuation.",
    de: "Write in fluent German (Deutsch) with proper grammar, umlauts, and punctuation.",
    it: "Write in fluent Italian (Italiano) with proper grammar, accents, and punctuation.",
    hi: "Write in fluent Hindi (हिन्दी) with proper grammar and punctuation.",
    ar: "Write in fluent Arabic (العربية) with proper grammar and punctuation. Ensure right-to-left formatting.",
    "zh-cn":
      "Write in fluent Simplified Chinese with proper grammar and punctuation.",
    ja: "Write in fluent Japanese (日本語) with proper grammar and punctuation.",
    ko: "Write in fluent Korean (한국어) with proper grammar and punctuation.",
    nl: "Write in fluent Dutch (Nederlands) with proper grammar and punctuation.",
    ru: "Write in fluent Russian (Русский) with proper grammar and punctuation.",
  };

  return `
    Blog Writing Guidelines:
    - ${languageGuidelines[language] || languageGuidelines.en}
    - Create engaging, informative content that provides value to readers
    - Structure the blog with clear headings and subheadings
    - Include an introduction that hooks the reader and outlines what they'll learn
    - Develop the main points with examples, data, or case studies when appropriate
    - Conclude with a summary and actionable takeaways
    - Maintain a consistent tone throughout the article
    - Focus on the topic: "${title}"
    - Consider this additional context: "${extraContext}"
    - Aim for depth and comprehensiveness while maintaining readability
  `;
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");

  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export async function POST(request: NextRequest) {
  if (request.method === "OPTIONS") {
    return OPTIONS(request);
  }

  try {
    const body = await request.json();
    const { title, language = "en", extraContext = "" } = body;

    if (!title) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Title is required",
        }),
        { status: 400 },
      );
    }

    const blogWritingGuidelines = getBlogWritingGuidelines(
      language,
      title,
      extraContext,
    );

    // First, generate the blog content
    const contentMessages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `You are an expert blog writer specializing in creating high-quality, engaging blog content. ${blogWritingGuidelines}`,
      },
      {
        role: "user",
        content: `I need you to write a comprehensive blog post about "${title}". ${extraContext ? `Additional context: ${extraContext}` : ""}

Here's a sample blog post format to follow as a reference:

${SAMPLE_BLOG}

Please write a well-structured blog post with proper headings, subheadings, and paragraphs. Focus on providing valuable information and insights. Do NOT include any metadata at the top of the content.`,
      },
    ];

    const contentCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: contentMessages,
      temperature: 0.7,
      max_tokens: 2500,
    });

    const generatedContent =
      contentCompletion.choices[0]?.message?.content || "";

    // Now, generate a concise description
    const descriptionMessages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `You are an expert at writing concise, compelling meta descriptions for blog posts. Your task is to create a brief description (under 160 characters) that summarizes the main value proposition of a blog post and entices readers to click.`,
      },
      {
        role: "user",
        content: `Based on this blog title: "${title}" and this additional context: "${extraContext}", please write a compelling meta description in ${language} language. The description should be under 160 characters and highlight the main value readers will get from the article. Generate in ${language} language.`,
      },
    ];

    const descriptionCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: descriptionMessages,
      temperature: 0.7,
      max_tokens: 200,
    });

    const generatedDescription =
      descriptionCompletion.choices[0]?.message?.content || "";

    // Finally, generate an optimized title if needed
    const titleMessages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `You are an expert at writing engaging, SEO-friendly blog titles. Your task is to refine or enhance a given blog title to make it more compelling while maintaining its core topic.`,
      },
      {
        role: "user",
        content: `Based on this initial blog title: "${title}" and this additional context: "${extraContext}", please suggest an optimized version of the title in ${language} language. The title should be attention-grabbing, clear, and optimized for both readers and search engines. Avoid having double quotes in the title. Strictly generate in ${language} language.`,
      },
    ];

    const titleCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: titleMessages,
      temperature: 0.7,
      max_tokens: 100,
    });

    const generatedTitle =
      titleCompletion.choices[0]?.message?.content || title;

    // Store the usage in database if needed
    // try {
    //   await prismadb.apiUsage.create({
    //     data: {
    //       content: JSON.stringify({
    //         title: generatedTitle,
    //         description: generatedDescription,
    //         content: generatedContent,
    //       }),
    //       prompt: title,
    //       platform: "blog",
    //     },
    //   });
    // } catch (dbError) {
    //   console.error("Failed to log AI generation to database:", dbError);
    //   // Continue execution even if logging fails
    // }

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: {
          title: generatedTitle,
          description: generatedDescription,
          content: generatedContent,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          "Access-Control-Allow-Headers": "*",
        },
      },
    );
  } catch (error: any) {
    console.error(`Error generating blog content: ${error.message}`);
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: error.message || "An unexpected error occurred",
      }),
      {
        status: error.status || 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          "Access-Control-Allow-Headers": "*",
        },
      },
    );
  }
}
