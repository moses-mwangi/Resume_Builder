"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Send,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Building,
  MapPin,
  ExternalLink,
  Download,
  MoreHorizontal,
} from "lucide-react";

export default function ApplicationsPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("all");

  const applications = [
    {
      id: "1",
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      status: "under-review",
      appliedDate: "2024-01-15",
      lastUpdate: "2024-01-18",
      resume: "Frontend_Developer_Resume.pdf",
      coverLetter: true,
      stage: "Technical Interview",
      progress: 60,
      nextStep: "Technical assessment",
      logo: "🏢",
    },
    {
      id: "2",
      jobTitle: "Full Stack Engineer", 
      company: "StartupHub",
      location: "Remote",
      status: "interview-scheduled",
      appliedDate: "2024-01-12",
      lastUpdate: "2024-01-20",
      resume: "Full_Stack_Resume.pdf",
      coverLetter: true,
      stage: "HR Interview",
      progress: 75,
      nextStep: "Interview on Jan 25, 2:00 PM",
      logo: "🚀",
    },
    {
      id: "3",
      jobTitle: "UI/UX Designer",
      company: "Design Studio Pro",
      location: "New York, NY",
      status: "rejected",
      appliedDate: "2024-01-08",
      lastUpdate: "2024-01-16",
      resume: "UX_Designer_Resume.pdf",
      coverLetter: true,
      stage: "Application Review",
      progress: 25,
      nextStep: "Position filled",
      logo: "🎨",
    },
    {
      id: "4",
      jobTitle: "Product Manager",
      company: "Innovation Labs",
      location: "Austin, TX",
      status: "offered",
      appliedDate: "2024-01-05",
      lastUpdate: "2024-01-22",
      resume: "Product_Manager_Resume.pdf",
      coverLetter: true,
      stage: "Offer Extended",
      progress: 95,
      nextStep: "Offer expires in 3 days",
      logo: "💡",
    },
    {
      id: "5",
      jobTitle: "Backend Developer",
      company: "CloudTech Inc",
      location: "Seattle, WA",
      status: "applied",
      appliedDate: "2024-01-20",
      lastUpdate: "2024-01-20",
      resume: "Backend_Developer_Resume.pdf",
      coverLetter: false,
      stage: "Application Submitted",
      progress: 10,
      nextStep: "Awaiting review",
      logo: "☁️",
    },
    {
      id: "6",
      jobTitle: "Marketing Manager",
      company: "Growth Agency",
      location: "Los Angeles, CA",
      status: "withdrawn",
      appliedDate: "2024-01-03",
      lastUpdate: "2024-01-10",
      resume: "Marketing_Resume.pdf",
      coverLetter: true,
      stage: "Application Withdrawn",
      progress: 15,
      nextStep: "Withdrawn by applicant",
      logo: "📈",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800";
      case "under-review":
        return "bg-yellow-100 text-yellow-800";
      case "interview-scheduled":
        return "bg-purple-100 text-purple-800";
      case "offered":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "withdrawn":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <Send className="h-4 w-4" />;
      case "under-review":
        return <Eye className="h-4 w-4" />;
      case "interview-scheduled":
        return <Calendar className="h-4 w-4" />;
      case "offered":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "withdrawn":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "applied":
        return "Applied";
      case "under-review":
        return "Under Review";
      case "interview-scheduled":
        return "Interview Scheduled";
      case "offered":
        return "Offer Received";
      case "rejected":
        return "Rejected";
      case "withdrawn":
        return "Withdrawn";
      default:
        return status;
    }
  };

  const filteredApplications = applications.filter(app => {
    if (selectedTab === "all") return true;
    return app.status === selectedTab;
  });

  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === "applied").length,
    underReview: applications.filter(a => a.status === "under-review").length,
    interviews: applications.filter(a => a.status === "interview-scheduled").length,
    offers: applications.filter(a => a.status === "offered").length,
    rejected: applications.filter(a => a.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-xl">ApplicationTracker</span>
              </Link>
              <div className="hidden md:flex gap-6">
                <Link href="/dashboard" className="text-gray-600 hover:text-green-600 transition">
                  Dashboard
                </Link>
                <Link href="/jobs" className="text-gray-600 hover:text-green-600 transition">
                  Jobs
                </Link>
                <Link href="/applications" className="text-green-600 font-semibold">
                  Applications
                </Link>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/jobs">
                <Button>Find More Jobs</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Stats Overview */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Applications</h1>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600">{stats.applied}</div>
                <div className="text-sm text-gray-600">Applied</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-yellow-600">{stats.underReview}</div>
                <div className="text-sm text-gray-600">Under Review</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-purple-600">{stats.interviews}</div>
                <div className="text-sm text-gray-600">Interviews</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">{stats.offers}</div>
                <div className="text-sm text-gray-600">Offers</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                <div className="text-sm text-gray-600">Rejected</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
            <TabsTrigger value="applied">Applied ({stats.applied})</TabsTrigger>
            <TabsTrigger value="under-review">Review ({stats.underReview})</TabsTrigger>
            <TabsTrigger value="interview-scheduled">Interviews ({stats.interviews})</TabsTrigger>
            <TabsTrigger value="offered">Offers ({stats.offers})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-4">
            {filteredApplications.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
                  <p className="text-gray-600 mb-4">
                    {selectedTab === "all" 
                      ? "Start applying to jobs to track your applications here"
                      : `No applications with status: ${getStatusText(selectedTab)}`
                    }
                  </p>
                  <Link href="/jobs">
                    <Button>Browse Jobs</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredApplications.map((application) => (
                <Card key={application.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                          {application.logo}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 cursor-pointer">
                                {application.jobTitle}
                              </h3>
                              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                <span className="font-medium">{application.company}</span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {application.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  Applied {application.appliedDate}
                                </span>
                              </div>
                              
                              <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-700">Progress</span>
                                  <span className="text-sm text-gray-600">{application.progress}%</span>
                                </div>
                                <Progress value={application.progress} className="h-2" />
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-600">Stage: {application.stage}</span>
                                  <span className="font-medium text-gray-900">{application.nextStep}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <FileText className="h-4 w-4" />
                                  <span>{application.resume}</span>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-3 w-3" />
                                  </Button>
                                </div>
                                {application.coverLetter && (
                                  <Badge variant="outline" className="text-xs">
                                    Cover Letter Included
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-3 ml-4">
                        <Badge className={`${getStatusColor(application.status)} flex items-center gap-1`}>
                          {getStatusIcon(application.status)}
                          {getStatusText(application.status)}
                        </Badge>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
