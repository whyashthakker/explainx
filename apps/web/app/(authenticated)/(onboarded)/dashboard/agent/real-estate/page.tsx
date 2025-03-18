"use client"
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import AgentHeader from '../../../_components/AgentHeader';
import { Label } from '@repo/ui/components/ui/label';
import { Table, TableHead, TableBody, TableHeader, TableRow, TableCell } from '@repo/ui/components/ui/table';
import { CheckCircle2, DollarSign, Home, Loader2, MapPin, Timer, XCircle } from 'lucide-react';
import { Input } from '@repo/ui/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';

// Define JobStatus type
type JobStatus = 'processing' | 'completed' | 'failed';

// Define Job interface
interface Job {
  task_id: string;
  status: JobStatus;
  message: string;
  createdAt: Date;
}

export default function RealEstate() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const updatedJobs = await Promise.all(
        jobs.map(async (job) => {
          if (job.status === 'processing') {
            const updatedStatus = await fetchJobStatus(job.task_id);
            return updatedStatus ? { ...job, status: updatedStatus } : job;
          }
          return job;
        })
      );
      setJobs(updatedJobs);
    }, 5000);

    return () => clearInterval(interval);
  }, [jobs]);

  const fetchJobStatus = async (task_id: string) => {
    try {
      const response = await fetch(`/api/webhook?task_id=${task_id}`);
      if (response.ok) {
        const data = await response.json();
        return data.status;
      }
    } catch (error) {
      console.error("Error fetching job status:", error);
    }
    return null;
  };
  
  

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
  
    const requestBody = {
      agent_type: "real-estate",
      parameters: {
        city: formData.get("city") as string,
        max_price: Number(formData.get("maxPrice")),
        property_category: formData.get("propertyCategory") as string,
        property_type: formData.get("propertyType") as string,
      },
    };
  
    try {
      const response = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) throw new Error("Failed to send job request");
  
      const data = await response.json();
      console.log("Job request sent successfully!", data);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen bg-background">
      <AgentHeader />
      <main className="container py-6">
        <div className="grid gap-6 lg:grid-cols-[400px,1fr] lg:gap-8">

          {/* Search Parameters Form */}
          <Card className="h-fit lg:sticky lg:top-20">
            <CardHeader>
              <CardTitle>Search Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="city" name="city" placeholder="Enter city name" className="pl-8" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxPrice">Maximum Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="maxPrice" name="maxPrice" type="number" placeholder="Enter maximum price" className="pl-8" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyCategory">Property Category</Label>
                  <Select name="propertyCategory" required defaultValue="">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select name="propertyType" required defaultValue="">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="office">Office Space</SelectItem>
                      <SelectItem value="retail">Retail Space</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Start Search
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Jobs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      
                      <TableHead>Status</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>View</TableHead>
                      <TableHead className="w-[180px]">Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.task_id}>
                        {/* Task ID as a View Link */}
                        

                        {/* Job Status */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {job.status === 'processing' && (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />
                                <span className="text-yellow-500">Processing</span>
                              </>
                            )}
                            {job.status === 'completed' && (
                              <>
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span className="text-green-500">Completed</span>
                              </>
                            )}
                            {job.status === 'failed' && (
                              <>
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span className="text-red-500">Failed</span>
                              </>
                            )}
                          </div>
                        </TableCell>

                        {/* Job Message */}
                        <TableCell>{job.message}</TableCell>

                        {/* Created At */}

                        <TableCell><Link href={`/tasks/${job.task_id}`}>
                        View result
                        </Link></TableCell>
                        <TableCell>{job.createdAt.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
