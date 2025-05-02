"use client";
import HeaderSettings from "@/components/shared/header-settings";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu, PanelLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const AdminNavbar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <nav className="flex items-center justify-between border border-b px-3 py-2">
      <Button
        className="hover:bg-neutral bg-gray-100 shadow-none"
        size={"icon"}
        onClick={toggleSidebar}
      >
        <PanelLeft size={9} />
      </Button>
      <div className="flex items-center gap-4">
        <Link href={"/dashboard"} />
        <HeaderSettings />
      </div>
    </nav>
  );
};

export default AdminNavbar;
