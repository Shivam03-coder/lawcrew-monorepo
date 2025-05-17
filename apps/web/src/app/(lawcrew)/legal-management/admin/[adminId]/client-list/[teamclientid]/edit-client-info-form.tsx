"use client";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { editClientSchema, EditClientType } from "@lawcrew/schema";
import { api } from "@lawcrew/trpc-client/src/client";
import FormField from "@/components/shared/form-field";
import { Bookmark, FileText, User } from "lucide-react";
import { useAppToasts } from "@/hooks/use-app-toast";
import { ClientType } from "@/types/global";
import { useEffect } from "react";
import Spinner from "@/components/shared/spinner";

interface EditClientFormProps {
  user: ClientType;
  setOpen: (open: boolean) => void;
}

const EditClientForm = ({ user, setOpen }: EditClientFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditClientType>({
    resolver: zodResolver(editClientSchema),
  });

  useEffect(() => {
    if (user) {
      const sanitizedUser = {
        ...user,
        lastName: user.lastName ?? undefined,
        firstName: user.firstName ?? undefined,
        email: user.email ?? undefined,
        phoneNumber: user.phoneNumber ?? undefined,
        country: user?.UserAddress?.country ?? undefined,
        state: user?.UserAddress?.state ?? undefined,
        city: user?.UserAddress?.city ?? undefined,
        zip: user?.UserAddress?.zip ?? undefined,
        clientId: user.clientId,
      };

      reset(sanitizedUser);
    }
  }, []);

  const { ErrorToast, SuccessToast } = useAppToasts();
  const apiUtils = api.useUtils();
  const editClientInfo = api.participant.editClientInfo.useMutation();

  const onSubmit = async (clientDetails: EditClientType) => {
    editClientInfo.mutateAsync(clientDetails, {
      onSuccess: ({ message }) => {
        SuccessToast({
          title: message,
        });

        apiUtils.participant.getClientDetailsById.invalidate({
          clientId: clientDetails.clientId,
        });

        setOpen(false);
      },
      onError: ({ message }) => {
        ErrorToast({
          title: message,
        });
      },
    });
  };

  return (
    <SheetContent className="h-full overflow-y-scroll bg-white dark:bg-primary">
      <SheetHeader>
        <SheetTitle className="mb-4">Edit User</SheetTitle>
        <SheetDescription asChild>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-4 text-sm"
          >
            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-700">
                Personal Information
              </h3>

              {/* First Name */}
              <FormField label="First Name" error={errors.firstName?.message}>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input
                    {...register("firstName")}
                    className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
                    placeholder="Enter first name"
                  />
                </div>
              </FormField>

              {/* Last Name */}
              <FormField label="Last Name" error={errors.lastName?.message}>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input
                    {...register("lastName")}
                    className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
                    placeholder="Enter last name"
                  />
                </div>
              </FormField>

              {/* Email */}
              <FormField label="Email" error={errors.email?.message}>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input
                    {...register("email")}
                    className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
                    placeholder="Enter email"
                  />
                </div>
              </FormField>

              {/* Phone Number */}
              <FormField
                label="Phone Number"
                error={errors.phoneNumber?.message}
              >
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input
                    {...register("phoneNumber")}
                    className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
                    placeholder="Enter phone number"
                  />
                </div>
              </FormField>

              {/* Country */}
              <FormField label="Country" error={errors.country?.message}>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input
                    {...register("country")}
                    className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
                    placeholder="Enter country"
                  />
                </div>
              </FormField>

              {/* State */}
              <FormField label="State" error={errors.state?.message}>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input
                    {...register("state")}
                    className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
                    placeholder="Enter state"
                  />
                </div>
              </FormField>

              {/* City */}
              <FormField label="City" error={errors.city?.message}>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input
                    {...register("city")}
                    className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
                    placeholder="Enter city"
                  />
                </div>
              </FormField>

              {/* Zip Code */}
              <FormField label="Zip Code" error={errors.zip?.message}>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input
                    {...register("zip")}
                    className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
                    placeholder="Enter zip code"
                  />
                </div>
              </FormField>
            </div>

            <Button
              type="submit"
              className="mt-6 w-full bg-primary text-secondary"
            >
              {editClientInfo.isPending ? <Spinner /> : "SAVE"}
            </Button>
          </form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default EditClientForm;
