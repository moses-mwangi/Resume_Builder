// "use client";

// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { ArrowLeft, Save, Eye, CheckCircle, RefreshCw } from "lucide-react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import FullResumeEditor from "./FullResumeEditor";
// import { ResumeData } from "@/types/resume";

// export const resumeTemplates = {
//   modern: {
//     name: "Modern",
//     primaryColor: "#3b82f6",
//     secondaryColor: "#1e293b",
//     font: "Arial, sans-serif",
//     spacing: "comfortable",
//   },
//   classic: {
//     name: "Classic",
//     primaryColor: "#1e293b",
//     secondaryColor: "#475569",
//     font: "Georgia",
//     spacing: "compact",
//   },
//   creative: {
//     name: "Creative",
//     primaryColor: "#8b5cf6",
//     secondaryColor: "#ec4899",
//     font: "Poppins",
//     spacing: "relaxed",
//   },
// };

// type HeaderStyle = "side-by-side" | "centered";

// export default function FullResumeEditPage() {
//   const params = useParams();
//   const router = useRouter();
//   const id = params.id as string;

//   const [resumeData, setResumeData] = useState<ResumeData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">(
//     "saved",
//   );
//   const [selectedTemplate, setSelectedTemplate] =
//     useState<keyof typeof resumeTemplates>("modern");
//   const [headerStyle, setHeaderStyle] = useState<HeaderStyle>("side-by-side");

//   // Load resume data
//   useEffect(() => {
//     const loadResume = async () => {
//       try {
//         const savedResumes = localStorage.getItem("resumeData");
//         if (savedResumes) {
//           const resumesArray: ResumeData[] = JSON.parse(savedResumes);
//           const found = resumesArray.find((r) => r.id === id);
//           if (found) {
//             setResumeData(found);
//           }
//         }

//         // Load saved template and header style from localStorage
//         const savedTemplate = localStorage.getItem(`resume-template-${id}`);
//         if (savedTemplate && savedTemplate in resumeTemplates) {
//           setSelectedTemplate(savedTemplate as keyof typeof resumeTemplates);
//         }

//         const savedHeaderStyle = localStorage.getItem(
//           `resume-header-style-${id}`,
//         );
//         if (
//           savedHeaderStyle === "side-by-side" ||
//           savedHeaderStyle === "centered"
//         ) {
//           setHeaderStyle(savedHeaderStyle);
//         }
//       } catch (error) {
//         console.error("Error loading resume:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) {
//       loadResume();
//     }
//   }, [id]);

//   const handleSave = async (content: string) => {
//     if (!resumeData) return;

//     setIsSaving(true);
//     setSaveStatus("saving");

//     try {
//       // Save the custom HTML content
//       const updatedResume = {
//         ...resumeData,
//         customHtmlContent: content,
//         lastEdited: Date.now(),
//       };

//       // Update in localStorage
//       const savedResumes = localStorage.getItem("resumeData");
//       let resumesArray = savedResumes ? JSON.parse(savedResumes) : [];

//       const existingIndex = resumesArray.findIndex((r: any) => r.id === id);
//       if (existingIndex >= 0) {
//         resumesArray[existingIndex] = updatedResume;
//       } else {
//         resumesArray.push(updatedResume);
//       }

//       localStorage.setItem("resumeData", JSON.stringify(resumesArray));
//       setResumeData(updatedResume);
//       setSaveStatus("saved");

//       setTimeout(() => {
//         setSaveStatus("saved");
//       }, 2000);
//     } catch (error) {
//       console.error("Error saving:", error);
//       setSaveStatus("error");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Save template and header style preferences
//   const updateTemplate = (template: keyof typeof resumeTemplates) => {
//     setSelectedTemplate(template);
//     localStorage.setItem(`resume-template-${id}`, template);
//   };

//   const updateHeaderStyle = (style: HeaderStyle) => {
//     setHeaderStyle(style);
//     localStorage.setItem(`resume-header-style-${id}`, style);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!resumeData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Resume not found</h2>
//           <Link href="/dashboard">
//             <Button>Go Back</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-6">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
//           <div className="flex items-center gap-4">
//             <Link href={`/resume/${id}`}>
//               <Button variant="outline" size="sm">
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back to Builder
//               </Button>
//             </Link>
//             <div>
//               <h1 className="text-2xl font-bold">Full Resume Editor</h1>
//               <p className="text-gray-500 text-sm">
//                 Edit your entire resume with rich text formatting
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             {/* Save Status */}
//             <Badge
//               variant={
//                 saveStatus === "saved"
//                   ? "outline"
//                   : saveStatus === "saving"
//                     ? "secondary"
//                     : "destructive"
//               }
//               className="gap-1"
//             >
//               {saveStatus === "saved" && (
//                 <>
//                   <CheckCircle className="w-3 h-3" /> Saved
//                 </>
//               )}
//               {saveStatus === "saving" && (
//                 <>
//                   <RefreshCw className="w-3 h-3 animate-spin" /> Saving...
//                 </>
//               )}
//               {saveStatus === "error" && (
//                 <>
//                   <span className="text-red-600">Error saving</span>
//                 </>
//               )}
//             </Badge>

//             <Link href={`/resume/${id}`}>
//               <Button variant="outline">
//                 <Eye className="w-4 h-4 mr-2" />
//                 Preview
//               </Button>
//             </Link>
//           </div>
//         </div>

//         {/* Template and Style Controls */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 mb-6 flex items-center justify-between flex-wrap gap-3">
//           <div className="flex gap-2 flex-wrap items-center">
//             <span className="text-sm text-gray-500 mr-2">Template:</span>
//             {Object.entries(resumeTemplates).map(([key, template]) => (
//               <Button
//                 key={key}
//                 variant={selectedTemplate === key ? "default" : "outline"}
//                 onClick={() =>
//                   updateTemplate(key as keyof typeof resumeTemplates)
//                 }
//                 size="sm"
//               >
//                 {template.name}
//               </Button>
//             ))}
//           </div>
//           <div className="flex gap-2 items-center">
//             <span className="text-sm text-gray-500 mr-2">Header Style:</span>
//             <Button
//               variant={headerStyle === "side-by-side" ? "default" : "outline"}
//               onClick={() => updateHeaderStyle("side-by-side")}
//               size="sm"
//             >
//               Side by Side
//             </Button>
//             <Button
//               variant={headerStyle === "centered" ? "default" : "outline"}
//               onClick={() => updateHeaderStyle("centered")}
//               size="sm"
//             >
//               Centered
//             </Button>
//           </div>
//         </div>

//         {/* Editor */}
//         <Card className="p-6">
//           <FullResumeEditor
//             resumeData={resumeData}
//             onSave={handleSave}
//             template={selectedTemplate}
//             headerStyle={headerStyle}
//           />
//         </Card>
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function page() {
  return <div>page</div>;
}
