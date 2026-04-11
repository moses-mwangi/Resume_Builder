"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Palette,
  Highlighter,
  List,
  ListOrdered,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Minus,
  Eraser,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";

export default function ModernEditor() {
  const [previewContent, setPreviewContent] = useState<string>("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
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
          class: "highlighted",
        },
      }),
    ],
    content: `
      <h1>✨ Welcome to Stellar Editor</h1>
      <p>This is a <strong>powerful</strong> rich text editor with a <em>stylish toolbar</em>. Try all the formatting options!</p>
      <h2>Features</h2>
      <ul>
        <li>Bold, Italic, Underline, Strikethrough</li>
        <li>Text color & Highlighting</li>
        <li>Alignments (Left, Center, Right, Justify)</li>
        <li>Headings (H1, H2, H3)</li>
        <li>Bullet & Numbered lists</li>
        <li>Blockquotes & Code blocks</li>
        <li>Links & Images</li>
        <li>Undo / Redo</li>
      </ul>
      <p>Select any text to see the <span style="color:#e11d48;">floating toolbar</span> or use the main toolbar below!</p>
      <blockquote>“Design is not just what it looks like and feels like. Design is how it works.” — Steve Jobs</blockquote>
      <p><strong>Try adding an image:</strong> click the image icon in toolbar.</p>
    `,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[400px] p-6 rounded-xl bg-white shadow-inner border border-gray-100",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setPreviewContent(html);
    },
    immediatelyRender: false,
  });

  // Update preview when editor is ready
  useEffect(() => {
    if (editor) {
      setPreviewContent(editor.getHTML());
    }
  }, [editor]);

  // Floating toolbar position logic
  const [floatingPosition, setFloatingPosition] = useState<{
    top: number;
    left: number;
    visible: boolean;
  }>({ top: 0, left: 0, visible: false });

  const updateFloatingToolbar = useCallback(() => {
    if (!editor) return;
    const { view } = editor;
    const { state } = view;
    const { from, to, empty } = state.selection;

    if (empty || from === to) {
      setFloatingPosition((prev) => ({ ...prev, visible: false }));
      return;
    }

    // Get selection coordinates
    const start = view.coordsAtPos(from);
    const end = view.coordsAtPos(to);
    const selectionRect = {
      top: Math.min(start.top, end.top),
      bottom: Math.max(start.bottom, end.bottom),
      left: Math.min(start.left, end.left),
      right: Math.max(start.right, end.right),
    };

    setFloatingPosition({
      top: selectionRect.top - 50 + window.scrollY,
      left: (selectionRect.left + selectionRect.right) / 2,
      visible: true,
    });
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    const handleSelectionUpdate = () => {
      updateFloatingToolbar();
    };
    editor.on("selectionUpdate", handleSelectionUpdate);
    window.addEventListener("scroll", updateFloatingToolbar);
    window.addEventListener("resize", updateFloatingToolbar);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
      window.removeEventListener("scroll", updateFloatingToolbar);
      window.removeEventListener("resize", updateFloatingToolbar);
    };
  }, [editor, updateFloatingToolbar]);

  // Helper to check active states
  const isActive = (type: string, attrs?: any) => {
    if (!editor) return false;
    if (attrs) return editor.isActive(type, attrs);
    return editor.isActive(type);
  };

  const toggleLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    if (previousUrl) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setLinkUrl("");
    } else {
      setLinkUrl("");
      setShowLinkModal(true);
    }
  };

  const insertLink = () => {
    if (!editor) return;
    if (linkUrl && linkUrl.trim()) {
      let url = linkUrl.trim();
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
    setShowLinkModal(false);
    setLinkUrl("");
  };

  const addImage = () => {
    if (!editor) return;
    const url = prompt(
      "Enter image URL:",
      "https://picsum.photos/400/200?random=1",
    );
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const clearFormatting = () => {
    if (!editor) return;
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  };

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

  if (!editor) return null;

  const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 cursor-pointer rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-indigo-600 text-white shadow-md scale-105"
          : "bg-gray-50 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 to-gray-100 font-sans"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Insert Link
            </h3>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && insertLink()}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={insertLink}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Color Picker Dropdown */}
      {showColorPicker && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-2xl shadow-2xl p-3 flex gap-2 border border-gray-200 animate-in slide-in-from-top-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => {
                editor.chain().focus().setColor(color).run();
                setShowColorPicker(false);
              }}
              className="w-8 h-8 cursor-pointer rounded-full shadow-md transition-transform hover:scale-110"
              style={{
                backgroundColor: color,
                border: color === "#ffffff" ? "1px solid #ccc" : "none",
              }}
              title={color}
            />
          ))}
          <button
            onClick={() => {
              editor.chain().focus().unsetColor().run();
              setShowColorPicker(false);
            }}
            className="px-3 py-1 cursor-pointer text-xs bg-gray-100 rounded-full hover:bg-gray-200"
          >
            Reset
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with tabs */}
        <div className="mb-6 flex gap-3 items-center justify-between flex-wrap">
          <div className="flex gap-2 bg-white/60 backdrop-blur-sm px-1 py-0.5 rounded-xl shadow-sm">
            <button
              onClick={() => setActiveTab("write")}
              className={`px-5 py-2 rounded-lg cursor-pointer h-8 text-sm font-medium transition-all ${
                activeTab === "write"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              ✏️ Write
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-5 py-2 cursor-pointer h-8 text-sm rounded-lg font-medium transition-all ${
                activeTab === "preview"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              👁️ Preview
            </button>
            <button
              onClick={() => {
                console.log("Moses mwangi");
              }}
              className={`px-5 py-2 cursor-pointer h-8 text-sm rounded-lg font-medium transition-all`}
            >
              CLICK
            </button>
          </div>
          <div className="text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-full">
            <i className="fas fa-magic mr-1"></i> Stellar Editor • Rich
            Formatting
          </div>
        </div>

        {/* Editor Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 transition-all">
          {/* Stylish Main Toolbar */}
          <div className="border-b border-gray-200 bg-gray-50/90 backdrop-blur-sm p-3 flex flex-wrap gap-1 items-center sticky top-0 z-20">
            {/* Text formatting group */}
            <div className="flex gap-1 px-2 py-1 bg-white rounded-xl shadow-sm mr-2">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={isActive("bold")}
                title="Bold"
              >
                <Bold size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={isActive("italic")}
                title="Italic"
              >
                <Italic size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={isActive("underline")}
                title="Underline"
              >
                <UnderlineIcon size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={isActive("strike")}
                title="Strikethrough"
              >
                <Strikethrough size={18} />
              </ToolbarButton>
            </div>

            {/* Headings */}
            <div className="flex gap-1 px-2 py-1 bg-white rounded-xl shadow-sm mr-2">
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                isActive={isActive("heading", { level: 1 })}
                title="Heading 1"
              >
                <Heading1 size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                isActive={isActive("heading", { level: 2 })}
                title="Heading 2"
              >
                <Heading2 size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                isActive={isActive("heading", { level: 3 })}
                title="Heading 3"
              >
                <Heading3 size={18} />
              </ToolbarButton>
            </div>

            {/* Alignment */}
            <div className="flex gap-1 px-2 py-1 bg-white rounded-xl shadow-sm mr-2">
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                isActive={isActive("textAlign", { textAlign: "left" })}
                title="Align Left"
              >
                <AlignLeft size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                isActive={isActive("textAlign", { textAlign: "center" })}
                title="Center"
              >
                <AlignCenter size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                isActive={isActive("textAlign", { textAlign: "right" })}
                title="Align Right"
              >
                <AlignRight size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
                isActive={isActive("textAlign", { textAlign: "justify" })}
                title="Justify"
              >
                <AlignJustify size={18} />
              </ToolbarButton>
            </div>

            {/* Lists & Quotes */}
            <div className="flex gap-1 px-2 py-1 bg-white rounded-xl shadow-sm mr-2">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={isActive("bulletList")}
                title="Bullet List"
              >
                <List size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={isActive("orderedList")}
                title="Numbered List"
              >
                <ListOrdered size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={isActive("blockquote")}
                title="Quote"
              >
                <Quote size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                isActive={isActive("codeBlock")}
                title="Code Block"
              >
                <Code size={18} />
              </ToolbarButton>
            </div>

            {/* Color & Highlight */}
            <div className="flex gap-1 px-2 py-1 bg-white rounded-xl shadow-sm mr-2">
              <ToolbarButton
                onClick={() => setShowColorPicker(!showColorPicker)}
                title="Text Color"
              >
                <Palette size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                isActive={isActive("highlight")}
                title="Highlight"
              >
                <Highlighter size={18} />
              </ToolbarButton>
            </div>

            {/* Links & Images */}
            <div className="flex gap-1 px-2 py-1 bg-white rounded-xl shadow-sm mr-2">
              <ToolbarButton
                onClick={toggleLink}
                isActive={isActive("link")}
                title="Insert Link"
              >
                <LinkIcon size={18} />
              </ToolbarButton>
              <ToolbarButton onClick={addImage} title="Insert Image">
                <ImageIcon size={18} />
              </ToolbarButton>
            </div>

            {/* Undo/Redo & Clear */}
            <div className="flex gap-1 px-2 py-1 bg-white rounded-xl shadow-sm mr-2">
              <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                title="Undo"
              >
                <Undo size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                title="Redo"
              >
                <Redo size={18} />
              </ToolbarButton>
              <ToolbarButton onClick={clearFormatting} title="Clear Formatting">
                <Eraser size={18} />
              </ToolbarButton>
            </div>

            <div className="ml-auto text-xs text-gray-400">
              <Minus size={16} className="inline mr-1" /> select text → floating
              bar
            </div>
          </div>

          {/* Floating Toolbar (appears on selection) */}
          {floatingPosition.visible && (
            <div
              style={{
                position: "absolute",
                top: floatingPosition.top,
                left: floatingPosition.left,
                transform: "translateX(-50%)",
                zIndex: 40,
              }}
              className="bg-gray-900/90 backdrop-blur-lg text-white rounded-full shadow-2xl flex gap-1 px-2 py-1.5 border border-white/20 animate-in fade-in zoom-in-95"
            >
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1.5 cursor-pointer rounded-full transition ${editor.isActive("bold") ? "bg-white text-black" : "hover:bg-white/20"}`}
              >
                <Bold size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1.5 cursor-pointer rounded-full transition ${editor.isActive("italic") ? "bg-white text-black" : "hover:bg-white/20"}`}
              >
                <Italic size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-1.5 cursor-pointer rounded-full transition ${editor.isActive("underline") ? "bg-white text-black" : "hover:bg-white/20"}`}
              >
                <UnderlineIcon size={16} />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className="p-1.5 cursor-pointer rounded-full hover:bg-white/20"
              >
                <AlignLeft size={16} />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className="p-1.5 cursor-pointer rounded-full hover:bg-white/20"
              >
                <AlignCenter size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={`p-1.5 cursor-pointer rounded-full transition ${editor.isActive("highlight") ? "bg-yellow-400 text-black" : "hover:bg-white/20"}`}
              >
                <Highlighter size={16} />
              </button>
            </div>
          )}

          {/* Content Area: Editor or Preview */}
          <div className="transition-all duration-300">
            {activeTab === "write" ? (
              <div className="relative">
                <EditorContent editor={editor} />
              </div>
            ) : (
              <div className="p-6 min-h-112.5 prose prose-lg max-w-none bg-white rounded-b-xl">
                <div
                  className="preview-content"
                  dangerouslySetInnerHTML={{ __html: previewContent }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Additional status & info */}
        <div className="mt-6 flex justify-between text-sm text-gray-500 bg-white/40 backdrop-blur-sm p-3 rounded-xl">
          <div className="flex gap-4">
            <span>
              ✨ <strong>Tip:</strong> Highlight text → floating mini-toolbar
              appears
            </span>
            <span>
              🎨 <strong>Colors:</strong> click palette icon
            </span>
          </div>
          <div className="font-mono text-xs">
            {editor && editor.storage.characterCount
              ? `${editor.getText().length} chars`
              : "ready"}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ProseMirror {
          padding: 1.5rem;
          min-height: 450px;
          outline: none;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.8rem;
        }
        .ProseMirror blockquote {
          border-left: 4px solid #6366f1;
          padding-left: 1rem;
          font-style: italic;
          color: #4b5563;
          margin: 1rem 0;
        }
        .ProseMirror code {
          background-color: #f1f5f9;
          padding: 0.2rem 0.4rem;
          border-radius: 6px;
          font-family: monospace;
          font-size: 0.9em;
        }
        .ProseMirror pre {
          background: #0f172a;
          color: #e2e8f0;
          padding: 1rem;
          border-radius: 12px;
          overflow-x: auto;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 1rem 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .ProseMirror a {
          color: #4f46e5;
          text-decoration: underline;
          font-weight: 500;
        }
        .preview-content h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
        .preview-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
        }
        .preview-content ul,
        .preview-content ol {
          margin: 0.75rem 0 0.75rem 1.5rem;
        }
        .preview-content blockquote {
          border-left: 4px solid #6366f1;
          padding-left: 1rem;
          font-style: italic;
          color: #374151;
        }
        .preview-content pre {
          background: #1e293b;
          color: #f1f5f9;
          padding: 1rem;
          border-radius: 12px;
          overflow-x: auto;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-in {
          animation: fade-in 0.15s ease-out;
        }
        .zoom-in-95 {
          animation: fade-in 0.1s ease-out;
        }
      `}</style>
    </div>
  );
}
