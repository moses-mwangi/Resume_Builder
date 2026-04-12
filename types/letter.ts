export interface CoverLetterData {
  id: string;
  title: string;
  company: string;
  date: string | number;
  personalInfo: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    title: string;
  };
  recipient: {
    companyName: string;
    hiringManager: string;
    companyAddress: string;
    recipientEmail: string;
    address?: Address;
  };
  letter: {
    position: string;
    subject: string;
    opening: string;
    body: string;
    closing: string;
    signature: string;
  };
  additional: {
    referral: string;
    portfolioLink: string;
    availableFrom: string;
    salaryExpectation: string;
  };
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  line1: string;
  line2: string;
  cityStateZip: string;
  country: string;
}

// Templates
export const letterTemplates = {
  professional: {
    name: "Professional",
    primaryColor: "#1e293b",
    font: "Inter",
    spacing: "comfortable",
    layout: "standard",
    preview: "bg-gradient-to-br from-gray-800 to-gray-900",
  },
  modern: {
    name: "Modern",
    primaryColor: "#3b82f6",
    font: "Poppins",
    spacing: "relaxed",
    layout: "minimal",
    preview: "bg-gradient-to-br from-blue-600 to-indigo-600",
  },
  creative: {
    name: "Creative",
    primaryColor: "#8b5cf6",
    font: "Plus Jakarta Sans",
    spacing: "relaxed",
    layout: "bold",
    preview: "bg-gradient-to-br from-purple-600 to-pink-600",
  },
};

// AI Suggestions
export const aiSuggestions = {
  openings: [
    "I am writing to express my strong interest in the [Position] position at [Company].",
    "As a passionate [Industry] professional with [X] years of experience, I was thrilled to see the opening for [Position] at [Company].",
    "Your company's recent work in [Project/Area] caught my attention and inspired me to apply for the [Position] role.",
  ],
  closings: [
    "Thank you for considering my application. I look forward to discussing how my skills can benefit your team.",
    "I would welcome the opportunity to discuss how my experience aligns with your needs in an interview.",
  ],
  bodyParagraphs: [
    "In my current role, I have successfully delivered impactful projects resulting in measurable improvements. This experience has prepared me well to contribute to your team's success.",
    "My background includes expertise in modern technologies and best practices, which I believe would be valuable for your upcoming initiatives.",
  ],
};
