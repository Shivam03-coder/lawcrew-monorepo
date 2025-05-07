"use client";
import React from "react";
import {
  Home,
  Calendar,
  Settings,
  User2,
  ChevronUp,
  CheckSquare,
  Ellipsis,
  Projector,
  ChevronDown,
  Plus,
  PlusCircleIcon,
  UserCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
import useAuth from "@/hooks/use-auth";
import useAppLinks from "@/hooks/use-app-links";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useMount from "@/hooks/use-mount";

const AdminAppsidebar = () => {
  const user = useAuth();
  const links = useAppLinks();
  const Mount = useMount()
  if (!links || Object.values(links).some((link) => !link)) return null;

  const items = [
    {
      title: "Home",
      url: links?.base,
      icon: Home,
    },
    {
      title: "Task",
      url: links?.tasks,
      icon: CheckSquare,
    },
    {
      title: "Clients",
      url: links?.clientList,
      icon: UserCircle,
    },
    {
      title: "Members",
      url: links?.memberList,
      icon: Users,
    },
    {
      title: "Case",
      url: links?.cases,
      icon: Gavel,
    },
    {
      title: "Calendar",
      url: links?.calendar,
      icon: Calendar,
    },
    {
      title: "Contacts",
      url: links?.contacts,
      icon: Contact,
    },
    {
      title: "Settings",
      url: links?.settings,
      icon: Settings,
    },
    {
      title: "Add Case",
      url: links?.addcase,
      icon: PlusCircleIcon,
    },
  ];
  if(!Mount) return null
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
                      <span className="text-primary">{item.title}</span>
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
