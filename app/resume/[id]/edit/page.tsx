// app/resume/[id]/edit/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import ResumeEditor from "./ResumeEditor";
import { ResumeData } from "@/types/resume";

export default function ResumeEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load resume data
  useEffect(() => {
    const loadResume = async () => {
      try {
        const savedResumes = localStorage.getItem("resumeData");
        if (savedResumes) {
          const resumesArray: ResumeData[] = JSON.parse(savedResumes);
          const found = resumesArray.find((r) => r.id === id);
          if (found) {
            setResumeData(found);
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
    }
  }, [id]);

  const handleSave = async (content: string) => {
    if (!resumeData) return;

    setIsSaving(true);
    try {
      const updatedResume = {
        ...resumeData,
        personalInfo: {
          ...resumeData.personalInfo,
          summary: content,
        },
      };

      // Update in localStorage
      const savedResumes = localStorage.getItem("resumeData");
      let resumesArray = savedResumes ? JSON.parse(savedResumes) : [];

      const existingIndex = resumesArray.findIndex((r: any) => r.id === id);
      if (existingIndex >= 0) {
        resumesArray[existingIndex] = updatedResume;
      } else {
        resumesArray.push(updatedResume);
      }

      localStorage.setItem("resumeData", JSON.stringify(resumesArray));
      setResumeData(updatedResume);

      // Show success message
      // alert("Resume saved successfully!");
    } catch (error) {
      console.error("Error saving:", error);
      // alert("Error saving resume");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Resume not found</h2>
          <Link href="/dashboard">
            <Button>Go Back</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href={`/resume/${id}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Resume
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Advanced Resume Editor</h1>
              <p className="text-gray-500 text-sm">
                Edit your resume with rich text formatting
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/resume/${id}`}>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </Link>
            <Button
              onClick={() =>
                handleSave(String(resumeData?.personalInfo?.summary))
              }
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {/* Editor */}
        <Card className="p-6">
          <ResumeEditor
            initialContent={resumeData.personalInfo.summary}
            onSave={handleSave}
            resumeData={resumeData}
          />
        </Card>
      </div>
    </div>
  );
}
