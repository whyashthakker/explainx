'use client';

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
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";

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
    <Card className="bg-background dark:bg-[#1A1A1A] border border-border dark:border-gray-800 hover:border-secondaccent dark:hover:border-secondaccent2 transition-all duration-300 hover:shadow-2xl group">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-foreground dark:text-white group-hover:text-secondaccent2 transition-colors">
              {job.title}
            </CardTitle>
            <CardDescription className="mt-2 flex flex-wrap gap-3 text-muted-foreground">
              <span className="flex items-center">
                <Briefcase className="w-4 h-4 mr-1 text-secondaccent2" />
                {job.department}
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-secondaccent2" />
                {job.location}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-secondaccent2" />
                {job.type}
              </span>
            </CardDescription>
          </div>
          {job.isUrgent && (
            <Badge className="bg-secondaccent2 text-black border-secondaccent hover:bg-yellow-600">
              Urgent
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground mb-4">{job.description}</p>
        <Link href={`mailto:careers@explainx.ai?subject=Application for ${job.title}`}>
          <Button className="bg-secondaccent2 hover:bg-yellow-600 text-black font-medium transition-colors group/btn">
            Apply Now
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}