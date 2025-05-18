"use client";
import React from "react";
import {
  Home,
  Calendar,
  Settings,
  User2,
  CheckSquare,
  Ellipsis,
  PlusCircleIcon,
  UserCircle,
  Files,
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
import useMount from "@/hooks/use-mount";
import useAppLinks from "@lawcrew/navigations";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const AdminAppsidebar = () => {
  const links = useAppLinks();
  const Mount = useMount();
  if (!links || Object.values(links).some((link) => !link)) return null;

  const items = [
    {
      title: "Home",
      url: links?.base,
      icon: Home,
      tooltip: "Go to your dashboard home",
    },

    {
      title: "Clients",
      url: links?.clientList,
      icon: UserCircle,
      tooltip: "View and manage client details",
    },
    {
      title: "Members",
      url: links?.memberList,
      icon: Users,
      tooltip: "Team members and their roles",
    },
    {
      title: "Case",
      url: links?.cases,
      icon: Gavel,
      tooltip: "View and manage legal cases",
    },
    {
      title: "Documents",
      url: links?.documents,
      icon: Files,
      tooltip: "Manage case-related files",
    },
    {
      title: "Contacts",
      url: links?.contacts,
      icon: Contact,
      tooltip: "Manage professional contacts",
    },
    {
      title: "Settings",
      url: links?.settings,
      icon: Settings,
      tooltip: "Change app and account settings",
    },
    {
      title: "Add Case",
      url: links?.addcase,
      icon: PlusCircleIcon,
      tooltip: "Create a new legal case",
    },
  ];

  if (!Mount) return null;
  return (
    <Sidebar collapsible="icon">
      <TooltipProvider delayDuration={300}>
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
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link href={item.url}>
                            <item.icon />
                            <span className="text-primary">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-[300px]">
                        {item.tooltip}
                      </TooltipContent>
                    </Tooltip>
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
      </TooltipProvider>
    </Sidebar>
  );
};

export default AdminAppsidebar;
