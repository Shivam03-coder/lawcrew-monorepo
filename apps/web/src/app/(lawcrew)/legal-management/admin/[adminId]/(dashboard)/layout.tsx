import CardList from "@/components/shared/card-list";
import React, { ReactNode } from "react";

interface DashboardRootLayout {
  caseareachart: ReactNode;
  casebarchart: ReactNode;
  casepiechart: ReactNode;
  todolist: ReactNode;
  kanbanview: ReactNode;
}

const DashboardRootLayout = ({
  caseareachart,
  casebarchart,
  casepiechart,
  todolist,
  kanbanview,
}: DashboardRootLayout) => {
  return (
    <main className="grid grid-cols-1 gap-4 pb-5 pt-3 lg:grid-cols-4">
      <div className="mainCard shadow lg:col-span-2">{casebarchart}</div>
      <div className="mainCard">
        <CardList title="Clients List" />
      </div>
      <div className="mainCard">{casepiechart}</div>
      <div className="mainCard">{todolist}</div>
      <div className="mainCard shadow lg:col-span-2">{caseareachart}</div>
      <div className="mainCard">
        <CardList title="Latest Transactions" />
      </div>
      <div className="col-span-full">{kanbanview}</div>
    </main>
  );
};

export default DashboardRootLayout;
