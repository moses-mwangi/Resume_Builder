// components/ResumeAnalyzer.tsx (new component)
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Upload,
  BarChart3,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Target,
  FileCheck,
  Zap,
} from "lucide-react";
import { ResumeData, ResumeAnalysis } from "@/types/resume";
import { Textarea } from "./ui/textarea";

interface ResumeAnalyzerProps {
  onImport: (data: Partial<ResumeData>) => void;
}

export function ResumeAnalyzer({ onImport }: ResumeAnalyzerProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [parsedData, setParsedData] = useState<Partial<ResumeData> | null>(
    null,
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  // Mock AI analysis function (in production, this would call an API)
  const analyzeResume = async (
    text: string,
    file?: File,
  ): Promise<{ analysis: ResumeAnalysis; parsedData: Partial<ResumeData> }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock parsing logic - in production, use NLP/ML or GPT API
    const mockParsedData: Partial<ResumeData> = {
      personalInfo: {
        fullName: extractName(text) || "John Doe",
        email: extractEmail(text) || "john.doe@example.com",
        phone: extractPhone(text) || "+1 (555) 123-4567",
        location: extractLocation(text) || "San Francisco, CA",
        website: "",
        linkedin: "",
        github: "",
        summary:
          extractSummary(text) ||
          "Experienced software engineer with 5+ years of experience...",
      },
      skills: extractSkills(text).map((skill) => ({
        id: Date.now().toString() + Math.random(),
        name: skill,
        category: detectCategory(skill),
        level: Math.floor(Math.random() * 3) + 3,
      })),
      experience: extractExperience(text),
      education: extractEducation(text),
      projects: extractProjects(text),
      certificates: extractCertificates(text),
      languages: extractLanguages(text),
    };

    // Calculate scores based on content quality
    const hasEmail = !!mockParsedData.personalInfo?.email;
    const hasPhone = !!mockParsedData.personalInfo?.phone;
    const hasSummary =
      !!mockParsedData.personalInfo?.summary &&
      mockParsedData.personalInfo.summary.length > 50;
    const hasSkills = mockParsedData.skills && mockParsedData.skills.length > 0;
    const hasExperience =
      mockParsedData.experience && mockParsedData.experience.length > 0;
    const hasEducation =
      mockParsedData.education && mockParsedData.education.length > 0;

    const completenessScore = (() => {
      let score = 0;
      if (hasEmail) score += 15;
      if (hasPhone) score += 10;
      if (hasSummary) score += 25;
      if (hasSkills) score += 20;
      if (hasExperience) score += 20;
      if (hasEducation) score += 10;
      return score;
    })();

    const contentScore = Math.min(100, (text.length / 500) * 100);
    const keywordScore = Math.min(
      100,
      (text.match(
        /(react|node|python|java|javascript|typescript|aws|docker|kubernetes)/gi,
      )?.length || 0) * 10,
    );
    const atsScore = Math.min(
      100,
      hasEmail && hasPhone && hasSummary && hasSkills ? 85 : 60,
    );

    const overallScore = Math.floor(
      (completenessScore + contentScore + keywordScore + atsScore) / 4,
    );

    const analysis: ResumeAnalysis = {
      overallScore,
      sections: {
        completeness: completenessScore,
        formatting: 75,
        content: contentScore,
        keywords: keywordScore,
        ats: atsScore,
      },
      feedback: {
        strengths: [],
        improvements: [],
        missing: [],
        suggestions: [],
      },
      keywordMatch: {
        present: extractSkills(text),
        missing: ["React Hooks", "TypeScript", "CI/CD", "Agile Methodology"],
        score: keywordScore,
      },
      atsCompatibility: {
        score: atsScore,
        issues: !hasSummary ? ["Missing professional summary"] : [],
        recommendations: [],
      },
    };

    // Generate feedback
    if (completenessScore < 70) {
      analysis.feedback.missing.push("Complete contact information");
      analysis.feedback.improvements.push("Add your professional summary");
    }
    if (mockParsedData.skills && mockParsedData.skills.length < 5) {
      analysis.feedback.missing.push("More technical skills");
      analysis.feedback.suggestions.push(
        "List 8-10 relevant skills for better ATS matching",
      );
    }
    if (mockParsedData.experience && mockParsedData.experience.length < 2) {
      analysis.feedback.missing.push("Detailed work experience");
      analysis.feedback.suggestions.push(
        "Add more bullet points with quantifiable achievements",
      );
    }
    if (text.length < 1000) {
      analysis.feedback.improvements.push(
        "Add more detail to your descriptions",
      );
      analysis.feedback.suggestions.push(
        "Use specific metrics and accomplishments",
      );
    }

    analysis.feedback.strengths = [
      mockParsedData.skills && mockParsedData.skills.length > 0
        ? "Good skill set identified"
        : "",
      hasEmail && hasPhone ? "Contact information complete" : "",
      mockParsedData.experience && mockParsedData.experience.length > 0
        ? "Work history present"
        : "",
    ].filter(Boolean);

    return { analysis, parsedData: mockParsedData };
  };

  // Helper extraction functions (simplified - in production use proper NLP)
  const extractName = (text: string): string | null => {
    const lines = text.split("\n");
    for (const line of lines.slice(0, 5)) {
      if (
        line.length > 2 &&
        line.length < 50 &&
        !line.includes("@") &&
        !line.includes("http")
      ) {
        return line.trim();
      }
    }
    return null;
  };

  const extractEmail = (text: string): string | null => {
    const match = text.match(
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
    );
    return match ? match[0] : null;
  };

  const extractPhone = (text: string): string | null => {
    const match = text.match(
      /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/,
    );
    return match ? match[0] : null;
  };

  const extractLocation = (text: string): string | null => {
    const match = text.match(/([A-Z][a-z]+,\s*[A-Z]{2})/);
    return match ? match[0] : null;
  };

  const extractSummary = (text: string): string | null => {
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (
        lines[i].toLowerCase().includes("summary") ||
        lines[i].toLowerCase().includes("profile")
      ) {
        if (lines[i + 1] && lines[i + 1].length > 50) {
          return lines[i + 1].trim();
        }
      }
    }
    const firstParagraph = lines.find((line) => line.length > 100);
    return firstParagraph || null;
  };

  const extractSkills = (text: string): string[] => {
    const commonSkills = [
      "React",
      "JavaScript",
      "TypeScript",
      "Python",
      "Node.js",
      "Java",
      "AWS",
      "Docker",
      "Git",
      "SQL",
      "MongoDB",
      "Express",
      "Next.js",
      "Tailwind",
      "GraphQL",
      "REST API",
      "CI/CD",
      "Agile",
      "Scrum",
    ];
    const foundSkills: string[] = [];
    for (const skill of commonSkills) {
      if (text.toLowerCase().includes(skill.toLowerCase())) {
        foundSkills.push(skill);
      }
    }
    return foundSkills;
  };

  const detectCategory = (skill: string): string => {
    const frontend = [
      "React",
      "JavaScript",
      "TypeScript",
      "Next.js",
      "Tailwind",
      "HTML",
      "CSS",
    ];
    const backend = ["Node.js", "Python", "Java", "Express", "GraphQL"];
    const devops = ["AWS", "Docker", "CI/CD", "Kubernetes"];
    const database = ["SQL", "MongoDB", "PostgreSQL"];

    if (frontend.includes(skill)) return "Frontend";
    if (backend.includes(skill)) return "Backend";
    if (devops.includes(skill)) return "DevOps";
    if (database.includes(skill)) return "Database";
    return "Technical";
  };

  const extractExperience = (text: string): any[] => {
    const experiences: any[] = [];
    const lines = text.split("\n");
    let currentExp: any = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (
        line.match(
          /^[A-Z][a-z]+.*(?:Inc|Corp|LLC|Ltd|Technologies|Solutions)/,
        ) ||
        (line.length > 5 &&
          line.length < 50 &&
          !line.includes("@") &&
          !line.includes("http"))
      ) {
        if (currentExp) experiences.push(currentExp);
        currentExp = {
          id: Date.now().toString() + i,
          company: line,
          position: "Software Engineer",
          location: "",
          startDate: "2020-01",
          endDate: "",
          current: true,
          description: [],
          achievements: [],
        };
      } else if (
        currentExp &&
        line.match(/\d{4}/) &&
        (line.includes("-") || line.includes("to"))
      ) {
        const dates = line.match(/\d{4}/g);
        if (dates) {
          currentExp.startDate = `${dates[0]}-01`;
          if (dates[1]) currentExp.endDate = `${dates[1]}-01`;
        }
      } else if (
        (currentExp && line.startsWith("•")) ||
        line.startsWith("-") ||
        line.match(/^\d+\./)
      ) {
        currentExp.description.push(line.replace(/^[•\-]\s*/, ""));
      }
    }
    if (currentExp) experiences.push(currentExp);

    return experiences.length > 0
      ? experiences
      : [
          {
            id: Date.now().toString(),
            company: "Previous Company",
            position: "Position Title",
            location: "",
            startDate: "2019-01",
            endDate: "2024-01",
            current: false,
            description: ["Responsibility 1", "Achievement 2"],
            achievements: [],
          },
        ];
  };

  const extractEducation = (text: string): any[] => {
    const education: any[] = [];
    const universities = ["University", "College", "Institute", "School"];

    for (const line of text.split("\n")) {
      for (const uni of universities) {
        if (line.includes(uni)) {
          education.push({
            id: Date.now().toString(),
            institution: line.trim(),
            degree: "Bachelor's Degree",
            field: "Computer Science",
            startDate: "2015-09",
            endDate: "2019-06",
            current: false,
            gpa: "3.5",
            description: [],
          });
          break;
        }
      }
    }

    return education.length > 0
      ? education
      : [
          {
            id: Date.now().toString(),
            institution: "University Name",
            degree: "Bachelor's Degree",
            field: "Computer Science",
            startDate: "2016-09",
            endDate: "2020-06",
            current: false,
            gpa: "",
            description: [],
          },
        ];
  };

  const extractProjects = (text: string): any[] => {
    const projects: any[] = [];
    const projectKeywords = ["project", "built", "developed", "created"];

    for (let i = 0; i < text.split("\n").length; i++) {
      const line = text.split("\n")[i];
      for (const keyword of projectKeywords) {
        if (line.toLowerCase().includes(keyword) && line.length > 20) {
          projects.push({
            id: Date.now().toString() + i,
            name: line.substring(0, 50).trim(),
            description: line,
            technologies: ["React", "Node.js"],
            link: "",
            github: "",
            startDate: "",
            endDate: "",
          });
          break;
        }
      }
    }

    return projects.slice(0, 2);
  };

  const extractCertificates = (text: string): any[] => {
    const certificates: any[] = [];
    const certKeywords = [
      "certified",
      "certification",
      "certificate",
      "aws",
      "google",
      "microsoft",
    ];

    for (const line of text.split("\n")) {
      for (const keyword of certKeywords) {
        if (line.toLowerCase().includes(keyword)) {
          certificates.push({
            id: Date.now().toString(),
            name: line.trim(),
            issuer: "Certification Body",
            date: "2023",
            link: "",
          });
          break;
        }
      }
    }

    return certificates.slice(0, 3);
  };

  const extractLanguages = (text: string): any[] => {
    const languages: any[] = [];
    const knownLanguages = [
      "English",
      "Spanish",
      "French",
      "German",
      "Chinese",
      "Japanese",
      "Arabic",
    ];

    for (const lang of knownLanguages) {
      if (text.toLowerCase().includes(lang.toLowerCase())) {
        languages.push({
          id: Date.now().toString(),
          name: lang,
          proficiency: "Professional Working",
        });
      }
    }

    return languages.length > 0
      ? languages
      : [{ id: Date.now().toString(), name: "English", proficiency: "Fluent" }];
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsAnalyzing(true);
    setActiveTab("analysis");

    try {
      const text = await file.text();
      const { analysis: resumeAnalysis, parsedData: extractedData } =
        await analyzeResume(text, file);

      setAnalysis(resumeAnalysis);
      setParsedData(extractedData);
    } catch (error) {
      console.error("Error analyzing resume:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTextAnalysis = async (text: string) => {
    setIsAnalyzing(true);
    setActiveTab("analysis");

    try {
      const { analysis: resumeAnalysis, parsedData: extractedData } =
        await analyzeResume(text);
      setAnalysis(resumeAnalysis);
      setParsedData(extractedData);
    } catch (error) {
      console.error("Error analyzing resume:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 80) return "🎉";
    if (score >= 60) return "👍";
    return "⚠️";
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Resume</TabsTrigger>
          <TabsTrigger value="analysis">Analysis Results</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card className="p-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Upload Your Resume</h3>
              <p className="text-gray-600">
                Upload a PDF or TXT file to get AI-powered analysis and
                suggestions
              </p>
              <div className="flex justify-center gap-4">
                <label>
                  <input
                    type="file"
                    accept=".txt,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button asChild>
                    <span>
                      <FileText className="w-4 h-4 mr-2" />
                      Choose File
                    </span>
                  </Button>
                </label>
              </div>
              {uploadedFile && (
                <p className="text-sm text-gray-500">
                  Selected: {uploadedFile.name}
                </p>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3">Or paste your resume text:</h3>
            <Textarea
              placeholder="Paste your resume content here..."
              className="min-h-[200px] font-mono text-sm"
              onChange={(e) => {
                if (e.target.value.length > 100) {
                  handleTextAnalysis(e.target.value);
                }
              }}
            />
            <p className="text-xs text-gray-500 mt-2">
              Minimum 100 characters for analysis
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {isAnalyzing ? (
            <Card className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Analyzing your resume...</p>
              <p className="text-sm text-gray-500">
                This may take a few moments
              </p>
            </Card>
          ) : analysis ? (
            <>
              {/* Overall Score */}
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white shadow-lg mb-4">
                    <div className="text-center">
                      <span
                        className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}
                      >
                        {analysis.overallScore}
                      </span>
                      <span className="text-sm text-gray-500">/100</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    {getScoreEmoji(analysis.overallScore)} Overall Resume Score
                  </h2>
                  <p className="text-gray-600">
                    {analysis.overallScore >= 80
                      ? "Excellent resume! Ready for job applications."
                      : analysis.overallScore >= 60
                        ? "Good foundation with room for improvement."
                        : "Needs significant improvements to be competitive."}
                  </p>
                </div>
              </Card>

              {/* Section Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Section Scores
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(analysis.sections).map(([key, score]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{key}</span>
                          <span className={getScoreColor(score)}>{score}%</span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>

                {/* ATS Compatibility */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FileCheck className="w-4 h-4" />
                    ATS Compatibility
                  </h3>
                  <div className="text-center mb-3">
                    <div
                      className={`text-2xl font-bold ${getScoreColor(analysis.atsCompatibility.score)}`}
                    >
                      {analysis.atsCompatibility.score}%
                    </div>
                    <div className="text-sm text-gray-500">ATS Score</div>
                  </div>
                  {analysis.atsCompatibility.issues.length > 0 && (
                    <div className="space-y-1">
                      {analysis.atsCompatibility.issues.map((issue, i) => (
                        <div
                          key={i}
                          className="text-sm text-red-600 flex items-center gap-2"
                        >
                          <XCircle className="w-3 h-3" />
                          {issue}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>

              {/* Keyword Analysis */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Keyword Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-green-600 mb-2">
                      ✓ Present Keywords
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordMatch.present.map((kw, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-red-600 mb-2">
                      ✗ Missing Keywords
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordMatch.missing
                        .slice(0, 5)
                        .map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs"
                          >
                            {kw}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Feedback */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  AI Suggestions
                </h3>
                <div className="space-y-4">
                  {analysis.feedback.strengths.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-green-600 mb-2">
                        Strengths:
                      </div>
                      <ul className="space-y-1">
                        {analysis.feedback.strengths.map((s, i) => (
                          <li
                            key={i}
                            className="text-sm flex items-start gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysis.feedback.improvements.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-yellow-600 mb-2">
                        Areas for Improvement:
                      </div>
                      <ul className="space-y-1">
                        {analysis.feedback.improvements.map((s, i) => (
                          <li
                            key={i}
                            className="text-sm flex items-start gap-2"
                          >
                            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysis.feedback.suggestions.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-blue-600 mb-2">
                        Recommendations:
                      </div>
                      <ul className="space-y-1">
                        {analysis.feedback.suggestions.map((s, i) => (
                          <li
                            key={i}
                            className="text-sm flex items-start gap-2"
                          >
                            <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>

              {/* Import Button */}
              {parsedData && (
                <Button
                  onClick={() => onImport(parsedData)}
                  className="w-full"
                  size="lg"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import Parsed Resume Data
                </Button>
              )}
            </>
          ) : (
            <Card className="p-12 text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Analysis Yet</h3>
              <p className="text-gray-600">
                Upload a resume file or paste text to see AI-powered analysis
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
