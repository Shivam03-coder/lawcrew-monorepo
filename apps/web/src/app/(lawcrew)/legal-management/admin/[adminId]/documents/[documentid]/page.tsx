"use client";
import Editor from "@/components/shared/editor";
import { api } from "@lawcrew/trpc-client/src/client";
import { Loader } from "lucide-react";
import React, { FC } from "react";

interface DocsProps {
  params: Promise<{
    documentid: string;
  }>;
}

const Docs: FC<DocsProps> = ({ params }) => {
  const { documentid } = React.use(params);
  const { data: doc, isLoading } = api.document.getDocsbyId.useQuery({
    docId: documentid,
  });

  if (isLoading || !doc) {
    return (
      <div className="center h-screen w-full">
        <Loader size={37} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-secondary">
      <Editor
        documentId={documentid}
        initialContent={doc.initialContent as string}
      />
    </div>
  );
};

export default Docs;
