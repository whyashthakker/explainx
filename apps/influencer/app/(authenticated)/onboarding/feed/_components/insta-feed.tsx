"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Instagram, Users, Video, Image as ImageIcon } from 'lucide-react';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';
import { useInstagram } from '../../../../hooks/use-instagram';

export default function InstagramFeed() {
  const { profile, media, reels, isLoading, error } = useInstagram();

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full" />
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Stats */}
      {profile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Instagram className="h-5 w-5" />
              {profile.username}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{profile.media_count}</p>
                <p className="text-sm text-gray-500">Posts</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{profile.followers_count}</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{profile.follows_count}</p>
                <p className="text-sm text-gray-500">Following</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Media Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
        <div className="grid grid-cols-3 gap-4">
          {media.map((item) => (
            <a
              key={item.id}
              href={item.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden aspect-square rounded-lg"
            >
              <img
                src={item.media_url}
                alt={item.caption || 'Instagram post'}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                {item.media_type === 'VIDEO' ? (
                  <Video className="h-5 w-5 text-white drop-shadow-lg" />
                ) : item.media_type === 'CAROUSEL_ALBUM' ? (
                  <ImageIcon className="h-5 w-5 text-white drop-shadow-lg" />
                ) : null}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Reels Section */}
      {reels.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Reels</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {reels.map((reel) => (
              <a
                key={reel.id}
                href={reel.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group aspect-[9/16] rounded-lg overflow-hidden"
              >
                <img
                  src={reel.thumbnail_url || reel.media_url}
                  alt={reel.caption || 'Instagram reel'}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <Video className="absolute top-2 right-2 h-6 w-6 text-white drop-shadow-lg" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}