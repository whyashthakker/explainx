"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Tool } from '../../../../types/tools';
import { Input } from '@repo/ui/components/ui/input';
import { AlertCircle, Info, MapPin, Users } from 'lucide-react';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/ui/dialog';

interface Creator {
  username: string;
  fullName: string;
  bio: string;
  location: string;
  followers: string;
  engagement: string;
  categories: string[];
  averageLikes: string;
  postsPerWeek: string;
  audienceLocation: string;
  primaryLanguage: string;
}

interface CreatorDiscoveryProps {
  data: Tool;
}

export default function CreatorDiscovery({ data }: CreatorDiscoveryProps) {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!location) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/tools/creator-discovery?location=${encodeURIComponent(location)}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to find creators');
      }
      
      const data = await response.json();
      setCreators(data.creators);
    } catch (error: any) {
      console.error('Error searching creators:', error);
      setError(error.message || 'An error occurred while searching for creators');
    } finally {
      setLoading(false);
    }
  };

  const CreatorCard = ({ creator }: { creator: Creator }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">@{creator.username}</h3>
            <p className="text-gray-600">{creator.fullName}</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Info className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Creator Details</DialogTitle>
                <DialogDescription>
                  Comprehensive insights about {creator.fullName}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Followers</p>
                    <p className="font-medium">{creator.followers}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Engagement Rate</p>
                    <p className="font-medium">{creator.engagement}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Posts per Week</p>
                    <p className="font-medium">{creator.postsPerWeek}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Avg. Likes</p>
                    <p className="font-medium">{creator.averageLikes}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {creator.categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Audience Location</p>
                  <p className="font-medium">{creator.audienceLocation}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-2 flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          {creator.location}
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{creator.bio}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          {creator.followers} followers
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Instagram Creators By Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1">
                Enter Location
              </label>
              <div className="flex gap-4">
                <Input
                  id="location"
                  placeholder="City, Country, or Region"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSearch} 
                  disabled={!location || loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Searching...' : 'Find Creators'}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Discover authentic Instagram creators in your target location
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

      {creators.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {creators.map((creator, index) => (
            <CreatorCard key={index} creator={creator} />
          ))}
        </div>
      )}
    </div>
  );
}