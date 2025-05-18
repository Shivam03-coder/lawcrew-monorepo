"use client";

import HeaderSettings from "@/components/shared/header-settings";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DocsNabar from "./[adminId]/documents/docs-navbar";

const AdminNavbar = () => {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();

  const shouldShowDocsNavbar = (() => {
    const match = pathname.match(/\/documents\/([^\/]+)$/);
    return Boolean(match && match[1]);
  })();

  return (
    <nav className="textDark print:hidden left-0 top-0 flex items-center justify-between border-2 border-b border-dashed bg-white px-3 py-2 dark:bg-primary">
      <div className="flex items-center ml-4">
        <Button className="shadow-none" size={"icon"} onClick={toggleSidebar}>
          <PanelLeft size={9} />
        </Button>
        {shouldShowDocsNavbar && <DocsNabar />}
      </div>
      <div className="flex items-center gap-4">
        <Link href={"/dashboard"} />
        <HeaderSettings />
      </div>
    </nav>
  );
};

export default AdminNavbar;
