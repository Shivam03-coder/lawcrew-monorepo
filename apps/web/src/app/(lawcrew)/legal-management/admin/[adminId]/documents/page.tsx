"use client";
import DocsTemplate from "@/features/documents/doc-template";
import DocsList from "@/features/documents/docs-list";
import { Loader } from "lucide-react";
import React, { useState } from "react";

const DocumentsPage = () => {
  const [isDocLoading, setisDocLoading] = useState<boolean>(false);
  if (isDocLoading) {
    return (
      <div className="center h-screen w-full bg-white">
        <span className="animate-spin duration-200">
          <Loader size={39} className="text-primary" />
        </span>
      </div>
    );
  }
  return (
    <div className="flex h-screen w-full flex-col p-4">
      <div className="flex flex-col gap-y-4 p-4">
        <DocsTemplate setisDocLoading={setisDocLoading} />
        <DocsList />
      </div>
    </div>
  );
};

export default DocumentsPage;
