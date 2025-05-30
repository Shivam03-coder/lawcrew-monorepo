import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import RouteLoader from "@/utils/route-loader";
import ClientNavbar from "./client-navbar";
import ClientAppsidebar from "./client-app-sidebar";
const AdminRootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <main className="flex h-screen w-full overflow-hidden">
      <SidebarProvider defaultOpen={defaultOpen}>
        <ClientAppsidebar />
        <div className="flex h-full flex-1 flex-col overflow-hidden">
          <ClientNavbar />
          <div className="flex-1 overflow-y-auto px-4">
            <RouteLoader />
            {children}
          </div>
        </div>
      </SidebarProvider>
    </main>
  );
};

export default AdminRootLayout;
