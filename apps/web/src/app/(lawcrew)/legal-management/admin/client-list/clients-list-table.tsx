"use client";

import { TableShell } from "@/components/shared/table-shell";
import { TableToolbar } from "@/components/shared/table-toolbar";
import { ClientListType, Participants } from "@/types/global";
import ExportToExcel from "@/components/shared/export-to-excel";
import { Row } from "@tanstack/react-table";
import { api } from "@lawcrew/trpc-client/src/client";
import { useAppToasts } from "@/hooks/use-app-toast";
import { clientTableColumns } from "./clients-table-cols";
import AddClientBtn from "./add-client-btn";

export default function ClientsListTable({ data }: { data: ClientListType[] }) {
  const DeleteParticipant = api.participant.deleteParticipant.useMutation();
  const { SuccessToast } = useAppToasts();
  const apiUtils = api.useUtils();
  const handleDelete = async (rows: Row<Participants>[]) => {
    const id = rows[0]?.original.id;
    if (!id) return;
    await DeleteParticipant.mutateAsync(
      { id },
      {
        onSuccess: () => {
          SuccessToast({
            title: "Client Deleted",
            description: "The client has been deleted successfully.",
          });
          apiUtils.participant.getClient.invalidate();
        },
        onError: (error) => {
          SuccessToast({
            title: "Error Deleting Client",
            description: error.message,
          });
        },
      },
    );
  };

  return (
    <div className="pt-3">
      <TableShell
        columns={clientTableColumns}
        data={data}
        onDelete={handleDelete}
        renderToolbar={(table) => <TableToolbar table={table} />}
        addToolbar={
          <div className="flex items-center gap-2">
            <AddClientBtn />
            <ExportToExcel data={data} fileName="clients" />
          </div>
        }
      />
    </div>
  );
}
