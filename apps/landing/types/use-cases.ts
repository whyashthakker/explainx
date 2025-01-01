// types/use-case.ts
export const iconMap = {
    SearchIcon: 'SearchIcon',
    LayoutIcon: 'LayoutIcon',
    ChartIcon: 'ChartIcon',
    SettingsIcon: 'SettingsIcon',
    UsersIcon: 'UsersIcon',
    TrendingIcon: 'TrendingIcon'
  } as const;
  
  export type IconType = keyof typeof iconMap;
  
  export interface Feature {
    title: string;
    description: string;
    icon: IconType;
  }
  
  export interface Benefit {
    title: string;
    description: string;
    stats?: string;
  }
  
  export interface UseCase {
    title: string;
    subtitle: string;
    description: string;
    keywords: string[];
    heroImage: string;
    features: Feature[];
    benefits: Benefit[];
    testimonials: any[]; // Add specific type if needed
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
    ctaButtonLink: string;
  }