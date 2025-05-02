import {
  Home,
  Calendar,
  Settings,
  User2,
  ChevronUp,
  CheckSquare,
  Ellipsis,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Users, Gavel, Contact } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Participants",
    url: "/participants",
    icon: Users,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Case",
    url: "/cases",
    icon: Gavel,
  },
  {
    title: "Task",
    url: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Contacts",
    url: "/contacts",
    icon: Contact,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const AdminAppsidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="font-inter" asChild>
              <Link href="/">
                <Image src="/logo.png" alt="logo" width={25} height={25} />
                <h4>Lawcrew.net</h4>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="text-sm">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.title === "Inbox" && (
                    <SidebarMenuBadge>24</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="rounded-xl bg-slate-50">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> John Doe <Ellipsis className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Account</DropdownMenuItem>
                <Separator className="bg-gray-200" />
                <DropdownMenuItem>Setting</DropdownMenuItem>
                <Separator className="bg-gray-200" />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
                <Separator className="bg-gray-200" />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminAppsidebar;
