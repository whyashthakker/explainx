"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { AlertCircle, TrendingUp, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';
import { Tool } from '../../../../types/tools';

interface InstagramEngagementResponse {
  username: string;
  engagement_rate: string;
  total_engagements: string;
  avg_likes: string;
  avg_comments: string;
  avg_saves: string;
  follower_count: string;
  last_updated: string;
  benchmarks: {
    low: string;
    average: string;
    high: string;
  };
}

interface InstagramEngagementCheckerProps {
  data: Tool;
}

export default function InstagramEngagementChecker({ data }: InstagramEngagementCheckerProps) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<InstagramEngagementResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/tools/instagram-engagement?username=${encodeURIComponent(username)}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch engagement data');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      setError(error.message || 'An error occurred while fetching the engagement data');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  const getEngagementColor = (rate: string) => {
    const percentage = parseFloat(rate);
    if (percentage >= 5) return 'text-green-600';
    if (percentage >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Check Instagram Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Instagram Username
              </label>
              <div className="flex gap-4">
                <Input
                  id="username"
                  placeholder="Enter username without @"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button 
                  onClick={handleCheck} 
                  disabled={!username || loading}
                >
                  {loading ? 'Analyzing...' : 'Check Engagement'}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {results && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Engagement Analysis for @{results.username}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-6 bg-gray-50 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Engagement Rate</div>
                  <div className={`text-2xl font-bold ${getEngagementColor(results.engagement_rate)}`}>
                    {results.engagement_rate}
                  </div>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <ThumbsUp className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Average Likes</div>
                  <div className="text-2xl font-bold">{results.avg_likes}</div>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <MessageCircle className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Average Comments</div>
                  <div className="text-2xl font-bold">{results.avg_comments}</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">Industry Benchmarks</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Low</div>
                    <div className="text-lg font-semibold text-red-600">
                      {results.benchmarks.low}
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Average</div>
                    <div className="text-lg font-semibold text-yellow-600">
                      {results.benchmarks.average}
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">High</div>
                    <div className="text-lg font-semibold text-green-600">
                      {results.benchmarks.high}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                Last updated: {new Date(results.last_updated).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              The engagement rates and metrics displayed are estimates based on our proprietary data analysis.
              Results may vary based on account activity and Instagram's algorithms.
            </AlertDescription>
          </Alert>
        </>
      )}
    </div>
  );
}