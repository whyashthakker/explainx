"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { ChevronDown, ChevronUp, Loader2, ThumbsUp } from 'lucide-react';
import type { RoadmapItemStatus, RoadmapCategory } from '@prisma/client';

interface RoadmapItem {
  id: string;
  feature: string;
  status: RoadmapItemStatus;
  description: string;
  category: RoadmapCategory;
  votes: number;
  implementationDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

const STATUS_STYLES = {
  "COMPLETED": "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300",
  "IN_PROGRESS": "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300",
  "PLANNED": "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300"
} as const;

export default function ProductRoadmap() {
  const [showCompleted, setShowCompleted] = useState(false);
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<RoadmapCategory | 'All'>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [upvotingFeatures, setUpvotingFeatures] = useState<string[]>([]);

  // Load items and voted status from localStorage on mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/roadmap');
        if (!response.ok) throw new Error('Failed to fetch items');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching roadmap items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleRequestFeature = () => {
    window.open(`mailto:support@infloq.com?subject=Feature Request`);
  };

  const handleUpvote = async (id: string) => {
    // Check if already voted
    const votedItems = JSON.parse(localStorage.getItem('votedItems') || '[]');
    if (votedItems.includes(id) || upvotingFeatures.includes(id)) return;

    setUpvotingFeatures(prev => [...prev, id]);

    try {
      const response = await fetch('/api/roadmap/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: id }),
      });

      if (!response.ok) throw new Error('Failed to upvote feature');

      const { updatedItem } = await response.json();

      // Update items state
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, votes: updatedItem.votes } : item
        ).sort((a, b) => b.votes - a.votes)
      );

      // Save to localStorage
      localStorage.setItem('votedItems', JSON.stringify([...votedItems, id]));
    } catch (error) {
      console.error('Error upvoting feature:', error);
    } finally {
      setUpvotingFeatures(prev => prev.filter(featureId => featureId !== id));
    }
  };

  const filteredItems = items.filter(item => 
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    (showCompleted ? true : item.status !== 'COMPLETED')
  );

  const categories = ['All', ...new Set(items.map(item => item.category))];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Product Roadmap</h1>
            <p className="text-muted-foreground mt-2">
              Track the development of Infloq and vote on upcoming features
            </p>
          </div>
          <Button onClick={handleRequestFeature}>Request a Feature</Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as RoadmapCategory | 'All')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.replace(/_/g, ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-2"
          >
            {showCompleted ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {showCompleted ? "Hide Completed" : "Show Completed"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const votedItems = JSON.parse(localStorage.getItem('votedItems') || '[]');
            const hasVoted = votedItems.includes(item.id);

            return (
              <Card key={item.id} className="flex flex-col">
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{item.feature}</CardTitle>
                    <CardDescription>{item.category.replace(/_/g, ' ')}</CardDescription>
                  </div>
                  <Badge variant="outline" className={STATUS_STYLES[item.status]}>
                    {item.status.replace(/_/g, ' ')}
                  </Badge>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground flex-1">
                    {item.description}
                  </p>
                  {item.implementationDate && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Implemented: {new Date(item.implementationDate).toLocaleDateString()}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-medium">{item.votes} votes</span>
                    {item.status !== 'COMPLETED' && (
                      <Button
                        onClick={() => handleUpvote(item.id)}
                        variant="outline"
                        size="sm"
                        className={hasVoted ? 
                          'bg-muted cursor-not-allowed' : 'hover:bg-primary/10'}
                        disabled={hasVoted || upvotingFeatures.includes(item.id)}
                      >
                        {upvotingFeatures.includes(item.id) ? (
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        ) : (
                          <ThumbsUp className="h-4 w-4 mr-2" />
                        )}
                        Upvote
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}