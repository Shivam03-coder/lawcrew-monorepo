"use client";

import { TableShell } from "@/components/data-table/table-shell";
import { TableToolbar } from "@/components/data-table/table-toolbar";
import { Participants } from "@/types/global";
import { userColumns } from "./clients-cols";
import AddClient from "./add-client";

export default function ClientsTable({ data }: { data: Participants[] }) {
  return (
    <div className="pt-3">
      <TableShell
        columns={userColumns}
        data={data}
        renderToolbar={(table) => <TableToolbar table={table} />}
        addToolbar={<AddClient  />}
      />
    </div>
  );
}
