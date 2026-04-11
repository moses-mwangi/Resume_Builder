// "use client";
// import Link from "next/link";
// import { useState } from "react";

// export default function Home() {
//   const [resumes, setResumes] = useState([
//     {
//       id: 1,
//       title: "My First Resume",
//       role: "General Application",
//       color: "from-blue-500 to-blue-700",
//       icon: "📄",
//       link: "/resume/1",
//       date: "2024-01-15",
//     },
//     {
//       id: 2,
//       title: "Full Stack Developer",
//       role: "Senior Developer Position",
//       color: "from-purple-500 to-pink-600",
//       icon: "💻",
//       link: "/resume/2",
//       date: "2024-02-20",
//     },
//     {
//       id: 3,
//       title: "Product Manager",
//       role: "Tech Product Lead",
//       color: "from-green-500 to-teal-600",
//       icon: "🎯",
//       link: "/resume/3",
//       date: "2024-03-10",
//     },
//   ]);

//   const [coverLetters, setCoverLetters] = useState([
//     {
//       id: 1,
//       title: "Software Engineer Application",
//       company: "Google",
//       color: "from-emerald-500 to-green-700",
//       icon: "✉️",
//       date: "2024-02-01",
//     },
//     {
//       id: 2,
//       title: "Startup Position",
//       company: "Tech Startup",
//       color: "from-orange-500 to-red-600",
//       icon: "🚀",
//       date: "2024-03-05",
//     },
//   ]);

//   const [showMenu, setShowMenu] = useState<string | null>(null);

//   const handleMenuToggle = (id: number, type: "resume" | "cover") => {
//     setShowMenu(showMenu === `${type}-${id}` ? null : `${type}-${id}`);
//   };

//   const handleDelete = (id: number, type: "resume" | "cover") => {
//     if (type === "resume") {
//       setResumes(resumes.filter((r) => r.id !== id));
//     } else {
//       setCoverLetters(coverLetters.filter((c) => c.id !== id));
//     }
//     setShowMenu(null);
//   };

//   return (
//     <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 px-4 md:px-8 lg:px-16 py-8 md:py-12 space-y-12">
//       {/* Header Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Total Resumes</p>
//               <p className="text-3xl font-bold text-gray-800">
//                 {resumes.length}
//               </p>
//             </div>
//             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//               <span className="text-2xl">📄</span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Cover Letters</p>
//               <p className="text-3xl font-bold text-gray-800">
//                 {coverLetters.length}
//               </p>
//             </div>
//             <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//               <span className="text-2xl">✉️</span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-6 shadow-sm text-white">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-white/80 text-sm">Success Rate</p>
//               <p className="text-3xl font-bold">94%</p>
//             </div>
//             <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
//               <span className="text-2xl">🎯</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= RESUME SECTION ================= */}
//       <section>
//         <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
//           <div>
//             <h1 className="text-3xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//               My Resumes
//             </h1>
//             <p className="text-gray-500 mt-1">
//               Create and manage AI-powered resumes for your job applications
//             </p>
//           </div>
//           <Link
//             href="/resume"
//             className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
//           >
//             <span className="text-xl">+</span>
//             New Resume
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {/* Add New Resume Card */}
//           <Link
//             href={`/resume`}
//             className="group relative h-80 bg-white rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
//           >
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
//               <span className="text-3xl text-gray-400 group-hover:text-blue-600 transition-colors duration-300">
//                 +
//               </span>
//             </div>
//             <p className="mt-4 text-gray-500 group-hover:text-blue-600 font-medium">
//               Create New Resume
//             </p>
//             <p className="text-xs text-gray-400 mt-1">
//               Start from scratch or use AI
//             </p>
//           </Link>

//           {/* Resume Cards */}
//           {resumes.map((resume) => (
//             <div key={resume.id} className="group relative">
//               <Link href={resume.link}>
//                 <div className="h-80 rounded-xl shadow-md flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//                   {/* Card Header with linear */}
//                   <div
//                     className={`flex-1 bg-linear-to-br ${resume.color} p-6 flex flex-col items-center justify-center relative overflow-hidden`}
//                   >
//                     <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                     <div className="text-6xl mb-3 animate-bounce-in">
//                       {resume.icon}
//                     </div>
//                     <div className="text-center text-white">
//                       <h3 className="font-semibold text-lg mb-1">
//                         {resume.title}
//                       </h3>
//                       <p className="text-xs text-white/80">{resume.role}</p>
//                     </div>
//                   </div>

//                   {/* Card Footer */}
//                   <div
//                     className={`px-4 py-3 text-white flex justify-between items-center bg-linear-to-r ${resume.color}`}
//                   >
//                     <div className="flex flex-col">
//                       <span className="text-xs text-white/80">
//                         Last updated
//                       </span>
//                       <span className="text-xs font-medium">
//                         {new Date(resume.date).toLocaleDateString()}
//                       </span>
//                     </div>
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleMenuToggle(resume.id, "resume");
//                       }}
//                       className="text-white hover:text-gray-200 transition-colors p-1"
//                     >
//                       <span className="text-xl">⋮</span>
//                     </button>
//                   </div>
//                 </div>
//               </Link>

//               {/* Dropdown Menu */}
//               {showMenu === `resume-${resume.id}` && (
//                 <div className="absolute right-2 top-20 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-[140px]">
//                   <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
//                     <span>✏️</span> Edit
//                   </button>
//                   <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
//                     <span>📋</span> Duplicate
//                   </button>
//                   <button
//                     onClick={() => handleDelete(resume.id, "resume")}
//                     className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
//                   >
//                     <span>🗑️</span> Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= COVER LETTER SECTION ================= */}
//       <section>
//         <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
//           <div>
//             <h1 className="text-3xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//               Cover Letters
//             </h1>
//             <p className="text-gray-500 mt-1">
//               Create personalized cover letters tailored to each job application
//             </p>
//           </div>
//           <button className="bg-linear-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
//             <span className="text-xl">+</span>
//             New Cover Letter
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {/* Add New Cover Letter Card */}
//           <Link
//             href={"/coverLetter"}
//             className="group relative h-80 bg-white rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-300"
//           >
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
//               <span className="text-3xl text-gray-400 group-hover:text-green-600 transition-colors duration-300">
//                 +
//               </span>
//             </div>
//             <p className="mt-4 text-gray-500 group-hover:text-green-600 font-medium">
//               Create Cover Letter
//             </p>
//             <p className="text-xs text-gray-400 mt-1">
//               AI-powered writing assistant
//             </p>
//           </Link>

//           {/* Cover Letter Cards */}
//           {coverLetters.map((letter) => (
//             <div key={letter.id} className="group relative">
//               <div className="h-80 rounded-xl shadow-md flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//                 <div
//                   className={`flex-1 bg-linear-to-br ${letter.color} p-6 flex flex-col items-center justify-center relative overflow-hidden`}
//                 >
//                   <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   <div className="text-6xl mb-3">{letter.icon}</div>
//                   <div className="text-center text-white">
//                     <h3 className="font-semibold text-lg mb-1">
//                       {letter.title}
//                     </h3>
//                     <p className="text-xs text-white/80">{letter.company}</p>
//                   </div>
//                 </div>

//                 <div
//                   className={`px-4 py-3 text-white flex justify-between items-center bg-linear-to-r ${letter.color}`}
//                 >
//                   <div className="flex flex-col">
//                     <span className="text-xs text-white/80">Created</span>
//                     <span className="text-xs font-medium">
//                       {new Date(letter.date).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <button
//                     onClick={() => handleMenuToggle(letter.id, "cover")}
//                     className="text-white hover:text-gray-200 transition-colors p-1"
//                   >
//                     <span className="text-xl">⋮</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Dropdown Menu */}
//               {showMenu === `cover-${letter.id}` && (
//                 <div className="absolute right-2 top-20 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-[140px]">
//                   <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
//                     <span>✏️</span> Edit
//                   </button>
//                   <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
//                     <span>📋</span> Duplicate
//                   </button>
//                   <button
//                     onClick={() => handleDelete(letter.id, "cover")}
//                     className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
//                   >
//                     <span>🗑️</span> Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Empty State Messages */}
//       {resumes.length === 0 && (
//         <div className="text-center py-12">
//           <div className="text-6xl mb-4">📄</div>
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">
//             No resumes yet
//           </h3>
//           <p className="text-gray-500">
//             Create your first resume to get started
//           </p>
//         </div>
//       )}
//     </main>
//   );
// }

"use client";
import Link from "next/link";
import { useState } from "react";

// Modal Component for creating new items
const CreateModal = ({
  isOpen,
  onClose,
  onSave,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, subtitle: string) => void;
  type: "resume" | "cover";
}) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title, subtitle);
      setTitle("");
      setSubtitle("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Create New {type === "resume" ? "Resume" : "Cover Letter"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {type === "resume" ? "Resume Title" : "Letter Title"} *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  type === "resume"
                    ? "e.g., Frontend Developer Resume"
                    : "e.g., Software Engineer Application"
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                autoFocus
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {type === "resume"
                  ? "Target Role (Optional)"
                  : "Company Name (Optional)"}
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder={
                  type === "resume" ? "e.g., Senior Developer" : "e.g., Google"
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Edit Modal Component
const EditModal = ({
  isOpen,
  onClose,
  onSave,
  item,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, title: string, subtitle: string) => void;
  item: any;
  type: "resume" | "cover";
}) => {
  const [title, setTitle] = useState(item?.title || "");
  const [subtitle, setSubtitle] = useState(item?.subtitle || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(item.id, title, subtitle);
      onClose();
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Edit {type === "resume" ? "Resume" : "Cover Letter"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {type === "resume" ? "Target Role" : "Company"}
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🗑️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Delete Item</h3>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to delete{" "}
            <strong className="text-gray-900">"{itemName}"</strong>? This action
            cannot be undone.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentType, setCurrentType] = useState<"resume" | "cover">("resume");
  const [currentItem, setCurrentItem] = useState<any>(null);

  const handleMenuToggle = (id: number, type: "resume" | "cover") => {
    setShowMenu(showMenu === `${type}-${id}` ? null : `${type}-${id}`);
  };

  const handleCreate = (title: string, subtitle: string) => {
    if (currentType === "resume") {
      const newResume = {
        id: Date.now(),
        title: title,
        role: subtitle,
        color: `from-${["blue", "purple", "green", "orange", "pink"][Math.floor(Math.random() * 5)]}-500 to-${
          ["blue", "purple", "green", "orange", "pink"][
            Math.floor(Math.random() * 5)
          ]
        }-700`,
        icon: ["📄", "💻", "🎯", "📊", "🎨"][Math.floor(Math.random() * 5)],
        link: `/resume/${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
      };
      setResumes([...resumes, newResume]);
    } else {
      const newCoverLetter = {
        id: Date.now(),
        title: title,
        company: subtitle,
        color: `from-${["emerald", "teal", "cyan", "indigo"][Math.floor(Math.random() * 4)]}-500 to-${
          ["emerald", "teal", "cyan", "indigo"][Math.floor(Math.random() * 4)]
        }-700`,
        icon: "✉️",
        date: new Date().toISOString().split("T")[0],
      };
      setCoverLetters([...coverLetters, newCoverLetter]);
    }
  };

  const handleEdit = (id: number, title: string, subtitle: string) => {
    if (currentType === "resume") {
      setResumes(
        resumes.map((r) =>
          r.id === id ? { ...r, title: title, role: subtitle } : r,
        ),
      );
    } else {
      setCoverLetters(
        coverLetters.map((c) =>
          c.id === id ? { ...c, title: title, company: subtitle } : c,
        ),
      );
    }
  };

  const handleDelete = () => {
    if (currentType === "resume") {
      setResumes(resumes.filter((r) => r.id !== currentItem?.id));
    } else {
      setCoverLetters(coverLetters.filter((c) => c.id !== currentItem?.id));
    }
    setIsDeleteModalOpen(false);
    setShowMenu(null);
    setCurrentItem(null);
  };

  const handleDuplicate = (item: any, type: "resume" | "cover") => {
    const newItem = {
      ...item,
      id: Date.now(),
      title: `${item.title} (Copy)`,
      date: new Date().toISOString().split("T")[0],
      link: type === "resume" ? `/resume/${Date.now()}` : undefined,
    };

    if (type === "resume") {
      setResumes([...resumes, newItem]);
    } else {
      setCoverLetters([...coverLetters, newItem]);
    }
    setShowMenu(null);
  };

  const openCreateModal = (type: "resume" | "cover") => {
    setCurrentType(type);
    setIsCreateModalOpen(true);
  };

  const openEditModal = (item: any, type: "resume" | "cover") => {
    setCurrentItem(item);
    setCurrentType(type);
    setIsEditModalOpen(true);
    setShowMenu(null);
  };

  const openDeleteModal = (item: any, type: "resume" | "cover") => {
    setCurrentItem(item);
    setCurrentType(type);
    setIsDeleteModalOpen(true);
    setShowMenu(null);
  };

  // Empty State Component
  const EmptyState = ({ type }: { type: "resume" | "cover" }) => (
    <div className="col-span-full">
      <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
        <div className="text-7xl mb-4">{type === "resume" ? "📄" : "✉️"}</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No {type === "resume" ? "resumes" : "cover letters"} yet
        </h3>
        <p className="text-gray-500 mb-6">
          Create your first {type === "resume" ? "resume" : "cover letter"} to
          get started
        </p>
        <button
          onClick={() => openCreateModal(type)}
          className="bg-linear-to-r text-sm cursor-pointer py-1.25 from-blue-600 to-purple-600 text-white px-6 rounded-lg font-medium hover:shadow-lg transition-all"
        >
          + Create {type === "resume" ? "Resume" : "Cover Letter"}
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 px-4 md:px-8 lg:px-16 py-8 md:py-12 space-y-12">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
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

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
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

        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-6 shadow-sm text-white hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Total Documents</p>
              <p className="text-3xl font-bold">
                {resumes.length + coverLetters.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Section */}
      <section>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-[28px] font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              My Resumes
            </h1>
            <p className="text-gray-500 mt-1">
              Create and manage AI-powered resumes for your job applications
            </p>
          </div>
          <button
            onClick={() => openCreateModal("resume")}
            className="bg-linear-to-r text-sm py-1 cursor-pointer from-blue-600 to-purple-600 text-white px-5  rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            New Resume
          </button>
        </div>

        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {resumes.length === 0 ? (
            <EmptyState type="resume" />
          ) : (
            <>
              {/* Add New Resume Card */}
              <button
                onClick={() => openCreateModal("resume")}
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
              </button>

              {/* Resume Cards */}
              {resumes.map((resume) => (
                <div key={resume.id} className="group relative">
                  <Link href={resume.link}>
                    <div className="h-80 rounded-xl shadow-md flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div
                        className={`flex-1 bg-linear-to-br ${resume.color} p-6 flex flex-col items-center justify-center relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="text-6xl mb-3">{resume.icon}</div>
                        <div className="text-center text-white">
                          <h3 className="font-semibold text-lg mb-1">
                            {resume.title}
                          </h3>
                          <p className="text-xs text-white/80">{resume.role}</p>
                        </div>
                      </div>

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

                  {showMenu === `resume-${resume.id}` && (
                    <div className="absolute right-2 top-20 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-37.5 animate-in fade-in zoom-in duration-200">
                      <button
                        onClick={() => openEditModal(resume, "resume")}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 transition"
                      >
                        <span>✏️</span> Edit
                      </button>
                      <button
                        onClick={() => handleDuplicate(resume, "resume")}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 transition"
                      >
                        <span>📋</span> Duplicate
                      </button>
                      <button
                        onClick={() => openDeleteModal(resume, "resume")}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
                      >
                        <span>🗑️</span> Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </section>

      {/* Cover Letter Section */}
      <section>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-[28px] font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Cover Letters
            </h1>
            <p className="text-gray-500 mt-1">
              Create personalized cover letters tailored to each job application
            </p>
          </div>
          <button
            onClick={() => openCreateModal("cover")}
            className="bg-linear-to-r text-sm cursor-pointer py-1.25 from-green-600 to-emerald-600 text-white px-5 rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            New Cover Letter
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {coverLetters.length === 0 ? (
            <EmptyState type="cover" />
          ) : (
            <>
              {/* Add New Cover Letter Card */}
              <button
                onClick={() => openCreateModal("cover")}
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
              </button>

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
                        <p className="text-xs text-white/80">
                          {letter.company}
                        </p>
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

                  {showMenu === `cover-${letter.id}` && (
                    <div className="absolute right-2 top-20 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-37.5 animate-in fade-in zoom-in duration-200">
                      <button
                        onClick={() => openEditModal(letter, "cover")}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <span>✏️</span> Edit
                      </button>
                      <button
                        onClick={() => handleDuplicate(letter, "cover")}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <span>📋</span> Duplicate
                      </button>
                      <button
                        onClick={() => openDeleteModal(letter, "cover")}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <span>🗑️</span> Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </section>

      {/* Modals */}
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreate}
        type={currentType}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEdit}
        item={currentItem}
        type={currentType}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={currentItem?.title || ""}
      />
    </main>
  );
}
