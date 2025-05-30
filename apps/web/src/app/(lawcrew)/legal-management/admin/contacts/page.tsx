"use client";
import ExportToExcel from "@/components/shared/export-to-excel";
import { TableShell } from "@/components/shared/table-shell";
import { TableToolbar } from "@/components/shared/table-toolbar";
import { api } from "@lawcrew/trpc-client/src/client";
import React from "react";
import { contactTableColumns } from "./contact-table-cols";
import LoaderSpinner from "@/components/shared/laoder";

const page = () => {
  const { data, isLoading } = api.user.getContactDetails.useQuery();
  if (isLoading) return <LoaderSpinner />;
  return (
    <div className="pt-3">
      <TableShell
        columns={contactTableColumns}
        data={data!}
        renderToolbar={(table) => <TableToolbar table={table} />}
        addToolbar={
          <div className="flex items-center gap-2">
            <ExportToExcel data={data!} fileName="contacts" />
          </div>
        }
      />
    </div>
  );
};

export default page;
