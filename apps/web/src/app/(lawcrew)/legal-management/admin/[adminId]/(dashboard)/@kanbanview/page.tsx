import React from "react";
import KanBanView from "./kanban-view";
import { dummyData } from "@/data";
const KanbanView = () => {
  return <KanBanView data={dummyData} />;
};

export default KanbanView;
