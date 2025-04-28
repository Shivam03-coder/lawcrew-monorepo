"use client";

import Link from "next/link";
import {
  Bot,
  Home,
  Info,
  Briefcase,
  Newspaper,
  Mail,
  Scale,
  Grip,
} from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { useState } from "react";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import useMount from "@/hooks/use-mount";
import ThemeToggle from "@/components/theme-toogle";
import AppHeaderNavMenu from "@/components/nav-menu";

const Navbar = () => {
  const isMobile = useMediaQuery("(min-width: 968px)");
  const [open, setOpen] = useState<boolean>(false);
  const clerk = useClerk();
  const mount = useMount();
  if (!mount) return null;
  return (
    <header className="sticky top-0 z-50 mx-auto rounded-xl bg-transparent p-3 font-lexend backdrop-blur">
      {clerk.loaded && (
        <div className="flex h-14 w-full items-center justify-between px-2 sm:px-8">
          <MobileNavigation open={open} setOpen={setOpen} />
          <div className="flex-2 md:flex">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="flex items-center gap-x-2">
                <Image
                  src="/logo.png"
                  alt="LawCrew Logo"
                  width={40}
                  height={40}
                />
                <h1 className="inline-flex items-center gap-x-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
                  LAWCREW
                </h1>
              </div>
            </Link>
            {isMobile && <AppHeaderNavMenu />}
          </div>
          {/* Mobile Menu Button */}

          {/* Auth Buttons */}
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <ThemeToggle />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

interface MobileNavigationProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const MobileNavigation = ({ open, setOpen }: MobileNavigationProps) => {
  const Navs = [
    { label: "Home", icon: Home, link: "/" },
    { label: "About Us", icon: Info, link: "/about" },
    { label: "Services", icon: Briefcase, link: "/services" },
    { label: "Blogs", icon: Newspaper, link: "/blogs" },
    { label: "Contact Us", icon: Mail, link: "/contact" },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 md:hidden"
          aria-label="Main menu"
          onClick={() => setOpen(!open)}
        >
          <Grip size={33} className="textDark" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="card w-[300px] p-2 font-lexend" align="start">
        <nav className="flex flex-col gap-4">
          {Navs.map((item, index) => (
            <div key={item.link}>
              <Link
                href={item.link}
                className="textDark flex w-full items-center gap-x-3 px-4 py-2 transition-all duration-150 hover:translate-x-10"
              >
                <item.icon className="h-5 w-5 text-primary dark:text-blue-200" />{" "}
                {item.label}
              </Link>
              {index < Navs.length - 1 && <Separator className="bg-primary" />}
            </div>
          ))}
        </nav>
      </PopoverContent>
    </Popover>
  );
};
