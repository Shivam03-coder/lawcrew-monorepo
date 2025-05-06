"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useAppToasts } from "@/hooks/use-app-toast";
import FormField from "@/components/shared/form-field";
import { forgotPasswordSchema, type ForgotPasswordType } from "@lawcrew/schema";
import { api } from "@lawcrew/trpc-client/src/client";
import Spinner from "@/components/shared/spinner";
import { useState } from "react";
import PasswordViewToggle from "@/components/shared/password-toggle";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { userName: "", password: "", confirmPassword: "" },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPasswordPassword, setShowConfirmPasswordPassword] =
    useState<boolean>(false);

  const router = useRouter();
  const { ErrorToast, SuccessToast } = useAppToasts();
  const ForgotPassword = api.auth.forgotpassword.useMutation();
  const onSubmit = (passworddetails: ForgotPasswordType) => {
    if (!passworddetails) return;

    ForgotPassword.mutate(
      {
        userName: passworddetails.userName,
        password: passworddetails.password,
      },
      {
        onSuccess: ({ message }) => {
          SuccessToast({ title: message });
          reset();
          router.push("/sign-in");
        },
        onError: ({ message }) => {
          ErrorToast({
            title: message,
          });
        },
      },
    );
  };

  return (
    <Card className="w-full max-w-md bg-white py-3 font-lexend shadow-none">
      <CardHeader className="space-y-1 pb-8">
        <CardTitle className="textDark whitespace-nowrap bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent">
          Password Change
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm">
          <FormField label="Username" error={errors.userName?.message}>
            <div className="relative">
              <User className="absolute left-3 top-2 h-4 w-4 text-primary" />
              <Input
                {...register("userName")}
                className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                placeholder="john@example"
                disabled={ForgotPassword.isSuccess}
              />
            </div>
          </FormField>

          <FormField label="New Password" error={errors.password?.message}>
            <div className="relative">
              <Lock className="absolute left-3 top-2 h-4 w-4 text-primary" />
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                placeholder="••••••••"
                disabled={ForgotPassword.isPending}
              />
              <PasswordViewToggle
                setShowPassword={setShowPassword}
                showPassword={showPassword}
              />
            </div>
          </FormField>
          <FormField
            label="Confirm Password"
            error={errors.confirmPassword?.message}
          >
            <div className="relative">
              <Lock className="absolute left-3 top-2 h-4 w-4 text-primary" />
              <Input
                {...register("confirmPassword")}
                type={showConfirmPasswordPassword ? "text" : "password"}
                className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                placeholder="••••••••"
                disabled={ForgotPassword.isPending}
                autoComplete="new-password"
              />
            </div>
            <PasswordViewToggle
              setShowPassword={setShowConfirmPasswordPassword}
              showPassword={showConfirmPasswordPassword}
            />
          </FormField>

          <Button
            type="submit"
            className="bg-warning w-full bg-primary text-secondary"
            disabled={ForgotPassword.isPending}
          >
            {ForgotPassword.isPending ? (
              <Spinner color="#f2f8ff" />
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
