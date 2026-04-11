import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import { cn } from "@/lib/utils"; // Adjust import based on your project
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderOpen,
  Award,
  Globe,
  FileText,
  ChevronRight,
  LayoutTemplate,
  Save,
  CheckCircle,
  ChevronLeft,
  Menu,
  LucideProps,
} from "lucide-react";
import { Progress } from "@/components/ui/progress"; // Adjust import
import { ScrollArea } from "@/components/ui/scroll-area"; // Adjust import

// Sidebar Navigation
const SidebarNav = ({
  activeSection,
  onSectionChange,
  completionPercentage,
  letterTemplates,
  navItems,
}: {
  activeSection: string;
  onSectionChange: (section: string) => void;
  completionPercentage: number;
  letterTemplates: {
    professional: {
      name: string;
      primaryColor: string;
      font: string;
      spacing: string;
      layout: string;
      preview: string;
    };
    modern: {
      name: string;
      primaryColor: string;
      font: string;
      spacing: string;
      layout: string;
      preview: string;
    };
    creative: {
      name: string;
      primaryColor: string;
      font: string;
      spacing: string;
      layout: string;
      preview: string;
    };
  };
  navItems: {
    id: string;
    name: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    color: string;
  }[];
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // const navItemss = [
  //   { id: "personal", name: "Personal Info", icon: User, color: "blue" },
  //   { id: "experience", name: "Experience", icon: Briefcase, color: "purple" },
  //   { id: "education", name: "Education", icon: GraduationCap, color: "green" },
  //   { id: "skills", name: "Skills", icon: Wrench, color: "orange" },
  //   { id: "projects", name: "Projects", icon: FolderOpen, color: "yellow" },
  //   { id: "certificates", name: "Certificates", icon: Award, color: "teal" },
  //   { id: "languages", name: "Languages", icon: Globe, color: "indigo" },
  // ];

  // // Templates
  // const letterTemplates = {
  //   professional: {
  //     name: "Professional",
  //     primaryColor: "#1e293b",
  //     font: "Inter",
  //     spacing: "comfortable",
  //     layout: "standard",
  //     preview: "bg-gradient-to-br from-gray-800 to-gray-900",
  //   },
  //   modern: {
  //     name: "Modern",
  //     primaryColor: "#3b82f6",
  //     font: "Poppins",
  //     spacing: "relaxed",
  //     layout: "minimal",
  //     preview: "bg-gradient-to-br from-blue-600 to-indigo-600",
  //   },
  //   creative: {
  //     name: "Creative",
  //     primaryColor: "#8b5cf6",
  //     font: "Plus Jakarta Sans",
  //     spacing: "relaxed",
  //     layout: "bold",
  //     preview: "bg-gradient-to-br from-purple-600 to-pink-600",
  //   },
  // };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Toggle Button - Fixed position when collapsed */}
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="fixed left-4 top-6 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      )}

      <div
        className={cn(
          "bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sticky top-6 h-[calc(100vh-3rem)] transition-all duration-300 ease-in-out overflow-auto no-scrollbar",
          isCollapsed ? "w-20" : "w-72",
        )}
      >
        <div className="flex flex-col h-full relative">
          {/* Collapse/Close Button */}
          <div className="">
            <button
              onClick={toggleSidebar}
              className="absolute cursor-pointer -right-3 top-2 z-50 p-1.5 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-all duration-200"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>

          {/* Header - Hide when collapsed */}
          {!isCollapsed && (
            <div className="mb-6 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <div className="flex items-center gap-2 text-white">
                <FileText className="w-5 h-5" />
                <span className="font-semibold">Resume Builder</span>
              </div>
            </div>
          )}

          {/* Icon-only header when collapsed */}
          {isCollapsed && (
            <div className="mb-6 p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
          )}

          {/* Progress - Hide when collapsed */}
          {!isCollapsed && (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Completion</span>
                <span className="font-semibold text-blue-600">
                  {completionPercentage}%
                </span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
          )}

          {/* Progress - Minimal version when collapsed */}
          {isCollapsed && (
            <div className="mb-6">
              <div className="relative">
                <Progress value={completionPercentage} className="h-1" />
                <div className="text-center mt-1">
                  <span className="text-xs font-semibold text-blue-600">
                    {completionPercentage}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <ScrollArea className="flex-1">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                const colorClasses = {
                  blue: isActive
                    ? "bg-blue-50 text-blue-600 border-blue-200"
                    : "hover:bg-gray-50",
                  purple: isActive
                    ? "bg-purple-50 text-purple-600 border-purple-200"
                    : "hover:bg-gray-50",
                  green: isActive
                    ? "bg-green-50 text-green-600 border-green-200"
                    : "hover:bg-gray-50",
                  orange: isActive
                    ? "bg-orange-50 text-orange-600 border-orange-200"
                    : "hover:bg-gray-50",
                  yellow: isActive
                    ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                    : "hover:bg-gray-50",
                  teal: isActive
                    ? "bg-teal-50 text-teal-600 border-teal-200"
                    : "hover:bg-gray-50",
                  indigo: isActive
                    ? "bg-indigo-50 text-indigo-600 border-indigo-200"
                    : "hover:bg-gray-50",
                };

                return (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={cn(
                      "w-full flex cursor-pointer items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 border border-transparent",
                      colorClasses[item.color as keyof typeof colorClasses],
                      isActive && "shadow-sm",
                      isCollapsed && "justify-center px-2",
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="text-sm font-medium flex-1 text-left">
                          {item.name}
                        </span>
                        {isActive && <ChevronRight className="w-3 h-3" />}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </ScrollArea>

          {/* Template Selector - Hide when collapsed */}
          {!isCollapsed && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <LayoutTemplate className="w-3 h-3" />
                Template
              </p>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(letterTemplates).map(([key, template]) => (
                  <button
                    key={key}
                    className="text-center group"
                    onClick={() => {}}
                  >
                    <div
                      className={`h-12 rounded-lg ${template.preview} mb-1 group-hover:scale-105 transition-transform`}
                    />
                    <span className="text-xs text-gray-600">
                      {template.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Template Selector - Minimal when collapsed */}
          {isCollapsed && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="space-y-2">
                {Object.entries(letterTemplates).map(([key, template]) => (
                  <button
                    key={key}
                    className="w-full group"
                    onClick={() => {}}
                    title={template.name}
                  >
                    <div
                      className={`h-10 w-10 mx-auto rounded-lg ${template.preview} group-hover:scale-105 transition-transform`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Save Status - Hide when collapsed */}
          {!isCollapsed && (
            <div className="mt-4 pt-4 pb-8 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Save className="w-3 h-3" />
                <span>Auto-saving</span>
                <CheckCircle className="w-3 h-3 text-green-500" />
              </div>
            </div>
          )}

          {/* Save Status - Minimal when collapsed */}
          {isCollapsed && (
            <div className="mt-4 pt-4 pb-8 border-t border-gray-200">
              <div className="flex justify-center">
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarNav;
