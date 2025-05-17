"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { AlertCircle } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@lawcrew/trpc-client/src/client";
import { useAppToasts } from "@/hooks/use-app-toast";
import { useReadLocalStorage } from "usehooks-ts";
import AddNewOpponentsBtn from "./add-new-opponents-btn";
import FormField from "@/components/shared/form-field";
import Spinner from "@/components/shared/spinner";

type FormValues = {
  opponent: string;
};

export default function AddOpponentForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { ErrorToast, SuccessToast } = useAppToasts();
  const caseId = useReadLocalStorage("caseId") as string;
  const { data: ids, isLoading } = api.litigation.getOpponentsIds.useQuery();
  const editCaseOpponentsDetails =
    api.litigation.editCaseOpponentsDetails.useMutation();

  const onSubmit = (data: FormValues) => {
    editCaseOpponentsDetails.mutateAsync(
      {
        caseId,
        opponentId: data.opponent,
      },
      {
        onSuccess: () => {
          SuccessToast({
            title: "Opponent added to case.",
          });
        },
        onError: () => {
          ErrorToast({
            title: "Opponent failed to add in  case.",
          });
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-xl space-y-6"
    >
      <div className="flex w-full items-end gap-4">
        <FormField
          label="Opponent"
          error={errors.opponent?.message}
          className="w-full"
        >
          <div className="relative">
            <AlertCircle className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary" />
            <Controller
              name="opponent"
              control={control}
              rules={{ required: "Opponent is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isLoading || !ids?.length}
                >
                  <SelectTrigger className="w-full rounded-full pl-10 text-primary placeholder:text-primary/60 focus:ring-2 focus:ring-primary">
                    <SelectValue placeholder="Select an opponent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Opponents</SelectLabel>
                      {isLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading...
                        </SelectItem>
                      ) : ids && ids.length > 0 ? (
                        ids.map((opponent) => (
                          <SelectItem key={opponent.id} value={opponent.id}>
                            {opponent.firstName}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No opponents found
                        </SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </FormField>

        <div className="shrink-0">
          <AddNewOpponentsBtn />
        </div>
      </div>

      <button
        type="submit"
        disabled={editCaseOpponentsDetails.isPending}
        className="center w-full rounded-full bg-primary px-6 py-2 text-white hover:bg-primary/90"
      >
        {editCaseOpponentsDetails.isPaused ? <Spinner /> : "Add Opponent"}
      </button>
    </form>
  );
}
