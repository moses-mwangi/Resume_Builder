// components/resume/ResumeHeader.tsx
"use client";

import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Briefcase,
  Calendar,
} from "lucide-react";
import { PersonalInfo } from "@/types/resume";
import { Separator } from "../../../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type HeaderStyle =
  | "minimal"
  | "split"
  | "premium"
  | "side-by-side"
  | "creative"
  | "modern";

interface ResumeHeaderProps {
  data: PersonalInfo;
  style: HeaderStyle;
  primaryColor: string;
}

// Style 1: Modern Minimalist
const MinimalHeader = ({ data, primaryColor }: ResumeHeaderProps) => (
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold mb-[5px]" style={{ color: primaryColor }}>
      {data.fullName || "Your Name"}
    </h1>
    {data.title && (
      <p className="text-lg text-gray-600 mb-[5px]">{data.title}</p>
    )}
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
      {data.email && (
        <span className="flex items-center gap-1">
          <Mail className="w-3 h-3" />
          {data.email}
        </span>
      )}
      {data.phone && (
        <span className="flex items-center gap-1">
          <Phone className="w-3 h-3" />
          {data.phone}
        </span>
      )}
      {data.location && (
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {data.location}
        </span>
      )}
    </div>
    <div className="flex flex-wrap justify-center gap-4 mt-2">
      {data.website && (
        <a
          href={data.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <Globe className="w-3 h-3" />
          Portfolio
        </a>
      )}
      {data.linkedin && (
        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <Linkedin className="w-3 h-3" />
          LinkedIn
        </a>
      )}
      {data.github && (
        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <Github className="w-3 h-3" />
          GitHub
        </a>
      )}
    </div>
    <Separator className="my-6 h-[2px] bg-blue-600" />
  </div>
);

// Style 2: Split Layout
const SplitHeader = ({ data, primaryColor }: ResumeHeaderProps) => (
  <div
    className="flex flex-col md:flex-row gap-6 mb-8 pb-6 border-b"
    style={{ borderColor: `${primaryColor}30` }}
  >
    <div className="flex-1 text-center md:text-left">
      <h1 className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
        {data.fullName || "Your Name"}
      </h1>
      {data.title && <p className="text-lg text-gray-600 mb-2">{data.title}</p>}
      <div className="flex flex-col flex-wrap justify-center md:justify-start gap-y-3 text-sm text-gray-500">
        {data.email && (
          <div className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            <span>{data.email}</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* <div className="flex flex-col items-center"> */}
          {data.phone && (
            <div className="flex gap-1">
              <Phone className="w-3 h-3" />
              <span>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{data.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
    {/* <div className="flex md:flex-col justify-center gap-3">
      {data.website && (
        <a
          href={data.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 flex items-center gap-1 hover:text-blue-600 transition-colors"
        >
          <Globe className="w-4 h-4" /> Portfolio
        </a>
      )}
      {data.linkedin && (
        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-600 transition-colors"
        >
          <Linkedin className="w-4 h-4" /> moses-odhiambo
        </a>
      )}
      {data.github && (
        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-600 transition-colors"
        >
          <Github className="w-4 h-4" />
        </a>
      )}
    </div> */}
    <div className="flex md:flex-col justify-center gap-3">
      {data.website && (
        <a
          href={data.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 flex items-center gap-2 hover:text-blue-600 transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm">Portfolio</span>
        </a>
      )}
      {data.linkedin && (
        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 flex items-center gap-2 hover:text-blue-600 transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          <span className="text-sm">LinkedIn</span>
        </a>
      )}
      {data.github && (
        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 flex items-center gap-2 hover:text-blue-600 transition-colors"
        >
          <Github className="w-4 h-4" />
          <span className="text-sm">GitHub</span>
        </a>
      )}
    </div>
  </div>
);

// Style 3: Premium Two-Line
const PremiumHeader = ({ data, primaryColor }: ResumeHeaderProps) => (
  <div className="mb-8">
    <div className="text-center">
      <h1
        className="text-5xl font-bold mb-3 tracking-tight"
        style={{ color: primaryColor }}
      >
        {data.fullName || "Your Name"}
      </h1>
      <div
        className="w-20 h-1 mx-auto mb-4"
        style={{ backgroundColor: primaryColor }}
      />
      {data.title && <p className="text-md text-gray-500 mb-4">{data.title}</p>}
    </div>

    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
      {data.email && (
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full">
          <Mail className="w-3 h-3 text-gray-400" />
          <span className="text-gray-600">{data.email}</span>
        </div>
      )}
      {data.phone && (
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full">
          <Phone className="w-3 h-3 text-gray-400" />
          <span className="text-gray-600">{data.phone}</span>
        </div>
      )}
      {data.location && (
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full">
          <MapPin className="w-3 h-3 text-gray-400" />
          <span className="text-gray-600">{data.location}</span>
        </div>
      )}
    </div>

    <div className="flex justify-center gap-4 mt-4">
      {data.website && (
        <a
          href={data.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
        >
          <Globe className="w-3 h-3" />
          Website
        </a>
      )}
      {data.linkedin && (
        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
        >
          <Linkedin className="w-3 h-3" />
          LinkedIn
        </a>
      )}
      {data.github && (
        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
        >
          <Github className="w-3 h-3" />
          GitHub
        </a>
      )}
    </div>
  </div>
);

// Style 4: Side-by-Side Contact Row
const SideBySideHeader = ({ data, primaryColor }: ResumeHeaderProps) => (
  <div className="mb-8">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-3" style={{ color: primaryColor }}>
        {data.fullName || "Your Name"}
      </h1>
      {data.title && <p className="text-md text-gray-500 mb-4">{data.title}</p>}
    </div>

    <div
      className="border-t border-b py-3 my-3"
      style={{ borderColor: `${primaryColor}20` }}
    >
      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm">
        {data.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" style={{ color: primaryColor }} />
            <a
              href={`mailto:${data.email}`}
              className="text-gray-600 hover:text-blue-600"
            >
              {data.email}
            </a>
          </div>
        )}
        {data.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" style={{ color: primaryColor }} />
            <a href={`tel:${data.phone}`} className="text-gray-600">
              {data.phone}
            </a>
          </div>
        )}
        {data.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" style={{ color: primaryColor }} />
            <span className="text-gray-600">{data.location}</span>
          </div>
        )}
        {data.linkedin && (
          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4" style={{ color: primaryColor }} />
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              LinkedIn
            </a>
          </div>
        )}
        {data.github && (
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4" style={{ color: primaryColor }} />
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              GitHub
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Style 5: Creative with Tagline
const CreativeHeader = ({ data, primaryColor }: ResumeHeaderProps) => (
  <div className="relative mb-10">
    <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

    <div className="relative text-center bg-white px-6 py-4 inline-block w-full">
      <h1
        className="text-5xl font-bold mb-2 tracking-tight"
        style={{ color: primaryColor }}
      >
        {data.fullName || "Your Name"}
      </h1>
      {data.title && <p className="text-lg text-gray-500 mb-3">{data.title}</p>}
      {data.summary && (
        <p className="text-sm text-gray-500 max-w-2xl mx-auto italic">
          "{data.summary.split(".")[0]}."
        </p>
      )}
    </div>

    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {data.email && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
          <Mail className="w-3 h-3" />
          {data.email}
        </span>
      )}
      {data.phone && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
          <Phone className="w-3 h-3" />
          {data.phone}
        </span>
      )}
      {data.location && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
          <MapPin className="w-3 h-3" />
          {data.location}
        </span>
      )}
    </div>
  </div>
);

// Style 6: Modern with Icons
const ModernHeader = ({ data, primaryColor }: ResumeHeaderProps) => (
  <div className="mb-8 text-center">
    <div className="inline-block mb-4">
      <div
        className="w-24 h-24 mx-auto bg-gradient-to-br rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}80)`,
        }}
      >
        <span className="text-3xl font-bold text-white">
          {data.fullName?.charAt(0) || "?"}
        </span>
      </div>
    </div>

    <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
      {data.fullName || "Your Name"}
    </h1>

    {data.title && (
      <div className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm text-gray-600 mb-4">
        {data.title}
      </div>
    )}

    <div className="flex flex-wrap justify-center gap-4 text-sm">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {data.email && (
          <div className="flex items-center gap-1 text-gray-500">
            <Mail className="w-3 h-3" />
            <span>{data.email}</span>
          </div>
        )}
        {data.phone && (
          <div className="flex items-center gap-1 text-gray-500">
            <Phone className="w-3 h-3" />
            <span>{data.phone}</span>
          </div>
        )}
        {data.location && (
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-3 h-3" />
            <span>{data.location}</span>
          </div>
        )}
      </div>
    </div>

    <div className="flex justify-center gap-3 mt-3">
      {data.website && (
        <a
          href={data.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-600 transition-colors"
        >
          <Globe className="w-4 h-4" />
        </a>
      )}
      {data.linkedin && (
        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-600 transition-colors"
        >
          <Linkedin className="w-4 h-4" />
        </a>
      )}
      {data.github && (
        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-600 transition-colors"
        >
          <Github className="w-4 h-4" />
        </a>
      )}
    </div>
  </div>
);

// Main component that switches between styles
export function ResumeHeader({ data, style, primaryColor }: ResumeHeaderProps) {
  const headers = {
    minimal: MinimalHeader,
    split: SplitHeader,
    premium: PremiumHeader,
    "side-by-side": SideBySideHeader,
    creative: CreativeHeader,
    modern: ModernHeader,
  };

  const SelectedHeader = headers[style] || MinimalHeader;
  return (
    <SelectedHeader data={data} style={style} primaryColor={primaryColor} />
  );
}

// Header selector component for users to choose
export function HeaderStyleSelector({
  selectedStyle,
  onStyleChange,
}: {
  selectedStyle: HeaderStyle;
  onStyleChange: (style: HeaderStyle) => void;
}) {
  const styles: {
    id: HeaderStyle;
    name: string;
    description: string;
    preview: string;
  }[] = [
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean and simple, focuses on essential info",
      preview: "Name • Title • Contacts in line",
    },
    {
      id: "split",
      name: "Split Layout",
      description: "Info on left, social links on right",
      preview: "Name | Title | Contacts | Social",
    },
    {
      id: "premium",
      name: "Premium",
      description: "Elegant with separator line",
      preview: "Large Name with decorative line",
    },
    {
      id: "side-by-side",
      name: "Side by Side",
      description: "Professional with bordered contact row",
      preview: "Name centered, contacts in bordered row",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Perfect for creative roles with tagline",
      preview: "Name with quote and chip contacts",
    },
    {
      id: "modern",
      name: "Modern",
      description: "Includes initial avatar and clean layout",
      preview: "Avatar with name and social icons",
    },
  ];

  return (
    <div className=" cursor-pointer">
      <Select
        value={selectedStyle}
        onValueChange={(value) => onStyleChange(value as HeaderStyle)}
      >
        <SelectTrigger className="cursor-pointer w-full min-w-40">
          <SelectValue placeholder="Select header style" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Header Styles</SelectLabel>
            {styles.map((style) => (
              <SelectItem
                className=" cursor-pointer"
                key={style.id}
                value={style.id}
              >
                {style.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

// Header selector component for users to choose
// export function HeaderStyleSelector({
//   selectedStyle,
//   onStyleChange,
// }: {
//   selectedStyle: HeaderStyle;
//   onStyleChange: (style: HeaderStyle) => void;
// }) {
//   const styles: {
//     id: HeaderStyle;
//     name: string;
//     description: string;
//     preview: string;
//   }[] = [
//     {
//       id: "minimal",
//       name: "Minimal",
//       description: "Clean and simple, focuses on essential info",
//       preview: "Name • Title • Contacts in line",
//     },
//     {
//       id: "split",
//       name: "Split Layout",
//       description: "Info on left, social links on right",
//       preview: "Name | Title | Contacts | Social",
//     },
//     {
//       id: "premium",
//       name: "Premium",
//       description: "Elegant with separator line",
//       preview: "Large Name with decorative line",
//     },
//     {
//       id: "side-by-side",
//       name: "Side by Side",
//       description: "Professional with bordered contact row",
//       preview: "Name centered, contacts in bordered row",
//     },
//     {
//       id: "creative",
//       name: "Creative",
//       description: "Perfect for creative roles with tagline",
//       preview: "Name with quote and chip contacts",
//     },
//     {
//       id: "modern",
//       name: "Modern",
//       description: "Includes initial avatar and clean layout",
//       preview: "Avatar with name and social icons",
//     },
//   ];

//   return (
//     <div className="">
//       <Select
//         onValueChange={(value) => setSelectedTemplate(value as any)}
//         // onValueChange={(value) => setSelectedTemplate(value as any)}
//       >
//         <SelectTrigger className="w-full max-w-48">
//           <SelectValue placeholder="Select a fruit" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectLabel>Header Selection</SelectLabel>
//             {styles.map((template) => (
//               <SelectItem key={template.id} value={template.name}>
//                 {template.name}
//               </SelectItem>
//             ))}
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//       <div className="space-y-3">
//         <label className="text-sm font-medium">Header Style</label>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//           {styles.map((style) => (
//             <button
//               key={style.id}
//               onClick={() => onStyleChange(style.id)}
//               className={`p-3 text-left border rounded-lg transition-all ${
//                 selectedStyle === style.id
//                   ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
//                   : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
//               }`}
//             >
//               <div className="font-medium text-sm mb-1">{style.name}</div>
//               <div className="text-xs text-gray-500 mb-2">
//                 {style.description}
//               </div>
//               <div className="text-xs text-gray-400 italic">
//                 {style.preview}
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
