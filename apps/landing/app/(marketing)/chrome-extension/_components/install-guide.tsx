import { Check } from "lucide-react";

export function InstallGuide() {
  const steps = [
    "Install the Infloq Chrome extension from the Chrome Web Store",
    "Visit any creator's profile on supported social platforms",
    "Click the Infloq icon in your browser to view analytics",
    "Get instant access to engagement metrics and audience insights"
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-cal text-3xl mb-4">Get Started in Minutes</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Follow these simple steps to start accessing creator analytics
        </p>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}