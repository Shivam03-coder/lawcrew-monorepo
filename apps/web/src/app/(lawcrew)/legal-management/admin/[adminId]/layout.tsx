import AdminAppsidebar from "@/components/pages/_legal-management/_admin/admin-app-sidebar";
import AdminNavbar from "@/components/pages/_legal-management/_admin/admin-navabar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

const AdminRootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <main className="flex min-h-screen w-full flex-col">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AdminAppsidebar />
        <div className="w-full">
          <AdminNavbar />
          <div className="px-4">{children}</div>
        </div>
      </SidebarProvider>
    </main>
  );
};

export default AdminRootLayout;
