import { Separator } from "@/components/ui/separator";
import { ResumeData } from "@/types/resume";
import React from "react";
import { resumeTemplates } from "../page";

export default function LanguagePreview({
  data,
  template,
}: {
  data: ResumeData;
  template: keyof typeof resumeTemplates;
}) {
  const style = resumeTemplates[template];
  return (
    <div>
      {/* Languages */}
      {data.languages.length > 0 && (
        <div>
          <h2
            className="text-lg font-semibold pb-1"
            style={{ borderColor: style.secondaryColor }}
          >
            Languages
          </h2>
          <Separator className="h-px mb-4" />
          <div className="flex flex-wrap gap-4">
            {data.languages.map((lang) => (
              <div key={lang.id}>
                <span className="font-medium">{lang.name}</span>
                <span className="text-gray-500 text-sm ml-2">
                  ({lang.proficiency})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
