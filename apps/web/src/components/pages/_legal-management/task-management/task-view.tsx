import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { dummyData } from "@/data";
import KanBanView from "./_tabs/kanban/kanban-view";
import TaskTableViewTab from "./_tabs/table/table-view";
import CalendarViewTab from "./_tabs/calendar/calender-view-tab";

const TaskView = () => {
  return (
    <section className="col-span-full space-y-4 rounded-lg bg-white p-4 shadow-md dark:bg-gray-900">
      {/* Header */}
      <h3 className="textDark font-lexend text-lg font-semibold">Task Lists</h3>

      {/* Tabs */}
      <Tabs defaultValue="Kanban" className="w-full">
        {/* Tab Navigation */}
        <TabsList className="flex items-center justify-between rounded-lg p-2">
          <div className="flex gap-2 rounded-lg bg-white p-1 shadow dark:bg-slate-800">
            <TabsTrigger
              value="Kanban"
              className="rounded-md px-4 py-2 transition hover:bg-gray-100"
            >
              Kanban
            </TabsTrigger>
            <TabsTrigger
              value="Tabel"
              className="rounded-md px-4 py-2 transition hover:bg-gray-100"
            >
              Table
            </TabsTrigger>
            <TabsTrigger
              value="Calander"
              className="rounded-md px-4 py-2 transition hover:bg-gray-100"
            >
              Calander
            </TabsTrigger>
          </div>
          {/* <TaskTabsBtn /> */}
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="Kanban">
          <KanBanView data={dummyData} />
        </TabsContent>
        <TabsContent value="Tabel">
          <TaskTableViewTab data={dummyData} />
        </TabsContent>
        <TabsContent value="Calander">
          <CalendarViewTab data={dummyData} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default TaskView;
