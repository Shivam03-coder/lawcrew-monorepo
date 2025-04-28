import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import type { Editor } from "@tiptap/react";
import { ChevronDownIcon } from "lucide-react";
interface FontfamilyButtonprops {
  editor: Editor | null;
}

const FontfamilyButton = ({ editor }: FontfamilyButtonprops) => {
  const Fonts = [
    {
      label: "Arial",
      value: "Arial",
    },
    {
      label: "Helvetica",
      value: "Helvetica",
    },
    {
      label: "Times New Roman",
      value: "Times New Roman",
    },
    {
      label: "Verdana",
      value: "Verdana",
    },
    {
      label: "Courier New",
      value: "Courier New",
    },
    {
      label: "Georgia",
      value: "Georgia",
    },
    {
      label: "Impact",
      value: "Impact",
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-7 min-w-[70px] shrink-0 items-center justify-between rounded-sm">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel>EDITOR FONTS</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Fonts.map((font) => (
          <DropdownMenuItem
            onClick={() =>
              editor?.chain().focus().setFontFamily(font.value).run()
            }
            key={`font-${font.value}`}
            className={cn(
              "px-1.5 py-1 text-lg",
              editor?.getAttributes("textStyle").fontFamily === font.value &&
                "bg-neutral-300",
            )}
            style={{
              fontFamily: font.value,
            }}
          >
            {font.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FontfamilyButton;
