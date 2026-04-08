// lib/pdf-generator.tsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  pdf,
} from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

// Register fonts
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.ttf",
      fontWeight: "bold",
    },
  ],
});

// Styles for PDF
const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: "#3b82f6",
    paddingBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1f2937",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  contactItem: {
    fontSize: 9,
    color: "#6b7280",
  },
  summary: {
    marginTop: 10,
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.4,
  },
  section: {
    marginTop: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1f2937",
    borderLeft: 3,
    borderLeftColor: "#3b82f6",
    paddingLeft: 8,
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  experienceTitle: {
    fontWeight: "bold",
    fontSize: 11,
  },
  experienceCompany: {
    fontSize: 10,
    color: "#3b82f6",
  },
  experienceDate: {
    fontSize: 9,
    color: "#6b7280",
  },
  descriptionItem: {
    marginLeft: 15,
    marginTop: 3,
    fontSize: 9,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 5,
  },
  skillBadge: {
    backgroundColor: "#f3f4f6",
    padding: "4 8",
    borderRadius: 4,
    fontSize: 9,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectTitle: {
    fontWeight: "bold",
    fontSize: 11,
    marginBottom: 3,
  },
  techStack: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 3,
    marginBottom: 3,
  },
  techTag: {
    fontSize: 8,
    backgroundColor: "#e5e7eb",
    padding: "2 6",
    borderRadius: 3,
  },
  twoColumn: {
    flexDirection: "row",
    gap: 20,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

// PDF Document Component
const ResumePDF = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Text style={pdfStyles.name}>{data.personalInfo.fullName}</Text>
        <View style={pdfStyles.contactRow}>
          <Text style={pdfStyles.contactItem}>
            📧 {data.personalInfo.email}
          </Text>
          <Text style={pdfStyles.contactItem}>
            📱 {data.personalInfo.phone}
          </Text>
          <Text style={pdfStyles.contactItem}>
            📍 {data.personalInfo.location}
          </Text>
        </View>
        {data.personalInfo.summary && (
          <Text style={pdfStyles.summary}>{data.personalInfo.summary}</Text>
        )}
      </View>

      {/* Two Column Layout for Skills & Details */}
      <View style={pdfStyles.twoColumn}>
        {/* Left Column */}
        <View style={pdfStyles.leftColumn}>
          {/* Skills */}
          {data.skills.length > 0 && (
            <View style={pdfStyles.section}>
              <Text style={pdfStyles.sectionTitle}>Technical Skills</Text>
              {Object.entries(
                data.skills.reduce(
                  (acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = [];
                    acc[skill.category].push(skill.name);
                    return acc;
                  },
                  {} as Record<string, string[]>,
                ),
              ).map(([category, skills]) => (
                <View key={category} style={{ marginBottom: 8 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 10,
                      marginBottom: 4,
                    }}
                  >
                    {category}
                  </Text>
                  <View style={pdfStyles.skillsGrid}>
                    {skills.map((skill, i) => (
                      <Text key={i} style={pdfStyles.skillBadge}>
                        {skill}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <View style={pdfStyles.section}>
              <Text style={pdfStyles.sectionTitle}>Languages</Text>
              {data.languages.map((lang) => (
                <Text key={lang.id} style={{ marginBottom: 4 }}>
                  {lang.name} - {lang.proficiency}
                </Text>
              ))}
            </View>
          )}

          {/* Certifications */}
          {data.certificates.length > 0 && (
            <View style={pdfStyles.section}>
              <Text style={pdfStyles.sectionTitle}>Certifications</Text>
              {data.certificates.map((cert) => (
                <View key={cert.id} style={{ marginBottom: 8 }}>
                  <Text style={{ fontWeight: "bold" }}>{cert.name}</Text>
                  <Text style={{ fontSize: 9, color: "#6b7280" }}>
                    {cert.issuer} • {formatDate(cert.date)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right Column */}
        <View style={pdfStyles.rightColumn}>
          {/* Experience */}
          {data.experience.length > 0 && (
            <View style={pdfStyles.section}>
              <Text style={pdfStyles.sectionTitle}>Work Experience</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={pdfStyles.experienceItem}>
                  <View style={pdfStyles.experienceHeader}>
                    <View>
                      <Text style={pdfStyles.experienceTitle}>
                        {exp.position}
                      </Text>
                      <Text style={pdfStyles.experienceCompany}>
                        {exp.company}
                      </Text>
                    </View>
                    <Text style={pdfStyles.experienceDate}>
                      {formatDate(exp.startDate)} -{" "}
                      {exp.current ? "Present" : formatDate(exp.endDate)}
                    </Text>
                  </View>
                  {exp.description.map((desc, i) => (
                    <Text key={i} style={pdfStyles.descriptionItem}>
                      • {desc}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <View style={pdfStyles.section}>
              <Text style={pdfStyles.sectionTitle}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>{edu.degree}</Text>
                  <Text>{edu.institution}</Text>
                  <Text style={{ fontSize: 9, color: "#6b7280" }}>
                    {edu.field} • {formatDate(edu.startDate)} -{" "}
                    {formatDate(edu.endDate)}
                  </Text>
                  {edu.gpa && (
                    <Text style={{ fontSize: 9 }}>GPA: {edu.gpa}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <View style={pdfStyles.section}>
              <Text style={pdfStyles.sectionTitle}>Projects</Text>
              {data.projects.map((project) => (
                <View key={project.id} style={pdfStyles.projectItem}>
                  <Text style={pdfStyles.projectTitle}>{project.name}</Text>
                  <Text style={{ fontSize: 9, marginBottom: 3 }}>
                    {project.description}
                  </Text>
                  <View style={pdfStyles.techStack}>
                    {project.technologies.map((tech, i) => (
                      <Text key={i} style={pdfStyles.techTag}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                  {project?.highlights?.map((highlight, i) => (
                    <Text
                      key={i}
                      style={{ fontSize: 9, marginLeft: 10, marginTop: 2 }}
                    >
                      • {highlight}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </Page>
  </Document>
);

export async function generatePDF(
  data: ResumeData,
  template: string,
): Promise<Blob> {
  void template;
  const pdfDoc = <ResumePDF data={data} />;
  const pdfBlob = await pdf(pdfDoc).toBlob();
  return pdfBlob;
}

export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
