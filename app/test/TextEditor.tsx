// "use client";

// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { PersonalInfo } from "@/types/resume";
// import { Brain, LoaderCircle } from "lucide-react";
// import { useState } from "react";
// import {
//   BtnBold,
//   BtnBulletList,
//   BtnItalic,
//   BtnLink,
//   BtnNumberedList,
//   BtnStrikeThrough,
//   BtnUnderline,
//   Editor,
//   EditorProvider,
//   Separator,
//   Toolbar,
// } from "react-simple-wysiwyg";
// import { toast } from "sonner";

// const generateAIContent = async (positionTitle: string): Promise<string> => {
//   await new Promise((resolve) => setTimeout(resolve, 1500));

//   const demoTemplates: Record<string, string[]> = {
//     "Software Engineer": [
//       "• Developed and maintained full-stack web applications using React, Node.js, and TypeScript",
//       "• Improved application performance by 40% through code optimization and lazy loading",
//       "• Collaborated with cross-functional teams to deliver 15+ major features on schedule",
//       "• Implemented CI/CD pipelines reducing deployment time by 60%",
//       "• Mentored 3 junior developers and conducted code reviews for quality assurance",
//     ],
//     "Product Manager": [
//       "• Led product strategy for a SaaS platform serving 100K+ monthly active users",
//       "• Increased user engagement by 35% through data-driven feature prioritization",
//       "• Managed product roadmap and coordinated with engineering, design, and marketing teams",
//       "• Conducted 50+ user interviews to validate product hypotheses",
//       "• Launched 3 major product releases with 99.9% uptime",
//     ],
//     "UX Designer": [
//       "• Designed intuitive user interfaces that increased conversion rates by 28%",
//       "• Created interactive prototypes and conducted usability testing with 100+ participants",
//       "• Established design system used across 5 product lines",
//       "• Collaborated with developers to ensure pixel-perfect implementation",
//       "• Reduced user friction points identified through heat mapping and analytics",
//     ],
//     "Data Scientist": [
//       "• Developed ML models predicting customer churn with 89% accuracy",
//       "• Built ETL pipelines processing 10M+ daily records using Python and SQL",
//       "• Created dashboards that saved stakeholders 15+ hours weekly",
//       "• Implemented A/B testing framework resulting in 22% revenue increase",
//       "• Presented complex insights to C-suite executives with clear visualizations",
//     ],
//   };

//   // Find matching template or use generic one
//   const matchedKey = Object.keys(demoTemplates).find((key) =>
//     positionTitle.toLowerCase().includes(key.toLowerCase()),
//   );

//   const bullets = matchedKey
//     ? demoTemplates[matchedKey]
//     : [
//         `• Led strategic initiatives for ${positionTitle} role with measurable outcomes`,
//         `• Increased team efficiency by implementing best practices and automation`,
//         `• Collaborated with stakeholders to define and achieve project milestones`,
//         `• Received recognition for exceptional performance and innovation`,
//         `• Drove continuous improvement through data analysis and feedback loops`,
//       ];

//   // Return as HTML string
//   return `<ul>${bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>`;
// };

// interface RichTextEditorProps {
//   onRichTextEditorChange?: (event: any) => void;
//   index?: number;
//   defaultValue?: string;
//   // positionTitle?: string; // Make position title controllable from parent
//   data: PersonalInfo;
//   onUpdate: (field: keyof PersonalInfo, value: string) => void;
// }

// function RichTextEditor({
//   onRichTextEditorChange,
//   index,
//   defaultValue = "",
//   // positionTitle = "",
//   data,
//   onUpdate,
// }: RichTextEditorProps) {
//   // const [value, setValue] = useState(defaultValue);
//   const [loading, setLoading] = useState(false);

//   let positionTitle = data?.title ? data.title : "";

//   const GenerateSummaryFromAI = async () => {
//     if (!positionTitle || positionTitle.trim() === "") {
//       toast.error("Please add a position title first", {
//         description:
//           "Fill in the position title field above to generate AI content",
//         duration: 3000,
//       });
//       return;
//     }

//     setLoading(true);
//     toast.loading("AI is generating your content...", {
//       id: "ai-generate",
//     });

//     try {
//       const generatedHTML = await generateAIContent(positionTitle);
//       // setValue(generatedHTML);

//       // Trigger parent component update if callback exists
//       if (onRichTextEditorChange) {
//         const mockEvent = { target: { value: generatedHTML } };
//         onRichTextEditorChange(mockEvent);
//       }

//       toast.success("AI generated successfully!", {
//         id: "ai-generate",
//         duration: 2000,
//       });
//     } catch (error) {
//       console.error("AI generation error:", error);
//       toast.error("Failed to generate content", {
//         id: "ai-generate",
//         description: "Please try again later",
//         duration: 3000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-3">
//       <div className="flex justify-between items-center mb-2">
//         <Label htmlFor="summary">Professional Summary</Label>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={GenerateSummaryFromAI}
//           disabled={loading}
//           className="gap-2 border-primary text-primary hover:bg-primary/10 transition-all"
//         >
//           {loading ? (
//             <>
//               <LoaderCircle className="h-4 w-4 animate-spin" />
//               <span>Generating...</span>
//             </>
//           ) : (
//             <>
//               <Brain className="h-4 w-4" />
//               <span>Generate from AI</span>
//             </>
//           )}
//         </Button>
//       </div>
//       {/* Software Engineer */}
//       <EditorProvider>
//         <Editor
//           id="summary"
//           value={data?.summary}
//           // onChange={(e) => {
//           //   setValue(e.target.value);
//           //   if (onRichTextEditorChange) {
//           //     onRichTextEditorChange(e);
//           //   }
//           // }}
//           onChange={(e) => onUpdate("summary", e.target.value)}
//           className="rich-text-editor"
//         >
//           <Toolbar>
//             <BtnBold />
//             <BtnItalic />
//             <BtnUnderline />
//             <BtnStrikeThrough />
//             <Separator />
//             <BtnNumberedList />
//             <BtnBulletList />
//             <Separator />
//             <BtnLink />
//           </Toolbar>
//         </Editor>
//       </EditorProvider>

//       <style jsx global>{`
//         .rich-text-editor {
//           border: 1px solid #e2e8f0;
//           border-radius: 0.5rem;
//           overflow: hidden;
//           transition: all 0.2s ease;
//         }
//         .rich-text-editor:focus-within {
//           border-color: #3b82f6;
//           box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
//         }
//         .rich-text-editor .rsw-toolbar {
//           background: #f8fafc;
//           border-bottom: 1px solid #e2e8f0;
//           padding: 0.5rem;
//         }
//         .rich-text-editor .rsw-editor {
//           min-height: 200px;
//           padding: 1rem;
//           font-size: 0.875rem;
//           line-height: 1.6;
//         }
//         .rich-text-editor ul,
//         .rich-text-editor ol {
//           margin-left: 1.5rem;
//           margin-bottom: 0.5rem;
//         }
//         .rich-text-editor li {
//           margin-bottom: 0.25rem;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default RichTextEditor;

"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PersonalInfo } from "@/types/resume";
import { Brain, LoaderCircle } from "lucide-react";
import { useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { toast } from "sonner";
import sanitizeHtml from "sanitize-html";

/**
 * Simulated AI generator
 */
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
    "Data Scientist": [
      "Developed machine learning models to solve business problems",
      "Built data pipelines processing large-scale datasets",
      "Created dashboards and visualizations for stakeholders",
      "Implemented A/B testing frameworks for product improvements",
      "Presented insights clearly to technical and non-technical audiences",
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

  return `<ul>${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`;
};

interface RichTextEditorProps {
  data: PersonalInfo;
  onUpdate: (field: keyof PersonalInfo, value: string) => void;
}

function RichTextEditor({ data, onUpdate }: RichTextEditorProps) {
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    const positionTitle = data?.title?.trim() || "";

    if (!positionTitle) {
      toast.error("Please add a position title first", {
        description:
          "Fill in the position title field above to generate AI content",
      });
      return;
    }

    setLoading(true);
    toast.loading("AI is generating your content...", {
      id: "ai-generate",
    });

    try {
      const generatedHTML = await generateAIContent(positionTitle);

      // ✅ Directly update parent state
      onUpdate("summary", generatedHTML);

      toast.success("AI generated successfully!", {
        id: "ai-generate",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate content", {
        id: "ai-generate",
      });
    } finally {
      setLoading(false);
    }
  };

  const normalizeHTML = (html: string) => {
    return html.replace(/<div>/g, "<p>").replace(/<\/div>/g, "</p>");
  };

  // const cleaned = normalizeHTML(cleanHTML);
  // onUpdate("summary", cleaned);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Label htmlFor="summary">Professional Summary</Label>

        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="gap-2 border-primary-o text-primary-p hover:bg-primary-p/10"
        >
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate from AI
            </>
          )}
        </Button>
      </div>

      {/* Editor */}
      <EditorProvider>
        <Editor
          id="summary"
          value={data?.summary || ""}
          // onChange={(e) => onUpdate("summary", e.target.value)}
          onChange={(e) => {
            const cleanHTML = sanitizeHtml(e.target.value, {
              allowedTags: [
                "b",
                "i",
                "em",
                "strong",
                "a",
                "ul",
                "ol",
                "li",
                "p",
                "br",
              ],
              allowedAttributes: {
                a: ["href"],
              },
            });

            onUpdate("summary", cleanHTML);
          }}
          className="rich-text-editor"
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>

      {/* Styles */}
      <style jsx global>{`
        .rich-text-editor {
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .rich-text-editor:focus-within {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }

        .rich-text-editor .rsw-toolbar {
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          padding: 0.5rem;
        }

        .rich-text-editor .rsw-editor {
          min-height: 200px;
          padding: 1rem;
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .rich-text-editor ul,
        .rich-text-editor ol {
          margin-left: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .rich-text-editor li {
          margin-bottom: 0.25rem;
        }
      `}</style>
    </div>
  );
}

export default RichTextEditor;
