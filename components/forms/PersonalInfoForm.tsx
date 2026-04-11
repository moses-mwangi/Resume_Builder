// "use client";
// import RichTextEditor from "@/app/test/TextEditor";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { PersonalInfo } from "@/types/resume";
// import { AnimatePresence, motion } from "framer-motion";
// import { Brain, LoaderCircle, User } from "lucide-react";
// import { Card } from "../ui/card";
// import { Button } from "../ui/button";

// export const PersonalInfoForm = ({
//   data,
//   onUpdate,
//   errors,
// }: {
//   data: PersonalInfo;
//   onUpdate: (field: keyof PersonalInfo, value: string) => void;
//   errors: Record<string, string>;
// }) => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     className="space-y-4"
//   >
//     <div>
//       <h3 className="text-lg font-semibold flex items-center gap-2">
//         <User className="w-5 h-5 text-blue-600" />
//         Personal Information
//       </h3>
//       <p className="text-sm text-gray-500 mt-1">Tell us about yourself</p>
//     </div>
//     <AnimatePresence>
//       <Card className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 p-4">
//         <div>
//           <Label htmlFor="fullName">
//             Full Name <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             id="fullName"
//             value={data.fullName || ""}
//             onChange={(e) => onUpdate("fullName", e.target.value)}
//             placeholder="John Doe"
//             className={`mt-1 ${errors.fullName ? "border-red-500" : ""}`}
//           />
//           {errors.fullName && (
//             <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
//           )}
//         </div>

//         <div>
//           <Label htmlFor="title">
//             Title <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             id="title"
//             value={data.title ?? ""}
//             onChange={(e) => onUpdate("title", e.target.value)}
//             placeholder="Software Engineer"
//             className={`mt-1 ${errors.title ? "border-red-500" : ""}`}
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm mt-1">{errors.title}</p>
//           )}
//         </div>
//         <div>
//           <Label htmlFor="email">
//             Email <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             id="email"
//             type="email"
//             value={data.email ?? ""}
//             onChange={(e) => onUpdate("email", e.target.value)}
//             placeholder="john@example.com"
//             className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//           )}
//         </div>
//         <div>
//           <Label htmlFor="phone">Phone</Label>
//           <Input
//             id="phone"
//             value={data.phone ?? ""}
//             onChange={(e) => onUpdate("phone", e.target.value)}
//             placeholder="+1 (555) 123-4567"
//             className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
//           />
//           {errors.phone && (
//             <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//           )}
//         </div>
//         <div>
//           <Label htmlFor="location">Location</Label>
//           <Input
//             id="location"
//             value={data.location ?? ""}
//             onChange={(e) => onUpdate("location", e.target.value)}
//             placeholder="New York, NY"
//             className="mt-1"
//           />
//         </div>
//         <div>
//           <Label htmlFor="website">Website</Label>
//           <Input
//             id="website"
//             value={data.website ?? ""}
//             onChange={(e) => onUpdate("website", e.target.value)}
//             placeholder="https://yourwebsite.com"
//             className="mt-1"
//           />
//         </div>
//         <div>
//           <Label htmlFor="linkedin">LinkedIn</Label>
//           <Input
//             id="linkedin"
//             value={data.linkedin ?? ""}
//             onChange={(e) => onUpdate("linkedin", e.target.value)}
//             placeholder="https://linkedin.com/in/yourprofile"
//             className="mt-1"
//           />
//         </div>
//         <div>
//           <Label htmlFor="github">GitHub</Label>
//           <Input
//             id="github"
//             value={data.github ?? ""}
//             onChange={(e) => onUpdate("github", e.target.value)}
//             placeholder="https://github.com/yourusername"
//             className="mt-1"
//           />
//         </div>
//         <div className=" col-span-2">
//           <div className="flex justify-between items-center">
//             <Label htmlFor="summary">Professional Summary</Label>
//             <Button
//               variant="outline"
//               size="sm"
//               className="gap-2 border-primary-o text-primary-p hover:bg-primary-p/10"
//             >
//               <Brain className="h-4 w-4" />
//               Generate from AI
//             </Button>
//           </div>
//           <Textarea
//             id="summary"
//             value={data.summary ?? ""}
//             onChange={(e) => onUpdate("summary", e.target.value)}
//             placeholder="https://github.com/yourusername"
//             className="mt-1"
//           />
//         </div>
//         <div className=" col-span-2">
//           <RichTextEditor data={data} onUpdate={onUpdate} />
//         </div>
//       </Card>
//     </AnimatePresence>
//   </motion.div>
// );

"use client";
import SummaryEditor from "@/app/editor/SummaryEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PersonalInfo } from "@/types/resume";
import { AnimatePresence, motion } from "framer-motion";
import { User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "../ui/card";

// Custom AI generation function
const generateAIContent = async (positionTitle: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const demoTemplates: Record<string, string[]> = {
    "Software Engineer": [
      "Developed and maintained full-stack web applications using React, Node.js, and TypeScript",
      "Improved application performance by 40% through code optimization and lazy loading",
      "Collaborated with cross-functional teams to deliver 15+ major features on schedule",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Mentored junior developers and conducted code reviews for quality assurance",
    ],
    "Product Manager": [
      "Led product strategy for a SaaS platform serving thousands of users",
      "Increased user engagement through data-driven feature prioritization",
      "Managed product roadmap and coordinated with cross-functional teams",
      "Conducted user interviews to validate product hypotheses",
      "Successfully launched multiple product releases with high reliability",
    ],
    "UX Designer": [
      "Designed intuitive user interfaces that improved user experience and engagement",
      "Created prototypes and conducted usability testing sessions",
      "Built and maintained scalable design systems",
      "Collaborated closely with developers for implementation",
      "Identified and resolved user friction points using analytics",
    ],
  };

  const matchedKey = Object.keys(demoTemplates).find((key) =>
    positionTitle.toLowerCase().includes(key.toLowerCase()),
  );

  const bullets = matchedKey
    ? demoTemplates[matchedKey]
    : [
        `Led strategic initiatives as a ${positionTitle}`,
        "Improved team efficiency through automation and best practices",
        "Collaborated with stakeholders to achieve business goals",
        "Delivered high-quality results with measurable impact",
        "Continuously improved processes using data and feedback",
      ];

  // Return as HTML string for rich text editor
  return `<ul>${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`;
};

export const PersonalInfoForm = ({
  data,
  onUpdate,
  errors,
}: {
  data: PersonalInfo;
  onUpdate: (field: keyof PersonalInfo, value: string) => void;
  errors: Record<string, string>;
}) => {
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleAIGenerate = async () => {
    if (!data.title?.trim()) {
      toast.error("Please add a position title first", {
        description: "Fill in the title field above to generate AI content",
      });
      return;
    }

    setIsGeneratingAI(true);
    toast.loading("AI is generating your content...", {
      id: "ai-generate-summary",
    });

    try {
      const generatedHTML = await generateAIContent(data.title);
      onUpdate("summary", generatedHTML);
      toast.success("AI generated successfully!", {
        id: "ai-generate-summary",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate content", {
        id: "ai-generate-summary",
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Personal Information
        </h3>
        <p className="text-sm text-gray-500 mt-1">Tell us about yourself</p>
      </div>

      <AnimatePresence>
        <Card className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 p-4">
          <div>
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              value={data.fullName || ""}
              onChange={(e) => onUpdate("fullName", e.target.value)}
              placeholder="John Doe"
              className={`mt-1 ${errors.fullName ? "border-red-500" : ""}`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={data.title ?? ""}
              onChange={(e) => onUpdate("title", e.target.value)}
              placeholder="Software Engineer"
              className={`mt-1 ${errors.title ? "border-red-500" : ""}`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email ?? ""}
              onChange={(e) => onUpdate("email", e.target.value)}
              placeholder="john@example.com"
              className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={data.phone ?? ""}
              onChange={(e) => onUpdate("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={data.location ?? ""}
              onChange={(e) => onUpdate("location", e.target.value)}
              placeholder="New York, NY"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={data.website ?? ""}
              onChange={(e) => onUpdate("website", e.target.value)}
              placeholder="https://yourwebsite.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={data.linkedin ?? ""}
              onChange={(e) => onUpdate("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              value={data.github ?? ""}
              onChange={(e) => onUpdate("github", e.target.value)}
              placeholder="https://github.com/yourusername"
              className="mt-1"
            />
          </div>
          <div className="col-span-2">
            <Label className="pb-10" htmlFor="summary">
              Professional Summary
            </Label>
            {/* <Textarea
              id="summary"
              value={data.summary ?? ""}
              onChange={(e) => onUpdate("summary", e.target.value)}
              placeholder="https://github.com/yourusername"
              className="mt-1 mb-20"
            /> */}
            <SummaryEditor
              initialContent={data.summary ?? ""}
              onChange={(value) => onUpdate("summary", value)}
            />
          </div>
        </Card>
      </AnimatePresence>
    </motion.div>
  );
};
