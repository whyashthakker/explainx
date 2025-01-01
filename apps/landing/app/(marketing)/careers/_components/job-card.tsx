// app/careers/_components/job-card.tsx
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

export type Job = {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  isUrgent?: boolean;
};

export function JobCard({ job }: { job: Job }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="mt-1">
              {job.department} · {job.location} · {job.type}
            </CardDescription>
          </div>
          {job.isUrgent && (
            <Badge variant="destructive">Urgent</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{job.description}</p>
        <Link href={`mailto:careers@infloq.com?subject=Application for ${job.title}`}>
          <Button>Apply Now</Button>
        </Link>
      </CardContent>
    </Card>
  );
}