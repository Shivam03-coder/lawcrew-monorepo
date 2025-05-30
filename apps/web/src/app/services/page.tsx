"use client"
import React from "react";
import LawCrewNavbar from "./lawcrew-header";
import ServicesCards from "./service-cards";
import AuthInitializer from "@/providers/auth-intializer";
import useAuthStore from "@/store/use-auth-store";

function LawcrewPage() {
  const { role } = useAuthStore((state) => state);
  console.log("🚀 ~ LawcrewPage ~ role:", role)
  return (
    <div className="min-h-screen bg-white dark:bg-primary">
      <AuthInitializer />
      <LawCrewNavbar />
      <ServicesCards />
    </div>
  );
}

export default LawcrewPage;
