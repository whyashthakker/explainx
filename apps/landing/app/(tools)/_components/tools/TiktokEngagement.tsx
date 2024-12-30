"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Tool } from '../../../../types/tools';
import { Input } from '@repo/ui/components/ui/input';
import { AlertCircle, Activity, Heart, MessageCircle, Share2, Percent } from 'lucide-react';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';

interface EngagementResponse {
  username: string;
  overall_engagement: string;
  like_rate: string;
  comment_rate: string;
  share_rate: string;
  view_engagement: string;
  peak_engagement_time: string;
  engagement_by_content_type: {
    type: string;
    rate: string;
  }[];
  weekly_engagement_trend: string;
  top_performing_content: string;
  last_updated: string;
}

interface TikTokEngagementProps {
  data: Tool;
}

export default function TikTokEngagement({ data }: TikTokEngagementProps) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<EngagementResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/tools/tiktok-engagement?username=${encodeURIComponent(username)}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to analyze engagement');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (error: any) {
      console.error('Error analyzing engagement:', error);
      setError(error.message || 'An error occurred while analyzing the engagement');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  const MetricCard = ({ icon: Icon, label, value, description }: { 
    icon: any, 
    label: string, 
    value: string,
    description?: string 
  }) => (
    <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <div className="text-xl font-semibold">{value}</div>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Free TikTok Engagement Checker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Enter TikTok Username
              </label>
              <div className="flex gap-4">
                <Input
                  id="username"
                  placeholder="Username without @"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button 
                  onClick={handleCheck} 
                  disabled={!username || loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Analyzing...' : 'Check Engagement'}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Get instant engagement insights - No signup required
              </p>
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
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Engagement Analysis for @{results.username}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <MetricCard 
                  icon={Percent}
                  label="Overall Engagement"
                  value={results.overall_engagement}
                  description="Average engagement across all content"
                />
                <MetricCard 
                  icon={Heart}
                  label="Like Rate"
                  value={results.like_rate}
                  description="Average likes per view"
                />
                <MetricCard 
                  icon={MessageCircle}
                  label="Comment Rate"
                  value={results.comment_rate}
                  description="Average comments per view"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Engagement Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-3">Engagement by Content Type</h3>
                  <div className="space-y-2">
                    {results.engagement_by_content_type.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">{item.type}</span>
                        <span className="font-medium">{item.rate}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-3">Performance Insights</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Peak Engagement Time</p>
                      <p className="font-medium">{results.peak_engagement_time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Weekly Trend</p>
                      <p className="font-medium">{results.weekly_engagement_trend}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Top Performing Content</p>
                      <p className="font-medium">{results.top_performing_content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-sm text-gray-500">
            Last updated: {new Date(results.last_updated).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}