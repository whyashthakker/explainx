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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <RealEstateResults data={result} />
        </div>
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
      <div className="space-y-8">
        {/* Task Context Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-900">Search Parameters</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(taskParameters).map(([key, value]) => (
                <div key={key} className="flex items-start space-x-3">
                  <span className="font-medium text-gray-700 capitalize min-w-[120px]">{key}:</span>
                  <span className="text-gray-600">{value as string}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
  
        {/* Selected Properties Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-900">Selected Properties</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {selectedProperties.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedProperties.map((property: any, index: number) => (
                  <Card key={index} className="border border-gray-200 hover:shadow-md transition-all duration-200">
                    <CardHeader className="border-b border-gray-100">
                      <CardTitle className="text-lg font-semibold text-gray-900">{property.name}</CardTitle>
                      <CardDescription className="text-gray-600">{property.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="mb-6">
                        <Badge variant="secondary" className="text-lg font-medium px-3 py-1 bg-gray-100 text-gray-900">
                          {property.price}
                        </Badge>
                      </div>
  
                      {/* Key Features */}
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {property.key_features.map((feature: string, featureIndex: number) => (
                            <li key={featureIndex} className="flex items-center text-gray-600">
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
  
                      {/* Pros and Cons */}
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-emerald-600 mb-3">Pros</h4>
                          <ul className="space-y-2">
                            {property.pros.map((pro: string, proIndex: number) => (
                              <li key={proIndex} className="flex items-center text-gray-600">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-rose-600 mb-3">Cons</h4>
                          <ul className="space-y-2">
                            {property.cons.map((con: string, conIndex: number) => (
                              <li key={conIndex} className="flex items-center text-gray-600">
                                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full mr-2"></span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardContent className="pt-0">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">View Details</Button>
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
              <Alert variant="default" className="bg-gray-50 border border-gray-200">
                <AlertDescription className="text-gray-600">No properties selected based on your search criteria.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
  
        {/* Top Recommendations Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-900">Top Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {topRecommendations.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {topRecommendations.map((recommendation: any, index: number) => (
                  <Card key={index} className="border border-gray-200 hover:shadow-md transition-all duration-200">
                    <CardHeader className="border-b border-gray-100">
                      <CardTitle className="text-lg font-semibold text-gray-900">{recommendation.property_name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-gray-600 leading-relaxed">{recommendation.reasoning}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert variant="default" className="bg-gray-50 border border-gray-200">
                <AlertDescription className="text-gray-600">No top recommendations available at the moment.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
  
        {/* Best Value Analysis Section */}
        {bestValueAnalysis && (
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-xl font-semibold text-gray-900">Best Value Analysis</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {bestValueAnalysis.price_per_sqft_comparison && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Price Comparison</h3>
                  <p className="text-gray-600 leading-relaxed">{bestValueAnalysis.price_per_sqft_comparison[0]}</p>
                </div>
              )}
              <Separator className="my-6" />
              {bestValueAnalysis.location_advantages && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Location Advantages</h3>
                  <p className="text-gray-600 leading-relaxed">{bestValueAnalysis.location_advantages[0]}</p>
                </div>
              )}
              <Separator className="my-6" />
              {bestValueAnalysis.amenities_comparison && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Amenities Comparison</h3>
                  <p className="text-gray-600 leading-relaxed">{bestValueAnalysis.amenities_comparison[0]}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
  
        {/* Location Trends Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-900">Location Trends</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {areaSummaries.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {areaSummaries.map((area: any, index: number) => (
                  <Card key={index} className="border border-gray-200 hover:shadow-md transition-all duration-200">
                    <CardHeader className="border-b border-gray-100">
                      <CardTitle className="text-lg font-semibold text-gray-900">{area.location}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <Badge variant="secondary" className="mb-2 bg-gray-100 text-gray-900 font-medium">
                            Price Trend
                          </Badge>
                          <p className="text-gray-600 leading-relaxed">
                            {area.price_trend}
                          </p>
                        </div>
                        {area.appreciation !== null && (
                          <div>
                            <Badge variant="secondary" className="mb-2 bg-emerald-50 text-emerald-700 font-medium">
                              Appreciation
                            </Badge>
                            <p className="text-gray-600 leading-relaxed">
                              {area.appreciation}%
                            </p>
                          </div>
                        )}
                        {area.rental_yield !== null && (
                          <div>
                            <Badge variant="secondary" className="mb-2 bg-blue-50 text-blue-700 font-medium">
                              Rental Yield
                            </Badge>
                            <p className="text-gray-600 leading-relaxed">
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
              <Alert variant="default" className="bg-gray-50 border border-gray-200">
                <AlertDescription className="text-gray-600">No location trend data available.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
  
        {/* Top Performing Areas */}
        {Object.keys(topPerformingAreas).length > 0 && (
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-xl font-semibold text-gray-900">Top Performing Areas</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border border-gray-200 bg-gray-50">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="text-lg font-semibold text-gray-900">Best Value</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      {topPerformingAreas.best_value?.map((area: string, index: number) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200 bg-emerald-50">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="text-lg font-semibold text-gray-900">Best Rental Yields</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      {topPerformingAreas.best_rental_yields?.map((area: string, index: number) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200 bg-amber-50">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="text-lg font-semibold text-gray-900">Highest Appreciation</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      {topPerformingAreas.highest_appreciation?.map((area: string, index: number) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                          {area}
                        </li>
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
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-xl font-semibold text-gray-900">Investment Insights</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {investmentInsights.map((insight: string, index: number) => (
                  <li key={index} className="flex items-start text-gray-600">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2"></span>
                    {insight}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
  
        {/* Negotiation Tips */}
        {negotiationTips.length > 0 && (
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-xl font-semibold text-gray-900">Negotiation Tips</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {negotiationTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start text-gray-600">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-2"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
  
        {/* Fallback Message */}
        {(areaSummaries.length === 0 && 
          investmentInsights.length === 0 && 
          selectedProperties.length === 0) && (
          <Alert variant="default" className="bg-gray-50 border border-gray-200">
            <AlertDescription className="text-gray-600">No detailed property information available at the moment.</AlertDescription>
          </Alert>
        )}
      </div>
    );
  };
  
    