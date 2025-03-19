import { tools } from '../../../data/tool-data';
import ToolCard from '../_components/tool-card';

export default function ToolsPage() {
    return (
      <div className="container mx-auto py-8 mt-20">
        <h1 className="text-3xl font-bold mb-8">Marketing Tools</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    );
  }