"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Tool } from '../../../../types/tools';
import { Input } from '@repo/ui/components/ui/input';
import { AlertCircle, Play, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';

interface TikTokAuditResponse {
  username: string;
  follower_count: string;
  engagement_rate: string;
  avg_likes: string;
  avg_comments: string;
  avg_shares: string;
  avg_plays: string;
  total_videos: string;
  content_categories: string[];
  posting_frequency: string;
  last_updated: string;
}

interface TikTokAuditProps {
  data: Tool;
}

export default function TikTokAudit({ data }: TikTokAuditProps) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TikTokAuditResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async () => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/tools/tiktok-audit?username=${encodeURIComponent(username)}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch profile data');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      setError(error.message || 'An error occurred while analyzing the profile');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAudit();
    }
  };

  const MetricCard = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Free TikTok Profile Audit</CardTitle>
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
                  onClick={handleAudit} 
                  disabled={!username || loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Analyzing...' : 'Analyze Profile'}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Get instant insights into your TikTok performance - No signup required
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
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results for @{results.username}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <MetricCard 
                icon={Heart} 
                label="Engagement Rate" 
                value={results.engagement_rate}
              />
              <MetricCard 
                icon={Play} 
                label="Avg. Video Plays" 
                value={results.avg_plays}
              />
              <MetricCard 
                icon={AlertCircle} 
                label="Followers" 
                value={results.follower_count}
              />
              <MetricCard 
                icon={Heart} 
                label="Avg. Likes" 
                value={results.avg_likes}
              />
              <MetricCard 
                icon={MessageCircle} 
                label="Avg. Comments" 
                value={results.avg_comments}
              />
              <MetricCard 
                icon={Share2} 
                label="Avg. Shares" 
                value={results.avg_shares}
              />
            </div>

            <div className="mt-6 space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Content Overview</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Videos</p>
                    <p className="font-medium">{results.total_videos}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Posting Frequency</p>
                    <p className="font-medium">{results.posting_frequency}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Content Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {results.content_categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              Last updated: {new Date(results.last_updated).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}