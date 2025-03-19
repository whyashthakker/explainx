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

export default function TaskDetails({ taskId }: { taskId: string }) {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTask() {
            try {
                const res = await fetch(`/api/agents/task`, {
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!result) return <p>No result found.</p>;
    console.log("Result:", result);

    return (
        <pre className="mt-2 bg-gray-100 p-4 rounded"><RealEstateResults data={result} /></pre>
    );
}







const RealEstateResults = ({ data }: { data: any }) => {
    // Check if data is a task object and extract the result
    const taskResult = data?.task?.result || data?.result || data;
   
    console.log("Task Result:", taskResult);
   
    // Safely extract nested data with fallbacks
    const locationTrends = taskResult?.data?.location_trends || {};
    const propertyRecommendations = taskResult?.data?.property_recommendations || {};
   
    // Extract specific sections with empty array/object fallbacks
    const areaSummaries = locationTrends.area_summaries || [];
    const investmentInsights = locationTrends.investment_insights || [];
    const topPerformingAreas = locationTrends.top_performing_areas || {};
    const selectedProperties = propertyRecommendations.selected_properties || [];
    const topRecommendations = propertyRecommendations.top_recommendations || [];
    const negotiationTips = propertyRecommendations.negotiation_tips || [];
    const bestValueAnalysis = propertyRecommendations.best_value_analysis || {};
   
    // Extract task parameters for context
    const taskParameters = data?.task?.parameters || {};
  
    return (
      <div className="container mx-auto p-6 space-y-6">
        {/* Task Context Section */}
        <Card>
          <CardHeader>
            <CardTitle>Search Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-2">
              {Object.entries(taskParameters).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <span className="font-semibold mr-2 capitalize">{key}:</span>
                  <span className="break-words">{value as string}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
  
        {/* Selected Properties Section */}
        <Card>
          <CardHeader>
            <CardTitle>Selected Properties</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedProperties.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedProperties.map((property: any, index: number) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="break-words">{property.name}</CardTitle>
                      <CardDescription className="break-words">{property.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <Badge variant="secondary" className="text-xl break-words">{property.price}</Badge>
                      </div>
  
                      {/* Key Features */}
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Key Features:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {property.key_features.map((feature: string, featureIndex: number) => (
                            <li key={featureIndex} className="break-words">{feature}</li>
                          ))}
                        </ul>
                      </div>
  
                      {/* Pros and Cons */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            {property.pros.map((pro: string, proIndex: number) => (
                              <li key={proIndex} className="break-words">{pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            {property.cons.map((con: string, conIndex: number) => (
                              <li key={conIndex} className="break-words">{con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardContent>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button className="w-full">View Details</Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to see more property information</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert variant="default">
                <AlertDescription>No properties selected based on your search criteria.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
  
        {/* Top Recommendations Section */}
        <Card>
          <CardHeader>
            <CardTitle>Top Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            {topRecommendations.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {topRecommendations.map((recommendation: any, index: number) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="break-words">{recommendation.property_name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground break-words">{recommendation.reasoning}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert variant="default">
                <AlertDescription>No top recommendations available at the moment.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
  
        {/* Best Value Analysis Section */}
        {bestValueAnalysis && (
          <Card>
            <CardHeader>
              <CardTitle>Best Value Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bestValueAnalysis.price_per_sqft_comparison && (
                <div>
                  <h3 className="font-semibold mb-2">Price Comparison</h3>
                  <p className="text-muted-foreground break-words">{bestValueAnalysis.price_per_sqft_comparison[0]}</p>
                </div>
              )}
              <Separator />
              {bestValueAnalysis.location_advantages && (
                <div>
                  <h3 className="font-semibold mb-2">Location Advantages</h3>
                  <p className="text-muted-foreground break-words">{bestValueAnalysis.location_advantages[0]}</p>
                </div>
              )}
              <Separator />
              {bestValueAnalysis.amenities_comparison && (
                <div>
                  <h3 className="font-semibold mb-2">Amenities Comparison</h3>
                  <p className="text-muted-foreground break-words">{bestValueAnalysis.amenities_comparison[0]}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
  
        {/* Location Trends Section */}
        <Card>
  <CardHeader>
    <CardTitle>Location Trends</CardTitle>
  </CardHeader>
  <CardContent>
    {areaSummaries.length > 0 ? (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {areaSummaries.map((area: any, index: number) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="break-words text-wrap">{area.location}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <Badge variant="secondary">Price Trend</Badge>
                  <p className="text-muted-foreground break-words text-wrap max-w-full">
                    {area.price_trend}
                  </p>
                </div>
                {area.appreciation !== null && (
                  <div>
                    <Badge variant="secondary">Appreciation</Badge>
                    <p className="text-muted-foreground break-words text-wrap max-w-full">
                      {area.appreciation}%
                    </p>
                  </div>
                )}
                {area.rental_yield !== null && (
                  <div>
                    <Badge variant="secondary">Rental Yield</Badge>
                    <p className="text-muted-foreground break-words text-wrap max-w-full">
                      {area.rental_yield}%
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
        <AlertDescription>No location trend data available.</AlertDescription>
      </Alert>
    )}
  </CardContent>
</Card>

  
        {/* Top Performing Areas */}
        {Object.keys(topPerformingAreas).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-secondary">
                  <CardHeader>
                    <CardTitle>Best Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5">
                      {topPerformingAreas.best_value?.map((area: string, index: number) => (
                        <li key={index} className="break-words">{area}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-green-50">
                  <CardHeader>
                    <CardTitle>Best Rental Yields</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5">
                      {topPerformingAreas.best_rental_yields?.map((area: string, index: number) => (
                        <li key={index} className="break-words">{area}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-yellow-50">
                  <CardHeader>
                    <CardTitle>Highest Appreciation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5">
                      {topPerformingAreas.highest_appreciation?.map((area: string, index: number) => (
                        <li key={index} className="break-words">{area}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}
  
        {/* Investment Insights Section */}
        {investmentInsights.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Investment Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {investmentInsights.map((insight: string, index: number) => (
                  <li key={index} className="break-words">{insight}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
  
        {/* Negotiation Tips */}
        {negotiationTips.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Negotiation Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {negotiationTips.map((tip: string, index: number) => (
                  <li key={index} className="break-words">{tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
  
        {/* Fallback Message */}
        {(areaSummaries.length === 0 && 
          investmentInsights.length === 0 && 
          selectedProperties.length === 0) && (
          <Alert variant="default">
            <AlertDescription>No detailed property information available at the moment.</AlertDescription>
          </Alert>
        )}
      </div>
    );
  };
  
    