"use client";

import HeaderSettings from "@/components/shared/header-settings";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";
import Link from "next/link";

const ClientNavbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="textDark left-0 top-0 flex items-center justify-between border-2 border-b border-dashed bg-white px-3 py-2 dark:bg-primary print:hidden">
      <div className="ml-4 flex items-center">
        <Button className="shadow-none" size={"icon"} onClick={toggleSidebar}>
          <PanelLeft size={9} />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Link href={"/dashboard"} />
        <HeaderSettings />
      </div>
    </nav>
  );
};

export default ClientNavbar;
