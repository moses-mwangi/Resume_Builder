import { Separator } from "@/components/ui/separator";
import { ResumeData } from "@/types/resume";
import React from "react";
import { resumeTemplates } from "../page";

export default function EducationPreview({
  data,
  template,
}: {
  data: ResumeData;
  template: keyof typeof resumeTemplates;
}) {
  const style = resumeTemplates[template];
  return (
    <div>
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-lg font-semibold pb-1"
            style={{ borderColor: style.secondaryColor }}
          >
            Education
          </h2>
          <Separator className="h-px mb-4" />
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3
                    className="font-semibold"
                    style={{ color: style.primaryColor }}
                  >
                    {edu.institution}
                  </h3>
                  <p className="text-gray-700">
                    {edu.degree} in {edu.field}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                </div>
              </div>
              {edu.gpa && (
                <p className="text-sm text-gray-500 mt-1">GPA: {edu.gpa}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
