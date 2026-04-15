// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import Link from "next/link";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Badge } from "@/components/ui/badge";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import { Checkbox } from "@/components/ui/checkbox";
// // import {
// //   Search,
// //   MapPin,
// //   Briefcase,
// //   Clock,
// //   DollarSign,
// //   Building,
// //   Filter,
// //   Heart,
// //   ExternalLink,
// //   ChevronRight,
// // } from "lucide-react";

// // export default function JobsPage() {
// //   const router = useRouter();
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [location, setLocation] = useState("");
// //   const [jobType, setJobType] = useState("all");
// //   const [experienceLevel, setExperienceLevel] = useState("all");
// //   const [savedJobs, setSavedJobs] = useState<string[]>([]);

// //   const jobs = [
// //     {
// //       id: "1",
// //       title: "Senior Frontend Developer",
// //       company: "TechCorp Solutions",
// //       location: "San Francisco, CA",
// //       type: "Full-time",
// //       experience: "Senior",
// //       salary: "$120k - $180k",
// //       posted: "2 days ago",
// //       description: "We're looking for an experienced frontend developer to join our growing team...",
// //       skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
// //       logo: "🏢",
// //     },
// //     {
// //       id: "2",
// //       title: "Full Stack Engineer",
// //       company: "StartupHub",
// //       location: "Remote",
// //       type: "Full-time",
// //       experience: "Mid-level",
// //       salary: "$90k - $130k",
// //       posted: "1 day ago",
// //       description: "Join our fast-paced startup and work on cutting-edge web applications...",
// //       skills: ["Node.js", "React", "PostgreSQL", "AWS"],
// //       logo: "🚀",
// //     },
// //     {
// //       id: "3",
// //       title: "UI/UX Designer",
// //       company: "Design Studio Pro",
// //       location: "New York, NY",
// //       type: "Contract",
// //       experience: "Mid-level",
// //       salary: "$70k - $100k",
// //       posted: "3 days ago",
// //       description: "Creative designer needed for innovative digital products and experiences...",
// //       skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
// //       logo: "🎨",
// //     },
// //     {
// //       id: "4",
// //       title: "Product Manager",
// //       company: "Innovation Labs",
// //       location: "Austin, TX",
// //       type: "Full-time",
// //       experience: "Senior",
// //       salary: "$130k - $170k",
// //       posted: "1 week ago",
// //       description: "Lead product strategy and development for our flagship products...",
// //       skills: ["Product Strategy", "Agile", "Data Analysis", "Leadership"],
// //       logo: "💡",
// //     },
// //     {
// //       id: "5",
// //       title: "Backend Developer",
// //       company: "CloudTech Inc",
// //       location: "Seattle, WA",
// //       type: "Full-time",
// //       experience: "Mid-level",
// //       salary: "$100k - $140k",
// //       posted: "4 days ago",
// //       description: "Build scalable backend systems and APIs for our cloud platform...",
// //       skills: ["Python", "Django", "Docker", "Kubernetes"],
// //       logo: "☁️",
// //     },
// //     {
// //       id: "6",
// //       title: "Marketing Manager",
// //       company: "Growth Agency",
// //       location: "Los Angeles, CA",
// //       type: "Full-time",
// //       experience: "Mid-level",
// //       salary: "$80k - $110k",
// //       posted: "5 days ago",
// //       description: "Drive marketing campaigns and growth strategies for our clients...",
// //       skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
// //       logo: "📈",
// //     },
// //   ];

// //   const filteredJobs = jobs.filter(job => {
// //     const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //                          job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
// //     const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
// //     const matchesType = jobType === "all" || job.type.toLowerCase() === jobType.toLowerCase();
// //     const matchesExperience = experienceLevel === "all" || job.experience.toLowerCase() === experienceLevel.toLowerCase();

// //     return matchesSearch && matchesLocation && matchesType && matchesExperience;
// //   });

// //   const toggleSaveJob = (jobId: string) => {
// //     setSavedJobs(prev =>
// //       prev.includes(jobId)
// //         ? prev.filter(id => id !== jobId)
// //         : [...prev, jobId]
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Navigation */}
// //       <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-16">
// //             <div className="flex items-center gap-8">
// //               <Link href="/" className="flex items-center gap-2">
// //                 <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
// //                   <Briefcase className="h-4 w-4 text-white" />
// //                 </div>
// //                 <span className="font-bold text-xl">JobFinder</span>
// //               </Link>
// //               <div className="hidden md:flex gap-6">
// //                 <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition">
// //                   Dashboard
// //                 </Link>
// //                 <Link href="/jobs" className="text-blue-600 font-semibold">
// //                   Jobs
// //                 </Link>
// //                 <Link href="/applications" className="text-gray-600 hover:text-blue-600 transition">
// //                   Applications
// //                 </Link>
// //               </div>
// //             </div>
// //             <div className="flex gap-3">
// //               <Link href="/dashboard">
// //                 <Button variant="outline">Dashboard</Button>
// //               </Link>
// //               <Button>Post a Job</Button>
// //             </div>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Hero Section */}
// //       <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center">
// //             <h1 className="text-4xl font-bold text-white mb-4">
// //               Find Your Dream Job
// //             </h1>
// //             <p className="text-blue-100 text-lg mb-8">
// //               Discover opportunities that match your skills and aspirations
// //             </p>

// //             {/* Search Bar */}
// //             <div className="max-w-3xl mx-auto">
// //               <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2">
// //                 <div className="flex-1 relative">
// //                   <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //                   <Input
// //                     placeholder="Job title, company, or skills..."
// //                     value={searchQuery}
// //                     onChange={(e) => setSearchQuery(e.target.value)}
// //                     className="pl-10 border-0 focus:ring-0"
// //                   />
// //                 </div>
// //                 <div className="relative">
// //                   <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //                   <Input
// //                     placeholder="Location..."
// //                     value={location}
// //                     onChange={(e) => setLocation(e.target.value)}
// //                     className="pl-10 border-0 focus:ring-0 w-40"
// //                   />
// //                 </div>
// //                 <Button className="bg-blue-600 hover:bg-blue-700">
// //                   Search Jobs
// //                 </Button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Filters Section */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
// //           <div className="flex items-center gap-2 mb-4">
// //             <Filter className="h-4 w-4 text-gray-600" />
// //             <span className="font-semibold text-gray-900">Filters</span>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //             <div>
// //               <label className="text-sm font-medium text-gray-700 mb-2 block">Job Type</label>
// //               <Select value={jobType} onValueChange={setJobType}>
// //                 <SelectTrigger>
// //                   <SelectValue />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="all">All Types</SelectItem>
// //                   <SelectItem value="full-time">Full-time</SelectItem>
// //                   <SelectItem value="part-time">Part-time</SelectItem>
// //                   <SelectItem value="contract">Contract</SelectItem>
// //                   <SelectItem value="internship">Internship</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //             </div>

// //             <div>
// //               <label className="text-sm font-medium text-gray-700 mb-2 block">Experience Level</label>
// //               <Select value={experienceLevel} onValueChange={setExperienceLevel}>
// //                 <SelectTrigger>
// //                   <SelectValue />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="all">All Levels</SelectItem>
// //                   <SelectItem value="entry-level">Entry Level</SelectItem>
// //                   <SelectItem value="mid-level">Mid Level</SelectItem>
// //                   <SelectItem value="senior">Senior</SelectItem>
// //                   <SelectItem value="executive">Executive</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //             </div>

// //             <div className="md:col-span-2 flex items-end">
// //               <Button variant="outline" className="w-full">
// //                 Clear Filters
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Jobs List */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
// //         <div className="flex justify-between items-center mb-6">
// //           <h2 className="text-2xl font-bold text-gray-900">
// //             {filteredJobs.length} Jobs Found
// //           </h2>
// //           <Select defaultValue="recent">
// //             <SelectTrigger className="w-48">
// //               <SelectValue />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="recent">Most Recent</SelectItem>
// //               <SelectItem value="relevant">Most Relevant</SelectItem>
// //               <SelectItem value="salary-high">Highest Salary</SelectItem>
// //               <SelectItem value="salary-low">Lowest Salary</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>

// //         <div className="space-y-4">
// //           {filteredJobs.map((job) => (
// //             <Card key={job.id} className="hover:shadow-md transition-shadow">
// //               <CardContent className="p-6">
// //                 <div className="flex justify-between items-start">
// //                   <div className="flex gap-4">
// //                     <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
// //                       {job.logo}
// //                     </div>
// //                     <div className="flex-1">
// //                       <div className="flex items-start justify-between">
// //                         <div>
// //                           <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
// //                             {job.title}
// //                           </h3>
// //                           <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
// //                             <span className="font-medium">{job.company}</span>
// //                             <span className="flex items-center gap-1">
// //                               <MapPin className="h-3 w-3" />
// //                               {job.location}
// //                             </span>
// //                             <span className="flex items-center gap-1">
// //                               <Briefcase className="h-3 w-3" />
// //                               {job.type}
// //                             </span>
// //                             <span className="flex items-center gap-1">
// //                               <DollarSign className="h-3 w-3" />
// //                               {job.salary}
// //                             </span>
// //                           </div>
// //                           <p className="text-gray-600 mt-2 line-clamp-2">
// //                             {job.description}
// //                           </p>
// //                           <div className="flex flex-wrap gap-2 mt-3">
// //                             {job.skills.map((skill, idx) => (
// //                               <Badge key={idx} variant="secondary" className="text-xs">
// //                                 {skill}
// //                               </Badge>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="flex flex-col items-end gap-2 ml-4">
// //                     <span className="text-xs text-gray-500 flex items-center gap-1">
// //                       <Clock className="h-3 w-3" />
// //                       {job.posted}
// //                     </span>
// //                     <div className="flex gap-2">
// //                       <Button
// //                         variant="outline"
// //                         size="sm"
// //                         onClick={() => toggleSaveJob(job.id)}
// //                         className={savedJobs.includes(job.id) ? "text-blue-600 border-blue-600" : ""}
// //                       >
// //                         <Heart className={`h-4 w-4 ${savedJobs.includes(job.id) ? "fill-current" : ""}`} />
// //                       </Button>
// //                       <Button size="sm">
// //                         Apply Now
// //                         <ChevronRight className="h-4 w-4 ml-1" />
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           ))}
// //         </div>

// //         {filteredJobs.length === 0 && (
// //           <div className="text-center py-12">
// //             <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// //             <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
// //             <p className="text-gray-600">Try adjusting your search criteria or filters</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { Job } from "@/types";
// import { demoJobs } from "@/lib/jobsData";
// import { auth } from "@/lib/auth";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   DollarSign,
//   Clock,
//   Filter,
//   Star,
//   Bookmark,
//   ChevronRight,
//   Building,
//   Users,
//   Award,
//   TrendingUp,
// } from "lucide-react";

// export default function JobsPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<any>(null);
//   const [jobs, setJobs] = useState<Job[]>(demoJobs);
//   const [filteredJobs, setFilteredJobs] = useState<Job[]>(demoJobs);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedType, setSelectedType] = useState("all");
//   const [showFilters, setShowFilters] = useState(false);
//   const [savedJobs, setSavedJobs] = useState<string[]>([]);

//   useEffect(() => {
//     const currentUser = auth.getCurrentUser();
//     if (!currentUser) {
//       router.push("/login");
//     } else {
//       setUser(currentUser);
//     }

//     const saved = localStorage.getItem("saved_jobs");
//     if (saved) {
//       setSavedJobs(JSON.parse(saved));
//     }
//   }, [router]);

//   useEffect(() => {
//     let filtered = jobs;

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (job) =>
//           job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.skills.some((skill) =>
//             skill.toLowerCase().includes(searchTerm.toLowerCase()),
//           ),
//       );
//     }

//     if (selectedCategory !== "all") {
//       filtered = filtered.filter((job) => job.category === selectedCategory);
//     }

//     if (selectedType !== "all") {
//       filtered = filtered.filter((job) => job.type === selectedType);
//     }

//     setFilteredJobs(filtered);
//   }, [searchTerm, selectedCategory, selectedType, jobs]);

//   const categories = ["all", ...new Set(demoJobs.map((job) => job.category))];
//   const jobTypes = [
//     "all",
//     "Full-time",
//     "Part-time",
//     "Contract",
//     "Remote",
//     "Hybrid",
//   ];

//   const saveJob = (jobId: string) => {
//     let updated;
//     if (savedJobs.includes(jobId)) {
//       updated = savedJobs.filter((id) => id !== jobId);
//     } else {
//       updated = [...savedJobs, jobId];
//     }
//     setSavedJobs(updated);
//     localStorage.setItem("saved_jobs", JSON.stringify(updated));
//   };

//   const getJobIcon = (category: string) => {
//     switch (category) {
//       case "Engineering":
//         return <Code className="h-4 w-4" />;
//       case "Design":
//         return <Award className="h-4 w-4" />;
//       default:
//         return <Briefcase className="h-4 w-4" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <Link href="/dashboard" className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                 <Briefcase className="h-4 w-4 text-white" />
//               </div>
//               <h1 className="font-bold text-xl">Job Board</h1>
//             </Link>
//             <div className="flex gap-3">
//               <Link href="/auto-apply">
//                 <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all">
//                   Auto Apply
//                 </button>
//               </Link>
//               <Link href="/applications">
//                 <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-sm hover:bg-gray-50 transition-all">
//                   My Applications
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Hero Section */}
//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
//           <h1 className="text-3xl font-bold mb-2">Find Your Dream Job</h1>
//           <p className="text-blue-100 mb-6">
//             {filteredJobs.length} opportunities available
//           </p>

//           {/* Search Bar */}
//           <div className="relative max-w-2xl">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by title, company, or skills..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
//             />
//           </div>
//         </div>

//         {/* Filters Toggle */}
//         <div className="mb-6 flex justify-between items-center">
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
//           >
//             <Filter className="h-4 w-4" />
//             Filters
//             <ChevronRight
//               className={`h-4 w-4 transition-transform ${showFilters ? "rotate-90" : ""}`}
//             />
//           </button>
//           <p className="text-sm text-gray-500">
//             {filteredJobs.length} jobs found
//           </p>
//         </div>

//         {/* Filters Panel */}
//         {showFilters && (
//           <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Category
//                 </label>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 >
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Job Type
//                 </label>
//                 <select
//                   value={selectedType}
//                   onChange={(e) => setSelectedType(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 >
//                   {jobTypes.map((type) => (
//                     <option key={type} value={type}>
//                       {type}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Jobs Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredJobs.map((job) => (
//             <div
//               key={job.id}
//               className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all group"
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
//                       {job.logo}
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
//                         {job.title}
//                       </h3>
//                       <p className="text-sm text-gray-500">{job.company}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => saveJob(job.id)}
//                     className={`p-2 rounded-lg transition ${savedJobs.includes(job.id) ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"}`}
//                   >
//                     <Star
//                       className="h-5 w-5"
//                       fill={
//                         savedJobs.includes(job.id) ? "currentColor" : "none"
//                       }
//                     />
//                   </button>
//                 </div>

//                 <div className="space-y-2 mb-4">
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <MapPin className="h-4 w-4" />
//                     {job.location}
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <DollarSign className="h-4 w-4" />
//                     {job.salary}
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Briefcase className="h-4 w-4" />
//                     {job.type}
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {job.skills.slice(0, 3).map((skill, idx) => (
//                     <span
//                       key={idx}
//                       className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                   {job.skills.length > 3 && (
//                     <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
//                       +{job.skills.length - 3}
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                   <div className="flex items-center gap-1 text-xs text-gray-500">
//                     <Clock className="h-3 w-3" />
//                     Posted {new Date(job.postedDate).toLocaleDateString()}
//                   </div>
//                   <Link href={`/jobs/${job.id}`}>
//                     <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
//                       Apply Now
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Stats Section */}
//         <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
//             <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
//             <p className="text-2xl font-bold">{demoJobs.length}</p>
//             <p className="text-xs text-gray-500">Total Jobs</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
//             <Building className="h-6 w-6 text-purple-600 mx-auto mb-2" />
//             <p className="text-2xl font-bold">
//               {new Set(demoJobs.map((j) => j.company)).size}
//             </p>
//             <p className="text-xs text-gray-500">Companies</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
//             <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
//             <p className="text-2xl font-bold">
//               {demoJobs.filter((j) => j.remote).length}
//             </p>
//             <p className="text-xs text-gray-500">Remote Jobs</p>
//           </div>
//           <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
//             <Award className="h-6 w-6 text-orange-600 mx-auto mb-2" />
//             <p className="text-2xl font-bold">
//               {demoJobs.filter((j) => j.experienceLevel === "Senior").length}
//             </p>
//             <p className="text-xs text-gray-500">Senior Roles</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Missing import
// import { Code } from "lucide-react";

import React from "react";

export default function page() {
  return <div>page</div>;
}
