"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { ClientCaseList } from "@/types/global";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const caseTableColumns: ColumnDef<ClientCaseList>[] = [
  {
    accessorKey: "internalRefNumber",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Case Ref # <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const caseId = row.original.id;
      const router = useRouter();
      
      return (
        <Link 
          href={`/cases/${caseId}`}
          className="text-primary underline hover:text-primary/80"
        >
          {row.getValue("internalRefNumber")}
        </Link>
      );
    },
  },
  {
    accessorKey: "clientName",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Client <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const initials = row.original.clientName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Avatar className="h-8 w-8 bg-primary text-secondary">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{row.original.clientName}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "opponentName",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Opponent <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const initials = row.original.opponentName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-secondary">{initials}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{row.original.opponentName}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "membersName",
    header: "Team Members",
    cell: ({ row }) => {
      const members = row.original.membersName;
      
      return (
        <div className="flex -space-x-2">
          {members.map((member, index) => {
            const initials = member
              .split(' ')
              .map(name => name[0])
              .join('')
              .toUpperCase();
              
            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="h-8 w-8 border-2 border-white bg-primary text-secondary hover:z-10 hover:scale-110 transition-all">
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{member}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "caseStatus",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Status <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("caseStatus") as "OPEN" | "CLOSED" | "PENDING";
      
      const statusConfig = {
        OPEN: {
          color: "bg-green-100 text-green-800",
          icon: "🟢", // or use a proper icon component
        },
        CLOSED: {
          color: "bg-gray-100 text-gray-800",
          icon: "⚫",
        },
        PENDING: {
          color: "bg-yellow-100 text-yellow-800",
          icon: "🟡",
        },
      };
      
      const config = statusConfig[status] || statusConfig.OPEN;
      
      return (
        <div className="flex items-center gap-2">
          <span>{config.icon}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
            {status}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const caseData = row.original;
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(caseData.id)}
            >
              Copy Case ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push(`/cases/${caseData.id}`)}>
              View Case Details
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => router.push(`/cases/${caseData.id}/edit`)}
              disabled={caseData.caseStatus === "CLOSED"}
            >
              Edit Case
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];