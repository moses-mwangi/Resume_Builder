"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface DisplaySummaryProps {
  content?: string;
  source?: "localStorage" | "prop";
}

export default function DisplaySummary({
  content,
  source = "prop",
}: DisplaySummaryProps) {
  const [summaryHtml, setSummaryHtml] = useState("");

  useEffect(() => {
    if (source === "localStorage") {
      const saved = localStorage.getItem("resume_summary");
      if (saved) {
        setSummaryHtml(saved);
      }
    } else if (content) {
      setSummaryHtml(content);
    }
  }, [content, source]);

  if (!summaryHtml) {
    return (
      <div className="text-gray-400 italic p-4 text-center">
        No summary available. Create one in the Resume Builder!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: summaryHtml }} />
      </div>
    </div>
  );
}
