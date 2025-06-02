import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import RouteLoader from "@/utils/route-loader";
import MemberAppsidebar from "./member-app-sidebar";
import MemberNavbar from "./member-navbar";
const AdminRootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <main className="flex h-screen w-full overflow-hidden">
      <SidebarProvider defaultOpen={defaultOpen}>
        <MemberAppsidebar />
        <div className="flex h-full flex-1 flex-col overflow-hidden">
          <MemberNavbar />
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
