import AdminAppsidebar from "@/features/legal-management/_admin/admin-app-sidebar";
import AdminNavbar from "@/features/legal-management/_admin/admin-navabar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

const AdminRootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <main className="flex min-h-screen w-full flex-col">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AdminAppsidebar />
        <div className="w-full overflow-x-visible">
          <AdminNavbar />
          <div>{children}</div>
        </div>
      </SidebarProvider>
    </main>
  );
};

export default AdminRootLayout;
