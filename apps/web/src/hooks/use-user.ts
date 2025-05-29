// hooks/useUser.ts
'use client';

import { useMemo } from "react";
import Cookies from "js-cookie";

export interface AuthUser {
  id: string;
  role: "ADMIN" | "CLIENT" | "MEMBER" | null;
}

const useUser = (): AuthUser | null => {
  return useMemo(() => {
    if (typeof window === 'undefined') return null; // Server-side guard

    const userId = Cookies.get("UserId");
    const userRole = Cookies.get("UserRole");

    if (!userId || !userRole) {
      return null;
    }

    const validRoles = ["ADMIN", "CLIENT", "MEMBER"];
    const role = validRoles.includes(userRole)
      ? (userRole as AuthUser["role"])
      : null;

    if (!role) return null;

    return {
      id: userId,
      role,
    };
  }, []);
};

export default useUser;