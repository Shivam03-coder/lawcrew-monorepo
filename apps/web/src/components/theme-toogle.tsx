"use client";

import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "usehooks-ts";
import useMount from "@/hooks/use-mount";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleDarkMode } from "@/store/states/global";
import { Button } from "./ui/button";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.global);

  const isMounted = useMount();
  if (!isMounted) return null;

  return (
    <Button
      size="icon"
      onClick={() => dispatch(toggleDarkMode())}
      className="rounded-full bg-transparent p-2 transition-all dark:text-secondary"
    >
      {isDarkMode ? <Moon className="size-6" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
};

export default ThemeToggle;
