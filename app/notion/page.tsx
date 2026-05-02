"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashPosition, setSlashPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false); // Track client-side mount

  const editor = useEditor({
    // Fix: Add immediatelyRender: false to prevent SSR issues
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Type "/" for commands...',
      }),
    ],
    content: "<p>Welcome to your mini-Notion!</p>",
    editorProps: {
      handleKeyDown: (view, event) => {
        if (event.key === "/") {
          const { from } = view.state.selection;
          const coords = view.coordsAtPos(from);
          setSlashPosition({ x: coords.left, y: coords.bottom });
          setShowSlashMenu(true);
          return false;
        }

        if (event.key === "Escape") {
          setShowSlashMenu(false);
          return false;
        }

        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      localStorage.setItem("notion-content", html);
    },
  });

  // Mark when component is mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load saved content only on client
  useEffect(() => {
    if (isMounted && editor) {
      const saved = localStorage.getItem("notion-content");
      if (saved) {
        editor.commands.setContent(saved);
      }
    }
  }, [isMounted, editor]);

  const insertBlock = (type: string) => {
    if (!editor) return;

    // Remove the "/" character
    const { from } = editor.state.selection;
    editor
      .chain()
      .focus()
      .deleteRange({ from: from - 1, to: from })
      .run();

    // Insert the block
    switch (type) {
      case "Heading 1":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case "Heading 2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "Bullet List":
        editor.chain().focus().toggleBulletList().run();
        break;
      case "Numbered List":
        editor.chain().focus().toggleOrderedList().run();
        break;
      case "Todo List":
        editor
          .chain()
          .focus()
          .insertContent(
            '<div data-type="taskItem" data-checked="false">Todo item</div>',
          )
          .run();
        break;
      case "Code Block":
        editor.chain().focus().toggleCodeBlock().run();
        break;
      case "Quote":
        editor.chain().focus().toggleBlockquote().run();
        break;
      case "Divider":
        editor.chain().focus().setHorizontalRule().run();
        break;
    }

    setShowSlashMenu(false);
  };

  // Don't render editor content until client-side to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-sm border min-h-[600px] p-8">
            <div className="animate-pulse">Loading editor...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border min-h-[600px]">
          <EditorContent editor={editor} className="prose max-w-none p-8" />
        </div>

        <div className="mt-4 text-sm text-gray-400 text-center">
          Tip: Type "/" anywhere to open the command menu
        </div>
      </div>

      {showSlashMenu && editor && (
        <SlashMenu
          position={slashPosition}
          onSelect={insertBlock}
          onClose={() => setShowSlashMenu(false)}
        />
      )}
    </div>
  );
}

interface SlashMenuProps {
  position: { x: number; y: number };
  onSelect: (type: string) => void;
  onClose: () => void;
}

const COMMANDS = [
  { name: "Heading 1", icon: "H1", description: "Large heading" },
  { name: "Heading 2", icon: "H2", description: "Medium heading" },
  { name: "Bullet List", icon: "•", description: "Unordered list" },
  { name: "Numbered List", icon: "1.", description: "Ordered list" },
  { name: "Todo List", icon: "☐", description: "Task list" },
  { name: "Code Block", icon: "</>", description: "Code snippet" },
  { name: "Quote", icon: '"', description: "Blockquote" },
  { name: "Divider", icon: "—", description: "Horizontal line" },
];

export function SlashMenu({ position, onSelect, onClose }: SlashMenuProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Reset selected index when filtered commands change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) =>
            (prev - 1 + filteredCommands.length) % filteredCommands.length,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          onSelect(filteredCommands[selectedIndex].name);
        }
      } else if (e.key === "Backspace" && search.length === 0) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredCommands, selectedIndex, onSelect, onClose, search]);

  // Focus input when menu opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white rounded-lg shadow-xl border w-64 overflow-hidden"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="p-2 border-b">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search commands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="max-h-96 overflow-y-auto">
        {filteredCommands.map((cmd, idx) => (
          <button
            key={cmd.name}
            onClick={() => onSelect(cmd.name)}
            className={`w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
              idx === selectedIndex ? "bg-blue-50" : ""
            }`}
          >
            <span className="font-mono text-sm font-medium text-gray-500 w-8">
              {cmd.icon}
            </span>
            <div>
              <div className="text-sm font-medium">{cmd.name}</div>
              <div className="text-xs text-gray-400">{cmd.description}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="p-2 border-t text-xs text-gray-400 text-center">
        Press Enter to select • Esc to close
      </div>
    </div>
  );
}
