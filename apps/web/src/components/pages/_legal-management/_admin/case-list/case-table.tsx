"use client";
import React from "react";
import { Case, caseColumns } from "./case-cols";
import { TableToolbar } from "@/components/data-table/table-toolbar";
import { TableShell } from "@/components/data-table/table-shell";

export const caseData: Case[] = Array.from({ length: 20 }, (_, i) => ({
  id: `CASE-${1000 + i}`,
  caseTitle: `Case Title ${i + 1}`,
  caseType: ["Criminal", "Civil", "Corporate", "Family"][
    i % 4
  ] as Case["caseType"],
  startDate: new Date(2024, i % 12, ((i + 5) % 28) + 1).toISOString(),
  dueDate: new Date(2024, (i + 2) % 12, ((i + 10) % 28) + 1).toISOString(),
  clientName: `Client ${i + 1}`,
  payment: 5000 + i * 100,
  paymentStatus: ["Paid", "Pending", "Overdue"][i % 3] as Case["paymentStatus"],
}));

const CaseTable = () => {
  return (
      <TableShell
        columns={caseColumns}
        data={caseData}
        renderToolbar={(table) => <TableToolbar table={table} />}
      />
  );
};

export default CaseTable;
