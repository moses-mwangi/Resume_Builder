// "use client";

// import { auth } from "@/lib/auth";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// export default function Header() {
//   const router = useRouter();
//   const [user, setUser] = useState<any>(null);

//   // Check authentication and load user data
//   useEffect(() => {
//     const currentUser = auth.getCurrentUser();
//     if (!currentUser) {
//       router.push("/auth/login");
//     } else if (!currentUser.onboardingCompleted) {
//       router.push("/onboarding");
//     } else {
//       setUser(currentUser);
//     }
//   }, [router]);

//   return (
//     <div>
//       <div className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
//         <Link
//           href={`/`}
//           className="flex items-center gap-2 group cursor-pointer"
//         >
//           <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
//             <span className="text-white font-bold text-sm">AI</span>
//           </div>
//           <h1 className="font-bold text-xl bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
//             AI Resume Builder
//           </h1>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
//           <Link
//             href="#demo"
//             className="relative text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
//           >
//             Demo
//             <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
//           </Link>

//           <Link
//             href="#preview"
//             className="relative text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
//           >
//             Preview
//             <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
//           </Link>

//           <Link
//             href="#features"
//             className="relative text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
//           >
//             Features
//             <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
//           </Link>
//           <div>
//             {user ? (
//               <div>
//                 <p>{user.name}</p>
//               </div>
//             ) : (
//               <a
//                 href="/auth/login"
//                 className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
//               >
//                 Get Started
//               </a>
//             )}
//           </div>
//         </nav>

//         {/* Mobile Menu Button */}
//         <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
//           <svg
//             className="w-6 h-6 text-gray-600"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Optional: Mobile Menu (hidden by default, can be toggled) */}
//       <div className="md:hidden hidden">
//         <nav className="flex flex-col gap-4 px-6 py-4 bg-white border-t border-gray-100">
//           <Link href="#demo" className="text-gray-600 hover:text-blue-600 py-2">
//             Demo
//           </Link>
//           <Link
//             href="#preview"
//             className="text-gray-600 hover:text-blue-600 py-2"
//           >
//             Preview
//           </Link>
//           <Link
//             href="#features"
//             className="text-gray-600 hover:text-blue-600 py-2"
//           >
//             Features
//           </Link>
//           <a
//             href="/dashboard"
//             className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-center"
//           >
//             Get Started
//           </a>
//         </nav>
//       </div>
//     </div>
//   );
// }

"use client";

import { auth } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import {
  User,
  Settings,
  LogOut,
  CreditCard,
  FileText,
  Mail,
  LayoutDashboard,
  ChevronDown,
  Sparkles,
  Briefcase,
  Award,
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Check authentication and load user data
  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    auth.logout();
    router.push("/auth/login");
    setIsProfileOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomGradient = (name: string) => {
    const gradients = [
      "from-blue-500 to-blue-600",
      "from-purple-500 to-purple-600",
      "from-pink-500 to-rose-500",
      "from-green-500 to-emerald-600",
      "from-orange-500 to-amber-600",
      "from-indigo-500 to-violet-600",
      "from-teal-500 to-cyan-600",
    ];
    const index = name.length % gradients.length;
    return gradients[index];
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="flex justify-between items-center px-4 md:px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href={user ? "/" : "/"}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <h1 className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            AI Resume Builder
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="relative text-gray-600 hover:text-blue-600 transition-colors duration-200 group flex items-center gap-1"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                Dashboard
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link
                href="/pricing"
                className="relative text-gray-600 hover:text-blue-600 transition-colors duration-200 group flex items-center gap-1"
              >
                <CreditCard className="h-3.5 w-3.5" />
                Pricing
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="#demo"
                className="relative text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
              >
                Demo
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link
                href="#features"
                className="relative text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
              >
                Features
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </>
          )}

          {/* Profile Section */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex cursor-pointer items-center gap-2 ml-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-r ${getRandomGradient(
                    user.name,
                  )} flex items-center justify-center text-white text-sm font-semibold shadow-md`}
                >
                  {getInitials(user.name)}
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.name.split(" ")[0]}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-200">
                  {/* Profile Header */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRandomGradient(
                          user.name,
                        )} flex items-center justify-center text-white text-lg font-semibold shadow-md`}
                      >
                        {getInitials(user.name)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {user.name}
                        </h3>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        {user.profile?.title && (
                          <p className="text-xs text-blue-600 mt-0.5 flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {user.profile.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-px bg-gray-200">
                    <div className="bg-white p-3 text-center">
                      <p className="text-lg font-bold text-gray-900">
                        {user.profile?.experience || "0"}
                      </p>
                      <p className="text-xs text-gray-500">Years Exp</p>
                    </div>
                    <div className="bg-white p-3 text-center">
                      <p className="text-lg font-bold text-gray-900">
                        {user.profile?.skills?.length || 0}
                      </p>
                      <p className="text-xs text-gray-500">Skills</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4 text-gray-500" />
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="h-4 w-4 text-gray-500" />
                      My Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="h-4 w-4 text-gray-500" />
                      Settings
                    </Link>
                    <Link
                      href="/pricing"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      Pricing & Billing
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-white border-t border-gray-200 py-4 px-4 animate-in slide-in-from-top duration-200"
        >
          <nav className="flex flex-col gap-3">
            {user ? (
              <>
                {/* Mobile Profile Card */}
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl mb-2">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-r ${getRandomGradient(
                      user.name,
                    )} flex items-center justify-center text-white text-sm font-semibold`}
                  >
                    {getInitials(user.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  My Profile
                </Link>
                <Link
                  href="/pricing"
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <CreditCard className="h-4 w-4" />
                  Pricing
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="#demo"
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Demo
                </Link>
                <Link
                  href="#features"
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-center font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
