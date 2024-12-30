// app/(tools)/tools/[slug]/page.tsx
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Tool } from '../../../../types/tools';
import { getToolById } from '../../../../data/tool-data';
import ToolLayout from '../../_components/layouts/tool-layout';

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

  const ToolComponent = dynamic<{ data: Tool }>(() => 
    import(`../../_components/tools/${tool.component}`).then((mod) => mod.default), {
      loading: () => (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ),
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <ToolLayout tool={tool}>
        <ToolComponent data={tool} />
      </ToolLayout>
    </div>
  );
}