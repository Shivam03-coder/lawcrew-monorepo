import type { Editor } from "@tiptap/react";
interface ListButtonProps {
  editor: Editor | null;
}
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { List, ListIcon, ListOrderedIcon } from "lucide-react";

const ListButton = ({ editor }: ListButtonProps) => {
  const Lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      value: "bulletList",
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Order List",
      icon: ListOrderedIcon,
      value: "orderedList",
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="center cursor-pointer rounded-sm p-1 text-sm hover:bg-neutral-100"
          aria-label="Highlight Text"
        >
          <List className="cursor-pointer" size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white p-4">
        {Lists.map(({ label, icon: Icon, value, onClick }) => (
          <DropdownMenuItem
            key={label}
            onClick={onClick}
            className={cn(
              "flex items-center gap-x-2",
              editor?.isActive(value) && "bg-neutral-300",
            )}
          >
            <Icon className="mr-2 size-4" /> {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ListButton;