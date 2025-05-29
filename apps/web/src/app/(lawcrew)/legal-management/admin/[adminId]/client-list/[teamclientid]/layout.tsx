import React, { ReactNode } from "react";
import Header from "./header";

const ClientInfoLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen w-full p-4">
      <Header />
      {children}
    </main>
  );
};

export default ClientInfoLayout;
