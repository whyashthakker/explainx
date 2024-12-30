import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Tool } from '../../../types/tools';
import Link from 'next/link';

interface ToolCardProps {
  tool: Tool;
}

interface ToolCardProps {
    tool: Tool;
  }
  
  export default function ToolCard({ tool }: ToolCardProps) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">{tool.name}</CardTitle>
            <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
              {tool.platform}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4">
            {tool.description}
          </CardDescription>
          <Link href={`/tools/${tool.id}`}>
            <Button className="w-full">
              Check Creator
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }