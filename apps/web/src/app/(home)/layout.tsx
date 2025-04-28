import Navbar from "@/components/shared/navbar";
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
