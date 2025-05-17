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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
}

const EditClientForm = ({ user }: EditClientFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<EditClientType>({
    resolver: zodResolver(editClientSchema),
    defaultValues: {
      city: user.UserAddress?.city || "",
      country: user.UserAddress?.country || "",
      email: user.email || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phoneNumber: user.phoneNumber || "",
      role: user.role || "CLIENT",
      state: user.UserAddress?.state || "",
      zip: user.UserAddress?.zip || "",
    },
  });

  const { ErrorToast, SuccessToast } = useAppToasts();
  const apiUtils = api.useUtils();

  const editClientInfo = api.participant.editClientInfo.useMutation({
    onSuccess: () => {
      SuccessToast({ title: "Client updated successfully" });
      apiUtils.participant.invalidate();
    },
    onError: (error) => {
      ErrorToast({
        title: "Failed to update client",
        description: error.message,
      });
    },
  });

  const onSubmit = async (clientDetails: EditClientType) => {
    try {
      console.log("Submitting form data:", clientDetails);
      await editClientInfo.mutateAsync(clientDetails);
    } catch (error) {
      console.error("Submit error", error);
    }
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
                    disabled={editClientInfo.isPending}
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
                    disabled={editClientInfo.isPending}
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
                    disabled={editClientInfo.isPending}
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
                    disabled={editClientInfo.isPending}
                  />
                </div>
              </FormField>

              {/* Role */}
              <FormField label="Role" error={errors.role?.message}>
                <div className="relative">
                  <Bookmark className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Select
                    onValueChange={(value) => setValue("role", value as any)}
                    value={watch("role")}
                  >
                    <SelectTrigger className="focus:border-2-primary rounded-full bg-white pl-12 text-primary placeholder:text-primary/60 focus:border-2 focus:ring-primary">
                      <SelectValue placeholder="Select user role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="MEMBER">Member</SelectItem>
                      <SelectItem value="CLIENT">Client</SelectItem>
                    </SelectContent>
                  </Select>
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
                    disabled={editClientInfo.isPending}
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
                    disabled={editClientInfo.isPending}
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
                    disabled={editClientInfo.isPending}
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
                    disabled={editClientInfo.isPending}
                  />
                </div>
              </FormField>
            </div>

            <Button
              type="submit"
              className="mt-6 w-full bg-primary text-secondary"
            >
              {editClientInfo.isPending ? <Spinner /> : "Save Changes"}
            </Button>
          </form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default EditClientForm;
