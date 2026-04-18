// "use client";

// import { useState } from "react";
// import RichTextEditor from "./RichTextEditor";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Download, Eye, FileText, RefreshCw, Sparkles } from "lucide-react";
// import { toast } from "sonner";

// // Sample demo data for testing
// const DEMO_POSITIONS = [
//   { title: "Senior Software Engineer", company: "Tech Corp" },
//   { title: "Product Manager", company: "Innovation Labs" },
//   { title: "UX/UI Designer", company: "Creative Studio" },
//   { title: "Data Scientist", company: "Analytics Inc" },
//   { title: "DevOps Engineer", company: "Cloud Systems" },
// ];

// export default function DemoPage() {
//   const [selectedPosition, setSelectedPosition] = useState(
//     DEMO_POSITIONS[0].title,
//   );
//   const [customTitle, setCustomTitle] = useState("");
//   const [editorContent, setEditorContent] = useState("");
//   const [previewMode, setPreviewMode] = useState(false);

//   const handleEditorChange = (event: any) => {
//     setEditorContent(event.target.value);
//   };

//   const loadDemoData = (positionTitle: string) => {
//     setSelectedPosition(positionTitle);
//     setCustomTitle(positionTitle);
//     toast.info(`Loaded demo data for: ${positionTitle}`, {
//       duration: 2000,
//     });
//   };

//   const resetEditor = () => {
//     setEditorContent("");
//     setCustomTitle("");
//     toast.info("Editor cleared", {
//       duration: 1500,
//     });
//   };

//   const copyToClipboard = () => {
//     if (editorContent) {
//       // Strip HTML tags for plain text copy
//       const tempDiv = document.createElement("div");
//       tempDiv.innerHTML = editorContent;
//       const plainText = tempDiv.textContent || tempDiv.innerText || "";

//       navigator.clipboard.writeText(plainText);
//       toast.success("Copied to clipboard!", {
//         duration: 2000,
//       });
//     } else {
//       toast.error("Nothing to copy", {
//         duration: 1500,
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="text-center space-y-2">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
//             <Sparkles className="h-4 w-4" />
//             AI-Powered Text Editor
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
//             Smart Resume Builder
//           </h1>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Test the AI-powered rich text editor with demo data. Select a
//             position and generate professional content instantly.
//           </p>
//         </div>

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Left Panel - Controls & Demo Data */}
//           <div className="lg:col-span-1 space-y-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <FileText className="h-5 w-5" />
//                   Demo Data
//                 </CardTitle>
//                 <CardDescription>
//                   Select a position to load demo context
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-1 gap-2">
//                   {DEMO_POSITIONS.map((position) => (
//                     <Button
//                       key={position.title}
//                       variant={
//                         selectedPosition === position.title
//                           ? "default"
//                           : "outline"
//                       }
//                       className="justify-start"
//                       onClick={() => loadDemoData(position.title)}
//                     >
//                       <span className="truncate">{position.title}</span>
//                       <span className="ml-auto text-xs text-muted-foreground">
//                         {position.company}
//                       </span>
//                     </Button>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Position Details</CardTitle>
//                 <CardDescription>
//                   Enter or edit the position title for AI generation
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="positionTitle">Position Title</Label>
//                   <Input
//                     id="positionTitle"
//                     placeholder="e.g., Senior Frontend Developer"
//                     value={customTitle}
//                     onChange={(e) => setCustomTitle(e.target.value)}
//                     className="font-mono"
//                   />
//                 </div>
//                 <div className="flex gap-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={resetEditor}
//                     className="flex-1"
//                   >
//                     <RefreshCw className="h-4 w-4 mr-2" />
//                     Reset
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={copyToClipboard}
//                     className="flex-1"
//                   >
//                     <Download className="h-4 w-4 mr-2" />
//                     Copy Text
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Tips</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li className="flex items-start gap-2">
//                     <span className="text-primary">✨</span>
//                     <span>
//                       Click "Generate from AI" to create professional content
//                     </span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="text-primary">📝</span>
//                     <span>
//                       Use the toolbar to format text (bold, lists, links)
//                     </span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="text-primary">🎯</span>
//                     <span>
//                       Position title affects AI-generated content quality
//                     </span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="text-primary">💾</span>
//                     <span>Content auto-saves in your session</span>
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Right Panel - Editor */}
//           <div className="lg:col-span-2 space-y-4">
//             <Tabs defaultValue="edit" className="w-full">
//               <TabsList className="grid w-full grid-cols-2 mb-4">
//                 <TabsTrigger value="edit" onClick={() => setPreviewMode(false)}>
//                   <Eye className="h-4 w-4 mr-2" />
//                   Edit Mode
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="preview"
//                   onClick={() => setPreviewMode(true)}
//                 >
//                   <Eye className="h-4 w-4 mr-2" />
//                   Preview Mode
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="edit" className="mt-0">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-lg">Rich Text Editor</CardTitle>
//                     <CardDescription>
//                       Write and format your professional experience
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <RichTextEditor
//                       onRichTextEditorChange={handleEditorChange}
//                       positionTitle={customTitle}
//                       defaultValue={editorContent}
//                     />
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="preview" className="mt-0">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-lg">Live Preview</CardTitle>
//                     <CardDescription>
//                       How your content will appear
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="prose prose-sm max-w-none p-6 bg-white rounded-lg border min-h-[300px]">
//                       {editorContent ? (
//                         <div
//                           dangerouslySetInnerHTML={{ __html: editorContent }}
//                         />
//                       ) : (
//                         <div className="text-center text-gray-400 py-12">
//                           <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
//                           <p>
//                             No content yet. Generate from AI or start typing!
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>

//             {/* Status Indicator */}
//             {editorContent && (
//               <div className="flex items-center justify-between text-sm text-gray-500 bg-white p-3 rounded-lg border">
//                 <span className="flex items-center gap-2">
//                   <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
//                   Content ready
//                 </span>
//                 <span className="font-mono text-xs">
//                   {editorContent.length} characters • HTML formatted
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
