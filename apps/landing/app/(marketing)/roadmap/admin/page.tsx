"use client";

import { useState, useEffect } from 'react';
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@repo/ui/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { Badge } from "@repo/ui/components/ui/badge";
import { Textarea } from "@repo/ui/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Loader2, Plus, Pencil, Trash2, ArrowUpDown } from 'lucide-react';
import { RoadmapItemStatus, RoadmapCategory } from '@prisma/client';

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

export default function RoadmapAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [activeItem, setActiveItem] = useState<RoadmapItem | null>(null);
  const [sortBy, setSortBy] = useState<'votes' | 'date'>('votes');
  const [formData, setFormData] = useState({
    feature: '',
    status: 'PLANNED' as RoadmapItemStatus,
    category: 'CORE_PLATFORM' as RoadmapCategory,
    description: '',
    implementationDate: ''
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/roadmap');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      credentials.username === process.env.NEXT_PUBLIC_ROADMAP_ADMIN_USERNAME &&
      credentials.password === process.env.NEXT_PUBLIC_ROADMAP_ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeItem) {
        // Update existing item
        const response = await fetch(`/api/roadmap/${activeItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to update item');
      } else {
        // Create new item
        const response = await fetch('/api/roadmap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to create item');
      }

      await fetchItems();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      alert(activeItem ? 'Failed to update item' : 'Failed to create item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/roadmap/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete item');
      await fetchItems();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete item');
    }
  };

  const resetForm = () => {
    setFormData({
      feature: '',
      status: 'PLANNED',
      category: 'CORE_PLATFORM',
      description: '',
      implementationDate: ''
    });
    setActiveItem(null);
  };

  const editItem = (item: RoadmapItem) => {
    setActiveItem(item);
    setFormData({
      feature: item.feature,
      status: item.status,
      category: item.category,
      description: item.description,
      implementationDate: item.implementationDate || ''
    });
  };

  const sortedItems = [...items].sort((a, b) => 
    sortBy === 'votes' ? b.votes - a.votes : 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the roadmap admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({
                    ...prev,
                    username: e.target.value
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({
                    ...prev,
                    password: e.target.value
                  }))}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Roadmap Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage feature requests and track implementation progress
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setSortBy(prev => prev === 'votes' ? 'date' : 'votes')}
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort by {sortBy === 'votes' ? 'Date' : 'Votes'}
          </Button>
          <Button onClick={resetForm} disabled={!activeItem}>
            <Plus className="mr-2 h-4 w-4" />
            New Item
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{activeItem ? 'Edit' : 'Add'} Roadmap Item</CardTitle>
            <CardDescription>
              {activeItem ? 'Update existing' : 'Create a new'} feature item
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Feature Name</label>
                <Input
                  required
                  value={formData.feature}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    feature: e.target.value
                  }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData(prev => ({
                      ...prev,
                      status: value as RoadmapItemStatus
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PLANNED">Planned</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({
                      ...prev,
                      category: value as RoadmapCategory
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CORE_PLATFORM">Core Platform</SelectItem>
                      <SelectItem value="AI_FEATURES">AI Features</SelectItem>
                      <SelectItem value="ANALYTICS">Analytics</SelectItem>
                      <SelectItem value="INTEGRATION">Integration</SelectItem>
                      <SelectItem value="USER_EXPERIENCE">User Experience</SelectItem>
                      <SelectItem value="MOBILE">Mobile</SelectItem>
                      <SelectItem value="PERFORMANCE">Performance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                />
              </div>

              {formData.status === 'COMPLETED' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Implementation Date</label>
                  <Input
                    type="date"
                    value={formData.implementationDate}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      implementationDate: e.target.value
                    }))}
                  />
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {activeItem ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      {activeItem ? 'Update' : 'Create'} Item
                    </>
                  )}
                </Button>
                {activeItem && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs defaultValue="ALL">
            <TabsList className="mb-4">
              <TabsTrigger value="ALL">All</TabsTrigger>
              <TabsTrigger value="PLANNED">Planned</TabsTrigger>
              <TabsTrigger value="IN_PROGRESS">In Progress</TabsTrigger>
              <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="ALL" className="space-y-4">
              {sortedItems.map(item => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{item.feature}</CardTitle>
                        <CardDescription className="flex gap-2 mt-1">
                          <Badge>{item.category.replace(/_/g, ' ')}</Badge>
                          <Badge 
                            variant="outline" 
                            className={item.status === 'COMPLETED' ? 'bg-green-50' : 
                                     item.status === 'IN_PROGRESS' ? 'bg-blue-50' : 'bg-gray-50'}
                          >
                            {item.status.replace(/_/g, ' ')}
                          </Badge>
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editItem(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-between w-full text-sm text-muted-foreground">
                      <span>{item.votes} votes</span>
                      {item.implementationDate && (
                        <span>Implemented: {new Date(item.implementationDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            {['PLANNED', 'IN_PROGRESS', 'COMPLETED'].map(status => (
              <TabsContent key={status} value={status} className="space-y-4">
                {sortedItems
                  .filter(item => item.status === status)
                  .map(item => (
                    <Card key={item.id}>
                      {/* Same card content as above */}
                    </Card>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}