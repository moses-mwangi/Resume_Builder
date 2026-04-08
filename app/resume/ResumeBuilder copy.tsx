"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Certificate,
  Education,
  Experience,
  Language,
  PersonalInfo,
  Project,
  ResumeData,
  Skill,
} from "@/types/resume";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  AlertCircle,
  Award,
  Brain,
  Briefcase,
  CheckCircle,
  Cloud,
  Code,
  Database,
  Download,
  Edit,
  Eye,
  FileText,
  GitBranch,
  GraduationCap,
  Languages,
  Layout,
  Linkedin,
  Printer,
  Redo,
  Settings,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Undo,
  Upload,
  User,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ResumeAnalyzer } from "./ResumeAnalyzer";
import { HeaderStyle, HeaderStyleSelector, ResumeHeader } from "./ResumeHeader";
import { SkillsForm as SkillsForms } from "./SkillsForm";
import { CertificatesForm } from "../../components/forms/CertificatesForm";
import { EducationForm } from "../../components/forms/EducationForm";
import { ExperienceForm } from "../../components/forms/ExperienceForm";
import { LanguagesForm } from "../../components/forms/LanguagesForm";
import { PersonalInfoForm } from "../../components/forms/PersonalInfoForm";
import { ProjectsForm } from "../../components/forms/ProjectsForm";
import { SkillsForm } from "../../components/forms/SkillsForm";
import { Card } from "../../components/ui/card";
import { useReactToPrint } from "react-to-print";

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

const ResumePreview = ({
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
        <div
          className="text-center border-b-2 pb-6 mb-6"
          style={{ borderColor: style.primaryColor }}
        >
          <h1
            className="text-3xl font-bold"
            style={{ color: style.primaryColor }}
          >
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-gray-600">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && (
              <span>{data.personalInfo.location}</span>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs">
            {data.personalInfo.website && (
              <a
                href={data.personalInfo.website}
                className="text-blue-600 hover:underline"
              >
                {/* {data.personalInfo.website} */}
                Portfolio
              </a>
            )}
            {data.personalInfo.linkedin && (
              <a
                href={data.personalInfo.linkedin}
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <Linkedin className="w-4 h-4 inline-block mr-1 text-gray-400" />
                LinkedIn
              </a>
            )}
            {data.personalInfo.github && (
              <a
                href={data.personalInfo.github}
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* {showStyleSelector && ( */}
        <Card className="p-4">
          <HeaderStyleSelector
            selectedStyle={headerStyle}
            onStyleChange={handleHeaderStyleChange}
          />
        </Card>
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
            <p className="text-gray-700 text-sm leading-relaxed">
              {data.personalInfo.summary}
            </p>
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
          <div className="mb-6">
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

// Main Component
export function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [builderMode, setBuilderMode] = useState<"manual" | "analyzer">(
    "manual",
  );

  const [activeSection, setActiveSection] = useState<string>("personal");
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [selectedTemplate, setSelectedTemplate] =
    useState<keyof typeof templates>("modern");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">(
    "saved",
  );
  const [history, setHistory] = useState<ResumeData[]>([initialData]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>("side-by-side");
  const [showStyleSelector, setShowStyleSelector] = useState(false);

  // Load/Save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setResumeData(parsed);
      setHistory([parsed]);
      setHistoryIndex(0);
    }
  }, []);

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
      setSaveStatus("saved");
    }, 500);

    setSaveStatus("saving");
    return () => clearTimeout(saveTimeout);
  }, [resumeData]);

  // History management
  const updateWithHistory = useCallback(
    (newData: ResumeData) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newData);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setResumeData(newData);
    },
    [history, historyIndex],
  );

  const handleImportFromAnalyzer = (importedData: Partial<ResumeData>) => {
    const mergedData: ResumeData = {
      personalInfo: {
        ...resumeData.personalInfo,
        ...importedData.personalInfo,
      },
      experience: [
        ...resumeData.experience,
        ...(importedData.experience || []),
      ],
      education: [...resumeData.education, ...(importedData.education || [])],
      skills: [...resumeData.skills, ...(importedData.skills || [])],
      projects: [...resumeData.projects, ...(importedData.projects || [])],
      certificates: [
        ...resumeData.certificates,
        ...(importedData.certificates || []),
      ],
      languages: [...resumeData.languages, ...(importedData.languages || [])],
    };

    updateWithHistory(mergedData);
    setBuilderMode("manual");
    setActiveSection("personal");
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setResumeData(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setResumeData(history[historyIndex + 1]);
    }
  };

  // Validation
  const validatePersonalInfo = () => {
    const newErrors: Record<string, string> = {};
    if (!resumeData.personalInfo.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (
      resumeData.personalInfo.email &&
      !/\S+@\S+\.\S+/.test(resumeData.personalInfo.email)
    ) {
      newErrors.email = "Invalid email format";
    }
    if (
      resumeData.personalInfo.phone &&
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
        resumeData.personalInfo.phone,
      )
    ) {
      newErrors.phone = "Invalid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // CRUD Operations
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    updateWithHistory({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value },
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: [],
      achievements: [],
    };
    updateWithHistory({
      ...resumeData,
      experience: [...resumeData.experience, newExp],
    });
  };

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: any,
  ) => {
    updateWithHistory({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    });
  };

  const deleteExperience = (id: string) => {
    updateWithHistory({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
      description: [],
    };
    updateWithHistory({
      ...resumeData,
      education: [...resumeData.education, newEdu],
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    updateWithHistory({
      ...resumeData,
      education: resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    });
  };

  const deleteEducation = (id: string) => {
    updateWithHistory({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      category: "Technical",
      level: 3,
    };
    updateWithHistory({
      ...resumeData,
      skills: [...resumeData.skills, newSkill],
    });
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    updateWithHistory({
      ...resumeData,
      skills: resumeData.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill,
      ),
    });
  };

  const deleteSkill = (id: string) => {
    updateWithHistory({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill.id !== id),
    });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      github: "",
      startDate: "",
      endDate: "",
    };
    updateWithHistory({
      ...resumeData,
      projects: [...resumeData.projects, newProject],
    });
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    updateWithHistory({
      ...resumeData,
      projects: resumeData.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      ),
    });
  };

  const deleteProject = (id: string) => {
    updateWithHistory({
      ...resumeData,
      projects: resumeData.projects.filter((project) => project.id !== id),
    });
  };

  const addCertificate = () => {
    const newCert: Certificate = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      link: "",
    };
    updateWithHistory({
      ...resumeData,
      certificates: [...resumeData.certificates, newCert],
    });
  };

  const updateCertificate = (
    id: string,
    field: keyof Certificate,
    value: any,
  ) => {
    updateWithHistory({
      ...resumeData,
      certificates: resumeData.certificates.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert,
      ),
    });
  };

  const deleteCertificate = (id: string) => {
    updateWithHistory({
      ...resumeData,
      certificates: resumeData.certificates.filter((cert) => cert.id !== id),
    });
  };

  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: "",
      proficiency: "Fluent",
    };
    updateWithHistory({
      ...resumeData,
      languages: [...resumeData.languages, newLang],
    });
  };

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    updateWithHistory({
      ...resumeData,
      languages: resumeData.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang,
      ),
    });
  };

  const deleteLanguage = (id: string) => {
    updateWithHistory({
      ...resumeData,
      languages: resumeData.languages.filter((lang) => lang.id !== id),
    });
  };

  // Export/Import
  const exportData = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume-${resumeData.personalInfo.fullName || "data"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        updateWithHistory(parsed);
      };
      reader.readAsText(file);
    }
  };

  const exportToPDFd = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      const element = previewRef.current;

      // Capture the entire element as canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;

      // Calculate image dimensions
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;
      let pageNumber = 1;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        pageNumber++;
      }

      // Save the PDF
      pdf.save(`resume-${resumeData?.personalInfo.fullName || "document"}.pdf`);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDFf = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);

    try {
      const element = previewRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // A4 dimensions
      const pdfWidth = 210;
      const pdfHeight = 297;

      // Add margins
      const marginTop = 10;
      const marginBottom = 15;
      const marginLeft = 10;

      const usableHeight = pdfHeight - marginTop - marginBottom;

      const imgWidth = pdfWidth - marginLeft * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = marginTop;

      let pageNumber = 1;

      // First page
      pdf.addImage(imgData, "PNG", marginLeft, position, imgWidth, imgHeight);

      // Add page number
      pdf.setFontSize(10);
      pdf.text(`Page ${pageNumber}`, pdfWidth / 2, pdfHeight - 5, {
        align: "center",
      });

      heightLeft -= usableHeight;

      // Additional pages
      while (heightLeft > 0) {
        position = marginTop - imgHeight + heightLeft;

        pdf.addPage();

        pdf.addImage(imgData, "PNG", marginLeft, position, imgWidth, imgHeight);

        pageNumber++;

        // Add page number
        pdf.setFontSize(10);
        pdf.text(`Page ${pageNumber}`, pdfWidth / 2, pdfHeight - 5, {
          align: "center",
        });

        heightLeft -= usableHeight;
      }

      pdf.save(`resume-${resumeData?.personalInfo.fullName || "document"}.pdf`);

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDfF = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      const element = previewRef.current;

      // Capture the entire element as canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;

      // Margins (20mm top and bottom for better spacing)
      const margin = 5;
      const usableHeight = pdfHeight - margin * 2;

      // Calculate image dimensions
      const imgWidth = pdfWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let currentPosition = 0;
      let pageNumber = 1;

      // Calculate total pages needed
      const totalPages = Math.ceil(imgHeight / usableHeight);

      // Add first page
      pdf.addImage(
        imgData,
        "PNG",
        margin,
        margin - currentPosition,
        imgWidth,
        imgHeight,
      );
      heightLeft -= usableHeight;
      currentPosition += usableHeight;

      // Add page number to first page
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(
        `Page ${pageNumber} of ${totalPages}`,
        pdfWidth / 2,
        pdfHeight - 10,
        { align: "center" },
      );

      // Add additional pages if needed
      while (heightLeft > 0) {
        pdf.addPage();
        pageNumber++;

        // Add the next portion of the image
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          margin - currentPosition,
          imgWidth,
          imgHeight,
        );
        heightLeft -= usableHeight;
        currentPosition += usableHeight;

        // Add page number
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text(
          `Page ${pageNumber} of ${totalPages}`,
          pdfWidth / 2,
          pdfHeight - 10,
          { align: "center" },
        );
      }

      // Save the PDF
      pdf.save(`resume-${resumeData?.personalInfo.fullName || "document"}.pdf`);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDFe = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);

    try {
      const element = previewRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;
      const pdfHeight = 297;

      const margin = 10;

      const imgWidth = pdfWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;
      let heightLeft = imgHeight;

      let pageNumber = 1;

      const pageHeight = pdfHeight - margin * 2;

      const totalPages = Math.ceil(imgHeight / pageHeight);

      while (heightLeft > 0) {
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          margin - position,
          imgWidth,
          imgHeight,
        );

        pdf.setFontSize(10);

        pdf.text(
          `Page ${pageNumber} of ${totalPages}`,
          pdfWidth / 2,
          pdfHeight - 5,
          { align: "center" },
        );

        heightLeft -= pageHeight;
        position += pageHeight;
        pageNumber++;

        if (heightLeft > 0) {
          pdf.addPage();
        }
      }

      pdf.save(`resume-${resumeData?.personalInfo.fullName || "document"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDF = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      const element = previewRef.current;

      // Create a clone for PDF generation
      const clone = element.cloneNode(true) as HTMLElement;

      // Add proper styling for PDF
      const style = document.createElement("style");
      style.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        line-height: 1.5;
        color: #333;
      }
      
      .resume-pdf {
        max-width: 210mm;
        margin: 0 auto;
        background: white;
        padding: 15mm;
      }
      
      /* Ensure proper page breaks */
      .pdf-section {
        page-break-inside: avoid;
        break-inside: avoid;
        margin-bottom: 20px;
      }
      
      h2 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 2px solid #3b82f6;
        color: #1e293b;
      }
      
      h3 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #2563eb;
      }
      
      .skills-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-top: 10px;
      }
      
      .skill-item {
        margin-bottom: 12px;
      }
      
      .skill-name {
        font-weight: 500;
        margin-bottom: 4px;
      }
      
      .skill-level {
        font-size: 12px;
        color: #666;
      }
      
      .project-item, .experience-item, .education-item {
        margin-bottom: 20px;
      }
      
      .project-header, .experience-header, .education-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      
      .project-title, .experience-title, .education-title {
        font-weight: 600;
        color: #2563eb;
      }
      
      .project-date, .experience-date, .education-date {
        font-size: 12px;
        color: #666;
      }
      
      .tech-stack {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 8px;
      }
      
      .tech-badge {
        background: #e0e7ff;
        color: #2563eb;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 11px;
      }
      
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        
        .resume-pdf {
          padding: 0;
        }
        
        .pdf-section {
          page-break-inside: avoid;
        }
        
        @page {
          size: A4;
          margin: 20mm;
          
          @bottom-center {
            content: "Page " counter(page) " of " counter(pages);
            font-size: 10px;
            color: #666;
          }
        }
      }
    `;

      clone.prepend(style);
      clone.classList.add("resume-pdf");

      // Add page break hints to sections that might overflow
      const sections = clone.querySelectorAll(".mb-6");
      let accumulatedHeight = 0;
      const pageHeight = 250; // Approximate content height per page in mm

      sections.forEach((section) => {
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (accumulatedHeight + sectionHeight > pageHeight) {
          section.classList.add("page-break");
          accumulatedHeight = 0;
        } else {
          accumulatedHeight += sectionHeight;
        }
      });

      // Open print window
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Resume - ${resumeData?.personalInfo.fullName || "Document"}</title>
            <meta charset="utf-8">
            <style>
              /* Reset styles */
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                line-height: 1.5;
                color: #333;
                background: white;
              }
              
              /* Copy all styles from above */
              ${style.textContent}
              
              /* Additional print styles */
              @media print {
                .page-break {
                  page-break-before: always;
                  break-before: page;
                }
                
                /* Ensure no content is cut off */
                .pdf-section, .mb-6, .project-item, .experience-item, .education-item {
                  page-break-inside: avoid;
                  break-inside: avoid;
                }
                
                /* Keep headings with their content */
                h2, h3 {
                  page-break-after: avoid;
                  break-after: avoid;
                }
              }
            </style>
          </head>
          <body>
            ${clone.innerHTML}
            <script>
              // Add page counting
              const style = document.createElement('style');
              style.textContent = \`
                @page {
                  @bottom-center {
                    content: "Page " counter(page) " of " counter(pages);
                  }
                }
              \`;
              document.head.appendChild(style);
              
              // Auto print
              window.onload = () => {
                setTimeout(() => {
                  window.print();
                  window.onafterprint = () => window.close();
                }, 500);
              };
            <\/script>
          </body>
        </html>
      `);
        printWindow.document.close();
      }

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    documentTitle: `resume-${resumeData?.personalInfo.fullName || "document"}`,
    onBeforeGetContent: () => {
      setIsExporting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    },
    pageStyle: `
    @media print {
      body {
        margin: 0;
        padding: 20px;
      }
      @page {
        size: A4;
        margin: 20mm;
        @bottom-center {
          content: "Page " counter(page) " of " counter(pages);
        }
      }
      .print-section {
        page-break-inside: avoid;
      }
    }
  `,
  });
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        undo();
      }
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        redo();
      }
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        exportData();
      }
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        exportToPDF();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  const sections = [
    {
      id: "personal",
      name: "Personal Info",
      icon: User,
      component: "personal",
    },
    {
      id: "experience",
      name: "Experience",
      icon: Briefcase,
      component: "experience",
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
      component: "education",
    },
    { id: "skills", name: "Skills", icon: Code, component: "skills" },
    { id: "projects", name: "Projects", icon: Award, component: "projects" },
    {
      id: "certificates",
      name: "Certificates",
      icon: FileText,
      component: "certificates",
    },
    {
      id: "languages",
      name: "Languages",
      icon: Languages,
      component: "languages",
    },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onUpdate={updatePersonalInfo}
            errors={errors}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            experiences={resumeData.experience}
            onUpdate={updateExperience}
            onDelete={deleteExperience}
            onAdd={addExperience}
          />
        );
      case "education":
        return (
          <EducationForm
            education={resumeData.education}
            onUpdate={updateEducation}
            onDelete={deleteEducation}
            onAdd={addEducation}
          />
        );
      case "skillss":
        return (
          <>
            <SkillsForms
              skills={resumeData.skills}
              onUpdate={updateSkill}
              onDelete={deleteSkill}
              onAdd={addSkill}
            />
          </>
        );
      case "skills":
        return (
          <>
            <SkillsForm
              skills={resumeData.skills}
              onUpdate={updateSkill}
              onDelete={deleteSkill}
              onAdd={addSkill}
            />
          </>
        );
      case "projects":
        return (
          <ProjectsForm
            projects={resumeData.projects}
            onUpdate={updateProject}
            onDelete={deleteProject}
            onAdd={addProject}
          />
        );
      case "certificates":
        return (
          <CertificatesForm
            certificates={resumeData.certificates}
            onUpdate={updateCertificate}
            onDelete={deleteCertificate}
            onAdd={addCertificate}
          />
        );
      case "languages":
        return (
          <LanguagesForm
            languages={resumeData.languages}
            onUpdate={updateLanguage}
            onDelete={deleteLanguage}
            onAdd={addLanguage}
          />
        );
      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
            Select a section to begin
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resume Builder
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Create your professional resume
            </p>
          </div>

          <div className="flex gap-2">
            {/* Save Status */}
            <div className="flex items-center mr-4">
              {saveStatus === "saved" && (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
              {saveStatus === "saving" && (
                <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
              )}
              {saveStatus === "error" && (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
              <span className="text-sm ml-2 capitalize">{saveStatus}</span>
            </div>

            <Button
              onClick={undo}
              disabled={historyIndex === 0}
              variant="outline"
              size="sm"
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              onClick={redo}
              disabled={historyIndex === history.length - 1}
              variant="outline"
              size="sm"
            >
              <Redo className="w-4 h-4" />
            </Button>
            <Button onClick={exportData} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <label>
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
              <Button variant="outline" size="sm" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </span>
              </Button>
            </label>
          </div>
        </div>

        {/* Template Selector */}
        <div className="flex gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow">
          {Object.entries(templates).map(([key, template]) => (
            <Button
              key={key}
              variant={selectedTemplate === key ? "default" : "ghost"}
              onClick={() => setSelectedTemplate(key as keyof typeof templates)}
              className="flex-1"
            >
              {template.name}
            </Button>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          <Button
            variant={builderMode === "manual" ? "default" : "outline"}
            onClick={() => setBuilderMode("manual")}
            className="flex-1"
          >
            <Edit className="w-4 h-4 mr-2" />
            Manual Builder
          </Button>
          <Button
            variant={builderMode === "analyzer" ? "default" : "outline"}
            onClick={() => setBuilderMode("analyzer")}
            className="flex-1"
          >
            <Brain className="w-4 h-4 mr-2" />
            AI Resume Analyzer
          </Button>
        </div>

        {builderMode === "analyzer" ? (
          <ResumeAnalyzer onImport={handleImportFromAnalyzer} />
        ) : (
          <>
            <div className="flex gap-2">
              {/* ... existing view mode buttons ... */}
              <Button
                variant={viewMode === "edit" ? "default" : "outline"}
                onClick={() => setViewMode("edit")}
                className="flex-1"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant={viewMode === "preview" ? "default" : "outline"}
                onClick={() => {
                  setViewMode("preview");
                  validatePersonalInfo();
                }}
                className="flex-1"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
            {/* Main Content */}
            {viewMode === "edit" ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8 space-y-2 bg-white dark:bg-slate-800 rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-4">
                      Resume Sections
                    </h2>
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <Button
                          key={section.id}
                          variant={
                            activeSection === section.id ? "default" : "ghost"
                          }
                          className="w-full justify-start"
                          onClick={() => setActiveSection(section.id)}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {section.name}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Area */}
                <div className="lg:col-span-3">
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
                    {renderSection()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={exportToPDF}
                    // onClick={handlePrint}
                    className="flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Download PDF
                  </Button>
                </div>
                {/* <div ref={previewRef}>
                  <ResumePreview
                    data={resumeData}
                    template={selectedTemplate}
                  />
                </div> */}
                <div ref={previewRef} className="bg-white p-6 pb-16">
                  <ResumePreview
                    data={resumeData}
                    template={selectedTemplate}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
