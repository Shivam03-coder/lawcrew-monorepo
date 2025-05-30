import { TableShell } from "@/components/shared/table-shell";
import React from "react";
import { caseTableColumns } from "./clients-case-table-cols";
import { ClientCaseList } from "@/types/global";
import ExportToExcel from "@/components/shared/export-to-excel";
import { TableToolbar } from "@/components/shared/table-toolbar";

const ClientsCaseTable = ({ data }: { data: ClientCaseList[] }) => {
  return (
    <div className="pt-3">
      <TableShell
        columns={caseTableColumns}
        data={data}
        renderToolbar={(table) => <TableToolbar table={table} />}
        addToolbar={
          <div className="flex items-center gap-2">
            <ExportToExcel data={data} fileName="clients" />
          </div>
        }
      />
    </div>
  );
};

export default ClientsCaseTable;
