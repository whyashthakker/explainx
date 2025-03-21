"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import AgentHeader from '../../../_components/AgentHeader';
import { Label } from '@repo/ui/components/ui/label';
import { Table, TableHead, TableBody, TableHeader, TableRow, TableCell } from '@repo/ui/components/ui/table';
import { AlertCircle, CheckCircle2, DollarSign, Home, Loader2, LogIn, MapPin, XCircle } from 'lucide-react';
import { Input } from '@repo/ui/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui/alert";

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

export default function RealEstate() {
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
      const response = await fetch('/api/agents/real-estate/tasks');
      
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
      setError(error.message || 'Failed to load your property searches');
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
      city: formData.get('city') as string,
      maxPrice: formData.get('maxPrice') as string,
      propertyCategory: formData.get('propertyCategory') as string,
      propertyType: formData.get('propertyType') as string
    };
    
    try {
      const response = await fetch('/api/agents/real-estate/new-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit search request');
      }
      
      // Refresh job list after successful submission
      fetchJobs();
      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setError(error.message || 'An error occurred while submitting your search');
    } finally {
      setLoading(false);
    }
  };
  
  // Show login prompt if not authenticated
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-background">
        <AgentHeader />
        <main className="container py-16">
          <div className="flex flex-col items-center justify-center max-w-md mx-auto text-center">
            <LogIn className="h-12 w-12 text-primary mb-4" />
            <h1 className="text-2xl font-bold mb-3">Sign in Required</h1>
            <p className="text-muted-foreground mb-6">
              Please sign in to access the real estate search agent and view your searches.
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
        <AgentHeader />
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
      <AgentHeader />
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
                  <Label htmlFor="maxPrice">Maximum Price in Crore</Label>
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

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Home className="mr-2 h-4 w-4" />
                      Start Search
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Jobs Table */}
          <Card>
            <CardHeader>
              <CardTitle>My Property Searches</CardTitle>
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
                    {jobs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                          No search jobs found. Start a new search!
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

                          {/* Job Message */}
                          <TableCell>{job.message}</TableCell>

                          {/* View Link */}
                          <TableCell>
                            <Link href={`/tasks/real-estate/${job.task_id}`} className="text-secondaccent2 hover:underline">
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