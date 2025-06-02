"use client";
import { api } from "@lawcrew/trpc-client/src/client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis, User2 } from "lucide-react";
import { SidebarMenuButton } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { useAppToasts } from "@/hooks/use-app-toast";

const UserProfile = () => {
  const { data } = api.user.userinfo.useQuery();

  const Logout = api.user.logout.useMutation();
  const { ErrorToast, SuccessToast } = useAppToasts();
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <User2 /> {data?.user?.userName} <Ellipsis className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <DropdownMenuItem onClick={handleLogout}>Sign out</DropdownMenuItem>
        <Separator className="bg-gray-200" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
