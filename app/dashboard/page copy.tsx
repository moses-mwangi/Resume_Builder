// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useState } from "react";
// import { initialResumeData } from "../resume/page";
// import { ResumeData } from "@/types/resume";
// import { Icon, Pen } from "lucide-react";

// const CreateModal = ({
//   isOpen,
//   onClose,
//   onSave,
//   type,
//   data,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (id: string, title: string, subtitle: string) => void;
//   type: "resume" | "cover";
//   data: ResumeData;
// }) => {
//   const [title, setTitle] = useState("");
//   const [subtitle, setSubtitle] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Moses Mwangi", title, subtitle);
//     if (title.trim()) {
//       // onSave(title, subtitle);
//       // setTitle("");
//       // setSubtitle("");
//       // onClose();
//       const existing = localStorage.getItem("resumeData");
//       if (type === "resume") {
//         let resumesArray = [];
//         if (existing) {
//           try {
//             resumesArray = JSON.parse(existing);
//           } catch (e) {
//             resumesArray = [];
//           }
//         }

//         // Ensure it's an array
//         if (!Array.isArray(resumesArray)) {
//           resumesArray = [];
//         }

//         // Push new data
//         // resumesArray.push(resumeData);
//         resumesArray.push({
//           ...data,
//           id: `${data.id}+${Date.now()}`,
//           role: subtitle,
//           title: title,
//         });

//         localStorage.setItem("resumeData", JSON.stringify(resumesArray));
//         // setSaveStatus("saved");
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
//                 className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 px-3 py-1.5 text-sm bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
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
//   item: ResumeData;
//   type: "resume" | "cover";
// }) => {
//   const [title, setTitle] = useState(item?.title || "");
//   const [subtitle, setSubtitle] = useState(item?.role || "");

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
//               className="text-gray-400 hover:text-gray-600"
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
//                 className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 px-3 py-1.5 text-sm bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
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
//               className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={onConfirm}
//               className="flex-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
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
//   // const [coverLetters, setCoverLetters] = useState<CoverLetterData[]>([])
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

//   const resData = localStorage.getItem("resumeData");
//   const resumess: ResumeData[] = JSON.parse(resData as string);

//   const [showMenu, setShowMenu] = useState<string | null>(null);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [currentType, setCurrentType] = useState<"resume" | "cover">("resume");
//   const [currentItem, setCurrentItem] = useState<any>(null);

//   const handleMenuToggle = (id: string, type: "resume" | "cover") => {
//     setShowMenu(showMenu === `${type}-${id}` ? null : `${type}-${id}`);
//   };

//   const handleCreate = (title: string, subtitle: string) => {
//     if (currentType === "resume") {
//       const newResume = {
//         id: Date.now(),
//         title: title,
//         role: subtitle,
//         color: `from-${["blue", "purple", "green", "orange", "pink"][Math.floor(Math.random() * 5)]}-500 to-${
//           ["blue", "purple", "green", "orange", "pink"][
//             Math.floor(Math.random() * 5)
//           ]
//         }-700`,
//         icon: ["📄", "💻", "🎯", "📊", "🎨"][Math.floor(Math.random() * 5)],
//         link: `/resume/${Date.now()}`,
//         date: new Date().toISOString().split("T")[0],
//       };
//       // setResumes([...resumes, newResume]);
//     } else {
//       const newCoverLetter = {
//         id: Date.now(),
//         title: title,
//         company: subtitle,
//         color: `from-${["emerald", "teal", "cyan", "indigo"][Math.floor(Math.random() * 4)]}-500 to-${
//           ["emerald", "teal", "cyan", "indigo"][Math.floor(Math.random() * 4)]
//         }-700`,
//         icon: "✉️",
//         date: new Date().toISOString().split("T")[0],
//       };
//       setCoverLetters([...coverLetters, newCoverLetter]);
//     }
//   };

//   const handleEdit = (id: string, title: string, subtitle: string) => {
//     if (currentType === "resume") {
//       const res = resumess.find((el) => el.id === id);
//       if (res) {
//         const updatedResumes = resumess.map((r) =>
//           r.id === id
//             ? {
//                 ...r,
//                 title: title,
//                 role: subtitle,
//               }
//             : r,
//         );

//         localStorage.setItem("resumeData", JSON.stringify(updatedResumes));
//       }
//     } else {
//       // const updatedCoverLetters = coverLetters.map((c) =>
//       //   c.id === id
//       //     ? {
//       //         ...c,
//       //         title: title,
//       //         company: subtitle,
//       //       }
//       //     : c,
//       // );
//       // setCoverLetters(updatedCoverLetters);
//       // localStorage.setItem("coverLetters", JSON.stringify(updatedCoverLetters));
//     }
//   };

//   const handleDelete = () => {
//     if (!currentItem) return;
//     if (currentType === "resume") {
//       const updated = resumess.filter((r) => r.id !== currentItem.id);
//       setResumes(updated);
//       localStorage.setItem("resumeData", JSON.stringify(updated));
//     } else {
//       const updated = coverLetters.filter((c) => c.id !== currentItem.id);
//       setCoverLetters(updated);
//       localStorage.setItem("coverLetters", JSON.stringify(updated));
//     }

//     setIsDeleteModalOpen(false);
//     setShowMenu(null);
//     setCurrentItem(null);
//   };

//   const handleDuplicate = (item: any, type: "resume" | "cover") => {
//     const newId = crypto.randomUUID(); // ✅ unique ID

//     const newItem = {
//       ...item,
//       id: `${newId}+${Date.now()}+${item.id}`,
//       title: `${item.title} (Copy)`,
//       date: new Date().toISOString().split("T")[0],
//       // link: type === "resume" ? `/resume/${newId}` : undefined,
//     };

//     if (type === "resume") {
//       const updated = [...resumess, newItem];
//       setResumes(updated);
//       localStorage.setItem("resumeData", JSON.stringify(updated));
//     } else {
//       const updated = [...coverLetters, newItem];
//       setCoverLetters(updated);
//       localStorage.setItem("coverLetters", JSON.stringify(updated));
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
//       <Button
//         onClick={() => {
//           console.log(resData);
//         }}
//       >
//         CLICK
//         {JSON.parse(resData as string)?.personalInfo?.fullName}
//       </Button>
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-xs">Total Resumes</p>
//               <p className="text-2xl font-bold text-gray-800">
//                 {resumess?.length}
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

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {/* {resumes.length === 0 ? ( */}
//           {resumess?.length === 0 ? (
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
//               {resumess?.map((resume: ResumeData) => (
//                 <div key={resume.id} className="group relative">
//                   <Link href={`resume/${resume.id}`}>
//                     <div className="h-64 rounded-lg shadow-md flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//                       <div
//                         // className={`flex-1 bg-linear-to-br ${resume.color} p-4 flex flex-col items-center justify-center relative overflow-hidden`}
//                         className={`flex-1 bg-linear-to-br bg-blue-600 p-4 flex flex-col items-center justify-center relative overflow-hidden`}
//                       >
//                         <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                         {/* <div className="text-5xl mb-2">{resume.icon}</div> */}
//                         <div className="text-5xl mb-2">
//                           <Pen />
//                         </div>
//                         <div className="text-center text-white">
//                           <h3 className="font-semibold text-sm mb-0.5">
//                             {resume.title}
//                           </h3>
//                           <p className="text-xs text-white/80">{resume.role}</p>
//                         </div>
//                       </div>

//                       <div
//                         // className={`px-3 py-2 text-white flex justify-between items-center bg-linear-to-r ${resume.color}`}
//                         className={`px-3 py-2 text-white flex justify-between items-center bg-linear-to-r`}
//                       >
//                         <div className="flex flex-col">
//                           <span className="text-xs text-white/80">
//                             Last updated
//                           </span>
//                           <span className="text-xs font-medium">
//                             {new Date(resume.date).toLocaleDateString()}
//                           </span>
//                         </div>
//                         <button
//                           onClick={(e) => {
//                             e.preventDefault();
//                             handleMenuToggle(resume?.id, "resume");
//                           }}
//                           className="text-white hover:text-gray-200 transition-colors p-0.5"
//                         >
//                           <span className="text-lg">⋮</span>
//                         </button>
//                       </div>
//                     </div>
//                   </Link>

//                   {showMenu === `resume-${resume.id}` && (
//                     <div className="absolute right-2 top-16 bg-white rounded-lg shadow-lg border border-gray-200 py-1.5 z-10 min-w-32 animate-in fade-in zoom-in duration-200">
//                       <button
//                         onClick={() => openEditModal(resume, "resume")}
//                         className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2 transition"
//                       >
//                         <span className="text-sm">✏️</span> Edit
//                       </button>
//                       <button
//                         onClick={() => handleDuplicate(resume, "resume")}
//                         className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2 transition"
//                       >
//                         <span className="text-sm">📋</span> Duplicate
//                       </button>
//                       <button
//                         onClick={() => openDeleteModal(resume, "resume")}
//                         className="w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
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

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
//               {coverLetters.map((letter) => (
//                 <div key={letter.id} className="group relative">
//                   <div className="h-64 rounded-lg shadow-md flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//                     <div
//                       className={`flex-1 bg-linear-to-br ${letter.color} p-4 flex flex-col items-center justify-center relative overflow-hidden`}
//                     >
//                       <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                       <div className="text-5xl mb-2">{letter.icon}</div>
//                       <div className="text-center text-white">
//                         <h3 className="font-semibold text-sm mb-0.5">
//                           {letter.title}
//                         </h3>
//                         <p className="text-xs text-white/80">
//                           {letter.company}
//                         </p>
//                       </div>
//                     </div>

//                     <div
//                       className={`px-3 py-2 text-white flex justify-between items-center bg-linear-to-r ${letter.color}`}
//                     >
//                       <div className="flex flex-col">
//                         <span className="text-xs text-white/80">Created</span>
//                         <span className="text-xs font-medium">
//                           {new Date(letter.date).toLocaleDateString()}
//                         </span>
//                       </div>
//                       <button
//                         // onClick={() => handleMenuToggle(letter.id, "cover")}
//                         className="text-white hover:text-gray-200 transition-colors p-0.5"
//                       >
//                         <span className="text-lg">⋮</span>
//                       </button>
//                     </div>
//                   </div>

//                   {showMenu === `cover-${letter.id}` && (
//                     <div className="absolute right-2 top-16 bg-white rounded-lg shadow-lg border border-gray-200 py-1.5 z-10 min-w-32 animate-in fade-in zoom-in duration-200">
//                       <button
//                         onClick={() => openEditModal(letter, "cover")}
//                         className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2"
//                       >
//                         <span className="text-sm">✏️</span> Edit
//                       </button>
//                       <button
//                         onClick={() => handleDuplicate(letter, "cover")}
//                         className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2"
//                       >
//                         <span className="text-sm">📋</span> Duplicate
//                       </button>
//                       <button
//                         onClick={() => openDeleteModal(letter, "cover")}
//                         className="w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
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
//         data={initialResumeData}
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
