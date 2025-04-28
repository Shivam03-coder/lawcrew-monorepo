import type { Editor } from "@tiptap/react";
import { type ColorResult, CirclePicker } from "react-color";
interface HighlighterProps {
  editor: Editor | null;
}
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HighlighterIcon } from "lucide-react";

const Highlighter = ({ editor }: HighlighterProps) => {
  const value = editor?.getAttributes("textStyle").color || "#000000";
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="center cursor-pointer rounded-sm p-1 text-sm hover:bg-neutral-100"
          aria-label="Highlight Text"
        >
          <HighlighterIcon className="cursor-pointer" size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white p-4">
        <CirclePicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Highlighter;
