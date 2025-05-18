"use client";

import { TableShell } from "@/components/shared/table-shell";
import { TableToolbar } from "@/components/shared/table-toolbar";
import { LegalCaseType } from "@/types/global";
import ExportToExcel from "@/components/shared/export-to-excel";
import { caseTableColumns } from "./case-table-cols";

function CaseListTable({ data }: { data: LegalCaseType[] }) {
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
}

export default CaseListTable;
