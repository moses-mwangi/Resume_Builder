import { Separator } from "@/components/ui/separator";
import { ResumeData } from "@/types/resume";
import React from "react";
import { resumeTemplates } from "../page";

export default function CertificatePreview({
  data,
  template,
}: {
  data: ResumeData;
  template: keyof typeof resumeTemplates;
}) {
  const style = resumeTemplates[template];
  return (
    <div>
      {data.certificates.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-lg font-semibold pb-1"
            style={{ borderColor: style.secondaryColor }}
          >
            Certifications
          </h2>
          <Separator className="h-px mb-4" />
          <div className="space-y-2">
            {data.certificates.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  {cert.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
