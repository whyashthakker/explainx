import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/ui/alert";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Progress } from "@repo/ui/components/ui/progress";
import {
  Bell,
  TrendingUp,
  Users,
  Video,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  Award,
  Globe,
  Clock,
  Target,
  DollarSign,
  Zap,
  MapPin,
  Radio,
} from "lucide-react";

const StatsCard = ({ title, value, Icon, color }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          </div>
          <Icon className={`h-8 w-8 text-${color}-500`} />
        </div>
      </CardContent>
    </Card>
  );
};

const InfluencerDashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");

  const followerData = [
    { month: "Jan", followers: 100000 },
    { month: "Feb", followers: 120000 },
    { month: "Mar", followers: 150000 },
    { month: "Apr", followers: 200000 },
    { month: "May", followers: 250000 },
    { month: "Jun", followers: 300000 },
  ];

  const engagementData = [
    { day: "Mon", likes: 15000, comments: 2000, shares: 1000 },
    { day: "Tue", likes: 18000, comments: 2400, shares: 1200 },
    { day: "Wed", likes: 22000, comments: 3000, shares: 1500 },
    { day: "Thu", likes: 17000, comments: 2200, shares: 1100 },
    { day: "Fri", likes: 20000, comments: 2800, shares: 1300 },
  ];

  const COLORS = ["#6366f1", "#ec4899", "#14b8a6", "#f97316"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/api/placeholder/100/100" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Jane Doe</h1>
              <p className="text-gray-500">Lifestyle & Travel Influencer</p>
            </div>
          </div>
          <Badge className="bg-indigo-500 hover:bg-indigo-600">
            <Sparkles className="w-4 h-4 mr-2" />
            Pro Creator
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Followers"
            value="300K"
            Icon={Users}
            color="indigo"
          />
          <StatsCard
            title="Engagement"
            value="8.5%"
            Icon={Heart}
            color="pink"
          />
          <StatsCard
            title="Total Posts"
            value="1.2K"
            Icon={Video}
            color="teal"
          />
          <StatsCard
            title="Revenue"
            value="$25.6K"
            Icon={DollarSign}
            color="orange"
          />
        </div>

        {/* Alert */}
        <Alert className="bg-indigo-50 border-indigo-200">
          <Bell className="h-4 w-4 text-indigo-500" />
          <AlertTitle className="text-indigo-700">
            New Milestone Reached!
          </AlertTitle>
          <AlertDescription className="text-indigo-600">
            You've hit 300K followers! Keep up the amazing work! 🎉
          </AlertDescription>
        </Alert>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Follower Growth</CardTitle>
                  <CardDescription>Monthly trend analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={followerData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="followers"
                          stroke="#6366f1"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Overview</CardTitle>
                  <CardDescription>Daily interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={engagementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="likes" fill="#6366f1" stackId="stack" />
                        <Bar
                          dataKey="comments"
                          fill="#ec4899"
                          stackId="stack"
                        />
                        <Bar dataKey="shares" fill="#14b8a6" stackId="stack" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InfluencerDashboard;
