import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import React, { ReactNode } from "react";

interface TaskRootLayoutProps {
  children: ReactNode;
  weeklytask: ReactNode;
  monthlytask: ReactNode;
  remainingtask: ReactNode;
  kanbanview: ReactNode;
}

const TaskRootLayout = ({
  weeklytask,
  monthlytask,
  remainingtask,
  kanbanview,
}: TaskRootLayoutProps) => {
  return (
    <main className="mx-auto grid gap-4 lg:grid-cols-3 lg:p-8">
      <div className="taskCard">{weeklytask}</div>
      <div className="taskCard">{remainingtask}</div>
      <div className="taskCard">{monthlytask}</div>
      <div className="col-span-full py-16 ">{kanbanview}</div>
    </main>
  );
};

export default TaskRootLayout;
