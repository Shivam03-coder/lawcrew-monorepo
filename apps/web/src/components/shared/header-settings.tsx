"use client";
import { api } from "@lawcrew/trpc-client/src/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Bell,
  Cloud,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Plus,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "./theme-toogle";

const HeaderSettings = () => {
  const { data, isLoading } = api.auth.userinfo.useQuery();
  if (!data || isLoading) return null;
  const name = data?.user?.userName.slice(0, 2).toUpperCase();
  if (!name) return;
  return (
    <>
      <button className="rounded-lg p-2 text-gray-500 dark:text-secondary">
        <Bell size={20} />
      </button>
      <ThemeToggle />
      <button className="rounded-lg p-2 text-primary">
        <Settings className="text-primary" size={20} />
      </button>
      <UserProfile
        userName={name as string}
        userProfile={data?.user?.userProfile as string}
      />
    </>
  );
};

export default HeaderSettings;

const UserProfile = ({
  userName,
  userProfile,
}: {
  userName: string;
  userProfile: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={userProfile}
              alt={`Profile picture of ${userName}`}
            />
            <AvatarFallback className="border border-blue-500 bg-primary text-white">
              {userName}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="textDark mr-9 bg-white font-lexend dark:bg-primary">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPlus />
            <span>Invite Users</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPlus />
            <span>Invite Client</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Plus />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
