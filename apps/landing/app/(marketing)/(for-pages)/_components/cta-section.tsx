import { Button } from "@repo/ui/components/ui/button";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    link: string;
  };
  secondaryButton?: {
    text: string;
    link: string;
  };
}

export function CTASection({ 
  title, 
  description, 
  primaryButton, 
  secondaryButton 
}: CTASectionProps) {
  return (
    <section className="bg-blue-50 py-16">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-cal text-4xl mb-4">{title}</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{description}</p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <a href={primaryButton.link}>
            <Button size="lg">{primaryButton.text}</Button>
          </a>
          {secondaryButton && (
            <a href={secondaryButton.link}>
              <Button variant="outline" size="lg">
                {secondaryButton.text}
              </Button>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}