// // "use client";

// // import { useState, useEffect, useRef } from "react";
// // import { motion, AnimatePresence, color } from "framer-motion";
// // import {
// //   FileText,
// //   Download,
// //   Printer,
// //   Eye,
// //   Edit,
// //   Sparkles,
// //   CheckCircle,
// //   User,
// //   Building,
// //   Mail,
// //   Phone,
// //   MapPin,
// //   RefreshCw,
// //   Star,
// //   Zap,
// //   ChevronRight,
// //   ChevronLeft,
// //   MessageSquare,
// //   Settings,
// //   Check,
// //   Save,
// //   LayoutTemplate,
// //   Send,
// //   Award,
// //   Briefcase,
// //   Globe,
// //   FolderOpen,
// //   Wrench,
// // } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Label } from "@/components/ui/label";
// // import { Card } from "@/components/ui/card";
// // import { Progress } from "@/components/ui/progress";
// // import { Badge } from "@/components/ui/badge";
// // import { ScrollArea } from "@/components/ui/scroll-area";
// // import { Separator } from "@/components/ui/separator";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import html2canvas from "html2canvas";
// // import jsPDF from "jspdf";
// // import { cn } from "@/lib/utils";
// // import { Certificate } from "crypto";
// // import { PersonalInfo } from "@/types/resume";
// // import RichTextEditors from "../test/RichTextEditor";
// // import RichTextEditor from "../test/TextEditor";
// // import { SkillsForm } from "./SkillsForm";

// // export interface CoverLetterData {
// //   personalInfo: PersonalInfo;
// //   recipient: {
// //     companyName: string;
// //     hiringManager: string;
// //     companyAddress: string;
// //     recipientEmail: string;
// //     address?: Address;
// //   };
// //   letter: {
// //     position: string;
// //     subject: string;
// //     opening: string;
// //     body: string;
// //     closing: string;
// //     signature: string;
// //   };
// //   additional: {
// //     referral: string;
// //     portfolioLink: string;
// //     availableFrom: string;
// //     salaryExpectation: string;
// //   };
// //   // certificates: { name: string; institution: string; date: string }>;
// //   // skills: string[];
// //   // projects: { name: string; description: string; technologies: string[] }>;
// //   // languages: { name: string; proficiency: string }>;
// //   // experience: {
// //   //   company: string;
// //   //   position: string;
// //   //   startDate: string;
// //   //   endDate: string;
// //   //   description: string;
// //   // }>;
// //   // education: {
// //   //   institution: string;
// //   //   degree: string;
// //   //   startDate: string;
// //   //   endDate: string;
// //   //   description: string;
// //   // }>;

// //   certificates: { name: string; institution: string; date: string };
// //   skills: string[];
// //   projects: { name: string; description: string; technologies: string[] };
// //   languages: { name: string; proficiency: string };
// //   experience: {
// //     company: string;
// //     position: string;
// //     startDate: string;
// //     endDate: string;
// //     description: string;
// //   };
// //   education: {
// //     institution: string;
// //     degree: string;
// //     startDate: string;
// //     endDate: string;
// //     description: string;
// //   };
// // }

// // export interface Address {
// //   street: string;
// //   city: string;
// //   state: string;
// //   zip: string;
// //   line1: string;
// //   line2: string;
// //   cityStateZip: string;
// //   country: string;
// // }

// // // Templates
// // export const letterTemplates = {
// //   professional: {
// //     name: "Professional",
// //     primaryColor: "#1e293b",
// //     font: "Inter",
// //     spacing: "comfortable",
// //     layout: "standard",
// //     preview: "bg-gradient-to-br from-gray-800 to-gray-900",
// //   },
// //   modern: {
// //     name: "Modern",
// //     primaryColor: "#3b82f6",
// //     font: "Poppins",
// //     spacing: "relaxed",
// //     layout: "minimal",
// //     preview: "bg-gradient-to-br from-blue-600 to-indigo-600",
// //   },
// //   creative: {
// //     name: "Creative",
// //     primaryColor: "#8b5cf6",
// //     font: "Plus Jakarta Sans",
// //     spacing: "relaxed",
// //     layout: "bold",
// //     preview: "bg-gradient-to-br from-purple-600 to-pink-600",
// //   },
// // };

// // // AI Suggestions
// // export const aiSuggestions = {
// //   openings: [
// //     "I am writing to express my strong interest in the [Position] position at [Company].",
// //     "As a passionate [Industry] professional with [X] years of experience, I was thrilled to see the opening for [Position] at [Company].",
// //     "Your company's recent work in [Project/Area] caught my attention and inspired me to apply for the [Position] role.",
// //   ],
// //   closings: [
// //     "Thank you for considering my application. I look forward to discussing how my skills can benefit your team.",
// //     "I would welcome the opportunity to discuss how my experience aligns with your needs in an interview.",
// //   ],
// //   bodyParagraphs: [
// //     "In my current role, I have successfully delivered impactful projects resulting in measurable improvements. This experience has prepared me well to contribute to your team's success.",
// //     "My background includes expertise in modern technologies and best practices, which I believe would be valuable for your upcoming initiatives.",
// //   ],
// // };

// // // Types
// // // Sidebar Navigation
// // const SidebarNav = ({
// //   activeSection,
// //   onSectionChange,
// //   completionPercentage,
// // }: {
// //   activeSection: string;
// //   onSectionChange: (section: string) => void;
// //   completionPercentage: number;
// // }) => {
// //   const navItems = [
// //     { id: "personal", name: "Personal Info", icon: User, color: "blue" },
// //     { id: "company", name: "Company Details", icon: Building, color: "purple" },
// //     {
// //       id: "letter",
// //       name: "Letter Content",
// //       icon: MessageSquare,
// //       color: "green",
// //     },
// //     {
// //       id: "additional",
// //       name: "Additional Info",
// //       icon: Settings,
// //       color: "orange",
// //     },
// //     {
// //       id: "certificates",
// //       name: "Certificates",
// //       icon: Award,
// //       color: "yellow",
// //     },
// //     {
// //       id: "experience",
// //       name: "Experience",
// //       icon: Briefcase,
// //       color: "teal",
// //       // component: "experience",
// //     },
// //     {
// //       id: "skills",
// //       name: "Skills",
// //       icon: Wrench,
// //       color: "green",
// //     },
// //     {
// //       id: "projects",
// //       name: "Projects",
// //       icon: FolderOpen,
// //       color: "blue",
// //     },

// //     {
// //       id: "languages",
// //       name: "Languages",
// //       icon: Globe,
// //       color: "indigo",
// //     },
// //   ];

// //   return (
// //     <div className="w-72 bg-white rounded-2xl overflow-auto pb-22 shadow-lg border border-gray-200 p-4 sticky top-6 max-h-[calc(100vh-3rem)]">
// //       <div className="flex flex-col h-full">
// //         {/* Logo/Header */}
// //         <div className="mb-6 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
// //           <div className="flex items-center gap-2 text-white">
// //             <FileText className="w-5 h-5" />
// //             <span className="font-semibold">Resume/CV Builder</span>
// //           </div>
// //         </div>

// //         {/* Progress */}
// //         <div className="mb-6">
// //           <div className="flex justify-between text-sm mb-2">
// //             <span className="text-gray-600">Completion</span>
// //             <span className="font-semibold text-blue-600">
// //               {completionPercentage}%
// //             </span>
// //           </div>
// //           <Progress value={completionPercentage} className="h-[6px]" />
// //         </div>

// //         {/* Navigation Items */}
// //         <ScrollArea className="flex-1">
// //           <div className="space-y-1">
// //             {navItems.map((item) => {
// //               const Icon = item.icon;
// //               const isActive = activeSection === item.id;
// //               const colorClasses = {
// //                 blue: isActive
// //                   ? "bg-blue-50 text-blue-600 border-blue-200"
// //                   : "hover:bg-gray-50",
// //                 purple: isActive
// //                   ? "bg-purple-50 text-purple-600 border-purple-200"
// //                   : "hover:bg-gray-50",
// //                 green: isActive
// //                   ? "bg-green-50 text-green-600 border-green-200"
// //                   : "hover:bg-gray-50",
// //                 orange: isActive
// //                   ? "bg-orange-50 text-orange-600 border-orange-200"
// //                   : "hover:bg-gray-50",
// //                 yellow: isActive
// //                   ? "bg-yellow-50 text-yellow-600 border-yellow-200"
// //                   : "hover:bg-gray-50",
// //                 teal: isActive
// //                   ? "bg-teal-50 text-teal-600 border-teal-200"
// //                   : "hover:bg-gray-50",
// //                 indigo: isActive
// //                   ? "bg-indigo-50 text-indigo-600 border-indigo-200"
// //                   : "hover:bg-gray-50",
// //               };

// //               return (
// //                 <button
// //                   key={item.id}
// //                   onClick={() => onSectionChange(item.id)}
// //                   className={cn(
// //                     "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 border border-transparent",
// //                     colorClasses[item.color as keyof typeof colorClasses],
// //                     isActive && "shadow-sm",
// //                   )}
// //                 >
// //                   <Icon className="w-4 h-4" />
// //                   <span className="text-sm font-medium flex-1 text-left">
// //                     {item.name}
// //                   </span>
// //                   {isActive && <ChevronRight className="w-3 h-3" />}
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         </ScrollArea>

// //         {/* Template Selector */}
// //         <div className="mt-6 pt-4 border-t border-gray-200">
// //           <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
// //             <LayoutTemplate className="w-3 h-3" />
// //             Template
// //           </p>
// //           <div className="grid grid-cols-3 gap-2">
// //             {Object.entries(letterTemplates).map(([key, template]) => (
// //               <button
// //                 key={key}
// //                 className="text-center group"
// //                 onClick={() => {}}
// //               >
// //                 <div
// //                   className={`h-12 rounded-lg ${template.preview} mb-1 group-hover:scale-105 transition-transform`}
// //                 />
// //                 <span className="text-xs text-gray-600">{template.name}</span>
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="mt-6 pt-4 border-t border-gray-200">
// //           <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
// //             <LayoutTemplate className="w-3 h-3" />
// //             Template
// //           </p>
// //           <div className="grid grid-cols-3 gap-2">
// //             {Object.entries(letterTemplates).map(([key, template]) => (
// //               <button
// //                 key={key}
// //                 className="text-center group"
// //                 onClick={() => {}}
// //               >
// //                 <div
// //                   className={`h-12 rounded-lg ${template.preview} mb-1 group-hover:scale-105 transition-transform`}
// //                 />
// //                 <span className="text-xs text-gray-600">{template.name}</span>
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="mt-6 pt-4 border-t border-gray-200">
// //           <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
// //             <LayoutTemplate className="w-3 h-3" />
// //             Template
// //           </p>
// //           <div className="grid grid-cols-3 gap-2">
// //             {Object.entries(letterTemplates).map(([key, template]) => (
// //               <button
// //                 key={key}
// //                 className="text-center group"
// //                 onClick={() => {}}
// //               >
// //                 <div
// //                   className={`h-12 rounded-lg ${template.preview} mb-1 group-hover:scale-105 transition-transform`}
// //                 />
// //                 <span className="text-xs text-gray-600">{template.name}</span>
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Save Status */}
// //         <div className="mt-4 pt-4 pb-8 border-t border-gray-200">
// //           <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
// //             <Save className="w-3 h-3" />
// //             <span>Auto-saving</span>
// //             <CheckCircle className="w-3 h-3 text-green-500" />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Real-time Preview Component
// // const LivePreview = ({
// //   data,
// //   template,
// // }: {
// //   data: CoverLetterData;
// //   template: keyof typeof letterTemplates;
// // }) => {
// //   const style = letterTemplates[template];
// //   const currentDate = new Date().toLocaleDateString("en-US", {
// //     year: "numeric",
// //     month: "long",
// //     day: "numeric",
// //   });

// //   const hasContent =
// //     data.personalInfo.fullName ||
// //     data.recipient.companyName ||
// //     data.letter.opening;

// //   if (!hasContent) {
// //     return (
// //       <div className="h-full flex items-center justify-center text-center p-8">
// //         <div>
// //           <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
// //           <h3 className="text-gray-500 font-medium">
// //             Start filling in your details
// //           </h3>
// //           <p className="text-sm text-gray-400 mt-1">
// //             Your cover letter preview will appear here
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       <div
// //         className="bg-white shadow-lg overflow-hidden border border-gray-200"
// //         style={{ fontFamily: style.font }}
// //       >
// //         <div className="px-11 py-8">
// //           <div className="mb-6">
// //             <div className="flex justify-between items-start flex-wrap gap-4">
// //               <div>
// //                 <h1
// //                   className="text-xl font-bold"
// //                   style={{ color: style.primaryColor }}
// //                 >
// //                   {data.personalInfo.fullName || "Your Name"}
// //                 </h1>
// //                 {data.personalInfo.title && (
// //                   <p className="text-sm text-gray-500 mt-1">
// //                     {data.personalInfo.title}
// //                   </p>
// //                 )}
// //                 <div className="flex flex-col flex-wrap gap-2 mt-2 text-xs text-gray-500">
// //                   {data.personalInfo.email && (
// //                     <span className="text-sm font-medium ">
// //                       {data.personalInfo.email}
// //                     </span>
// //                   )}
// //                   {data.personalInfo.phone && (
// //                     // <span>• {data.personalInfo.phone}</span>
// //                     <span className="text-sm font-medium ">
// //                       {data.personalInfo.phone}
// //                     </span>
// //                   )}
// //                   {data.personalInfo.location && (
// //                     <span className="text-sm font-medium ">
// //                       {data.personalInfo.location}
// //                     </span>
// //                   )}
// //                 </div>
// //               </div>
// //               <div className="text-right text-xs text-gray-400">
// //                 {currentDate}
// //               </div>
// //             </div>
// //           </div>

// //           <div className="mb-8 text-sm leading-relaxed">
// //             {data.recipient.hiringManager && (
// //               <div className="font-semibold">
// //                 {data.recipient.hiringManager}
// //               </div>
// //             )}
// //             {data.recipient.companyName && (
// //               <div>{data.recipient.companyName}</div>
// //             )}
// //             {data.recipient.address?.line1 && (
// //               <div>{data.recipient.address.line1}</div>
// //             )}
// //             {data.recipient?.companyAddress && (
// //               <div>{data?.recipient?.companyAddress}</div>
// //             )}
// //             {data.recipient.address?.line2 && (
// //               <div>{data.recipient.address.line2}</div>
// //             )}
// //             {data.recipient.address?.cityStateZip && (
// //               <div>{data.recipient.address.cityStateZip}</div>
// //             )}
// //           </div>

// //           {/* Subject line (optional but professional) */}
// //           {data.letter.subject && (
// //             <div className="mb-6 text-sm font-semibold">
// //               RE: {data.letter.subject}
// //             </div>
// //           )}

// //           {/* Salutation */}
// //           <div className="mb-6">
// //             <p>Dear {data.recipient.hiringManager || "Hiring Manager"},</p>
// //           </div>

// //           {data.letter.opening && (
// //             <div className="mb-3">
// //               <p className="text-sm leading-relaxed">{data.letter.opening}</p>
// //             </div>
// //           )}

// //           {data.letter.body && (
// //             <div className="mb-3">
// //               <p className="text-sm leading-relaxed whitespace-pre-wrap">
// //                 {data.letter.body}
// //               </p>
// //             </div>
// //           )}

// //           {data.letter.closing && (
// //             <div className="mb-4">
// //               <p className="text-sm leading-relaxed">{data.letter.closing}</p>
// //             </div>
// //           )}

// //           <div className="mt-6">
// //             <p className="text-sm">Sincerely,</p>
// //             <p className="font-medium mt-3 text-sm">
// //               {data.letter.signature ||
// //                 data.personalInfo.fullName ||
// //                 "Your Name"}
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Form Sections
// // const PersonalInfoSection = ({
// //   data,
// //   onUpdate,
// // }: {
// //   data: any;
// //   onUpdate: (field: string, value: string) => void;
// // }) => (
// //   <div className="space-y-4">
// //     <div>
// //       <h3 className="text-lg font-semibold flex items-center gap-2">
// //         <User className="w-5 h-5 text-blue-600" />
// //         Personal Information
// //       </h3>
// //       <p className="text-sm text-gray-500 mt-1">Tell us about yourself</p>
// //     </div>
// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //       <div className="md:col-span-1">
// //         <Label>Full Name *</Label>
// //         <Input
// //           value={data.fullName}
// //           onChange={(e) => onUpdate("fullName", e.target.value)}
// //           placeholder="John Doe"
// //         />
// //       </div>
// //       <div>
// //         <Label>Professional Title</Label>
// //         <Input
// //           value={data.title}
// //           onChange={(e) => onUpdate("title", e.target.value)}
// //           placeholder="Senior Software Engineer"
// //         />
// //       </div>
// //       <div>
// //         <Label>Email *</Label>
// //         <Input
// //           type="email"
// //           value={data.email}
// //           onChange={(e) => onUpdate("email", e.target.value)}
// //           placeholder="john@example.com"
// //         />
// //       </div>
// //       <div>
// //         <Label>Phone</Label>
// //         <Input
// //           value={data.phone}
// //           onChange={(e) => onUpdate("phone", e.target.value)}
// //           placeholder="+1 (555) 123-4567"
// //         />
// //       </div>
// //       <div>
// //         <Label>Location</Label>
// //         <Input
// //           value={data.location}
// //           onChange={(e) => onUpdate("location", e.target.value)}
// //           placeholder="New York, NY"
// //         />
// //       </div>
// //       <div>
// //         <Label>Website</Label>
// //         <Input
// //           value={data.website}
// //           onChange={(e) => onUpdate("website", e.target.value)}
// //           placeholder="https://yourwebsite.com"
// //         />
// //       </div>
// //       <div>
// //         <Label>LinkedIn</Label>
// //         <Input
// //           value={data.linkedin}
// //           onChange={(e) => onUpdate("linkedin", e.target.value)}
// //           placeholder="https://linkedin.com/in/username"
// //         />
// //       </div>
// //       <div>
// //         <Label>Github</Label>
// //         <Input
// //           value={data.github}
// //           onChange={(e) => onUpdate("github", e.target.value)}
// //           placeholder="https://github.com/username"
// //         />
// //       </div>
// //       <div className="col-span-2">
// //         <RichTextEditor data={data} onUpdate={onUpdate} />
// //         <RichTextEditor data={data} onUpdate={onUpdate} />
// //       </div>
// //     </div>
// //   </div>
// // );

// // const CompanySection = ({
// //   data,
// //   onUpdate,
// // }: {
// //   data: any;
// //   onUpdate: (field: string, value: string) => void;
// // }) => (
// //   <div className="space-y-4">
// //     <div>
// //       <h3 className="text-lg font-semibold flex items-center gap-2">
// //         <Building className="w-5 h-5 text-purple-600" />
// //         Company Details
// //       </h3>
// //       <p className="text-sm text-gray-500 mt-1">Who are you writing to?</p>
// //     </div>
// //     <div className="grid grid-cols-1 gap-4">
// //       <div>
// //         <Label>Company Name *</Label>
// //         <Input
// //           value={data.companyName}
// //           onChange={(e) => onUpdate("companyName", e.target.value)}
// //           placeholder="Company Name"
// //         />
// //       </div>
// //       <div>
// //         <Label>Hiring Manager Name</Label>
// //         <Input
// //           value={data.hiringManager}
// //           onChange={(e) => onUpdate("hiringManager", e.target.value)}
// //           placeholder="Jane Smith"
// //         />
// //       </div>
// //       <div>
// //         <Label>Company Address</Label>
// //         <Input
// //           value={data.companyAddress}
// //           onChange={(e) => onUpdate("companyAddress", e.target.value)}
// //           placeholder="123 Business St, City, State 12345"
// //         />
// //       </div>
// //     </div>
// //   </div>
// // );

// // const LetterSection = ({
// //   data,
// //   onUpdate,
// //   onAISuggest,
// // }: {
// //   data: any;
// //   onUpdate: (field: string, value: string) => void;
// //   onAISuggest: (field: string) => void;
// // }) => (
// //   <div className="space-y-4">
// //     <div>
// //       <h3 className="text-lg font-semibold flex items-center gap-2">
// //         <MessageSquare className="w-5 h-5 text-green-600" />
// //         Letter Content
// //       </h3>
// //       <p className="text-sm text-gray-500 mt-1">Craft your message</p>
// //     </div>
// //     <div>
// //       <Label>Position Applying For *</Label>
// //       <Input
// //         value={data.position}
// //         onChange={(e) => onUpdate("position", e.target.value)}
// //         placeholder="Senior Frontend Developer"
// //       />
// //     </div>
// //     <div>
// //       <div className="flex justify-between items-center mb-2">
// //         <Label>Opening Paragraph</Label>
// //         <Button
// //           variant="ghost"
// //           size="sm"
// //           onClick={() => onAISuggest("opening")}
// //         >
// //           <Sparkles className="w-3 h-3 mr-1" />
// //           AI Suggest
// //         </Button>
// //       </div>
// //       <Textarea
// //         value={data.opening}
// //         onChange={(e) => onUpdate("opening", e.target.value)}
// //         placeholder="Introduce yourself..."
// //         rows={4}
// //       />
// //     </div>
// //     <div>
// //       <div className="flex justify-between items-center mb-2">
// //         <Label>Body Paragraphs</Label>
// //         <Button variant="ghost" size="sm" onClick={() => onAISuggest("body")}>
// //           <Sparkles className="w-3 h-3 mr-1" />
// //           AI Suggest
// //         </Button>
// //       </div>
// //       <Textarea
// //         value={data.body}
// //         onChange={(e) => onUpdate("body", e.target.value)}
// //         placeholder="Highlight your skills and experience..."
// //         rows={6}
// //       />
// //     </div>
// //     <div>
// //       <div className="flex justify-between items-center mb-2">
// //         <Label>Closing Paragraph</Label>
// //         <Button
// //           variant="ghost"
// //           size="sm"
// //           onClick={() => onAISuggest("closing")}
// //         >
// //           <Sparkles className="w-3 h-3 mr-1" />
// //           AI Suggest
// //         </Button>
// //       </div>
// //       <Textarea
// //         value={data.closing}
// //         onChange={(e) => onUpdate("closing", e.target.value)}
// //         placeholder="Thank the reader..."
// //         rows={3}
// //       />
// //     </div>
// //     <div>
// //       <Label>Signature</Label>
// //       <Input
// //         value={data.signature}
// //         onChange={(e) => onUpdate("signature", e.target.value)}
// //         placeholder="John Doe"
// //       />
// //     </div>
// //   </div>
// // );

// // const AdditionalSection = ({
// //   data,
// //   onUpdate,
// // }: {
// //   data: any;
// //   onUpdate: (field: string, value: string) => void;
// // }) => (
// //   <div className="space-y-4">
// //     <div>
// //       <h3 className="text-lg font-semibold flex items-center gap-2">
// //         <Settings className="w-5 h-5 text-orange-600" />
// //         Additional Information
// //       </h3>
// //       <p className="text-sm text-gray-500 mt-1">Optional details</p>
// //     </div>
// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //       <div>
// //         <Label>Referral Source</Label>
// //         <Input
// //           value={data.referral}
// //           onChange={(e) => onUpdate("referral", e.target.value)}
// //           placeholder="LinkedIn, Employee Referral, etc."
// //         />
// //       </div>
// //       <div>
// //         <Label>Portfolio/GitHub</Label>
// //         <Input
// //           value={data.portfolioLink}
// //           onChange={(e) => onUpdate("portfolioLink", e.target.value)}
// //           placeholder="https://github.com/username"
// //         />
// //       </div>
// //       <div>
// //         <Label>Available From</Label>
// //         <Input
// //           type="date"
// //           value={data.availableFrom}
// //           onChange={(e) => onUpdate("availableFrom", e.target.value)}
// //         />
// //       </div>
// //       <div>
// //         <Label>Salary Expectation</Label>
// //         <Input
// //           value={data.salaryExpectation}
// //           onChange={(e) => onUpdate("salaryExpectation", e.target.value)}
// //           placeholder="$80,000 - $100,000"
// //         />
// //       </div>
// //     </div>
// //   </div>
// // );

// // // Main Component
// // export default function CoverLetterBuilder() {
// //   const [letterData, setLetterData] = useState<CoverLetterData>({
// //     personalInfo: {
// //       fullName: "",
// //       email: "",
// //       phone: "",
// //       location: "",
// //       linkedin: "",
// //       portfolio: "",
// //       title: "",
// //       // summary: "",
// //     },
// //     recipient: {
// //       companyName: "",
// //       hiringManager: "",
// //       companyAddress: "",
// //       recipientEmail: "",
// //     },
// //     letter: {
// //       position: "",
// //       subject: "",
// //       opening: "",
// //       body: "",
// //       closing: "",
// //       signature: "",
// //     },
// //     additional: {
// //       referral: "",
// //       portfolioLink: "",
// //       availableFrom: "",
// //       salaryExpectation: "",
// //     },
// //     certificates: { name: "", institution: "", date: "" },
// //     skills: [],
// //     projects: { name: "", description: "", technologies: [] },
// //     languages: { name: "", proficiency: "" },
// //     experience: {
// //       company: "",
// //       position: "",
// //       startDate: "",
// //       endDate: "",
// //       description: "",
// //     },
// //     education: {
// //       institution: "",
// //       degree: "",
// //       startDate: "",
// //       endDate: "",
// //       description: "",
// //     },
// //   });

// //   const [activeSection, setActiveSection] = useState("personal");
// //   const [selectedTemplate, setSelectedTemplate] =
// //     useState<keyof typeof letterTemplates>("professional");
// //   const [isExporting, setIsExporting] = useState(false);
// //   const [exportSuccess, setExportSuccess] = useState(false);
// //   const [saveStatus, setSaveStatus] = useState<"saved" | "saving">("saved");
// //   const [showPreview, setShowPreview] = useState(false);
// //   const previewRef = useRef<HTMLDivElement>(null);

// //   // Calculate completion percentage
// //   const completionPercentage = (() => {
// //     let total = 0;
// //     let filled = 0;
// //     if (letterData.personalInfo.fullName) filled++;
// //     if (letterData.personalInfo.email) filled++;
// //     if (letterData.recipient.companyName) filled++;
// //     if (letterData.letter.position) filled++;
// //     if (letterData.letter.opening) filled++;
// //     if (letterData.letter.body) filled++;
// //     // if (letterData.letter.closing) filled++;
// //     // if (letterData.letter.signature) filled++;
// //     total = 6;
// //     return Math.round((filled / total) * 100);
// //   })();

// //   // Load/Save to localStorage
// //   useEffect(() => {
// //     const saved = localStorage.getItem("coverLetterData");
// //     if (saved) setLetterData(JSON.parse(saved));
// //   }, []);

// //   useEffect(() => {
// //     const saveTimeout = setTimeout(() => {
// //       localStorage.setItem("coverLetterData", JSON.stringify(letterData));
// //       setSaveStatus("saved");
// //     }, 500);
// //     setSaveStatus("saving");
// //     return () => clearTimeout(saveTimeout);
// //   }, [letterData]);

// //   const updatePersonalInfo = (field: string, value: string) =>
// //     setLetterData((prev) => ({
// //       ...prev,
// //       personalInfo: { ...prev.personalInfo, [field]: value },
// //     }));

// //   const updateRecipient = (field: string, value: string) =>
// //     setLetterData((prev) => ({
// //       ...prev,
// //       recipient: { ...prev.recipient, [field]: value },
// //     }));

// //   const updateLetter = (field: string, value: string) =>
// //     setLetterData((prev) => ({
// //       ...prev,
// //       letter: { ...prev.letter, [field]: value },
// //     }));

// //   const updateAdditional = (field: string, value: string) =>
// //     setLetterData((prev) => ({
// //       ...prev,
// //       additional: { ...prev.additional, [field]: value },
// //     }));

// //   const updateAdditionalData = (field: string, value: string) =>
// //     setLetterData((prev) => ({
// //       ...prev,
// //       experience: { ...prev.experience, [field]: value },
// //     }));

// //   const updateEducation = (field: string, value: string) =>
// //     setLetterData((prev) => ({
// //       ...prev,
// //       education: { ...prev.education, [field]: value },
// //     }));
// //   const updateCertificate = (field: string, value: string) =>
// //     setLetterData((prev) => ({
// //       ...prev,
// //       certificates: { ...prev.certificates, [field]: value },
// //     }));

// //   const updateSkills = (field: string, value: string) =>
// //     setLetterData((prev) => ({
// //       ...prev,
// //       skills: { ...prev.skills, [field]: value },
// //     }));

// //   const updateProjects = (field: string, value: string) =>
// //     setLetterData((prev) => ({
// //       ...prev,
// //       projects: { ...prev.projects, [field]: value },
// //     }));
// //   const updateLanguage = (field: string, value: string) =>
// //     setLetterData((prev) => ({
// //       ...prev,
// //       languages: { ...prev.languages, [field]: value },
// //     }));

// //   const getAISuggestion = (field: string) => {
// //     const position = letterData.letter.position || "[Position]";
// //     const company = letterData.recipient.companyName || "[Company]";
// //     let suggestion = "";
// //     if (field === "opening") {
// //       suggestion = aiSuggestions.openings[
// //         Math.floor(Math.random() * aiSuggestions.openings.length)
// //       ]
// //         .replace("[Position]", position)
// //         .replace("[Company]", company);
// //     } else if (field === "body") {
// //       suggestion =
// //         aiSuggestions.bodyParagraphs[
// //           Math.floor(Math.random() * aiSuggestions.bodyParagraphs.length)
// //         ];
// //     } else if (field === "closing") {
// //       suggestion = aiSuggestions.closings[
// //         Math.floor(Math.random() * aiSuggestions.closings.length)
// //       ].replace("[Company]", company);
// //     }
// //     updateLetter(field, suggestion);
// //   };

// //   const exportToPDF = async () => {
// //     if (!previewRef.current) return;
// //     setIsExporting(true);
// //     try {
// //       const canvas = await html2canvas(previewRef.current, {
// //         scale: 2,
// //         backgroundColor: "#ffffff",
// //       });
// //       const imgData = canvas.toDataURL("image/png");
// //       const pdf = new jsPDF({
// //         orientation: "portrait",
// //         unit: "mm",
// //         format: "a4",
// //       });
// //       const imgWidth = 190;
// //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
// //       pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
// //       pdf.save(
// //         `cover-letter-${letterData.personalInfo.fullName || "document"}.pdf`,
// //       );
// //       setExportSuccess(true);
// //       setTimeout(() => setExportSuccess(false), 3000);
// //     } catch (error) {
// //       console.error("Error:", error);
// //     } finally {
// //       setIsExporting(false);
// //     }
// //   };

// //   const renderSection = () => {
// //     switch (activeSection) {
// //       case "personal":
// //         return (
// //           <PersonalInfoSection
// //             data={letterData.personalInfo}
// //             onUpdate={updatePersonalInfo}
// //           />
// //         );
// //       case "company":
// //         return (
// //           <>
// //             <SkillsForms
// //               skills={resumeData.skills}
// //               onUpdate={updateSkill}
// //               onDelete={deleteSkill}
// //               onAdd={addSkill}
// //             />
// //             <CompanySection
// //               data={letterData.recipient}
// //               onUpdate={updateRecipient}
// //             />
// //           </>
// //         );
// //       case "letter":
// //         return (
// //           <LetterSection
// //             data={letterData.letter}
// //             onUpdate={updateLetter}
// //             onAISuggest={getAISuggestion}
// //           />
// //         );
// //       case "additional":
// //         return (
// //           <AdditionalSection
// //             data={letterData.additional}
// //             onUpdate={updateAdditional}
// //           />
// //         );
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// //       <div className="container mx-auto px-4 py-6">
// //         <div className="flex gap-6">
// //           {/* Sidebar */}

// //           <SidebarNav
// //             activeSection={activeSection}
// //             onSectionChange={setActiveSection}
// //             completionPercentage={completionPercentage}
// //           />

// //           {/* Main Content - Split View */}
// //           <div className="flex-1 space-y-6">
// //             {/* Template Selector Bar */}
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex items-center justify-between">
// //               <div className="flex gap-2">
// //                 {Object.entries(letterTemplates).map(([key, template]) => (
// //                   <Button
// //                     key={key}
// //                     variant={selectedTemplate === key ? "default" : "outline"}
// //                     onClick={() => {
// //                       setSelectedTemplate(key as keyof typeof letterTemplates);

// //                       console.log("Selected template:", letterData);
// //                     }}
// //                     className="gap-2 cursor-pointer"
// //                     size="sm"
// //                   >
// //                     {template.name}
// //                   </Button>
// //                 ))}
// //               </div>

// //               <div className="flex gap-2 ">
// //                 <Button
// //                   className="cursor-pointer"
// //                   variant="outline"
// //                   size="sm"
// //                   onClick={() => setShowPreview((prev) => !prev)}
// //                 >
// //                   {showPreview ? (
// //                     <div className="flex items-center gap-2">
// //                       <Edit className="w-4 h-4" />
// //                       Edit Letter
// //                     </div>
// //                   ) : (
// //                     <div className="flex items-center gap-2">
// //                       <Eye className="w-4 h-4" />
// //                       Live Preview
// //                     </div>
// //                   )}
// //                 </Button>
// //                 <Button
// //                   className="cursor-pointer gap-2"
// //                   onClick={exportToPDF}
// //                   disabled={isExporting}
// //                   size="sm"
// //                 >
// //                   {isExporting ? (
// //                     <RefreshCw className="w-4 h-4 animate-spin" />
// //                   ) : (
// //                     <Download className="w-4 h-4" />
// //                   )}
// //                   Export PDF
// //                 </Button>
// //                 {exportSuccess && (
// //                   <Badge
// //                     variant="outline"
// //                     className="gap-1 text-green-600 border-green-200"
// //                   >
// //                     <CheckCircle className="w-3 h-3" /> Exported!
// //                   </Badge>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Two Column Layout */}
// //             <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
// //               {showPreview ? (
// //                 <Card className="sticky px-12 top-6 h-[calc(100vh-160px)]">
// //                   <div className="bg-white/90 rounded-xl py-4 h-full overflow-auto no-scrollbar">
// //                     <div className="flex items-center justify-between px-4 mb-3">
// //                       <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
// //                         <Eye className="w-4 h-4" />
// //                         Live Preview
// //                       </h3>
// //                     </div>
// //                     <div ref={previewRef}>
// //                       <LivePreview
// //                         data={letterData}
// //                         template={selectedTemplate}
// //                       />
// //                     </div>
// //                   </div>
// //                 </Card>
// //               ) : (
// //                 <Card className="p-6 shadow-lg border-gray-200">
// //                   {/* <ScrollArea className="h-[calc(100vh-280px)] pr-4"> */}
// //                   <ScrollArea className="h-[calc(100vh-240px)] pr-4">
// //                     {renderSection()}
// //                   </ScrollArea>
// //                 </Card>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // components/ResumeBuilder.tsx
// "use client";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Progress } from "@/components/ui/progress";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Textarea } from "@/components/ui/textarea";
// import { cn } from "@/lib/utils";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import {
//   Award,
//   Briefcase,
//   CheckCircle,
//   ChevronRight,
//   Download,
//   Edit,
//   Eye,
//   FileText,
//   FolderOpen,
//   Globe,
//   GraduationCap,
//   LayoutTemplate,
//   LucideLayoutGrid,
//   Plus,
//   RefreshCw,
//   Save,
//   Trash2,
//   User,
//   Wrench,
// } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// import { SkillsForm } from "@/components/forms/SkillsForm";
// import { HeaderStyle, HeaderStyleSelector, ResumeHeader } from "./ResumeHeader";
// import SkillsPreview from "./resumePreview/SkillsPreview";
// import { ResumeData } from "@/types/resume";

// // Types
// interface ResumeDatas {
//   personalInfo: {
//     fullName: string;
//     email: string;
//     phone: string;
//     location: string;
//     linkedin: string;
//     github: string;
//     website: string;
//     title: string;
//     summary: string;
//   };
//   experience: {
//     id: string;
//     company: string;
//     position: string;
//     startDate: string;
//     endDate: string;
//     description: string;
//     achievements: string[];
//   }[];
//   education: {
//     id: string;
//     institution: string;
//     degree: string;
//     fieldOfStudy: string;
//     startDate: string;
//     endDate: string;
//     gpa: string;
//     description: string;
//     current: boolean;
//   }[];
//   skills: {
//     id: string;
//     name: string;
//     level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
//     category: string;
//   }[];
//   projects: {
//     id: string;
//     name: string;
//     description: string;
//     technologies: string[];
//     link: string;
//     startDate: string;
//     endDate: string;
//   }[];
//   certificates: {
//     id: string;
//     name: string;
//     issuer: string;
//     date: string;
//     link: string;
//   }[];
//   languages: {
//     id: string;
//     name: string;
//     proficiency: "Basic" | "Conversational" | "Professional" | "Native";
//   }[];
// }

// // Templates
// const resumeTemplatesd = {
//   professional: {
//     name: "Professional",
//     primaryColor: "#1e293b",
//     font: "Inter",
//     preview: "bg-gradient-to-br from-gray-800 to-gray-900",
//   },
//   modern: {
//     name: "Modern",
//     primaryColor: "#3b82f6",
//     font: "Poppins",
//     preview: "bg-gradient-to-br from-blue-600 to-indigo-600",
//   },
//   creative: {
//     name: "Creative",
//     primaryColor: "#8b5cf6",
//     font: "Plus Jakarta Sans",
//     preview: "bg-gradient-to-br from-purple-600 to-pink-600",
//   },
// };

// export const resumeTemplates = {
//   modern: {
//     name: "Modern",
//     primaryColor: "#3b82f6",
//     secondaryColor: "#1e293b",
//     font: "Inter",
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

// // Sidebar Navigation
// const SidebarNav = ({
//   activeSection,
//   onSectionChange,
//   completionPercentage,
// }: {
//   activeSection: string;
//   onSectionChange: (section: string) => void;
//   completionPercentage: number;
// }) => {
//   const navItems = [
//     { id: "personal", name: "Personal Info", icon: User, color: "blue" },
//     { id: "experience", name: "Experience", icon: Briefcase, color: "purple" },
//     { id: "education", name: "Education", icon: GraduationCap, color: "green" },
//     { id: "skills", name: "Skills", icon: Wrench, color: "orange" },
//     { id: "projects", name: "Projects", icon: FolderOpen, color: "yellow" },
//     { id: "certificates", name: "Certificates", icon: Award, color: "teal" },
//     { id: "languages", name: "Languages", icon: Globe, color: "indigo" },
//   ];

//   // Templates
//   const letterTemplates = {
//     professional: {
//       name: "Professional",
//       primaryColor: "#1e293b",
//       font: "Inter",
//       spacing: "comfortable",
//       layout: "standard",
//       preview: "bg-gradient-to-br from-gray-800 to-gray-900",
//     },
//     modern: {
//       name: "Modern",
//       primaryColor: "#3b82f6",
//       font: "Poppins",
//       spacing: "relaxed",
//       layout: "minimal",
//       preview: "bg-gradient-to-br from-blue-600 to-indigo-600",
//     },
//     creative: {
//       name: "Creative",
//       primaryColor: "#8b5cf6",
//       font: "Plus Jakarta Sans",
//       spacing: "relaxed",
//       layout: "bold",
//       preview: "bg-gradient-to-br from-purple-600 to-pink-600",
//     },
//   };

//   return (
//     <div className="w-72 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sticky top-6 h-[calc(100vh-3rem)] no-scrollbar overflow-auto">
//       <div className="flex flex-col h-full">
//         {/* Header */}
//         <div className="mb-6 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
//           <div className="flex items-center gap-2 text-white">
//             <FileText className="w-5 h-5" />
//             <span className="font-semibold">Resume Builder</span>
//           </div>
//         </div>

//         {/* Progress */}
//         <div className="mb-6">
//           <div className="flex justify-between text-sm mb-2">
//             <span className="text-gray-600">Completion</span>
//             <span className="font-semibold text-blue-600">
//               {completionPercentage}%
//             </span>
//           </div>
//           <Progress value={completionPercentage} className="h-2" />
//         </div>

//         {/* Navigation */}
//         <ScrollArea className="flex-1">
//           <div className="space-y-1">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = activeSection === item.id;
//               const colorClasses = {
//                 blue: isActive
//                   ? "bg-blue-50 text-blue-600 border-blue-200"
//                   : "hover:bg-gray-50",
//                 purple: isActive
//                   ? "bg-purple-50 text-purple-600 border-purple-200"
//                   : "hover:bg-gray-50",
//                 green: isActive
//                   ? "bg-green-50 text-green-600 border-green-200"
//                   : "hover:bg-gray-50",
//                 orange: isActive
//                   ? "bg-orange-50 text-orange-600 border-orange-200"
//                   : "hover:bg-gray-50",
//                 yellow: isActive
//                   ? "bg-yellow-50 text-yellow-600 border-yellow-200"
//                   : "hover:bg-gray-50",
//                 teal: isActive
//                   ? "bg-teal-50 text-teal-600 border-teal-200"
//                   : "hover:bg-gray-50",
//                 indigo: isActive
//                   ? "bg-indigo-50 text-indigo-600 border-indigo-200"
//                   : "hover:bg-gray-50",
//               };

//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => onSectionChange(item.id)}
//                   className={cn(
//                     "w-full flex cursor-pointer items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 border border-transparent",
//                     colorClasses[item.color as keyof typeof colorClasses],
//                     isActive && "shadow-sm",
//                   )}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span className="text-sm font-medium flex-1 text-left">
//                     {item.name}
//                   </span>
//                   {isActive && <ChevronRight className="w-3 h-3" />}
//                 </button>
//               );
//             })}
//           </div>
//         </ScrollArea>
//         {/* Template Selector */}
//         <div className="mt-6 pt-4 border-t border-gray-200">
//           <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
//             <LayoutTemplate className="w-3 h-3" />
//             Template
//           </p>
//           <div className="grid grid-cols-3 gap-2">
//             {Object.entries(letterTemplates).map(([key, template]) => (
//               <button
//                 key={key}
//                 className="text-center group"
//                 onClick={() => {}}
//               >
//                 <div
//                   className={`h-12 rounded-lg ${template.preview} mb-1 group-hover:scale-105 transition-transform`}
//                 />
//                 <span className="text-xs text-gray-600">{template.name}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//         {/* Template Selector */}
//         <div className="mt-6 pt-4 border-t border-gray-200">
//           <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
//             <LayoutTemplate className="w-3 h-3" />
//             Template
//           </p>
//           <div className="grid grid-cols-3 gap-2">
//             {Object.entries(letterTemplates).map(([key, template]) => (
//               <button
//                 key={key}
//                 className="text-center group"
//                 onClick={() => {}}
//               >
//                 <div
//                   className={`h-12 rounded-lg ${template.preview} mb-1 group-hover:scale-105 transition-transform`}
//                 />
//                 <span className="text-xs text-gray-600">{template.name}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//         {/* Save Status */}
//         <div className="mt-4 pt-4 pb-8 border-t border-gray-200">
//           <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
//             <Save className="w-3 h-3" />
//             <span>Auto-saving</span>
//             <CheckCircle className="w-3 h-3 text-green-500" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Live Preview Component
// const LivePreview = ({
//   data,
//   template,
//   showStyleSelector,
//   headerStyle,
//   handleHeaderStyleChange,
// }: {
//   data: ResumeData;
//   template: keyof typeof resumeTemplates;
//   showStyleSelector: boolean;
//   headerStyle: HeaderStyle;
//   handleHeaderStyleChange: (style: HeaderStyle) => void;
// }) => {
//   const style = resumeTemplates[template];

//   const hasContent =
//     data.personalInfo.fullName ||
//     data.experience.length > 0 ||
//     data.skills.length > 0;

//   if (!hasContent) {
//     return (
//       <div className="h-full flex items-center justify-center text-center p-8">
//         <div>
//           <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-gray-500 font-medium">
//             Start filling in your details
//           </h3>
//           <p className="text-sm text-gray-400 mt-1">
//             Your resume preview will appear here
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="bg-white shadow-lg overflow-hidden no-scrollbar border border-gray-200"
//       style={{ fontFamily: style?.font }}
//     >
//       <div className="px-9 py-7">
//         <ResumeHeader
//           data={data.personalInfo}
//           style={headerStyle}
//           // primaryColor="#3b82f6"
//           primaryColor={style.primaryColor}
//         />

//         {/* Summary */}
//         {data.personalInfo.summary && (
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold border-b-2 border-gray-200 mb-2 pb-1">
//               Professional Summary
//             </h2>
//             <p className="text-sm text-gray-700">{data.personalInfo.summary}</p>
//           </div>
//         )}
//         {/* Experience */}
//         {data.experience.length > 0 && (
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold border-b-2 border-gray-200 mb-3 pb-1">
//               Work Experience
//             </h2>
//             {data.experience.map((exp) => (
//               <div key={exp.id} className="mb-4">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-semibold">{exp.position}</h3>
//                     <p className="text-sm text-gray-600">{exp.company}</p>
//                   </div>
//                   <p className="text-xs text-gray-500">
//                     {exp.startDate} - {exp.endDate || "Present"}
//                   </p>
//                 </div>
//                 <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
//               </div>
//             ))}
//           </div>
//         )}
//         {/* Education */}
//         {data.education.length > 0 && (
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold border-b-2 border-gray-200 mb-3 pb-1">
//               Education
//             </h2>
//             {data.education.map((edu) => (
//               <div key={edu.id} className="mb-3">
//                 <div className="flex justify-between">
//                   <h3 className="font-semibold">{edu.degree}</h3>
//                   <p className="text-xs text-gray-500">
//                     {edu.startDate} - {edu.endDate}
//                   </p>
//                 </div>
//                 <p className="text-sm text-gray-600">{edu.institution}</p>
//               </div>
//             ))}
//           </div>
//         )}
//         {/* Skills */}

//         <SkillsPreview data={data} template={template} />
//       </div>
//     </div>
//   );
// };

// // Form Sections
// const PersonalInfoSection = ({
//   data,
//   onUpdate,
// }: {
//   data: any;
//   onUpdate: (field: string, value: string) => void;
// }) => (
//   <div className="space-y-4">
//     <div>
//       <h3 className="text-lg font-semibold flex items-center gap-2">
//         <User className="w-5 h-5 text-blue-600" />
//         Personal Information
//       </h3>
//       <p className="text-sm text-gray-500 mt-1">Tell us about yourself</p>
//     </div>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div className="md:col-span-2">
//         <Label>Full Name *</Label>
//         <Input
//           value={data.fullName}
//           onChange={(e) => onUpdate("fullName", e.target.value)}
//           placeholder="John Doe"
//         />
//       </div>
//       <div>
//         <Label>Professional Title</Label>
//         <Input
//           value={data.title}
//           onChange={(e) => onUpdate("title", e.target.value)}
//           placeholder="Senior Software Engineer"
//         />
//       </div>
//       <div>
//         <Label>Email *</Label>
//         <Input
//           type="email"
//           value={data.email}
//           onChange={(e) => onUpdate("email", e.target.value)}
//           placeholder="john@example.com"
//         />
//       </div>
//       <div>
//         <Label>Phone</Label>
//         <Input
//           value={data.phone}
//           onChange={(e) => onUpdate("phone", e.target.value)}
//           placeholder="+1 (555) 123-4567"
//         />
//       </div>
//       <div>
//         <Label>Location</Label>
//         <Input
//           value={data.location}
//           onChange={(e) => onUpdate("location", e.target.value)}
//           placeholder="New York, NY"
//         />
//       </div>
//       <div>
//         <Label>LinkedIn</Label>
//         <Input
//           value={data.linkedin}
//           onChange={(e) => onUpdate("linkedin", e.target.value)}
//           placeholder="https://linkedin.com/in/username"
//         />
//       </div>
//       <div>
//         <Label>GitHub</Label>
//         <Input
//           value={data.github}
//           onChange={(e) => onUpdate("github", e.target.value)}
//           placeholder="https://github.com/username"
//         />
//       </div>
//       <div className="md:col-span-2">
//         <Label>Professional Summary</Label>
//         <Textarea
//           value={data.summary}
//           onChange={(e) => onUpdate("summary", e.target.value)}
//           placeholder="Write a brief summary of your professional background..."
//           rows={4}
//         />
//       </div>
//     </div>
//   </div>
// );

// const ExperienceSection = ({
//   data,
//   onAdd,
//   onUpdate,
//   onDelete,
// }: {
//   data: any[];
//   onAdd: () => void;
//   onUpdate: (id: string, field: string, value: string) => void;
//   onDelete: (id: string) => void;
// }) => (
//   <div className="space-y-4">
//     <div className="flex justify-between items-center">
//       <div>
//         <h3 className="text-lg font-semibold flex items-center gap-2">
//           <Briefcase className="w-5 h-5 text-purple-600" />
//           Work Experience
//         </h3>
//         <p className="text-sm text-gray-500 mt-1">
//           Add your professional experience
//         </p>
//       </div>
//       <Button onClick={onAdd} size="sm" className="gap-1">
//         <Plus className="w-4 h-4" /> Add Experience
//       </Button>
//     </div>
//     {data.map((exp, index) => (
//       <Card key={exp.id} className="p-4 relative">
//         <button
//           onClick={() => onDelete(exp.id)}
//           className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
//         >
//           <Trash2 className="w-4 h-4" />
//         </button>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <div>
//             <Label>Company *</Label>
//             <Input
//               value={exp.company}
//               onChange={(e) => onUpdate(exp.id, "company", e.target.value)}
//               placeholder="Company Name"
//             />
//           </div>
//           <div>
//             <Label>Position *</Label>
//             <Input
//               value={exp.position}
//               onChange={(e) => onUpdate(exp.id, "position", e.target.value)}
//               placeholder="Job Title"
//             />
//           </div>
//           <div>
//             <Label>Location</Label>
//             <Input
//               value={exp.location}
//               onChange={(e) => onUpdate(exp.id, "location", e.target.value)}
//               placeholder="City, State"
//               className="mt-1"
//             />
//           </div>
//           <div>
//             <Label>Start Date</Label>
//             <Input
//               type="month"
//               value={exp.startDate}
//               onChange={(e) => onUpdate(exp.id, "startDate", e.target.value)}
//             />
//           </div>
//           <div>
//             <Label>End Date</Label>
//             <Input
//               type="month"
//               value={exp.endDate}
//               onChange={(e) => onUpdate(exp.id, "endDate", e.target.value)}
//               placeholder="Present"
//             />
//           </div>
//           <div className="flex items-center space-x-2 mt-6">
//             <input
//               type="checkbox"
//               id={`current-${exp.id}`}
//               checked={exp.current}
//               onChange={(e) => onUpdate(exp.id, "current", e.target.checked)}
//               className="rounded"
//             />
//             <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
//           </div>
//           <div className="md:col-span-2">
//             <Label>Description</Label>
//             <Textarea
//               value={exp.description}
//               onChange={(e) => onUpdate(exp.id, "description", e.target.value)}
//               placeholder="Describe your responsibilities and achievements..."
//               rows={3}
//             />
//           </div>
//         </div>
//       </Card>
//     ))}
//   </div>
// );

// const EducationSection = ({
//   data,
//   onAdd,
//   onUpdate,
//   onDelete,
// }: {
//   data: any[];
//   onAdd: () => void;
//   // onUpdate: (id: string, field: string, value: string) => void;
//   onUpdate: (id: string, field: string, value: string) => void;
//   onDelete: (id: string) => void;
// }) => (
//   <div className="space-y-4">
//     <div className="flex justify-between items-center">
//       <div>
//         <h3 className="text-lg font-semibold flex items-center gap-2">
//           <GraduationCap className="w-5 h-5 text-green-600" />
//           Education
//         </h3>
//         <p className="text-sm text-gray-500 mt-1">
//           Add your educational background
//         </p>
//       </div>
//       <Button onClick={onAdd} size="sm" className="gap-1">
//         <Plus className="w-4 h-4" /> Add Education
//       </Button>
//     </div>
//     {data.map((edu) => (
//       <Card key={edu.id} className="p-4 relative">
//         <button
//           onClick={() => onDelete(edu.id)}
//           className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
//         >
//           <Trash2 className="w-4 h-4" />
//         </button>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <div className="md:col-span-2">
//             <Label>Institution *</Label>
//             <Input
//               value={edu.institution}
//               onChange={(e) => onUpdate(edu.id, "institution", e.target.value)}
//               placeholder="University Name"
//             />
//           </div>
//           <div>
//             <Label>Degree *</Label>
//             <Input
//               value={edu.degree}
//               onChange={(e) => onUpdate(edu.id, "degree", e.target.value)}
//               placeholder="Bachelor of Science"
//             />
//           </div>
//           <div>
//             <Label>Field of Study</Label>
//             <Input
//               value={edu.fieldOfStudy}
//               onChange={(e) => onUpdate(edu.id, "fieldOfStudy", e.target.value)}
//               placeholder="Computer Science"
//             />
//           </div>
//           <div>
//             <Label>Start Date</Label>
//             <Input
//               type="month"
//               value={edu.startDate}
//               onChange={(e) => onUpdate(edu.id, "startDate", e.target.value)}
//             />
//           </div>
//           <div>
//             <Label>End Date</Label>
//             <Input
//               type="month"
//               value={edu.endDate}
//               onChange={(e) => onUpdate(edu.id, "endDate", e.target.value)}
//             />
//           </div>
//           <div className="flex items-center space-x-2 mt-6">
//             <input
//               type="checkbox"
//               id={`current-edu-${edu.id}`}
//               checked={edu.current}
//               onChange={(e) => onUpdate(edu.id, "current", e.target.checked)}
//               className="rounded"
//             />
//             <Label htmlFor={`current-edu-${edu.id}`}>Currently studying</Label>
//           </div>
//         </div>
//       </Card>
//     ))}
//   </div>
// );

// export default function ResumeBuilder() {
//   const [resumeData, setResumeData] = useState<ResumeData>({
//     personalInfo: {
//       fullName: "",
//       email: "",
//       phone: "",
//       location: "",
//       linkedin: "",
//       github: "",
//       website: "",
//       title: "",
//       summary: "",
//     },
//     experience: [],
//     education: [],
//     skills: [],
//     projects: [],
//     certificates: [],
//     languages: [],
//   });

//   const [selectedTemplate, setSelectedTemplate] =
//     useState<keyof typeof templates>("modern");
//   // const [selectedTemplate, setSelectedTemplate] =
//   // useState<keyof typeof resumeTemplates>("professional");

//   const [activeSection, setActiveSection] = useState("personal");
//   const [isExporting, setIsExporting] = useState(false);
//   const [exportSuccess, setExportSuccess] = useState(false);
//   const [saveStatus, setSaveStatus] = useState<"saved" | "saving">("saved");
//   const [showPreview, setShowPreview] = useState(false);
//   const previewRef = useRef<HTMLDivElement>(null);
//   const [headerStyle, setHeaderStyle] = useState<HeaderStyle>("side-by-side");
//   const [showStyleSelector, setShowStyleSelector] = useState(false);

//   // Calculate completion percentage
//   const completionPercentage = (() => {
//     let total = 0;
//     let filled = 0;
//     if (resumeData.personalInfo.fullName) filled++;
//     if (resumeData.personalInfo.email) filled++;
//     if (resumeData.experience.length > 0) filled++;
//     if (resumeData.education.length > 0) filled++;
//     if (resumeData.skills.length > 0) filled++;
//     total = 5;
//     return Math.round((filled / total) * 100);
//   })();

//   // Load/Save to localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem("resumeData");
//     if (saved) setResumeData(JSON.parse(saved));
//   }, []);

//   useEffect(() => {
//     const saveTimeout = setTimeout(() => {
//       localStorage.setItem("resumeData", JSON.stringify(resumeData));
//       setSaveStatus("saved");
//     }, 500);
//     setSaveStatus("saving");
//     return () => clearTimeout(saveTimeout);
//   }, [resumeData]);

//   const updatePersonalInfo = (field: string, value: string) =>
//     setResumeData((prev) => ({
//       ...prev,
//       personalInfo: { ...prev.personalInfo, [field]: value },
//     }));

//   // Experience handlers
//   const addExperience = () => {
//     const newExp = {
//       id: Date.now().toString(),
//       company: "",
//       position: "",
//       startDate: "",
//       endDate: "",
//       description: "",
//       achievements: [],
//     };
//     setResumeData((prev) => ({
//       ...prev,
//       experience: [...prev.experience, newExp],
//     }));
//   };
//   const updateExperience = (id: string, field: string, value: string) => {
//     setResumeData((prev) => ({
//       ...prev,
//       experience: prev.experience.map((exp) =>
//         exp.id === id ? { ...exp, [field]: value } : exp,
//       ),
//     }));
//   };
//   const deleteExperience = (id: string) => {
//     setResumeData((prev) => ({
//       ...prev,
//       experience: prev.experience.filter((exp) => exp.id !== id),
//     }));
//   };

//   // Education handlers
//   const addEducation = () => {
//     const newEdu = {
//       id: Date.now().toString(),
//       institution: "",
//       degree: "",
//       fieldOfStudy: "",
//       startDate: "",
//       endDate: "",
//       gpa: "",
//       description: "",
//     };
//     setResumeData((prev) => ({
//       ...prev,
//       education: [...prev.education, newEdu],
//     }));
//   };
//   const updateEducation = (id: string, field: string, value: string) => {
//     setResumeData((prev) => ({
//       ...prev,
//       education: prev.education.map((edu) =>
//         edu.id === id ? { ...edu, [field]: value } : edu,
//       ),
//     }));
//   };
//   const deleteEducation = (id: string) => {
//     setResumeData((prev) => ({
//       ...prev,
//       education: prev.education.filter((edu) => edu.id !== id),
//     }));
//   };

//   // Skills handlers
//   const addSkill = () => {
//     const newSkill = {
//       id: Date.now().toString(),
//       name: "",
//       level: "Intermediate" as const,
//       category: "",
//     };
//     setResumeData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }));
//   };
//   const updateSkill = (id: string, field: string, value: string) => {
//     setResumeData((prev) => ({
//       ...prev,
//       skills: prev.skills.map((skill) =>
//         skill.id === id ? { ...skill, [field]: value } : skill,
//       ),
//     }));
//   };
//   const deleteSkill = (id: string) => {
//     setResumeData((prev) => ({
//       ...prev,
//       skills: prev.skills.filter((skill) => skill.id !== id),
//     }));
//   };

//   const exportToPDF = async () => {
//     if (!previewRef.current) return;
//     setIsExporting(true);
//     try {
//       const canvas = await html2canvas(previewRef.current, {
//         scale: 2,
//         backgroundColor: "#ffffff",
//       });
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//       });
//       const imgWidth = 190;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
//       pdf.save(`resume-${resumeData.personalInfo.fullName || "document"}.pdf`);
//       setExportSuccess(true);
//       setTimeout(() => setExportSuccess(false), 3000);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   const templates = {
//     modern: {
//       name: "Modern",
//       primaryColor: "#3b82f6",
//       secondaryColor: "#1e293b",
//       font: "Inter",
//       spacing: "comfortable",
//     },
//     classic: {
//       name: "Classic",
//       primaryColor: "#1e293b",
//       secondaryColor: "#475569",
//       font: "Georgia",
//       spacing: "compact",
//     },
//     creative: {
//       name: "Creative",
//       primaryColor: "#8b5cf6",
//       secondaryColor: "#ec4899",
//       font: "Poppins",
//       spacing: "relaxed",
//     },
//   };

//   const renderSection = () => {
//     switch (activeSection) {
//       case "personal":
//         return (
//           <PersonalInfoSection
//             data={resumeData.personalInfo}
//             onUpdate={updatePersonalInfo}
//           />
//         );
//       case "experience":
//         return (
//           <ExperienceSection
//             data={resumeData.experience}
//             onAdd={addExperience}
//             onUpdate={updateExperience}
//             onDelete={deleteExperience}
//           />
//         );
//       case "education":
//         return (
//           <EducationSection
//             data={resumeData.education}
//             onAdd={addEducation}
//             onUpdate={updateEducation}
//             onDelete={deleteEducation}
//           />
//         );
//       case "skills":
//         return (
//           <>
//             <SkillsForm
//               skills={resumeData.skills}
//               onUpdate={updateSkill}
//               onDelete={deleteSkill}
//               onAdd={addSkill}
//             />
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="container mx-auto px-4 py-6">
//         <div className="flex gap-6">
//           <SidebarNav
//             activeSection={activeSection}
//             onSectionChange={setActiveSection}
//             completionPercentage={completionPercentage}
//           />

//           <div className="flex-1 space-y-6">
//             {/* Template Selector Bar */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex items-center justify-between">
//               <div className="flex gap-2">
//                 {Object.entries(resumeTemplates).map(([key, template]) => (
//                   <Button
//                     key={key}
//                     variant={selectedTemplate === key ? "default" : "outline"}
//                     onClick={() =>
//                       setSelectedTemplate(key as keyof typeof resumeTemplates)
//                     }
//                     className="gap-2 cursor-pointer"
//                     size="sm"
//                   >
//                     {template.name}
//                   </Button>
//                 ))}
//               </div>
//               {/* THEME SELECTOR */}
//               <div>
//                 <Button className="flex gap-1 cursor-pointer item-center">
//                   <span>Theme</span>
//                   <LucideLayoutGrid size={18} />
//                 </Button>
//               </div>
//               <div>
//                 <HeaderStyleSelector
//                   selectedStyle={headerStyle}
//                   onStyleChange={setHeaderStyle}
//                 />
//               </div>
//               <div className="flex gap-2">
//                 <Button
//                   className="cursor-pointer"
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setShowPreview((prev) => !prev)}
//                 >
//                   {showPreview ? (
//                     <>
//                       <Edit className="w-4 h-4 mr-2" /> Edit
//                     </>
//                   ) : (
//                     <>
//                       <Eye className="w-4 h-4 mr-2" /> Preview
//                     </>
//                   )}
//                 </Button>
//                 <Button
//                   onClick={exportToPDF}
//                   disabled={isExporting}
//                   size="sm"
//                   className="gap-2 cursor-pointer"
//                 >
//                   {isExporting ? (
//                     <RefreshCw className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <Download className="w-4 h-4" />
//                   )}
//                   Export PDF
//                 </Button>
//                 {exportSuccess && (
//                   <Badge
//                     variant="outline"
//                     className="gap-1 text-green-600 border-green-200"
//                   >
//                     <CheckCircle className="w-3 h-3" /> Exported!
//                   </Badge>
//                 )}
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="gap-6">
//               {showPreview ? (
//                 <Card className="sticky p-0 shadow-lg border-gray-200">
//                   <div className="bg-white/90 rounded-xl h-[calc(100vh-130px)] no-scrollbar overflow-auto">
//                     <div ref={previewRef}>
//                       <LivePreview
//                         data={resumeData}
//                         template={selectedTemplate}
//                         showStyleSelector={showStyleSelector}
//                         headerStyle={headerStyle}
//                         handleHeaderStyleChange={setHeaderStyle}
//                       />
//                     </div>
//                   </div>
//                 </Card>
//               ) : (
//                 <Card className="p-6 shadow-lg border-gray-200">
//                   <ScrollArea className="max-h-[calc(100vh-200px)]  h-[calc(100vh-260px)] pr-4">
//                     {renderSection()}
//                   </ScrollArea>
//                 </Card>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
