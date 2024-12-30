"use client";

// app/(tools)/_components/tools/InstagramAudit.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Tool } from '../../../../types/tools';
import { Input } from '@repo/ui/components/ui/input';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';
import { InstagramAuditResponse } from '../../../api/tools/instagram-audit/route';

interface InstagramAuditProps {
  data: Tool;
}

export default function InstagramAudit({ data }: InstagramAuditProps) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<InstagramAuditResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async () => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/tools/instagram-audit?username=${encodeURIComponent(username)}`);
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
          <CardTitle>Analyze Instagram Profile</CardTitle>
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
                <AlertDescription>
                  {error}
                </AlertDescription>
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
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Engagement Rate</div>
                <div className="text-xl font-semibold">{results.engagement_rate}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Followers</div>
                <div className="text-xl font-semibold">{results.follower_count}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Following</div>
                <div className="text-xl font-semibold">{results.following_count}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Posts</div>
                <div className="text-xl font-semibold">{results.post_count}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Avg. Likes</div>
                <div className="text-xl font-semibold">{results.avg_likes}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Avg. Comments</div>
                <div className="text-xl font-semibold">{results.avg_comments}</div>
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