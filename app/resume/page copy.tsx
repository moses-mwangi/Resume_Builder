"use client";

import { useState } from "react";
import { ResumeBuilder } from "@/app/resume/ResumeBuilder";
import { ResumePreview } from "@/app/resume/ResumePreview";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  Edit3,
  Sparkles,
  FileText,
  Download,
  Brain,
  Wand2,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import RichTextEditor from "../test/TextEditor";

export default function Home() {
  const [activeTab, setActiveTab] = useState("edit");
  const [showWelcome, setShowWelcome] = useState(true);

  // Check if user has existing data
  const hasExistingData =
    typeof window !== "undefined" && localStorage.getItem("resumeData");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section with Welcome Message */}
        {showWelcome && !hasExistingData && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
              <div className="relative p-8 text-white">
                <div className="absolute right-0 top-0 opacity-10">
                  <Sparkles className="w-64 h-64" />
                </div>
                <div className="relative z-10">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Resume Builder Pro
                  </h1>
                  <p className="text-lg md:text-xl mb-6 text-blue-100 max-w-2xl">
                    Create stunning, ATS-friendly resumes with our intelligent
                    builder. Get real-time feedback, AI suggestions, and
                    professional templates.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      onClick={() => setShowWelcome(false)}
                      variant="secondary"
                      className="bg-white text-blue-600 hover:bg-blue-50"
                    >
                      Start Building
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                      onClick={() => {
                        setActiveTab("preview");
                        setShowWelcome(false);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Demo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Tabs Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ResumeBuilder />
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500"
        >
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              AI-Powered Analysis
            </span>
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-green-500" />
              ATS-Friendly Templates
            </span>
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4 text-purple-500" />
              PDF Export
            </span>
          </div>
          <p>
            © 2024 Resume Builder Pro. Create your professional resume with
            confidence.
          </p>
        </motion.footer>
      </div>

      {/* Add custom styles for animations */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
