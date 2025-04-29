"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupType } from "@lawcrew/schema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { api } from "@lawcrew/trpc-client/src/client";
import { useAppToasts } from "@/hooks/use-app-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormField from "@/components/shared/form-field";
import Spinner from "@/components/shared/spinner";

import { User, Mail, Lock, Phone, MapPin, Landmark } from "lucide-react";

const UserForm = () => {
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
    },
  });

  const SignupUser = api.auth.signup.useMutation();
  const router = useRouter();
  const { SuccessToast, ErrorToast } = useAppToasts();

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
    <Card className="w-full max-w-[540px] bg-white py-3 font-lexend shadow-none">
      <CardHeader className="space-y-1 pb-8">
        <CardTitle className="text-center text-3xl font-bold tracking-tight">
          Create your account in Lawcrew
        </CardTitle>
        <p className="text-muted-foreground text-center">
          Get started with your free account today
        </p>
      </CardHeader>

      <CardContent>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm">
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
                  placeholder="Shivam"
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
                  placeholder="Anand"
                />
              </div>
            </FormField>
          </div>

          <FormField label="Username" error={errors.userName?.message}>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
              <Input
                {...register("userName")}
                className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                placeholder="your_username"
              />
            </div>
          </FormField>

          {/* ===== */}
          <div className="flex gap-3">
            <FormField label="Email" error={errors.email?.message}>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                <Input
                  {...register("email")}
                  type="email"
                  className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                  placeholder="john@example.com"
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

          <FormField label="Password" error={errors.password?.message}>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
              <Input
                {...register("password")}
                type="password"
                className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                placeholder="••••••••"
              />
            </div>
          </FormField>

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
                  placeholder="Mumbai"
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
                  placeholder="Maharashtra"
                />
              </div>
            </FormField>
          </div>

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

export default UserForm;
