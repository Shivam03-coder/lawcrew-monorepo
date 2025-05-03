"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddParticipantsType, addParticipantsSchema } from "@lawcrew/schema";
import { api } from "@lawcrew/trpc-client/src/client";

import FormField from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { User, Lock, Mail, Phone, MapPin, Landmark } from "lucide-react";
import PasswordViewToggle from "@/components/shared/password-toggle";
import Spinner from "@/components/shared/spinner";
import { useAppToasts } from "@/hooks/use-app-toast";

const ClientForm = () => {
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
    },
  });

  const { ErrorToast, SuccessToast } = useAppToasts();
  const apiUtils = api.useUtils();
  const createClient = api.participant.addClient.useMutation();

  const onSubmit = async (userDetails: AddParticipantsType) => {
    if (!userDetails) return null;
    await createClient.mutateAsync(userDetails, {
      onSuccess: () => {
        SuccessToast({
          title: "Client created successfully",
          description: "You can now view the client in the list.",
        });
        apiUtils.participant.getClient.invalidate();
        reset();
      },
      onError: () => {
        ErrorToast({
          title: "Error creating client",
          description: "Please check the details and try again.",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm">
      {/* Username */}
      <FormField label="Username" error={errors.userName?.message}>
        <div className="relative">
          <User className="absolute left-3 top-2 h-4 w-4 text-primary" />
          <Input
            {...register("userName")}
            placeholder="john123"
            disabled={createClient.isPending}
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
            placeholder="••••••••"
            disabled={createClient.isPending}
            className="rounded-full bg-white pl-9 pr-10 focus:ring-1 focus:ring-dark"
          />
          <PasswordViewToggle
            setShowPassword={setShowPassword}
            showPassword={showPassword}
          />
        </div>
      </FormField>

      {/* Email */}
      <FormField label="Email" error={errors.email?.message}>
        <div className="relative">
          <Mail className="absolute left-3 top-2 h-4 w-4 text-primary" />
          <Input
            {...register("email")}
            type="email"
            placeholder="john@example.com"
            disabled={createClient.isPending}
            className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark"
          />
        </div>
      </FormField>

      {/* First Name */}
      <FormField label="First Name" error={errors.firstName?.message}>
        <Input
          {...register("firstName")}
          placeholder="John"
          disabled={createClient.isPending}
          className="rounded-full bg-white focus:ring-1 focus:ring-dark"
        />
      </FormField>

      {/* Last Name */}
      <FormField label="Last Name" error={errors.lastName?.message}>
        <Input
          {...register("lastName")}
          placeholder="Doe"
          disabled={createClient.isPending}
          className="rounded-full bg-white focus:ring-1 focus:ring-dark"
        />
      </FormField>

      {/* Phone Number */}
      <FormField label="Phone Number" error={errors.phoneNumber?.message}>
        <div className="relative">
          <Phone className="absolute left-3 top-2 h-4 w-4 text-primary" />
          <Input
            {...register("phoneNumber")}
            placeholder="+1 123 456 7890"
            disabled={createClient.isPending}
            className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark"
          />
        </div>
      </FormField>

      {/* City */}
      <FormField label="City" error={errors.city?.message}>
        <div className="relative">
          <MapPin className="absolute left-3 top-2 h-4 w-4 text-primary" />
          <Input
            {...register("city")}
            placeholder="New York"
            disabled={createClient.isPending}
            className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark"
          />
        </div>
      </FormField>

      {/* State */}
      <FormField label="State" error={errors.state?.message}>
        <div className="relative">
          <Landmark className="absolute left-3 top-2 h-4 w-4 text-primary" />
          <Input
            {...register("state")}
            placeholder="NY"
            disabled={createClient.isPending}
            className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark"
          />
        </div>
      </FormField>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-primary text-secondary"
        disabled={createClient.isPending}
      >
        {createClient.isPending ? <Spinner color="#f2f8ff" /> : "Create Client"}
      </Button>
    </form>
  );
};

export default ClientForm;
