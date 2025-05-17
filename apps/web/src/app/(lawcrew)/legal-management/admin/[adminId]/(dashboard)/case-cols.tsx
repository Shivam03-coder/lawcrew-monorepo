"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
export interface Case {
  id: string;
  caseTitle: string;
  caseType: "Criminal" | "Civil" | "Corporate" | "Family";
  startDate: string;
  dueDate: string;
  clientName: string;
  payment: number;
  paymentStatus: "Paid" | "Pending" | "Overdue";
}

export const caseColumns: ColumnDef<Case>[] = [
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
    accessorKey: "id",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Case ID <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "caseTitle",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Case Title <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "caseType",
    header: "Case Type",
    cell: ({ row }) => {
      const type = row.getValue("caseType");
      const colorMap: Record<string, string> = {
        Criminal: "bg-red-500",
        Civil: "bg-blue-500",
        Corporate: "bg-green-500",
        Family: "bg-yellow-500",
      };
      //   @ts-ignore
      return <Badge className={colorMap[type] + " text-white"}>{type}</Badge>;
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const start = new Date(row.getValue("startDate"));
      return <span>{start.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const due = new Date(row.getValue("dueDate"));
      return <span>{due.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "clientName",
    header: "Client Name",
  },
  {
    accessorKey: "payment",
    header: "Payment (₹)",
    cell: ({ row }) => `₹${row.getValue("payment")}`,
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.getValue("paymentStatus");
      const colorMap: Record<string, string> = {
        Paid: "bg-green-500",
        Pending: "bg-yellow-500",
        Overdue: "bg-red-500",
      };
      return (
        //   @ts-ignore
        <Badge className={colorMap[status] + " text-white"}>{status}</Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const caseItem = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(caseItem.id)}
            >
              Copy Case ID
            </DropdownMenuItem>
            <DropdownMenuItem>View Case</DropdownMenuItem>
            <DropdownMenuItem>Edit Case</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];