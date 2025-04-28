"use client";
import React, { useState } from "react";
import type { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Image, SearchIcon, UploadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageButtonProps {
  editor: Editor | null;
}

const ImageButton = ({ editor }: ImageButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const insertImage = (src: string) => {
    if (editor) {
      editor.chain().focus().setImage({ src }).run();
    }
  };

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        setImageUrl(fileUrl);
        insertImage(fileUrl);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl.trim()) {
      insertImage(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="center cursor-pointer rounded-sm p-1 text-sm hover:bg-neutral-100"
            aria-label="Highlight Text"
          >
            <Image className="cursor-pointer" size={20} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white p-2">
          <DropdownMenuItem onClick={handleUpload}>
            <UploadIcon className="mr-2 size-4" /> Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className="mr-2 size-4" /> Paste Image URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Image URL Input Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Insert Image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter image URL..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleImageUrlSubmit()}
          />
          <DialogFooter>
            <Button className="text-secondary" onClick={handleImageUrlSubmit}>
              Insert
            </Button>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageButton;
