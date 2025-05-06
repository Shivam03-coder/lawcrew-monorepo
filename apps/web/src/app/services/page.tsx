import Navbar from "@/features/service/lawcrew-header";
import MainCards from "@/features/service/main-cards";
import React from "react";

function LawcrewPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-primary">
      <Navbar />
      <MainCards />
    </div>
  );
}

export default LawcrewPage;
