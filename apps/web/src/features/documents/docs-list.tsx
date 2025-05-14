"use client";
import DataLoader from "@/components/shared/loader";
import { api } from "@lawcrew/trpc-client/src/client";
import DocsTable from "./docs-table";

const DocsList = () => {
  const { data: docs = [] } = api.document.getAllDocs.useQuery();

  return <DocsTable doc={docs} />;
};

export default DocsList;
