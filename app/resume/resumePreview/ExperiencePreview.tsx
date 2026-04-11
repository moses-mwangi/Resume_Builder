import { Separator } from "@/components/ui/separator";
import { ResumeData } from "@/types/resume";
import React from "react";
import { resumeTemplates } from "../page";

export default function ExperiencePreview({
  data,
  template,
}: {
  data: ResumeData;
  template: keyof typeof resumeTemplates;
}) {
  const style = resumeTemplates[template];
  return (
    <div>
      <div>
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2
              className="text-lg font-semibold pb-1"
              style={{ borderColor: style.secondaryColor }}
            >
              Work Experience
            </h2>
            <Separator className="h-px mb-4" />
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-5">
                <div className="mb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        className="font-semibold"
                        style={{ color: style.primaryColor }}
                      >
                        {exp.position}
                      </h3>
                      <p className="font-medium text-gray-600">
                        {exp.company} -
                        {exp.location && (
                          <span className="text-sm pl-1 text-gray-600 mb-2 ">
                            {exp.location} (remote)
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </div>
                  </div>
                </div>
                <div
                  className="text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: exp.description as string,
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
