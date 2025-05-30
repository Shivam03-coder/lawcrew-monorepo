"use client";
import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import useAppLinks from "@lawcrew/navigations";

const Header = () => {
  const links = useAppLinks();
  const userCrumbs = [
    { label: "Dashboard", href: links?.base },
    { label: "Clinets-List", href: links?.clientList },
  ];
  return <AppBreadcrumb items={userCrumbs} />;
};

export default Header;
