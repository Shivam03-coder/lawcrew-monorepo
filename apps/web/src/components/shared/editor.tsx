"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import ImageResizer from "tiptap-extension-resize-image";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import ToolBar from "@/features/documents/toolbar";
import Ruler from "@/features/documents/ruler";
import { useEditorStore } from "@/store/use-editor-store";
import { api } from "@lawcrew/trpc-client/src/client"; // Import API for mutation

const Editor = ({
  initialContent,
  documentId,
}: {
  initialContent: string;
  documentId: string;
}) => {
  const { setEditor } = useEditorStore();

  // Initialize editor
  const editor = useEditor({
    content: initialContent,
    onCreate({ editor }) {
      setEditor(editor);
    },
    onUpdate({ editor }) {
      const updatedContent = editor.getHTML(); // Get updated content
      saveContent(updatedContent); // Call function to save content
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: "padding-left:56px; padding-right:56px ;",
        class:
          "flex min-h-[900px] w-[816px] border cursor-text flex-col border-secondary bg-white pb-10 pr-14 pt-6 focus:outline-none print:border-0",
      },
    },
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      ImageResizer,
      Underline,
      FontFamily,
      TextStyle,
      Highlight.configure({ multicolor: true }),
      Color,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
  });

  const apiUtils = api.useUtils();

  // Mutation to save content
  const { mutate: updateDoc } = api.document.updateDocs.useMutation();

  const saveContent = (content: string) => {
    updateDoc(
      { docId: documentId, initialContent: content },
      {
        onSuccess: () => {
          apiUtils.document.getDocsbyId.invalidate({ docId: documentId });
        },
        onError: (error) => {
          console.error("Failed to save document:", error);
        },
      },
    );
  };

  return (
    <>
      <ToolBar editor={editor} />
      <div className="size-full overflow-x-auto px-4 dark:bg-primary print:mt-0 print:bg-white print:p-0">
        <Ruler />
        <div className="mx-auto flex w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0">
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
};

export default Editor;
