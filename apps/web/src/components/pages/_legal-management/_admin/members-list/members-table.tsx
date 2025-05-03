"use client";

import { TableShell } from "@/components/data-table/table-shell";
import { TableToolbar } from "@/components/data-table/table-toolbar";
import { Participants } from "@/types/global";
import ExportToExcel from "@/components/shared/export-to-excel";
import { Row } from "@tanstack/react-table";
import { api } from "@lawcrew/trpc-client/src/client";
import { useAppToasts } from "@/hooks/use-app-toast";
import { userColumns } from "./members-cols";
import AddMember from "./add-members";

export default function MembersTable({ data }: { data: Participants[] }) {
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
            title: "Member Deleted",
            description: "The member has been deleted successfully.",
          });
          apiUtils.participant.getMember.invalidate();
        },
        onError: (error) => {
          SuccessToast({
            title: "Error Deleting Member",
            description: error.message,
          });
        },
      },
    );
  };

  return (
    <div className="pt-3">
      <TableShell
        columns={userColumns}
        data={data}
        onDelete={handleDelete}
        renderToolbar={(table) => <TableToolbar table={table} />}
        addToolbar={
          <div className="flex items-center gap-2">
            <AddMember />
            <ExportToExcel data={data} fileName="clients" />
          </div>
        }
      />
    </div>
  );
}
