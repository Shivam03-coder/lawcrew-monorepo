import { TaskManagementChart, WeeklyTaskStats } from "@/components/pages/_legal-management/task-management/task-graph-stats";
import { RemainingTask, TimerTracker } from "@/components/pages/_legal-management/task-management/task-tracker";
import TaskView from "@/components/pages/_legal-management/task-management/task-view";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-6 dark:bg-gray-800">
      <div className="mx-auto w-[98%] p-3">
        <div className="m-auto grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <WeeklyTaskStats />
          <TaskManagementChart />
          <RemainingTask />
          <TimerTracker />
          <TaskView />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
