"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupType } from "@lawcrew/schema";
import { useRouter } from "next/navigation";
import { api } from "@lawcrew/trpc-client/src/client";
import { useAppToasts } from "@/hooks/use-app-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormField from "@/components/shared/form-field";
import Spinner from "@/components/shared/spinner";
import { User, Mail, Lock, Phone, MapPin, Landmark, Globe } from "lucide-react";
import PasswordViewToggle from "@/components/shared/password-toggle";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      userName: "",
      email: "",
      password: "",
      phoneNumber: "",
      country: "",
      zip: "",
    },
  });

  const SignupUser = api.user.signup.useMutation();
  const router = useRouter();
  const { SuccessToast, ErrorToast } = useAppToasts();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (Userdetails: SignupType) => {
    if (!Userdetails) return;

    await SignupUser.mutateAsync(Userdetails, {
      onSuccess: () => {
        SuccessToast({
          title: "Account created succesfully",
        });
        reset();
        router.push("sign-in");
      },
      onError: ({ message }) => {
        ErrorToast({
          title: message,
        });
      },
    });
  };

  return (
    <Card className="w-full max-w-[540px] border-2 border-dashed border-primary bg-white font-lexend shadow-none">
      <CardHeader className="space-y-1 pb-5">
        <CardTitle className="text-center text-2xl font-semibold capitalize tracking-tight">
          Create your account in Lawcrew
        </CardTitle>
        <p className="text-muted-foreground text-center">
          Get started with your free account today
        </p>
      </CardHeader>
      <CardContent className="py-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm">
          {/* Name Fields */}
          <div className="flex gap-3">
            <FormField
              className="flex-1"
              label="First Name"
              error={errors.firstName?.message}
            >
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                <Input
                  {...register("firstName")}
                  className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                  placeholder="John"
                />
              </div>
            </FormField>

            <FormField
              className="flex-1"
              label="Last Name"
              error={errors.lastName?.message}
            >
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                <Input
                  {...register("lastName")}
                  className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                  placeholder="Doe"
                />
              </div>
            </FormField>
          </div>

          {/* Contact Fields */}
          <div className="flex gap-3">
            <FormField label="Email" error={errors.email?.message}>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                <Input
                  {...register("email")}
                  type="email"
                  className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                  placeholder="john.doe@example.com"
                />
              </div>
            </FormField>

            <FormField label="Phone Number" error={errors.phoneNumber?.message}>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                <Input
                  {...register("phoneNumber")}
                  type="tel"
                  className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
            </FormField>
          </div>

          {/* Location Fields */}
          <div className="flex gap-3">
            <FormField
              className="flex-1"
              label="City"
              error={errors.city?.message}
            >
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                <Input
                  {...register("city")}
                  className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                  placeholder="New York"
                />
              </div>
            </FormField>

            <FormField
              className="flex-1"
              label="State"
              error={errors.state?.message}
            >
              <div className="relative">
                <Landmark className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                <Input
                  {...register("state")}
                  className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                  placeholder="New York"
                />
              </div>
            </FormField>
          </div>

          <div className="flex gap-3">
            <FormField
              className="flex-1"
              label="Zip Code"
              error={errors.zip?.message}
            >
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                <Input
                  {...register("zip")}
                  className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                  placeholder="10001"
                />
              </div>
            </FormField>

            <FormField
              className="flex-1"
              label="Country"
              error={errors.country?.message}
            >
              <div className="relative">
                <Globe className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                <Input
                  {...register("country")}
                  className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                  placeholder="USA"
                />
              </div>
            </FormField>
          </div>

          {/* Account Fields */}
          <div className="flex gap-3">
            <FormField label="Username" error={errors.userName?.message}>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                <Input
                  {...register("userName")}
                  className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                  placeholder="John@12345"
                />
              </div>
            </FormField>

            <FormField label="Password" error={errors.password?.message}>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                  placeholder="••••••••"
                />
              </div>
              <PasswordViewToggle
                setShowPassword={setShowPassword}
                showPassword={showPassword}
              />
            </FormField>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-warning w-full bg-primary text-secondary"
            disabled={SignupUser.isPending}
          >
            {SignupUser.isPending ? <Spinner /> : "REGISTER"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
