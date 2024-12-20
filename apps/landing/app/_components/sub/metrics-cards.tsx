import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Heart, BarChart3, Instagram, Youtube, Twitter, TwitchIcon } from 'lucide-react';

interface MetricsCardProps {
  platform: 'Instagram' | 'YouTube' | 'Twitter' | 'Twitch' | 'TikTok';
  metrics: {
    engagement: string;
    roi: string;
    followers: string;
    growth: string;
  };
  className?: string;
}

const platformColors = {
  Instagram: 'from-pink-500 to-purple-500',
  YouTube: 'from-red-500 to-red-600',
  Twitter: 'from-blue-400 to-blue-500',
  Twitch: 'from-purple-500 to-purple-600',
  TikTok: 'from-black to-gray-900'
};

const platformIcons = {
  Instagram: Instagram,
  YouTube: Youtube,
  Twitter: Twitter,
  Twitch: TwitchIcon,
  TikTok: TwitchIcon // Replace with actual TikTok icon if available
};

export const MetricsCard = ({ platform, metrics, className }: MetricsCardProps) => {
  const PlatformIcon = platformIcons[platform];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white rounded-xl overflow-hidden shadow-lg"
    >
      {/* Platform Header */}
      <div className={`bg-gradient-to-r ${platformColors[platform]} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <PlatformIcon className="h-6 w-6 text-white" />
            <h3 className="text-lg font-semibold text-white">{platform}</h3>
          </div>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
            Verified
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="space-y-1">
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">Engagement</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{metrics.engagement}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-1" />
            <span className="text-sm">ROI</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{metrics.roi}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center text-gray-600">
            <Heart className="w-4 h-4 mr-1" />
            <span className="text-sm">Followers</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{metrics.followers}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center text-gray-600">
            <BarChart3 className="w-4 h-4 mr-1" />
            <span className="text-sm">Growth</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{metrics.growth}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Example usage component
export const MetricsDisplay = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <MetricsCard
        platform="Instagram"
        metrics={{
          engagement: "4.8%",
          roi: "3.2x",
          followers: "15.2K",
          growth: "+22%"
        }}
      />
      <MetricsCard
        platform="YouTube"
        metrics={{
          engagement: "6.2%",
          roi: "4.1x",
          followers: "25.3K",
          growth: "+18%"
        }}
      />
      <MetricsCard
        platform="Twitter"
        metrics={{
          engagement: "3.2%",
          roi: "2.5x",
          followers: "8.7K",
          growth: "+15%"
        }}
      />
    </div>
  );
};