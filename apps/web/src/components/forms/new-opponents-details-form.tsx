"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOpponentSchema, type CreateOpponentType } from "@lawcrew/schema";
import { api } from "@lawcrew/trpc-client/src/client";

import FormField from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  Home,
  Flag,
  Hash,
  AlertCircle,
  BarChartHorizontalBig,
} from "lucide-react";
import PasswordViewToggle from "@/components/shared/password-toggle";
import Spinner from "@/components/shared/spinner";
import { useAppToasts } from "@/hooks/use-app-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const NewOpponentDetailsForm = ({
  setShowSheet,
}: {
  setShowSheet: (value: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CreateOpponentType>({
    resolver: zodResolver(createOpponentSchema),
    defaultValues: {
      city: "",
      country: "",
      email: "",
      firstName: "",
      jobTitle: "",
      lastName: "",
      phoneNumber: "",
      state: "",
      zip: "",
    },
  });

  const { ErrorToast, SuccessToast } = useAppToasts();
  const apiUtils = api.useUtils();
  const { data: cases, isLoading: isCasesLoading } =
    api.litigation.getCasedetails.useQuery();
  const createOpponent = api.participant.createNewOpponent.useMutation();

  const onSubmit = async (data: CreateOpponentType) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    await createOpponent.mutateAsync(data, {
      onSuccess: () => {
        SuccessToast({ title: "Opponent created successfully!" });
        setShowSheet(false);
        reset();
      },
      onError: () => {
        ErrorToast({
          title: "Failed to create opponent",
        });
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-700">
            Personal Information
          </h3>

          <FormField label="First Name" error={errors.firstName?.message}>
            <div className="relative">
              <User className="absolute left-3 top-2 h-4 w-4 text-primary" />
              <Input
                {...register("firstName")}
                placeholder="John"
                autoComplete="given-name"
                disabled={createOpponent.isPending}
                className="rounded-full pl-9"
              />
            </div>
          </FormField>

          <FormField label="Last Name" error={errors.lastName?.message}>
            <div className="relative">
              <User className="absolute left-3 top-2 h-4 w-4 text-primary" />
              <Input
                {...register("lastName")}
                placeholder="Doe"
                autoComplete="family-name"
                disabled={createOpponent.isPending}
                className="rounded-full pl-9"
              />
            </div>
          </FormField>
        </div>

        <FormField label="jobTitle" error={errors.jobTitle?.message}>
          <div className="relative">
            <BarChartHorizontalBig className="absolute left-3 top-2 h-4 w-4 text-primary" />
            <Input
              {...register("jobTitle")}
              type="text"
              placeholder="Job Title"
              disabled={createOpponent.isPending}
              className="rounded-full pl-9 pr-10"
            />
          </div>
        </FormField>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-700">
            Contact Information
          </h3>

          <FormField label="Email" error={errors.email?.message}>
            <div className="relative">
              <Mail className="absolute left-3 top-2 h-4 w-4 text-primary" />
              <Input
                {...register("email")}
                type="email"
                placeholder="john.doe@example.com"
                autoComplete="email"
                disabled={createOpponent.isPending}
                className="rounded-full pl-9"
              />
            </div>
          </FormField>

          <FormField label="Phone Number" error={errors.phoneNumber?.message}>
            <div className="relative">
              <Phone className="absolute left-3 top-2 h-4 w-4 text-primary" />
              <Input
                {...register("phoneNumber")}
                placeholder="(123) 456-7890"
                autoComplete="tel"
                disabled={createOpponent.isPending}
                className="rounded-full pl-9"
              />
            </div>
          </FormField>
        </div>

        {/* Address Information */}
        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-700">
            Address Information
          </h3>

          <FormField label="Country" error={errors.country?.message}>
            <div className="relative">
              <Flag className="absolute left-3 top-2 h-4 w-4 text-primary" />
              <Input
                {...register("country")}
                placeholder="United States"
                autoComplete="country"
                disabled={createOpponent.isPending}
                className="rounded-full pl-9"
              />
            </div>
          </FormField>

          <FormField label="State/Province" error={errors.state?.message}>
            <div className="relative">
              <MapPin className="absolute left-3 top-2 h-4 w-4 text-primary" />
              <Input
                {...register("state")}
                placeholder="California"
                autoComplete="address-level1"
                disabled={createOpponent.isPending}
                className="rounded-full pl-9"
              />
            </div>
          </FormField>

          <FormField label="City" error={errors.city?.message}>
            <div className="relative">
              <Home className="absolute left-3 top-2 h-4 w-4 text-primary" />
              <Input
                {...register("city")}
                placeholder="Los Angeles"
                autoComplete="address-level2"
                disabled={createOpponent.isPending}
                className="rounded-full pl-9"
              />
            </div>
          </FormField>

          <FormField label="ZIP/Postal Code" error={errors.zip?.message}>
            <div className="relative">
              <Hash className="absolute left-3 top-2 h-4 w-4 text-primary" />
              <Input
                {...register("zip")}
                placeholder="90001"
                autoComplete="postal-code"
                disabled={createOpponent.isPending}
                className="rounded-full pl-9"
              />
            </div>
          </FormField>
        </div>

        <Button
          type="submit"
          className="hover:bg-primary-dark w-full bg-primary text-secondary"
          disabled={createOpponent.isPending || isCasesLoading}
        >
          {createOpponent.isPending ? (
            <Spinner color="#f2f8ff" />
          ) : (
            "Create Opponent"
          )}
        </Button>
      </form>
    </>
  );
};

export default NewOpponentDetailsForm;
