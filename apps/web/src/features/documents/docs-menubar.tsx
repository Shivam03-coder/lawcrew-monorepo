"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEditorStore } from "@/store/use-editor-store";
import {
  Save,
  FilePlus,
  FileText,
  Trash2,
  Printer,
  Pencil,
  FileJson,
  FileCode,
  FileType,
  Redo2,
  Undo2,
  AlignCenter,
  Bold,
  Italic,
  Underline,
  Strikethrough,
} from "lucide-react";
import { AppRouterType } from "@lawcrew/trpc-server/routers/root";
type GetDocsByIdOutput = AppRouterType["document"]["getDocsbyId"];

interface DocsMenuBarProps {
  docs: GetDocsByIdOutput;
}
export default function DocsMenuBar({ docs }: DocsMenuBarProps) {
  const { editor } = useEditorStore();

  const insertTable = ({ cols, rows }: { rows: number; cols: number }) => {
    editor?.chain().focus().insertTable({ cols, rows }).run();
  };

  const onDownload = (bolb: Blob, fileName: string) => {
    const url = URL.createObjectURL(bolb);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };

  const baseFileName =
    docs?.title?.replace(/\s+/g, "_").toLowerCase() || "document";

  const onSaveJSON = () => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    onDownload(blob, `${baseFileName}.json`);
  };

  const onSaveHTML = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });
    onDownload(blob, `${baseFileName}.html`);
  };

  const onSaveTEXT = () => {
    if (!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], {
      type: "text/plain",
    });
    onDownload(blob, `${baseFileName}.txt`);
  };

  const onSavePDF = async () => {
    if (!editor) return;

    const htmlContent = editor.getHTML();
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      printWindow.document.write(`
      <html>
        <head><title>${baseFileName}</title></head>
        <body>${htmlContent}</body>
      </html>
    `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <Menubar className="border-none shadow-none print:hidden">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>
              <Save className="mr-2 h-4 w-4" />
              Save
              <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onClick={onSaveJSON}>
                <FileJson className="mr-2 h-4 w-4" />
                JSON
              </MenubarItem>
              <MenubarItem onClick={onSaveHTML}>
                <FileCode className="mr-2 h-4 w-4" />
                HTML
              </MenubarItem>
              <MenubarItem onClick={onSavePDF}>
                <FileText className="mr-2 h-4 w-4" />
                PDF
              </MenubarItem>
              <MenubarItem onClick={onSaveTEXT}>
                <FileType className="mr-2 h-4 w-4" />
                Text
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>
            <FilePlus className="mr-2 h-4 w-4" />
            New Document
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Pencil className="mr-2 h-4 w-4" />
            Rename
          </MenubarItem>
          <MenubarItem>
            <Trash2 className="mr-2 h-4 w-4" />
            Remove
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" />
            Print
            <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
            <Redo2 className="mr-2 h-4 w-4" />
            Redo
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
            <Undo2 className="mr-2 h-4 w-4" />
            Undo
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Insert</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Table</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onClick={() => insertTable({ cols: 1, rows: 1 })}>
                1 x 1
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({ cols: 2, rows: 2 })}>
                2 x 2
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({ cols: 3, rows: 3 })}>
                3 x 3
              </MenubarItem>
              <MenubarItem onClick={() => insertTable({ cols: 4, rows: 4 })}>
                4 x 4
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Format</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>
              <AlignCenter className="mr-2 h-4 w-4" />
              Text
            </MenubarSubTrigger>
            <MenubarSubContent className="w-[200px]">
              <MenubarItem
                onClick={() => editor?.chain().focus().toggleBold().run()}
              >
                <Bold className="mr-2 h-4 w-4" />
                Bold
                <MenubarShortcut>⌘B</MenubarShortcut>
              </MenubarItem>
              <MenubarItem
                onClick={() => editor?.chain().focus().toggleItalic().run()}
              >
                <Italic className="mr-2 h-4 w-4" />
                Italic
                <MenubarShortcut>⌘I</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
              >
                <Underline className="mr-2 h-4 w-4" />
                Underline
                <MenubarShortcut>⌘U</MenubarShortcut>
              </MenubarItem>
              <MenubarItem
                onClick={() => editor?.chain().focus().toggleStrike().run()}
              >
                <Strikethrough className="mr-2 h-4 w-4" />
                Strikethrough
                <MenubarShortcut>⌘⇧X</MenubarShortcut>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
