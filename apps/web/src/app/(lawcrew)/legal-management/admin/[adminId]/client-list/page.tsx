"use client";
import ClientsTable from "@/features/legal-management/_admin/clients-list/clients-table";
import DataLoader from "@/components/shared/loader";
import { api } from "@lawcrew/trpc-client/src/client";

const ClientListPage = () => {
  const { data: users = [], isLoading } = api.participant.getClient.useQuery();
  if (isLoading) return <DataLoader />;

  return <ClientsTable data={users} />;
};

export default ClientListPage;
