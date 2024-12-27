// app/authenticated/analytics/page.tsx
import { Metadata } from "next";
import AnalyticsDashboard from "../_components/youtube-analytics";

export const metadata: Metadata = {
  title: "Analytics Dashboard",
  description: "View your YouTube channel analytics and performance metrics",
};

export default async function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AnalyticsDashboard />
    </div>
  );
}