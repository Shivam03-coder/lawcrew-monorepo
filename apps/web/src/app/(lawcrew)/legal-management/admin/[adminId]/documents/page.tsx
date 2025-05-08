"use client"
import DocsTemplate from "@/features/documents/doc-template";
import DocsList from "@/features/documents/docs-list";
import DocsSearchbar from "@/features/documents/docs-serch-input";
import React from "react";

const DocumentsPage = () => {
  return (
    <div className="flex h-screen w-full flex-col p-4">
      <DocsSearchbar />
      <div className="flex flex-col gap-y-4 p-4">
        <DocsTemplate />
        <DocsList />
      </div>
    </div>
  );
};

export default DocumentsPage;
