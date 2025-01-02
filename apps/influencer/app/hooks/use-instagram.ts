import { useState, useEffect } from 'react';
import { InstagramMedia, InstagramProfile } from '../services/instagram';

interface UseInstagramReturn {
  profile: InstagramProfile | null;
  media: InstagramMedia[];
  reels: InstagramMedia[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useInstagram(): UseInstagramReturn {
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [media, setMedia] = useState<InstagramMedia[]>([]);
  const [reels, setReels] = useState<InstagramMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [profileRes, mediaRes, reelsRes] = await Promise.all([
        fetch('/api/instagram/profile'),
        fetch('/api/instagram/media'),
        fetch('/api/instagram/reels')
      ]);

      if (!profileRes.ok || !mediaRes.ok || !reelsRes.ok) {
        throw new Error('Failed to fetch Instagram data');
      }

      const [profileData, mediaData, reelsData] = await Promise.all([
        profileRes.json(),
        mediaRes.json(),
        reelsRes.json()
      ]);

      setProfile(profileData);
      setMedia(mediaData);
      setReels(reelsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    profile,
    media,
    reels,
    isLoading,
    error,
    refetch: fetchData
  };
}