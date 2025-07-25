"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  LegalCaseType,
  CaseStage,
  MatterPriority,
  PracticeArea,
} from "@/types/global";
import badgeClass from "@/utils/badge-class";
import ChatTokenBtn from "@/components/shared/chat-token-btn";
import { $Enums } from "@lawcrew/db";

export const caseTableColumns: ColumnDef<LegalCaseType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="ml-5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="mx-5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "internalRefNumber",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Ref. No. <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "arrivalDate",
    header: "Arrival",
    cell: ({ row }) => (
      <span>{new Date(row.getValue("arrivalDate")).toLocaleDateString()}</span>
    ),
  },
  {
    accessorKey: "filedDate",
    header: "Filed",
    cell: ({ row }) => (
      <span>{new Date(row.getValue("filedDate")).toLocaleDateString()}</span>
    ),
  },
  {
    accessorKey: "closedDate",
    header: "Closed",
    cell: ({ row }) => {
      const date = row.getValue("closedDate") as string | null;
      return <span>{date ? new Date(date).toLocaleDateString() : "N/A"}</span>;
    },
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => {
      const stage = row.getValue("stage") as CaseStage;
      return (
        <Badge className={badgeClass(stage)}>{stage.replace(/_/g, " ")}</Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as $Enums.CaseStatus;
      return <Badge className={badgeClass(status)}>{status}</Badge>;
    },
  },
  {
    accessorKey: "matterPriority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("matterPriority") as MatterPriority;
      return <Badge className={badgeClass(priority)}>{priority}</Badge>;
    },
  },
  {
    accessorKey: "practiseArea",
    header: "Practice Area",
    cell: ({ row }) => {
      const area = row.getValue("practiseArea") as PracticeArea;
      return (
        <Badge className={badgeClass(area)}>{area.replace(/_/g, " ")}</Badge>
      );
    },
  },
  {
    id: "opponent",
    header: "Opponent",
    cell: ({ row }) => {
      const opponent = row.original.Opponent;
      return opponent ? (
        <span>{`${opponent.firstName} ${opponent.lastName}`}</span>
      ) : (
        <span className="text-muted-foreground">N/A</span>
      );
    },
  },
  {
    id: "document",
    header: "Document",
    cell: ({ row }) => {
      const doc = row.original.caseDocument;
      return doc ? (
        <a
          href={doc.documentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          View
        </a>
      ) : (
        <span className="text-muted-foreground">N/A</span>
      );
    },
  },
  {
    id: "actions",
    header: "Discussion",
    enableHiding: false,
    cell: ({ row }) => {
      const c = row.original;
      return <ChatTokenBtn caseId={c.id} caseName={c.title} />;
    },
  },
];
