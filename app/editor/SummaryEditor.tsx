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
// import ListItem from "@tiptap/extension-list-item";

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
// } from "lucide-react";

// import { useEffect, useState } from "react";

// interface SummaryEditorProps {
//   onSave?: (content: string) => void;
//   initialContent?: string;
//   onChange: (value: string) => void;
//   readOnly?: boolean;
// }

// export default function SummaryEditor({
//   onSave,
//   initialContent,
//   onChange,
//   readOnly = false,
// }: SummaryEditorProps) {
//   const [showColorPicker, setShowColorPicker] = useState(false);

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         heading: { levels: [1, 2, 3] },
//       }),
//       ListItem,
//       TextAlign.configure({
//         types: ["heading", "paragraph"],
//       }),
//       Underline,
//       Link.configure({
//         openOnClick: false,
//         HTMLAttributes: {
//           class: "text-blue-600 underline hover:text-blue-800",
//         },
//       }),
//       Image,
//       TextStyle,
//       Color,
//       Highlight.configure({ multicolor: true }),
//     ],

//     content: initialContent || "",
//     editable: !readOnly,

//     editorProps: {
//       attributes: {
//         class: [
//           "tiptap",
//           "min-h-[300px]",
//           "p-6",
//           "rounded-xl",
//           "focus:outline-none",
//           readOnly ? "bg-gray-50" : "bg-white",
//           "border",
//           "border-gray-200",
//         ].join(" "),
//         // class: `
//         //   tiptap
//         //   min-h-[300px]
//         //   p-6
//         //   rounded-xl
//         //   focus:outline-none
//         //   ${readOnly ? "bg-gray-50" : "bg-white"}
//         //   border border-gray-200
//         // `,
//       },
//     },

//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       onChange(html);
//       onSave?.(html);
//     },

//     immediatelyRender: false,
//   });

//   // 🔥 FIX: update editor when external value changes (AI etc.)
//   useEffect(() => {
//     if (editor && initialContent) {
//       editor.commands.setContent(initialContent);
//     }
//   }, [initialContent, editor]);

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
//       disabled={readOnly}
//       className={`p-2 rounded-lg transition ${
//         isActive ? "bg-indigo-600 text-white" : "bg-gray-100 hover:bg-indigo-50"
//       }`}
//     >
//       {children}
//     </button>
//   );

//   const colors = ["#000000", "#e11d48", "#22c55e", "#3b82f6", "#eab308"];

//   return (
//     <div>
//       {!readOnly && (
//         <div className="border bg-gray-50 rounded-t-xl p-3 flex flex-wrap gap-2">
//           {/* TEXT STYLE */}
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

//           {/* HEADINGS */}
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

//           {/* ALIGN */}
//           <ToolbarButton
//             onClick={() => editor.chain().focus().setTextAlign("left").run()}
//           >
//             <AlignLeft size={16} />
//           </ToolbarButton>

//           <ToolbarButton
//             onClick={() => editor.chain().focus().setTextAlign("center").run()}
//           >
//             <AlignCenter size={16} />
//           </ToolbarButton>

//           <ToolbarButton
//             onClick={() => editor.chain().focus().setTextAlign("right").run()}
//           >
//             <AlignRight size={16} />
//           </ToolbarButton>

//           {/* LISTS */}
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

//           {/* COLOR */}
//           <ToolbarButton onClick={() => setShowColorPicker(!showColorPicker)}>
//             <Palette size={16} />
//           </ToolbarButton>

//           <ToolbarButton
//             onClick={() => editor.chain().focus().toggleHighlight().run()}
//           >
//             <Highlighter size={16} />
//           </ToolbarButton>

//           {/* HISTORY */}
//           <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
//             <Undo size={16} />
//           </ToolbarButton>

//           <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
//             <Redo size={16} />
//           </ToolbarButton>
//         </div>
//       )}

//       {/* COLOR PICKER */}
//       {showColorPicker && (
//         <div className="flex gap-2 p-2 border bg-white">
//           {colors.map((color) => (
//             <button
//               key={color}
//               onClick={() => {
//                 editor.chain().focus().setColor(color).run();
//                 setShowColorPicker(false);
//               }}
//               className="w-6 h-6 rounded-full"
//               style={{ backgroundColor: color }}
//             />
//           ))}
//         </div>
//       )}

//       {/* EDITOR */}
//       <EditorContent editor={editor} className="tiptap" />
//     </div>
//   );
// }

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
  Minus,
  Plus,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useEffect, useState } from "react";

interface SummaryEditorProps {
  onSave?: (content: string) => void;
  initialContent?: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

// Font size options
const FONT_SIZES = [
  { label: "Small", value: "12px", class: "text-xs" },
  { label: "Normal", value: "16px", class: "text-base" },
  { label: "Large", value: "18px", class: "text-lg" },
  { label: "Huge", value: "24px", class: "text-2xl" },
];

// Font weight options
const FONT_WEIGHTS = [
  { label: "Light", value: "300" },
  { label: "Normal", value: "400" },
  { label: "Semibold", value: "600" },
  { label: "Bold", value: "700" },
  { label: "Extrabold", value: "800" },
];

// Margin/Padding presets
const SPACING_OPTIONS = [
  { label: "None", value: "0" },
  { label: "Small", value: "8px" },
  { label: "Medium", value: "16px" },
  { label: "Large", value: "24px" },
  { label: "XLarge", value: "32px" },
];

export default function SummaryEditor({
  onSave,
  initialContent,
  onChange,
  readOnly = false,
}: SummaryEditorProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontSizeMenu, setShowFontSizeMenu] = useState(false);
  const [showFontWeightMenu, setShowFontWeightMenu] = useState(false);
  const [showMarginMenu, setShowMarginMenu] = useState(false);
  const [showPaddingMenu, setShowPaddingMenu] = useState(false);
  const [selectedSpacingType, setSelectedSpacingType] = useState<
    "margin" | "padding" | null
  >(null);
  const [selectedDirection, setSelectedDirection] = useState<
    "all" | "top" | "right" | "bottom" | "left"
  >("all");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: "list-disc ml-6 space-y-1",
          },
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: "list-decimal ml-6 space-y-1",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "mb-1",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-blue-600 underline decoration-blue-400 hover:text-blue-800",
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg shadow-md max-w-full my-2",
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: "bg-yellow-200",
        },
      }),
    ],
    content: initialContent || ``,
    editable: !readOnly,
    editorProps: {
      attributes: {
        class: `prose max-w-none focus:outline-none min-h-[300px] p-6 rounded-xl ${
          readOnly ? "bg-gray-50" : "bg-white"
        } border border-gray-200`,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      if (onSave) {
        onSave(html);
      }
    },
    immediatelyRender: false,
  });

  // Apply font size to selected text
  const applyFontSize = (size: string) => {
    if (!editor) return;
    editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
    setShowFontSizeMenu(false);
  };

  // Apply font weight to selected text
  const applyFontWeight = (weight: string) => {
    if (!editor) return;
    editor.chain().focus().setMark("textStyle", { fontWeight: weight }).run();
    setShowFontWeightMenu(false);
  };

  // Apply spacing (margin/padding) to selected element
  const applySpacing = (
    type: "margin" | "padding",
    direction: string,
    value: string,
  ) => {
    if (!editor) return;
    const { state } = editor;
    const { from, to } = state.selection;

    let cssProperty = "";
    if (direction === "all") {
      cssProperty = type;
    } else {
      cssProperty = `${type}-${direction}`;
    }

    editor
      .chain()
      .focus()
      .setMark("textStyle", { [cssProperty]: value })
      .run();
    setShowMarginMenu(false);
    setShowPaddingMenu(false);
    setSelectedSpacingType(null);
  };

  // Get current styles for the selection
  const getCurrentStyles = () => {
    if (!editor) return {};
    const { state } = editor;
    const { from } = state.selection;
    const marks = state.doc.resolve(from).marks();
    const textStyleMark = marks.find((mark) => mark.type.name === "textStyle");
    return textStyleMark ? textStyleMark.attrs : {};
  };

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
      disabled={readOnly}
      className={`p-2 rounded-lg transition-all duration-200 ${
        readOnly ? "opacity-50 cursor-not-allowed" : ""
      } ${
        isActive
          ? "bg-indigo-600 text-white shadow-md scale-105"
          : "bg-gray-50 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
      }`}
    >
      {children}
    </button>
  );

  const colors = [
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
      {!readOnly && (
        <>
          {/* Main Toolbar */}
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

            {/* Font Size Control */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowFontSizeMenu(!showFontSizeMenu);
                  setShowFontWeightMenu(false);
                  setShowMarginMenu(false);
                  setShowPaddingMenu(false);
                }}
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
                      onClick={() => applyFontSize(size.value)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-indigo-50 rounded transition"
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Font Weight Control */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowFontWeightMenu(!showFontWeightMenu);
                  setShowFontSizeMenu(false);
                  setShowMarginMenu(false);
                  setShowPaddingMenu(false);
                }}
                className="p-2 rounded-lg bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition flex items-center gap-1"
                title="Font Weight"
              >
                <Bold size={14} />
                <span className="text-xs">Weight</span>
              </button>
              {showFontWeightMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-50 min-w-[120px]">
                  {FONT_WEIGHTS.map((weight) => (
                    <button
                      key={weight.value}
                      onClick={() => applyFontWeight(weight.value)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-indigo-50 rounded transition"
                      style={{ fontWeight: weight.value }}
                    >
                      {weight.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Alignment */}
            <div className="flex gap-1 px-2 py-1 bg-white rounded-lg shadow-sm mr-2">
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                isActive={editor.isActive({ textAlign: "left" })}
                title="Align Left"
              >
                <AlignLeft size={16} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                isActive={editor.isActive({ textAlign: "center" })}
                title="Center"
              >
                <AlignCenter size={16} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                isActive={editor.isActive({ textAlign: "right" })}
                title="Align Right"
              >
                <AlignRight size={16} />
              </ToolbarButton>
            </div>

            {/* Lists - Fixed with proper styling */}
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

            {/* Margin Control */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowMarginMenu(!showMarginMenu);
                  setShowPaddingMenu(false);
                  setShowFontSizeMenu(false);
                  setShowFontWeightMenu(false);
                  setSelectedSpacingType("margin");
                }}
                className="p-2 rounded-lg bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition flex items-center gap-1"
                title="Margin (Outside Spacing)"
              >
                <Maximize2 size={14} />
                <span className="text-xs">Margin</span>
              </button>
            </div>

            {/* Padding Control */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowPaddingMenu(!showPaddingMenu);
                  setShowMarginMenu(false);
                  setShowFontSizeMenu(false);
                  setShowFontWeightMenu(false);
                  setSelectedSpacingType("padding");
                }}
                className="p-2 rounded-lg bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition flex items-center gap-1"
                title="Padding (Inside Spacing)"
              >
                <Minimize2 size={14} />
                <span className="text-xs">Padding</span>
              </button>
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

          {/* Margin/Padding Direction Menu */}
          {(showMarginMenu || showPaddingMenu) && (
            <div className="absolute z-50 mt-1 ml-4 bg-white rounded-xl shadow-2xl p-4 border border-gray-200 min-w-[280px]">
              <div className="mb-3 font-semibold text-gray-700">
                {selectedSpacingType === "margin" ? "Margin" : "Padding"}{" "}
                Settings
              </div>

              {/* Direction Selector */}
              <div className="flex gap-2 mb-3">
                {["all", "top", "right", "bottom", "left"].map((dir) => (
                  <button
                    key={dir}
                    onClick={() => setSelectedDirection(dir as any)}
                    className={`px-3 py-1 text-xs rounded-lg capitalize transition ${
                      selectedDirection === dir
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {dir === "all" ? "All Sides" : dir}
                  </button>
                ))}
              </div>

              {/* Spacing Values */}
              <div className="grid grid-cols-2 gap-2">
                {SPACING_OPTIONS.map((spacing) => (
                  <button
                    key={spacing.value}
                    onClick={() =>
                      applySpacing(
                        selectedSpacingType as any,
                        selectedDirection,
                        spacing.value,
                      )
                    }
                    className="px-3 py-2 text-sm bg-gray-50 hover:bg-indigo-50 rounded-lg transition text-left"
                  >
                    {spacing.label}
                    {spacing.value !== "0" && (
                      <span className="text-xs text-gray-500 ml-1">
                        ({spacing.value})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Picker */}
          {showColorPicker && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-2xl shadow-2xl p-3 flex gap-2 border border-gray-200">
              {colors.map((color) => (
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
        </>
      )}

      {/* Editor Content with custom styles */}
      <style jsx global>{`
        .ProseMirror {
          padding: 1.5rem;
          /* min-height: 400px; */
          min-height: 40px;
          outline: none;
        }

        /* List styles - ensures bullets and numbers appear */
        .ProseMirror ul {
          list-style-type: disc !important;
          margin: 0.5rem 0 0.5rem 1.5rem !important;
          padding-left: 1.5rem !important;
        }

        .ProseMirror ol {
          list-style-type: decimal !important;
          margin: 0.5rem 0 0.5rem 1.5rem !important;
          padding-left: 1.5rem !important;
        }

        .ProseMirror li {
          margin: 0.25rem 0 !important;
          display: list-item !important;
        }

        /* Heading styles */
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

        /* Paragraph spacing */
        .ProseMirror p {
          margin: o.5rem 0 !important;
        }

        /* .ProseMirror p + ul,
        .ProseMirror p + ol {
          margin-top: 4rem !important; 
        }  */

        /* Blockquote style */
        .ProseMirror blockquote {
          border-left: 4px solid #6366f1;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #4b5563;
        }

        /* Highlight style */
        .ProseMirror mark {
          background-color: #fef08a;
          padding: 0 2px;
        }
      `}</style>

      <EditorContent editor={editor} />
    </div>
  );
}
