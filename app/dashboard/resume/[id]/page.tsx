"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
// import html2canvas from "html2canvas";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import {
  Award,
  Briefcase,
  CheckCircle,
  Download,
  Edit,
  Eye,
  FileText,
  FolderOpen,
  Globe,
  GraduationCap,
  LucideLayoutGrid,
  RefreshCw,
  User,
  Wrench,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { CertificatesForm } from "@/components/forms/CertificatesForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { ExperienceForm } from "@/components/forms/ExperienceForm";
import { LanguagesForm } from "@/components/forms/LanguagesForm";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { ProjectsForm } from "@/components/forms/ProjectsForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { Separator } from "@/components/ui/separator";
import {
  Certificate,
  Education,
  Experience,
  Language,
  Project,
  ResumeData,
  Skill,
} from "@/types/resume";
import { PDFExporter } from "../PDFExporter";
import {
  HeaderStyle,
  HeaderStyleSelector,
  ResumeHeader,
} from "../ResumeHeader";
import CertificatePreview from "../resumePreview/CertificatePreview";
import EducationPreview from "../resumePreview/EducationPreview";
import ExperiencePreview from "../resumePreview/ExperiencePreview";
import LanguagePreview from "../resumePreview/LanguagePreview";
import ProjectsPreview from "../resumePreview/ProjectsPreview";
import SkillsPreview from "../resumePreview/SkillsPreview";
import SidebarNav from "../Shared-SideNav";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { resume } from "react-dom/server";

export const resumeTemplates = {
  modern: {
    name: "Modern",
    primaryColor: "#3b82f6",
    secondaryColor: "#1e293b",
    font: "Arial, sans-serif",
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

const navItems = [
  { id: "personal", name: "Personal Info", icon: User, color: "blue" },
  { id: "experience", name: "Experience", icon: Briefcase, color: "purple" },
  { id: "education", name: "Education", icon: GraduationCap, color: "green" },
  { id: "skills", name: "Skills", icon: Wrench, color: "orange" },
  { id: "projects", name: "Projects", icon: FolderOpen, color: "yellow" },
  { id: "certificates", name: "Certificates", icon: Award, color: "teal" },
  { id: "languages", name: "Languages", icon: Globe, color: "indigo" },
];

const letterTemplates = {
  professional: {
    name: "Professional",
    primaryColor: "#1e293b",
    font: "Inter",
    spacing: "comfortable",
    layout: "standard",
    preview: "bg-gradient-to-br from-gray-800 to-gray-900",
  },
  modern: {
    name: "Modern",
    primaryColor: "#3b82f6",
    font: "Poppins",
    spacing: "relaxed",
    layout: "minimal",
    preview: "bg-gradient-to-br from-blue-600 to-indigo-600",
  },
  creative: {
    name: "Creative",
    primaryColor: "#8b5cf6",
    font: "Plus Jakarta Sans",
    spacing: "relaxed",
    layout: "bold",
    preview: "bg-gradient-to-br from-purple-600 to-pink-600",
  },
};

const LivePreview = ({
  data,
  template,
  headerStyle,
}: {
  data: ResumeData;
  template: keyof typeof resumeTemplates;
  headerStyle: HeaderStyle;
}) => {
  const style = resumeTemplates[template];

  const hasContent =
    data?.personalInfo?.fullName ||
    data?.experience?.length > 0 ||
    data?.skills?.length > 0;

  if (!hasContent) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8">
        <div>
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-500 font-medium">
            Start filling in your details
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Your resume preview will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white overflow-hidden no-scrollbar"
      style={{ fontFamily: style?.font }}
    >
      {/* <div className="px-9 py-7"> */}
      <div className="">
        <Separator />
        <ResumeHeader
          data={data.personalInfo}
          style={headerStyle}
          primaryColor={style.primaryColor}
        />
        <h2
          className="text-lg font-semibold pb-1"
          style={{ borderColor: style.secondaryColor }}
        >
          Professional Summary
        </h2>
        <Separator className="h-px mb-4" />
        <div className="mb-6">
          <div
            className="text-sm text-gray-700"
            dangerouslySetInnerHTML={{
              __html: data.personalInfo.summary as string,
            }}
          />
        </div>
        <ExperiencePreview data={data} template={template} />
        <EducationPreview data={data} template={template} />
        <SkillsPreview data={data} template={template} />
        <ProjectsPreview data={data} template={template} />
        <CertificatePreview data={data} template={template} />
        <LanguagePreview data={data} template={template} />
      </div>
    </div>
  );
};

export const initialResumeData: ResumeData = {
  id: `${crypto.randomUUID()}-${Date.now()}`,
  title: "",
  role: "",
  date: Date.now(),
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

export default function ResumeBuilder() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] =
    useState<keyof typeof resumeTemplates>("modern");
  const [activeSection, setActiveSection] = useState("personal");
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">(
    "saved",
  );
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>("side-by-side");
  const [showStyleSelector, setShowStyleSelector] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [builderMode, setBuilderMode] = useState<"manual" | "analyzer">(
    "manual",
  );
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [history, setHistory] = useState<ResumeData[]>([initialResumeData]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Load resume data by ID from localStorage
  useEffect(() => {
    const loadResume = async () => {
      setIsLoading(true);
      try {
        const savedResumes = localStorage.getItem("resumeData");
        if (savedResumes) {
          const resumesArray: ResumeData[] = JSON.parse(savedResumes);
          const found = resumesArray.find((r) => {
            return r.id === id;
          });

          if (found) {
            setResumeData(found);
            setHistory([found]);
            setHistoryIndex(0);
          } else {
            const individualResume = localStorage.getItem(`resume-${id}`);
            if (individualResume) {
              const parsed = JSON.parse(individualResume);
              setResumeData(parsed);
              setHistory([parsed]);
              setHistoryIndex(0);
            } else {
              const newResume = {
                ...initialResumeData,
                id: id,
              };
              setResumeData(newResume);
              setHistory([newResume]);
              setHistoryIndex(0);
            }
          }
        }
      } catch (error) {
        console.error("Error loading resume:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadResume();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  // Auto-save to localStorage
  useEffect(() => {
    if (!isLoading && id) {
      const saveTimeout = setTimeout(() => {
        const savedResumes = localStorage.getItem("resumeData");
        let resumesArray = savedResumes ? JSON.parse(savedResumes) : [];

        if (!Array.isArray(resumesArray)) {
          resumesArray = [];
        }

        const existingIndex = resumesArray.findIndex((r: any) => r.id === id);
        if (existingIndex >= 0) {
          resumesArray[existingIndex] = resumeData;
        } else {
          resumesArray.push(resumeData);
        }

        localStorage.setItem("resumeData", JSON.stringify(resumesArray));
        setSaveStatus("saved");
      }, 300);

      setSaveStatus("saving");
      return () => clearTimeout(saveTimeout);
    }
  }, [resumeData, isLoading]);

  // Calculate completion percentage
  const completionPercentage = (() => {
    let total = 0;
    let filled = 0;
    if (resumeData?.personalInfo?.fullName) filled++;
    if (resumeData?.personalInfo?.email) filled++;
    if (resumeData?.experience?.length > 0) filled++;
    if (resumeData?.education?.length > 0) filled++;
    if (resumeData?.skills?.length > 0) filled++;
    total = 5;
    return Math.round((filled / total) * 100);
  })();

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

  const validatePersonalInfo = () => {
    const newErrors: Record<string, string> = {};
    if (!resumeData?.personalInfo?.fullName?.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (
      resumeData?.personalInfo?.email &&
      !/\S+@\S+\.\S+/.test(resumeData.personalInfo.email)
    ) {
      newErrors.email = "Invalid email format";
    }
    if (
      resumeData?.personalInfo?.phone &&
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
        resumeData.personalInfo.phone,
      )
    ) {
      newErrors.phone = "Invalid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updatePersonalInfo = (field: string, value: string) =>
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));

  // Experience handlers
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      achievements: [],
      current: false,
      description: "",
    };
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    }));
  };

  const deleteExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      gpa: "",
      field: "",
      current: false,
      description: [],
    };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    }));
  };

  const deleteEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Skills handlers
  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      category: "",
      level: 3,
    };
    setResumeData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }));
  };

  const updateSkill = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill,
      ),
    }));
  };

  const deleteSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  // Projects handlers
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
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      ),
    }));
  };

  const deleteProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((skill) => skill.id !== id),
    }));
  };

  // Certificates handlers
  const addCertificate = () => {
    const newCert: Certificate = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      link: "",
    };
    setResumeData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, newCert],
    }));
  };

  const updateCertificate = (
    id: string,
    field: keyof Certificate,
    value: any,
  ) => {
    setResumeData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert,
      ),
    }));
  };

  const deleteCertificate = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((cert) => cert.id !== id),
    }));
  };

  // Languages handlers
  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: "",
      proficiency: "Fluent",
    };
    setResumeData((prev) => ({
      ...prev,
      languages: [...prev.languages, newLang],
    }));
  };

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang,
      ),
    }));
  };

  const deleteLanguage = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }));
  };

  const exportToPDF = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(
        `resume-${resumeData?.personalInfo?.fullName || "document"}.pdf`,
      );
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportFromAnalyzer = (importedData: Partial<ResumeData>) => {
    const mergedData: ResumeData = {
      ...resumeData,
      title: resumeData.title || "",
      role: resumeData.role || "",
      date: resumeData.date || Date.now(),
      id: resumeData.id || crypto.randomUUID(),
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

  const renderSection = () => {
    if (!resumeData) return null;

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
            onAdd={addExperience}
            onUpdate={updateExperience}
            onDelete={deleteExperience}
          />
        );
      case "education":
        return (
          <EducationForm
            education={resumeData.education}
            onAdd={addEducation}
            onUpdate={updateEducation}
            onDelete={deleteEducation}
          />
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
      case "skills":
        return (
          <SkillsForm
            skills={resumeData.skills}
            onUpdate={updateSkill}
            onDelete={deleteSkill}
            onAdd={addSkill}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header with back button and title */}

        <Link href={`/resume/${id}/edit`}>
          <Button variant="outline" size="sm" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Advanced Edit
          </Button>
        </Link>
        <Link href={`/resume/${id}/full-edit`}>
          <Button
            variant="default"
            size="sm"
            className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600"
          >
            <Sparkles className="w-4 h-4" />
            Full Editor
          </Button>
        </Link>

        <div className="flex gap-6">
          <SidebarNav
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            completionPercentage={completionPercentage}
            label={"Resume Builder"}
            letterTemplates={letterTemplates}
            navItems={navItems}
            currentView={() => {
              setShowPreview((prev) => false);
            }}
          />

          <div className="flex-1 space-y-6">
            {/* Template Selector Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex items-center justify-between flex-wrap gap-3">
              <div className="flex gap-2 flex-wrap">
                {Object.entries(resumeTemplates).map(([key, template]) => (
                  <Button
                    key={key}
                    variant={selectedTemplate === key ? "default" : "outline"}
                    onClick={() =>
                      setSelectedTemplate(key as keyof typeof resumeTemplates)
                    }
                    className="gap-2 cursor-pointer"
                    size="sm"
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  className="flex gap-1 cursor-pointer items-center"
                  size="sm"
                >
                  <span>Theme</span>
                  <LucideLayoutGrid size={18} />
                </Button>
                <HeaderStyleSelector
                  selectedStyle={headerStyle}
                  onStyleChange={setHeaderStyle}
                />
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    validatePersonalInfo();
                    setShowPreview((prev) => !prev);
                  }}
                >
                  {showPreview ? (
                    <>
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" /> Preview
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    exportToPDF();
                  }}
                  disabled={isExporting}
                  size="sm"
                  className="gap-2 cursor-pointer"
                >
                  {isExporting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Export PDF
                </Button>
                {exportSuccess && (
                  <Badge
                    variant="outline"
                    className="gap-1 text-green-600 border-green-200"
                  >
                    <CheckCircle className="w-3 h-3" /> Exported!
                  </Badge>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="gap-6">
              {showPreview ? (
                <Card className="sticky px-8 py-7 rounded-l-lg border-gray-200">
                  <div
                    ref={previewRef}
                    className="bg-white/90 h-[calc(100vh-130px)] no-scrollbar overflow-auto"
                  >
                    <LivePreview
                      data={resumeData}
                      template={selectedTemplate}
                      headerStyle={headerStyle}
                    />
                  </div>
                </Card>
              ) : (
                <Card className="p-6 shadow-lg border-gray-200 ">
                  <ScrollArea className="max-h-[calc(100vh-100px)] h-[calc(100vh-100px)] pr-4">
                    {/* <ScrollArea className="max-h-[calc(100vh-100px)] min-h-[calc(100vh-300px)] pr-4"> */}
                    {renderSection()}
                  </ScrollArea>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
