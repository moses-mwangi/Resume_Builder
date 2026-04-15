"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  FileText,
  Mail,
  Users,
  Calendar,
  Target,
  Activity,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download as DownloadIcon,
} from "lucide-react";

export default function AnalyticsPage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("30days");

  // Sample data for charts
  const viewsData = [
    { name: "Week 1", resumes: 45, coverLetters: 23, total: 68 },
    { name: "Week 2", resumes: 52, coverLetters: 31, total: 83 },
    { name: "Week 3", resumes: 48, coverLetters: 28, total: 76 },
    { name: "Week 4", resumes: 61, coverLetters: 35, total: 96 },
  ];

  const downloadsData = [
    { name: "Week 1", count: 12 },
    { name: "Week 2", count: 18 },
    { name: "Week 3", count: 15 },
    { name: "Week 4", count: 22 },
  ];

  const applicationStatusData = [
    { name: "Applied", value: 45, color: "#3B82F6" },
    { name: "Under Review", value: 28, color: "#F59E0B" },
    { name: "Interview", value: 15, color: "#8B5CF6" },
    { name: "Offer", value: 8, color: "#10B981" },
    { name: "Rejected", value: 4, color: "#EF4444" },
  ];

  const topPerformingResumes = [
    {
      id: "1",
      name: "Software Engineer Resume",
      views: 156,
      downloads: 42,
      conversionRate: 26.9,
      trend: "up",
      trendValue: 12.5,
    },
    {
      id: "2",
      name: "Data Scientist Resume",
      views: 134,
      downloads: 38,
      conversionRate: 28.4,
      trend: "up",
      trendValue: 8.3,
    },
    {
      id: "3",
      name: "Product Manager Resume",
      views: 98,
      downloads: 21,
      conversionRate: 21.4,
      trend: "down",
      trendValue: 3.2,
    },
  ];

  const recentActivity = [
    {
      id: "1",
      type: "view",
      document: "Software Engineer Resume",
      timestamp: "2 hours ago",
      user: "Anonymous",
      location: "San Francisco, CA",
    },
    {
      id: "2",
      type: "download",
      document: "Data Scientist Resume",
      timestamp: "5 hours ago",
      user: "Recruiter",
      location: "New York, NY",
    },
    {
      id: "3",
      type: "application",
      document: "Marketing Manager Cover Letter",
      timestamp: "1 day ago",
      company: "Creative Agency",
      location: "Remote",
    },
    {
      id: "4",
      type: "interview",
      document: "UX Designer Resume",
      timestamp: "2 days ago",
      company: "Design Studio Pro",
      location: "Austin, TX",
    },
  ];

  const stats = {
    totalViews: 1247,
    totalDownloads: 156,
    totalApplications: 89,
    interviewRate: 23.6,
    averageResponseTime: "3.2 days",
    conversionRate: 12.5,
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <ArrowUpRight className="h-4 w-4 text-green-600" />
    ) : (
      <ArrowDownRight className="h-4 w-4 text-red-600" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center">
                  <BarChart className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-xl">Analytics</span>
              </Link>
              <div className="hidden md:flex gap-6">
                <Link href="/dashboard" className="text-gray-600 hover:text-orange-600 transition">
                  Dashboard
                </Link>
                <Link href="/analytics" className="text-orange-600 font-semibold">
                  Analytics
                </Link>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Performance Analytics
            </h1>
            <p className="text-orange-100 text-lg mb-8">
              Track your job search performance and optimize your strategy
            </p>
            
            {/* Time Range Selector */}
            <div className="flex justify-center">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDownloads}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8.3%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+15.2%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interview Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.interviewRate}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">-2.1%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageResponseTime}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">-0.8 days</span> improvement
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3.4%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Views Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Views Trend</CardTitle>
                  <CardDescription>Resume and cover letter views over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={viewsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="resumes" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="coverLetters" stroke="#8B5CF6" strokeWidth={2} />
                      <Line type="monotone" dataKey="total" stroke="#F59E0B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Application Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Status</CardTitle>
                  <CardDescription>Distribution of your application statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={applicationStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {applicationStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Downloads Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Downloads</CardTitle>
                  <CardDescription>Weekly download activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={downloadsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Performing */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Documents</CardTitle>
                  <CardDescription>Your most viewed and downloaded documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topPerformingResumes.map((resume) => (
                    <div key={resume.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{resume.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>{resume.views} views</span>
                          <span>{resume.downloads} downloads</span>
                          <span className="font-medium">{resume.conversionRate}% conversion</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(resume.trend)}
                        <span className={`text-sm ${getTrendColor(resume.trend)}`}>
                          {resume.trendValue}%
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Document Performance</CardTitle>
                  <CardDescription>How your resumes and cover letters are performing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topPerformingResumes.map((resume) => (
                    <div key={resume.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{resume.name}</span>
                        <span className="text-sm text-gray-600">{resume.conversionRate}%</span>
                      </div>
                      <Progress value={resume.conversionRate} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{resume.views} views</span>
                        <span>{resume.downloads} downloads</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Rate by Industry</CardTitle>
                  <CardDescription>How different industries respond to your applications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { industry: "Technology", rate: 28.5, applications: 45 },
                    { industry: "Healthcare", rate: 22.3, applications: 23 },
                    { industry: "Finance", rate: 19.8, applications: 31 },
                    { industry: "Education", rate: 15.2, applications: 18 },
                    { industry: "Retail", rate: 12.7, applications: 12 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.industry}</span>
                        <span className="text-sm text-gray-600">{item.rate}%</span>
                      </div>
                      <Progress value={item.rate} className="h-2" />
                      <div className="text-xs text-gray-500">{item.applications} applications</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest views, downloads, and applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {activity.type === "view" && <Eye className="h-5 w-5 text-blue-600" />}
                          {activity.type === "download" && <Download className="h-5 w-5 text-green-600" />}
                          {activity.type === "application" && <FileText className="h-5 w-5 text-purple-600" />}
                          {activity.type === "interview" && <Users className="h-5 w-5 text-orange-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{activity.document}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="capitalize">{activity.type}</span>
                            <span>{activity.timestamp}</span>
                            {activity.user && <span>by {activity.user}</span>}
                            {activity.company && <span>at {activity.company}</span>}
                            <span>{activity.location}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription>Actionable recommendations based on your data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
                      title: "Strong Performance",
                      description: "Your tech industry applications have a 28.5% response rate, above average.",
                    },
                    {
                      icon: <Target className="h-5 w-5 text-blue-600" />,
                      title: "Optimization Opportunity",
                      description: "Consider updating your retail-focused resumes to improve response rates.",
                    },
                    {
                      icon: <Clock className="h-5 w-5 text-orange-600" />,
                      title: "Response Time",
                      description: "Average response time is 3.2 days. Follow up after 5 days for better results.",
                    },
                  ].map((insight, index) => (
                    <div key={index} className="flex gap-3 p-3 border rounded-lg">
                      <div className="mt-1">{insight.icon}</div>
                      <div>
                        <h4 className="font-medium">{insight.title}</h4>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>Personalized tips to improve your job search</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "Focus on technology and healthcare sectors for better response rates",
                    "Update your resume every 2 weeks to maintain relevance",
                    "Apply to 5-10 jobs per week for optimal results",
                    "Tailor each application to the specific job requirements",
                    "Follow up with employers within 3-5 days of application",
                  ].map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{recommendation}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
