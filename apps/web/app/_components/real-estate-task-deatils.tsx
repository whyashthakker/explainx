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
  Home,
  MapPin,
  DollarSign,
  BarChart3,
  CheckCircle2,
  Eye
} from "lucide-react";

export default function TaskDetails({ taskId }: { taskId: string }) {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTask() {
            try {
                const res = await fetch(`/api/agents/real-estate/task`, {
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

    if (loading) return <div className="flex items-center justify-center h-screen"><p className="text-lg">Loading property search results...</p></div>;
    if (error) return <div className="flex items-center justify-center h-screen"><Alert variant="destructive"><AlertCircle className="h-4 w-4 mr-2" />{error}</Alert></div>;
    if (!result) return <div className="flex items-center justify-center h-screen"><p className="text-lg">No results found for this property search.</p></div>;

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
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-semibold">Search Parameters</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(taskParameters).map(([key, value]) => (
                <div key={key} className="flex items-start space-x-3">
                  <span className="font-medium capitalize min-w-[120px]">{key}:</span>
                  <span>{value as string}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
  
        {/* Selected Properties Section */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-semibold">Selected Properties</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {selectedProperties.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedProperties.map((property: any, index: number) => (
                  <Card key={index} className="hover:shadow-md transition-all duration-200">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg font-semibold">{property.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" /> {property.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="mb-6">
                        <Badge variant="outline" className="text-lg font-medium px-3 py-1 flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {property.price}
                        </Badge>
                      </div>
  
                      {/* Key Features */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {property.key_features.map((feature: string, featureIndex: number) => (
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
                            {property.pros.map((pro: string, proIndex: number) => (
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
                            {property.cons.map((con: string, conIndex: number) => (
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
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button className="w-full bg-primary hover:bg-primary/90">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
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
                        {recommendation.property_name}
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
                <AlertDescription>No top recommendations available at the moment.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
  
        {/* Best Value Analysis Section */}
        {bestValueAnalysis && (
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-xl font-semibold">Best Value Analysis</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {bestValueAnalysis.price_per_sqft_comparison && (
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-green-500 dark:text-green-400" />
                    Price Comparison
                  </h3>
                  <p className="leading-relaxed">{bestValueAnalysis.price_per_sqft_comparison[0]}</p>
                </div>
              )}
              <Separator />
              {bestValueAnalysis.location_advantages && (
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                    Location Advantages
                  </h3>
                  <p className="leading-relaxed">{bestValueAnalysis.location_advantages[0]}</p>
                </div>
              )}
              <Separator />
              {bestValueAnalysis.amenities_comparison && (
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <Home className="h-5 w-5 mr-2 text-purple-500 dark:text-purple-400" />
                    Amenities Comparison
                  </h3>
                  <p className="leading-relaxed">{bestValueAnalysis.amenities_comparison[0]}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
  
        {/* Location Trends Section */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-semibold">Location Trends</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {areaSummaries.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {areaSummaries.map((area: any, index: number) => (
                  <Card key={index} className="hover:shadow-md transition-all duration-200">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg font-semibold">{area.location}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <Badge variant="outline" className="mb-2 flex items-center">
                            <BarChart3 className="h-3 w-3 mr-1" />
                            Price Trend
                          </Badge>
                          <p className="leading-relaxed">
                            {area.price_trend}
                          </p>
                        </div>
                        {area.appreciation !== null && (
                          <div>
                            <Badge variant="outline" className="mb-2 bg-green-500/10 text-green-500 dark:text-green-400 dark:bg-green-500/20 font-medium">
                              Appreciation
                            </Badge>
                            <p className="leading-relaxed">
                              {area.appreciation}%
                            </p>
                          </div>
                        )}
                        {area.rental_yield !== null && (
                          <div>
                            <Badge variant="outline" className="mb-2 bg-blue-500/10 text-blue-500 dark:text-blue-400 dark:bg-blue-500/20 font-medium">
                              Rental Yield
                            </Badge>
                            <p className="leading-relaxed">
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
            <CardHeader className="border-b">
              <CardTitle className="text-xl font-semibold">Top Performing Areas</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-gray-500/20 bg-gray-500/5 dark:bg-gray-800/20">
                  <CardHeader className="border-b border-gray-500/20">
                    <CardTitle className="text-lg font-semibold">Best Value</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      {topPerformingAreas.best_value?.map((area: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full mr-2"></span>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-green-500/20 bg-green-500/5 dark:bg-green-950/20">
                  <CardHeader className="border-b border-green-500/20">
                    <CardTitle className="text-lg font-semibold">Best Rental Yields</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      {topPerformingAreas.best_rental_yields?.map((area: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full mr-2"></span>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-yellow-500/20 bg-yellow-500/5 dark:bg-yellow-950/20">
                  <CardHeader className="border-b border-yellow-500/20">
                    <CardTitle className="text-lg font-semibold">Highest Appreciation</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      {topPerformingAreas.highest_appreciation?.map((area: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-yellow-500 dark:bg-yellow-400 rounded-full mr-2"></span>
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
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-xl font-semibold">Investment Insights</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {investmentInsights.map((insight: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 mr-2"></span>
                    {insight}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
  
        {/* Negotiation Tips */}
        {negotiationTips.length > 0 && (
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-xl font-semibold">Negotiation Tips</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {negotiationTips.map((tip: string, index: number) => (
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