// types/real-estate.ts

export type TaskStatus = 'processing' | 'completed' | 'failed';

export interface RealEstateParameters {
  city: string;
  maxPrice: number | string;
  propertyCategory: string;
  propertyType: string;
}

export interface Property {
  title?: string;
  location?: string;
  price?: number;
  features?: string[];
  description?: string;
  // Add other property-specific fields as needed
}

export interface TaskResult {
  properties?: Property[];
  summary?: string;
  // Add other result-specific fields as needed
}

export interface RealEstateTask {
  id: string;
  task_id: string;
  status: TaskStatus;
  message: string | null;
  parameters: RealEstateParameters;
  result?: TaskResult | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface CreateTaskRequest {
  city: string;
  maxPrice: string | number;
  propertyCategory: string;
  propertyType: string;
}

export interface WebhookPayload {
  task_id: string;
  status: TaskStatus;
  result?: TaskResult;
}