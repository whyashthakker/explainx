// app/(marketing)/_components/review-skeleton.tsx
import { Card } from "@repo/ui/components/ui/card";

export function ReviewSkeleton() {
  return (
    <div className="w-full space-y-6 py-8">
      <div className="w-48 h-8 bg-gray-200 rounded-lg animate-pulse mb-8 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
              <div className="space-y-2">
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}