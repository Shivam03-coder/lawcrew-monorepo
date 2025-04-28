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
import { trpcClient } from "@lawcrew/trpc-client/src/client";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { userName: "", password: "" },
  });

  const router = useRouter();
  const { ErrorToast, SuccessToast } = useAppToasts();
  const LoginUser = trpcClient.auth.login.useMutation();
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
    <Card className="w-full max-w-md bg-white py-8 shadow-none">
      <CardHeader className="space-y-1 pb-8">
        <CardTitle className="bg-text-gradient-midnight whitespace-nowrap bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent">
          Welcome back to DigitalGb
        </CardTitle>
        <p className="text-muted-foreground text-center">
          Log in to your account
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField label="Username" error={errors.userName?.message}>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <Input
                {...register("userName")}
                className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                placeholder="john@example"
                disabled={LoginUser.isSuccess}
              />
            </div>
          </FormField>

          <FormField label="Password" error={errors.password?.message}>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <Input
                {...register("password")}
                type="password"
                className="rounded-full bg-white pl-9 focus:ring-1 focus:ring-dark focus:transition-all"
                placeholder="••••••••"
                disabled={LoginUser.isPending}
              />
            </div>
          </FormField>

          <Button
            type="submit"
            className="bg-warning w-full text-dark"
            disabled={LoginUser.isSuccess}
          >
            {LoginUser.isSuccess ? "Logging in..." : "LOGIN"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignIn;
