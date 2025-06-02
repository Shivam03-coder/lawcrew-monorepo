"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  FileTextIcon,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
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
import { format } from "date-fns";
import { DocumentsType } from "@/types/global";
import { useState } from "react";
import { api } from "@lawcrew/trpc-client/src/client";
import { useAppToasts } from "@/hooks/use-app-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import RenameDocs from "./rename-docs";
import Link from "next/link";
import useAppLinks from "@lawcrew/navigations";

export const documentColumns: ColumnDef<DocumentsType>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Document Title <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const title = row.getValue("title") as string | null;
      const c = row.original;
      const links = useAppLinks();
      return (
        <Link
          href={`${links?.documents}/${c.id}`}
          className="flex items-center gap-2 font-medium"
        >
          <FileTextIcon className="h-4 w-4 text-main" />
          <span>{title}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Created At <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <span>{format(date, "PPp")}</span>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Last Updated <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      return <span>{format(date, "PPp")}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const document = row.original;
      const [openRename, setOpenRename] = useState(false);
      const [openAlert, setOpenAlert] = useState(false); // <-- state for alert
      const deleteDoc = api.document.deleteDoc.useMutation();
      const { ErrorToast, SuccessToast } = useAppToasts();
      const apiUtils = api.useUtils();
      const handleDeleteDocs = async (docId: string) => {
        await deleteDoc.mutateAsync(
          { docId },
          {
            onSuccess: () => {
              SuccessToast({
                title: "Document deleted successfully",
              });
              apiUtils.document.getAllDocs.invalidate();
            },
            onError: () => {
              ErrorToast({
                title: "Failed to delete document",
              });
            },
          },
        );
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white" align="end">
              <DropdownMenuItem onClick={() => setOpenRename(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Rename Document
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()} // prevents auto close
              >
                <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                  <AlertDialogTrigger asChild>
                    <button
                      onClick={() => setOpenAlert(true)}
                      className="flex items-center text-red-600"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Document
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this document?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete <strong>{document.title}</strong>.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteDocs(document.id)}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        Yes, delete it
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Rename dialog */}
          <RenameDocs
            open={openRename}
            setOpen={setOpenRename}
            docId={document.id}
            currentTitle={document.title as string}
          />
        </>
      );
    },
  },
];
