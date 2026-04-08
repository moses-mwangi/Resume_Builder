"use client";
import { Button } from "@/components/ui/button";
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
  Edit3,
  Eye,
  FileText,
  GitBranch,
  GraduationCap,
  Languages,
  Layout,
  Printer,
  Redo,
  Settings,
  Shield,
  Smartphone,
  Sparkles,
  Undo,
  Upload,
  User,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ResumeAnalyzer } from "./ResumeAnalyzer";
import { HeaderStyle } from "./ResumeHeader";
import { ResumePreview } from "./ResumePreview";
import { ResumePreviewImproved } from "./ResumePreviewImproved";
import { SkillsForm as SkillsForms } from "./SkillsForm";
import { CertificatesForm } from "./forms/CertificatesForm";
import { EducationForm } from "./forms/EducationForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { LanguagesForm } from "./forms/LanguagesForm";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { ProjectsForm } from "./forms/ProjectsForm";
import { SkillsForm } from "./forms/SkillsForm";
import { PDFExporter } from "./PDFExporter";
import { downloadPDF } from "@/lib/pdf-generator";

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
  const resumeRef = useRef<HTMLDivElement>(null);

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

  const exportToPDF = async () => {
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

      const margin = 4;

      // Custom padding/margin values
      const firstPageBottomPadding = 10; // Extra space at bottom of first page
      const followingPageTopPadding = 10; // Extra space at top of following pages

      const imgWidth = pdfWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;
      let heightLeft = imgHeight;
      let pageNumber = 1;

      // Calculate available height per page with different margins for first and subsequent pages
      let pageHeight = pdfHeight - margin * 2;

      // Adjust first page height (subtract bottom padding)
      const firstPageAvailableHeight = pageHeight - firstPageBottomPadding;
      // Adjust subsequent pages height (subtract top padding)
      const subsequentPageAvailableHeight =
        pageHeight - followingPageTopPadding;

      const totalPages = Math.ceil(
        (imgHeight - firstPageBottomPadding) / subsequentPageAvailableHeight,
      );

      let isFirstPage = true;
      let currentVerticalOffset = 0;

      while (heightLeft > 0) {
        // Determine available height for current page
        const currentPageAvailableHeight = isFirstPage
          ? firstPageAvailableHeight
          : subsequentPageAvailableHeight;

        // Calculate vertical offset for this page
        let verticalOffset = margin - position;

        // Add top padding for following pages
        if (!isFirstPage && followingPageTopPadding > 0) {
          verticalOffset = verticalOffset + followingPageTopPadding;
        }

        pdf.addImage(
          imgData,
          "PNG",
          margin,
          verticalOffset,
          imgWidth,
          imgHeight,
          undefined, // alias
          undefined, // compression
          isFirstPage ? 0 : currentVerticalOffset, // rotation parameter can be used differently
        );

        pdf.setFontSize(10);
        pdf.text(
          `Page ${pageNumber} of ${totalPages}`,
          pdfWidth / 2,
          pdfHeight - 5,
          { align: "center" },
        );

        heightLeft -= currentPageAvailableHeight;
        position += currentPageAvailableHeight;

        if (!isFirstPage) {
          currentVerticalOffset += currentPageAvailableHeight;
        }

        pageNumber++;
        isFirstPage = false;

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

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    console.log("Generating PDF...");

    try {
      await PDFExporter.exportToPDF(resumeRef.current, {
        filename: `${resumeData?.personalInfo.fullName.replace(/\s+/g, "-").toLowerCase()}-resume.pdf`,
        quality: 0.95,
        scale: 2,
      });
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

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
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* ================= HEADER ================= */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Resume Builder
              </h1>

              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Create your professional resume
              </p>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Save Status */}
              <div className="flex items-center mr-2">
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

          {/* ================= TEMPLATE TABS ================= */}

          <div className="flex border-b bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow">
            {Object.entries(templates).map(([key, template]) => (
              <Button
                key={key}
                variant="ghost"
                onClick={() =>
                  setSelectedTemplate(key as keyof typeof templates)
                }
                className={`flex-1 rounded-none h-10 border-b-2 ${
                  selectedTemplate === key
                    ? "border-purple-600 text-purple-600 bg-gray-50 dark:bg-slate-700"
                    : "border-transparent"
                }`}
              >
                {template.name}
              </Button>
            ))}
          </div>

          {/* ================= BUILDER MODE TABS ================= */}

          <div className="flex border-b bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow">
            <Button
              variant="ghost"
              onClick={() => setBuilderMode("manual")}
              className={`flex-1 rounded-none h-10 border-b-2 ${
                builderMode === "manual"
                  ? "border-blue-600 text-blue-600 bg-gray-50 dark:bg-slate-700"
                  : "border-transparent"
              }`}
            >
              <Edit className="w-4 h-4 mr-2" />
              Manual Builder
            </Button>

            <Button
              variant="ghost"
              onClick={() => setBuilderMode("analyzer")}
              className={`flex-1 rounded-none h-10 border-b-2 ${
                builderMode === "analyzer"
                  ? "border-blue-600 text-blue-600 bg-gray-50 dark:bg-slate-700"
                  : "border-transparent"
              }`}
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Resume Analyzer
            </Button>
          </div>

          {/* ================= MAIN MODE ================= */}

          {builderMode === "analyzer" ? (
            <ResumeAnalyzer onImport={handleImportFromAnalyzer} />
          ) : (
            <>
              {/* ================= VIEW MODE TABS ================= */}

              <div className="flex border-b bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow">
                <Button
                  variant="ghost"
                  onClick={() => setViewMode("edit")}
                  className={`flex-1 rounded-none h-10 border-b-2 ${
                    viewMode === "edit"
                      ? "border-blue-600 text-blue-600 bg-gray-50 dark:bg-slate-700"
                      : "border-transparent"
                  }`}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Resume Editor
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => {
                    setViewMode("preview");
                    validatePersonalInfo();
                  }}
                  className={`flex-1 rounded-none h-10 border-b-2 ${
                    viewMode === "preview"
                      ? "border-blue-600 text-blue-600 bg-gray-50 dark:bg-slate-700"
                      : "border-transparent"
                  }`}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>

              {/* ================= CONTENT ================= */}

              {viewMode === "edit" ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* ================= SIDEBAR ================= */}

                  <div className="lg:col-span-1">
                    <div className="sticky top-8 space-y-1 bg-white dark:bg-slate-800 rounded-lg shadow p-3">
                      <h2 className="text-lg font-semibold mb-3">
                        Resume Sections
                      </h2>

                      {sections.map((section) => {
                        const Icon = section.icon;

                        return (
                          <Button
                            key={section.id}
                            variant="ghost"
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full justify-start h-10 ${
                              activeSection === section.id
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-100 dark:hover:bg-slate-700"
                            }`}
                          >
                            <Icon className="w-4 h-4 mr-2" />

                            {section.name}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ================= FORM AREA ================= */}

                  <div className="lg:col-span-3">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
                      {renderSection()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Download PDF */}
                  <div className="flex justify-end">
                    <Button
                      onClick={exportToPDF}
                      // onClick={handlePrint}
                      className="flex items-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      Download PDF ggg
                    </Button>
                  </div>

                  {/* Resume Preview */}

                  <div
                    ref={previewRef}
                    className="resume-print-area print:hidden"
                  >
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
    </>
  );
}
