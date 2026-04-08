"use client";

import { useState } from "react";
import {
  Sparkles,
  FileText,
  Copy,
  Video,
  ArrowRight,
  Check,
} from "lucide-react";

export default function Home() {
  const [role, setRole] = useState("");
  const [generated, setGenerated] = useState("");

  const handleGenerate = () => {
    if (!role) return;

    setGenerated(`
      <h3><strong>${role}</strong></h3>
      <p>Creative and results-driven ${role} with experience in building scalable solutions and delivering high-quality work.</p>
      <ul>
        <li>Strong problem-solving skills</li>
        <li>Experience with modern tools</li>
        <li>Ability to deliver results fast</li>
      </ul>
    `);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-white to-gray-50">
      {/* HERO */}
      <section className="text-center py-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Build Your Resume with <span className="text-primary-p">AI</span>
        </h1>

        <p className="mt-4 text-gray-600">
          Generate resumes, cover letters, and content instantly.
        </p>
      </section>

      {/* AI DEMO */}
      <section id="demo" className="py-12 px-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow border">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-primary-p" />
            <h2 className="font-semibold">Try AI Generator</h2>
          </div>

          <div className="flex gap-3">
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter job role (e.g. Software Engineer)"
              className="flex-1 border rounded-lg px-4 py-2"
            />

            <button
              onClick={handleGenerate}
              className="bg-primary-p text-white px-4 py-2 rounded-lg"
            >
              Generate
            </button>
          </div>

          {/* OUTPUT */}
          {generated && (
            <div className="mt-6 border rounded-lg p-4 bg-gray-50 relative">
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
              >
                <Copy size={16} />
              </button>

              <div
                className="text-sm [&_ul]:list-disc [&_ul]:ml-5"
                dangerouslySetInnerHTML={{ __html: generated }}
              />
            </div>
          )}
        </div>
      </section>

      {/* RESUME PREVIEW MOCKUP */}
      <section
        id="preview"
        className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"
      >
        {/* LEFT TEXT */}
        <div>
          <h2 className="text-3xl font-bold">Live Resume Preview</h2>

          <p className="mt-4 text-gray-600">
            See your resume update instantly as you type. No guesswork. No
            stress.
          </p>

          <ul className="mt-4 text-sm text-gray-600 space-y-2">
            <li>✔ Real-time editing</li>
            <li>✔ Clean modern templates</li>
            <li>✔ Ready for download</li>
          </ul>
        </div>

        {/* RIGHT MOCKUP */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border">
          <div className="border-b pb-2 mb-3">
            <h3 className="font-bold text-lg">John Doe</h3>
            <p className="text-sm text-gray-500">Fullstack Developer</p>
          </div>

          <div className="text-sm text-gray-700 space-y-2">
            <p>
              Passionate developer experienced in building scalable web
              applications and modern digital solutions.
            </p>

            <ul className="list-disc ml-5">
              <li>React / Next.js</li>
              <li>Node.js APIs</li>
              <li>Database design</li>
            </ul>
          </div>
        </div>
      </section>

      {/* AI IMAGE / CONTENT MOCK */}
      <section className="py-16 px-6 text-center bg-white">
        <h2 className="text-3xl font-bold">More than just resumes</h2>

        <p className="text-gray-500 mt-2">
          Generate content, ideas, and even visuals with AI
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 border rounded-xl">
            <FileText className="mb-3" />
            <h3 className="font-semibold">AI Cover Letters</h3>
            <p className="text-sm text-gray-600">
              Tailored cover letters instantly
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <Sparkles className="mb-3" />
            <h3 className="font-semibold">AI Content</h3>
            <p className="text-sm text-gray-600">
              Generate summaries & job descriptions
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <FileText className="mb-3" />
            <h3 className="font-semibold">Export Ready</h3>
            <p className="text-sm text-gray-600">
              Download PDF or share instantly
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-16 text-center bg-primary-p text-white">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-white">Free Forever</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Building Your Dream Career
          </h2>

          <p className="mt-2 mb-6 text-white/80 md:text-lg max-w-3xl mx-auto">
            Your next job starts with a better resume. Join thousands of
            successful job seekers who landed their dream roles.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/dashboard"
              className="group text-[15px] relative inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">Get Started Free</span>

              <ArrowRight className="h-4.5 w-4.5" />
              <div className="absolute inset-0 bg-linear-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <a
              href="#demo"
              className="inline-flex text-[15px] items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105 active:scale-95"
            >
              <Video className="w-5 h-5" />
              Watch Demo
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm text-white/70 mb-4">
              Trusted by 10,000+ job seekers
            </p>
            <div className="flex justify-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white/65" />
                <span>ATS-Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white/65" />
                <span>Export to PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white/65" />
                <span>Free Templates</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
