import { CloudUpload } from "lucide-react";
import React from "react";

const DocumentsInput = () => {
  return (
    <div className="flex items-center gap-2 pl-1">
      <span className="cursor-pointer truncate px-1.5 font-mulish text-base font-semibold">
        Untitled Document
      </span>
      <CloudUpload size={17} />
    </div>
  );
};

export default DocumentsInput;
