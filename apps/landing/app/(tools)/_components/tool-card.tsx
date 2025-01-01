import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Tool } from '../../../types/tools';
import Link from 'next/link';
import { CheckCircle, ChevronRight, Instagram, Youtube } from 'lucide-react';

const platformIcons = {
  Instagram: Instagram,
  TikTok: Youtube,
};

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const PlatformIcon = platformIcons[tool.platform as keyof typeof platformIcons];

  return (
    <Card className="group relative flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          {PlatformIcon && (
            <PlatformIcon className="h-5 w-5 text-gray-600" />
          )}
          <div className="flex gap-2">
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
              {tool.platform}
            </span>
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
              Free
            </span>
          </div>
        </div>
        
        <CardTitle className="mt-4 text-xl font-bold tracking-tight text-gray-900">
          {tool.name}
        </CardTitle>
        
        <CardDescription className="mt-2 line-clamp-3 text-sm text-gray-600">
          {tool.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col flex-grow">
        {/* Key Features */}
        <div className="mb-6 flex-grow">
          <ul className="space-y-2">
            {tool.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <CheckCircle className="mr-2 h-4 w-4 text-indigo-600" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <Link href={`/tools/${tool.id}`} className="w-full">
          <Button 
            className="w-full group-hover:bg-indigo-500 transition-colors flex items-center justify-center"
            size="lg"
          >
            {tool.ctaText || 'Try Now'}
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}