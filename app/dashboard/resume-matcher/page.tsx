// app/resume-builder/page.tsx
import ResumeBuilder from "./bulder";

export const metadata = {
  title: "Resume Builder & Job Matcher | Living Archive",
  description: "AI-powered resume matching and job application tools",
};

export default function ResumeBuilderPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            📄 Resume Builder & Job Matcher
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload a job description and see how well your resume matches
          </p>
        </div>
        <ResumeBuilder />
      </div>
    </main>
  );
}
