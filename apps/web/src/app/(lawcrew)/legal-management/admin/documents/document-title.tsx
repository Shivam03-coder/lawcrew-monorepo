"use client";

import { api } from "@lawcrew/trpc-client/src/client";
import { Check, CloudCogIcon, Edit2, File, Loader2, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useAppToasts } from "@/hooks/use-app-toast";

const DocumentsTitle = ({ title, docId }: { title: string; docId: string }) => {
  const [value, setValue] = useState<string>(title ?? "");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { SuccessToast, ErrorToast } = useAppToasts();
  const apiUtils = api.useUtils();
  const editTitle = api.document.updateDocs.useMutation();

  const handleSave = async () => {
    if (value.trim() === "" || value === title) {
      setIsEditing(false);
      return;
    }

    editTitle.mutate(
      { docId, title: value.trim() },
      {
        onSuccess: () => {
          apiUtils.document.getDocsbyId.invalidate({ docId });
          SuccessToast({
            title: "Document title updated successfully",
          });
          setIsEditing(false);
        },
        onError: () => {
          ErrorToast({
            title: "Failed to update document title",
          });
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setValue(title);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-2 pl-1">
      {isEditing ? (
        <div className="flex items-center gap-1">
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="rounded-sm border px-1 text-sm font-medium focus:outline-none"
            autoFocus
          />
          {editTitle.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          ) : (
            <>
              <Check
                className="h-4 w-4 cursor-pointer text-green-600"
                onClick={handleSave}
              />
              <X
                className="h-4 w-4 cursor-pointer text-red-600"
                onClick={() => {
                  setValue(title);
                  setIsEditing(false);
                }}
              />
            </>
          )}
        </div>
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className="flex cursor-pointer items-center gap-x-2 truncate px-1.5 font-inter text-sm font-medium text-primary"
        >
          <File size={16} />
          {title || "Untitled Document"}
          <CloudCogIcon className="text-muted-foreground ml-1 h-3.5 w-3.5" />
        </span>
      )}
    </div>
  );
};

export default DocumentsTitle;
