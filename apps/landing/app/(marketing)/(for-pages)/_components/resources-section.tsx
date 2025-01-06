import { Card } from "@repo/ui/components/ui/card";
import { Book, Video, MonitorPlay, PenTool, File, ArrowRight } from "lucide-react";

interface ResourcesSectionProps {
  resources: Array<{
    title: string;
    description: string;
    link: string;
    type: 'guide' | 'video' | 'webinar' | 'tool';
  }>;
}

export function ResourcesSection({ resources }: ResourcesSectionProps) {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'guide':
        return <Book className="w-8 h-8 text-blue-600" />;
      case 'video':
        return <Video className="w-8 h-8 text-blue-600" />;
      case 'webinar':
        return <MonitorPlay className="w-8 h-8 text-blue-600" />;
      case 'tool':
        return <PenTool className="w-8 h-8 text-blue-600" />;
      default:
        return <File className="w-8 h-8 text-blue-600" />;
    }
  };

  return (
    <section className="container max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="font-cal text-4xl mb-4">Creator Resources</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Everything you need to take your content creation to the next level
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4">
              {getResourceIcon(resource.type)}
            </div>
            <h3 className="font-semibold text-xl mb-2">{resource.title}</h3>
            <p className="text-gray-600 mb-4">{resource.description}</p>
            <a 
              href={resource.link}
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
            >
              Access resource
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}