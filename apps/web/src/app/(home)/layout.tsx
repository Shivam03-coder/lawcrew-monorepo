import React from "react";
import Navbar from "./navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen dark:bg-primary">
      <Navbar />
      {children}
    </div>
  );
};

export default HomeLayout;
