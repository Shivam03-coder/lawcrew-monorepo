"use client";
import useAuth from "@lawcrew/web/src/hooks/use-user";

const useAppLinks = () => {
  const user = useAuth();

  if (!user?.role || !user?.id) return null;

  const legalBasePath = `/legal-management/${user.role.toLowerCase()}`

  return {
    base: legalBasePath,
    clientList: `${legalBasePath}/client-list`,
    memberList: `${legalBasePath}/member-list`,
    cases: `${legalBasePath}/cases`,
    casesDiscussion: `${legalBasePath}/cases/chat`,
    calendar: `${legalBasePath}/calendar`,
    tasks: `${legalBasePath}/tasks`,
    contacts: `${legalBasePath}/contacts`,
    settings: `${legalBasePath}/settings`,
    addcase: `${legalBasePath}/add-case`,
    documents: `${legalBasePath}/documents`,
  };
};

export default useAppLinks;
