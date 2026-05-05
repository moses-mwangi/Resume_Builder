"use client";

import { auth } from "@/lib/auth";
import { JobMatchingService, JobMatchScore } from "@/lib/jobMatchingService";
import { ResumeData } from "@/types/resume";
import {
  AlertCircle,
  ArrowLeft,
  Award,
  CheckCircle,
  ChevronRight,
  Clock,
  Copy,
  Download,
  FileText,
  Shield,
  Sparkles,
  Target,
  Upload,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Helper to get user-specific storage key
const getUserStorageKey = (userId: string, type: "resume" | "cover") => {
  return `user_${userId}_${type}_data`;
};

export default function JobMatcherPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [selectedResume, setSelectedResume] = useState<ResumeData | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [matchScore, setMatchScore] = useState<JobMatchScore | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<"existing" | "upload">("existing");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedResumeData, setUploadedResumeData] = useState<any>(null);
  const [savedMatches, setSavedMatches] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Check authentication and load user data
  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) {
      router.push("/auth/login");
    } else {
      setUser(currentUser);
      loadUserResumes(currentUser.id);
      loadSavedMatches(currentUser.id);
    }
  }, [router]);

  const loadUserResumes = (userId: string) => {
    const resumeKey = getUserStorageKey(userId, "resume");
    const localResumeData = localStorage.getItem(resumeKey);

    if (localResumeData) {
      try {
        const parsed = JSON.parse(localResumeData);
        if (Array.isArray(parsed)) {
          setResumes(parsed);
        }
      } catch (e) {
        console.error("Error loading resumes");
      }
    }
  };

  const loadSavedMatches = (userId: string) => {
    const savedKey = `user_${userId}_job_matches`;
    const saved = localStorage.getItem(savedKey);
    if (saved) {
      try {
        setSavedMatches(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading saved matches");
      }
    }
  };

  const saveMatch = (
    score: JobMatchScore,
    resume: ResumeData,
    title: string,
    company: string,
  ) => {
    const savedKey = `user_${user?.id}_job_matches`;
    const newMatch = {
      id: Date.now(),
      date: new Date().toISOString(),
      resumeId: resume.id,
      resumeTitle: resume.title,
      jobTitle: title,
      companyName: company,
      score: score.overallScore,
      aiChance: score.aiSelectionChance,
      fullData: score,
    };

    const updated = [newMatch, ...savedMatches.slice(0, 19)];
    localStorage.setItem(savedKey, JSON.stringify(updated));
    setSavedMatches(updated);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);

    // Parse PDF/DOCX and extract text
    // For demo, we'll create a mock resume data structure
    // In production, use a library like 'pdf-parse' or 'mammoth'
    const mockResumeData = {
      id: "uploaded-" + Date.now(),
      title: file.name,
      role: "Uploaded Resume",
      date: Date.now(),
      personalInfo: {
        fullName: "Applicant",
        email: "",
        phone: "",
        location: "",
      },
      skills: [{
        id: "1",
        name: "Loading skills from file...",
        category: "General",
        level: 3,
      }],
      experience: [],
      education: [],
      projects: [],
      certificates: [],
      languages: [],
    };

    setUploadedResumeData(mockResumeData);
    setSelectedResume(mockResumeData);
  };

  const handleAnalyze = () => {
    if (!selectedResume || !jobDescription.trim()) return;

    setIsAnalyzing(true);

    // Simulate API call with delay
    setTimeout(() => {
      const score = JobMatchingService.calculateMatchScore(
        selectedResume,
        jobDescription,
        jobTitle || "Target Position",
      );
      setMatchScore(score);
      setIsAnalyzing(false);

      // Auto-save if user is logged in
      if (user && selectedResume.id) {
        saveMatch(score, selectedResume, jobTitle, companyName);
      }
    }, 2000);
  };

  const handleReset = () => {
    setMatchScore(null);
    setJobDescription("");
    setJobTitle("");
    setCompanyName("");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return { letter: "A+", text: "Excellent Match!" };
    if (score >= 80) return { letter: "A", text: "Very Strong Match" };
    if (score >= 70) return { letter: "B", text: "Good Match" };
    if (score >= 60) return { letter: "C", text: "Fair Match" };
    if (score >= 50) return { letter: "D", text: "Needs Work" };
    return { letter: "F", text: "Poor Match" };
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Resume-Job Matcher
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Analyze how well your resume matches any job description
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                History
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">Resumes Analyzed</p>
                <p className="text-2xl font-bold text-gray-800">
                  {savedMatches.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">Avg Match Score</p>
                <p className="text-2xl font-bold text-gray-800">
                  {savedMatches.length > 0
                    ? Math.round(
                        savedMatches.reduce((a, b) => a + b.score, 0) /
                          savedMatches.length,
                      )
                    : 0}
                  %
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">Best Score</p>
                <p className="text-2xl font-bold text-gray-800">
                  {savedMatches.length > 0
                    ? Math.max(...savedMatches.map((m) => m.score))
                    : 0}
                  %
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 shadow-sm text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-xs">ATS Pass Rate</p>
                <p className="text-2xl font-bold">
                  {savedMatches.length > 0
                    ? Math.round(
                        (savedMatches.filter((m) => m.aiChance >= 70).length /
                          savedMatches.length) *
                          100,
                      )
                    : 0}
                  %
                </p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Input Section */}
          <div className="space-y-6">
            {/* Resume Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("existing")}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === "existing"
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FileText className="h-4 w-4 inline mr-2" />
                    Use Existing Resume
                  </button>
                  <button
                    onClick={() => setActiveTab("upload")}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === "upload"
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Upload className="h-4 w-4 inline mr-2" />
                    Upload New Resume
                  </button>
                </div>
              </div>

              <div className="p-5">
                {activeTab === "existing" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Resume
                    </label>
                    {resumes.length === 0 ? (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">
                          No resumes found
                        </p>
                        <Link
                          href="/dashboard"
                          className="text-sm text-blue-600 hover:text-blue-700 mt-2 inline-block"
                        >
                          Create a resume first →
                        </Link>
                      </div>
                    ) : (
                      <div className="grid gap-3">
                        {resumes.map((resume) => (
                          <button
                            key={resume.id}
                            onClick={() => setSelectedResume(resume)}
                            className={`p-3 rounded-lg border text-left transition-all ${
                              selectedResume?.id === resume.id
                                ? "border-blue-500 bg-blue-50 shadow-sm"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {resume.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {resume.role || "No role specified"}
                                </p>
                              </div>
                              {selectedResume?.id === resume.id && (
                                <CheckCircle className="h-5 w-5 text-blue-600" />
                              )}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                              Updated:{" "}
                              {new Date(resume.date).toLocaleDateString()}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "upload" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Resume (PDF, DOCX, or TXT)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.docx,.txt"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="cursor-pointer block"
                      >
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 mb-1">
                          {uploadedFile
                            ? uploadedFile.name
                            : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-gray-400">
                          PDF, DOCX, or TXT (Max 5MB)
                        </p>
                      </label>
                    </div>
                    {uploadedResumeData && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-700">
                            Resume uploaded successfully!
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Job Description Input */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Details
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Job Title (e.g., Senior Frontend Developer)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-3"
              />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company Name (Optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-3"
              />
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here..."
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm"
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleAnalyze}
                  disabled={
                    !selectedResume || !jobDescription.trim() || isAnalyzing
                  }
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Analyze Match
                    </>
                  )}
                </button>
                {matchScore && (
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    New Analysis
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Results Section */}
          <div className="space-y-6">
            {!matchScore && !isAnalyzing && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Ready to analyze your resume?
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Select a resume, paste a job description, and see how well you
                  match. Get AI-powered suggestions to improve your chances.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">95%</div>
                    <div className="text-xs text-gray-500">
                      of recruiters use ATS
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      75%
                    </div>
                    <div className="text-xs text-gray-500">
                      resumes rejected by AI
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">3x</div>
                    <div className="text-xs text-gray-500">
                      higher interview rate
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Analyzing Your Resume
                </h3>
                <p className="text-sm text-gray-500">
                  Comparing skills, keywords, and experience against the job
                  description...
                </p>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full animate-pulse"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
            )}

            {matchScore && !isAnalyzing && (
              <div className="space-y-6">
                {/* Score Overview */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/80 text-sm">
                        Overall Match Score
                      </p>
                      <div className="text-5xl font-bold mt-1">
                        {matchScore.overallScore}%
                      </div>
                      <div className="text-sm mt-1">
                        {getScoreGrade(matchScore.overallScore).text}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white/80">Grade</div>
                      <div className="text-6xl font-bold">
                        {getScoreGrade(matchScore.overallScore).letter}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                    <div
                      className="bg-white h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${matchScore.overallScore}%` }}
                    />
                  </div>

                  {/* AI Selection Chance */}
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        <span className="font-medium">AI Selection Chance</span>
                      </div>
                      <span
                        className={`text-2xl font-bold ${
                          matchScore.aiSelectionProbability === "High"
                            ? "text-green-300"
                            : matchScore.aiSelectionProbability === "Medium"
                              ? "text-yellow-300"
                              : "text-red-300"
                        }`}
                      >
                        {matchScore.aiSelectionProbability}
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          matchScore.aiSelectionProbability === "High"
                            ? "bg-green-400"
                            : matchScore.aiSelectionProbability === "Medium"
                              ? "bg-yellow-400"
                              : "bg-red-400"
                        }`}
                        style={{ width: `${matchScore.aiSelectionChance}%` }}
                      />
                    </div>
                    <p className="text-xs text-white/70 mt-2">
                      {matchScore.aiSelectionProbability === "High"
                        ? "✓ Your resume has strong chances of passing ATS screening"
                        : matchScore.aiSelectionProbability === "Medium"
                          ? "⚠️ Your resume needs optimization to consistently pass AI filters"
                          : "✗ Your resume may struggle to pass initial AI screening"}
                    </p>
                  </div>
                </div>

                {/* Detailed Scores */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">Keywords</span>
                      <span className="text-sm font-semibold text-blue-600">
                        {Math.round(matchScore.keywordMatch)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${matchScore.keywordMatch}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">Skills</span>
                      <span className="text-sm font-semibold text-purple-600">
                        {Math.round(matchScore.skillsMatch)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-purple-600 h-1.5 rounded-full"
                        style={{ width: `${matchScore.skillsMatch}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">Experience</span>
                      <span className="text-sm font-semibold text-green-600">
                        {Math.round(matchScore.experienceMatch)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-green-600 h-1.5 rounded-full"
                        style={{ width: `${matchScore.experienceMatch}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">Education</span>
                      <span className="text-sm font-semibold text-orange-600">
                        {Math.round(matchScore.educationMatch)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-orange-600 h-1.5 rounded-full"
                        style={{ width: `${matchScore.educationMatch}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Missing Items */}
                {(matchScore.missingKeywords.length > 0 ||
                  matchScore.missingSkills.length > 0) && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-yellow-800">
                          What's Missing
                        </h3>
                        <p className="text-xs text-yellow-700">
                          Add these to improve your match score
                        </p>
                      </div>
                    </div>

                    {matchScore.missingKeywords.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-yellow-700 mb-2">
                          Missing Keywords:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {matchScore.missingKeywords.map((kw, i) => (
                            <span
                              key={i}
                              className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {matchScore.missingSkills.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-yellow-700 mb-2">
                          Missing Skills:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {matchScore.missingSkills.map((skill, i) => (
                            <span
                              key={i}
                              className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Suggestions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-800">
                        AI-Powered Suggestions
                      </h3>
                      <p className="text-xs text-blue-700">
                        Actionable tips to improve your resume
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {matchScore.suggestions.map((suggestion, i) => (
                      <li
                        key={i}
                        className="text-sm text-blue-700 flex items-start gap-2"
                      >
                        <ChevronRight className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      // Copy results to clipboard
                      const results = `Match Score: ${matchScore.overallScore}%\nAI Selection Chance: ${matchScore.aiSelectionProbability} (${matchScore.aiSelectionChance}%)\nMissing Keywords: ${matchScore.missingKeywords.join(", ")}\nSuggestions: ${matchScore.suggestions.join("; ")}`;
                      navigator.clipboard.writeText(results);
                      alert("Results copied to clipboard!");
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Results
                  </button>
                  <button
                    onClick={() => {
                      // Download report
                      const report = {
                        date: new Date().toISOString(),
                        resume: selectedResume?.title,
                        jobTitle,
                        companyName,
                        matchScore,
                      };
                      const blob = new Blob([JSON.stringify(report, null, 2)], {
                        type: "application/json",
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `match-report-${Date.now()}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* History Sidebar */}
        {showHistory && (
          <div className="fixed inset-y-0 mt-20 right-0 w-96 bg-white shadow-xl z-20 transform transition-transform">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Match History
              </h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3 overflow-y-auto h-full pb-20">
              {savedMatches.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No matches yet</p>
                  <p className="text-xs text-gray-400">
                    Analyze a job to see history
                  </p>
                </div>
              ) : (
                savedMatches.map((match) => (
                  <div
                    key={match.id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-sm text-gray-800">
                          {match.jobTitle || "Untitled Job"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {match.resumeTitle}
                        </p>
                      </div>
                      <div
                        className={`text-sm font-bold ${
                          match.score >= 80
                            ? "text-green-600"
                            : match.score >= 60
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {match.score}%
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">
                      {new Date(match.date).toLocaleDateString()}
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full ${
                          match.score >= 80
                            ? "bg-green-500"
                            : match.score >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${match.score}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
