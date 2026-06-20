"use client";

import { useState, type ReactNode } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link2,
  Strikethrough,
  Underline,
  Unlink,
} from "lucide-react";
import { cn } from "@istina/ui";

function Btn({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg text-sand-700 transition-colors hover:bg-sand-100 disabled:cursor-not-allowed disabled:opacity-40",
        active && "bg-clay-100 text-clay-700",
      )}
    >
      {children}
    </button>
  );
}

const Sep = () => <span className="mx-1 h-5 w-px shrink-0 bg-sand-200" />;

// Палитра для выделения текста цветом (надёжно применяется к выделению).
const COLORS = [
  "#2f241b",
  "#9b4521",
  "#a33a2a",
  "#2f6f4f",
  "#2d5a8a",
  "#6b4a8a",
];

export function RichEditor({
  name,
  defaultValue = "",
}: {
  name: string;
  defaultValue?: string;
}) {
  const [html, setHtml] = useState(defaultValue);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false },
      }),
      TextStyle,
      Color,
    ],
    content: defaultValue,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "article-body min-h-[280px] px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => setHtml(editor.isEmpty ? "" : editor.getHTML()),
  });

  function setLink() {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Ссылка (URL):", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <div className="overflow-hidden rounded-xl border border-sand-300 bg-white focus-within:border-clay-400 focus-within:ring-2 focus-within:ring-clay-500/30">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-sand-200 p-1.5">
        {editor ? (
          <>
            <Btn
              label="Жирный"
              active={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="h-4 w-4" aria-hidden />
            </Btn>
            <Btn
              label="Курсив"
              active={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic className="h-4 w-4" aria-hidden />
            </Btn>
            <Btn
              label="Подчёркнутый"
              active={editor.isActive("underline")}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <Underline className="h-4 w-4" aria-hidden />
            </Btn>
            <Btn
              label="Зачёркнутый"
              active={editor.isActive("strike")}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <Strikethrough className="h-4 w-4" aria-hidden />
            </Btn>

            <Sep />
            <Btn
              label="Подзаголовок"
              active={editor.isActive("heading", { level: 2 })}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <Heading2 className="h-4 w-4" aria-hidden />
            </Btn>
            <Btn
              label="Подзаголовок поменьше"
              active={editor.isActive("heading", { level: 3 })}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              <Heading3 className="h-4 w-4" aria-hidden />
            </Btn>

            <Sep />
            <Btn label="Ссылка" active={editor.isActive("link")} onClick={setLink}>
              <Link2 className="h-4 w-4" aria-hidden />
            </Btn>
            <Btn
              label="Убрать ссылку"
              disabled={!editor.isActive("link")}
              onClick={() => editor.chain().focus().unsetLink().run()}
            >
              <Unlink className="h-4 w-4" aria-hidden />
            </Btn>

            <Sep />
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Цвет ${color}`}
                title="Цвет текста"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => editor.chain().focus().setColor(color).run()}
                className="h-5 w-5 shrink-0 rounded-full border border-sand-300 transition-transform hover:scale-110"
                style={{ backgroundColor: color }}
              />
            ))}
            <Btn
              label="Убрать цвет"
              onClick={() => editor.chain().focus().unsetColor().run()}
            >
              <span className="text-xs font-semibold">A</span>
            </Btn>
          </>
        ) : null}
      </div>

      <input type="hidden" name={name} value={html} />
      <EditorContent editor={editor} />
    </div>
  );
}
