// "use client";

// import { AtomIcon, Edit, FileText, Sparkles } from "lucide-react";

// function Home() {
//   return (
//     <main className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
//       {/* HERO SECTION */}
//       <section className="py-20 px-6 text-center max-w-5xl mx-auto">
//         <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
//           Create a Job-Winning Resume <br />
//           <span className="text-primary">in Minutes</span>
//         </h1>

//         <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
//           Build professional resumes and cover letters with AI. Save time, stand
//           out, and land more interviews — effortlessly.
//         </p>

//         <div className="mt-8 flex justify-center gap-4 flex-wrap">
//           <a
//             href="/dashboard"
//             className="px-6 py-3 rounded-lg bg-primary text-white font-medium shadow hover:scale-105 transition"
//           >
//             Get Started Free
//           </a>

//           <a
//             href="#features"
//             className="px-6 py-3 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
//           >
//             See Features
//           </a>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section
//         id="features"
//         className="py-16 px-6 max-w-6xl mx-auto grid gap-8 md:grid-cols-3"
//       >
//         <div className="p-6 rounded-2xl bg-white shadow-sm border hover:shadow-md transition">
//           <AtomIcon className="w-8 h-8 text-primary mb-4" />
//           <h3 className="font-semibold text-lg">AI Resume Generator</h3>
//           <p className="text-sm text-gray-600 mt-2">
//             Instantly generate professional summaries, experience, and skills
//             tailored to your role.
//           </p>
//         </div>

//         <div className="p-6 rounded-2xl bg-white shadow-sm border hover:shadow-md transition">
//           <Edit className="w-8 h-8 text-primary mb-4" />
//           <h3 className="font-semibold text-lg">Smart Editor</h3>
//           <p className="text-sm text-gray-600 mt-2">
//             Easily edit and customize your resume with a clean and simple
//             interface.
//           </p>
//         </div>

//         <div className="p-6 rounded-2xl bg-white shadow-sm border hover:shadow-md transition">
//           <FileText className="w-8 h-8 text-primary mb-4" />
//           <h3 className="font-semibold text-lg">Cover Letters</h3>
//           <p className="text-sm text-gray-600 mt-2">
//             Create personalized cover letters in seconds to match your resume.
//           </p>
//         </div>
//       </section>

//       {/* HOW IT WORKS */}
//       <section className="py-20 px-6 bg-white">
//         <div className="max-w-5xl mx-auto text-center">
//           <h2 className="text-3xl font-bold">How It Works</h2>
//           <p className="text-gray-500 mt-2">
//             Simple steps to build your perfect resume
//           </p>

//           <div className="grid md:grid-cols-3 gap-10 mt-12 text-left">
//             <div>
//               <span className="text-primary font-bold text-xl">01</span>
//               <h3 className="font-semibold mt-2">Enter Your Details</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Add your job title, skills, and experience.
//               </p>
//             </div>

//             <div>
//               <span className="text-primary font-bold text-xl">02</span>
//               <h3 className="font-semibold mt-2">Generate with AI</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Let AI create professional content for you instantly.
//               </p>
//             </div>

//             <div>
//               <span className="text-primary font-bold text-xl">03</span>
//               <h3 className="font-semibold mt-2">Download & Apply</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Export your resume and start applying to jobs.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-20 px-6 text-center bg-gradient-to-r from-primary to-purple-600 text-white">
//         <h2 className="text-3xl font-bold">Ready to Build Your Resume?</h2>

//         <p className="mt-3 text-white/80">
//           Start creating your resume and cover letter today — it's free.
//         </p>

//         <a
//           href="/dashboard"
//           className="inline-block mt-6 px-8 py-3 bg-white text-black rounded-lg font-medium hover:scale-105 transition"
//         >
//           Get Started Now
//         </a>
//       </section>
//     </main>
//   );
// }

// export default Home;

"use client";

import { useState } from "react";
import { Sparkles, FileText, Copy } from "lucide-react";

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
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <h1 className="font-bold text-xl">AI Resume Builder</h1>

        <nav className="flex gap-6 text-sm">
          <a href="#demo" className="hover:text-primary">
            Demo
          </a>
          <a href="#preview" className="hover:text-primary">
            Preview
          </a>
          <a
            href="/dashboard"
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Get Started
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="text-center py-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Build Your Resume with <span className="text-primary">AI</span>
        </h1>

        <p className="mt-4 text-gray-600">
          Generate resumes, cover letters, and content instantly.
        </p>
      </section>

      {/* AI DEMO */}
      <section id="demo" className="py-12 px-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow border">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-primary" />
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
              className="bg-primary text-white px-4 py-2 rounded-lg"
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

      {/* CTA */}
      <section className="py-16 text-center bg-primary text-white">
        <h2 className="text-3xl font-bold">Start Building Today</h2>

        <p className="mt-2 text-white/80">
          Your next job starts with a better resume
        </p>

        <a
          href="/dashboard"
          className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-lg font-medium"
        >
          Get Started Free
        </a>
      </section>
    </main>
  );
}
