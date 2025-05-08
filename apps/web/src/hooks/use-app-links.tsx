import useAuth from "@/hooks/use-auth";

const useAppLinks = () => {
  const user = useAuth();

  if (!user?.role || !user?.id) return null;

  const legalBasePath = `/legal-management/${user.role.toLowerCase()}/${user.id}`;

  return {
    base: legalBasePath,
    clientList: `${legalBasePath}/client-list`,
    memberList: `${legalBasePath}/member-list`,
    cases: `${legalBasePath}/cases`,
    calendar: `${legalBasePath}/calendar`,
    tasks: `${legalBasePath}/tasks`,
    contacts: `${legalBasePath}/contacts`,
    settings: `${legalBasePath}/settings`,
    addcase: `${legalBasePath}/add-case`,
    documents: `${legalBasePath}/documents`,
  };
};

export default useAppLinks;
