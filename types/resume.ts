export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  avatar?: string;
  title?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  achievements?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
  current?: boolean;
  description?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 1-5
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  highlights?: string[];
  startDate?: string;
  endDate?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  link: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  languages: Language[];
  customSections?: CustomSection[];
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  type: "text" | "list" | "table";
  order: number;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: "modern" | "classic" | "creative" | "minimal";
}

// types/resume.ts (add these new types)
export interface ResumeAnalysis {
  overallScore: number;
  sections: {
    completeness: number;
    formatting: number;
    content: number;
    keywords: number;
    ats: number;
  };
  feedback: {
    strengths: string[];
    improvements: string[];
    missing: string[];
    suggestions: string[];
  };
  keywordMatch: {
    present: string[];
    missing: string[];
    score: number;
  };
  atsCompatibility: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
}

export interface ParsedResumeData {
  success: boolean;
  data?: Partial<ResumeData>;
  confidence?: number;
  warnings?: string[];
  rawText?: string;
}
