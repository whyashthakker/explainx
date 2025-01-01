// app/careers/_components/open-positions.tsx
import { Job, JobCard } from "./job-card";

const openings = [
    {
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Navi Mumbai",
      type: "Full-time",
      description: "Looking for an experienced full-stack developer to help build and scale our platform. Strong expertise in React, Node.js, and TypeScript required.",
      isUrgent: true,
    },
    {
      title: "Social Media Manager",
      department: "Marketing",
      location: "Navi Mumbai",
      type: "Full-time",
      description: "Manage our social media presence and create engaging content to drive brand awareness and engagement.",
    },
    {
      title: "Support Specialist",
      department: "Customer Success",
      location: "Navi Mumbai",
      type: "Full-time",
      description: "Help our customers succeed by providing timely support and troubleshooting assistance.",
    },
    {
      title: "Partnerships Manager",
      department: "Business Development",
      location: "Navi Mumbai",
      type: "Full-time",
      description: "Help us expand our brand partnerships and bring more companies onto our platform.",
    }
  ];

export function OpenPositions() {
  return (
    <div className="space-y-8">
      <h2 className="font-cal text-3xl text-center">Open Positions</h2>
      <div className="grid grid-cols-1 gap-6">
        {openings.map((job) => (
          <JobCard key={job.title} job={job} />
        ))}
      </div>
    </div>
  );
}