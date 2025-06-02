"use client";
import React from "react";
import { Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import Image from "next/image";
import { Gavel } from "lucide-react";
import useMount from "@/hooks/use-mount";
import useAppLinks from "@lawcrew/navigations";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserProfile from "@/components/shared/user-profile";
const MemberAppsidebar = () => {
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
      title: "Case",
      url: links?.cases,
      icon: Gavel,
      tooltip: "View and manage legal cases",
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
              <UserProfile />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </TooltipProvider>
    </Sidebar>
  );
};

export default MemberAppsidebar;
