"use client";

import { useState, type ReactNode } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Strikethrough,
  Underline,
} from "lucide-react";
import { cn } from "@istina/ui";

function Btn({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg text-sand-700 transition-colors hover:bg-sand-100",
        active && "bg-clay-100 text-clay-700",
      )}
    >
      {children}
    </button>
  );
}

const Sep = () => <span className="mx-1 h-5 w-px shrink-0 bg-sand-200" />;

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
          </>
        ) : null}
      </div>

      <input type="hidden" name={name} value={html} />
      <EditorContent editor={editor} />
    </div>
  );
}
