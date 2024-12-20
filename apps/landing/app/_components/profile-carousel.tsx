"use client";

import React, { useState } from 'react';
import { Heart, MapPin } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog";
import { Button } from '@repo/ui/components/ui/button';

interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  imageUrl: string;
  occupation: string;
}

const profiles: Profile[] = [
  {
    id: 1,
    name: "Sarah Chen",
    age: 28,
    location: "San Francisco",
    bio: "Creative soul seeking adventure. Love hiking, photography, and trying new cuisines.",
    interests: ["Photography", "Hiking", "Cooking", "Travel"],
    imageUrl: "/tacos-appsumo-black.png",
    occupation: "UX Designer"
  },
  {
    id: 2,
    name: "Alex Rivera",
    age: 31,
    location: "New York",
    bio: "Tech entrepreneur with a love for classical music and modern art.",
    interests: ["Music", "Art", "Technology"],
    imageUrl: "https://ph-avatars.imgix.net/2179893/0b68c40a-0596-4222-bb92-03b99c41bb4e.png",
    occupation: "Software Engineer"
  },
  {
    id: 3,
    name: "Emma Thompson",
    age: 26,
    location: "London",
    bio: "Bookworm and coffee enthusiast. I believe in spontaneous adventures.",
    interests: ["Reading", "Coffee", "Yoga"],
    imageUrl: "https://ph-avatars.imgix.net/6212118/e65b8927-e1df-4197-a6ea-c75f1c20ee6f.gif",
    occupation: "Writer"
  },
  {
    id: 4,
    name: "James Wilson",
    age: 30,
    location: "Austin",
    bio: "Music producer by day, amateur chef by night.",
    interests: ["Music", "Cooking", "Film"],
    imageUrl: "https://ph-avatars.imgix.net/5413468/c0037336-08b0-4570-9375-0ea68c9b2563.png",
    occupation: "Music Producer"
  },
  {
    id: 5,
    name: "Maya Patel",
    age: 27,
    location: "Seattle",
    bio: "Environmental scientist with a passion for sustainable living.",
    interests: ["Nature", "Sustainability", "Photography"],
    imageUrl: "https://ph-avatars.imgix.net/3695082/53ef7bc8-b0d2-40c0-96df-1873caf289d9.gif",
    occupation: "Scientist"
  }
];

const ProfileCarousel: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h2 className="font-cal text-3xl font-bold tracking-tight text-gray-900">
          Discover Top Influencers
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Connect with creators who align with your brand
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
          {/* First set of profiles */}
          {profiles.map((profile) => (
            <div key={`first-${profile.id}`} className="w-72 flex-shrink-0 px-4">
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
                      <h3 className="text-lg font-semibold">
                        {profile.name}, {profile.age}
                      </h3>
                      <p className="text-sm text-gray-200">{profile.occupation}</p>
                      <div className="flex items-center text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {profile.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
          
          {/* Second set of profiles */}
          {profiles.map((profile) => (
            <div key={`second-${profile.id}`} className="w-72 flex-shrink-0 px-4">
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
                      <h3 className="text-lg font-semibold">
                        {profile.name}, {profile.age}
                      </h3>
                      <p className="text-sm text-gray-200">{profile.occupation}</p>
                      <div className="flex items-center text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {profile.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        {/* Gradient overlays */}
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
                    <span className="text-xl">{selectedProfile.name}, {selectedProfile.age}</span>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {selectedProfile.location}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="hover:text-rose-500">
                    <Heart className="h-5 w-5" />
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
                <div>
                  <h4 className="text-sm font-medium text-gray-500">About</h4>
                  <p className="mt-1 text-gray-900">{selectedProfile.bio}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Interests</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProfile.interests.map((interest, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                      >
                        {interest}
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
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
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