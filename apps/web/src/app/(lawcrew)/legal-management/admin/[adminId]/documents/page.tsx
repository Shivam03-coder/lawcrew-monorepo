import DocsTemplate from "@/features/documents/doc-template";
import DocsSearchbar from "@/features/documents/docs-serch-input";
import React from "react";

const DocumentsPage = () => {
  return (
    <div className="flex h-screen w-full flex-col p-4">
      <DocsSearchbar />
      <div className="p-4">
        <DocsTemplate />
      </div>
    </div>
  );
};

export default DocumentsPage;
