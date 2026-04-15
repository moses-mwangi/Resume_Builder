// components/ResumeEditor.tsx
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
import Placeholder from "@tiptap/extension-placeholder";
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
  Maximize2,
  Minimize2,
  Image as ImageIcon,
  Link as LinkIcon,
  Unlink,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ResumeData } from "@/types/resume";
import { Button } from "@/components/ui/button";

interface ResumeEditorProps {
  initialContent?: string;
  onSave: (content: string) => void;
  resumeData: ResumeData;
}

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

export default function ResumeEditor({
  initialContent,
  onSave,
  resumeData,
}: ResumeEditorProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showFontSizeMenu, setShowFontSizeMenu] = useState(false);

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
      Placeholder.configure({
        placeholder: "Start writing your resume content here...",
      }),
    ],
    content:
      initialContent ||
      `
      <h1 style="font-size: 32px; font-weight: 700; margin: 20px 0;">${resumeData.personalInfo.fullName || "Your Name"}</h1>
      <p style="margin: 10px 0;">${resumeData.personalInfo.email || "email@example.com"} | ${resumeData.personalInfo.phone || "Phone"} | ${resumeData.personalInfo.location || "Location"}</p>
      <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0;">Professional Summary</h2>
      <p style="margin: 10px 0;">Write your professional summary here...</p>
      <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0;">Work Experience</h2>
      <p style="margin: 10px 0;">Describe your work experience...</p>
      <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0;">Education</h2>
      <p style="margin: 10px 0;">List your education...</p>
      <h2 style="font-size: 24px; font-weight: 600; margin: 20px 0 10px 0;">Skills</h2>
      <ul style="margin: 10px 0 10px 20px;">
        <li>Skill 1</li>
        <li>Skill 2</li>
        <li>Skill 3</li>
      </ul>
    `,
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
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setShowLinkInput(false);
      setLinkUrl("");
    }
  };

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

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="border border-gray-200 bg-gray-50 rounded-t-xl p-3 flex flex-wrap gap-1 items-center sticky top-0 z-20 shadow-sm">
        {/* Text Formatting */}
        <div className="flex gap-1 px-2 py-1 bg-white rounded-lg shadow-sm mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold (Ctrl+B)"
          >
            <Bold size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic (Ctrl+I)"
          >
            <Italic size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Underline (Ctrl+U)"
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

        {/* Headings */}
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

        {/* Font Size */}
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

        {/* Alignment */}
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

        {/* Lists */}
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

        {/* Color & Highlight */}
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

        {/* Links & Images */}
        <div className="flex gap-1 px-2 py-1 bg-white rounded-lg shadow-sm mr-2">
          <ToolbarButton
            onClick={() => setShowLinkInput(!showLinkInput)}
            title="Add Link"
          >
            <LinkIcon size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            title="Remove Link"
          >
            <Unlink size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={addImage} title="Add Image">
            <ImageIcon size={16} />
          </ToolbarButton>
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1 px-2 py-1 bg-white rounded-lg shadow-sm">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo (Ctrl+Z)"
          >
            <Undo size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo (Ctrl+Y)"
          >
            <Redo size={16} />
          </ToolbarButton>
        </div>
      </div>

      {/* Link Input */}
      {showLinkInput && (
        <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[300px]">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Enter URL: https://..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex gap-2">
            <Button onClick={setLink} size="sm">
              Add Link
            </Button>
            <Button
              onClick={() => setShowLinkInput(false)}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Color Picker */}
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

      {/* Editor Styles */}
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
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
        }
        .ProseMirror .is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
      `}</style>

      <EditorContent editor={editor} />
    </div>
  );
}
