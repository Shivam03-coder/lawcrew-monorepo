"use client";
import LoaderSpinner from "@/components/shared/laoder";
import { api } from "@lawcrew/trpc-client/src/client";
import React from "react";
import { LegalCaseType } from "@/types/global";
import CaseListTable from "@/app/(lawcrew)/legal-management/admin/cases/case-list-table";

const CaseListPage = () => {
  const { data, isLoading } = api.litigation.getCasedetails.useQuery();
  if (isLoading) return <LoaderSpinner />;
  return <CaseListTable data={data?.caseDetails as LegalCaseType[]} />;
};

export default CaseListPage;
