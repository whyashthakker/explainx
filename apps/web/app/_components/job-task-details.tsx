"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Alert, AlertDescription } from "@repo/ui/components/ui/alert";
import { Separator } from "@repo/ui/components/ui/separator";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@repo/ui/components/ui/tooltip";
import { 
  AlertCircle, 
  Briefcase, 
  CheckCircle2, 
  ExternalLink, 
  MapPin, 
  TrendingUp,
  Users,
  Star
} from "lucide-react";
import Link from "next/link";

export default function JobTaskDetails({ taskId }: { taskId: string }) {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTask() {
            try {
                const res = await fetch(`/api/agents/job-finder/task`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: taskId }),
                });

                if (!res.ok) throw new Error("Failed to fetch task.");

                const data = await res.json();
                setResult(data); // Store the full JSON response
            } catch (err) {
                setError("Error loading task.");
            } finally {
                setLoading(false);
            }
        }

        fetchTask();
    }, [taskId]);

    if (loading) return <div className="flex items-center justify-center h-screen"><p className="text-lg">Loading job search results...</p></div>;
    if (error) return <div className="flex items-center justify-center h-screen"><Alert variant="destructive"><AlertCircle className="h-4 w-4 mr-2" />{error}</Alert></div>;
    if (!result) return <div className="flex items-center justify-center h-screen"><p className="text-lg">No results found for this job search.</p></div>;
    
    console.log("Result:", result);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <JobFinderResults data={result} />
        </div>
    );
}

const JobFinderResults = ({ data }: { data: any }) => {
    // Check if data is a task object and extract the result
    const taskResult = data?.task?.result || data?.result || data;
   
    console.log("Task Result:", taskResult);
   
    // Safely extract nested data with fallbacks
    const industryTrends = taskResult?.data?.industry_trends || {};
    const jobRecommendations = taskResult?.data?.job_recommendations || {};
   
    // Extract specific sections with empty array/object fallbacks
    const trendsSummary = industryTrends.trends_summary || [];
    const careerInsights = industryTrends.career_insights || [];
    const topSkillsInDemand = industryTrends.top_skills_in_demand || {};
    
    const selectedJobs = jobRecommendations.selected_jobs || [];
    const topRecommendations = jobRecommendations.top_recommendations || [];
    const applicationTips = jobRecommendations.application_tips || [];
    const skillsMatchAnalysis = jobRecommendations.skills_match_analysis || {};
   
    // Extract task parameters for context
    const taskParameters = data?.task?.parameters || {};
  
    return (
      <div className="space-y-8">
        {/* Task Context Section */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-semibold">Search Parameters</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(taskParameters).map(([key, value]) => (
                <div key={key} className="flex items-start space-x-3">
                  <span className="font-medium capitalize min-w-[120px]">{key.replace(/_/g, ' ')}:</span>
                  {Array.isArray(value) ? (
                    <span>{value.join(', ')}</span>
                  ) : (
                    <span>{value as string}</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
  
        {/* Selected Jobs Section */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-semibold">Selected Jobs</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {selectedJobs.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedJobs.map((job: any, index: number) => (
                  <Card key={index} className="hover:shadow-md transition-all duration-200">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg font-semibold">{job.job_title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" /> {job.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="mb-6">
                        <Badge variant="secondary" className="text-md font-medium px-3 py-1 bg-primary/10 text-primary">
                          <Briefcase className="h-3 w-3 mr-1" /> {job.role}
                        </Badge>
                        {job.experience && (
                          <Badge variant="outline" className="text-md font-medium px-3 py-1 ml-2">
                            <Users className="h-3 w-3 mr-1" /> {job.experience}
                          </Badge>
                        )}
                      </div>
  
                      {/* Key Features */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Key Requirements</h4>
                        <ul className="space-y-2">
                          {job.key_features?.map((feature: string, featureIndex: number) => (
                            <li key={featureIndex} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
  
                      {/* Pros and Cons */}
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-green-500 dark:text-green-400 mb-3">Pros</h4>
                          <ul className="space-y-2">
                            {job.pros?.map((pro: string, proIndex: number) => (
                              <li key={proIndex} className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full mr-2"></span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-red-500 dark:text-red-400 mb-3">Cons</h4>
                          <ul className="space-y-2">
                            {job.cons?.map((con: string, conIndex: number) => (
                              <li key={conIndex} className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full mr-2"></span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardContent className="pt-0">
                      <Button asChild className="w-full bg-primary hover:bg-primary/90">
                        <Link href={job.job_link || '#'} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Apply Now
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert variant="default">
                <AlertDescription>No jobs found based on your search criteria.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
  
        {/* Top Recommendations Section */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-semibold">Top Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {topRecommendations.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {topRecommendations.map((recommendation: any, index: number) => (
                  <Card key={index} className="hover:shadow-md transition-all duration-200">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg font-semibold">
                        {recommendation.job_title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="leading-relaxed">{recommendation.reasoning}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert variant="default">
                <AlertDescription>No job recommendations available at the moment.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
  
        {/* Skills Match Analysis Section */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-semibold">Skills Match Analysis</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {skillsMatchAnalysis.experience_match && (
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                  Experience Match
                </h3>
                <ul className="space-y-2">
                  {skillsMatchAnalysis.experience_match.map((match: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 mr-2"></span>
                      {match}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <Separator />
            
            {skillsMatchAnalysis.growth_potential && (
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500 dark:text-green-400" />
                  Growth Potential
                </h3>
                <ul className="space-y-2">
                  {skillsMatchAnalysis.growth_potential.map((potential: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full mt-2 mr-2"></span>
                      {potential}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <Separator />
            
            {skillsMatchAnalysis.skills_comparison && (
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500 dark:text-yellow-400" />
                  Skills Comparison
                </h3>
                <ul className="space-y-2">
                  {skillsMatchAnalysis.skills_comparison.map((comparison: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-yellow-500 dark:bg-yellow-400 rounded-full mt-2 mr-2"></span>
                      {comparison}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
  
        {/* Industry Trends Section */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-semibold">Industry Trends</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {trendsSummary.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendsSummary.map((trend: any, index: number) => (
                  <Card key={index} className="hover:shadow-md transition-all duration-200">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg font-semibold capitalize">{trend.industry} Industry</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {trend.avg_salary !== null && (
                          <div>
                            <Badge variant="outline" className="mb-2 bg-green-500/10 text-green-500 dark:text-green-400 dark:bg-green-500/20 font-medium">
                              Average Salary
                            </Badge>
                            <p className="leading-relaxed">
                              ${trend.avg_salary?.toLocaleString()}
                            </p>
                          </div>
                        )}
                        {trend.growth_rate !== null && (
                          <div>
                            <Badge variant="outline" className="mb-2 bg-blue-500/10 text-blue-500 dark:text-blue-400 dark:bg-blue-500/20 font-medium">
                              Growth Rate
                            </Badge>
                            <p className="leading-relaxed">
                              {trend.growth_rate}%
                            </p>
                          </div>
                        )}
                        {trend.demand_level && (
                          <div>
                            <Badge variant="outline" className="mb-2 bg-purple-500/10 text-purple-500 dark:text-purple-400 dark:bg-purple-500/20 font-medium">
                              Demand Level
                            </Badge>
                            <p className="leading-relaxed capitalize">
                              {trend.demand_level}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert variant="default">
                <AlertDescription>No industry trend data available.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
  
        {/* Top Skills In Demand */}
        {Object.keys(topSkillsInDemand).length > 0 && (
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-xl font-semibold">Top Skills In Demand</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                {topSkillsInDemand.technical_skills && (
                  <Card className="border-blue-500/20 bg-blue-500/5 dark:bg-blue-950/20">
                    <CardHeader className="border-b border-blue-500/20">
                      <CardTitle className="text-lg font-semibold">Technical Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        {topSkillsInDemand.technical_skills.map((skill: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mr-2"></span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                
                {topSkillsInDemand.soft_skills && (
                  <Card className="border-green-500/20 bg-green-500/5 dark:bg-green-950/20">
                    <CardHeader className="border-b border-green-500/20">
                      <CardTitle className="text-lg font-semibold">Soft Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        {topSkillsInDemand.soft_skills.map((skill: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full mr-2"></span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                
                {topSkillsInDemand.emerging_skills && (
                  <Card className="border-yellow-500/20 bg-yellow-500/5 dark:bg-yellow-950/20">
                    <CardHeader className="border-b border-yellow-500/20">
                      <CardTitle className="text-lg font-semibold">Emerging Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        {topSkillsInDemand.emerging_skills.map((skill: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-yellow-500 dark:bg-yellow-400 rounded-full mr-2"></span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        )}
  
        {/* Career Insights Section */}
        {careerInsights.length > 0 && (
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-xl font-semibold">Career Insights</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {careerInsights.map((insight: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 mr-2"></span>
                    {insight}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
  
        {/* Application Tips */}
        {applicationTips.length > 0 && (
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-xl font-semibold">Application Tips</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {applicationTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-purple-500 dark:bg-purple-400 rounded-full mt-2 mr-2"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
  
        {/* Fallback Message */}
        {(trendsSummary.length === 0 && 
          careerInsights.length === 0 && 
          selectedJobs.length === 0) && (
          <Alert variant="default">
            <AlertDescription>No detailed job information available at the moment.</AlertDescription>
          </Alert>
        )}
      </div>
    );
  };