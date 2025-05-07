"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddParticipantsType, addParticipantsSchema } from "@lawcrew/schema";
import { api } from "@lawcrew/trpc-client/src/client";

import FormField from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { User, Lock, Mail, Phone, MapPin, Landmark, Home, Flag, Hash } from "lucide-react";
import PasswordViewToggle from "@/components/shared/password-toggle";
import Spinner from "@/components/shared/spinner";
import { useAppToasts } from "@/hooks/use-app-toast";

const AddMembersForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddParticipantsType>({
    resolver: zodResolver(addParticipantsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      email: "",
      password: "",
      phoneNumber: "",
      state: "",
      userName: "",
      country: "",
      zip : ""
    },
  });

  const { ErrorToast, SuccessToast } = useAppToasts();
  const apiUtils = api.useUtils();
  const createMembers = api.participant.addMember.useMutation();

  const onSubmit = async (userDetails: AddParticipantsType) => {
    if (!userDetails) return null;
    await createMembers.mutateAsync(userDetails, {
      onSuccess: () => {
        SuccessToast({
          title: "Member created successfully",
          description: "You can now view the member in the list.",
        });
        apiUtils.participant.getMember.invalidate();
        reset();
      },
      onError: () => {
        ErrorToast({
          title: "Error creating member",
          description: "Please check the details and try again.",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm">
    {/* Personal Information Section */}
    <div className="space-y-4">
      <h3 className="text-base font-medium text-gray-700">Personal Information</h3>
      
      {/* First Name */}
      <FormField label="First Name" error={errors.firstName?.message}>
        <div className="relative">
          <User className="absolute left-3 top-2 h-4 w-4 text-primary" />
          <Input
            {...register("firstName")}
            placeholder="John"
            autoComplete="given-name"
            disabled={createMembers.isPending}
            className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark"
          />
        </div>
      </FormField>

      {/* Last Name */}
      <FormField label="Last Name" error={errors.lastName?.message}>
        <div className="relative">
          <User className="absolute left-3 top-2 h-4 w-4 text-primary" />
          <Input
            {...register("lastName")}
            placeholder="Doe"
            autoComplete="family-name"
            disabled={createMembers.isPending}
            className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark"
          />
        </div>
      </FormField>
    </div>

    {/* Account Information Section */}
    <div className="space-y-4">
      <h3 className="text-base font-medium text-gray-700">Account Information</h3>
      
      {/* Username */}
      <FormField label="Username" error={errors.userName?.message}>
        <div className="relative">
          <User className="absolute left-3 top-2 h-4 w-4 text-primary" />
          <Input
            {...register("userName")}
            placeholder="john_doe_123"
            autoComplete="username"
            disabled={createMembers.isPending}
            className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark"
          />
        </div>
      </FormField>

      {/* Password */}
      <FormField label="Password" error={errors.password?.message}>
        <div className="relative">
          <Lock className="absolute left-3 top-2 h-4 w-4 text-primary" />
          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            autoComplete="new-password"
            disabled={createMembers.isPending}
            className="rounded-full bg-white pl-9 pr-10 focus:ring-1 focus:ring-dark"
          />
          <PasswordViewToggle
            setShowPassword={setShowPassword}
            showPassword={showPassword}
          />
        </div>
      </FormField>
    </div>

    {/* Contact Information Section */}
    <div className="space-y-4">
      <h3 className="text-base font-medium text-gray-700">Contact Information</h3>
      
      {/* Email */}
      <FormField label="Email" error={errors.email?.message}>
        <div className="relative">
          <Mail className="absolute left-3 top-2 h-4 w-4 text-primary" />
          <Input
            {...register("email")}
            type="email"
            placeholder="john.doe@example.com"
            autoComplete="email"
            disabled={createMembers.isPending}
            className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark"
          />
        </div>
      </FormField>

      {/* Phone Number */}
      <FormField label="Phone Number" error={errors.phoneNumber?.message}>
        <div className="relative">
          <Phone className="absolute left-3 top-2 h-4 w-4 text-primary" />
          <Input
            {...register("phoneNumber")}
            placeholder="(123) 456-7890"
            autoComplete="tel"
            disabled={createMembers.isPending}
            className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark"
          />
        </div>
      </FormField>
    </div>

    {/* Address Information Section */}
    <div className="space-y-4">
      <h3 className="text-base font-medium text-gray-700">Address Information</h3>
      
      {/* Country */}
      <FormField label="Country" error={errors.country?.message}>
        <div className="relative">
          <Flag className="absolute left-3 top-2 h-4 w-4 text-primary" />
          <Input
            {...register("country")}
            placeholder="United States"
            autoComplete="country"
            disabled={createMembers.isPending}
            className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark"
          />
        </div>
      </FormField>

      {/* State */}
      <FormField label="State/Province" error={errors.state?.message}>
        <div className="relative">
          <MapPin className="absolute left-3 top-2 h-4 w-4 text-primary" />
          <Input
            {...register("state")}
            placeholder="California"
            autoComplete="address-level1"
            disabled={createMembers.isPending}
            className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark"
          />
        </div>
      </FormField>

      {/* City */}
      <FormField label="City" error={errors.city?.message}>
        <div className="relative">
          <Home className="absolute left-3 top-2 h-4 w-4 text-primary" />
          <Input
            {...register("city")}
            placeholder="Los Angeles"
            autoComplete="address-level2"
            disabled={createMembers.isPending}
            className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark"
          />
        </div>
      </FormField>

      {/* Zip Code */}
      <FormField label="ZIP/Postal Code" error={errors.zip?.message}>
        <div className="relative">
          <Hash className="absolute left-3 top-2 h-4 w-4 text-primary" />
          <Input
            {...register("zip")}
            placeholder="90001"
            autoComplete="postal-code"
            disabled={createMembers.isPending}
            className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark"
          />
        </div>
      </FormField>
    </div>

    {/* Submit Button */}
    <Button
      type="submit"
      className="w-full bg-primary text-secondary hover:bg-primary-dark"
      disabled={createMembers.isPending}
    >
      {createMembers.isPending ? (
        <Spinner color="#f2f8ff" />
      ) : (
        "Create Client Account"
      )}
    </Button>
  </form>
  );
};

export default AddMembersForm;
