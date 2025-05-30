// components/rename-docs.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { api } from "@lawcrew/trpc-client/src/client";
import { useEffect } from "react";
import { useAppToasts } from "@/hooks/use-app-toast";

interface RenameDocsProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  docId: string;
  currentTitle: string;
}

const RenameDocs: React.FC<RenameDocsProps> = ({
  open,
  setOpen,
  docId,
  currentTitle,
}) => {
  const { register, handleSubmit, reset } = useForm<{ title: string }>({
    defaultValues: { title: currentTitle },
  });
  const apiUtils = api.useUtils();
  const { SuccessToast } = useAppToasts();
  const updateDoc = api.document.updateDocs.useMutation();

  const onSubmit = (data: { title: string }) => {
    updateDoc.mutate(
      { docId, title: data.title },
      {
        onSuccess: () => {
          setOpen(false);
          SuccessToast({
            title: "Documnet title changed",
          });
          apiUtils.document.getAllDocs.invalidate();
        },
      },
    );
  };

  useEffect(() => {
    reset({ title: currentTitle });
  }, [currentTitle, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white dark:bg-primary">
        <DialogHeader>
          <DialogTitle>Rename Document</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("title", { required: true })}
            placeholder="New document name"
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateDoc.isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDocs;
