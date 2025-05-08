import Image from "next/image";
import Link from "next/link";
import React from "react";
import DocumentsInput from "./document-input";
import DocsMenuBar from "./docs-menubar";
import { useEditorStore } from "@/store/use-editor-store";

const DocsNabar = () => {
  return (
    <nav className="ml-6 print:hidden">
      <div className="flex items-center">
        <div className="flex flex-col">
          <DocumentsInput />
        </div>
        <DocsMenuBar />
      </div>
    </nav>
  );
};

export default DocsNabar;
