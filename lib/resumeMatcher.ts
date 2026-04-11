// utils/resumeMatcher.ts
import { Resume, JobDescription, MatchScore } from "@/types/resumeMatcherTypes";

export class ResumeMatcher {
  private resume: Resume;
  private jobDescription: JobDescription;

  constructor(resume: Resume, jobDescription: JobDescription) {
    this.resume = resume;
    this.jobDescription = jobDescription;
  }

  calculateMatchScore(): MatchScore {
    const technicalScore = this.calculateTechnicalMatch();
    const experienceScore = this.calculateExperienceMatch();
    const softSkillsScore = this.calculateSoftSkillsMatch();
    const educationScore = this.calculateEducationMatch();

    const overall =
      technicalScore * 0.4 +
      experienceScore * 0.3 +
      softSkillsScore * 0.2 +
      educationScore * 0.1;

    const { matched, missing } = this.getKeywordMatches();

    return {
      overall: Math.round(overall),
      technical: Math.round(technicalScore),
      experience: Math.round(experienceScore),
      softSkills: Math.round(softSkillsScore),
      education: Math.round(educationScore),
      matchedKeywords: matched,
      missingKeywords: missing,
      recommendations: this.generateRecommendations(matched, missing),
    };
  }

  private calculateTechnicalMatch(): number {
    const requiredTech = this.jobDescription.technologies;
    const myTech = this.resume.skills.technical.map((s) => s.name);

    let score = 0;
    requiredTech.forEach((tech) => {
      if (myTech.some((myT) => myT.toLowerCase() === tech.toLowerCase())) {
        score += 100 / requiredTech.length;
      }
    });

    return score;
  }

  private calculateExperienceMatch(): number {
    const requiredYears = this.getRequiredYears();
    const myYears = this.getTotalExperienceYears();

    if (myYears >= requiredYears) return 100;
    return (myYears / requiredYears) * 100;
  }

  private calculateSoftSkillsMatch(): number {
    const softSkills = this.resume.skills.soft.map((s) => s.name.toLowerCase());
    const jobText =
      this.jobDescription.description.toLowerCase() +
      this.jobDescription.responsibilities.join(" ").toLowerCase();

    const relevantSoftSkills = [
      "leadership",
      "communication",
      "problem solving",
      "collaboration",
      "mentoring",
    ];
    let matches = 0;

    relevantSoftSkills.forEach((skill) => {
      if (softSkills.includes(skill) || jobText.includes(skill)) {
        matches++;
      }
    });

    return (matches / relevantSoftSkills.length) * 100;
  }

  private calculateEducationMatch(): number {
    // Check if education level matches job expectations
    const hasMasters = this.resume.education.some(
      (e) => e.degree.includes("M.S") || e.degree.includes("M.A"),
    );
    const hasBachelors = this.resume.education.some(
      (e) => e.degree.includes("B.S") || e.degree.includes("B.A"),
    );

    if (hasMasters) return 100;
    if (hasBachelors) return 80;
    return 50;
  }

  private getKeywordMatches(): { matched: string[]; missing: string[] } {
    const jobKeywords = this.extractKeywords();
    const resumeText = this.getResumeText();

    const matched: string[] = [];
    const missing: string[] = [];

    jobKeywords.forEach((keyword) => {
      if (resumeText.toLowerCase().includes(keyword.toLowerCase())) {
        matched.push(keyword);
      } else {
        missing.push(keyword);
      }
    });

    return { matched, missing };
  }

  private extractKeywords(): string[] {
    const text =
      this.jobDescription.description +
      " " +
      this.jobDescription.requirements.join(" ") +
      " " +
      this.jobDescription.responsibilities.join(" ");

    const keywords = text.match(/\b[A-Za-z]{3,}\b/g) || [];
    const stopWords = new Set([
      "and",
      "the",
      "with",
      "for",
      "are",
      "that",
      "this",
      "have",
      "from",
    ]);

    return [
      ...new Set(keywords.filter((k) => !stopWords.has(k.toLowerCase()))),
    ].slice(0, 30);
  }

  private getResumeText(): string {
    return (
      this.resume.personal.summary +
      " " +
      this.resume.skills.technical.map((s) => s.name).join(" ") +
      " " +
      this.resume.experience
        .map((e) => e.description.join(" ") + " " + e.achievements.join(" "))
        .join(" ") +
      " " +
      this.resume.projects.map((p) => p.name + " " + p.description).join(" ")
    );
  }

  private getRequiredYears(): number {
    const reqText = this.jobDescription.requirements.join(" ").toLowerCase();
    const match = reqText.match(/(\d+)\+?\s*years?/);
    return match ? parseInt(match[1]) : 3; // default to 3 years
  }

  private getTotalExperienceYears(): number {
    let totalYears = 0;
    this.resume.experience.forEach((exp) => {
      const start = new Date(exp.startDate);
      const end =
        exp.endDate === "Present" ? new Date() : new Date(exp.endDate);
      totalYears += end.getFullYear() - start.getFullYear();
    });
    return totalYears;
  }

  private generateRecommendations(
    matched: string[],
    missing: string[],
  ): string[] {
    const recommendations: string[] = [];

    if (missing.length > 0) {
      recommendations.push(
        `Consider adding these keywords to your resume: ${missing.slice(0, 5).join(", ")}`,
      );
    }

    if (this.calculateTechnicalMatch() < 70) {
      recommendations.push(
        "Highlight relevant technical skills more prominently in your experience section",
      );
    }

    if (this.calculateExperienceMatch() < 70) {
      recommendations.push(
        "Emphasize leadership and project ownership to demonstrate senior-level experience",
      );
    }

    return recommendations;
  }
}
