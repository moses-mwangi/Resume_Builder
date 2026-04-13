// // components/FullResumeEditor.tsx
// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import TextAlign from "@tiptap/extension-text-align";
// import Underline from "@tiptap/extension-underline";
// import Link from "@tiptap/extension-link";
// import { Color } from "@tiptap/extension-color";
// import { TextStyle } from "@tiptap/extension-text-style";
// import Highlight from "@tiptap/extension-highlight";
// import Image from "@tiptap/extension-image";
// import {
//   Bold,
//   Italic,
//   Strikethrough,
//   Underline as UnderlineIcon,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   Palette,
//   Highlighter,
//   List,
//   ListOrdered,
//   Undo,
//   Redo,
//   Heading1,
//   Heading2,
//   Heading3,
//   Type,
//   Image as ImageIcon,
//   Link as LinkIcon,
//   Unlink,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { ResumeData } from "@/types/resume";
// import { resumeTemplates } from "@/app/resume-builder/page";
// import { HeaderStyle, ResumeHeader } from "./ResumeHeader";
// import { Separator } from "@/components/ui/separator";

// interface FullResumeEditorProps {
//   resumeData: ResumeData;
//   onSave: (content: string) => void;
//   template: keyof typeof resumeTemplates;
//   headerStyle: HeaderStyle;
// }

// // Function to generate the complete resume HTML from the data
// const generateResumeHTML = (
//   data: ResumeData,
//   template: keyof typeof resumeTemplates,
//   headerStyle: HeaderStyle,
// ) => {
//   const style = resumeTemplates[template];

//   const renderExperience = () => {
//     if (!data.experience?.length) return "";
//     return `
//       <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0; color: ${style.primaryColor};">Work Experience</h2>
//       ${data.experience
//         .map(
//           (exp) => `
//         <div style="margin-bottom: 20px;">
//           <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
//             <div>
//               <h3 style="font-size: 18px; font-weight: 600; margin: 0;">${exp.position || "Position"}</h3>
//               <p style="font-weight: 500; margin: 5px 0;">${exp.company || "Company"}</p>
//             </div>
//             <p style="color: #666; margin: 0;">${exp.startDate || ""} - ${exp.current ? "Present" : exp.endDate || ""}</p>
//           </div>
//           <p style="margin-top: 10px;">${exp.description || ""}</p>
//           ${
//             exp.achievements?.length
//               ? `
//             <ul style="margin: 10px 0 0 20px;">
//               ${exp.achievements.map((achievement) => `<li>${achievement}</li>`).join("")}
//             </ul>
//           `
//               : ""
//           }
//         </div>
//       `,
//         )
//         .join("")}
//     `;
//   };

//   const renderEducation = () => {
//     if (!data.education?.length) return "";
//     return `
//       <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0; color: ${style.primaryColor};">Education</h2>
//       ${data.education
//         .map(
//           (edu) => `
//         <div style="margin-bottom: 20px;">
//           <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
//             <div>
//               <h3 style="font-size: 18px; font-weight: 600; margin: 0;">${edu.degree || "Degree"}</h3>
//               <p style="font-weight: 500; margin: 5px 0;">${edu.institution || "Institution"}</p>
//               ${edu.field ? `<p style="margin: 5px 0;">Field: ${edu.field}</p>` : ""}
//             </div>
//             <p style="color: #666; margin: 0;">${edu.startDate || ""} - ${edu.current ? "Present" : edu.endDate || ""}</p>
//           </div>
//           ${edu.gpa ? `<p style="margin-top: 10px;">GPA: ${edu.gpa}</p>` : ""}
//         </div>
//       `,
//         )
//         .join("")}
//     `;
//   };

//   const renderSkills = () => {
//     if (!data.skills?.length) return "";
//     return `
//       <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0; color: ${style.primaryColor};">Skills</h2>
//       <div style="display: flex; flex-wrap: wrap; gap: 10px;">
//         ${data.skills
//           .map(
//             (skill) => `
//           <span style="background: #f3f4f6; padding: 5px 12px; border-radius: 20px; font-size: 14px;">${skill.name}</span>
//         `,
//           )
//           .join("")}
//       </div>
//     `;
//   };

//   const renderProjects = () => {
//     if (!data.projects?.length) return "";
//     return `
//       <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0; color: ${style.primaryColor};">Projects</h2>
//       ${data.projects
//         .map(
//           (project) => `
//         <div style="margin-bottom: 20px;">
//           <h3 style="font-size: 18px; font-weight: 600; margin: 0;">${project.name || "Project Name"}</h3>
//           <p style="margin-top: 10px;">${project.description || ""}</p>
//           ${
//             project.technologies?.length
//               ? `
//             <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
//               ${project.technologies.map((tech) => `<span style="background: #e0e7ff; padding: 3px 10px; border-radius: 15px; font-size: 12px;">${tech}</span>`).join("")}
//             </div>
//           `
//               : ""
//           }
//         </div>
//       `,
//         )
//         .join("")}
//     `;
//   };

//   const renderCertificates = () => {
//     if (!data.certificates?.length) return "";
//     return `
//       <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0; color: ${style.primaryColor};">Certificates</h2>
//       <ul style="margin: 10px 0 0 20px;">
//         ${data.certificates
//           .map(
//             (cert) => `
//           <li style="margin-bottom: 5px;">
//             <strong>${cert.name || "Certificate"}</strong> - ${cert.issuer || "Issuer"} (${cert.date || ""})
//           </li>
//         `,
//           )
//           .join("")}
//       </ul>
//     `;
//   };

//   const renderLanguages = () => {
//     if (!data.languages?.length) return "";
//     return `
//       <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0; color: ${style.primaryColor};">Languages</h2>
//       <ul style="margin: 10px 0 0 20px;">
//         ${data.languages
//           .map(
//             (lang) => `
//           <li><strong>${lang.name || "Language"}</strong> - ${lang.proficiency || "Proficiency"}</li>
//         `,
//           )
//           .join("")}
//       </ul>
//     `;
//   };

//   // Generate header HTML
//   const getHeaderHTML = () => {
//     if (headerStyle === "side-by-side") {
//       return `
//         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
//           <div>
//             <h1 style="font-size: 32px; font-weight: 700; margin: 0; color: ${style.primaryColor};">${data.personalInfo.fullName || "Your Name"}</h1>
//             <p style="font-size: 18px; color: #666; margin: 5px 0 0 0;">${data.personalInfo.title || ""}</p>
//           </div>
//           <div style="text-align: right;">
//             ${data.personalInfo.email ? `<p style="margin: 5px 0;">📧 ${data.personalInfo.email}</p>` : ""}
//             ${data.personalInfo.phone ? `<p style="margin: 5px 0;">📞 ${data.personalInfo.phone}</p>` : ""}
//             ${data.personalInfo.location ? `<p style="margin: 5px 0;">📍 ${data.personalInfo.location}</p>` : ""}
//           </div>
//         </div>
//       `;
//     } else {
//       return `
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h1 style="font-size: 32px; font-weight: 700; margin: 0; color: ${style.primaryColor};">${data.personalInfo.fullName || "Your Name"}</h1>
//           <p style="font-size: 18px; color: #666; margin: 5px 0;">${data.personalInfo.title || ""}</p>
//           <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-top: 10px;">
//             ${data.personalInfo.email ? `<span>📧 ${data.personalInfo.email}</span>` : ""}
//             ${data.personalInfo.phone ? `<span>📞 ${data.personalInfo.phone}</span>` : ""}
//             ${data.personalInfo.location ? `<span>📍 ${data.personalInfo.location}</span>` : ""}
//           </div>
//         </div>
//       `;
//     }
//   };

//   return `
//     <div style="font-family: ${style.font}; max-width: 800px; margin: 0 auto; padding: 40px;">
//       ${getHeaderHTML()}

//       ${
//         data.personalInfo.summary
//           ? `
//         <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0; color: ${style.primaryColor};">Professional Summary</h2>
//         <div style="margin-bottom: 20px;">${data.personalInfo.summary}</div>
//       `
//           : ""
//       }

//       ${renderExperience()}
//       ${renderEducation()}
//       ${renderSkills()}
//       ${renderProjects()}
//       ${renderCertificates()}
//       ${renderLanguages()}
//     </div>
//   `;
// };

// export default function FullResumeEditor({
//   resumeData,
//   onSave,
//   template,
//   headerStyle,
// }: FullResumeEditorProps) {
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [showLinkInput, setShowLinkInput] = useState(false);
//   const [linkUrl, setLinkUrl] = useState("");
//   const [showFontSizeMenu, setShowFontSizeMenu] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   const initialHTML = generateResumeHTML(resumeData, template, headerStyle);

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         heading: { levels: [1, 2, 3] },
//         bulletList: {
//           keepMarks: true,
//           HTMLAttributes: { class: "list-disc ml-6 space-y-1" },
//         },
//         orderedList: {
//           keepMarks: true,
//           HTMLAttributes: { class: "list-decimal ml-6 space-y-1" },
//         },
//       }),
//       TextAlign.configure({ types: ["heading", "paragraph"] }),
//       Underline,
//       Link.configure({
//         openOnClick: false,
//         HTMLAttributes: {
//           class: "text-blue-600 underline hover:text-blue-800",
//         },
//       }),
//       Image.configure({
//         inline: true,
//         allowBase64: true,
//         HTMLAttributes: { class: "rounded-lg shadow-md max-w-full my-2" },
//       }),
//       TextStyle,
//       Color,
//       Highlight.configure({ multicolor: true }),
//     ],
//     content: initialHTML,
//     editorProps: {
//       attributes: {
//         class:
//           "prose max-w-none focus:outline-none min-h-[600px] p-6 rounded-lg bg-white border border-gray-200",
//       },
//     },
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       onSave(html);
//     },
//     immediatelyRender: false,
//   });

//   useEffect(() => {
//     if (editor && initialHTML) {
//       editor.commands.setContent(initialHTML);
//     }
//   }, [editor, resumeData, template, headerStyle]);

//   if (!editor) return null;

//   const ToolbarButton = ({
//     onClick,
//     isActive = false,
//     children,
//     title,
//   }: any) => (
//     <button
//       type="button"
//       onClick={onClick}
//       title={title}
//       className={`p-2 rounded-lg transition-all duration-200 ${
//         isActive
//           ? "bg-indigo-600 text-white shadow-md"
//           : "bg-gray-50 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//       }`}
//     >
//       {children}
//     </button>
//   );

//   const FONT_SIZES = [
//     { label: "Small", value: "12px" },
//     { label: "Normal", value: "16px" },
//     { label: "Large", value: "18px" },
//     { label: "Huge", value: "24px" },
//   ];

//   const COLORS = [
//     "#000000",
//     "#e11d48",
//     "#f97316",
//     "#eab308",
//     "#22c55e",
//     "#06b6d4",
//     "#3b82f6",
//     "#8b5cf6",
//     "#ec4899",
//     "#6b7280",
//   ];

//   return (
//     <div className="w-full">
//       {/* Toolbar */}
//       <div className="border border-gray-200 bg-gray-50 rounded-t-xl p-3 flex flex-wrap gap-1 items-center sticky top-0 z-20 shadow-sm">
//         <div className="flex gap-1 px-2 py-1 bg-white rounded-lg shadow-sm mr-2">
//           <ToolbarButton
//             onClick={() => editor.chain().focus().toggleBold().run()}
//             isActive={editor.isActive("bold")}
//           >
//             <Bold size={16} />
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() => editor.chain().focus().toggleItalic().run()}
//             isActive={editor.isActive("italic")}
//           >
//             <Italic size={16} />
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() => editor.chain().focus().toggleUnderline().run()}
//             isActive={editor.isActive("underline")}
//           >
//             <UnderlineIcon size={16} />
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() => editor.chain().focus().toggleStrike().run()}
//             isActive={editor.isActive("strike")}
//           >
//             <Strikethrough size={16} />
//           </ToolbarButton>
//         </div>

//         <div className="flex gap-1 px-2 py-1 bg-white rounded-lg shadow-sm mr-2">
//           <ToolbarButton
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level: 1 }).run()
//             }
//             isActive={editor.isActive("heading", { level: 1 })}
//           >
//             <Heading1 size={16} />
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level: 2 }).run()
//             }
//             isActive={editor.isActive("heading", { level: 2 })}
//           >
//             <Heading2 size={16} />
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level: 3 }).run()
//             }
//             isActive={editor.isActive("heading", { level: 3 })}
//           >
//             <Heading3 size={16} />
//           </ToolbarButton>
//         </div>

//         <div className="relative">
//           <button
//             onClick={() => setShowFontSizeMenu(!showFontSizeMenu)}
//             className="p-2 rounded-lg bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition flex items-center gap-1"
//           >
//             <Type size={16} />
//             <span className="text-xs">Size</span>
//           </button>
//           {showFontSizeMenu && (
//             <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-50 min-w-[120px]">
//               {FONT_SIZES.map((size) => (
//                 <button
//                   key={size.value}
//                   onClick={() => {
//                     editor
//                       .chain()
//                       .focus()
//                       .setMark("textStyle", { fontSize: size.value })
//                       .run();
//                     setShowFontSizeMenu(false);
//                   }}
//                   className="w-full text-left px-3 py-2 text-sm hover:bg-indigo-50 rounded transition"
//                 >
//                   {size.label}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="flex gap-1 px-2 py-1 bg-white rounded-lg shadow-sm mr-2">
//           <ToolbarButton
//             onClick={() => editor.chain().focus().setTextAlign("left").run()}
//             isActive={editor.isActive({ textAlign: "left" })}
//           >
//             <AlignLeft size={16} />
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() => editor.chain().focus().setTextAlign("center").run()}
//             isActive={editor.isActive({ textAlign: "center" })}
//           >
//             <AlignCenter size={16} />
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() => editor.chain().focus().setTextAlign("right").run()}
//             isActive={editor.isActive({ textAlign: "right" })}
//           >
//             <AlignRight size={16} />
//           </ToolbarButton>
//         </div>

//         <div className="flex gap-1 px-2 py-1 bg-white rounded-lg shadow-sm mr-2">
//           <ToolbarButton
//             onClick={() => editor.chain().focus().toggleBulletList().run()}
//             isActive={editor.isActive("bulletList")}
//           >
//             <List size={16} />
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() => editor.chain().focus().toggleOrderedList().run()}
//             isActive={editor.isActive("orderedList")}
//           >
//             <ListOrdered size={16} />
//           </ToolbarButton>
//         </div>

//         <div className="flex gap-1 px-2 py-1 bg-white rounded-lg shadow-sm mr-2">
//           <ToolbarButton onClick={() => setShowColorPicker(!showColorPicker)}>
//             <Palette size={16} />
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() => editor.chain().focus().toggleHighlight().run()}
//             isActive={editor.isActive("highlight")}
//           >
//             <Highlighter size={16} />
//           </ToolbarButton>
//         </div>

//         <div className="flex gap-1 px-2 py-1 bg-white rounded-lg shadow-sm">
//           <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
//             <Undo size={16} />
//           </ToolbarButton>
//           <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
//             <Redo size={16} />
//           </ToolbarButton>
//         </div>
//       </div>

//       {showColorPicker && (
//         <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-2xl shadow-2xl p-3 flex gap-2 border border-gray-200">
//           {COLORS.map((color) => (
//             <button
//               key={color}
//               onClick={() => {
//                 editor.chain().focus().setColor(color).run();
//                 setShowColorPicker(false);
//               }}
//               className="w-8 h-8 rounded-full shadow-md transition-transform hover:scale-110"
//               style={{ backgroundColor: color }}
//             />
//           ))}
//           <button
//             onClick={() => {
//               editor.chain().focus().unsetColor().run();
//               setShowColorPicker(false);
//             }}
//             className="px-3 py-1 text-xs bg-gray-100 rounded-full hover:bg-gray-200"
//           >
//             Reset
//           </button>
//         </div>
//       )}

//       <style jsx global>{`
//         .ProseMirror {
//           min-height: 600px;
//           outline: none;
//         }
//         .ProseMirror ul {
//           list-style-type: disc !important;
//           margin: 0.5rem 0 0.5rem 1.5rem !important;
//         }
//         .ProseMirror ol {
//           list-style-type: decimal !important;
//           margin: 0.5rem 0 0.5rem 1.5rem !important;
//         }
//         .ProseMirror li {
//           margin: 0.25rem 0 !important;
//         }
//         .ProseMirror h1 {
//           font-size: 2rem !important;
//           font-weight: 700 !important;
//           margin: 1.5rem 0 1rem 0 !important;
//         }
//         .ProseMirror h2 {
//           font-size: 1.5rem !important;
//           font-weight: 600 !important;
//           margin: 1.25rem 0 0.75rem 0 !important;
//         }
//         .ProseMirror h3 {
//           font-size: 1.25rem !important;
//           font-weight: 600 !important;
//           margin: 1rem 0 0.5rem 0 !important;
//         }
//         .ProseMirror p {
//           margin: 0.5rem 0 !important;
//         }
//         .ProseMirror img {
//           max-width: 100%;
//           height: auto;
//         }
//       `}</style>

//       <EditorContent editor={editor} />
//     </div>
//   );
// }

// components/FullResumeEditor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Highlighter,
  List,
  ListOrdered,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Type,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ResumeData } from "@/types/resume";
// import { resumeTemplates } from "@/app/resume-builder/page";
// import { HeaderStyle, ResumeHeader } from ".";
import { Separator } from "@/components/ui/separator";
import { HeaderStyle, ResumeHeader } from "../../ResumeHeader";
import { resumeTemplates } from "../../page";

// resumeTemplates

interface FullResumeEditorProps {
  resumeData: ResumeData;
  onSave: (content: string) => void;
  template: keyof typeof resumeTemplates;
  headerStyle: HeaderStyle;
}

// Function to generate the complete resume HTML from the data
const generateResumeHTML = (
  data: ResumeData,
  template: keyof typeof resumeTemplates,
  headerStyle: HeaderStyle,
) => {
  const style = resumeTemplates[template];

  const renderExperience = () => {
    if (!data.experience?.length) return "";
    return `
      <div class="resume-section">
        <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0; color: ${style.primaryColor}; border-bottom: 2px solid ${style.primaryColor}; padding-bottom: 5px;">
          Work Experience
        </h2>
        ${data.experience
          .map(
            (exp) => `
          <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
              <div>
                <h3 style="font-size: 18px; font-weight: 600; margin: 0;">${exp.position || "Position"}</h3>
                <p style="font-weight: 500; margin: 5px 0; color: #4b5563;">${exp.company || "Company"}</p>
                ${exp.location ? `<p style="margin: 5px 0; color: #6b7280; font-size: 14px;">📍 ${exp.location}</p>` : ""}
              </div>
              <p style="color: #6b7280; margin: 0; font-size: 14px;">${exp.startDate || ""} - ${exp.current ? "Present" : exp.endDate || ""}</p>
            </div>
            ${exp.description ? `<p style="margin-top: 10px; line-height: 1.5;">${exp.description}</p>` : ""}
            ${
              exp.achievements?.length
                ? `
              <ul style="margin: 10px 0 0 20px;">
                ${exp.achievements.map((achievement) => `<li style="margin: 5px 0;">${achievement}</li>`).join("")}
              </ul>
            `
                : ""
            }
          </div>
        `,
          )
          .join("")}
      </div>
    `;
  };

  const renderEducation = () => {
    if (!data.education?.length) return "";
    return `
      <div class="resume-section">
        <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0; color: ${style.primaryColor}; border-bottom: 2px solid ${style.primaryColor}; padding-bottom: 5px;">
          Education
        </h2>
        ${data.education
          .map(
            (edu) => `
          <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
              <div>
                <h3 style="font-size: 18px; font-weight: 600; margin: 0;">${edu.degree || "Degree"}</h3>
                <p style="font-weight: 500; margin: 5px 0; color: #4b5563;">${edu.institution || "Institution"}</p>
                ${edu.field ? `<p style="margin: 5px 0; color: #6b7280;">Field: ${edu.field}</p>` : ""}
              </div>
              <p style="color: #6b7280; margin: 0; font-size: 14px;">${edu.startDate || ""} - ${edu.current ? "Present" : edu.endDate || ""}</p>
            </div>
            ${edu.gpa ? `<p style="margin-top: 10px;">GPA: ${edu.gpa}</p>` : ""}
            ${
              edu.description?.length
                ? `
              <ul style="margin: 10px 0 0 20px;">
                ${edu.description.map((desc) => `<li>${desc}</li>`).join("")}
              </ul>
            `
                : ""
            }
          </div>
        `,
          )
          .join("")}
      </div>
    `;
  };

  const renderSkills = () => {
    if (!data.skills?.length) return "";
    return `
      <div class="resume-section">
        <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0; color: ${style.primaryColor}; border-bottom: 2px solid ${style.primaryColor}; padding-bottom: 5px;">
          Skills
        </h2>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          ${data.skills
            .map(
              (skill) => `
            <span style="background: #f3f4f6; padding: 5px 12px; border-radius: 20px; font-size: 14px; color: #374151;">
              ${skill.name} ${skill.level ? `(${skill.level}/5)` : ""}
            </span>
          `,
            )
            .join("")}
        </div>
      </div>
    `;
  };

  const renderProjects = () => {
    if (!data.projects?.length) return "";
    return `
      <div class="resume-section">
        <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0; color: ${style.primaryColor}; border-bottom: 2px solid ${style.primaryColor}; padding-bottom: 5px;">
          Projects
        </h2>
        ${data.projects
          .map(
            (project) => `
          <div style="margin-bottom: 20px;">
            <h3 style="font-size: 18px; font-weight: 600; margin: 0;">${project.name || "Project Name"}</h3>
            ${
              project.startDate || project.endDate
                ? `
              <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">
                ${project.startDate || ""} ${project.startDate && project.endDate ? "-" : ""} ${project.endDate || ""}
              </p>
            `
                : ""
            }
            <p style="margin-top: 10px; line-height: 1.5;">${project.description || ""}</p>
            ${
              project.technologies?.length
                ? `
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                ${project.technologies.map((tech) => `<span style="background: #e0e7ff; padding: 3px 10px; border-radius: 15px; font-size: 12px; color: #1e40af;">${tech}</span>`).join("")}
              </div>
            `
                : ""
            }
            ${
              project.link || project.github
                ? `
              <div style="margin-top: 10px;">
                ${project.link ? `<a href="${project.link}" style="color: ${style.primaryColor}; text-decoration: none; margin-right: 15px;" target="_blank">🔗 Live Demo</a>` : ""}
                ${project.github ? `<a href="${project.github}" style="color: ${style.primaryColor}; text-decoration: none;" target="_blank">💻 GitHub</a>` : ""}
              </div>
            `
                : ""
            }
          </div>
        `,
          )
          .join("")}
      </div>
    `;
  };

  const renderCertificates = () => {
    if (!data.certificates?.length) return "";
    return `
      <div class="resume-section">
        <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0; color: ${style.primaryColor}; border-bottom: 2px solid ${style.primaryColor}; padding-bottom: 5px;">
          Certificates
        </h2>
        <ul style="margin: 10px 0 0 20px;">
          ${data.certificates
            .map(
              (cert) => `
            <li style="margin-bottom: 10px;">
              <strong>${cert.name || "Certificate"}</strong><br/>
              ${cert.issuer ? `<span style="color: #4b5563;">${cert.issuer}</span>` : ""}
              ${cert.date ? `<span style="color: #6b7280; font-size: 12px;"> (${cert.date})</span>` : ""}
              ${cert.link ? `<br/><a href="${cert.link}" style="color: ${style.primaryColor}; font-size: 12px;" target="_blank">View Certificate →</a>` : ""}
            </li>
          `,
            )
            .join("")}
        </ul>
      </div>
    `;
  };

  const renderLanguages = () => {
    if (!data.languages?.length) return "";
    return `
      <div class="resume-section">
        <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0; color: ${style.primaryColor}; border-bottom: 2px solid ${style.primaryColor}; padding-bottom: 5px;">
          Languages
        </h2>
        <ul style="margin: 10px 0 0 20px;">
          ${data.languages
            .map(
              (lang) => `
            <li><strong>${lang.name || "Language"}</strong> - ${lang.proficiency || "Proficiency"}</li>
          `,
            )
            .join("")}
        </ul>
      </div>
    `;
  };

  // Generate header HTML based on style
  const getHeaderHTML = () => {
    const socialLinks = [];
    if (data.personalInfo.linkedin)
      socialLinks.push(
        `<a href="${data.personalInfo.linkedin}" style="color: ${style.primaryColor}; text-decoration: none;">LinkedIn</a>`,
      );
    if (data.personalInfo.github)
      socialLinks.push(
        `<a href="${data.personalInfo.github}" style="color: ${style.primaryColor}; text-decoration: none;">GitHub</a>`,
      );
    if (data.personalInfo.website)
      socialLinks.push(
        `<a href="${data.personalInfo.website}" style="color: ${style.primaryColor}; text-decoration: none;">Website</a>`,
      );

    if (headerStyle === "side-by-side") {
      return `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; flex-wrap: wrap; gap: 20px;">
          <div>
            <h1 style="font-size: 36px; font-weight: 700; margin: 0; color: ${style.primaryColor};">${data.personalInfo.fullName || "Your Name"}</h1>
            <p style="font-size: 18px; color: #6b7280; margin: 5px 0 0 0;">${data.personalInfo.title || ""}</p>
          </div>
          <div style="text-align: right;">
            ${data.personalInfo.email ? `<p style="margin: 5px 0;">📧 ${data.personalInfo.email}</p>` : ""}
            ${data.personalInfo.phone ? `<p style="margin: 5px 0;">📞 ${data.personalInfo.phone}</p>` : ""}
            ${data.personalInfo.location ? `<p style="margin: 5px 0;">📍 ${data.personalInfo.location}</p>` : ""}
            ${socialLinks.length ? `<div style="margin-top: 10px;">${socialLinks.join(" | ")}</div>` : ""}
          </div>
        </div>
      `;
    } else {
      return `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-size: 36px; font-weight: 700; margin: 0; color: ${style.primaryColor};">${data.personalInfo.fullName || "Your Name"}</h1>
          <p style="font-size: 18px; color: #6b7280; margin: 5px 0;">${data.personalInfo.title || ""}</p>
          <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-top: 10px;">
            ${data.personalInfo.email ? `<span>📧 ${data.personalInfo.email}</span>` : ""}
            ${data.personalInfo.phone ? `<span>📞 ${data.personalInfo.phone}</span>` : ""}
            ${data.personalInfo.location ? `<span>📍 ${data.personalInfo.location}</span>` : ""}
          </div>
          ${socialLinks.length ? `<div style="margin-top: 10px;">${socialLinks.join(" | ")}</div>` : ""}
        </div>
      `;
    }
  };

  return `
    <div style="font-family: ${style.font}; max-width: 800px; margin: 0 auto; padding: 40px; background: white;">
      ${getHeaderHTML()}
      
      ${
        data.personalInfo.summary
          ? `
        <div class="resume-section">
          <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0; color: ${style.primaryColor}; border-bottom: 2px solid ${style.primaryColor}; padding-bottom: 5px;">
            Professional Summary
          </h2>
          <div style="margin-bottom: 20px; line-height: 1.6;">${data.personalInfo.summary}</div>
        </div>
      `
          : ""
      }
      
      ${renderExperience()}
      ${renderEducation()}
      ${renderSkills()}
      ${renderProjects()}
      ${renderCertificates()}
      ${renderLanguages()}
    </div>
  `;
};

export default function FullResumeEditor({
  resumeData,
  onSave,
  template,
  headerStyle,
}: FullResumeEditorProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontSizeMenu, setShowFontSizeMenu] = useState(false);

  // Check if there's saved custom HTML content
  // const initialHTML =
  //   resumeData.customHtmlContent ||
  //   generateResumeHTML(resumeData, template, headerStyle);

  const initialHTML = generateResumeHTML(resumeData, template, headerStyle);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: {
          keepMarks: true,
          HTMLAttributes: { class: "list-disc ml-6 space-y-1" },
        },
        orderedList: {
          keepMarks: true,
          HTMLAttributes: { class: "list-decimal ml-6 space-y-1" },
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800",
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: { class: "rounded-lg shadow-md max-w-full my-2" },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content: initialHTML,
    editorProps: {
      attributes: {
        class:
          "prose max-w-none focus:outline-none min-h-[600px] p-6 rounded-lg bg-white border border-gray-200",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onSave(html);
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && initialHTML) {
      editor.commands.setContent(initialHTML);
    }
  }, [editor, resumeData, template, headerStyle]);

  if (!editor) return null;

  const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    title,
  }: any) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-indigo-600 text-white shadow-md"
          : "bg-gray-50 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
      }`}
    >
      {children}
    </button>
  );

  const FONT_SIZES = [
    { label: "Small", value: "12px" },
    { label: "Normal", value: "16px" },
    { label: "Large", value: "18px" },
    { label: "Huge", value: "24px" },
  ];

  const COLORS = [
    "#000000",
    "#e11d48",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#6b7280",
  ];

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="border border-gray-200 bg-gray-50 rounded-t-xl p-3 flex flex-wrap gap-1 items-center sticky top-0 z-20 shadow-sm">
        <div className="flex gap-1 px-2 py-1 bg-white rounded-lg shadow-sm mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold"
          >
            <Bold size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic"
          >
            <Italic size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Underline"
          >
            <UnderlineIcon size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            title="Strikethrough"
          >
            <Strikethrough size={16} />
          </ToolbarButton>
        </div>

        <div className="flex gap-1 px-2 py-1 bg-white rounded-lg shadow-sm mr-2">
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <Heading1 size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            <Heading3 size={16} />
          </ToolbarButton>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowFontSizeMenu(!showFontSizeMenu)}
            className="p-2 rounded-lg bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition flex items-center gap-1"
            title="Font Size"
          >
            <Type size={16} />
            <span className="text-xs">Size</span>
          </button>
          {showFontSizeMenu && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-50 min-w-[120px]">
              {FONT_SIZES.map((size) => (
                <button
                  key={size.value}
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .setMark("textStyle", { fontSize: size.value })
                      .run();
                    setShowFontSizeMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-indigo-50 rounded transition"
                >
                  {size.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-1 px-2 py-1 bg-white rounded-lg shadow-sm mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            title="Center"
          >
            <AlignCenter size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight size={16} />
          </ToolbarButton>
        </div>

        <div className="flex gap-1 px-2 py-1 bg-white rounded-lg shadow-sm mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </ToolbarButton>
        </div>

        <div className="flex gap-1 px-2 py-1 bg-white rounded-lg shadow-sm mr-2">
          <ToolbarButton
            onClick={() => setShowColorPicker(!showColorPicker)}
            title="Text Color"
          >
            <Palette size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            isActive={editor.isActive("highlight")}
            title="Highlight"
          >
            <Highlighter size={16} />
          </ToolbarButton>
        </div>

        <div className="flex gap-1 px-2 py-1 bg-white rounded-lg shadow-sm">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo"
          >
            <Undo size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo"
          >
            <Redo size={16} />
          </ToolbarButton>
        </div>
      </div>

      {showColorPicker && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-2xl shadow-2xl p-3 flex gap-2 border border-gray-200">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => {
                editor.chain().focus().setColor(color).run();
                setShowColorPicker(false);
              }}
              className="w-8 h-8 rounded-full shadow-md transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
            />
          ))}
          <button
            onClick={() => {
              editor.chain().focus().unsetColor().run();
              setShowColorPicker(false);
            }}
            className="px-3 py-1 text-xs bg-gray-100 rounded-full hover:bg-gray-200"
          >
            Reset
          </button>
        </div>
      )}

      <style jsx global>{`
        .ProseMirror {
          min-height: 600px;
          outline: none;
        }
        .ProseMirror ul {
          list-style-type: disc !important;
          margin: 0.5rem 0 0.5rem 1.5rem !important;
        }
        .ProseMirror ol {
          list-style-type: decimal !important;
          margin: 0.5rem 0 0.5rem 1.5rem !important;
        }
        .ProseMirror li {
          margin: 0.25rem 0 !important;
        }
        .ProseMirror h1 {
          font-size: 2rem !important;
          font-weight: 700 !important;
          margin: 1.5rem 0 1rem 0 !important;
        }
        .ProseMirror h2 {
          font-size: 1.5rem !important;
          font-weight: 600 !important;
          margin: 1.25rem 0 0.75rem 0 !important;
        }
        .ProseMirror h3 {
          font-size: 1.25rem !important;
          font-weight: 600 !important;
          margin: 1rem 0 0.5rem 0 !important;
        }
        .ProseMirror p {
          margin: 0.5rem 0 !important;
          line-height: 1.6;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
        }
        .ProseMirror a {
          color: #3b82f6;
          text-decoration: underline;
        }
        .resume-section {
          margin-bottom: 10px;
        }
      `}</style>

      <EditorContent editor={editor} />
    </div>
  );
}
