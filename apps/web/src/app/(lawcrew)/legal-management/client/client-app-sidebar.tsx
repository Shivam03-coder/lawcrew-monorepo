"use client";
import React from "react";
import { Home, User2, Ellipsis } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Gavel } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import useMount from "@/hooks/use-mount";
import useAppLinks from "@lawcrew/navigations";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@lawcrew/trpc-client/src/client";
import { useRouter } from "next/navigation";
import { useAppToasts } from "@/hooks/use-app-toast";
const ClientAppsidebar = () => {
  const links = useAppLinks();
  const Mount = useMount();
  if (!links || Object.values(links).some((link) => !link)) return null;
  const Logout = api.user.logout.useMutation();
  const { ErrorToast, SuccessToast } = useAppToasts();

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

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await Logout.mutateAsync(undefined, {
        onSuccess: (data) => {
          router.push("/sign-in");
          SuccessToast({
            title: data.message,
          });
        },
        onError: (error) => {
          ErrorToast({
            title: error.message,
          });
        },
      });
    } catch (error) {
      console.error("Unexpected error during logout:", error);
    }
  };

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
                <DropdownMenuContent className="bg-white" align="end">
                  <DropdownMenuItem>Account</DropdownMenuItem>
                  <Separator className="bg-gray-200" />
                  <DropdownMenuItem>Setting</DropdownMenuItem>
                  <Separator className="bg-gray-200" />
                  <DropdownMenuItem onClick={handleLogout}>
                    Sign out
                  </DropdownMenuItem>
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

export default ClientAppsidebar;
