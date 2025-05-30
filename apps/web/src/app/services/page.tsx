import React from "react";
import LawCrewNavbar from "./lawcrew-header";
import ServicesCards from "./service-cards";
import AuthInitializer from "@/providers/auth-intializer";

function LawcrewPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-primary">
      <AuthInitializer />
      <LawCrewNavbar />
      <ServicesCards />
    </div>
  );
}

export default LawcrewPage;
