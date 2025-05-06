"use client";
import MembersTable from "@/features/legal-management/_admin/members-list/members-table";
import DataLoader from "@/components/shared/loader";
import { api } from "@lawcrew/trpc-client/src/client";

const MembersListPage = () => {
  const { data: users = [], isLoading } = api.participant.getMember.useQuery();
  if (isLoading) return <DataLoader />;
  console.log("🚀 ~ MembersListPage ~ users:", users);

  return <MembersTable data={users} />;
};

export default MembersListPage;
