import React, { ReactNode } from "react";

interface DashboardRootLayout {
  caseareachart: ReactNode;
  casebarchart: ReactNode;
  casepiechart: ReactNode;
}

const DashboardRootLayout = ({
  caseareachart,
  casebarchart,
  casepiechart,
}: DashboardRootLayout) => {
  return (
    <main className="grid grid-cols-1 gap-4 pb-5 pt-3 lg:grid-cols-4">
      <div className="mainCard  shadow lg:col-span-3">{casebarchart}</div>
      <div className="mainCard ">{casepiechart}</div>
      <div className="mainCard shadow lg:col-span-4">{caseareachart}</div>
    </main>
  );
};

export default DashboardRootLayout;