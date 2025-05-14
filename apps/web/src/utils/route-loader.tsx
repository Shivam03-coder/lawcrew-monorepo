// components/RouteLoader.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import LoaderSpinner from "@/components/shared/laoder";

export default function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return <LoaderSpinner />;
}
