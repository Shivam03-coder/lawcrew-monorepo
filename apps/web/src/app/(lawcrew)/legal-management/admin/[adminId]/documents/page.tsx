"use client";

import LoaderSpinner from "@/components/shared/laoder";
import DocsTemplate from "@/features/documents/doc-template";
import DocsList from "@/features/documents/docs-list";
import { Loader } from "lucide-react";
import React, { useState } from "react";

const DocumentsPage = () => {
  const [isDocLoading, setisDocLoading] = useState<boolean>(false);

  if (isDocLoading) return;
  <LoaderSpinner />;

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
