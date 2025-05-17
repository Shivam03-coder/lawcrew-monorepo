"use client";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import useMount from "@/hooks/use-mount";
import useThemeStore from "@/store/user-theme-store";

const ThemeToggle = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);
  

  const isMounted = useMount();
  if (!isMounted) return null;

  return (
    <Button
      size="icon"
      onClick={() => toggleDarkMode()}
      variant={"ghost"}
      className="bg-none text-dark dark:text-secondary"
    >
      {isDarkMode ? <Moon className="size-6" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
};

export default ThemeToggle;
