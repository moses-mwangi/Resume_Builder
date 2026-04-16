"use client";

import { Separator } from "@/components/ui/separator";
import { ResumeData, Skill } from "@/types/resume";
import { resumeTemplates } from "../../page";
import { Code, Icon } from "lucide-react";
import React, { useState } from "react";

export default function SkillsPreview({
  data,
  template,
}: {
  data: ResumeData;
  template: keyof typeof resumeTemplates;
}) {
  const style = resumeTemplates[template];
  const [skillsViewMode, setSkillsViewMode] = useState<"detailed" | "compact">(
    "detailed",
  );
  const skills = data.skills;
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  // Group skills by category
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      const category = skill.category || "Technical";
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  // Calculate skill level distribution
  const getLevelColor = (level: number) => {
    if (level >= 4) return "bg-green-500";
    if (level >= 3) return "bg-blue-500";
    if (level >= 2) return "bg-yellow-500";
    return "bg-gray-500";
  };

  const getLevelText = (level: number) => {
    const levels = ["Learning", "Basic", "Proficient", "Advanced", "Expert"];
    return levels[level - 1] || "Intermediate";
  };

  // Get top skills (highest level)
  const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 3);

  return (
    <div>
      {data.skills.length > 0 && (
        <div className="mb-6 page-break">
          <h2
            // className="text-lg font-semibold mb-3 pb-3 border-b-1 border-gray-200"
            className="text-lg font-semibold pb-1"
            style={{ borderColor: style?.secondaryColor }}
          >
            Technical Skills
          </h2>
          {/* <Separator className="mb-4 h-0.2" /> */}
          <Separator className="h-px mb-4" />
          <div className="grid grid-cols-3 gap-x-12 gap-y-8">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => {
              return (
                <div key={category}>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <Code className="w-4 h-4 text-blue-600" />
                      </div>
                      <h3
                        className="font-medium "
                        style={{ color: style.primaryColor }}
                      >
                        {category}
                      </h3>
                      <span className="text-xs text-gray-400">
                        ({categorySkills.length})
                      </span>
                    </div>

                    <div className="grid grid-cols-1 items-center gap-y-2">
                      {categorySkills.map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between text-[15px]">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-700 ">
                                {skill.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
