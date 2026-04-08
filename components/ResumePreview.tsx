"use client";
import { Separator } from "@/components/ui/separator";
import { ResumeData, Skill } from "@/types/resume";
import {
  Brain,
  Cloud,
  Code,
  Database,
  GitBranch,
  Layout,
  Linkedin,
  Settings,
  Shield,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HeaderStyle, HeaderStyleSelector, ResumeHeader } from "./ResumeHeader";
import { Card } from "./ui/card";

// Category icons mapping
const categoryIcons: Record<string, any> = {
  "Programming Languages": Code,
  "Frontend Development": Layout,
  "Backend Development": Code,
  "Database & Storage": Database,
  "Cloud & DevOps": Cloud,
  "Mobile Development": Smartphone,
  "AI & Machine Learning": Brain,
  Security: Shield,
  "Tools & Platforms": Settings,
  "Soft Skills": Users,
  Methodologies: GitBranch,
  Design: Layout,
  Technical: Code,
  Other: Sparkles,
};

const initialData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certificates: [],
  languages: [],
};

// Templates
const templates = {
  modern: {
    name: "Modern",
    primaryColor: "#3b82f6",
    secondaryColor: "#1e293b",
    font: "Inter",
    spacing: "comfortable",
  },
  classic: {
    name: "Classic",
    primaryColor: "#1e293b",
    secondaryColor: "#475569",
    font: "Georgia",
    spacing: "compact",
  },
  creative: {
    name: "Creative",
    primaryColor: "#8b5cf6",
    secondaryColor: "#ec4899",
    font: "Poppins",
    spacing: "relaxed",
  },
};

export const ResumePreview = ({
  data,
  template,
}: {
  data: ResumeData;
  template: keyof typeof templates;
}) => {
  const style = templates[template];
  const [skillsViewMode, setSkillsViewMode] = useState<"detailed" | "compact">(
    "detailed",
  );

  const skills = data.skills;
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>("side-by-side");
  const [showStyleSelector, setShowStyleSelector] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load data from localStorage
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      setResumeData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Load data from localStorage
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      setResumeData(JSON.parse(saved));
    }

    // Load saved header preference
    const savedHeaderStyle = localStorage.getItem("resumeHeaderStyle");
    if (savedHeaderStyle) {
      setHeaderStyle(savedHeaderStyle as HeaderStyle);
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const updated = localStorage.getItem("resumeData");
      if (updated) {
        setResumeData(JSON.parse(updated));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Save header preference
  const handleHeaderStyleChange = (style: HeaderStyle) => {
    setHeaderStyle(style);
    localStorage.setItem("resumeHeaderStyle", style);
  };

  const exportToJSON = () => {
    if (!resumeData) return;
    const dataStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume-${resumeData.personalInfo.fullName || "data"}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Group skills by category
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      const category = skill.category || "Technical";
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  // Calculate skill level distribution
  const getLevelColor = (level: number) => {
    if (level >= 4) return "bg-green-500";
    if (level >= 3) return "bg-blue-500";
    if (level >= 2) return "bg-yellow-500";
    return "bg-gray-500";
  };

  const getLevelText = (level: number) => {
    const levels = ["Learning", "Basic", "Proficient", "Advanced", "Expert"];
    return levels[level - 1] || "Intermediate";
  };

  // Get top skills (highest level)
  const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 3);

  return (
    <div
      className="bg-white rounded-lg shadow-xl overflow-hidden"
      style={{ fontFamily: style.font }}
    >
      <div className="p-8">
        {/* Header */}

        {/* {showStyleSelector && ( */}
        {/* <Card className="p-4">
          <HeaderStyleSelector
            selectedStyle={headerStyle}
            onStyleChange={handleHeaderStyleChange}
          />
        </Card> */}
        {/* )} */}

        <ResumeHeader
          data={data.personalInfo}
          style={headerStyle}
          // primaryColor="#3b82f6"
          primaryColor={style.primaryColor}
        />

        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-6">
            <h2
              className="text-lg font-semibold  pb-2"
              style={{ borderColor: style.secondaryColor }}
            >
              Professional Summary
            </h2>
            <Separator className="mb-4" />
            {/* <p className="text-gray-700 text-sm leading-relaxed">
              {data.personalInfo.summary}
            </p> */}
            <div
              className="text-gray-700 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:ml-5 [&_li]:mb-1"
              // className="text-gray-700 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: data.personalInfo.summary,
              }}
            />
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2
              className="text-lg font-semibold pb-2"
              style={{ borderColor: style.secondaryColor }}
            >
              Work Experience
            </h2>
            <Separator className="mb-4" />
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className="font-semibold"
                      style={{ color: style.primaryColor }}
                    >
                      {exp.position}
                    </h3>
                    <p className="font-medium text-gray-700">
                      {exp.company} -
                      {exp.location && (
                        <span className="text-sm pl-1 text-gray-500 mb-2">
                          {exp.location} (remote)
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </div>
                </div>

                <ul className="list-disc list-inside space-y-1 mt-2">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="text-sm text-gray-600">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2
              className="text-lg font-semibold mb-3 pb-1 border-b"
              style={{ borderColor: style.secondaryColor }}
            >
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className="font-semibold"
                      style={{ color: style.primaryColor }}
                    >
                      {edu.institution}
                    </h3>
                    <p className="text-gray-700">
                      {edu.degree} in {edu.field}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </div>
                </div>
                {edu.gpa && (
                  <p className="text-sm text-gray-500 mt-1">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6 page-break">
            <h2
              // className="text-lg font-semibold mb-3 pb-3 border-b border-gray-200"
              className="text-lg font-semibold pb-2 "
              style={{ borderColor: style.secondaryColor }}
            >
              Technical Skills
            </h2>
            <Separator className="mb-4" />
            <div className="grid grid-cols-3 gap-x-14">
              {Object.entries(groupedSkills).map(
                ([category, categorySkills]) => {
                  return (
                    <div key={category}>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-1.5 bg-blue-100 rounded-lg">
                            {/* <Icon className="w-4 h-4 text-blue-600" /> */}
                            <Code className="w-4 h-4 text-blue-600" />
                          </div>
                          <h3
                            className="font-medium "
                            style={{ color: style.primaryColor }}
                          >
                            {category}
                          </h3>
                          <span className="text-xs text-gray-400">
                            ({categorySkills.length})
                          </span>
                        </div>

                        <div className="grid grid-cols-2 items-center gap-y-2">
                          {skills.map((skill) => (
                            <div key={skill.id}>
                              <div className="flex justify-between text-[15px]">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-700">
                                    {skill.name}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    ({getLevelText(skill.level)})
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-6">
            <h2
              className="text-lg font-semibold pb-2"
              style={{ borderColor: style.secondaryColor }}
            >
              Projects
            </h2>
            <Separator className="mb-4" />
            {data.projects.map((project) => (
              <div key={project.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3
                    className="font-semibold"
                    style={{ color: style.primaryColor }}
                  >
                    {project.name}
                  </h3>
                  <div className="text-sm text-gray-500">
                    {project.startDate} - {project.endDate}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: `${style.primaryColor}20`,
                        color: style.primaryColor,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-2 text-sm">
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-blue-600 hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      className="text-blue-600 hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certificates */}
        {data.certificates.length > 0 && (
          <div className="mb-6">
            <h2
              className="text-lg font-semibold mb-3 pb-1 border-b"
              style={{ borderColor: style.secondaryColor }}
            >
              Certifications
            </h2>
            <div className="space-y-2">
              {data.certificates.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2
              className="text-lg font-semibold mb-3 pb-1 border-b"
              style={{ borderColor: style.secondaryColor }}
            >
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {data.languages.map((lang) => (
                <div key={lang.id}>
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-gray-500 text-sm ml-2">
                    ({lang.proficiency})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
