// types/resume.ts
export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  yearsOfExperience: number;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string[];
  technologies: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  gpa?: string;
  relevantCourses?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Resume {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
    summary: string;
  };
  skills: {
    technical: Skill[];
    soft: Skill[];
    languages: { name: string; proficiency: string }[];
  };
  experience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  achievements: string[];
}

export interface JobDescription {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  preferredQualifications: string[];
  technologies: string[];
  seniority: "Junior" | "Mid-Level" | "Senior" | "Lead";
  location: string;
  salary?: string;
}

export interface MatchScore {
  overall: number;
  technical: number;
  experience: number;
  softSkills: number;
  education: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendations: string[];
}
