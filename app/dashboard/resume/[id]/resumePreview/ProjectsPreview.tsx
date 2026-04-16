import { Separator } from "@/components/ui/separator";
import { ResumeData } from "@/types/resume";
import React from "react";
import { resumeTemplates } from "../../page";

export default function ProjectsPreview({
  data,
  template,
}: {
  data: ResumeData;
  template: keyof typeof resumeTemplates;
}) {
  const style = resumeTemplates[template];
  return (
    <div>
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-lg font-semibold pb-2"
            style={{ borderColor: style.secondaryColor }}
          >
            Projects
          </h2>
          <Separator className="mb-4 pb-px" />
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4 ">
              <div className="flex justify-between pb-2 items-start">
                <h3
                  className="font-semibold"
                  style={{ color: style.primaryColor }}
                >
                  {project.name}
                </h3>
                <div className="text-sm text-gray-500">
                  {project.startDate} - {project.endDate}
                </div>
              </div>

              <div
                className="text-sm text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: project.description as string,
                }}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor: `${style.primaryColor}20`,
                      color: style.primaryColor,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 mt-2 text-sm">
                {project.link && (
                  <a
                    href={project.link}
                    className="text-blue-600 hover:underline"
                  >
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    className="text-blue-600 hover:underline"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
