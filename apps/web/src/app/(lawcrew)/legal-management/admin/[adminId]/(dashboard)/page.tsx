import React from "react";
import CaseBarChart from "./case-bar-chart";
import CardList from "@/components/shared/card-list";
import CasePieChart from "./case-pie-chart";
import TodoList from "./todo-list";
import CaseAreaChart from "./case-area-chart";
import CaseTable from "./case-table";

const HomePage = () => {
  return (
    <main className="grid grid-cols-1 gap-4 pb-5 pt-3 lg:grid-cols-4">
      <div className="mainCard shadow lg:col-span-2">
        <CaseBarChart />
      </div>
      <div className="mainCard">
        <CardList title="Clients List" />
      </div>
      <div className="mainCard">
        <CasePieChart />
      </div>
      <div className="mainCard">
        <TodoList />
      </div>
      <div className="mainCard shadow lg:col-span-2">
        <CaseAreaChart />
      </div>
      <div className="mainCard">
        <CardList title="Latest Transactions" />
      </div>
      <div className="col-span-full">
        <CaseTable />
      </div>
    </main>
  );
};

export default HomePage;
