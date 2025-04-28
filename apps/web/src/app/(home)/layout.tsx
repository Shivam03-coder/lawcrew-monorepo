import Navbar from "@/components/_home/navbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen dark:bg-primary">
      <Navbar />
      {children}
    </div>
  );
};

export default HomeLayout;
