"use client";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import useMount from "@/hooks/use-mount";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleDarkMode } from "@/store/states/global";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.global);

  const isMounted = useMount();
  if (!isMounted) return null;

  return (
    <Button
      size="icon"
      onClick={() => dispatch(toggleDarkMode())}
      variant={ "ghost"}
      className="text-dark dark:text-secondary bg-none"
    >
      {isDarkMode ? <Moon className="size-6" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
};

export default ThemeToggle;
