// lib/api-helper.ts
import { NextResponse } from "next/server";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const createApiResponse = <T>(
  data?: T,
  error?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> => {
  const response: ApiResponse<T> = {
    success: !error,
    ...(data && { data }),
    ...(error && { error }),
  };

  return NextResponse.json(response, { status });
};

export const handleApiError = (error: unknown, defaultMessage: string = "An error occurred") => {
  console.error("API Error:", error);
  
  if (error instanceof Error) {
    return createApiResponse(undefined, error.message, 500);
  }
  
  return createApiResponse(undefined, defaultMessage, 500);
};