import Navbar from "@/components/pages/_services/lawcrew-header";
import MainCards from "@/components/pages/_services/main-cards";
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
