import Editor from "@/components/shared/editor";
import React, { FC } from "react";

interface DocsProps {
  params: Promise<{
    documentid: string;
  }>;
}

const Docs: FC<DocsProps> = ({ params }) => {
  const { documentid } = React.use(params);
  return (
    <div className="bg-secondary">
      <Editor />
    </div>
  );
};

export default Docs;
