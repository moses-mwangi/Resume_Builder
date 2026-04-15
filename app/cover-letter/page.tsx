"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  FileText,
  Plus,
  Edit,
  Download,
  Eye,
  Trash2,
  Copy,
  Star,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  Sparkles,
  Mail,
  PenTool,
  Target,
  Zap,
} from "lucide-react";

export default function CoverLetterPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("all");

  const coverLetters = [
    {
      id: "1",
      name: "Software Engineer Cover Letter",
      template: "Professional",
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      lastModified: "2024-01-20",
      createdAt: "2024-01-15",
      status: "completed",
      views: 32,
      downloads: 8,
      isFavorite: true,
      thumbnail: "✉️",
      description: "Tailored for tech industry positions",
      tags: ["Software", "Engineering", "Tech"],
    },
    {
      id: "2",
      name: "Marketing Manager Letter",
      template: "Creative",
      jobTitle: "Marketing Director",
      company: "Creative Agency",
      lastModified: "2024-01-18",
      createdAt: "2024-01-10",
      status: "draft",
      views: 18,
      downloads: 3,
      isFavorite: false,
      thumbnail: "📝",
      description: "Creative approach for marketing roles",
      tags: ["Marketing", "Creative", "Leadership"],
    },
    {
      id: "3",
      name: "Data Scientist Cover Letter",
      template: "Modern",
      jobTitle: "Senior Data Scientist",
      company: "DataTech Inc",
      lastModified: "2024-01-22",
      createdAt: "2024-01-08",
      status: "completed",
      views: 45,
      downloads: 12,
      isFavorite: true,
      thumbnail: "📊",
      description: "Data-focused with analytical emphasis",
      tags: ["Data Science", "Analytics", "Research"],
    },
    {
      id: "4",
      name: "Product Manager Letter",
      template: "Executive",
      jobTitle: "VP of Product",
      company: "StartupHub",
      lastModified: "2024-01-19",
      createdAt: "2024-01-05",
      status: "completed",
      views: 28,
      downloads: 6,
      isFavorite: false,
      thumbnail: "💼",
      description: "Executive-level product management",
      tags: ["Product", "Strategy", "Leadership"],
    },
    {
      id: "5",
      name: "UX Designer Letter",
      template: "Creative",
      jobTitle: "Senior UX Designer",
      company: "Design Studio Pro",
      lastModified: "2024-01-21",
      createdAt: "2024-01-12",
      status: "draft",
      views: 22,
      downloads: 2,
      isFavorite: false,
      thumbnail: "🎨",
      description: "Design-focused cover letter",
      tags: ["UX Design", "Creative", "Portfolio"],
    },
  ];

  const templates = [
    {
      id: "professional",
      name: "Professional",
      description: "Traditional business format",
      preview: "💼",
      color: "from-blue-500 to-blue-600",
      isPremium: false,
    },
    {
      id: "modern",
      name: "Modern",
      description: "Contemporary and clean",
      preview: "✨",
      color: "from-purple-500 to-pink-500",
      isPremium: false,
    },
    {
      id: "creative",
      name: "Creative",
      description: "Unique and expressive",
      preview: "🎨",
      color: "from-orange-500 to-red-500",
      isPremium: true,
    },
    {
      id: "executive",
      name: "Executive",
      description: "Formal and sophisticated",
      preview: "👔",
      color: "from-gray-600 to-gray-800",
      isPremium: true,
    },
  ];

  const filteredCoverLetters = coverLetters.filter(letter => {
    const matchesSearch = letter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         letter.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         letter.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         letter.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTemplate = selectedTemplate === "all" || letter.template.toLowerCase() === selectedTemplate.toLowerCase();
    return matchesSearch && matchesTemplate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    total: coverLetters.length,
    completed: coverLetters.filter(l => l.status === "completed").length,
    drafts: coverLetters.filter(l => l.status === "draft").length,
    favorites: coverLetters.filter(l => l.isFavorite).length,
    totalViews: coverLetters.reduce((sum, l) => sum + l.views, 0),
    totalDownloads: coverLetters.reduce((sum, l) => sum + l.downloads, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-xl">CoverLetterBuilder</span>
              </Link>
              <div className="hidden md:flex gap-6">
                <Link href="/dashboard" className="text-gray-600 hover:text-teal-600 transition">
                  Dashboard
                </Link>
                <Link href="/resume" className="text-gray-600 hover:text-teal-600 transition">
                  Resumes
                </Link>
                <Link href="/cover-letter" className="text-teal-600 font-semibold">
                  Cover Letters
                </Link>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => router.push("/dashboard/coverLetter/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Create Cover Letter
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Your Cover Letter Collection
            </h1>
            <p className="text-teal-100 text-lg mb-8">
              Craft compelling cover letters that get you noticed
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <div className="text-sm text-teal-100">Total Letters</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold text-white">{stats.completed}</div>
                <div className="text-sm text-teal-100">Completed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold text-white">{stats.drafts}</div>
                <div className="text-sm text-teal-100">Drafts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold text-white">{stats.totalViews}</div>
                <div className="text-sm text-teal-100">Total Views</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold text-white">{stats.totalDownloads}</div>
                <div className="text-sm text-teal-100">Downloads</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="my-letters" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="my-letters">My Cover Letters ({stats.total})</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="my-letters" className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search cover letters..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Templates</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>

            {/* Cover Letters Grid */}
            {filteredCoverLetters.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No cover letters found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery || selectedTemplate !== "all" 
                      ? "Try adjusting your search or filters"
                      : "Create your first cover letter to get started"
                    }
                  </p>
                  <Button onClick={() => router.push("/dashboard/coverLetter/new")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Cover Letter
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoverLetters.map((letter) => (
                  <Card key={letter.id} className="hover:shadow-lg transition-shadow group">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl">
                            {letter.thumbnail}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{letter.name}</CardTitle>
                            <CardDescription>{letter.template}</CardDescription>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Star className={`h-4 w-4 ${letter.isFavorite ? "fill-current text-yellow-500" : ""}`} />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="text-sm text-gray-600">
                        <div className="font-medium">{letter.jobTitle}</div>
                        <div className="text-gray-500">{letter.company}</div>
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-2">{letter.description}</p>
                      
                      <div className="flex flex-wrap gap-1">
                        {letter.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {letter.lastModified}
                        </span>
                        <Badge className={getStatusColor(letter.status)}>
                          {letter.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{letter.views} views</span>
                        <span>{letter.downloads} downloads</span>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose a Template</h2>
              <p className="text-gray-600">Select from our collection of professional cover letter templates</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow group cursor-pointer">
                  <CardHeader className="text-center">
                    <div className={`h-20 w-full rounded-lg bg-gradient-to-r ${template.color} flex items-center justify-center text-4xl mb-3`}>
                      {template.preview}
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                    {template.isPremium && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <PenTool className="h-4 w-4" />
                        <span>Professional Writing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <span>Job-Specific Content</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        <span>AI-Powered Suggestions</span>
                      </div>
                    </div>
                    
                    <Button className="w-full" variant={template.isPremium ? "default" : "outline"}>
                      {template.isPremium ? "Upgrade to Use" : "Use Template"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
