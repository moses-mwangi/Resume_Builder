"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [resumes, setResumes] = useState([
    {
      id: 1,
      title: "My First Resume",
      role: "General Application",
      color: "from-blue-500 to-blue-700",
      icon: "📄",
      link: "/resume/1",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      role: "Senior Developer Position",
      color: "from-purple-500 to-pink-600",
      icon: "💻",
      link: "/resume/2",
      date: "2024-02-20",
    },
    {
      id: 3,
      title: "Product Manager",
      role: "Tech Product Lead",
      color: "from-green-500 to-teal-600",
      icon: "🎯",
      link: "/resume/3",
      date: "2024-03-10",
    },
  ]);

  const [coverLetters, setCoverLetters] = useState([
    {
      id: 1,
      title: "Software Engineer Application",
      company: "Google",
      color: "from-emerald-500 to-green-700",
      icon: "✉️",
      date: "2024-02-01",
    },
    {
      id: 2,
      title: "Startup Position",
      company: "Tech Startup",
      color: "from-orange-500 to-red-600",
      icon: "🚀",
      date: "2024-03-05",
    },
  ]);

  const [showMenu, setShowMenu] = useState<string | null>(null);

  const handleMenuToggle = (id: number, type: "resume" | "cover") => {
    setShowMenu(showMenu === `${type}-${id}` ? null : `${type}-${id}`);
  };

  const handleDelete = (id: number, type: "resume" | "cover") => {
    if (type === "resume") {
      setResumes(resumes.filter((r) => r.id !== id));
    } else {
      setCoverLetters(coverLetters.filter((c) => c.id !== id));
    }
    setShowMenu(null);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 px-4 md:px-8 lg:px-16 py-8 md:py-12 space-y-12">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Resumes</p>
              <p className="text-3xl font-bold text-gray-800">
                {resumes.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Cover Letters</p>
              <p className="text-3xl font-bold text-gray-800">
                {coverLetters.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✉️</span>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-6 shadow-sm text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Success Rate</p>
              <p className="text-3xl font-bold">94%</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RESUME SECTION ================= */}
      <section>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              My Resumes
            </h1>
            <p className="text-gray-500 mt-1">
              Create and manage AI-powered resumes for your job applications
            </p>
          </div>
          <Link
            href="/resume"
            className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            New Resume
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Add New Resume Card */}
          <Link
            href={`/resume`}
            className="group relative h-80 bg-white rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
              <span className="text-3xl text-gray-400 group-hover:text-blue-600 transition-colors duration-300">
                +
              </span>
            </div>
            <p className="mt-4 text-gray-500 group-hover:text-blue-600 font-medium">
              Create New Resume
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Start from scratch or use AI
            </p>
          </Link>

          {/* Resume Cards */}
          {resumes.map((resume) => (
            <div key={resume.id} className="group relative">
              <Link href={resume.link}>
                <div className="h-80 rounded-xl shadow-md flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Card Header with linear */}
                  <div
                    className={`flex-1 bg-linear-to-br ${resume.color} p-6 flex flex-col items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="text-6xl mb-3 animate-bounce-in">
                      {resume.icon}
                    </div>
                    <div className="text-center text-white">
                      <h3 className="font-semibold text-lg mb-1">
                        {resume.title}
                      </h3>
                      <p className="text-xs text-white/80">{resume.role}</p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div
                    className={`px-4 py-3 text-white flex justify-between items-center bg-linear-to-r ${resume.color}`}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs text-white/80">
                        Last updated
                      </span>
                      <span className="text-xs font-medium">
                        {new Date(resume.date).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuToggle(resume.id, "resume");
                      }}
                      className="text-white hover:text-gray-200 transition-colors p-1"
                    >
                      <span className="text-xl">⋮</span>
                    </button>
                  </div>
                </div>
              </Link>

              {/* Dropdown Menu */}
              {showMenu === `resume-${resume.id}` && (
                <div className="absolute right-2 top-20 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-[140px]">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                    <span>✏️</span> Edit
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                    <span>📋</span> Duplicate
                  </button>
                  <button
                    onClick={() => handleDelete(resume.id, "resume")}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <span>🗑️</span> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= COVER LETTER SECTION ================= */}
      <section>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Cover Letters
            </h1>
            <p className="text-gray-500 mt-1">
              Create personalized cover letters tailored to each job application
            </p>
          </div>
          <button className="bg-linear-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
            <span className="text-xl">+</span>
            New Cover Letter
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Add New Cover Letter Card */}
          <Link
            href={"/coverLetter"}
            className="group relative h-80 bg-white rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
              <span className="text-3xl text-gray-400 group-hover:text-green-600 transition-colors duration-300">
                +
              </span>
            </div>
            <p className="mt-4 text-gray-500 group-hover:text-green-600 font-medium">
              Create Cover Letter
            </p>
            <p className="text-xs text-gray-400 mt-1">
              AI-powered writing assistant
            </p>
          </Link>

          {/* Cover Letter Cards */}
          {coverLetters.map((letter) => (
            <div key={letter.id} className="group relative">
              <div className="h-80 rounded-xl shadow-md flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div
                  className={`flex-1 bg-linear-to-br ${letter.color} p-6 flex flex-col items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-6xl mb-3">{letter.icon}</div>
                  <div className="text-center text-white">
                    <h3 className="font-semibold text-lg mb-1">
                      {letter.title}
                    </h3>
                    <p className="text-xs text-white/80">{letter.company}</p>
                  </div>
                </div>

                <div
                  className={`px-4 py-3 text-white flex justify-between items-center bg-linear-to-r ${letter.color}`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs text-white/80">Created</span>
                    <span className="text-xs font-medium">
                      {new Date(letter.date).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleMenuToggle(letter.id, "cover")}
                    className="text-white hover:text-gray-200 transition-colors p-1"
                  >
                    <span className="text-xl">⋮</span>
                  </button>
                </div>
              </div>

              {/* Dropdown Menu */}
              {showMenu === `cover-${letter.id}` && (
                <div className="absolute right-2 top-20 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-[140px]">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                    <span>✏️</span> Edit
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                    <span>📋</span> Duplicate
                  </button>
                  <button
                    onClick={() => handleDelete(letter.id, "cover")}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <span>🗑️</span> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Empty State Messages */}
      {resumes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No resumes yet
          </h3>
          <p className="text-gray-500">
            Create your first resume to get started
          </p>
        </div>
      )}
    </main>
  );
}
