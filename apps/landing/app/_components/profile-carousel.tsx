import React, { useState } from 'react';
import { MapPin, Users, TrendingUp, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog";
import { Button } from '@repo/ui/components/ui/button';

interface Profile {
  id: number;
  name: string;
  location: string;
  bio: string;
  niche: string[];
  imageUrl: string;
  metrics: {
    engagementRate: number;
    followers: number;
    completedCollabs: number;
    avgROI: number;
  };
  platforms: string[];
  occupation: string;
}

const profiles: Profile[] = [
  {
    id: 1,
    name: "Yash Thakker",
    location: "India",
    bio: "Tech influencer focusing on UI/UX and product design. Creating content that bridges design and technology.",
    niche: ["Tech", "Design", "ProductHunt", "Startups"],
    imageUrl: "/images/blog/yt.jpg",
    metrics: {
      engagementRate: 4.8,
      followers: 50000,
      completedCollabs: 48,
      avgROI: 3.2
    },
    platforms: ["Twitter", "LinkedIn", "Instagram"],
    occupation: "UX Designer"
  },
  {
    id: 2,
    name: "Alex Rivera",
    location: "New York",
    bio: "Developer advocate sharing insights on web development and tech entrepreneurship.",
    niche: ["Programming", "Web3", "StartupLife"],
    imageUrl: "https://ph-avatars.imgix.net/2179893/0b68c40a-0596-4222-bb92-03b99c41bb4e.png",
    metrics: {
      engagementRate: 5.2,
      followers: 42000,
      completedCollabs: 75,
      avgROI: 4.1
    },
    platforms: ["GitHub", "Twitter", "YouTube"],
    occupation: "Software Engineer"
  },
  {
    id: 3,
    name: "Emma Thompson",
    location: "London",
    bio: "Content strategist specializing in B2B SaaS. Helping brands tell compelling stories through data-driven content.",
    niche: ["B2B", "SaaS", "ContentMarketing", "Growth"],
    imageUrl: "https://ph-avatars.imgix.net/6212118/e65b8927-e1df-4197-a6ea-c75f1c20ee6f.gif",
    metrics: {
      engagementRate: 6.1,
      followers: 38000,
      completedCollabs: 92,
      avgROI: 4.8
    },
    platforms: ["LinkedIn", "Twitter", "Medium"],
    occupation: "Content Strategist"
  },
  {
    id: 4,
    name: "James Wilson",
    location: "Austin",
    bio: "Growth marketing expert sharing proven strategies for startup success. Speaker and consultant.",
    niche: ["Marketing", "Growth", "Startups", "Analytics"],
    imageUrl: "https://ph-avatars.imgix.net/5413468/c0037336-08b0-4570-9375-0ea68c9b2563.png",
    metrics: {
      engagementRate: 5.7,
      followers: 52000,
      completedCollabs: 115,
      avgROI: 3.9
    },
    platforms: ["Twitter", "LinkedIn", "YouTube"],
    occupation: "Growth Marketer"
  },
  {
    id: 5,
    name: "Maya Patel",
    location: "Seattle",
    bio: "AI researcher and tech educator making machine learning accessible to everyone. Building in public.",
    niche: ["AI", "MachineLearning", "Tech", "Education"],
    imageUrl: "https://ph-avatars.imgix.net/3695082/53ef7bc8-b0d2-40c0-96df-1873caf289d9.gif",
    metrics: {
      engagementRate: 7.2,
      followers: 65000,
      completedCollabs: 83,
      avgROI: 5.1
    },
    platforms: ["Twitter", "YouTube", "Substack"],
    occupation: "AI Researcher"
  }
];

const ProfileCarousel: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Discover Top Influencers
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Connect with creators who drive real results
        </p>
      </div>

      <div 
        className="relative h-[400px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={`profile-scroll flex ${isHovered ? 'paused' : ''}`}
          style={{
            width: `${profiles.length * 320 * 2}px`,
          }}
        >
          {[...profiles, ...profiles].map((profile, idx) => (
            <div key={`${idx}-${profile.id}`} className="w-72 flex-shrink-0 px-4">
              <Card
                className="cursor-pointer group hover:shadow-lg transition-all duration-300"
                onClick={() => setSelectedProfile(profile)}
              >
                <CardContent className="p-0 relative overflow-hidden">
                  <div className="relative h-80 w-full">
                    <Image
                      src={profile.imageUrl}
                      alt={profile.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-semibold">{profile.name}</h3>
                      <p className="text-sm text-gray-200">{profile.occupation}</p>
                      <div className="flex items-center text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {profile.location}
                      </div>
                      <div className="mt-2 flex items-center space-x-4">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{formatNumber(profile.metrics.followers)}</span>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span>{profile.metrics.engagementRate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent" />
      </div>

      <Dialog open={!!selectedProfile} onOpenChange={() => setSelectedProfile(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedProfile && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <div>
                    <span className="text-xl">{selectedProfile.name}</span>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {selectedProfile.location}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <CheckCircle className="h-5 w-5" />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              
              <div className="relative h-64 w-full">
                <Image
                  src={selectedProfile.imageUrl}
                  alt={selectedProfile.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Engagement Rate</div>
                    <div className="text-lg font-semibold">{selectedProfile.metrics.engagementRate}%</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Followers</div>
                    <div className="text-lg font-semibold">{formatNumber(selectedProfile.metrics.followers)}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Collaborations</div>
                    <div className="text-lg font-semibold">{selectedProfile.metrics.completedCollabs}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Avg. ROI</div>
                    <div className="text-lg font-semibold">{selectedProfile.metrics.avgROI}x</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">About</h4>
                  <p className="mt-1 text-gray-900">{selectedProfile.bio}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Niche</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProfile.niche.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Platforms</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProfile.platforms.map((platform, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .profile-scroll {
          animation: scroll 40s linear infinite;
        }
        .profile-scroll.paused {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ProfileCarousel;