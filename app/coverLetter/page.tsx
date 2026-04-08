// // components/CoverLetterBuilder.tsx
// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FileText,
//   Download,
//   Printer,
//   Eye,
//   Edit,
//   Plus,
//   Trash2,
//   Copy,
//   Sparkles,
//   CheckCircle,
//   AlertCircle,
//   User,
//   Briefcase,
//   Building,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   Send,
//   RefreshCw,
//   Star,
//   TrendingUp,
//   Zap,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// // Types
// interface CoverLetterData {
//   personalInfo: {
//     fullName: string;
//     email: string;
//     phone: string;
//     location: string;
//     linkedin: string;
//     portfolio: string;
//   };
//   recipient: {
//     companyName: string;
//     hiringManager: string;
//     companyAddress: string;
//     recipientEmail: string;
//   };
//   letter: {
//     position: string;
//     subject: string;
//     opening: string;
//     body: string;
//     closing: string;
//     signature: string;
//   };
//   additional: {
//     referral: string;
//     portfolioLink: string;
//     availableFrom: string;
//     salaryExpectation: string;
//   };
// }

// // Templates
// const letterTemplates = {
//   professional: {
//     name: "Professional",
//     primaryColor: "#1e293b",
//     font: "Inter",
//     spacing: "comfortable",
//     layout: "standard",
//   },
//   modern: {
//     name: "Modern",
//     primaryColor: "#3b82f6",
//     font: "Poppins",
//     spacing: "relaxed",
//     layout: "minimal",
//   },
//   creative: {
//     name: "Creative",
//     primaryColor: "#8b5cf6",
//     font: "Plus Jakarta Sans",
//     spacing: "relaxed",
//     layout: "bold",
//   },
// };

// // AI Suggestions
// const aiSuggestions = {
//   openings: [
//     "I am writing to express my strong interest in the [Position] position at [Company].",
//     "As a passionate [Industry] professional with [X] years of experience, I was thrilled to see the opening for [Position] at [Company].",
//     "Your company's recent work in [Project/Area] caught my attention and inspired me to apply for the [Position] role.",
//     "With a proven track record in [Skill/Field], I am excited about the opportunity to contribute to [Company]'s continued success.",
//   ],
//   closings: [
//     "Thank you for considering my application. I look forward to discussing how my skills can benefit your team.",
//     "I would welcome the opportunity to discuss how my experience aligns with your needs in an interview.",
//     "Thank you for your time and consideration. I am eager to contribute to [Company]'s success.",
//     "I appreciate your consideration and look forward to the possibility of discussing this role further.",
//   ],
//   bodyParagraphs: [
//     "In my current role at [Current Company], I have successfully [achievement] resulting in [quantifiable result]. This experience has prepared me well to [contribute to company goal].",
//     "My background in [Field] includes [specific skill] and [another skill], which I believe would be valuable for [Company]'s upcoming [Project/Initiative].",
//     "I have consistently demonstrated [soft skill] and [hard skill] throughout my career, most notably when I [specific example].",
//   ],
// };

// // Preview Component
// const CoverLetterPreview = ({
//   data,
//   template,
// }: {
//   data: CoverLetterData;
//   template: keyof typeof letterTemplates;
// }) => {
//   const style = letterTemplates[template];
//   const currentDate = new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   return (
//     <div
//       className="bg-white rounded-lg shadow-xl overflow-hidden"
//       style={{ fontFamily: style.font }}
//     >
//       <div className="p-8">
//         {/* Letter Header */}
//         <div className="mb-8">
//           <div className="flex justify-between items-start">
//             <div>
//               <h1
//                 className="text-2xl font-bold mb-1"
//                 style={{ color: style.primaryColor }}
//               >
//                 {data.personalInfo.fullName || "Your Name"}
//               </h1>
//               <div className="space-y-1 text-sm text-gray-600">
//                 {data.personalInfo.email && (
//                   <div className="flex items-center gap-2">
//                     <Mail className="w-3 h-3" />
//                     <span>{data.personalInfo.email}</span>
//                   </div>
//                 )}
//                 {data.personalInfo.phone && (
//                   <div className="flex items-center gap-2">
//                     <Phone className="w-3 h-3" />
//                     <span>{data.personalInfo.phone}</span>
//                   </div>
//                 )}
//                 {data.personalInfo.location && (
//                   <div className="flex items-center gap-2">
//                     <MapPin className="w-3 h-3" />
//                     <span>{data.personalInfo.location}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="text-right text-sm text-gray-500">
//               <p>{currentDate}</p>
//             </div>
//           </div>
//         </div>

//         {/* Recipient Info */}
//         {(data.recipient.companyName || data.recipient.hiringManager) && (
//           <div className="mb-6">
//             {data.recipient.hiringManager && (
//               <p className="font-semibold">{data.recipient.hiringManager}</p>
//             )}
//             {data.recipient.companyName && <p>{data.recipient.companyName}</p>}
//             {data.recipient.companyAddress && (
//               <p className="text-sm text-gray-600">
//                 {data.recipient.companyAddress}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Subject Line */}
//         {data.letter.subject && (
//           <div className="mb-4">
//             <p className="font-semibold">RE: {data.letter.subject}</p>
//           </div>
//         )}

//         {/* Opening Salutation */}
//         <div className="mb-4">
//           <p>Dear {data.recipient.hiringManager || "Hiring Manager"},</p>
//         </div>

//         {/* Opening Paragraph */}
//         {data.letter.opening && (
//           <div className="mb-4">
//             <p className="leading-relaxed">{data.letter.opening}</p>
//           </div>
//         )}

//         {/* Letter Body */}
//         {data.letter.body && (
//           <div className="mb-4">
//             <p className="leading-relaxed whitespace-pre-wrap">
//               {data.letter.body}
//             </p>
//           </div>
//         )}

//         {/* Closing */}
//         {data.letter.closing && (
//           <div className="mb-6">
//             <p className="leading-relaxed">{data.letter.closing}</p>
//           </div>
//         )}

//         {/* Signature */}
//         <div className="mt-8">
//           <p>Sincerely,</p>
//           <div className="mt-4">
//             <p className="font-semibold">
//               {data.letter.signature || data.personalInfo.fullName}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Form Components
// const PersonalInfoForm = ({
//   data,
//   onUpdate,
// }: {
//   data: any;
//   onUpdate: (field: string, value: string) => void;
// }) => (
//   <div className="space-y-4">
//     <h3 className="text-lg font-semibold flex items-center gap-2">
//       <User className="w-5 h-5" />
//       Your Information
//     </h3>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div>
//         <Label>Full Name *</Label>
//         <Input
//           value={data.fullName}
//           onChange={(e) => onUpdate("fullName", e.target.value)}
//           placeholder="John Doe"
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
//         <Label>Portfolio</Label>
//         <Input
//           value={data.portfolio}
//           onChange={(e) => onUpdate("portfolio", e.target.value)}
//           placeholder="https://portfolio.com"
//         />
//       </div>
//     </div>
//   </div>
// );

// const RecipientForm = ({
//   data,
//   onUpdate,
// }: {
//   data: any;
//   onUpdate: (field: string, value: string) => void;
// }) => (
//   <div className="space-y-4">
//     <h3 className="text-lg font-semibold flex items-center gap-2">
//       <Building className="w-5 h-5" />
//       Company Information
//     </h3>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div>
//         <Label>Company Name *</Label>
//         <Input
//           value={data.companyName}
//           onChange={(e) => onUpdate("companyName", e.target.value)}
//           placeholder="Company Name"
//         />
//       </div>
//       <div>
//         <Label>Hiring Manager Name</Label>
//         <Input
//           value={data.hiringManager}
//           onChange={(e) => onUpdate("hiringManager", e.target.value)}
//           placeholder="Jane Smith"
//         />
//       </div>
//       <div className="md:col-span-2">
//         <Label>Company Address</Label>
//         <Input
//           value={data.companyAddress}
//           onChange={(e) => onUpdate("companyAddress", e.target.value)}
//           placeholder="123 Business St, City, State 12345"
//         />
//       </div>
//       <div>
//         <Label>Recipient Email</Label>
//         <Input
//           type="email"
//           value={data.recipientEmail}
//           onChange={(e) => onUpdate("recipientEmail", e.target.value)}
//           placeholder="hiring@company.com"
//         />
//       </div>
//     </div>
//   </div>
// );

// const LetterForm = ({
//   data,
//   onUpdate,
//   onAISuggest,
// }: {
//   data: any;
//   onUpdate: (field: string, value: string) => void;
//   onAISuggest: (field: string) => void;
// }) => (
//   <div className="space-y-4">
//     <h3 className="text-lg font-semibold flex items-center gap-2">
//       <FileText className="w-5 h-5" />
//       Letter Content
//     </h3>
//     <div>
//       <Label>Position Applying For *</Label>
//       <Input
//         value={data.position}
//         onChange={(e) => onUpdate("position", e.target.value)}
//         placeholder="Senior Frontend Developer"
//       />
//     </div>
//     <div>
//       <Label>Subject Line</Label>
//       <Input
//         value={data.subject}
//         onChange={(e) => onUpdate("subject", e.target.value)}
//         placeholder="Application for [Position] - [Your Name]"
//       />
//     </div>
//     <div>
//       <div className="flex justify-between items-center mb-2">
//         <Label>Opening Paragraph</Label>
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={() => onAISuggest("opening")}
//         >
//           <Sparkles className="w-3 h-3 mr-1" />
//           AI Suggest
//         </Button>
//       </div>
//       <Textarea
//         value={data.opening}
//         onChange={(e) => onUpdate("opening", e.target.value)}
//         placeholder="Introduce yourself and explain why you're interested in the position..."
//         rows={4}
//       />
//     </div>
//     <div>
//       <div className="flex justify-between items-center mb-2">
//         <Label>Body Paragraphs</Label>
//         <Button variant="ghost" size="sm" onClick={() => onAISuggest("body")}>
//           <Sparkles className="w-3 h-3 mr-1" />
//           AI Suggest
//         </Button>
//       </div>
//       <Textarea
//         value={data.body}
//         onChange={(e) => onUpdate("body", e.target.value)}
//         placeholder="Highlight your relevant skills, experience, and achievements..."
//         rows={8}
//       />
//     </div>
//     <div>
//       <div className="flex justify-between items-center mb-2">
//         <Label>Closing Paragraph</Label>
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={() => onAISuggest("closing")}
//         >
//           <Sparkles className="w-3 h-3 mr-1" />
//           AI Suggest
//         </Button>
//       </div>
//       <Textarea
//         value={data.closing}
//         onChange={(e) => onUpdate("closing", e.target.value)}
//         placeholder="Thank the reader and express interest in an interview..."
//         rows={3}
//       />
//     </div>
//     <div>
//       <Label>Signature</Label>
//       <Input
//         value={data.signature}
//         onChange={(e) => onUpdate("signature", e.target.value)}
//         placeholder="John Doe"
//       />
//     </div>
//   </div>
// );

// const AdditionalForm = ({
//   data,
//   onUpdate,
// }: {
//   data: any;
//   onUpdate: (field: string, value: string) => void;
// }) => (
//   <div className="space-y-4">
//     <h3 className="text-lg font-semibold">Additional Information</h3>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div>
//         <Label>How did you hear about this role?</Label>
//         <Input
//           value={data.referral}
//           onChange={(e) => onUpdate("referral", e.target.value)}
//           placeholder="LinkedIn, Employee Referral, etc."
//         />
//       </div>
//       <div>
//         <Label>Portfolio/GitHub Link</Label>
//         <Input
//           value={data.portfolioLink}
//           onChange={(e) => onUpdate("portfolioLink", e.target.value)}
//           placeholder="https://github.com/username"
//         />
//       </div>
//       <div>
//         <Label>Available From</Label>
//         <Input
//           type="date"
//           value={data.availableFrom}
//           onChange={(e) => onUpdate("availableFrom", e.target.value)}
//         />
//       </div>
//       <div>
//         <Label>Salary Expectation (Optional)</Label>
//         <Input
//           value={data.salaryExpectation}
//           onChange={(e) => onUpdate("salaryExpectation", e.target.value)}
//           placeholder="$80,000 - $100,000"
//         />
//       </div>
//     </div>
//   </div>
// );

// // AI Analyzer Component
// const CoverLetterAnalyzer = ({
//   onApplySuggestion,
// }: {
//   onApplySuggestion: (field: string, text: string) => void;
// }) => {
//   const [analysis, setAnalysis] = useState<any>(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);

//   const analyzeLetter = async () => {
//     setIsAnalyzing(true);
//     // Simulate AI analysis
//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     setAnalysis({
//       score: 85,
//       strengths: ["Clear opening", "Good structure"],
//       improvements: [
//         "Add more specific achievements",
//         "Include company research",
//       ],
//       suggestions: {
//         opening:
//           "Consider mentioning a specific project or achievement of the company",
//         body: "Add quantifiable results from your previous roles",
//         closing: "Include a call to action for next steps",
//       },
//     });
//     setIsAnalyzing(false);
//   };

//   return (
//     <Card className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="font-semibold flex items-center gap-2">
//           <Zap className="w-4 h-4 text-yellow-500" />
//           AI Cover Letter Analyzer
//         </h3>
//         <Button onClick={analyzeLetter} disabled={isAnalyzing} size="sm">
//           {isAnalyzing ? (
//             <RefreshCw className="w-3 h-3 animate-spin" />
//           ) : (
//             "Analyze"
//           )}
//         </Button>
//       </div>

//       {analysis && (
//         <div className="space-y-3">
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium">Overall Score:</span>
//             <span className="text-2xl font-bold text-blue-600">
//               {analysis.score}%
//             </span>
//           </div>

//           <div>
//             <p className="text-sm font-medium text-green-600 mb-1">
//               Strengths:
//             </p>
//             <ul className="text-sm space-y-1">
//               {analysis.strengths.map((s: string, i: number) => (
//                 <li key={i} className="flex items-center gap-1">
//                   <CheckCircle className="w-3 h-3 text-green-500" />
//                   {s}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <p className="text-sm font-medium text-yellow-600 mb-1">
//               Suggestions:
//             </p>
//             <ul className="text-sm space-y-1">
//               {analysis.improvements.map((s: string, i: number) => (
//                 <li key={i} className="flex items-center gap-1">
//                   <Star className="w-3 h-3 text-yellow-500" />
//                   {s}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <Button
//             variant="outline"
//             size="sm"
//             className="w-full"
//             onClick={() => {
//               if (analysis.suggestions.opening) {
//                 onApplySuggestion("opening", analysis.suggestions.opening);
//               }
//             }}
//           >
//             Apply AI Suggestions
//           </Button>
//         </div>
//       )}
//     </Card>
//   );
// };

// // Main Component
// export default function CoverLetterBuilder() {
//   const [letterData, setLetterData] = useState<CoverLetterData>({
//     personalInfo: {
//       fullName: "",
//       email: "",
//       phone: "",
//       location: "",
//       linkedin: "",
//       portfolio: "",
//     },
//     recipient: {
//       companyName: "",
//       hiringManager: "",
//       companyAddress: "",
//       recipientEmail: "",
//     },
//     letter: {
//       position: "",
//       subject: "",
//       opening: "",
//       body: "",
//       closing: "",
//       signature: "",
//     },
//     additional: {
//       referral: "",
//       portfolioLink: "",
//       availableFrom: "",
//       salaryExpectation: "",
//     },
//   });

//   const [activeTab, setActiveTab] = useState("edit");
//   const [selectedTemplate, setSelectedTemplate] =
//     useState<keyof typeof letterTemplates>("professional");
//   const [isExporting, setIsExporting] = useState(false);
//   const [exportSuccess, setExportSuccess] = useState(false);
//   const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">(
//     "saved",
//   );
//   const previewRef = useRef<HTMLDivElement>(null);

//   // Load/Save to localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem("coverLetterData");
//     if (saved) {
//       setLetterData(JSON.parse(saved));
//     }
//   }, []);

//   useEffect(() => {
//     const saveTimeout = setTimeout(() => {
//       localStorage.setItem("coverLetterData", JSON.stringify(letterData));
//       setSaveStatus("saved");
//     }, 500);
//     setSaveStatus("saving");
//     return () => clearTimeout(saveTimeout);
//   }, [letterData]);

//   // Update handlers
//   const updatePersonalInfo = (field: string, value: string) => {
//     setLetterData((prev) => ({
//       ...prev,
//       personalInfo: { ...prev.personalInfo, [field]: value },
//     }));
//   };

//   const updateRecipient = (field: string, value: string) => {
//     setLetterData((prev) => ({
//       ...prev,
//       recipient: { ...prev.recipient, [field]: value },
//     }));
//   };

//   const updateLetter = (field: string, value: string) => {
//     setLetterData((prev) => ({
//       ...prev,
//       letter: { ...prev.letter, [field]: value },
//     }));
//   };

//   const updateAdditional = (field: string, value: string) => {
//     setLetterData((prev) => ({
//       ...prev,
//       additional: { ...prev.additional, [field]: value },
//     }));
//   };

//   // AI Suggestions
//   const getAISuggestion = (field: string) => {
//     const position = letterData.letter.position || "[Position]";
//     const company = letterData.recipient.companyName || "[Company]";

//     let suggestion = "";
//     switch (field) {
//       case "opening":
//         suggestion = aiSuggestions.openings[
//           Math.floor(Math.random() * aiSuggestions.openings.length)
//         ]
//           .replace("[Position]", position)
//           .replace("[Company]", company);
//         break;
//       case "body":
//         suggestion = aiSuggestions.bodyParagraphs[
//           Math.floor(Math.random() * aiSuggestions.bodyParagraphs.length)
//         ]
//           .replace("[Current Company]", "my current role")
//           .replace("[achievement]", "delivered successful projects")
//           .replace("[quantifiable result]", "increased efficiency by 30%")
//           .replace("[contribute to company goal]", "drive similar results");
//         break;
//       case "closing":
//         suggestion = aiSuggestions.closings[
//           Math.floor(Math.random() * aiSuggestions.closings.length)
//         ].replace("[Company]", company);
//         break;
//     }
//     updateLetter(field, suggestion);
//   };

//   // Export to PDF
//   const exportToPDF = async () => {
//     if (!previewRef.current) return;

//     setIsExporting(true);
//     try {
//       const element = previewRef.current;
//       const canvas = await html2canvas(element, {
//         scale: 2,
//         backgroundColor: "#ffffff",
//         logging: false,
//         useCORS: true,
//       });

//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//       });

//       const pdfWidth = 210;
//       const pdfHeight = 297;
//       const imgWidth = pdfWidth - 20;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       let heightLeft = imgHeight;
//       let position = 0;
//       let pageNum = 1;

//       pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
//       heightLeft -= pdfHeight;

//       while (heightLeft > 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
//         heightLeft -= pdfHeight;
//         pageNum++;
//       }

//       pdf.save(
//         `cover-letter-${letterData.personalInfo.fullName || "document"}.pdf`,
//       );
//       setExportSuccess(true);
//       setTimeout(() => setExportSuccess(false), 3000);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   // Reset form
//   const resetForm = () => {
//     if (confirm("Are you sure you want to reset all data?")) {
//       setLetterData({
//         personalInfo: {
//           fullName: "",
//           email: "",
//           phone: "",
//           location: "",
//           linkedin: "",
//           portfolio: "",
//         },
//         recipient: {
//           companyName: "",
//           hiringManager: "",
//           companyAddress: "",
//           recipientEmail: "",
//         },
//         letter: {
//           position: "",
//           subject: "",
//           opening: "",
//           body: "",
//           closing: "",
//           signature: "",
//         },
//         additional: {
//           referral: "",
//           portfolioLink: "",
//           availableFrom: "",
//           salaryExpectation: "",
//         },
//       });
//       localStorage.removeItem("coverLetterData");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Cover Letter Builder
//             </h1>
//             <p className="text-gray-600 mt-1">
//               Create professional cover letters that stand out
//             </p>
//           </div>
//           <div className="flex gap-2">
//             <div className="flex items-center mr-4">
//               {saveStatus === "saved" && (
//                 <CheckCircle className="w-4 h-4 text-green-500" />
//               )}
//               {saveStatus === "saving" && (
//                 <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
//               )}
//               <span className="text-sm ml-2 capitalize">{saveStatus}</span>
//             </div>
//             <Button onClick={resetForm} variant="outline" size="sm">
//               <RefreshCw className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Template Selector */}
//         <div className="flex gap-2 p-2 bg-white rounded-lg shadow">
//           {Object.entries(letterTemplates).map(([key, template]) => (
//             <Button
//               key={key}
//               variant={selectedTemplate === key ? "default" : "ghost"}
//               onClick={() =>
//                 setSelectedTemplate(key as keyof typeof letterTemplates)
//               }
//               className="flex-1"
//             >
//               {template.name}
//             </Button>
//           ))}
//         </div>

//         {/* Main Tabs */}
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="edit" className="flex items-center gap-2">
//               <Edit className="w-4 h-4" />
//               Edit Letter
//             </TabsTrigger>
//             <TabsTrigger value="preview" className="flex items-center gap-2">
//               <Eye className="w-4 h-4" />
//               Preview & Export
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="edit" className="space-y-6 mt-6">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               <div className="lg:col-span-2 space-y-6">
//                 <Card className="p-6">
//                   <PersonalInfoForm
//                     data={letterData.personalInfo}
//                     onUpdate={updatePersonalInfo}
//                   />
//                 </Card>
//                 <Card className="p-6">
//                   <RecipientForm
//                     data={letterData.recipient}
//                     onUpdate={updateRecipient}
//                   />
//                 </Card>
//                 <Card className="p-6">
//                   <LetterForm
//                     data={letterData.letter}
//                     onUpdate={updateLetter}
//                     onAISuggest={getAISuggestion}
//                   />
//                 </Card>
//                 <Card className="p-6">
//                   <AdditionalForm
//                     data={letterData.additional}
//                     onUpdate={updateAdditional}
//                   />
//                 </Card>
//               </div>
//               <div className="space-y-6">
//                 <CoverLetterAnalyzer
//                   onApplySuggestion={(field, text) => {
//                     updateLetter(field, text);
//                   }}
//                 />
//                 <Card className="p-4">
//                   <h3 className="font-semibold mb-3">Quick Tips</h3>
//                   <ul className="space-y-2 text-sm">
//                     <li className="flex items-start gap-2">
//                       <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
//                       <span>Research the company before writing</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
//                       <span>Address the hiring manager by name</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
//                       <span>Highlight 2-3 key achievements</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
//                       <span>Keep it to one page</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
//                       <span>Proofread for errors</span>
//                     </li>
//                   </ul>
//                 </Card>
//               </div>
//             </div>
//           </TabsContent>

//           <TabsContent value="preview" className="space-y-6 mt-6">
//             <div className="flex justify-end gap-2">
//               <Button
//                 onClick={exportToPDF}
//                 disabled={isExporting}
//                 className="flex items-center gap-2"
//               >
//                 {isExporting ? (
//                   <RefreshCw className="w-4 h-4 animate-spin" />
//                 ) : (
//                   <Download className="w-4 h-4" />
//                 )}
//                 Download PDF
//               </Button>
//               <Button
//                 onClick={() => window.print()}
//                 variant="outline"
//                 className="flex items-center gap-2"
//               >
//                 <Printer className="w-4 h-4" />
//                 Print
//               </Button>
//               {exportSuccess && (
//                 <div className="flex items-center gap-2 text-green-600">
//                   <CheckCircle className="w-4 h-4" />
//                   <span className="text-sm">Exported successfully!</span>
//                 </div>
//               )}
//             </div>
//             <div ref={previewRef}>
//               <CoverLetterPreview
//                 data={letterData}
//                 template={selectedTemplate}
//               />
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

// components/CoverLetterBuilder.tsx
"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
  RefObject,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  Printer,
  Eye,
  Edit,
  Plus,
  Trash2,
  Copy,
  Sparkles,
  CheckCircle,
  AlertCircle,
  User,
  Briefcase,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Send,
  RefreshCw,
  Star,
  TrendingUp,
  Zap,
  ChevronRight,
  ChevronLeft,
  UserCheck,
  Heart,
  MessageSquare,
  Settings,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Types
interface CoverLetterData {
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
}

// Templates
const letterTemplates = {
  professional: {
    name: "Professional",
    primaryColor: "#1e293b",
    font: "Inter",
    spacing: "comfortable",
    layout: "standard",
  },
  modern: {
    name: "Modern",
    primaryColor: "#3b82f6",
    font: "Poppins",
    spacing: "relaxed",
    layout: "minimal",
  },
  creative: {
    name: "Creative",
    primaryColor: "#8b5cf6",
    font: "Plus Jakarta Sans",
    spacing: "relaxed",
    layout: "bold",
  },
};

// AI Suggestions
const aiSuggestions = {
  openings: [
    "I am writing to express my strong interest in the [Position] position at [Company].",
    "As a passionate [Industry] professional with [X] years of experience, I was thrilled to see the opening for [Position] at [Company].",
    "Your company's recent work in [Project/Area] caught my attention and inspired me to apply for the [Position] role.",
    "With a proven track record in [Skill/Field], I am excited about the opportunity to contribute to [Company]'s continued success.",
  ],
  closings: [
    "Thank you for considering my application. I look forward to discussing how my skills can benefit your team.",
    "I would welcome the opportunity to discuss how my experience aligns with your needs in an interview.",
    "Thank you for your time and consideration. I am eager to contribute to [Company]'s success.",
    "I appreciate your consideration and look forward to the possibility of discussing this role further.",
  ],
  bodyParagraphs: [
    "In my current role at [Current Company], I have successfully [achievement] resulting in [quantifiable result]. This experience has prepared me well to [contribute to company goal].",
    "My background in [Field] includes [specific skill] and [another skill], which I believe would be valuable for [Company]'s upcoming [Project/Initiative].",
    "I have consistently demonstrated [soft skill] and [hard skill] throughout my career, most notably when I [specific example].",
  ],
};

// Step Wizard Component
const StepWizard = ({
  currentStep,
  onStepChange,
  steps,
}: {
  currentStep: number;
  onStepChange: (step: number) => void;
  steps: { id: string; name: string; icon: any }[];
}) => {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <button
              key={step.id}
              onClick={() => onStepChange(index)}
              className="flex-1 text-center group"
            >
              <div className="relative">
                <div
                  className={`flex items-center justify-center w-10 h-10 mx-auto rounded-full transition-all ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                        ? "bg-blue-500 text-white ring-4 ring-blue-200"
                        : "bg-gray-200 text-gray-400 group-hover:bg-gray-300"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap ${
                    isCurrent ? "font-semibold text-blue-600" : "text-gray-500"
                  }`}
                >
                  {step.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <Progress value={progress} className="mt-8 h-1" />
    </div>
  );
};

// Preview Component
const CoverLetterPreview = ({
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

  return (
    <div
      className="bg-white rounded-lg shadow-xl overflow-hidden"
      style={{ fontFamily: style.font }}
    >
      <div className="p-8">
        {/* Letter Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1
                className="text-2xl font-bold mb-1"
                style={{ color: style.primaryColor }}
              >
                {data.personalInfo.fullName || "Your Name"}
              </h1>
              {data.personalInfo.title && (
                <p className="text-sm text-gray-500 mb-2">
                  {data.personalInfo.title}
                </p>
              )}
              <div className="space-y-1 text-sm text-gray-600">
                {data.personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    <span>{data.personalInfo.email}</span>
                  </div>
                )}
                {data.personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    <span>{data.personalInfo.phone}</span>
                  </div>
                )}
                {data.personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <span>{data.personalInfo.location}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>{currentDate}</p>
            </div>
          </div>
        </div>

        {/* Recipient Info */}
        {(data.recipient.companyName || data.recipient.hiringManager) && (
          <div className="mb-6">
            {data.recipient.hiringManager && (
              <p className="font-semibold">{data.recipient.hiringManager}</p>
            )}
            {data.recipient.companyName && <p>{data.recipient.companyName}</p>}
            {data.recipient.companyAddress && (
              <p className="text-sm text-gray-600">
                {data.recipient.companyAddress}
              </p>
            )}
          </div>
        )}

        {/* Subject Line */}
        {data.letter.subject && (
          <div className="mb-4">
            <p className="font-semibold">RE: {data.letter.subject}</p>
          </div>
        )}

        {/* Opening Salutation */}
        <div className="mb-4">
          <p>Dear {data.recipient.hiringManager || "Hiring Manager"},</p>
        </div>

        {/* Opening Paragraph */}
        {data.letter.opening && (
          <div className="mb-4">
            <p className="leading-relaxed">{data.letter.opening}</p>
          </div>
        )}

        {/* Letter Body */}
        {data.letter.body && (
          <div className="mb-4">
            <p className="leading-relaxed whitespace-pre-wrap">
              {data.letter.body}
            </p>
          </div>
        )}

        {/* Closing */}
        {data.letter.closing && (
          <div className="mb-6">
            <p className="leading-relaxed">{data.letter.closing}</p>
          </div>
        )}

        {/* Signature */}
        <div className="mt-8">
          <p>Sincerely,</p>
          <div className="mt-4">
            <p className="font-semibold">
              {data.letter.signature || data.personalInfo.fullName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Form Components
const PersonalInfoForm = ({
  data,
  onUpdate,
  onNext,
}: {
  data: any;
  onUpdate: (field: string, value: string) => void;
  onNext: () => void;
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.fullName) newErrors.fullName = "Full name is required";
    if (!data.email) newErrors.email = "Email is required";
    if (data.email && !/\S+@\S+\.\S+/.test(data.email))
      newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold">Your Information</h2>
        <p className="text-gray-500">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label>Full Name *</Label>
          <Input
            value={data.fullName}
            onChange={(e) => onUpdate("fullName", e.target.value)}
            placeholder="John Doe"
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
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
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
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
        <div>
          <Label>Portfolio/Website</Label>
          <Input
            value={data.portfolio}
            onChange={(e) => onUpdate("portfolio", e.target.value)}
            placeholder="https://portfolio.com"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleNext} className="flex items-center gap-2">
          Next: Company Details
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

const RecipientForm = ({
  data,
  onUpdate,
  onNext,
  onBack,
}: {
  data: any;
  onUpdate: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Building className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold">Company Details</h2>
        <p className="text-gray-500">Who are you writing to?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label>Company Name *</Label>
          <Input
            value={data.companyName}
            onChange={(e) => onUpdate("companyName", e.target.value)}
            placeholder="Company Name"
          />
        </div>
        <div className="md:col-span-2">
          <Label>Hiring Manager Name</Label>
          <Input
            value={data.hiringManager}
            onChange={(e) => onUpdate("hiringManager", e.target.value)}
            placeholder="Jane Smith"
          />
        </div>
        <div className="md:col-span-2">
          <Label>Company Address</Label>
          <Input
            value={data.companyAddress}
            onChange={(e) => onUpdate("companyAddress", e.target.value)}
            placeholder="123 Business St, City, State 12345"
          />
        </div>
        <div className="md:col-span-2">
          <Label>Recipient Email</Label>
          <Input
            type="email"
            value={data.recipientEmail}
            onChange={(e) => onUpdate("recipientEmail", e.target.value)}
            placeholder="hiring@company.com"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <Button onClick={onNext} className="flex items-center gap-2">
          Next: Write Letter
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

const LetterForm = ({
  data,
  onUpdate,
  onNext,
  onBack,
  onAISuggest,
}: {
  data: any;
  onUpdate: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  onAISuggest: (field: string) => void;
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <MessageSquare className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Write Your Letter</h2>
        <p className="text-gray-500">Craft a compelling message</p>
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
        <Label>Subject Line</Label>
        <Input
          value={data.subject}
          onChange={(e) => onUpdate("subject", e.target.value)}
          placeholder="Application for [Position] - [Your Name]"
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
          placeholder="Introduce yourself and explain why you're interested in the position..."
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
          placeholder="Highlight your relevant skills, experience, and achievements..."
          rows={8}
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
          placeholder="Thank the reader and express interest in an interview..."
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

      <div className="flex justify-between pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <Button onClick={onNext} className="flex items-center gap-2">
          Next: Review
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

const ReviewForm = ({
  data,
  onBack,
  onComplete,
}: {
  data: CoverLetterData;
  onBack: () => void;
  onComplete: () => void;
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-8 h-8 text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold">Review Your Letter</h2>
        <p className="text-gray-500">Make sure everything looks good</p>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Personal Information</h3>
          <p className="text-sm">
            <strong>Name:</strong>{" "}
            {data.personalInfo.fullName || "Not provided"}
          </p>
          <p className="text-sm">
            <strong>Email:</strong> {data.personalInfo.email || "Not provided"}
          </p>
          <p className="text-sm">
            <strong>Phone:</strong> {data.personalInfo.phone || "Not provided"}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Company Details</h3>
          <p className="text-sm">
            <strong>Company:</strong>{" "}
            {data.recipient.companyName || "Not provided"}
          </p>
          <p className="text-sm">
            <strong>Hiring Manager:</strong>{" "}
            {data.recipient.hiringManager || "Not provided"}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Letter Summary</h3>
          <p className="text-sm">
            <strong>Position:</strong> {data.letter.position || "Not provided"}
          </p>
          <p className="text-sm">
            <strong>Opening:</strong> {data.letter.opening?.substring(0, 100)}
            ...
          </p>
          <p className="text-sm">
            <strong>Body length:</strong> {data.letter.body?.length || 0}{" "}
            characters
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          onClick={onComplete}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="w-4 h-4" />
          Complete & Preview
        </Button>
      </div>
    </div>
  );
};

interface Preview {
  setShowPreview: Dispatch<SetStateAction<boolean>>;
  exportToPDF: () => Promise<void>;
  exportSuccess: boolean;
  isExporting: boolean;
  previewRef: RefObject<HTMLDivElement>;
  letterData: CoverLetterData;
  selectedTemplate: "modern" | "creative" | "professional";
}

const LetterPreview = ({
  setShowPreview,
  exportToPDF,
  exportSuccess,
  isExporting,
  previewRef,
  letterData,
  selectedTemplate,
}: Preview) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              className="h-9"
              onClick={() => setShowPreview(false)}
              variant="outline"
            >
              Edit Letter
            </Button>
            <Button
              onClick={exportToPDF}
              disabled={isExporting}
              className="flex items-center gap-2 h-9"
            >
              {isExporting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Download PDF
            </Button>
            {exportSuccess && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Exported!</span>
              </div>
            )}
          </div>
        </div>

        <div ref={previewRef}>
          <CoverLetterPreview data={letterData} template={selectedTemplate} />
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function CoverLetterBuilder() {
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

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] =
    useState<keyof typeof letterTemplates>("professional");
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">(
    "saved",
  );
  const [showPreview, setShowPreview] = useState(false);
  // const previewRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const steps = [
    { id: "personal", name: "Your Info", icon: User },
    { id: "company", name: "Company", icon: Building },
    { id: "letter", name: "Write Letter", icon: MessageSquare },
    { id: "review", name: "Review", icon: CheckCircle },
    { id: "preview", name: "Preview", icon: CheckCircle },
  ];

  // Load/Save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("coverLetterData");
    if (saved) {
      setLetterData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      localStorage.setItem("coverLetterData", JSON.stringify(letterData));
      setSaveStatus("saved");
    }, 500);
    setSaveStatus("saving");
    return () => clearTimeout(saveTimeout);
  }, [letterData]);

  // Update handlers
  const updatePersonalInfo = (field: string, value: string) => {
    setLetterData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const updateRecipient = (field: string, value: string) => {
    setLetterData((prev) => ({
      ...prev,
      recipient: { ...prev.recipient, [field]: value },
    }));
  };

  const updateLetter = (field: string, value: string) => {
    setLetterData((prev) => ({
      ...prev,
      letter: { ...prev.letter, [field]: value },
    }));
  };

  // AI Suggestions
  const getAISuggestion = (field: string) => {
    const position = letterData.letter.position || "[Position]";
    const company = letterData.recipient.companyName || "[Company]";

    let suggestion = "";
    switch (field) {
      case "opening":
        suggestion = aiSuggestions.openings[
          Math.floor(Math.random() * aiSuggestions.openings.length)
        ]
          .replace("[Position]", position)
          .replace("[Company]", company);
        break;
      case "body":
        suggestion = aiSuggestions.bodyParagraphs[
          Math.floor(Math.random() * aiSuggestions.bodyParagraphs.length)
        ]
          .replace("[Current Company]", "my current role")
          .replace("[achievement]", "delivered successful projects")
          .replace("[quantifiable result]", "increased efficiency by 30%")
          .replace("[contribute to company goal]", "drive similar results");
        break;
      case "closing":
        suggestion = aiSuggestions.closings[
          Math.floor(Math.random() * aiSuggestions.closings.length)
        ].replace("[Company]", company);
        break;
    }
    updateLetter(field, suggestion);
  };

  // Export to PDF
  const exportToPDF = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(
        `cover-letter-${letterData.personalInfo.fullName || "document"}.pdf`,
      );
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoForm
            data={letterData.personalInfo}
            onUpdate={updatePersonalInfo}
            onNext={() => setCurrentStep(1)}
          />
        );
      case 1:
        return (
          <RecipientForm
            data={letterData.recipient}
            onUpdate={updateRecipient}
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        );
      case 2:
        return (
          <LetterForm
            data={letterData.letter}
            onUpdate={updateLetter}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
            onAISuggest={getAISuggestion}
          />
        );
      case 3:
        return (
          <ReviewForm
            data={letterData}
            onBack={() => setCurrentStep(2)}
            onComplete={() => setShowPreview(true)}
          />
        );
      case 4:
        return (
          <LetterPreview
            setShowPreview={setShowPreview}
            exportToPDF={exportToPDF}
            exportSuccess={exportSuccess}
            isExporting={isExporting}
            previewRef={previewRef as RefObject<HTMLDivElement>}
            letterData={letterData}
            selectedTemplate={selectedTemplate}
          />
        );
      default:
        return null;
    }
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Cover Letter Preview
              </h1>
              <p className="text-gray-600 mt-1">
                Review and download your cover letter
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowPreview(false)} variant="outline">
                Edit Letter
              </Button>
              <Button
                onClick={exportToPDF}
                disabled={isExporting}
                className="flex items-center gap-2"
              >
                {isExporting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                Download PDF
              </Button>
              {exportSuccess && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Exported!</span>
                </div>
              )}
            </div>
          </div>

          <div ref={previewRef}>
            <CoverLetterPreview data={letterData} template={selectedTemplate} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cover Letter Builder
          </h1>
          <p className="text-gray-600 mt-2">
            Create a professional cover letter in 4 simple steps
          </p>
        </div>

        {/* ================= TEMPLATE TABS ================= */}

        <div className="flex border-b mb-5 bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow">
          {Object.entries(letterTemplates).map(([key, template]) => (
            <Button
              key={key}
              variant="ghost"
              onClick={() =>
                setSelectedTemplate(key as keyof typeof letterTemplates)
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

        {/* Step Wizard */}
        <StepWizard
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          steps={steps}
        />

        {currentStep === 4 ? (
          <Card className={`mt-8 p-0 rounded-none m-0`}>{renderStep()}</Card>
        ) : (
          <Card className={`p-8 mt-8`}>{renderStep()}</Card>
        )}

        {/* Save Status */}
        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
          {saveStatus === "saved" && (
            <CheckCircle className="w-4 h-4 text-green-500" />
          )}
          {saveStatus === "saving" && (
            <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
          )}
          <span>Auto-saving... {saveStatus}</span>
        </div>
      </div>
    </div>
  );
}
