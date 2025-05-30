"use client";
import useAuthStore from "@/store/use-auth-store";
import React, { useEffect } from "react";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AuthInitializer = () => {
  const { setRole } = useAuthStore((state) => state);
  const route = useRouter();
  useEffect(() => {
    const userRole = cookies.get("UserRole");
    const userId = cookies.get("UserId");
    if (!userId || !userRole) {
      route.push("/");
    } else {
      setRole(userRole.toLocaleLowerCase());
    }
  }, []);
  return null;
};

export default AuthInitializer;
