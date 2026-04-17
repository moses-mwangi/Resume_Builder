// components/JobMatcher.tsx
import { useState } from "react";
import { JobMatchingService, JobMatchScore } from "@/lib/jobMatchingService";
import { ResumeData } from "@/types/resume";

interface JobMatcherProps {
  resumeData: ResumeData;
  onClose: () => void;
}

export default function JobMatcher({ resumeData, onClose }: JobMatcherProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [matchScore, setMatchScore] = useState<JobMatchScore | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);

    // Simulate API delay
    setTimeout(() => {
      const score = JobMatchingService.calculateMatchScore(
        resumeData,
        jobDescription,
        jobTitle || "Target Position",
      );
      setMatchScore(score);
      setIsAnalyzing(false);
    }, 1500);
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-5 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Resume-Job Matcher
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              See how well your resume matches a job and your chances with AI
              screening
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {!matchScore ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title (Optional)
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Senior Frontend Developer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm"
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!jobDescription.trim() || isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analyzing...
                  </div>
                ) : (
                  "Analyze Match Score"
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Score Overview */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-600 mb-2">
                    Overall Match Score
                  </div>
                  <div
                    className={`text-5xl font-bold ${getScoreColor(matchScore.overallScore)}`}
                  >
                    {matchScore.overallScore}%
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${getScoreBgColor(matchScore.overallScore)} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${matchScore.overallScore}%` }}
                    />
                  </div>
                </div>

                {/* AI Selection Chance */}
                <div className="bg-white rounded-lg p-4 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      🤖 AI Selection Chance
                    </span>
                    <span
                      className={`text-lg font-bold ${
                        matchScore.aiSelectionProbability === "High"
                          ? "text-green-600"
                          : matchScore.aiSelectionProbability === "Medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {matchScore.aiSelectionProbability} (
                      {matchScore.aiSelectionChance}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        matchScore.aiSelectionProbability === "High"
                          ? "bg-green-500"
                          : matchScore.aiSelectionProbability === "Medium"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${matchScore.aiSelectionChance}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {matchScore.aiSelectionProbability === "High"
                      ? "Great! Your resume has strong chances of passing ATS screening."
                      : matchScore.aiSelectionProbability === "Medium"
                        ? "Your resume needs some optimization to consistently pass AI filters."
                        : "Your resume may struggle to pass initial AI screening. Review suggestions below."}
                  </p>
                </div>
              </div>

              {/* Detailed Scores */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1">Keywords</div>
                  <div className="text-xl font-bold text-blue-600">
                    {Math.round(matchScore.keywordMatch)}%
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1">Skills</div>
                  <div className="text-xl font-bold text-purple-600">
                    {Math.round(matchScore.skillsMatch)}%
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1">Experience</div>
                  <div className="text-xl font-bold text-emerald-600">
                    {Math.round(matchScore.experienceMatch)}%
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1">Education</div>
                  <div className="text-xl font-bold text-orange-600">
                    {Math.round(matchScore.educationMatch)}%
                  </div>
                </div>
              </div>

              {/* Missing Items */}
              {(matchScore.missingKeywords.length > 0 ||
                matchScore.missingSkills.length > 0) && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">
                    ⚠️ What's Missing
                  </h3>

                  {matchScore.missingKeywords.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-yellow-700 mb-1">
                        Missing Keywords:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {matchScore.missingKeywords.map((kw: any, i: any) => (
                          <span
                            key={i}
                            className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchScore.missingSkills.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-yellow-700 mb-1">
                        Missing Skills:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {matchScore.missingSkills.map((skill: any, i: any) => (
                          <span
                            key={i}
                            className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
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
                <h3 className="font-semibold text-blue-800 mb-2">
                  💡 Improvement Suggestions
                </h3>
                <ul className="space-y-1">
                  {matchScore.suggestions.map((suggestion: any, i: any) => (
                    <li
                      key={i}
                      className="text-sm text-blue-700 flex items-start gap-2"
                    >
                      <span>•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setMatchScore(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Analyze Another Job
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
