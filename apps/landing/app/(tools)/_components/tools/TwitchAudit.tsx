"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';

interface TwitchAuditResponse {
  username: string;
  follower_count: string;
  total_views: string;
  engagement_rate: string;
  avg_viewers: string;
  peak_viewers: string;
  stream_time: string;
  audience_gender: {
    male: string;
    female: string;
    other: string;
  };
  authenticity_score: string;
  subscriber_count: string;
  last_updated: string;
}

export default function TwitchAudit() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TwitchAuditResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async () => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/tools/twitch-audit?username=${encodeURIComponent(username)}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch profile data');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      setError(error.message || 'An error occurred while fetching the profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAudit();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analyze Twitch Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Twitch Username
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
                  onClick={handleAudit} 
                  disabled={!username || loading}
                >
                  {loading ? 'Analyzing...' : 'Analyze'}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Alert>
              <AlertDescription>
                The percentages displayed are estimates based on our proprietary data analysis. Results may vary.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {results && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Channel Overview for {results.username}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Followers</div>
                  <div className="text-xl font-semibold">{results.follower_count}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Total Views</div>
                  <div className="text-xl font-semibold">{results.total_views}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Engagement Rate</div>
                  <div className="text-xl font-semibold">{results.engagement_rate}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Avg. Viewers</div>
                  <div className="text-xl font-semibold">{results.avg_viewers}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Peak Viewers</div>
                  <div className="text-xl font-semibold">{results.peak_viewers}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Stream Time</div>
                  <div className="text-xl font-semibold">{results.stream_time}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audience Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Demographics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Male</span>
                      <span className="font-medium">{results.audience_gender.male}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Female</span>
                      <span className="font-medium">{results.audience_gender.female}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other</span>
                      <span className="font-medium">{results.audience_gender.other}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Channel Health</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Authenticity Score</span>
                      <span className="font-medium">{results.authenticity_score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subscribers</span>
                      <span className="font-medium">{results.subscriber_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-sm text-gray-500">
            Last updated: {new Date(results.last_updated).toLocaleString()}
          </div>
        </>
      )}
    </div>
  );
}