// data/resume.ts
import { Resume, JobDescription } from "@/types/resumeMatcherTypes";

export const myResume: Resume = {
  personal: {
    name: "Alex Morgan",
    title: "Creative Developer & UI/UX Designer",
    email: "alex@livingarchive.dev",
    phone: "+1 (555) 123-4567",
    location: "Brooklyn, NY",
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
    portfolio: "livingarchive.dev",
    summary:
      "Creative developer with 6+ years of experience building thoughtful digital experiences. Passionate about the intersection of technology, psychology, and design. Expert in React, Next.js, and creating interfaces that respect human attention.",
  },
  skills: {
    technical: [
      { name: "React", level: "Expert", yearsOfExperience: 5 },
      { name: "Next.js", level: "Expert", yearsOfExperience: 3 },
      { name: "TypeScript", level: "Advanced", yearsOfExperience: 4 },
      { name: "Tailwind CSS", level: "Expert", yearsOfExperience: 4 },
      { name: "Node.js", level: "Advanced", yearsOfExperience: 3 },
      { name: "Python", level: "Intermediate", yearsOfExperience: 2 },
      { name: "GraphQL", level: "Intermediate", yearsOfExperience: 2 },
      { name: "Figma", level: "Expert", yearsOfExperience: 5 },
    ],
    soft: [
      { name: "Leadership", level: "Advanced", yearsOfExperience: 3 },
      { name: "Communication", level: "Expert", yearsOfExperience: 6 },
      { name: "Problem Solving", level: "Expert", yearsOfExperience: 6 },
      { name: "Team Collaboration", level: "Expert", yearsOfExperience: 6 },
    ],
    languages: [
      { name: "English", proficiency: "Native" },
      { name: "Spanish", proficiency: "Professional Working" },
    ],
  },
  experience: [
    {
      id: "1",
      company: "Digital Wellness Lab",
      position: "Lead Creative Developer",
      location: "Remote",
      startDate: "2022-01",
      endDate: "Present",
      description: [
        "Lead development of The Quiet Interface browser extension used by 2,500+ users",
        "Manage team of 3 developers and 2 designers",
        "Implement user research findings into product features",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Chrome Extension API",
        "Tailwind CSS",
      ],
      achievements: [
        "40% reduction in user anxiety reported",
        "89% retention rate after 30 days",
        "Featured in 'Tools for Thought' newsletter",
      ],
    },
    {
      id: "2",
      company: "Digital Literature Foundation",
      position: "Creative Director & Lead Developer",
      location: "New York, NY",
      startDate: "2021-06",
      endDate: "2022-12",
      description: [
        "Architected non-linear storytelling engine for 'Invisible Cities Map'",
        "Collaborated with writers and illustrators to create 55 story fragments",
        "Implemented graph database for narrative connections",
      ],
      technologies: ["Next.js", "Neo4j", "Canvas API", "GSAP"],
      achievements: [
        "50,000+ unique journeys in first month",
        "Won 'Best Digital Narrative' award",
        "Used in 12 university courses",
      ],
    },
  ],
  education: [
    {
      id: "1",
      degree: "M.S. Human-Computer Interaction",
      institution: "Georgia Tech",
      location: "Atlanta, GA",
      graduationYear: "2020",
      gpa: "3.9",
      relevantCourses: [
        "User Research",
        "Interaction Design",
        "Cognitive Psychology",
      ],
    },
    {
      id: "2",
      degree: "B.S. Computer Science",
      institution: "University of Washington",
      location: "Seattle, WA",
      graduationYear: "2017",
      gpa: "3.7",
    },
  ],
  certifications: [
    {
      name: "Advanced React Patterns",
      issuer: "Frontend Masters",
      date: "2023",
      link: "https://frontendmasters.com/cert/xyz",
    },
    {
      name: "UX Design Fundamentals",
      issuer: "Nielsen Norman Group",
      date: "2022",
    },
  ],
  projects: [
    {
      name: "The Quiet Interface",
      description: "Browser extension transforming digital experiences",
      technologies: ["React", "Chrome API", "Web Audio API"],
      link: "https://quietinterface.com",
      github: "https://github.com/alexmorgan/quiet-interface",
    },
    {
      name: "Invisible Cities Map",
      description: "Non-linear storytelling engine",
      technologies: ["Next.js", "Neo4j", "Canvas API"],
      link: "https://invisiblecitiesmap.com",
      github: "https://github.com/alexmorgan/invisible-cities",
    },
  ],
  achievements: [
    "Speaker at CSS Conf 2023: 'Designing for Digital Calm'",
    "Published article on 'Ethical Design Patterns' in Smashing Magazine",
    "Mentor at Code for America, 2023 cohort",
  ],
};

export const sampleJobDescription: JobDescription = {
  id: "jd-001",
  title: "Senior Creative Developer",
  company: "Innovation Studio",
  description:
    "We're looking for a creative developer who bridges design and technology. You'll build experimental interfaces, lead projects from concept to launch, and contribute to our design system.",
  requirements: [
    "5+ years of experience in frontend development",
    "Expertise in React and modern JavaScript",
    "Strong portfolio of interactive web experiences",
    "Experience with animation libraries (GSAP, Framer Motion)",
    "Understanding of UX principles",
  ],
  responsibilities: [
    "Build responsive, performant web applications",
    "Collaborate with designers to implement interfaces",
    "Mentor junior developers",
    "Contribute to technical architecture decisions",
  ],
  preferredQualifications: [
    "Experience with WebGL/Three.js",
    "Background in HCI or design",
    "Open source contributions",
    "Experience with Chrome extensions",
  ],
  technologies: [
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "Node.js",
  ],
  seniority: "Senior",
  location: "Remote (US)",
  salary: "$120,000 - $160,000",
};
