import CaseAreaChart from "@/components/pages/_legal-management/_admin/case-area-chart";
import CaseBarChart from "@/components/pages/_legal-management/_admin/case-bar-chart";
import CasePieChart from "@/components/pages/_legal-management/_admin/case-pie-chart";
import CardList from "@/components/pages/_legal-management/_admin/card-list";
import React from "react";
import TodoList from "@/components/pages/_legal-management/_admin/todo-list";
import CaseTable from "@/components/pages/_legal-management/_admin/case-list/case-table";

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
