import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/ui/tabs';
import { Tool } from '../../../../types/tools';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

export default function ToolLayout({ tool, children }: ToolLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{tool.name}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{tool.description}</p>
      </div>

      {/* Main Tool Interface */}
      <div className="mb-12">
        {children}
      </div>

      {/* Key Features */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {tool.keyFeatures.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-xl">★</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Use Cases */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Use Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={tool.useCase?.[0]?.title?.toLowerCase() || ''}>
            <TabsList className="mb-6">
              {tool.useCase.map((useCase) => (
                <TabsTrigger 
                  key={useCase.title} 
                  value={useCase.title.toLowerCase()}
                >
                  {useCase.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {tool.useCase.map((useCase) => (
              <TabsContent 
                key={useCase.title} 
                value={useCase.title.toLowerCase()}
              >
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">{useCase.title}</h3>
                  <p className="mb-6 text-gray-600">{useCase.description}</p>
                  <ul className="space-y-3">
                    {useCase.examples.map((example, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-500">✓</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Pricing */}
      {tool.pricing && (
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Free</h3>
                <ul className="space-y-3">
                  {tool.pricing.free?.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-500">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Pro</h3>
                <p className="text-2xl font-bold mb-4">{tool.pricing.price}</p>
                <ul className="space-y-3">
                  {tool.pricing.pro?.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-500">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* FAQ */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {tool.faq.map((item, index) => (
              <div key={index} className="border-b pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold mb-3">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Target Audience */}
      <Card>
        <CardHeader>
          <CardTitle>Who Is This Tool For?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {tool.targetAudience.map((audience, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
                {audience}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Alert>
        <AlertDescription>
          The percentages and metrics displayed are estimates based on our proprietary data analysis. Results may vary based on account activity and Instagram's policies.
        </AlertDescription>
      </Alert>
    </div>
  );
}