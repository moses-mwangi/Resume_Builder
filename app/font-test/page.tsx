"use client";

import { useState } from "react";

// Sample resume content to demonstrate the font appearance
const resumeSample = {
  name: "Moses Mwangi",
  title: "Senior Fullstack Engineer",
  summary:
    "Results-driven product manager with 8+ years of experience in SaaS and fintech. Proven track record of launching products that drive 40% revenue growth. Expert in cross-functional leadership and data-driven decision making.",
  experience: [
    {
      title: "Senior Product Manager",
      company: "TechCorp Inc.",
      date: "2021 – Present",
      bullets: [
        "Led product strategy for a $15M ARR product line, increasing user engagement by 35%",
        "Managed roadmap for 3 cross-functional teams of 12 engineers and 5 designers",
        "Launched AI-powered analytics feature that reduced customer churn by 22%",
      ],
    },
    {
      title: "Product Manager",
      company: "FinStart Solutions",
      date: "2018 – 2021",
      bullets: [
        "Developed mobile banking app from concept to launch (500k+ downloads in first 6 months)",
        "Increased NPS from 42 to 68 through user-centric design improvements",
        "Reduced feature delivery time by 30% by implementing Agile methodologies",
      ],
    },
  ],
  education: {
    degree: "MBA, Product Management",
    school: "University of California, Berkeley",
    year: "2018",
  },
  skills: [
    "Product Strategy",
    "Data Analytics",
    "Agile/Scrum",
    "User Research",
    "A/B Testing",
    "Roadmap Planning",
  ],
};

// Font categories for organization
const fontCategories = {
  "Safest & Professional": [
    "Arial",
    "Calibri",
    "Helvetica",
    "Garamond",
    "Lato",
  ],
  "Traditional (Law/Finance)": ["Times New Roman", "Georgia", "Cambria"],
  "Modern/Creative": ["Open Sans", "Roboto", "Montserrat", "Raleway"],
  "Space-Saving": ["Garamond", "Calibri", "Aptos"],
};

// All unique fonts with their CSS font-family values
const allFonts = {
  // Safest & Professional
  Arial: { family: "Arial, sans-serif", category: "Safest & Professional" },
  Calibri: { family: "Calibri, sans-serif", category: "Safest & Professional" },
  Helvetica: {
    family: "Helvetica, sans-serif",
    category: "Safest & Professional",
  },
  Garamond: { family: "Garamond, serif", category: "Safest & Professional" },
  Lato: { family: "'Lato', sans-serif", category: "Safest & Professional" },
  // Traditional
  "Times New Roman": {
    family: "'Times New Roman', serif",
    category: "Traditional",
  },
  Georgia: { family: "Georgia, serif", category: "Traditional" },
  Cambria: { family: "Cambria, serif", category: "Traditional" },
  // Modern/Creative
  "Open Sans": {
    family: "'Open Sans', sans-serif",
    category: "Modern/Creative",
  },
  Roboto: { family: "'Roboto', sans-serif", category: "Modern/Creative" },
  Montserrat: {
    family: "'Montserrat', sans-serif",
    category: "Modern/Creative",
  },
  Raleway: { family: "'Raleway', sans-serif", category: "Modern/Creative" },
  // Space-Saving
  Aptos: { family: "'Aptos', sans-serif", category: "Space-Saving" },
};

export default function FontTestPage() {
  const [currentFont, setCurrentFont] = useState("Inter"); // Default font
  const [showAllFonts, setShowAllFonts] = useState(false);

  type FontKey = keyof typeof allFonts | "Inter";

  function getFont(key: FontKey) {
    if (key === "Inter") {
      return {
        family: "system-ui, -apple-system, sans-serif",
        category: "System Default",
      };
    }
    return allFonts[key];
  }

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: getFont(currentFont as FontKey).family,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "0.5rem",
            fontFamily: getFont(currentFont as FontKey).family,
          }}
        >
          Resume Font Tester
        </h1>
        <p style={{ color: "#666", marginBottom: "1rem" }}>
          Current font: <strong>{currentFont}</strong> (
          {getFont(currentFont as FontKey).category})
        </p>

        {/* Font selector buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <button
            onClick={() => setCurrentFont("Inter")}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: currentFont === "Inter" ? "#3b82f6" : "#e5e7eb",
              color: currentFont === "Inter" ? "white" : "#374151",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Default (System)
          </button>
          <button
            onClick={() => setShowAllFonts(!showAllFonts)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            {showAllFonts ? "Hide All Fonts View" : "Show All Fonts Comparison"}
          </button>
        </div>

        {/* Category buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
            marginTop: "0.5rem",
          }}
        >
          {Object.entries(allFonts).map(([fontName]) => (
            <button
              key={fontName}
              onClick={() => setCurrentFont(fontName as FontKey)}
              style={{
                padding: "0.4rem 0.8rem",
                fontSize: "0.8rem",
                backgroundColor:
                  currentFont === fontName ? "#3b82f6" : "#f3f4f6",
                color: currentFont === fontName ? "white" : "#374151",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontFamily: getFont(fontName as FontKey).family,
              }}
            >
              {fontName}
            </button>
          ))}
        </div>
      </div>

      {/* Resume Preview */}
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "1rem",
          padding: "2rem",
          backgroundColor: "white",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
          marginBottom: "2rem",
        }}
      >
        {/* Name */}
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "0.25rem",
            fontWeight: "700",
          }}
        >
          {resumeSample.name}
        </h1>

        {/* Title */}
        <p
          style={{
            fontSize: "1.125rem",
            color: "#4b5563",
            marginBottom: "1rem",
            borderBottom: "2px solid #e5e7eb",
            paddingBottom: "0.75rem",
          }}
        >
          {resumeSample.title}
        </p>

        {/* Summary */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
              color: "#1f2937",
            }}
          >
            Professional Summary
          </h2>
          <p style={{ lineHeight: "1.5", color: "#374151" }}>
            {resumeSample.summary}
          </p>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
              color: "#1f2937",
            }}
          >
            Work Experience
          </h2>
          {resumeSample.experience.map((job, idx) => (
            <div key={idx} style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  marginBottom: "0.25rem",
                }}
              >
                <h3 style={{ fontSize: "1rem", fontWeight: "600" }}>
                  {job.title}
                </h3>
                <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  {job.date}
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#4b5563",
                  marginBottom: "0.5rem",
                }}
              >
                {job.company}
              </p>
              <ul
                style={{
                  marginLeft: "1.25rem",
                  lineHeight: "1.5",
                  color: "#374151",
                }}
              >
                {job.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education & Skills */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#1f2937",
              }}
            >
              Education
            </h2>
            <p style={{ fontWeight: "500" }}>{resumeSample.education.degree}</p>
            <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
              {resumeSample.education.school}
            </p>
            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              {resumeSample.education.year}
            </p>
          </div>
          <div>
            <h2
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#1f2937",
              }}
            >
              Skills
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {resumeSample.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    backgroundColor: "#f3f4f6",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    color: "#374151",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* All Fonts Comparison View */}
      {showAllFonts && (
        <div style={{ marginTop: "2rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Side-by-Side Font Comparison
          </h2>
          {Object.entries(fontCategories).map(([category, fonts]) => (
            <div key={category} style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                  color: "#3b82f6",
                  borderLeft: "4px solid #3b82f6",
                  paddingLeft: "0.75rem",
                }}
              >
                {category}
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "1rem",
                }}
              >
                {fonts.map((fontName) => (
                  <div
                    key={fontName}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                      padding: "1rem",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: getFont(fontName as FontKey).family,
                        padding: "0.5rem",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          marginBottom: "0.5rem",
                          color: "#6b7280",
                          borderBottom: "1px solid #d1d5db",
                          paddingBottom: "0.25rem",
                        }}
                      >
                        {fontName}
                      </h4>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "#6b7280",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {getFont(fontName as FontKey).family}
                        {/* {allFonts[fontName]?.family} */}
                      </p>
                      <p
                        style={{
                          fontWeight: "700",
                          fontSize: "1rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {resumeSample.name}
                      </p>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "#4b5563",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {resumeSample.title}
                      </p>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          lineHeight: "1.4",
                          color: "#374151",
                        }}
                      >
                        {resumeSample.summary.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recommendations Footer */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#fef3c7",
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
          color: "#92400e",
        }}
      >
        <strong>💡 Pro Tips:</strong> For ATS compatibility, stick to Arial,
        Calibri, Garamond, or Times New Roman. For creative roles, try Lato or
        Open Sans. Garamond saves the most space. Avoid fonts below 10pt.
      </div>
    </div>
  );
}
