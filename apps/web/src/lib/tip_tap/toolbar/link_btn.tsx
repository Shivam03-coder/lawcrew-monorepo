"use client";
import React, { useState } from "react";
import type { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface LinkBtnProps {
  editor: Editor | null;
}
const LinkBtn = ({ editor }: LinkBtnProps) => {
  const [value, setValue] = useState<string>(
    editor?.getAttributes("link").href || "",
  );
  const onChange = (href: string) => {
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: value })
      .run();

    setValue("");
  };
  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          className="center cursor-pointer rounded-sm p-1 text-sm hover:bg-neutral-100"
          aria-label="Highlight Text"
        >
          <Link2Icon className="cursor-pointer" size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex items-center gap-x-2 bg-white p-4">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button className="text-secondary" onClick={() => onChange(value)}>
          Apply
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinkBtn;
