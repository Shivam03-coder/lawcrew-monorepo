"use client";
import LoaderSpinner from "@/components/shared/laoder";
import { api } from "@lawcrew/trpc-client/src/client";
import React from "react";
import CaseListTable from "./case-list-table";
import { LegalCaseType } from "@/types/global";

const page = () => {
  const { data, isLoading } = api.litigation.getCasedetails.useQuery();
  if (isLoading) return <LoaderSpinner />;
  return <CaseListTable data={data?.caseDetails as LegalCaseType[]} />;
};

export default page;
