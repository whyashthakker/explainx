// app/services/instagram.ts
export interface InstagramProfile {
    id: string;
    username: string;
    followers_count: number;
    follows_count: number;
    media_count: number;
  }
  
  export interface InstagramMedia {
    id: string;
    media_type: string;
    media_url: string;
    thumbnail_url?: string;
    permalink: string;
    caption?: string;
    timestamp: string;
  }
  
  export interface InstagramReel extends InstagramMedia {
    video_title?: string;
    plays?: number;
  }
  
  export class InstagramService {
    private static async fetchGraphAPI(endpoint: string, accessToken: string) {
      const response = await fetch(
        `https://graph.instagram.com/${endpoint}&access_token=${accessToken}`
      );
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Instagram API error');
      }
      
      return response.json();
    }
  
    static async getProfile(accessToken: string): Promise<InstagramProfile> {
      const fields = 'id,username,media_count,followers_count,follows_count';
      return this.fetchGraphAPI(`/me?fields=${fields}`, accessToken);
    }
  
    static async getMedia(accessToken: string, limit = 25): Promise<InstagramMedia[]> {
      const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
      const response = await this.fetchGraphAPI(
        `/me/media?fields=${fields}&limit=${limit}`,
        accessToken
      );
      return response.data;
    }
  
    static async getReels(accessToken: string, limit = 25): Promise<InstagramMedia[]> {
      const media = await this.getMedia(accessToken, limit);
      return media.filter(item => item.media_type === 'VIDEO');
    }
  }