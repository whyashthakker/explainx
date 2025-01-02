"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';

interface Creator {
  handle: string;
  name: string;
  location: string;
  followers: string;
  engagement: string;
  bio: string;
  topics: string[];
}

export default function TwitterCreatorFinder() {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Creator[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'All',
    'Fashion',
    'Tech',
    'Business',
    'Gaming',
    'Lifestyle',
    'Health',
    'Travel'
  ];

  const handleSearch = async () => {
    if (!location) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/tools/twitter-creators?location=${encodeURIComponent(location)}&category=${selectedCategory}`);
      if (!response.ok) {
        throw new Error('Failed to fetch creators');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (error: any) {
      setError(error.message || 'An error occurred while searching for creators');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Twitter/X Creators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input
                placeholder="Enter country or city"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mb-4"
              />
              
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.toLowerCase()} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                onClick={handleSearch} 
                disabled={!location || loading}
                className="w-full"
              >
                {loading ? 'Searching...' : 'Find Creators'}
              </Button>
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

      {results && results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Creators in {location}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((creator, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">@{creator.handle}</h3>
                      <p className="text-gray-600">{creator.name}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">{creator.location}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{creator.bio}</p>
                  <div className="mt-3 flex gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Followers</span>
                      <p className="font-semibold">{creator.followers}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Engagement</span>
                      <p className="font-semibold">{creator.engagement}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {creator.topics.map((topic, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {results && results.length === 0 && (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-600">No creators found in this location. Try a different location or category.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}