import AdminAppsidebar from "@/features/legal-management/_admin/admin-app-sidebar";
import AdminNavbar from "@/features/legal-management/_admin/admin-navabar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

const AdminRootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <main className="flex h-screen w-full overflow-hidden">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AdminAppsidebar />
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <AdminNavbar />
          <div className="flex-1 overflow-y-auto px-4">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </main>
  );
};

export default AdminRootLayout;
