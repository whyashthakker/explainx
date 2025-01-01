// app/about/_components/timeline.tsx
import { timelineData } from "../../../../data/about/data";
import { TimelineEvent } from "./timeline-event";

export function Timeline() {
  // Sort events in descending order by year
  const sortedData = [...timelineData].sort((a, b) => 
    parseInt(b.year) - parseInt(a.year)
  );

  return (
    <div className="relative max-w-3xl mx-auto">
      {sortedData.map((event, idx) => (
        <TimelineEvent 
          key={idx} 
          {...event} 
          isLast={idx === sortedData.length - 1} 
        />
      ))}
    </div>
  );
}