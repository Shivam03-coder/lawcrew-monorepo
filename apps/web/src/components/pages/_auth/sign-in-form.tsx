"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, User } from "lucide-react";
import { useAppToasts } from "@/hooks/use-app-toast";
import FormField from "@/components/shared/form-field";
import { loginSchema, type LoginType } from "@lawcrew/schema";
import { api } from "@lawcrew/trpc-client/src/client";
import Spinner from "@/components/shared/spinner";
import Link from "next/link";
import { useState } from "react";
import PasswordViewToggle from "@/components/shared/password-toggle";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { userName: "", password: "" },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const { ErrorToast, SuccessToast } = useAppToasts();
  const LoginUser = api.auth.login.useMutation();
  const onSubmit = (logindetails: LoginType) => {
    if (!logindetails) return;

    LoginUser.mutate(
      {
        userName: logindetails.userName,
        password: logindetails.password,
      },
      {
        onSuccess: ({ message }) => {
          SuccessToast({ title: message });
          reset();
          router.push("/services");
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
          Welcome back to Lawcrew.
        </CardTitle>
        <p className="text-muted-foreground text-center">
          Log in to your account
        </p>
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
                disabled={LoginUser.isPending}
              />
            </div>
          </FormField>

          <FormField label="Password" error={errors.password?.message}>
            <div className="relative">
              <Lock className="absolute left-3 top-2 h-4 w-4 text-primary" />
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                placeholder="••••••••"
                disabled={LoginUser.isPending}
              />
              <PasswordViewToggle
                setShowPassword={setShowPassword}
                showPassword={showPassword}
              />
            </div>
            <button className="float-right">
              <Link
                href="/forgot-password"
                className="text-main/80 mt-2 flex justify-end px-4 underline underline-offset-1"
              >
                forgot-password
              </Link>
            </button>
          </FormField>

          <Button
            type="submit"
            className="bg-warning w-full bg-primary text-secondary"
            disabled={LoginUser.isPending}
          >
            {LoginUser.isPending ? <Spinner color="#f2f8ff" /> : "LOGIN"}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <a
            href="/sign-up"
            className="text-blue-600 underline underline-offset-4 transition-colors hover:underline"
          >
            Sign-up
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
