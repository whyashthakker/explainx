"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import AgentHeader from '../../../_components/AgentHeader';
import { Label } from '@repo/ui/components/ui/label';
import { Table, TableHead, TableBody, TableHeader, TableRow, TableCell } from '@repo/ui/components/ui/table';
import { AlertCircle, CheckCircle2, Briefcase, MapPin, Loader2, LogIn, XCircle, Users } from 'lucide-react';
import { Input } from '@repo/ui/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui/alert";
import { Textarea } from "@repo/ui/components/ui/textarea";

// Define the types locally to avoid importing from files that might have the async_hooks issue
type JobStatus = 'processing' | 'completed' | 'failed';

interface Job {
  id: string;
  task_id: string;
  status: JobStatus;
  message: string | null;
  createdAt: string | Date;
  parameters: any;
  result?: any | null;
}

export default function JobFinder() {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);

  // Fetch jobs on component mount and when session changes
  useEffect(() => {
    if (status === 'authenticated') {
      fetchJobs();

      // Set up polling every minute
      const interval = setInterval(() => {
        fetchJobs();
      }, 60000); // 60000 ms = 1 minute

      // Clean up on unmount
      return () => clearInterval(interval);
    }
  }, [status]);

  const fetchJobs = async (): Promise<void> => {
    try {
      setError(null);
      const response = await fetch('/api/agents/job-finder/tasks');

      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized (might happen if session expired)
          throw new Error('Please sign in to view your tasks');
        } else {
          const data = await response.json();
          throw new Error(data.message || 'Failed to fetch jobs');
        }
      }

      const data = await response.json();
      setJobs(data);
      setInitialLoadComplete(true);
    } catch (error: any) {
      console.error('Error fetching jobs:', error);
      setError(error.message || 'Failed to load your job searches');
      setInitialLoadComplete(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (status !== 'authenticated') {
      setError('Please sign in to create a search');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      job_title: formData.get('job_title') as string,
      location: formData.get('location') as string,
      experience_years: formData.get('experience_years') as string,
      skills: (formData.get('skills') as string).split(',').map(skill => skill.trim()),
      job_category: formData.get('job_category') as string
    };

    try {
      const response = await fetch('/api/agents/job-finder/new-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit job search request');
      }

      // Refresh job list after successful submission
      fetchJobs();
      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setError(error.message || 'An error occurred while submitting your job search');
    } finally {
      setLoading(false);
    }
  };

  // Show login prompt if not authenticated
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-background">
        <AgentHeader title="Job Finder AI agent" />
        <main className="container py-16">
          <div className="flex flex-col items-center justify-center max-w-md mx-auto text-center">
            <LogIn className="h-12 w-12 text-primary mb-4" />
            <h1 className="text-2xl font-bold mb-3">Sign in Required</h1>
            <p className="text-muted-foreground mb-6">
              Please sign in to access the job finder agent and view your searches.
            </p>
            <Button onClick={() => {
              // Use window.location to navigate to sign in page to avoid any potential issues
              window.location.href = '/api/auth/signin';
            }} size="lg">
              Sign In
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Show loading state while session is loading
  if (status === 'loading' || (status === 'authenticated' && !initialLoadComplete)) {
    return (
      <div className="min-h-screen bg-background">
        <AgentHeader title="Job Finder AI agent" />
        <main className="container py-16">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">{status === 'loading' ? 'Loading your account...' : 'Loading your searches...'}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AgentHeader title="Job Finder AI agent" />
      <main className="container py-6">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-[400px,1fr] lg:gap-8">
          {/* Search Parameters Form */}
          <Card className="h-fit lg:sticky lg:top-20">
            <CardHeader>
              <CardTitle>Job Search Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="job_title">Job Title</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="job_title" name="job_title" placeholder="Enter job title" className="pl-8" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="location" name="location" placeholder="Enter job location" className="pl-8" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience_years">Years of Experience</Label>
                  <div className="relative">
                    <Users className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="experience_years"
                      name="experience_years"
                      type="number"
                      placeholder="Enter years of experience"
                      className="pl-8"
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Textarea
                    id="skills"
                    name="skills"
                    placeholder="Enter skills, separated by commas"
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job_category">Job Category</Label>
                  <Select name="job_category" required defaultValue="">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="data_science">Data Science</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Briefcase className="mr-2 h-4 w-4" />
                      Start Job Search
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Jobs Table */}
          <Card>
            <CardHeader>
              <CardTitle>My Job Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>View</TableHead>
                      <TableHead className="w-[180px]">Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          No job searches found. Start a new search!
                        </TableCell>
                      </TableRow>
                    ) : (
                      jobs.map((job) => (
                        <TableRow key={job.id}>
                          {/* Job Status */}
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {job.status === 'processing' && (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin text-secondaccent2" />
                                  <span className="text-secondaccent2">Processing</span>
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

                          {/* Job Title */}
                          <TableCell>{job.parameters?.job_title || 'N/A'}</TableCell>

                          {/* Location */}
                          <TableCell>{job.parameters?.location || 'N/A'}</TableCell>

                          {/* View Link */}
                          <TableCell>
                            <Link href={`/job-finder/task/${job.task_id}`} className="text-secondaccent2 hover:underline">
                              View result
                            </Link>
                          </TableCell>

                          {/* Created At */}
                          <TableCell>{new Date(job.createdAt).toLocaleString()}</TableCell>
                        </TableRow>
                      ))
                    )}
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