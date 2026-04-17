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

const PROMPT =
  "position title: {positionTitle}. Based on the position title, generate 5-7 resume experience bullet points. Do not include experience level. Do not return JSON. Return only HTML list items.";

function RichTextEditor() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [positionTitle, setPositionTitle] = useState("");

  const handleGenerate = async () => {
    if (!positionTitle.trim()) return;

    setLoading(true);
    try {
      const finalPrompt = PROMPT.replace("{positionTitle}", positionTitle);

      // 🔥 Replace this with your actual API call
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      const data = await res.json();

      // assuming API returns HTML string
      setValue(data.result);
    } catch (error) {
      console.error("AI generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-24 py-24">
      {/* Position Title Input */}
      <div className="mb-4">
        <label className="text-xs block mb-1">Position Title</label>
        <input
          type="text"
          value={positionTitle}
          onChange={(e) => setPositionTitle(e.target.value)}
          placeholder="e.g. Frontend Developer"
          className="w-full px-3 py-2 text-sm border rounded-lg outline-none"
        />
      </div>

      {/* Header */}
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenerate}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin h-4 w-4" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>

      {/* Editor */}
      <EditorProvider>
        <Editor value={value} onChange={(e) => setValue(e.target.value)}>
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
    </div>
  );
}

export default RichTextEditor;
