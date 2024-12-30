// app/(tools)/_components/tools/FakeFollowerChecker.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Tool } from '../../../../types/tools';
import { Input } from '@repo/ui/components/ui/input';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';

interface FakeFollowerResponse {
  username: string;
  fake_follower_percentage: string;
  engagement_quality_score: string;
  suspicious_accounts: string;
  bot_interaction_rate: string;
  authenticity_score: string;
  last_updated: string;
}

interface FakeFollowerCheckerProps {
  data: Tool;
}

export default function FakeFollowerChecker({ data }: FakeFollowerCheckerProps) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FakeFollowerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/tools/fake-follower-check?username=${encodeURIComponent(username)}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to analyze profile');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (error: any) {
      console.error('Error analyzing profile:', error);
      setError(error.message || 'An error occurred while analyzing the profile');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Free Instagram Fake Follower Checker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Enter Instagram Username
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
                  {loading ? 'Analyzing...' : 'Check Now'}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                No signup required - Get instant results
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
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Fake Follower %</div>
                <div className="text-xl font-semibold">{results.fake_follower_percentage}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Engagement Quality</div>
                <div className="text-xl font-semibold">{results.engagement_quality_score}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Suspicious Accounts</div>
                <div className="text-xl font-semibold">{results.suspicious_accounts}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Bot Interaction Rate</div>
                <div className="text-xl font-semibold">{results.bot_interaction_rate}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Authenticity Score</div>
                <div className="text-xl font-semibold">{results.authenticity_score}</div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">What These Results Mean</h3>
              <p className="text-sm text-gray-600">
                Our analysis uses advanced algorithms to detect patterns associated with fake followers. 
                A higher authenticity score indicates more genuine followers, while elevated bot interaction 
                rates may suggest artificial engagement.
              </p>
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