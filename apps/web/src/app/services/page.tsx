import React from "react";
import Navbar from "./lawcrew-header";
import Main from "./main";

function LawcrewPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-primary">
      <Navbar />
      <Main />
    </div>
  );
}

export default LawcrewPage;
