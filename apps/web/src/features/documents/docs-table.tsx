"use client";

import { TableShell } from "@/components/data-table/table-shell";
import { TableToolbar } from "@/components/data-table/table-toolbar";
import { DocumentsType } from "@/types/global";
import ExportToExcel from "@/components/shared/export-to-excel";
import { Row } from "@tanstack/react-table";
import { api } from "@lawcrew/trpc-client/src/client";
import { useAppToasts } from "@/hooks/use-app-toast";
import { documentColumns } from "./docs-table-cols";

export default function DocsTable({ doc }: { doc: DocumentsType[] }) {
  const DeleteParticipant = api.document.deleteDoc.useMutation();
  const { SuccessToast } = useAppToasts();
  const apiUtils = api.useUtils();
  const handleDelete = async (rows: Row<DocumentsType>[]) => {
    const id = rows[0]?.original.id;
    if (!id) return;
    await DeleteParticipant.mutateAsync(
      { docId: id },
      {
        onSuccess: () => {
          SuccessToast({
            title: "Documnet Deleted",
            description: "The documnet has been deleted successfully.",
          });
          apiUtils.document.getAllDocs.invalidate();
        },
        onError: (error) => {
          SuccessToast({
            title: "Error Deleting Documnet",
            description: error.message,
          });
        },
      },
    );
  };

  return (
    <div className="pt-3">
      <TableShell
        columns={documentColumns}
        data={doc}
        onDelete={handleDelete}
        renderToolbar={(table) => <TableToolbar table={table} />}
        addToolbar={
          <div className="flex items-center gap-2">
            <ExportToExcel data={doc} fileName="clients" />
          </div>
        }
      />
    </div>
  );
}
