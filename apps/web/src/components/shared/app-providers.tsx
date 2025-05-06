"use client";

import { useEffect } from "react";
import { Toaster } from "../ui/toaster";
import useThemeStore from "@/store/user-theme-store";
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <div className="text-primary-600 flex min-h-screen w-full">
      <main className="dark:bg-dark-primary flex w-full flex-col">
        {children}
      </main>
    </div>
  );
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      <AppLayout>{children}</AppLayout>
    </>
  );
};

export default AppProvider;
