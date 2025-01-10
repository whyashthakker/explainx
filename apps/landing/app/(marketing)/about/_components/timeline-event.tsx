import { Card, CardContent } from "@repo/ui/components/ui/card";

type TimelineEventProps = {
  year: string;
  title: string;
  description: string[];
  highlight?: string;
  isLast?: boolean;
};

export function TimelineEvent({ year, title, description, highlight, isLast }: TimelineEventProps) {
  return (
    <div className="relative pl-8 sm:pl-32 py-6 group">
      <div className="font-cal text-xl sm:text-2xl text-primary absolute left-0 sm:left-8 top-7">
        {year}
      </div>

      {!isLast && (
        <div className="absolute left-[1.3125rem] sm:left-24 top-10 h-full w-0.5 bg-border group-hover:bg-primary/50 transition-colors" />
      )}

      <div className="absolute left-[1.125rem] sm:left-[5.875rem] top-[2.375rem] h-2.5 w-2.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />

      <Card className="transition-all">
        <CardContent className="p-6">
          <h3 className="font-cal text-xl mb-2">{title}</h3>
          <div className="space-y-3">
            {description.map((paragraph, idx) => (
              <p key={idx} className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
            {highlight && (
              <div className="mt-4 inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {highlight}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}