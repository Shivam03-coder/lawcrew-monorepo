"use client";

import { TableShell } from "@/components/data-table/table-shell";
import { TableToolbar } from "@/components/data-table/table-toolbar";
import { userColumns } from "./members-cols";
import { Participants } from "@/types/global";

export default function MembersTable({ data }: { data: Participants[] }) {
  return (
    <div className="p-3">
      <TableShell
        columns={userColumns}
        data={data}
        renderToolbar={(table) => <TableToolbar table={table} />}
      />
    </div>
  );
}
