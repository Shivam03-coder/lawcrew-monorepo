"use client";

import DataTable from "@/components/shared/table";
import { Task } from "@/data";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="textDark"
      >
        Task
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-semibold textDark">{row.original.title}</div>
    ),
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Priority
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const priority = row.original.priority;
      const priorityColors = {
        High: "bg-red-500 text-white",
        Medium: "bg-yellow-500 text-black",
        Low: "bg-green-500 text-white",
      };
      return (
        <Badge className={`rounded-md px-2 py-1 ${priorityColors[priority]}`}>
          {priority}
        </Badge>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="rounded-md p-1 textDark">{row.original.category}</div>
    ),
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => (
      <div className="rounded-md p-1 textDark">{row.original.dueDate}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors = {
        "To Do": "bg-gray-500 text-white",
        "On Going": "bg-blue-500 text-white",
        Completed: "bg-green-500 text-white",
      };
      return (
        <Badge className={`rounded-md px-2 py-1 ${statusColors[status]}`}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "tasksCompleted",
    header: "Tasks Done",
    cell: ({ row }) => (
      <div className="rounded-md p-1 textDark">{row.original.tasksCompleted}</div>
    ),
  },
  {
    accessorKey: "totalTasks",
    header: "Total Tasks",
    cell: ({ row }) => (
      <div className="rounded-md p-1 textDark">{row.original.totalTasks}</div>
    ),
  },
];

const TaskTableViewTab = ({ data }: { data: Task[] }) => {
  return <DataTable className="mt-4" columns={columns} data={data} />;
};

export default TaskTableViewTab;
