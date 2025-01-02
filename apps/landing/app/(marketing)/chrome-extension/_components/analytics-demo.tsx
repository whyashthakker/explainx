import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import Image from "next/image";

export function AnalyticsDemo() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-cal text-3xl mb-4">Powerful Analytics at Your Fingertips</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Access comprehensive creator insights directly in your browser, compatible with Instagram, TikTok, YouTube, and more.
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Creator Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg">
            <Image 
              src="/features/connect-your-analytics.png"
              alt="Infloq Analytics Dashboard"
              className="w-full h-full object-cover"
              width={800}
              height={450}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
