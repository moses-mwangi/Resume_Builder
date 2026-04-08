// components/resume/templates/ModernTemplate.tsx
import { motion } from "framer-motion";
import { ResumeData } from "@/types/resume";
import { cn } from "@/lib/utils";

interface TemplateProps {
  resumeData: ResumeData;
  className?: string;
}

export function ClassicTemplate({ resumeData, className }: TemplateProps) {
  return (
    <div>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur,
        dolorum pariatur, voluptate iste, eveniet magnam quo quasi unde ducimus
        nobis ipsa eius in quae velit doloremque aspernatur porro! Optio,
        cumque?
      </p>
    </div>
  );
}
export function MinimalTemplate({ resumeData, className }: TemplateProps) {
  return (
    <div>
      <h1>THE MINIMUUM DESIGN</h1>
    </div>
  );
}
export function ModernTemplate({ resumeData, className }: TemplateProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getInitials = () => {
    return resumeData.personalInfo.fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getSkillLevelColor = (level: number) => {
    const colors = {
      1: "bg-red-500",
      2: "bg-orange-500",
      3: "bg-yellow-500",
      4: "bg-green-500",
      5: "bg-emerald-500",
    };
    return colors[level as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className={cn("p-8 font-sans", className)}>
      {/* Hero Section with Gradient Background */}
      <div className="relative mb-8 -mt-8 -mx-8 px-8 pt-8 pb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-t-xl">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">
                {resumeData.personalInfo.fullName}
              </h1>
              <p className="text-blue-100 text-lg mb-4">
                {resumeData.personalInfo.title || "Professional Resume"}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-blue-100">
                <span>📧 {resumeData.personalInfo.email}</span>
                <span>📱 {resumeData.personalInfo.phone}</span>
                <span>📍 {resumeData.personalInfo.location}</span>
              </div>
              {(resumeData.personalInfo.website ||
                resumeData.personalInfo.linkedin ||
                resumeData.personalInfo.github) && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {resumeData.personalInfo.website && (
                    <a
                      href={resumeData.personalInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-200 transition-colors text-sm"
                    >
                      🌐 Portfolio
                    </a>
                  )}
                  {resumeData.personalInfo.linkedin && (
                    <a
                      href={resumeData.personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-200 transition-colors text-sm"
                    >
                      💼 LinkedIn
                    </a>
                  )}
                  {resumeData.personalInfo.github && (
                    <a
                      href={resumeData.personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-200 transition-colors text-sm"
                    >
                      💻 GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {getInitials()}
            </div>
          </div>

          {resumeData.personalInfo.summary && (
            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <p className="text-white text-sm leading-relaxed">
                {resumeData.personalInfo.summary}
              </p>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-black/10 rounded-t-xl"></div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Skills Section */}
          {resumeData.skills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">
                  ⚡
                </span>
                Skills & Expertise
              </h3>
              <div className="space-y-4">
                {Object.entries(
                  resumeData.skills.reduce(
                    (acc, skill) => {
                      if (!acc[skill.category]) acc[skill.category] = [];
                      acc[skill.category].push(skill);
                      return acc;
                    },
                    {} as Record<string, typeof resumeData.skills>,
                  ),
                ).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-300">
                      {category}
                    </h4>
                    <div className="space-y-2">
                      {skills.map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{skill.name}</span>
                            <span className="text-gray-500 text-xs">
                              {
                                [
                                  "Beginner",
                                  "Novice",
                                  "Intermediate",
                                  "Advanced",
                                  "Expert",
                                ][skill.level - 1]
                              }
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(skill.level / 5) * 100}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className={`${getSkillLevelColor(skill.level)} h-2 rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Languages */}
          {resumeData.languages.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">
                  🌐
                </span>
                Languages
              </h3>
              <div className="space-y-2">
                {resumeData.languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {resumeData.certificates.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">
                  🏆
                </span>
                Certifications
              </h3>
              <div className="space-y-3">
                {resumeData.certificates.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-medium text-sm">{cert.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {cert.issuer} • {formatDate(cert.date)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">
                  💼
                </span>
                Work Experience
              </h3>
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border-l-4 border-blue-500 pl-4 hover:shadow-lg transition-shadow rounded-r-lg"
                  >
                    <div className="flex flex-wrap justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-lg">{exp.position}</h4>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(exp.startDate)} -{" "}
                        {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{exp.location}</p>
                    <ul className="space-y-1">
                      {exp.description.map((desc, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                        >
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">
                  🎓
                </span>
                Education
              </h3>
              <div className="space-y-4">
                {resumeData.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800 rounded-lg p-4"
                  >
                    <div className="flex flex-wrap justify-between items-start">
                      <div>
                        <h4 className="font-bold">
                          {edu.degree} in {edu.field}
                        </h4>
                        <p className="text-blue-600 dark:text-blue-400">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{edu.location}</p>
                    {edu.gpa && (
                      <p className="text-sm mt-1">
                        <span className="font-semibold">GPA:</span> {edu.gpa}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Projects */}
          {resumeData.projects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">
                  🚀
                </span>
                Featured Projects
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {resumeData.projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-blue-600 dark:text-blue-400">
                        {project.name}
                      </h4>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 hover:text-blue-600"
                        >
                          View Project →
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ul className="space-y-1">
                      {project?.highlights?.map((highlight, i) => (
                        <li
                          key={i}
                          className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2"
                        >
                          <span className="text-green-500">✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 text-center text-xs text-gray-400 border-t">
        <p>
          © {new Date().getFullYear()} {resumeData.personalInfo.fullName} •
          Professional Resume
        </p>
      </div>
    </div>
  );
}
