import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div>
      <div className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <Link
          href={`/`}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <h1 className="font-bold text-xl bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            AI Resume Builder
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="#demo"
            className="relative text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
          >
            Demo
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>

          <Link
            href="#preview"
            className="relative text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
          >
            Preview
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>

          <Link
            href="#features"
            className="relative text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
          >
            Features
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>

          <a
            href="/dashboard"
            className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Get Started
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Optional: Mobile Menu (hidden by default, can be toggled) */}
      <div className="md:hidden hidden">
        <nav className="flex flex-col gap-4 px-6 py-4 bg-white border-t border-gray-100">
          <Link href="#demo" className="text-gray-600 hover:text-blue-600 py-2">
            Demo
          </Link>
          <Link
            href="#preview"
            className="text-gray-600 hover:text-blue-600 py-2"
          >
            Preview
          </Link>
          <Link
            href="#features"
            className="text-gray-600 hover:text-blue-600 py-2"
          >
            Features
          </Link>
          <a
            href="/dashboard"
            className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-center"
          >
            Get Started
          </a>
        </nav>
      </div>
    </div>
  );
}
