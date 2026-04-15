// "use client";

// import { ResumeData } from "@/types/resume";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { initialResumeData } from "../resume/page";
// import { CoverLetterData } from "@/types/letter";
// import { initialLetterData } from "../coverLetter/page";

// const CreateModal = ({
//   isOpen,
//   onClose,
//   onSave,
//   type,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (title: string, subtitle: string) => void;
//   type: "resume" | "cover";
// }) => {
//   const [title, setTitle] = useState("");
//   const [subtitle, setSubtitle] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (title.trim()) {
//       if (type == "resume") {
//         onSave(title, subtitle);
//         setTitle("");
//         setSubtitle("");
//         onClose();
//       } else {
//         onSave(title, subtitle);
//         setTitle("");
//         setSubtitle("");
//         onClose();
//       }
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl max-w-md w-full shadow-xl">
//         <div className="p-5">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold text-gray-800">
//               Create New {type === "resume" ? "Resume" : "Cover Letter"}
//             </h3>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               ✕
//             </button>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 {type === "resume" ? "Resume Title" : "Letter Title"} *
//               </label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder={
//                   type === "resume"
//                     ? "e.g., Frontend Developer Resume"
//                     : "e.g., Software Engineer Application"
//                 }
//                 className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                 autoFocus
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 {type === "resume"
//                   ? "Target Role (Optional)"
//                   : "Company Name (Optional)"}
//               </label>
//               <input
//                 type="text"
//                 value={subtitle}
//                 onChange={(e) => setSubtitle(e.target.value)}
//                 placeholder={
//                   type === "resume" ? "e.g., Senior Developer" : "e.g., Google"
//                 }
//                 className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//               />
//             </div>

//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 cursor-pointer px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 cursor-pointer px-3 py-1.5 text-sm bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
//               >
//                 Create
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Edit Modal Component (compacted)

// const EditModal = ({
//   isOpen,
//   onClose,
//   onSave,
//   item,
//   type,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (id: string, title: string, subtitle: string) => void;
//   item: any;
//   type: "resume" | "cover";
// }) => {
//   const [title, setTitle] = useState(item?.title || "");
//   const [subtitle, setSubtitle] = useState(item?.role || "");

//   useEffect(() => {
//     if (isOpen && item) {
//       if (type === "resume") {
//         setTitle(item.title || "");
//         setSubtitle(item.role || "");
//       } else {
//         setTitle(item.title || "");
//         setSubtitle(item.company || "");
//       }
//     }
//   }, [isOpen, item]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (title.trim()) {
//       onSave(item.id, title, subtitle);
//       onClose();
//     }
//   };

//   if (!isOpen || !item) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl max-w-md w-full shadow-xl">
//         <div className="p-5">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold text-gray-800">
//               Edit {type === "resume" ? "Resume" : "Cover Letter"}
//             </h3>
//             <button
//               onClick={onClose}
//               className="text-gray-400 cursor-pointer hover:text-gray-600"
//             >
//               ✕
//             </button>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Title *
//               </label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 {type === "resume" ? "Target Role" : "Company"}
//               </label>
//               <input
//                 type="text"
//                 value={subtitle}
//                 onChange={(e) => setSubtitle(e.target.value)}
//                 className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//               />
//             </div>

//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 cursor-pointer px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 cursor-pointer px-3 py-1.5 text-sm bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Delete Confirmation Modal (compacted)
// const DeleteModal = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   itemName,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   itemName: string;
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl max-w-md w-full shadow-xl">
//         <div className="p-5">
//           <div className="flex items-center gap-2 mb-3">
//             <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
//               <span className="text-xl">🗑️</span>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800">Delete Item</h3>
//           </div>

//           <p className="text-sm text-gray-600 mb-4">
//             Are you sure you want to delete{" "}
//             <strong className="text-gray-900">"{itemName}"</strong>? This action
//             cannot be undone.
//           </p>

//           <div className="flex gap-2">
//             <button
//               onClick={onClose}
//               className="flex-1 cursor-pointer px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={onConfirm}
//               className="flex-1 cursor-pointer px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function Home() {
//   const [resumes, setResumes] = useState<ResumeData[]>([]);
//   const [coverLetters, setCoverLetters] = useState<CoverLetterData[]>([]);

//   const [showMenu, setShowMenu] = useState<string | null>(null);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [currentType, setCurrentType] = useState<"resume" | "cover">("resume");
//   const [currentItem, setCurrentItem] = useState<any>(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const localResumeData = localStorage.getItem("resumeData");
//       const localLetterData = localStorage.getItem("letterData");

//       if (localResumeData) {
//         try {
//           const parsed = JSON.parse(localResumeData);
//           if (Array.isArray(parsed)) {
//             setResumes(parsed);
//           }
//         } catch (e) {
//           console.error("Invalid JSON in localStorage");
//         }
//       }
//       if (localLetterData) {
//         try {
//           const parsed = JSON.parse(localLetterData);
//           if (Array.isArray(parsed)) {
//             setCoverLetters(parsed);
//           }
//         } catch (e) {
//           console.error("Invalid JSON in localStorage");
//         }
//       }
//     }
//   }, []);

//   const handleMenuToggle = (id: string, type: "resume" | "cover") => {
//     setShowMenu(showMenu === `${type}-${id}` ? null : `${type}-${id}`);
//   };

//   const handleCreate = (title: string, subtitle: string) => {
//     if (currentType === "resume") {
//       const existing = localStorage.getItem("resumeData");

//       let resumesArray: ResumeData[] = [];

//       if (existing) {
//         try {
//           resumesArray = JSON.parse(existing);
//         } catch {
//           resumesArray = [];
//         }
//       }

//       if (!Array.isArray(resumesArray)) {
//         resumesArray = [];
//       }

//       const newResume = {
//         ...initialResumeData,
//         id: `${crypto.randomUUID()}-${Date.now()}`,
//         title,
//         role: subtitle,
//         date: new Date().toISOString(),
//       };

//       const updated = [...resumesArray, newResume];
//       localStorage.setItem("resumeData", JSON.stringify(updated));
//       setResumes(updated);
//     } else {
//       const existing = localStorage.getItem("letterData");

//       let letterArray: CoverLetterData[] = [];

//       if (existing) {
//         try {
//           letterArray = JSON.parse(existing);
//         } catch {
//           letterArray = [];
//         }
//       }

//       if (!Array.isArray(letterArray)) {
//         letterArray = [];
//       }
//       const newCoverLetter = {
//         ...initialLetterData,
//         id: `${crypto.randomUUID()}-${Date.now()}`,
//         title: title,
//         company: subtitle,
//         date: new Date().toISOString(),
//       };

//       const updated = [...letterArray, newCoverLetter];
//       localStorage.setItem("letterData", JSON.stringify(updated));
//       setCoverLetters(updated);
//     }
//   };

//   const handleEdit = (id: string, title: string, subtitle: string) => {
//     if (currentType === "resume") {
//       const res = resumes.find((el) => el.id === id);
//       if (res) {
//         const updatedResumes = resumes.map((r) =>
//           r.id === id
//             ? {
//                 ...r,
//                 title: title,
//                 role: subtitle,
//               }
//             : r,
//         );

//         localStorage.setItem("resumeData", JSON.stringify(updatedResumes));
//         setResumes(updatedResumes);
//       }
//     } else {
//       const updatedCoverLetters = coverLetters.map((c) =>
//         c.id === id
//           ? {
//               ...c,
//               title: title,
//               company: subtitle,
//             }
//           : c,
//       );
//       localStorage.setItem("letterData", JSON.stringify(updatedCoverLetters));
//       setCoverLetters(updatedCoverLetters);
//     }
//   };

//   const handleDelete = () => {
//     if (!currentItem) return;
//     if (currentType === "resume") {
//       const updated = resumes.filter((r) => r.id !== currentItem.id);
//       setResumes(updated);
//       localStorage.setItem("resumeData", JSON.stringify(updated));
//       setResumes(updated);
//     } else {
//       const updated = coverLetters.filter((c) => c.id !== currentItem.id);
//       setCoverLetters(updated);
//       localStorage.setItem("letterData", JSON.stringify(updated));
//     }

//     setIsDeleteModalOpen(false);
//     setShowMenu(null);
//     setCurrentItem(null);
//   };

//   const handleDuplicate = (item: any, type: "resume" | "cover") => {
//     const newId = crypto.randomUUID(); // ✅ unique ID

//     if (type === "resume") {
//       const newItem = {
//         ...item,
//         id: `${newId}-${Date.now()}-${item.id}-${Date.now()}`,
//         title: `${item.title} (Copy)`,
//         date: new Date().toISOString().split("T")[0],
//       };
//       const updated = [...resumes, newItem];
//       setResumes(updated);
//       localStorage.setItem("resumeData", JSON.stringify(updated));
//       setResumes(updated);
//     } else {
//       const newItem = {
//         ...item,
//         id: `${newId}-${Date.now()}-${item.id}-${Date.now()}`,
//         title: `${item.title} (Copy)`,
//         date: new Date().toISOString().split("T")[0],
//       };
//       const updated = [...coverLetters, newItem];
//       localStorage.setItem("letterData", JSON.stringify(updated));
//       setCoverLetters(updated);
//     }

//     setShowMenu(null);
//   };

//   const openCreateModal = (type: "resume" | "cover") => {
//     setCurrentType(type);
//     setIsCreateModalOpen(true);
//   };

//   const openEditModal = (item: any, type: "resume" | "cover") => {
//     setCurrentItem(item);
//     setCurrentType(type);
//     setIsEditModalOpen(true);
//     setShowMenu(null);
//   };

//   const openDeleteModal = (item: any, type: "resume" | "cover") => {
//     setCurrentItem(item);
//     setCurrentType(type);
//     setIsDeleteModalOpen(true);
//     setShowMenu(null);
//   };

//   // Empty State Component (compacted)
//   const EmptyState = ({ type }: { type: "resume" | "cover" }) => (
//     <div className="col-span-full">
//       <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
//         <div className="text-5xl mb-2">{type === "resume" ? "📄" : "✉️"}</div>
//         <h3 className="text-base font-semibold text-gray-700 mb-1">
//           No {type === "resume" ? "resumes" : "cover letters"} yet
//         </h3>
//         <p className="text-xs text-gray-500 mb-3">
//           Create your first {type === "resume" ? "resume" : "cover letter"} to
//           get started
//         </p>
//         <button
//           onClick={() => openCreateModal(type)}
//           className="bg-linear-to-r text-xs cursor-pointer py-1 from-blue-600 to-purple-600 text-white px-4 rounded-lg font-medium hover:shadow-lg transition-all"
//         >
//           + Create {type === "resume" ? "Resume" : "Cover Letter"}
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 px-20 py-6 space-y-8">
//       {/* Header Stats - Compact */}

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-xs">Total Resumes</p>
//               <p className="text-2xl font-bold text-gray-800">
//                 {resumes?.length}
//               </p>
//             </div>
//             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//               <span className="text-xl">📄</span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-xs">Cover Letters</p>
//               <p className="text-2xl font-bold text-gray-800">
//                 {coverLetters.length}
//               </p>
//             </div>
//             <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//               <span className="text-xl">✉️</span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-lg p-4 shadow-sm text-white hover:shadow-lg transition-all">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-white/80 text-xs">Total Documents</p>
//               <p className="text-2xl font-bold">
//                 {/* {resumess?.length + coverLetters.length} */}
//               </p>
//             </div>
//             <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
//               <span className="text-xl">📊</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Resume Section - Compact */}
//       <section>
//         <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
//           <div>
//             <h1 className="text-xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//               My Resumes
//             </h1>
//             <p className="text-gray-500 text-xs mt-0.5">
//               Create and manage AI-powered resumes for your job applications
//             </p>
//           </div>
//           <button
//             onClick={() => openCreateModal("resume")}
//             className="bg-linear-to-r text-xs py-1.5 cursor-pointer from-blue-600 to-purple-600 text-white px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5"
//           >
//             <span className="text-base">+</span>
//             New Resume
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           {/* {resumes.length === 0 ? ( */}
//           {resumes?.length === 0 ? (
//             <EmptyState type="resume" />
//           ) : (
//             <>
//               {/* Add New Resume Card - Compact */}
//               <button
//                 onClick={() => openCreateModal("resume")}
//                 className="group relative h-64 bg-white rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
//               >
//                 <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
//                   <span className="text-2xl text-gray-400 group-hover:text-blue-600 transition-colors duration-300">
//                     +
//                   </span>
//                 </div>
//                 <p className="mt-2 text-sm text-gray-500 group-hover:text-blue-600 font-medium">
//                   Create New Resume
//                 </p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   Start from scratch or use AI
//                 </p>
//               </button>

//               {/* Resume Cards - Compact */}
//               {resumes?.map((resume: ResumeData) => (
//                 <div key={resume.id} className="group relative">
//                   <div className="h-64 rounded-lg shadow-md flex flex-col justify-between overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
//                     <Link
//                       href={`resume/${resume.id}`}
//                       className={`flex-1 bg-linear-to-br from-purple-500 to-violet-700 p-4 flex flex-col items-center justify-center relative overflow-hidden`}
//                     >
//                       <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                       <div className="text-center text-white">
//                         <h3 className="font-semibold text-sm mb-0.5">
//                           {resume.title}
//                         </h3>
//                         <p className="text-xs text-white/80">{resume.role}</p>
//                       </div>
//                     </Link>

//                     <div
//                       className={`px-3 py-2 text-white flex justify-between items-center bg-linear-to-br from-indigo-500 to-blue-700`}
//                     >
//                       <div className="flex flex-col">
//                         <span className="text-xs text-white/80">
//                           Last updated
//                         </span>
//                         <span className="text-xs font-medium">
//                           {new Date(resume.date).toLocaleDateString()}
//                         </span>
//                       </div>
//                       <button
//                         onClick={(e) => {
//                           e.preventDefault();
//                           handleMenuToggle(resume?.id, "resume");
//                         }}
//                         className="text-white rounded-full shadow-2xl bg-linear-to-br from-indigo-500 to-blue-600 cursor-pointer h-8 w-8 hover:text-gray-200 transition-colors p-0.5 hover:scale-105"
//                       >
//                         <span className="text-lg">⋮</span>
//                       </button>
//                     </div>
//                   </div>

//                   {showMenu === `resume-${resume.id}` && (
//                     <div className="absolute right-2 top-16 bg-white rounded-lg shadow-lg border border-gray-200 py-1.5 z-10 min-w-32 animate-in fade-in zoom-in duration-200">
//                       <button
//                         onClick={() => openEditModal(resume, "resume")}
//                         className="w-full cursor-pointer px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2 transition"
//                       >
//                         <span className="text-sm">✏️</span> Edit
//                       </button>
//                       <button
//                         onClick={() => handleDuplicate(resume, "resume")}
//                         className="w-full cursor-pointer  px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2 transition"
//                       >
//                         <span className="text-sm">📋</span> Duplicate
//                       </button>
//                       <button
//                         onClick={() => openDeleteModal(resume, "resume")}
//                         className="w-full cursor-pointer  px-3 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
//                       >
//                         <span className="text-sm">🗑️</span> Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </>
//           )}
//         </div>
//       </section>

//       {/* Cover Letter Section - Compact */}
//       <section>
//         <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
//           <div>
//             <h1 className="text-xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//               Cover Letters
//             </h1>
//             <p className="text-gray-500 text-xs mt-0.5">
//               Create personalized cover letters tailored to each job application
//             </p>
//           </div>
//           <button
//             onClick={() => openCreateModal("cover")}
//             className="bg-linear-to-r text-xs py-1.5 cursor-pointer from-green-600 to-emerald-600 text-white px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5"
//           >
//             <span className="text-base">+</span>
//             New Cover Letter
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           {coverLetters.length === 0 ? (
//             <EmptyState type="cover" />
//           ) : (
//             <>
//               {/* Add New Cover Letter Card - Compact */}
//               <button
//                 onClick={() => openCreateModal("cover")}
//                 className="group relative h-64 bg-white rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-300"
//               >
//                 <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
//                   <span className="text-2xl text-gray-400 group-hover:text-green-600 transition-colors duration-300">
//                     +
//                   </span>
//                 </div>
//                 <p className="mt-2 text-sm text-gray-500 group-hover:text-green-600 font-medium">
//                   Create Cover Letter
//                 </p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   AI-powered writing assistant
//                 </p>
//               </button>

//               {/* Cover Letter Cards - Compact */}
//               {coverLetters?.map((letter) => (
//                 <div key={letter.id} className="group relative">
//                   <div className="h-64 rounded-lg shadow-md flex flex-col justify-between overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
//                     <Link
//                       href={`/coverLetter/${letter.id}`}
//                       className={`flex-1 cursor-pointer bg-linear-to-br from-emerald-500 to-green-700 p-4 flex flex-col items-center justify-center relative overflow-hidden`}
//                     >
//                       <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                       <div className="text-5xl mb-2">{"✉️"}</div>
//                       <div className="text-center text-white">
//                         <h3 className="font-semibold text-sm mb-0.5">
//                           {letter.title}
//                         </h3>
//                         <p className="text-xs text-white/80">
//                           {letter.company}
//                         </p>
//                       </div>
//                     </Link>

//                     <div
//                       className={`px-3 py-2 text-white flex justify-between items-center bg-linear-to-r from-emerald-500 to-green-700`}
//                     >
//                       <div className="flex flex-col">
//                         <span className="text-xs text-white/80">Created</span>
//                         <span className="text-xs font-medium">
//                           {new Date(letter.date).toLocaleDateString()}
//                         </span>
//                       </div>
//                       <button
//                         onClick={() =>
//                           handleMenuToggle(String(letter.id), "cover")
//                         }
//                         className="text-white rounded-full shadow-2xl bg-linear-to-br from-emerald-500 to-green-600 cursor-pointer h-8 w-8 hover:text-gray-200 transition-colors p-0.5 hover:scale-105"
//                       >
//                         <span className="text-lg">⋮</span>
//                       </button>
//                     </div>
//                   </div>

//                   {showMenu === `cover-${letter.id}` && (
//                     <div className="absolute right-2 top-16 bg-white rounded-lg shadow-lg border border-gray-200 py-1.5 z-10 min-w-32 animate-in fade-in zoom-in duration-200">
//                       <button
//                         onClick={() => openEditModal(letter, "cover")}
//                         className="w-full cursor-pointer  px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2"
//                       >
//                         <span className="text-sm">✏️</span> Edit
//                       </button>
//                       <button
//                         onClick={() => handleDuplicate(letter, "cover")}
//                         className="w-full cursor-pointer  px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2"
//                       >
//                         <span className="text-sm">📋</span> Duplicate
//                       </button>
//                       <button
//                         onClick={() => openDeleteModal(letter, "cover")}
//                         className="w-full cursor-pointer px-3 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
//                       >
//                         <span className="text-sm">🗑️</span> Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </>
//           )}
//         </div>
//       </section>

//       {/* Modals */}
//       <CreateModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         onSave={handleCreate}
//         type={currentType}
//       />

//       <EditModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         onSave={handleEdit}
//         item={currentItem}
//         type={currentType}
//       />

//       <DeleteModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={handleDelete}
//         itemName={currentItem?.title || ""}
//       />
//     </main>
//   );
// }

"use client";

import { ResumeData } from "@/types/resume";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initialResumeData } from "./resume/page";
import { CoverLetterData } from "@/types/letter";
import { initialLetterData } from "./coverLetter/page";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  CreditCard,
  Plus,
  FileText,
  Mail,
  LayoutDashboard,
} from "lucide-react";

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
      <div className="bg-white rounded-xl max-w-md w-full shadow-xl">
        <div className="p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Create New {type === "resume" ? "Resume" : "Cover Letter"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                autoFocus
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 cursor-pointer px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 cursor-pointer px-3 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
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

const EditModal = ({
  isOpen,
  onClose,
  onSave,
  item,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, title: string, subtitle: string) => void;
  item: any;
  type: "resume" | "cover";
}) => {
  const [title, setTitle] = useState(item?.title || "");
  const [subtitle, setSubtitle] = useState(item?.role || item?.company || "");

  useEffect(() => {
    if (isOpen && item) {
      if (type === "resume") {
        setTitle(item.title || "");
        setSubtitle(item.role || "");
      } else {
        setTitle(item.title || "");
        setSubtitle(item.company || "");
      }
    }
  }, [isOpen, item, type]);

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
      <div className="bg-white rounded-xl max-w-md w-full shadow-xl">
        <div className="p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Edit {type === "resume" ? "Resume" : "Cover Letter"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {type === "resume" ? "Target Role" : "Company"}
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 cursor-pointer px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 cursor-pointer px-3 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
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
      <div className="bg-white rounded-xl max-w-md w-full shadow-xl">
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-xl">🗑️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Delete Item</h3>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to delete{" "}
            <strong className="text-gray-900">"{itemName}"</strong>? This action
            cannot be undone.
          </p>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 cursor-pointer px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 cursor-pointer px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper to get user-specific storage key
const getUserStorageKey = (userId: string, type: "resume" | "cover") => {
  return `user_${userId}_${type}_data`;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [coverLetters, setCoverLetters] = useState<CoverLetterData[]>([]);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentType, setCurrentType] = useState<"resume" | "cover">("resume");
  const [currentItem, setCurrentItem] = useState<any>(null);

  // Check authentication and load user data
  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) {
      router.push("/auth/login");
    } else if (!currentUser.onboardingCompleted) {
      router.push("/onboarding");
    } else {
      setUser(currentUser);
    }
  }, [router]);

  // Load user-specific data from localStorage
  useEffect(() => {
    if (!user) return;

    const loadUserData = () => {
      const resumeKey = getUserStorageKey(user.id, "resume");
      const letterKey = getUserStorageKey(user.id, "cover");

      const localResumeData = localStorage.getItem(resumeKey);
      const localLetterData = localStorage.getItem(letterKey);

      if (localResumeData) {
        try {
          const parsed = JSON.parse(localResumeData);
          if (Array.isArray(parsed)) {
            setResumes(parsed);
          } else {
            setResumes([]);
          }
        } catch (e) {
          console.error("Invalid JSON in localStorage");
          setResumes([]);
        }
      } else {
        setResumes([]);
      }

      if (localLetterData) {
        try {
          const parsed = JSON.parse(localLetterData);
          if (Array.isArray(parsed)) {
            setCoverLetters(parsed);
          } else {
            setCoverLetters([]);
          }
        } catch (e) {
          console.error("Invalid JSON in localStorage");
          setCoverLetters([]);
        }
      } else {
        setCoverLetters([]);
      }
    };

    loadUserData();
  }, [user]);

  const handleMenuToggle = (id: string, type: "resume" | "cover") => {
    setShowMenu(showMenu === `${type}-${id}` ? null : `${type}-${id}`);
  };

  const handleCreate = (title: string, subtitle: string) => {
    if (!user) return;

    if (currentType === "resume") {
      const resumeKey = getUserStorageKey(user.id, "resume");
      const existing = localStorage.getItem(resumeKey);
      let resumesArray: ResumeData[] = [];

      if (existing) {
        try {
          resumesArray = JSON.parse(existing);
        } catch {
          resumesArray = [];
        }
      }

      if (!Array.isArray(resumesArray)) {
        resumesArray = [];
      }

      const newResume = {
        ...initialResumeData,
        id: `${crypto.randomUUID()}-${Date.now()}`,
        title,
        role: subtitle,
        date: new Date().toISOString(),
      };

      const updated = [...resumesArray, newResume];
      localStorage.setItem(resumeKey, JSON.stringify(updated));
      setResumes(updated);
    } else {
      const letterKey = getUserStorageKey(user.id, "cover");
      const existing = localStorage.getItem(letterKey);
      let letterArray: CoverLetterData[] = [];

      if (existing) {
        try {
          letterArray = JSON.parse(existing);
        } catch {
          letterArray = [];
        }
      }

      if (!Array.isArray(letterArray)) {
        letterArray = [];
      }

      const newCoverLetter = {
        ...initialLetterData,
        id: `${crypto.randomUUID()}-${Date.now()}`,
        title: title,
        company: subtitle,
        date: new Date().toISOString(),
      };

      const updated = [...letterArray, newCoverLetter];
      localStorage.setItem(letterKey, JSON.stringify(updated));
      setCoverLetters(updated);
    }
  };

  const handleEdit = (id: string, title: string, subtitle: string) => {
    if (!user) return;

    if (currentType === "resume") {
      const updatedResumes = resumes.map((r) =>
        r.id === id
          ? {
              ...r,
              title: title,
              role: subtitle,
            }
          : r,
      );

      const resumeKey = getUserStorageKey(user.id, "resume");
      localStorage.setItem(resumeKey, JSON.stringify(updatedResumes));
      setResumes(updatedResumes);
    } else {
      const updatedCoverLetters = coverLetters.map((c) =>
        c.id === id
          ? {
              ...c,
              title: title,
              company: subtitle,
            }
          : c,
      );

      const letterKey = getUserStorageKey(user.id, "cover");
      localStorage.setItem(letterKey, JSON.stringify(updatedCoverLetters));
      setCoverLetters(updatedCoverLetters);
    }
  };

  const handleDelete = () => {
    if (!user || !currentItem) return;

    if (currentType === "resume") {
      const updated = resumes.filter((r) => r.id !== currentItem.id);
      const resumeKey = getUserStorageKey(user.id, "resume");
      localStorage.setItem(resumeKey, JSON.stringify(updated));
      setResumes(updated);
    } else {
      const updated = coverLetters.filter((c) => c.id !== currentItem.id);
      const letterKey = getUserStorageKey(user.id, "cover");
      localStorage.setItem(letterKey, JSON.stringify(updated));
      setCoverLetters(updated);
    }

    setIsDeleteModalOpen(false);
    setShowMenu(null);
    setCurrentItem(null);
  };

  const handleDuplicate = (item: any, type: "resume" | "cover") => {
    if (!user) return;

    if (type === "resume") {
      const newItem = {
        ...item,
        id: `${crypto.randomUUID()}-${Date.now()}`,
        title: `${item.title} (Copy)`,
        date: new Date().toISOString(),
      };
      const updated = [...resumes, newItem];
      const resumeKey = getUserStorageKey(user.id, "resume");
      localStorage.setItem(resumeKey, JSON.stringify(updated));
      setResumes(updated);
    } else {
      const newItem = {
        ...item,
        id: `${crypto.randomUUID()}-${Date.now()}`,
        title: `${item.title} (Copy)`,
        date: new Date().toISOString(),
      };
      const updated = [...coverLetters, newItem];
      const letterKey = getUserStorageKey(user.id, "cover");
      localStorage.setItem(letterKey, JSON.stringify(updated));
      setCoverLetters(updated);
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

  const handleLogout = () => {
    auth.logout();
    router.push("/login");
  };

  const EmptyState = ({ type }: { type: "resume" | "cover" }) => (
    <div className="col-span-full">
      <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
        <div className="text-5xl mb-2">{type === "resume" ? "📄" : "✉️"}</div>
        <h3 className="text-base font-semibold text-gray-700 mb-1">
          No {type === "resume" ? "resumes" : "cover letters"} yet
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          Create your first {type === "resume" ? "resume" : "cover letter"} to
          get started
        </p>
        <button
          onClick={() => openCreateModal(type)}
          className="bg-gradient-to-r text-xs cursor-pointer py-1 from-blue-600 to-purple-600 text-white px-4 rounded-lg font-medium hover:shadow-lg transition-all"
        >
          + Create {type === "resume" ? "Resume" : "Cover Letter"}
        </button>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 md:px-12 lg:px-20 py-6 space-y-8">
      {/* Header with User Info and Navigation */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your resumes and cover letters
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/pricing">
            <Button variant="outline" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Pricing
            </Button>
          </Link>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Total Resumes</p>
              <p className="text-2xl font-bold text-gray-800">
                {resumes?.length || 0}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Cover Letters</p>
              <p className="text-2xl font-bold text-gray-800">
                {coverLetters.length || 0}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Mail className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 shadow-sm text-white hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-xs">Total Documents</p>
              <p className="text-2xl font-bold">
                {(resumes?.length || 0) + (coverLetters.length || 0)}
              </p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <LayoutDashboard className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Resume Section */}
      <section>
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              My Resumes
            </h2>
            <p className="text-gray-500 text-xs mt-0.5">
              Create and manage AI-powered resumes for your job applications
            </p>
          </div>
          <button
            onClick={() => openCreateModal("resume")}
            className="bg-gradient-to-r text-xs py-1.5 cursor-pointer from-blue-600 to-purple-600 text-white px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <Plus className="h-3 w-3" />
            New Resume
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {resumes?.length === 0 ? (
            <EmptyState type="resume" />
          ) : (
            <>
              <button
                onClick={() => openCreateModal("resume")}
                className="group relative h-64 bg-white rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                  <Plus className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
                </div>
                <p className="mt-2 text-sm text-gray-500 group-hover:text-blue-600 font-medium">
                  Create New Resume
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Start from scratch or use AI
                </p>
              </button>

              {resumes?.map((resume: ResumeData) => (
                <div key={resume.id} className="group relative">
                  <div className="h-64 rounded-lg shadow-md flex flex-col justify-between overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                    <Link
                      href={`/dashboard/resume/${resume.id}`}
                      className="flex-1 bg-gradient-to-br from-purple-500 to-violet-700 p-4 flex flex-col items-center justify-center relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FileText className="h-12 w-12 text-white/80 mb-2" />
                      <div className="text-center text-white">
                        <h3 className="font-semibold text-sm mb-0.5">
                          {resume.title}
                        </h3>
                        <p className="text-xs text-white/80">{resume.role}</p>
                      </div>
                    </Link>

                    <div className="px-3 py-2 text-white flex justify-between items-center bg-gradient-to-br from-indigo-500 to-blue-700">
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
                          handleMenuToggle(resume?.id, "resume");
                        }}
                        className="text-white rounded-full shadow-2xl bg-gradient-to-br from-indigo-500 to-blue-600 cursor-pointer h-8 w-8 hover:text-gray-200 transition-colors p-0.5 hover:scale-105 flex items-center justify-center"
                      >
                        <span className="text-lg">⋮</span>
                      </button>
                    </div>
                  </div>

                  {showMenu === `resume-${resume.id}` && (
                    <div className="absolute right-2 top-16 bg-white rounded-lg shadow-lg border border-gray-200 py-1.5 z-10 min-w-32 animate-in fade-in zoom-in duration-200">
                      <button
                        onClick={() => openEditModal(resume, "resume")}
                        className="w-full cursor-pointer px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2 transition"
                      >
                        <span className="text-sm">✏️</span> Edit
                      </button>
                      <button
                        onClick={() => handleDuplicate(resume, "resume")}
                        className="w-full cursor-pointer px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2 transition"
                      >
                        <span className="text-sm">📋</span> Duplicate
                      </button>
                      <button
                        onClick={() => openDeleteModal(resume, "resume")}
                        className="w-full cursor-pointer px-3 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
                      >
                        <span className="text-sm">🗑️</span> Delete
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
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Cover Letters
            </h2>
            <p className="text-gray-500 text-xs mt-0.5">
              Create personalized cover letters tailored to each job application
            </p>
          </div>
          <button
            onClick={() => openCreateModal("cover")}
            className="bg-gradient-to-r text-xs py-1.5 cursor-pointer from-green-600 to-emerald-600 text-white px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <Plus className="h-3 w-3" />
            New Cover Letter
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {coverLetters.length === 0 ? (
            <EmptyState type="cover" />
          ) : (
            <>
              <button
                onClick={() => openCreateModal("cover")}
                className="group relative h-64 bg-white rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
                  <Plus className="h-6 w-6 text-gray-400 group-hover:text-green-600 transition-colors duration-300" />
                </div>
                <p className="mt-2 text-sm text-gray-500 group-hover:text-green-600 font-medium">
                  Create Cover Letter
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  AI-powered writing assistant
                </p>
              </button>

              {coverLetters?.map((letter) => (
                <div key={letter.id} className="group relative">
                  <div className="h-64 rounded-lg shadow-md flex flex-col justify-between overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                    <Link
                      href={`/dashboard/coverLetter/${letter.id}`}
                      className="flex-1 cursor-pointer bg-gradient-to-br from-emerald-500 to-green-700 p-4 flex flex-col items-center justify-center relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Mail className="h-12 w-12 text-white/80 mb-2" />
                      <div className="text-center text-white">
                        <h3 className="font-semibold text-sm mb-0.5">
                          {letter.title}
                        </h3>
                        <p className="text-xs text-white/80">
                          {letter.company}
                        </p>
                      </div>
                    </Link>

                    <div className="px-3 py-2 text-white flex justify-between items-center bg-gradient-to-r from-emerald-500 to-green-700">
                      <div className="flex flex-col">
                        <span className="text-xs text-white/80">Created</span>
                        <span className="text-xs font-medium">
                          {new Date(letter.date).toLocaleDateString()}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          handleMenuToggle(String(letter.id), "cover")
                        }
                        className="text-white rounded-full shadow-2xl bg-gradient-to-br from-emerald-500 to-green-600 cursor-pointer h-8 w-8 hover:text-gray-200 transition-colors p-0.5 hover:scale-105 flex items-center justify-center"
                      >
                        <span className="text-lg">⋮</span>
                      </button>
                    </div>
                  </div>

                  {showMenu === `cover-${letter.id}` && (
                    <div className="absolute right-2 top-16 bg-white rounded-lg shadow-lg border border-gray-200 py-1.5 z-10 min-w-32 animate-in fade-in zoom-in duration-200">
                      <button
                        onClick={() => openEditModal(letter, "cover")}
                        className="w-full cursor-pointer px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2"
                      >
                        <span className="text-sm">✏️</span> Edit
                      </button>
                      <button
                        onClick={() => handleDuplicate(letter, "cover")}
                        className="w-full cursor-pointer px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2"
                      >
                        <span className="text-sm">📋</span> Duplicate
                      </button>
                      <button
                        onClick={() => openDeleteModal(letter, "cover")}
                        className="w-full cursor-pointer px-3 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <span className="text-sm">🗑️</span> Delete
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
