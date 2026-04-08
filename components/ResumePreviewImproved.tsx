"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { PDFExporter } from "./PDFExporter";
import { ResumeData } from "@/types/resume";
import { Download, Eye, FileText } from "lucide-react";

interface ResumePreviewProps {
  data?: ResumeData;
  template?: "modern" | "classic" | "creative";
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    summary:
      "Experienced software developer with a passion for creating innovative solutions and leading teams to success. Specialized in full-stack development with expertise in modern web technologies and best practices.",
  },
  experience: [
    {
      id: "1",
      company: "Tech Innovation Labs",
      position: "Senior Full Stack Developer",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "2024-01",
      current: false,
      description: [
        "Led development of microservices architecture serving 1M+ users",
        "Improved application performance by 40% through optimization",
        "Mentored team of 5 junior developers",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
      ],
    },
    {
      id: "2",
      company: "Digital Solutions Inc",
      position: "Full Stack Developer",
      location: "New York, NY",
      startDate: "2020-06",
      endDate: "2021-12",
      current: false,
      description: [
        "Developed RESTful APIs for e-commerce platform",
        "Built responsive frontend with React and TypeScript",
        "Collaborated with UX team to improve user experience",
        "Reduced bug reports by 35% through comprehensive testing",
      ],
    },
  ],
  education: [
    {
      id: "1",
      institution: "Massachusetts Institute of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science & Engineering",
      location: "Cambridge, MA",
      startDate: "2016-09",
      endDate: "2020-05",
      gpa: "3.8",
      achievements: [
        "Dean's List for 6 semesters",
        "President of Computer Science Club",
        "Published research paper on Machine Learning",
      ],
    },
  ],
  skills: [
    { id: "1", name: "React.js", category: "Frontend", level: 5 },
    { id: "2", name: "TypeScript", category: "Language", level: 5 },
    { id: "3", name: "Node.js", category: "Backend", level: 4 },
    { id: "4", name: "Python", category: "Language", level: 4 },
    { id: "5", name: "AWS", category: "Cloud", level: 4 },
    { id: "6", name: "Docker", category: "DevOps", level: 3 },
    { id: "7", name: "PostgreSQL", category: "Database", level: 4 },
    { id: "8", name: "MongoDB", category: "Database", level: 3 },
  ],
  projects: [
    {
      id: "1",
      name: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory management",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "https://ecommerce-demo.com",
      github: "https://github.com/johndoe/ecommerce",
      highlights: [
        "Handled 10,000+ concurrent users",
        "95% uptime in production",
        "Reduced checkout time by 40%",
      ],
    },
  ],
  certificates: [],
  languages: [
    { id: "1", name: "English", proficiency: "Native" },
    { id: "2", name: "Spanish", proficiency: "Professional" },
  ],
};

export function ResumePreviewImproved({
  data = defaultResumeData,
  template = "modern",
}: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      await PDFExporter.exportToPDF(resumeRef.current, {
        filename: `${data.personalInfo.fullName.replace(/\s+/g, "-").toLowerCase()}-resume.pdf`,
        quality: 0.95,
        scale: 2,
      });
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getSkillLevelWidth = (level: number) => {
    return (level / 5) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Resume Preview</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()}>
            <FileText className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button onClick={handleDownloadPDF}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div
          ref={resumeRef}
          data-resume-content
          className="max-w-4xl mx-auto bg-white text-gray-900"
          style={{
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            lineHeight: "1.6",
            color: "#1f2937",
          }}
        >
          {/* Header Section */}
          <div
            style={{
              borderBottom: "3px solid #3b82f6",
              paddingBottom: "24px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <div style={{ flex: 1 }}>
                <h1
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    color: "#111827",
                  }}
                >
                  {data.personalInfo.fullName}
                </h1>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    fontSize: "14px",
                    color: "#6b7280",
                  }}
                >
                  <span>📧 {data.personalInfo.email}</span>
                  <span>📱 {data.personalInfo.phone}</span>
                  <span>📍 {data.personalInfo.location}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    marginTop: "8px",
                    fontSize: "14px",
                  }}
                >
                  {data.personalInfo.website && (
                    <a
                      href={data.personalInfo.website}
                      style={{ color: "#3b82f6", textDecoration: "none" }}
                    >
                      🌐 Website
                    </a>
                  )}
                  {data.personalInfo.linkedin && (
                    <a
                      href={data.personalInfo.linkedin}
                      style={{ color: "#3b82f6", textDecoration: "none" }}
                    >
                      💼 LinkedIn
                    </a>
                  )}
                  {data.personalInfo.github && (
                    <a
                      href={data.personalInfo.github}
                      style={{ color: "#3b82f6", textDecoration: "none" }}
                    >
                      💻 GitHub
                    </a>
                  )}
                </div>
              </div>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {data.personalInfo.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>

            {data.personalInfo.summary && (
              <p
                style={{
                  marginTop: "16px",
                  fontSize: "16px",
                  lineHeight: "1.6",
                  color: "#374151",
                }}
              >
                {data.personalInfo.summary}
              </p>
            )}
          </div>

          {/* Experience Section */}
          {data.experience.length > 0 && (
            <div data-page-break style={{ marginBottom: "32px" }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                  color: "#111827",
                  borderLeft: "4px solid #3b82f6",
                  paddingLeft: "16px",
                }}
              >
                Professional Experience
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {data.experience.map((exp, index) => (
                  <div
                    key={exp.id}
                    style={{ position: "relative", paddingLeft: "32px" }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: "0",
                        top: "8px",
                        width: "16px",
                        height: "16px",
                        backgroundColor: "#3b82f6",
                        borderRadius: "50%",
                        border: "4px solid white",
                      }}
                    ></div>
                    <div
                      style={{
                        position: "absolute",
                        left: "8px",
                        top: "24px",
                        width: "2px",
                        height: "100%",
                        backgroundColor: "#e5e7eb",
                      }}
                    ></div>

                    <div
                      style={{
                        backgroundColor: "#f9fafb",
                        borderRadius: "8px",
                        padding: "16px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "8px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              fontSize: "18px",
                              fontWeight: "600",
                              color: "#111827",
                            }}
                          >
                            {exp.position}
                          </h3>
                          <p
                            style={{
                              color: "#3b82f6",
                              fontWeight: "500",
                              fontSize: "16px",
                            }}
                          >
                            {exp.company}
                          </p>
                        </div>
                        <div
                          style={{
                            textAlign: "right",
                            fontSize: "14px",
                            color: "#6b7280",
                          }}
                        >
                          <p>
                            {formatDate(exp.startDate)} -{" "}
                            {exp.current ? "Present" : formatDate(exp.endDate)}
                          </p>
                          <p>{exp.location}</p>
                        </div>
                      </div>

                      <ul
                        style={{
                          listStyle: "disc",
                          paddingLeft: "20px",
                          margin: 0,
                          fontSize: "15px",
                          color: "#374151",
                        }}
                      >
                        {exp.description.map((desc, i) => (
                          <li key={i} style={{ marginBottom: "4px" }}>
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {data.education.length > 0 && (
            <div data-page-break style={{ marginBottom: "32px" }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                  color: "#111827",
                  borderLeft: "4px solid #8b5cf6",
                  paddingLeft: "16px",
                }}
              >
                Education
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {data.education.map((edu) => (
                  <div
                    key={edu.id}
                    style={{
                      backgroundColor: "#f9fafb",
                      borderRadius: "8px",
                      padding: "16px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontSize: "18px",
                            fontWeight: "600",
                            color: "#111827",
                          }}
                        >
                          {edu.degree}
                        </h3>
                        <p
                          style={{
                            color: "#8b5cf6",
                            fontWeight: "500",
                            fontSize: "16px",
                          }}
                        >
                          {edu.institution}
                        </p>
                        <p style={{ fontSize: "15px", color: "#6b7280" }}>
                          {edu.field}
                        </p>
                        {edu.gpa && (
                          <p style={{ fontSize: "14px", color: "#6b7280" }}>
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          fontSize: "14px",
                          color: "#6b7280",
                        }}
                      >
                        <p>
                          {formatDate(edu.startDate)} -{" "}
                          {formatDate(edu.endDate)}
                        </p>
                        <p>{edu.location}</p>
                      </div>
                    </div>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul
                        style={{
                          listStyle: "disc",
                          paddingLeft: "20px",
                          marginTop: "8px",
                          fontSize: "14px",
                          color: "#374151",
                        }}
                      >
                        {edu.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {data.skills.length > 0 && (
            <div data-page-break style={{ marginBottom: "32px" }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                  color: "#111827",
                  borderLeft: "4px solid #10b981",
                  paddingLeft: "16px",
                }}
              >
                Skills
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "24px",
                }}
              >
                {Object.entries(
                  data.skills.reduce(
                    (acc, skill) => {
                      if (!acc[skill.category]) acc[skill.category] = [];
                      acc[skill.category].push(skill);
                      return acc;
                    },
                    {} as Record<string, typeof data.skills>,
                  ),
                ).map(([category, skills]) => (
                  <div
                    key={category}
                    style={{
                      backgroundColor: "#f9fafb",
                      borderRadius: "8px",
                      padding: "16px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: "600",
                        marginBottom: "12px",
                        color: "#10b981",
                        fontSize: "16px",
                      }}
                    >
                      {category}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {skills.map((skill) => (
                        <div key={skill.id}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "4px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#374151",
                              }}
                            >
                              {skill.name}
                            </span>
                            <span
                              style={{ fontSize: "12px", color: "#6b7280" }}
                            >
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
                          <div
                            style={{
                              width: "100%",
                              backgroundColor: "#e5e7eb",
                              borderRadius: "4px",
                              height: "8px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                background:
                                  "linear-gradient(to right, #10b981, #059669)",
                                height: "100%",
                                borderRadius: "4px",
                                transition: "width 0.5s ease",
                                width: `${getSkillLevelWidth(skill.level)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {data.projects.length > 0 && (
            <div data-page-break style={{ marginBottom: "32px" }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                  color: "#111827",
                  borderLeft: "4px solid #f59e0b",
                  paddingLeft: "16px",
                }}
              >
                Projects
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "16px",
                }}
              >
                {data.projects.map((project) => (
                  <div
                    key={project.id}
                    style={{
                      backgroundColor: "#f9fafb",
                      borderRadius: "8px",
                      padding: "16px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: "600",
                        color: "#f59e0b",
                        fontSize: "16px",
                        marginBottom: "8px",
                      }}
                    >
                      {project.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        marginBottom: "12px",
                      }}
                    >
                      {project.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "4px",
                        marginBottom: "12px",
                      }}
                    >
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: "12px",
                            backgroundColor: "#fef3c7",
                            color: "#92400e",
                            padding: "4px 8px",
                            borderRadius: "4px",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ul
                      style={{
                        listStyle: "disc",
                        paddingLeft: "16px",
                        margin: 0,
                        fontSize: "13px",
                        color: "#374151",
                      }}
                    >
                      {project?.highlights?.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {data.languages.length > 0 && (
            <div data-page-break style={{ marginBottom: "32px" }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                  color: "#111827",
                  borderLeft: "4px solid #ef4444",
                  paddingLeft: "16px",
                }}
              >
                Languages
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {data.languages.map((lang) => (
                  <div
                    key={lang.id}
                    style={{
                      backgroundColor: "#f9fafb",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        color: "#374151",
                        fontSize: "14px",
                      }}
                    >
                      {lang.name}
                    </span>
                    <span
                      style={{
                        color: "#ef4444",
                        fontSize: "13px",
                        marginLeft: "8px",
                      }}
                    >
                      ({lang.proficiency})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        <p>
          💡 Tip: Use the Download PDF button for best quality. Print preview
          may vary.
        </p>
      </div>

      <style jsx>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
