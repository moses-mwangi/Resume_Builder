// // app/page.tsx
// "use client";

import Link from "next/link";

// import { useState } from "react";

// // Demo data
// const demoResumes = [
//   {
//     id: 1,
//     title: "My First Resume",
//     role: "Full Stack Developer",
//     date: "2024-03-15",
//     score: 92,
//   },
//   {
//     id: 2,
//     title: "Frontend Portfolio",
//     role: "React Developer",
//     date: "2024-03-10",
//     score: 88,
//   },
//   {
//     id: 3,
//     title: "Backend Specialist",
//     role: "Node.js Developer",
//     date: "2024-03-05",
//     score: 85,
//   },
// ];

// export default function ResumeDashboard() {
//   const [activeTab, setActiveTab] = useState<"resumes" | "cover">("resumes");
//   const [coverLetter, setCoverLetter] = useState(`Dear Hiring Manager,

// I am excited to apply for the Full Stack Developer position at your company. With 4+ years of experience building modern web applications using React, Node.js, and TypeScript, I am confident I can bring value to your engineering team.

// Throughout my career, I've focused on creating scalable, user-friendly applications that solve real problems. I'm passionate about clean code, performance optimization, and collaborative development.

// I would love the opportunity to discuss how my skills align with your team's goals.

// Best regards,
// [Your Name]`);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-6xl mx-auto p-4 md:p-6">
//         {/* Header Section - matches image style */}
//         <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 mb-6 text-white shadow-lg">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold mb-2">My Resume</h1>
//               <p className="text-gray-300 text-lg">
//                 Start Creating AI resume to your next Job role
//               </p>
//             </div>
//             <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl text-sm font-medium transition flex items-center gap-2 self-start md:self-auto">
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 4v16m8-8H4"
//                 />
//               </svg>
//               New Resume
//             </button>
//           </div>
//         </div>

//         {/* Two Column Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* LEFT COLUMN: Resume List */}
//           <div className="bg-white rounded-2xl shadow-md overflow-hidden">
//             <div className="border-b border-gray-200 px-5 py-4 bg-gray-50">
//               <div className="flex items-center gap-2">
//                 <svg
//                   className="w-5 h-5 text-gray-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//                 <h2 className="font-semibold text-gray-800 text-lg">
//                   My Resumes
//                 </h2>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">
//                 AI-generated resumes ready for your next role
//               </p>
//             </div>

//             <div className="divide-y divide-gray-100">
//               {demoResumes.map((resume) => (
//                 <div
//                   key={resume.id}
//                   className="p-5 hover:bg-gray-50 transition cursor-pointer group"
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <h3 className="font-semibold text-gray-900 text-base">
//                           {resume.title}
//                         </h3>
//                         <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
//                           ATS {resume.score}%
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-500 mt-1">
//                         {resume.role}
//                       </p>
//                       <p className="text-xs text-gray-400 mt-2">
//                         Updated {resume.date}
//                       </p>
//                     </div>
//                     <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
//                       <button className="p-2 text-gray-500 hover:text-blue-600">
//                         <svg
//                           className="w-4 h-4"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//                           />
//                         </svg>
//                       </button>
//                       <button className="p-2 text-gray-500 hover:text-red-600">
//                         <svg
//                           className="w-4 h-4"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                   {/* subtle progress bar for ATS */}
//                   <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
//                     <div
//                       className="bg-blue-600 h-1.5 rounded-full"
//                       style={{ width: `${resume.score}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="border-t border-gray-200 p-4 bg-gray-50 text-center">
//               <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center justify-center gap-1 mx-auto">
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                   />
//                 </svg>
//                 Create new resume with AI
//               </button>
//             </div>
//           </div>

//           {/* RIGHT COLUMN: Cover Letter Section */}
//           <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
//             <div className="border-b border-gray-200 px-5 py-4 bg-gray-50">
//               <div className="flex items-center justify-between flex-wrap gap-3">
//                 <div className="flex items-center gap-2">
//                   <svg
//                     className="w-5 h-5 text-gray-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     />
//                   </svg>
//                   <h2 className="font-semibold text-gray-800 text-lg">
//                     Cover Letter
//                   </h2>
//                 </div>
//                 <div className="flex gap-2">
//                   <button className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-gray-700 transition flex items-center gap-1">
//                     <svg
//                       className="w-3 h-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
//                       />
//                     </svg>
//                     Export
//                   </button>
//                   <button className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-white transition flex items-center gap-1">
//                     <svg
//                       className="w-3 h-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                     AI Polish
//                   </button>
//                 </div>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">
//                 Personalized cover letter for your job applications
//               </p>
//             </div>

//             <div className="p-5 flex-1">
//               <textarea
//                 value={coverLetter}
//                 onChange={(e) => setCoverLetter(e.target.value)}
//                 className="w-full h-72 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y text-gray-700 text-sm leading-relaxed"
//                 placeholder="Write your cover letter here..."
//               />

//               <div className="mt-4 flex flex-wrap gap-3 justify-between items-center">
//                 <div className="flex gap-2">
//                   <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 px-2 py-1">
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       />
//                     </svg>
//                     Template
//                   </button>
//                   <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 px-2 py-1">
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
//                       />
//                     </svg>
//                     Insert from resume
//                   </button>
//                 </div>
//                 <span className="text-xs text-gray-400">
//                   {coverLetter.length} characters • AI-ready
//                 </span>
//               </div>
//             </div>

//             {/* quick tips */}
//             <div className="border-t border-gray-100 bg-gray-50 p-4">
//               <div className="flex items-start gap-2">
//                 <svg
//                   className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <p className="text-xs text-gray-500">
//                   💡 Tip: Use AI to tailor your cover letter based on the resume
//                   you select. Click "AI Polish" for suggestions.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Stats Row - optional but nice */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//             <div className="flex items-center gap-3">
//               <div className="bg-blue-100 p-2 rounded-xl">
//                 <svg
//                   className="w-5 h-5 text-blue-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Total Resumes</p>
//                 <p className="text-xl font-bold text-gray-800">12</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//             <div className="flex items-center gap-3">
//               <div className="bg-green-100 p-2 rounded-xl">
//                 <svg
//                   className="w-5 h-5 text-green-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Applications Sent</p>
//                 <p className="text-xl font-bold text-gray-800">48</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//             <div className="flex items-center gap-3">
//               <div className="bg-purple-100 p-2 rounded-xl">
//                 <svg
//                   className="w-5 h-5 text-purple-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Interviews</p>
//                 <p className="text-xl font-bold text-gray-800">9</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//             <div className="flex items-center gap-3">
//               <div className="bg-amber-100 p-2 rounded-xl">
//                 <svg
//                   className="w-5 h-5 text-amber-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Avg. ATS Score</p>
//                 <p className="text-xl font-bold text-gray-800">88%</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* AI Tip Banner */}
//         <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
//           <div className="flex items-start gap-3">
//             <div className="bg-blue-600 rounded-full p-1.5">
//               <svg
//                 className="w-4 h-4 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                 />
//               </svg>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-800">
//                 AI Resume Assistant
//               </p>
//               <p className="text-xs text-gray-600">
//                 Select any resume from the list, then click "AI Polish" to
//                 generate a tailored cover letter. Our AI matches your experience
//                 with job descriptions.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Home() {
//   const resumes = [
//     {
//       title: "My First Resume",
//       color: "from-blue-400 to-blue-600",
//     },
//     {
//       title: "Full Stack developer",
//       color: "from-pink-400 to-pink-600",
//     },
//   ];

//   return (
//     <main className="min-h-screen bg-gray-100 p-8">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold">My Resume</h1>
//         <p className="text-gray-500">
//           Start Creating AI resume to your next Job role
//         </p>
//       </div>

//       {/* Cards */}
//       <div className="flex gap-6">
//         {/* Add New Card */}
//         <div className="w-56 h-72 bg-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
//           <span className="text-3xl font-bold text-gray-500">+</span>
//         </div>

//         {/* Resume Cards */}
//         {resumes.map((resume, index) => (
//           <div
//             key={index}
//             className={`w-56 h-72 rounded-xl shadow-md flex flex-col justify-between overflow-hidden cursor-pointer`}
//           >
//             {/* Top Section */}
//             <div
//               className={`flex-1 bg-gradient-to-br ${resume.color} flex items-center justify-center`}
//             >
//               <div className="text-white text-5xl">📄</div>
//             </div>

//             {/* Bottom Bar */}
//             <div
//               className={`px-4 py-2 text-white flex justify-between items-center bg-gradient-to-r ${resume.color}`}
//             >
//               <span className="text-sm">{resume.title}</span>
//               <span className="text-lg cursor-pointer">⋮</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

export default function Home() {
  const resumes = [
    {
      title: "My First Resume",
      color: "from-blue-400 to-blue-600",
      link: "/resume/1",
    },
    {
      title: "Full Stack developer",
      color: "from-pink-400 to-pink-600",
      link: "/resume/2",
    },
  ];

  const coverLetters = [
    {
      title: "My First Cover Letter",
      color: "from-green-400 to-green-600",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-16 py-16 space-y-12">
      {/* ================= RESUME SECTION ================= */}
      <section>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">My Resume</h1>
          <p className="text-gray-500">
            Start creating AI resumes for your next job role
          </p>
        </div>

        <div className="flex gap-6">
          {/* Add New Resume */}
          <Link
            href={`/resume`}
            className="w-56 h-72 bg-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
          >
            <span className="text-3xl font-bold text-gray-500">+</span>
          </Link>

          {/* Resume Cards */}
          {resumes.map((resume, index) => (
            <Link
              href={resume.link}
              key={index}
              className="w-56 h-72 rounded-xl shadow-md flex flex-col justify-between overflow-hidden cursor-pointer hover:scale-105 transition"
            >
              <div
                className={`flex-1 bg-gradient-to-br ${resume.color} flex items-center justify-center`}
              >
                <div className="text-white text-5xl">📄</div>
              </div>

              <div
                className={`px-4 py-2 text-white flex justify-between items-center bg-gradient-to-r ${resume.color}`}
              >
                <span className="text-sm">{resume.title}</span>
                <span className="text-lg">⋮</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= COVER LETTER SECTION ================= */}
      <section>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Cover Letters</h1>
          <p className="text-gray-500">
            Create personalized cover letters for your applications
          </p>
        </div>

        <div className="flex gap-6">
          {/* Add New Cover Letter */}
          <div className="w-56 h-72 bg-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
            <span className="text-3xl font-bold text-gray-500">+</span>
          </div>

          {/* Cover Letter Cards */}
          {coverLetters.map((letter, index) => (
            <div
              key={index}
              className="w-56 h-72 rounded-xl shadow-md flex flex-col justify-between overflow-hidden cursor-pointer hover:scale-105 transition"
            >
              <div
                className={`flex-1 bg-gradient-to-br ${letter.color} flex items-center justify-center`}
              >
                <div className="text-white text-5xl">✉️</div>
              </div>

              <div
                className={`px-4 py-2 text-white flex justify-between items-center bg-gradient-to-r ${letter.color}`}
              >
                <span className="text-sm">{letter.title}</span>
                <span className="text-lg">⋮</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
