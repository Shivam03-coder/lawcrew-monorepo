"use client";
import LoaderSpinner from "@/components/shared/laoder";
import { api } from "@lawcrew/trpc-client/src/client";
import MembersListTable from "./members-list-table";

const MembersListPage = () => {
  const { data: users = [], isLoading } = api.participant.getMember.useQuery();
  if (isLoading) return <LoaderSpinner />;
  // @ts-ignore
  return <MembersListTable data={users} />;
};

export default MembersListPage
