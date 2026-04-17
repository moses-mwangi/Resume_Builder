// lib/jobMatchingService.ts

export interface JobMatchScore {
  overallScore: number; // 0-100
  keywordMatch: number;
  experienceMatch: number;
  skillsMatch: number;
  educationMatch: number;
  missingKeywords: string[];
  missingSkills: string[];
  suggestions: string[];
  aiSelectionProbability: string; // "High", "Medium", "Low"
  aiSelectionChance: number; // percentage
}

export class JobMatchingService {
  static calculateMatchScore(
    resumeData: any,
    jobDescription: string,
    jobTitle: string,
  ): JobMatchScore {
    // Extract skills from resume
    const resumeSkills = this.extractSkills(resumeData);
    const resumeExperience = this.extractExperience(resumeData);
    const resumeEducation = this.extractEducation(resumeData);

    // Parse job description for keywords
    const jobKeywords = this.extractKeywords(jobDescription);
    const requiredSkills = this.extractRequiredSkills(jobDescription);
    const requiredExperience = this.extractRequiredExperience(jobDescription);

    // Calculate individual scores
    const keywordMatch = this.calculateKeywordMatch(resumeData, jobKeywords);
    const skillsMatch = this.calculateSkillsMatch(resumeSkills, requiredSkills);
    const experienceMatch = this.calculateExperienceMatch(
      resumeExperience,
      requiredExperience,
    );
    const educationMatch = this.calculateEducationMatch(
      resumeEducation,
      jobDescription,
    );

    // Calculate overall score (weighted)
    const overallScore = Math.round(
      keywordMatch * 0.3 +
        skillsMatch * 0.35 +
        experienceMatch * 0.25 +
        educationMatch * 0.1,
    );

    // Find missing items
    const missingKeywords = jobKeywords.filter(
      (kw) => !this.resumeContainsKeyword(resumeData, kw),
    );

    const missingSkills = requiredSkills.filter(
      (skill) =>
        !resumeSkills.some((s) =>
          s.toLowerCase().includes(skill.toLowerCase()),
        ),
    );

    // Generate suggestions
    const suggestions = this.generateSuggestions(
      missingKeywords,
      missingSkills,
      overallScore,
    );

    // Calculate AI selection probability
    const aiSelectionChance = this.calculateAISelectionChance(
      overallScore,
      missingKeywords.length,
    );
    const aiSelectionProbability = this.getProbabilityText(aiSelectionChance);

    return {
      overallScore,
      keywordMatch,
      skillsMatch,
      experienceMatch,
      educationMatch,
      missingKeywords: missingKeywords.slice(0, 10),
      missingSkills: missingSkills.slice(0, 10),
      suggestions,
      aiSelectionProbability,
      aiSelectionChance,
    };
  }

  private static extractSkills(resumeData: any): string[] {
    const skills: string[] = [];

    // Extract from skills section
    if (resumeData.skills && Array.isArray(resumeData.skills)) {
      resumeData.skills.forEach((skill: any) => {
        if (typeof skill === "string") skills.push(skill);
        else if (skill.name) skills.push(skill.name);
      });
    }

    // Extract from work experience
    if (resumeData.workExperience) {
      resumeData.workExperience.forEach((exp: any) => {
        if (exp.description) {
          const words = exp.description.split(/\s+/);
          skills.push(...words.filter((w: any) => w.length > 3));
        }
      });
    }

    return [...new Set(skills)];
  }

  private static extractKeywords(jobDescription: string): string[] {
    // Common tech keywords to look for
    const commonKeywords = [
      "React",
      "Angular",
      "Vue",
      "Node.js",
      "Python",
      "Java",
      "JavaScript",
      "TypeScript",
      "AWS",
      "Docker",
      "Kubernetes",
      "SQL",
      "MongoDB",
      "PostgreSQL",
      "REST API",
      "GraphQL",
      "Git",
      "CI/CD",
      "Agile",
      "Scrum",
      "Leadership",
      "Communication",
      "Problem Solving",
      "Teamwork",
      "Project Management",
    ];

    return commonKeywords.filter((keyword) =>
      jobDescription.toLowerCase().includes(keyword.toLowerCase()),
    );
  }

  private static extractRequiredSkills(jobDescription: string): string[] {
    // Look for "required skills", "qualifications", "requirements" sections
    const skills: string[] = [];
    const patterns = [
      /required skills?:?\s*([^.]+)/i,
      /qualifications?:?\s*([^.]+)/i,
      /requirements?:?\s*([^.]+)/i,
      /must have:?\s*([^.]+)/i,
    ];

    patterns.forEach((pattern) => {
      const match = jobDescription.match(pattern);
      if (match && match[1]) {
        const skillsText = match[1];
        const foundSkills = skillsText.split(/[•,;\n]/).map((s) => s.trim());
        skills.push(...foundSkills.filter((s) => s.length > 2));
      }
    });

    return [...new Set(skills)];
  }

  private static extractRequiredExperience(jobDescription: string): number {
    const experiencePattern =
      /(\d+)\+?\s*(?:years?|yrs?)\s*(?:of)?\s*experience/i;
    const match = jobDescription.match(experiencePattern);
    return match ? parseInt(match[1]) : 3; // Default to 3 years
  }

  private static extractExperience(resumeData: any): number {
    let totalYears = 0;

    if (resumeData.workExperience && Array.isArray(resumeData.workExperience)) {
      resumeData.workExperience.forEach((exp: any) => {
        if (exp.startDate && exp.endDate) {
          const start = new Date(exp.startDate);
          const end =
            exp.endDate === "Present" ? new Date() : new Date(exp.endDate);
          const years =
            (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
          totalYears += years;
        }
      });
    }

    return Math.round(totalYears * 10) / 10;
  }

  private static extractEducation(resumeData: any): string {
    if (resumeData.education && resumeData.education.length > 0) {
      const edu = resumeData.education[0];
      return `${edu.degree || ""} ${edu.field || ""} ${edu.school || ""}`;
    }
    return "";
  }

  private static calculateKeywordMatch(
    resumeData: any,
    keywords: string[],
  ): number {
    if (keywords.length === 0) return 100;

    let matchCount = 0;
    const resumeText = JSON.stringify(resumeData).toLowerCase();

    keywords.forEach((keyword) => {
      if (resumeText.includes(keyword.toLowerCase())) {
        matchCount++;
      }
    });

    return (matchCount / keywords.length) * 100;
  }

  private static calculateSkillsMatch(
    resumeSkills: string[],
    requiredSkills: string[],
  ): number {
    if (requiredSkills.length === 0) return 100;

    let matchCount = 0;
    requiredSkills.forEach((required) => {
      if (
        resumeSkills.some(
          (skill) =>
            skill.toLowerCase().includes(required.toLowerCase()) ||
            required.toLowerCase().includes(skill.toLowerCase()),
        )
      ) {
        matchCount++;
      }
    });

    return (matchCount / requiredSkills.length) * 100;
  }

  private static calculateExperienceMatch(
    resumeYears: number,
    requiredYears: number,
  ): number {
    if (resumeYears >= requiredYears) return 100;
    return (resumeYears / requiredYears) * 100;
  }

  private static calculateEducationMatch(
    education: string,
    jobDescription: string,
  ): number {
    const requiredDegrees = ["bachelor", "master", "phd", "degree"];
    let hasRequired = false;

    requiredDegrees.forEach((degree) => {
      if (
        jobDescription.toLowerCase().includes(degree) &&
        education.toLowerCase().includes(degree)
      ) {
        hasRequired = true;
      }
    });

    return hasRequired ? 100 : 50;
  }

  private static resumeContainsKeyword(
    resumeData: any,
    keyword: string,
  ): boolean {
    return JSON.stringify(resumeData)
      .toLowerCase()
      .includes(keyword.toLowerCase());
  }

  private static generateSuggestions(
    missingKeywords: string[],
    missingSkills: string[],
    score: number,
  ): string[] {
    const suggestions: string[] = [];

    if (score < 60) {
      suggestions.push(
        "⚠️ Your resume needs significant improvement to pass AI screening",
      );
    } else if (score < 75) {
      suggestions.push("📈 Good foundation, but there's room for improvement");
    } else if (score < 90) {
      suggestions.push(
        "👍 Strong match! Minor optimizations could make it excellent",
      );
    } else {
      suggestions.push(
        "🎯 Excellent match! Your resume is highly optimized for this role",
      );
    }

    if (missingKeywords.length > 0) {
      suggestions.push(
        `📝 Add these keywords: ${missingKeywords.slice(0, 5).join(", ")}`,
      );
    }

    if (missingSkills.length > 0) {
      suggestions.push(
        `💡 Highlight these skills: ${missingSkills.slice(0, 5).join(", ")}`,
      );
    }

    if (
      missingKeywords.length === 0 &&
      missingSkills.length === 0 &&
      score < 100
    ) {
      suggestions.push(
        "✨ Try reformatting your experience to better highlight relevant achievements",
      );
    }

    return suggestions;
  }

  private static calculateAISelectionChance(
    score: number,
    missingCount: number,
  ): number {
    let chance = score;

    // Penalize for too many missing keywords
    if (missingCount > 10) chance -= 20;
    else if (missingCount > 5) chance -= 10;
    else if (missingCount > 3) chance -= 5;

    // Cap at reasonable ranges
    return Math.min(95, Math.max(5, Math.round(chance)));
  }

  private static getProbabilityText(chance: number): string {
    if (chance >= 75) return "High";
    if (chance >= 45) return "Medium";
    return "Low";
  }
}
