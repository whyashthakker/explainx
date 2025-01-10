import { TimelineEvent } from "./timeline-event";

const timelineData = [
  {
    year: "2024",
    title: "Empowering the AI Community",
    description: [
      "Successfully educated over 100,000 students through specialized GenAI workshops and courses.",
      "Launched ExplainX.ai to revolutionize AI agent development and deployment.",
    ],
    highlight: "100K+ Students Trained"
  },
  {
    year: "2023",
    title: "The GenAI Revolution",
    description: [
      "Made the pivotal decision to focus full-time on teaching and developing Generative AI solutions.",
      "Created comprehensive curriculum for businesses and developers to master AI technologies.",
    ],
    highlight: "Full-time AI Education"
  },
  {
    year: "2014-2023",
    title: "AI Industry Experience",
    description: [
      "Decade-long journey in artificial intelligence, working with leading companies and technologies.",
      "Specialized in machine learning, natural language processing, and AI system architecture.",
    ],
    highlight: "10 Years in AI"
  }
];

export function Timeline() {
  return (
    <div className="relative max-w-3xl mx-auto">
      {timelineData.map((event, idx) => (
        <TimelineEvent
          key={idx} 
          {...event} 
          isLast={idx === timelineData.length - 1} 
        />
      ))}
    </div>
  );
}