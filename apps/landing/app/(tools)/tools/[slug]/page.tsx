// apps/landing/app/(tools)/tools/[slug]/page.tsx.
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { Tool } from '../../../../types/tools';
import { getToolById } from '../../../../data/tool-data';
import ToolLayout from '../../_components/layouts/tool-layout';
import { ToolStructuredData } from './structured-data';

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const tool = getToolById(params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | Infloq',
      description: 'The requested tool could not be found.',
    };
  }

  return {
    title: `${tool.name} | Infloq Tools`,
    description: tool.description,
    keywords: [
      tool.platform,
      tool.category,
      'marketing tools',
      'social media tools',
      ...tool.targetAudience,
    ],
    openGraph: {
      title: tool.name,
      description: tool.description,
      images: [
        {
          url: tool.image,
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.name,
      description: tool.description,
      images: [tool.image],
    },
  };
}

export default async function ToolPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const params = await paramsPromise;
  const tool = getToolById(params.slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = dynamic<{ data: Tool }>(
    () => import(`../../_components/tools/${tool.component}`).then((mod) => mod.default),
    {
      loading: () => (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ),
    }
  );

  return (
    <>
      <ToolStructuredData tool={tool} />
      <div className="container mx-auto py-8 px-4">
        <ToolLayout tool={tool}>
          <ToolComponent data={tool} />
        </ToolLayout>
      </div>
    </>
  );
}