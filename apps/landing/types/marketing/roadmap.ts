// types.ts
export type Status = 'Completed' | 'In Progress' | 'Planned';

export type Category = 
  | 'Core Platform'
  | 'AI Features'
  | 'Analytics'
  | 'Integration'
  | 'User Experience'
  | 'Mobile'
  | 'Performance';

export interface RoadmapItem {
  id: number;
  feature: string;
  status: Status;
  description: string;
  category: Category;
  votes: number;
  implementationDate?: string;
}