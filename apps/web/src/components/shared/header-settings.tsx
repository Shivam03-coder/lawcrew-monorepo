"use client";
import ThemeToggle from "@/components/theme-toogle";
import { Bell, Settings } from "lucide-react";

const HeaderSettings = () => {
  return (
    <>
      <button className="rounded-lg p-2 text-gray-500 dark:text-secondary">
        <Bell size={20} />
      </button>
      <ThemeToggle />
      <button className="rounded-lg p-2 text-gray-500 dark:text-secondary">
        <Settings size={20} />
      </button>
      {/* User Profile */}
      <div className="ml-2 flex items-center">AB</div>
    </>
  );
};

export default HeaderSettings;
