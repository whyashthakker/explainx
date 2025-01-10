// app/use-cases/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllUseCases } from "../../../lib/use-cases";

export const metadata: Metadata = {
  title: "Use Cases | ExplainX - AI Agents Development Platform",
  description: "Discover how ExplainX's custom AI agents can transform your business operations through intelligent automation, SEO optimization, and marketing solutions.",
  keywords: [
    "ai agents use cases",
    "custom ai solutions",
    "langchain implementation",
    "crewai applications",
    "business automation",
    "enterprise ai cases",
    "ai agents for seo",
    "ai agents for marketing",
    "process automation",
    "intelligent automation",
    "free ai agents",
    "openai integration",
    "ai development examples",
    "automation case studies"
  ].join(", "),
  alternates: {
    canonical: "/use-cases",
  },
  openGraph: {
    title: "AI Agent Solutions & Use Cases | ExplainX",
    description: "Real-world applications of custom AI agents for business automation, SEO, and marketing.",
    url: "https://explainx.ai/use-cases",
    siteName: "ExplainX",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Development Use Cases | ExplainX",
    description: "Explore how businesses leverage custom AI agents for automation and growth"
  }
};

export default function UseCasesPage() {
  const useCases = getAllUseCases();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              AI Solutions for Every Business
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover how ExplainX's custom AI agents can transform your operations through intelligent automation, whether you're a startup, enterprise, or agency.
            </p>
          </div>
        </div>
      </div>

      {/* Use Cases Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {useCases.map((useCase, index) => (
            <Link
              key={useCase.slug}
              href={`/use-cases/${useCase.slug}`}
              className="relative isolate flex flex-col gap-8 lg:flex-row group"
            >
              <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                <Image
                  src={useCase.heroImage}
                  alt={useCase.title}
                  fill
                  className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div>
                <div className="flex items-center gap-x-4 text-xs">
                  <span className="text-gray-500">
                    {useCase.keywords[0]}
                  </span>
                </div>
                <div className="group relative max-w-xl">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="absolute inset-0" />
                    {useCase.title}
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600">
                    {useCase.description}
                  </p>
                </div>
                <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                  <div className="relative flex items-center gap-x-4">
                    <div className="text-sm font-semibold leading-6">
                      Learn more{" "}
                      <ArrowRight className="inline-block w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to transform your business with AI?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Join innovative businesses using ExplainX to develop custom AI solutions and automate their operations.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/demo"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Schedule a Demo
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold leading-6 text-white"
              >
                Contact Sales <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}