// components/ResumeBuilder.tsx
"use client";

import { useState } from "react";
import { Resume, JobDescription, MatchScore } from "@/types/resumeMatcherTypes";
import { myResume } from "@/data/resumeMatcherData";
// import { ResumeMatcher } from "@/utils/resumeMatcher";
import { ResumeMatcher } from "@/lib/resumeMatcher";
import { sampleJobDescription } from "@/data/resumeMatcherData";

export default function ResumeBuilder() {
  const [resume, setResume] = useState<Resume>(myResume);
  const [jobDesc, setJobDesc] = useState<JobDescription>(sampleJobDescription);
  const [matchScore, setMatchScore] = useState<MatchScore | null>(null);
  const [activeTab, setActiveTab] = useState<"resume" | "job" | "match">(
    "resume",
  );

  const handleMatch = () => {
    const matcher = new ResumeMatcher(resume, jobDesc);
    const score = matcher.calculateMatchScore();
    setMatchScore(score);
    setActiveTab("match");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex gap-4 border-b">
        {["resume", "job", "match"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "resume" && "📄 Resume/CV"}
            {tab === "job" && "💼 Job Description"}
            {tab === "match" && "🎯 Match Score"}
          </button>
        ))}
      </div>

      {activeTab === "resume" && <ResumeViewer resume={resume} />}

      {activeTab === "job" && <JobDescriptionViewer jobDesc={jobDesc} />}

      {activeTab === "match" && matchScore && (
        <MatchScoreViewer score={matchScore} />
      )}

      <div className="flex justify-center pt-4">
        <button
          onClick={handleMatch}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          🔍 Calculate Match Score
        </button>
      </div>
    </div>
  );
}

// components/ResumeViewer.tsx
function ResumeViewer({ resume }: { resume: Resume }) {
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowCoverLetter(!showCoverLetter)}
          className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
        >
          {showCoverLetter ? "📄 Show Resume" : "✉️ Show Cover Letter"}
        </button>
        <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200">
          📥 Download PDF
        </button>
      </div>

      {!showCoverLetter ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">
          {/* Header */}
          <div className="text-center border-b pb-6">
            <h1 className="text-3xl font-bold">{resume.personal.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
              {resume.personal.title}
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500 mt-3 flex-wrap">
              <span>{resume.personal.email}</span>
              <span>{resume.personal.phone}</span>
              <span>{resume.personal.location}</span>
            </div>
            <div className="flex justify-center gap-3 text-sm mt-2">
              <a
                href={`https://${resume.personal.linkedin}`}
                className="text-blue-600"
              >
                LinkedIn
              </a>
              <a
                href={`https://${resume.personal.github}`}
                className="text-blue-600"
              >
                GitHub
              </a>
              <a
                href={`https://${resume.personal.portfolio}`}
                className="text-blue-600"
              >
                Portfolio
              </a>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {resume.personal.summary}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.technical.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                >
                  {skill.name} ({skill.level})
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Experience</h2>
            <div className="space-y-4">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex justify-between items-start flex-wrap">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.position}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {exp.company}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 bg-gray-100 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Education</h2>
            {resume.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-gray-600">
                  {edu.institution}, {edu.graduationYear}
                </p>
                {edu.gpa && (
                  <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <CoverLetter
          resume={resume}
          jobTitle="Senior Creative Developer"
          companyName="Innovation Studio"
        />
      )}
    </div>
  );
}

// components/CoverLetter.tsx
function CoverLetter({
  resume,
  jobTitle,
  companyName,
}: {
  resume: Resume;
  jobTitle: string;
  companyName: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-4 font-serif">
      <div className="text-right">
        <p>{resume.personal.name}</p>
        <p>{resume.personal.location}</p>
        <p>{resume.personal.email}</p>
        <p>{new Date().toLocaleDateString()}</p>
      </div>

      <div>
        <p>Hiring Manager</p>
        <p>{companyName}</p>
      </div>

      <div>
        <p className="font-semibold">Re: {jobTitle} Position</p>
      </div>

      <div className="space-y-4">
        <p>Dear Hiring Team,</p>

        <p>
          I am writing to express my enthusiasm for the {jobTitle} position at{" "}
          {companyName}. As a creative developer who believes technology should
          respect human attention, I've spent the last 6 years building
          interfaces that are both beautiful and thoughtful.
        </p>

        <p>
          In my current role as Lead Creative Developer at Digital Wellness Lab,
          I developed "The Quiet Interface," a browser extension that transforms
          infinite scroll into intentional pagination. This project reached
          2,500+ users and achieved a 40% reduction in self-reported
          anxiety—proving that technology can be both functional and humane.
        </p>

        <p>
          What draws me to {companyName} is your commitment to ethical design.
          My experience building non-linear storytelling engines, collaborating
          with cross-disciplinary teams, and mentoring junior developers aligns
          perfectly with your need for someone who can bridge design and
          technology while elevating those around them.
        </p>

        <p>
          I would welcome the opportunity to discuss how my background in HCI
          and creative development can contribute to your team's success. Thank
          you for your consideration.
        </p>

        <div className="pt-4">
          <p>Warmly,</p>
          <p className="font-semibold">{resume.personal.name}</p>
        </div>
      </div>
    </div>
  );
}

// components/JobDescriptionViewer.tsx
function JobDescriptionViewer({ jobDesc }: { jobDesc: JobDescription }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">{jobDesc.title}</h1>
        <p className="text-gray-600">
          {jobDesc.company} • {jobDesc.location}
        </p>
        {jobDesc.salary && (
          <p className="text-green-600 font-medium mt-1">{jobDesc.salary}</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">About the Role</h2>
        <p className="text-gray-700">{jobDesc.description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Requirements</h2>
        <ul className="list-disc list-inside space-y-1">
          {jobDesc.requirements.map((req, i) => (
            <li key={i} className="text-gray-700">
              {req}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {jobDesc.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// components/MatchScoreViewer.tsx
function MatchScoreViewer({ score }: { score: MatchScore }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">
      <div className="text-center">
        <div className="inline-block relative">
          <svg className="w-40 h-40">
            <circle
              className="text-gray-200"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="70"
              cx="80"
              cy="80"
            />
            <circle
              className={getScoreColor(score.overall)}
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 70}
              strokeDashoffset={2 * Math.PI * 70 * (1 - score.overall / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="70"
              cx="80"
              cy="80"
              transform="rotate(-90 80 80)"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div
              className={`text-4xl font-bold ${getScoreColor(score.overall)}`}
            >
              {score.overall}%
            </div>
            <div className="text-sm text-gray-500">Match</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ScoreCard label="Technical" score={score.technical} />
        <ScoreCard label="Experience" score={score.experience} />
        <ScoreCard label="Soft Skills" score={score.softSkills} />
        <ScoreCard label="Education" score={score.education} />
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">
          ✅ Matched Keywords ({score.matchedKeywords.length})
        </h3>
        <div className="flex flex-wrap gap-2">
          {score.matchedKeywords.slice(0, 15).map((keyword, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {score.missingKeywords.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">
            ⚠️ Missing Keywords ({score.missingKeywords.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {score.missingKeywords.slice(0, 10).map((keyword, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h3 className="font-semibold mb-2">💡 Recommendations</h3>
        <ul className="list-disc list-inside space-y-1">
          {score.recommendations.map((rec, i) => (
            <li key={i} className="text-sm text-gray-700 dark:text-gray-300">
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ScoreCard({ label, score }: { label: string; score: number }) {
  return (
    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="text-sm text-gray-500">{label}</div>
      <div
        className={`text-2xl font-bold ${
          score >= 80
            ? "text-green-600"
            : score >= 60
              ? "text-yellow-600"
              : "text-red-600"
        }`}
      >
        {Math.round(score)}%
      </div>
    </div>
  );
}
