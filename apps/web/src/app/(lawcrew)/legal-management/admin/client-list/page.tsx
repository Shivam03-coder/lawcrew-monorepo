"use client";
import { api } from "@lawcrew/trpc-client/src/client";
import ClientsListTable from "./clients-list-table";

const ClientListPage = () => {
  const { data: users } = api.participant.getClient.useQuery();
  return <ClientsListTable data={users || []} />;
};

export default ClientListPage;
