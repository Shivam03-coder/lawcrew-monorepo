"use client";
import DocsMenuBar from "./docs-menubar";
import useMount from "@/hooks/use-mount";
import { useReadLocalStorage } from "usehooks-ts";
import { api } from "@lawcrew/trpc-client/src/client";
import DocumentsTitle from "./document-title";

const DocsNabar = () => {
  const Mount = useMount();
  const docId = useReadLocalStorage("document-id") as string;
  const { data: document } = api.document.getDocsbyId.useQuery({ docId });

  if (!Mount) return null;

  return (
    <nav className="ml-6 print:hidden">
      <div className="flex items-center">
        <div className="flex flex-col">
          <DocumentsTitle
            docId={document?.id as string}
            title={document?.title as string}
          />
        </div>
        {document && <DocsMenuBar docs={document} />}
      </div>
    </nav>
  );
};

export default DocsNabar;
