export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote" | "Hybrid";
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  logo: string;
  category: string;
  experienceLevel: "Entry" | "Mid" | "Senior" | "Lead" | "Executive";
  skills: string[];
  benefits: string[];
  applyCount: number;
  remote: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: "pending" | "reviewing" | "interview" | "rejected" | "accepted";
  coverLetter: string;
  resumeVersion: string;
  autoApplied: boolean;
}

export interface AutoApplySettings {
  enabled: boolean;
  keywords: string[];
  excludedKeywords: string[];
  minSalary: number;
  locations: string[];
  jobTypes: string[];
  experienceLevels: string[];
  remoteOnly: boolean;
  autoGenerateCoverLetter: boolean;
  maxApplicationsPerDay: number;
}

export interface UserProfile {
  name: string;
  email: string;
  resume: string;
  skills: string[];
  experience: string;
  education: string;
  preferredLocations: string[];
  desiredSalary: number;
}
