import type { Editor } from "@tiptap/react";
import { type ColorResult, CirclePicker } from "react-color";
interface HighlighterProps {
  editor: Editor | null;
}
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlignCenter,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const AlignButton = ({ editor }: HighlighterProps) => {
  const align: {
    label: string;
    value: string;
    icon: LucideIcon;
  }[] = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenter,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="center cursor-pointer rounded-sm p-1 text-sm hover:bg-neutral-100"
          aria-label="Align Text"
        >
          <AlignLeftIcon className="size-5 cursor-pointer" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white p-4">
        {align.map(({ label, value, icon: Icon }) => (
          <DropdownMenuItem
            key={label}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center gap-x-2",
              editor?.isActive({ textAlign: value }) ? "bg-neutral-300" : "",
            )}
          >
            <Icon className="mr-2 size-4" /> {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AlignButton;