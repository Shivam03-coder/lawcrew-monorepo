import React, { useState } from "react";
import FormField from "../shared/form-field";
import { UploadCloud } from "lucide-react";
import { Input } from "../ui/input";
import { UseFormSetValue } from "react-hook-form";
import { CaseDetailsType } from "@lawcrew/schema";
import axios from "axios";

interface UplaodFileProps {
  isLoading?: boolean;
  setvalue?: UseFormSetValue<CaseDetailsType>;
}

const UplaodFile = ({ setvalue }: UplaodFileProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !setvalue) return;

    const formData = new FormData();
    formData.append("document", file);

    try {
      setUploading(true);

      const res = await axios.post("http://localhost:5050/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("🚀 ~ handleFileChange ~ res:", res)
      const url = res.data?.url;
      if (url) {
        setvalue("docsUrl", url);
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormField label="Upload Docs">
      <div className="relative">
        <UploadCloud className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
        <Input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.png"
          disabled={uploading}
          onChange={handleFileChange}
          className="rounded-full border border-primary/60 bg-white pl-9 text-primary transition-all file:mr-4 file:rounded-full file:border-0 file:bg-primary/10 file:px-4 file:py-1 file:text-sm file:font-medium file:text-gray-500 focus:ring-1 focus:ring-dark"
        />
      </div>
    </FormField>
  );
};

export default UplaodFile;
