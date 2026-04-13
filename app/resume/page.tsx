"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import html2canvas from "html2canvas";
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
import { PDFExporter } from "./PDFExporter";
import { HeaderStyle, HeaderStyleSelector, ResumeHeader } from "./ResumeHeader";
import CertificatePreview from "./resumePreview/CertificatePreview";
import EducationPreview from "./resumePreview/EducationPreview";
import ExperiencePreview from "./resumePreview/ExperiencePreview";
import LanguagePreview from "./resumePreview/LanguagePreview";
import ProjectsPreview from "./resumePreview/ProjectsPreview";
import SkillsPreview from "./resumePreview/SkillsPreview";
import SidebarNav from "./Shared-SideNav";

export const resumeTemplates = {
  modern: {
    name: "Modern",
    primaryColor: "#3b82f6",
    secondaryColor: "#1e293b",
    // font: "Inter",
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

// Templates
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
    data.personalInfo.fullName ||
    data.experience.length > 0 ||
    data.skills.length > 0;

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
      className="bg-white shadow-lg overflow-hidden no-scrollbar border border-gray-200"
      style={{ fontFamily: style?.font }}
    >
      <div className="px-9 py-7">
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

// const initialResumeData: ResumeData = {
export const initialResumeData: ResumeData = {
  id: "",
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

    // title: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certificates: [],
  languages: [],
};

export default function ResumeBuilder() {
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

  const [builderMode, setBuilderMode] = useState<"manual" | "analyzer">(
    "manual",
  );
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [history, setHistory] = useState<ResumeData[]>([initialResumeData]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Calculate completion percentage
  const completionPercentage = (() => {
    let total = 0;
    let filled = 0;
    if (resumeData.personalInfo.fullName) filled++;
    if (resumeData.personalInfo.email) filled++;
    if (resumeData.experience.length > 0) filled++;
    if (resumeData.education.length > 0) filled++;
    if (resumeData.skills.length > 0) filled++;
    total = 5;
    return Math.round((filled / total) * 100);
  })();

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
      // setSaveStatus("saved");

      // const existing = localStorage.getItem("resumeData");
      const existing = localStorage.getItem("resumeDataArray");

      let resumesArray = [];

      if (existing) {
        try {
          resumesArray = JSON.parse(existing);
        } catch (e) {
          resumesArray = [];
        }
      }
      // Ensure it's an array
      if (!Array.isArray(resumesArray)) {
        resumesArray = [];
      }

      // Push new data
      resumesArray.push(resumeData);

      localStorage.setItem("resumeDataArray", JSON.stringify(resumesArray));
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
      title: "",
      role: "",
      date: Date.now(),
      id: crypto.randomUUID(),
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
      // description: [],
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
      // fieldOfStudy: "",
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
      // level: "Intermediate" as const,
      category: "",

      // category: "Technical",
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
    // updateWithHistory({
    //   ...resumeData,
    //   projects: [...resumeData.projects, newProject],
    // });
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      ),
    }));
    // updateWithHistory({
    //   ...resumeData,
    //   projects: resumeData.projects.map((project) =>
    //     project.id === id ? { ...project, [field]: value } : project,
    //   ),
    // });
  };

  const deleteProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((skill) => skill.id !== id),
    }));
    // updateWithHistory({
    //   ...resumeData,
    //   projects: resumeData.projects.filter((project) => project.id !== id),
    // });
  };

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

    // updateWithHistory({
    //   ...resumeData,
    //   certificates: [...resumeData.certificates, newCert],
    // });
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
    // updateWithHistory({
    //   ...resumeData,
    //   certificates: resumeData.certificates.map((cert) =>
    //     cert.id === id ? { ...cert, [field]: value } : cert,
    //   ),
    // });
  };

  const deleteCertificate = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((cert) => cert.id !== id),
    }));
    // updateWithHistory({
    //   ...resumeData,
    //   certificates: resumeData.certificates.filter((cert) => cert.id !== id),
    // });
  };

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
    // updateWithHistory({
    //   ...resumeData,
    //   languages: [...resumeData.languages, newLang],
    // });
  };

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang,
      ),
    }));
    // updateWithHistory({
    //   ...resumeData,
    //   languages: resumeData.languages.map((lang) =>
    //     lang.id === id ? { ...lang, [field]: value } : lang,
    //   ),
    // });
  };

  const deleteLanguage = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }));
    // updateWithHistory({
    //   ...resumeData,
    //   languages: resumeData.languages.filter((lang) => lang.id !== id),
    // });
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
      pdf.save(`resume-${resumeData.personalInfo.fullName || "document"}.pdf`);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsExporting(false);
    }
  };

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

  // const exportToPDF = async () => {
  //   if (!previewRef.current) return;

  //   setIsExporting(true);

  //   try {
  //     const element = previewRef.current;

  //     const canvas = await html2canvas(element, {
  //       scale: 2,
  //       useCORS: true,
  //       backgroundColor: "#ffffff",
  //     });

  //     const imgData = canvas.toDataURL("image/png");

  //     const pdf = new jsPDF("p", "mm", "a4");

  //     const pdfWidth = 210;
  //     const pdfHeight = 297;

  //     const margin = 4;

  //     // Custom padding/margin values
  //     const firstPageBottomPadding = 10; // Extra space at bottom of first page
  //     const followingPageTopPadding = 10; // Extra space at top of following pages

  //     const imgWidth = pdfWidth - margin * 2;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     let position = 0;
  //     let heightLeft = imgHeight;
  //     let pageNumber = 1;

  //     // Calculate available height per page with different margins for first and subsequent pages
  //     let pageHeight = pdfHeight - margin * 2;

  //     // Adjust first page height (subtract bottom padding)
  //     const firstPageAvailableHeight = pageHeight - firstPageBottomPadding;
  //     // Adjust subsequent pages height (subtract top padding)
  //     const subsequentPageAvailableHeight =
  //       pageHeight - followingPageTopPadding;

  //     const totalPages = Math.ceil(
  //       (imgHeight - firstPageBottomPadding) / subsequentPageAvailableHeight,
  //     );

  //     let isFirstPage = true;
  //     let currentVerticalOffset = 0;

  //     while (heightLeft > 0) {
  //       // Determine available height for current page
  //       const currentPageAvailableHeight = isFirstPage
  //         ? firstPageAvailableHeight
  //         : subsequentPageAvailableHeight;

  //       // Calculate vertical offset for this page
  //       let verticalOffset = margin - position;

  //       // Add top padding for following pages
  //       if (!isFirstPage && followingPageTopPadding > 0) {
  //         verticalOffset = verticalOffset + followingPageTopPadding;
  //       }

  //       pdf.addImage(
  //         imgData,
  //         "PNG",
  //         margin,
  //         verticalOffset,
  //         imgWidth,
  //         imgHeight,
  //         undefined, // alias
  //         undefined, // compression
  //         isFirstPage ? 0 : currentVerticalOffset, // rotation parameter can be used differently
  //       );

  //       pdf.setFontSize(10);
  //       pdf.text(
  //         `Page ${pageNumber} of ${totalPages}`,
  //         pdfWidth / 2,
  //         pdfHeight - 5,
  //         { align: "center" },
  //       );

  //       heightLeft -= currentPageAvailableHeight;
  //       position += currentPageAvailableHeight;

  //       if (!isFirstPage) {
  //         currentVerticalOffset += currentPageAvailableHeight;
  //       }

  //       pageNumber++;
  //       isFirstPage = false;

  //       if (heightLeft > 0) {
  //         pdf.addPage();
  //       }
  //     }

  //     pdf.save(`resume-${resumeData?.personalInfo.fullName || "document"}.pdf`);
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   } finally {
  //     setIsExporting(false);
  //   }
  // };

  const exportToPDFs = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);

    try {
      const element = previewRef.current;

      // Create a clone of the element to avoid modifying the original
      const cloneElement = element.cloneNode(true) as HTMLElement;

      // Apply inline styles to override problematic CSS
      cloneElement.style.all = "initial";
      cloneElement.style.display = "block";
      cloneElement.style.width = "800px";
      cloneElement.style.backgroundColor = "white";

      // Copy computed styles to clone
      const originalStyles = window.getComputedStyle(element);
      // Add critical styles to clone

      document.body.appendChild(cloneElement);

      const canvas = await html2canvas(cloneElement, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
        // Skip unsupported CSS
        ignoreElements: (element) => {
          // Optionally ignore elements with problematic styles
          return false;
        },
      });

      document.body.removeChild(cloneElement);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210;
      const pdfHeight = 297;
      const margin = 4;
      const imgWidth = pdfWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
      pdf.save(`resume-${resumeData?.personalInfo.fullName || "document"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("PDF generation failed. Please try again.");
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
          <>
            <PersonalInfoForm
              data={resumeData.personalInfo}
              onUpdate={updatePersonalInfo}
              errors={errors}
            />
          </>
        );
      case "experience":
        return (
          <div>
            <ExperienceForm
              experiences={resumeData.experience}
              onAdd={addExperience}
              onUpdate={updateExperience}
              onDelete={deleteExperience}
            />
          </div>
        );
      case "education":
        return (
          <>
            <EducationForm
              education={resumeData.education}
              onAdd={addEducation}
              onUpdate={updateEducation}
              onDelete={deleteEducation}
            />
          </>
        );
      case "projects":
        return (
          <>
            <ProjectsForm
              projects={resumeData.projects}
              onUpdate={updateProject}
              onDelete={deleteProject}
              onAdd={addProject}
            />
          </>
        );
      case "certificates":
        return (
          <>
            <CertificatesForm
              certificates={resumeData.certificates}
              onUpdate={updateCertificate}
              onDelete={deleteCertificate}
              onAdd={addCertificate}
            />
          </>
        );
      case "languages":
        return (
          <>
            <LanguagesForm
              languages={resumeData.languages}
              onUpdate={updateLanguage}
              onDelete={deleteLanguage}
              onAdd={addLanguage}
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
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-6">
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex items-center justify-between">
              <div className="flex gap-2">
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
              {/* THEME SELECTOR */}
              <div>
                <Button className="flex gap-1 cursor-pointer item-center">
                  <span>Theme</span>
                  <LucideLayoutGrid size={18} />
                </Button>
              </div>
              <div>
                <HeaderStyleSelector
                  selectedStyle={headerStyle}
                  onStyleChange={setHeaderStyle}
                />
              </div>
              <div className="flex gap-2">
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
                  // onClick={exportToPDF}
                  onClick={() => {
                    exportToPDF();
                    // handleDownloadPDF();
                    console.log("Moses Mwangi");
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
                <Card className="sticky p-0 shadow-lg border-gray-200">
                  <div className="bg-white/90 rounded-xl h-[calc(100vh-130px)] no-scrollbar overflow-auto">
                    <div ref={previewRef}>
                      <LivePreview
                        data={resumeData}
                        template={selectedTemplate}
                        headerStyle={headerStyle}
                      />
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-6 shadow-lg border-gray-900">
                  <ScrollArea className="max-h-[calc(100vh-300px)]  h-[calc(100vh-260px)] pr-4">
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
