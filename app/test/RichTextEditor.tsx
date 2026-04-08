"use client";

import { Button } from "@/components/ui/button";
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

// Demo AI service simulation (replace with actual API call)
const generateAIContent = async (positionTitle: string): Promise<string> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Demo AI responses based on position title
  const demoTemplates: Record<string, string[]> = {
    "Software Engineer": [
      "• Developed and maintained full-stack web applications using React, Node.js, and TypeScript",
      "• Improved application performance by 40% through code optimization and lazy loading",
      "• Collaborated with cross-functional teams to deliver 15+ major features on schedule",
      "• Implemented CI/CD pipelines reducing deployment time by 60%",
      "• Mentored 3 junior developers and conducted code reviews for quality assurance",
    ],
    "Product Manager": [
      "• Led product strategy for a SaaS platform serving 100K+ monthly active users",
      "• Increased user engagement by 35% through data-driven feature prioritization",
      "• Managed product roadmap and coordinated with engineering, design, and marketing teams",
      "• Conducted 50+ user interviews to validate product hypotheses",
      "• Launched 3 major product releases with 99.9% uptime",
    ],
    "UX Designer": [
      "• Designed intuitive user interfaces that increased conversion rates by 28%",
      "• Created interactive prototypes and conducted usability testing with 100+ participants",
      "• Established design system used across 5 product lines",
      "• Collaborated with developers to ensure pixel-perfect implementation",
      "• Reduced user friction points identified through heat mapping and analytics",
    ],
    "Data Scientist": [
      "• Developed ML models predicting customer churn with 89% accuracy",
      "• Built ETL pipelines processing 10M+ daily records using Python and SQL",
      "• Created dashboards that saved stakeholders 15+ hours weekly",
      "• Implemented A/B testing framework resulting in 22% revenue increase",
      "• Presented complex insights to C-suite executives with clear visualizations",
    ],
  };

  // Find matching template or use generic one
  const matchedKey = Object.keys(demoTemplates).find((key) =>
    positionTitle.toLowerCase().includes(key.toLowerCase()),
  );

  const bullets = matchedKey
    ? demoTemplates[matchedKey]
    : [
        `• Led strategic initiatives for ${positionTitle} role with measurable outcomes`,
        `• Increased team efficiency by implementing best practices and automation`,
        `• Collaborated with stakeholders to define and achieve project milestones`,
        `• Received recognition for exceptional performance and innovation`,
        `• Drove continuous improvement through data analysis and feedback loops`,
      ];

  // Return as HTML string
  return `<ul>${bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>`;
};

interface RichTextEditorProps {
  onRichTextEditorChange?: (event: any) => void;
  index?: number;
  defaultValue?: string;
  positionTitle?: string; // Make position title controllable from parent
}

function RichTextEditor({
  onRichTextEditorChange,
  index,
  defaultValue = "",
  positionTitle = "",
}: RichTextEditorProps) {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    // Check if position title is provided
    if (!positionTitle || positionTitle.trim() === "") {
      toast.error("Please add a position title first", {
        description:
          "Fill in the position title field above to generate AI content",
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    toast.loading("AI is generating your content...", {
      id: "ai-generate",
    });

    try {
      const generatedHTML = await generateAIContent(positionTitle);
      setValue(generatedHTML);

      // Trigger parent component update if callback exists
      if (onRichTextEditorChange) {
        const mockEvent = { target: { value: generatedHTML } };
        onRichTextEditorChange(mockEvent);
      }

      toast.success("AI generated successfully!", {
        id: "ai-generate",
        duration: 2000,
      });
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error("Failed to generate content", {
        id: "ai-generate",
        description: "Please try again later",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">
          Professional Summary
        </label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="gap-2 border-primary text-primary hover:bg-primary/10 transition-all"
        >
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Brain className="h-4 w-4" />
              <span>Generate from AI</span>
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (onRichTextEditorChange) {
              onRichTextEditorChange(e);
            }
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
