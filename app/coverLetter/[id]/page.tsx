"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  ArrowLeft,
  Building,
  CheckCircle,
  Download,
  Edit,
  Eye,
  FileText,
  MessageSquare,
  RefreshCw,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SidebarNav from "../../resume/Shared-SideNav";

// Types
interface CoverLetterData {
  id?: number;
  title?: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    title: string;
  };
  recipient: {
    companyName: string;
    hiringManager: string;
    companyAddress: string;
    recipientEmail: string;
    address?: Address;
  };
  letter: {
    position: string;
    subject: string;
    opening: string;
    body: string;
    closing: string;
    signature: string;
  };
  additional: {
    referral: string;
    portfolioLink: string;
    availableFrom: string;
    salaryExpectation: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  line1: string;
  line2: string;
  cityStateZip: string;
  country: string;
}

// Templates
const letterTemplates = {
  professional: {
    name: "Professional",
    primaryColor: "#1e293b",
    font: "Inter",
    spacing: "comfortable",
    layout: "standard",
    preview: "bg-linear-to-br from-gray-800 to-gray-900",
  },
  modern: {
    name: "Modern",
    primaryColor: "#3b82f6",
    font: "Poppins",
    spacing: "relaxed",
    layout: "minimal",
    preview: "bg-linear-to-br from-blue-600 to-indigo-600",
  },
  creative: {
    name: "Creative",
    primaryColor: "#8b5cf6",
    font: "Plus Jakarta Sans",
    spacing: "relaxed",
    layout: "bold",
    preview: "bg-linear-to-br from-purple-600 to-pink-600",
  },
};

// AI Suggestions
const aiSuggestions = {
  openings: [
    "I am writing to express my strong interest in the [Position] position at [Company].",
    "As a passionate [Industry] professional with [X] years of experience, I was thrilled to see the opening for [Position] at [Company].",
    "Your company's recent work in [Project/Area] caught my attention and inspired me to apply for the [Position] role.",
  ],
  closings: [
    "Thank you for considering my application. I look forward to discussing how my skills can benefit your team.",
    "I would welcome the opportunity to discuss how my experience aligns with your needs in an interview.",
  ],
  bodyParagraphs: [
    "In my current role, I have successfully delivered impactful projects resulting in measurable improvements. This experience has prepared me well to contribute to your team's success.",
    "My background includes expertise in modern technologies and best practices, which I believe would be valuable for your upcoming initiatives.",
  ],
};

const navItems = [
  { id: "personal", name: "Personal Info", icon: User, color: "blue" },
  { id: "company", name: "Company Details", icon: Building, color: "purple" },
  {
    id: "letter",
    name: "Letter Content",
    icon: MessageSquare,
    color: "green",
  },
  {
    id: "additional",
    name: "Additional Info",
    icon: Settings,
    color: "orange",
  },
];

// Real-time Preview Component
const LivePreview = ({
  data,
  template,
}: {
  data: CoverLetterData;
  template: keyof typeof letterTemplates;
}) => {
  const style = letterTemplates[template];
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hasContent =
    data.personalInfo.fullName ||
    data.recipient.companyName ||
    data.letter.opening;

  if (!hasContent) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8">
        <div>
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-500 font-medium">
            Start filling in your details
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Your cover letter preview will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="bg-white shadow-lg overflow-hidden border border-gray-200"
        style={{ fontFamily: style.font }}
        data-letter-content="true"
      >
        <div className="px-11 py-8">
          <div className="mb-6">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h1
                  className="text-xl font-bold"
                  style={{ color: style.primaryColor }}
                >
                  {data.personalInfo.fullName || "Your Name"}
                </h1>
                {data.personalInfo.title && (
                  <p className="text-sm text-gray-500 mt-1">
                    {data.personalInfo.title}
                  </p>
                )}
                <div className="flex flex-col flex-wrap gap-2 mt-2 text-xs text-gray-500">
                  {data.personalInfo.email && (
                    <span className="text-sm font-medium ">
                      {data.personalInfo.email}
                    </span>
                  )}
                  {data.personalInfo.phone && (
                    <span className="text-sm font-medium ">
                      {data.personalInfo.phone}
                    </span>
                  )}
                  {data.personalInfo.location && (
                    <span className="text-sm font-medium ">
                      {data.personalInfo.location}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right text-xs text-gray-400">
                {currentDate}
              </div>
            </div>
          </div>

          <div className="mb-8 text-sm leading-relaxed">
            {data.recipient.hiringManager && (
              <div className="font-semibold">
                {data.recipient.hiringManager}
              </div>
            )}
            {data.recipient.companyName && (
              <div>{data.recipient.companyName}</div>
            )}
            {data.recipient.address?.line1 && (
              <div>{data.recipient.address.line1}</div>
            )}
            {data.recipient?.companyAddress && (
              <div>{data?.recipient?.companyAddress}</div>
            )}
            {data.recipient.address?.line2 && (
              <div>{data.recipient.address.line2}</div>
            )}
            {data.recipient.address?.cityStateZip && (
              <div>{data.recipient.address.cityStateZip}</div>
            )}
          </div>

          {data.letter.subject && (
            <div className="mb-6 text-sm font-semibold">
              RE: {data.letter.subject}
            </div>
          )}

          <div className="mb-6">
            <p>Dear {data.recipient.hiringManager || "Hiring Manager"},</p>
          </div>

          {data.letter.opening && (
            <div className="mb-3">
              <p className="text-sm leading-relaxed">{data.letter.opening}</p>
            </div>
          )}

          {data.letter.body && (
            <div className="mb-3">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {data.letter.body}
              </p>
            </div>
          )}

          {data.letter.closing && (
            <div className="mb-4">
              <p className="text-sm leading-relaxed">{data.letter.closing}</p>
            </div>
          )}

          <div className="mt-6">
            <p className="text-sm">Sincerely,</p>
            <p className="font-medium mt-3 text-sm">
              {data.letter.signature ||
                data.personalInfo.fullName ||
                "Your Name"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Form Sections
const PersonalInfoSection = ({
  data,
  onUpdate,
}: {
  data: any;
  onUpdate: (field: string, value: string) => void;
}) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <User className="w-5 h-5 text-blue-600" />
        Personal Information
      </h3>
      <p className="text-sm text-gray-500 mt-1">Tell us about yourself</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <Label>Full Name *</Label>
        <Input
          value={data.fullName}
          onChange={(e) => onUpdate("fullName", e.target.value)}
          placeholder="John Doe"
        />
      </div>
      <div>
        <Label>Professional Title</Label>
        <Input
          value={data.title}
          onChange={(e) => onUpdate("title", e.target.value)}
          placeholder="Senior Software Engineer"
        />
      </div>
      <div>
        <Label>Email *</Label>
        <Input
          type="email"
          value={data.email}
          onChange={(e) => onUpdate("email", e.target.value)}
          placeholder="john@example.com"
        />
      </div>
      <div>
        <Label>Phone</Label>
        <Input
          value={data.phone}
          onChange={(e) => onUpdate("phone", e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div>
        <Label>Location</Label>
        <Input
          value={data.location}
          onChange={(e) => onUpdate("location", e.target.value)}
          placeholder="New York, NY"
        />
      </div>
      <div>
        <Label>LinkedIn</Label>
        <Input
          value={data.linkedin}
          onChange={(e) => onUpdate("linkedin", e.target.value)}
          placeholder="https://linkedin.com/in/username"
        />
      </div>
    </div>
  </div>
);

const CompanySection = ({
  data,
  onUpdate,
}: {
  data: any;
  onUpdate: (field: string, value: string) => void;
}) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Building className="w-5 h-5 text-purple-600" />
        Company Details
      </h3>
      <p className="text-sm text-gray-500 mt-1">Who are you writing to?</p>
    </div>
    <div className="grid grid-cols-1 gap-4">
      <div>
        <Label>Company Name *</Label>
        <Input
          value={data.companyName}
          onChange={(e) => onUpdate("companyName", e.target.value)}
          placeholder="Company Name"
        />
      </div>
      <div>
        <Label>Hiring Manager Name</Label>
        <Input
          value={data.hiringManager}
          onChange={(e) => onUpdate("hiringManager", e.target.value)}
          placeholder="Jane Smith"
        />
      </div>
      <div>
        <Label>Company Address</Label>
        <Input
          value={data.companyAddress}
          onChange={(e) => onUpdate("companyAddress", e.target.value)}
          placeholder="123 Business St, City, State 12345"
        />
      </div>
    </div>
  </div>
);

const LetterSection = ({
  data,
  onUpdate,
  onAISuggest,
}: {
  data: any;
  onUpdate: (field: string, value: string) => void;
  onAISuggest: (field: string) => void;
}) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-green-600" />
        Letter Content
      </h3>
      <p className="text-sm text-gray-500 mt-1">Craft your message</p>
    </div>
    <div>
      <Label>Position Applying For *</Label>
      <Input
        value={data.position}
        onChange={(e) => onUpdate("position", e.target.value)}
        placeholder="Senior Frontend Developer"
      />
    </div>
    <div>
      <div className="flex justify-between items-center mb-2">
        <Label>Opening Paragraph</Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAISuggest("opening")}
        >
          <Sparkles className="w-3 h-3 mr-1" />
          AI Suggest
        </Button>
      </div>
      <Textarea
        value={data.opening}
        onChange={(e) => onUpdate("opening", e.target.value)}
        placeholder="Introduce yourself..."
        rows={4}
      />
    </div>
    <div>
      <div className="flex justify-between items-center mb-2">
        <Label>Body Paragraphs</Label>
        <Button variant="ghost" size="sm" onClick={() => onAISuggest("body")}>
          <Sparkles className="w-3 h-3 mr-1" />
          AI Suggest
        </Button>
      </div>
      <Textarea
        value={data.body}
        onChange={(e) => onUpdate("body", e.target.value)}
        placeholder="Highlight your skills and experience..."
        rows={6}
      />
    </div>
    <div>
      <div className="flex justify-between items-center mb-2">
        <Label>Closing Paragraph</Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAISuggest("closing")}
        >
          <Sparkles className="w-3 h-3 mr-1" />
          AI Suggest
        </Button>
      </div>
      <Textarea
        value={data.closing}
        onChange={(e) => onUpdate("closing", e.target.value)}
        placeholder="Thank the reader..."
        rows={3}
      />
    </div>
    <div>
      <Label>Signature</Label>
      <Input
        value={data.signature}
        onChange={(e) => onUpdate("signature", e.target.value)}
        placeholder="John Doe"
      />
    </div>
  </div>
);

const AdditionalSection = ({
  data,
  onUpdate,
}: {
  data: any;
  onUpdate: (field: string, value: string) => void;
}) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Settings className="w-5 h-5 text-orange-600" />
        Additional Information
      </h3>
      <p className="text-sm text-gray-500 mt-1">Optional details</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label>Referral Source</Label>
        <Input
          value={data.referral}
          onChange={(e) => onUpdate("referral", e.target.value)}
          placeholder="LinkedIn, Employee Referral, etc."
        />
      </div>
      <div>
        <Label>Portfolio/GitHub</Label>
        <Input
          value={data.portfolioLink}
          onChange={(e) => onUpdate("portfolioLink", e.target.value)}
          placeholder="https://github.com/username"
        />
      </div>
      <div>
        <Label>Available From</Label>
        <Input
          type="date"
          value={data.availableFrom}
          onChange={(e) => onUpdate("availableFrom", e.target.value)}
        />
      </div>
      <div>
        <Label>Salary Expectation</Label>
        <Input
          value={data.salaryExpectation}
          onChange={(e) => onUpdate("salaryExpectation", e.target.value)}
          placeholder="$80,000 - $100,000"
        />
      </div>
    </div>
  </div>
);

// Main Component
export default function CoverLetterBuilder() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [letterData, setLetterData] = useState<CoverLetterData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
      title: "",
    },
    recipient: {
      companyName: "",
      hiringManager: "",
      companyAddress: "",
      recipientEmail: "",
    },
    letter: {
      position: "",
      subject: "",
      opening: "",
      body: "",
      closing: "",
      signature: "",
    },
    additional: {
      referral: "",
      portfolioLink: "",
      availableFrom: "",
      salaryExpectation: "",
    },
  });

  const [activeSection, setActiveSection] = useState("personal");
  const [selectedTemplate, setSelectedTemplate] =
    useState<keyof typeof letterTemplates>("professional");
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving">("saved");
  const [showPreview, setShowPreview] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);

  // Load cover letter data by ID
  useEffect(() => {
    const loadCoverLetter = async () => {
      setIsLoading(true);
      try {
        // Try to load from localStorage first (for demo)
        const savedLetters = localStorage.getItem("coverLetters");
        if (savedLetters) {
          const allLetters = JSON.parse(savedLetters);
          const foundLetter = allLetters.find(
            (l: any) => l.id === parseInt(id),
          );

          if (foundLetter) {
            // Populate the form with saved data
            setLetterData({
              personalInfo: {
                fullName: foundLetter.personalInfo?.fullName || "",
                email: foundLetter.personalInfo?.email || "",
                phone: foundLetter.personalInfo?.phone || "",
                location: foundLetter.personalInfo?.location || "",
                linkedin: foundLetter.personalInfo?.linkedin || "",
                portfolio: foundLetter.personalInfo?.portfolio || "",
                title: foundLetter.personalInfo?.title || "",
              },
              recipient: {
                companyName:
                  foundLetter.recipient?.companyName ||
                  foundLetter.company ||
                  "",
                hiringManager: foundLetter.recipient?.hiringManager || "",
                companyAddress: foundLetter.recipient?.companyAddress || "",
                recipientEmail: foundLetter.recipient?.recipientEmail || "",
              },
              letter: {
                position: foundLetter.letter?.position || "",
                subject: foundLetter.letter?.subject || "",
                opening: foundLetter.letter?.opening || "",
                body: foundLetter.letter?.body || "",
                closing: foundLetter.letter?.closing || "",
                signature: foundLetter.letter?.signature || "",
              },
              additional: {
                referral: foundLetter.additional?.referral || "",
                portfolioLink: foundLetter.additional?.portfolioLink || "",
                availableFrom: foundLetter.additional?.availableFrom || "",
                salaryExpectation:
                  foundLetter.additional?.salaryExpectation || "",
              },
              id: foundLetter.id,
              title: foundLetter.title,
            });
          }
        }
      } catch (error) {
        console.error("Error loading cover letter:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadCoverLetter();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  // Auto-save to localStorage
  useEffect(() => {
    if (!isLoading && id) {
      const saveTimeout = setTimeout(() => {
        // Save to individual letter storage
        localStorage.setItem(`coverLetter-${id}`, JSON.stringify(letterData));

        // Also update the main coverLetters array
        const savedLetters = localStorage.getItem("coverLetters");
        let allLetters = savedLetters ? JSON.parse(savedLetters) : [];

        const existingIndex = allLetters.findIndex(
          (l: any) => l.id === parseInt(id),
        );
        const updatedLetter = {
          id: parseInt(id),
          title: letterData.letter.position || "Untitled Cover Letter",
          company: letterData.recipient.companyName,
          personalInfo: letterData.personalInfo,
          recipient: letterData.recipient,
          letter: letterData.letter,
          additional: letterData.additional,
          updatedAt: new Date().toISOString(),
        };

        if (existingIndex >= 0) {
          allLetters[existingIndex] = updatedLetter;
        } else {
          allLetters.push(updatedLetter);
        }

        localStorage.setItem("coverLetters", JSON.stringify(allLetters));
        setSaveStatus("saved");
      }, 500);

      setSaveStatus("saving");
      return () => clearTimeout(saveTimeout);
    }
  }, [letterData, id, isLoading]);

  const updatePersonalInfo = (field: string, value: string) =>
    setLetterData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));

  const updateRecipient = (field: string, value: string) =>
    setLetterData((prev) => ({
      ...prev,
      recipient: { ...prev.recipient, [field]: value },
    }));

  const updateLetter = (field: string, value: string) =>
    setLetterData((prev) => ({
      ...prev,
      letter: { ...prev.letter, [field]: value },
    }));

  const updateAdditional = (field: string, value: string) =>
    setLetterData((prev) => ({
      ...prev,
      additional: { ...prev.additional, [field]: value },
    }));

  const getAISuggestion = (field: string) => {
    const position = letterData.letter.position || "[Position]";
    const company = letterData.recipient.companyName || "[Company]";
    let suggestion = "";
    if (field === "opening") {
      suggestion = aiSuggestions.openings[
        Math.floor(Math.random() * aiSuggestions.openings.length)
      ]
        .replace("[Position]", position)
        .replace("[Company]", company);
    } else if (field === "body") {
      suggestion =
        aiSuggestions.bodyParagraphs[
          Math.floor(Math.random() * aiSuggestions.bodyParagraphs.length)
        ];
    } else if (field === "closing") {
      suggestion = aiSuggestions.closings[
        Math.floor(Math.random() * aiSuggestions.closings.length)
      ].replace("[Company]", company);
    }
    updateLetter(field, suggestion);
  };

  const exportToPDF = async () => {
    console.log("Starting PDF export...");

    const tempContainer = document.createElement("div");
    tempContainer.style.position = "fixed";
    tempContainer.style.top = "0";
    tempContainer.style.left = "0";
    tempContainer.style.width = "210mm";
    tempContainer.style.backgroundColor = "white";
    tempContainer.style.zIndex = "9999";
    tempContainer.style.padding = "20px";
    tempContainer.style.boxSizing = "border-box";

    document.body.appendChild(tempContainer);

    setIsExporting(true);
    try {
      const getSafeColor = (color: string) => {
        if (color.startsWith("#") || color.startsWith("rgb")) {
          return color;
        }
        if (color.includes("lab(") || color.includes("oklab(")) {
          const templateColorMap: { [key: string]: string } = {
            professional: "#1e293b",
            modern: "#3b82f6",
            creative: "#8b5cf6",
          };
          for (const [templateName, template] of Object.entries(
            letterTemplates,
          )) {
            if (template.primaryColor === color) {
              return templateColorMap[templateName] || "#000000";
            }
          }
          return "#000000";
        }
        return color.startsWith("#") ? color : "#000000";
      };

      const originalColor = letterTemplates[selectedTemplate].primaryColor;
      const safePrimaryColor = getSafeColor(originalColor);

      tempContainer.innerHTML = `
        <div style="font-family: ${letterTemplates[selectedTemplate].font}; color: #000; background: white; padding: 20px;">
          <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 10px;">
              <div>
                <h1 style="font-size: 20px; font-weight: bold; color: ${safePrimaryColor}; margin: 0;">
                  ${letterData.personalInfo.fullName || "Your Name"}
                </h1>
                ${letterData.personalInfo.title ? `<p style="font-size: 14px; color: #666; margin: 4px 0 0 0;">${letterData.personalInfo.title}</p>` : ""}
                <div style="display: flex; flex-direction: column; gap: 2px; margin-top: 8px; font-size: 14px; color: #666;">
                  ${letterData.personalInfo.email ? `<span>${letterData.personalInfo.email}</span>` : ""}
                  ${letterData.personalInfo.phone ? `<span>${letterData.personalInfo.phone}</span>` : ""}
                  ${letterData.personalInfo.location ? `<span>${letterData.personalInfo.location}</span>` : ""}
                </div>
              </div>
              <div style="font-size: 12px; color: #999; text-align: right;">
                ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>
          </div>

          <div style="margin-bottom: 30px; font-size: 14px; line-height: 1.6;">
            ${letterData.recipient.hiringManager ? `<div style="font-weight: bold;">${letterData.recipient.hiringManager}</div>` : ""}
            ${letterData.recipient.companyName ? `<div>${letterData.recipient.companyName}</div>` : ""}
            ${letterData.recipient.companyAddress ? `<div>${letterData.recipient.companyAddress}</div>` : ""}
          </div>

          ${letterData.letter.subject ? `<div style="margin-bottom: 20px; font-size: 14px; font-weight: bold;">RE: ${letterData.letter.subject}</div>` : ""}

          <div style="margin-bottom: 20px;">
            <p style="font-size: 14px; line-height: 1.6; margin: 0;">Dear ${letterData.recipient.hiringManager || "Hiring Manager"},</p>
          </div>

          ${letterData.letter.opening ? `<div style="margin-bottom: 15px;"><p style="font-size: 14px; line-height: 1.6; margin: 0;">${letterData.letter.opening}</p></div>` : ""}

          ${letterData.letter.body ? `<div style="margin-bottom: 15px;"><p style="font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${letterData.letter.body}</p></div>` : ""}

          ${letterData.letter.closing ? `<div style="margin-bottom: 20px;"><p style="font-size: 14px; line-height: 1.6; margin: 0;">${letterData.letter.closing}</p></div>` : ""}

          <div style="margin-top: 30px;">
            <p style="font-size: 14px; margin: 0;">Sincerely,</p>
            <p style="font-weight: bold; margin: 12px 0 0 0; font-size: 14px;">
              ${letterData.letter.signature || letterData.personalInfo.fullName || "Your Name"}
            </p>
          </div>
        </div>
      `;

      const letterElement = tempContainer.firstElementChild as HTMLElement;
      if (!letterElement) {
        throw new Error("Letter content not found");
      }

      const canvas = await html2canvas(letterElement, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        width: letterElement.scrollWidth,
        height: letterElement.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(
        `cover-letter-${letterData.personalInfo.fullName || "document"}.pdf`,
      );
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert(
        `Failed to export PDF: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`,
      );
    } finally {
      if (tempContainer && tempContainer.parentNode) {
        document.body.removeChild(tempContainer);
      }
      setIsExporting(false);
    }
  };

  // Calculate completion percentage
  const completionPercentage = (() => {
    let total = 0;
    let filled = 0;
    if (letterData.personalInfo.fullName) filled++;
    if (letterData.personalInfo.email) filled++;
    if (letterData.recipient.companyName) filled++;
    if (letterData.letter.position) filled++;
    if (letterData.letter.opening) filled++;
    if (letterData.letter.body) filled++;
    total = 6;
    return Math.round((filled / total) * 100);
  })();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cover letter...</p>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalInfoSection
            data={letterData.personalInfo}
            onUpdate={updatePersonalInfo}
          />
        );
      case "company":
        return (
          <CompanySection
            data={letterData.recipient}
            onUpdate={updateRecipient}
          />
        );
      case "letter":
        return (
          <LetterSection
            data={letterData.letter}
            onUpdate={updateLetter}
            onAISuggest={getAISuggestion}
          />
        );
      case "additional":
        return (
          <AdditionalSection
            data={letterData.additional}
            onUpdate={updateAdditional}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header with back button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {letterData.letter.position || "Cover Letter Builder"}
              </h1>
              {letterData.recipient.companyName && (
                <p className="text-gray-500 mt-1">
                  for {letterData.recipient.companyName}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {saveStatus === "saving" && (
                <span className="text-xs text-gray-500">Saving...</span>
              )}
              {saveStatus === "saved" && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Saved
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            {mobileMenuOpen ? "Hide Menu" : "Show Menu"}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className={mobileMenuOpen ? "block" : "hidden lg:block"}>
            <SidebarNav
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              completionPercentage={completionPercentage}
              label={"Cover Letter Builder"}
              letterTemplates={letterTemplates}
              navItems={navItems}
              currentView={() => {
                setShowPreview((prev) => false);
              }}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6 min-w-0">
            {/* Template Selector Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex gap-2">
                {Object.entries(letterTemplates).map(([key, template]) => (
                  <Button
                    key={key}
                    variant={selectedTemplate === key ? "default" : "outline"}
                    onClick={() =>
                      setSelectedTemplate(key as keyof typeof letterTemplates)
                    }
                    className="gap-2 cursor-pointer"
                    size="sm"
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview((prev) => !prev)}
                >
                  {showPreview ? (
                    <div className="flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit Letter
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Live Preview
                    </div>
                  )}
                </Button>
                <Button
                  className="cursor-pointer gap-2"
                  onClick={exportToPDF}
                  disabled={isExporting}
                  size="sm"
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

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              {showPreview ? (
                <Card className="lg:sticky px-4 lg:px-12 top-6 h-[calc(100vh-160px)]">
                  <div className="bg-white/90 rounded-xl py-4 h-full overflow-auto no-scrollbar">
                    <div className="flex items-center justify-between px-4 mb-3">
                      <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Live Preview
                      </h3>
                    </div>
                    <div ref={previewRef}>
                      <LivePreview
                        data={letterData}
                        template={selectedTemplate}
                      />
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-6 shadow-lg border-gray-200">
                  <ScrollArea className="h-[calc(100vh-280px)] pr-4">
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
