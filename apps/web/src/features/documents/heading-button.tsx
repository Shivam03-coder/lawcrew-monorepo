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
  
  interface HeadingLevelButtonProps {
    editor: Editor | null;
  }
  
  const HeadingLevelButton = ({ editor }: HeadingLevelButtonProps) => {
    const headings = [
      {
        label: "Normal Text",
        value: 0,
        fontSize: "16px",
      },
      {
        label: "Heading 1",
        value: 1,
        fontSize: "32px",
      },
      {
        label: "Heading 2",
        value: 2,
        fontSize: "28px",
      },
      {
        label: "Heading 3",
        value: 3,
        fontSize: "24px",
      },
      {
        label: "Heading 4",
        value: 4,
        fontSize: "20px",
      },
      {
        label: "Heading 5",
        value: 5,
        fontSize: "18px",
      },
    ];
  
    const getCurrentHeading = () => {
      if (editor?.isActive("paragraph")) {
        return "Normal Text";
      }
      for (let level = 1; level <= 5; level++) {
        if (editor?.isActive("heading", { level })) {
          return `Heading ${level}`;
        }
      }
      return "Normal Text";
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-7 min-w-[120px] shrink-0 items-center justify-between rounded-sm">
            <span className="truncate">{getCurrentHeading()}</span>
            <ChevronDownIcon className="ml-2 size-4 shrink-0" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuSeparator />
          {headings.map(({ fontSize, label, value }) => (
            <DropdownMenuItem
              key={value}
              onClick={() => {
                if (!editor) return;
                if (value === 0) {
                  editor.chain().focus().setParagraph().run();
                } else {
                  editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: value as 1 | 2 | 3 | 4 | 5 })
                    .run();
                }
              }}
              className={cn(
                "px-1.5 py-1 text-lg",
                (value === 0 &&
                  editor?.isActive("paragraph") &&
                  "bg-neutral-400") ||
                  (value > 0 &&
                    editor?.isActive("heading", { level: value }) &&
                    "bg-neutral-400"),
              )}
              style={{
                fontSize,
              }}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default HeadingLevelButton;