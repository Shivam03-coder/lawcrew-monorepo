import React from "react";
import MainCards from "./service-cards";
import LawCrewNavbar from "./lawcrew-header";
import ServicesCards from "./service-cards";

function LawcrewPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-primary">
      <LawCrewNavbar />
      <ServicesCards />
    </div>
  );
}

export default LawcrewPage;
