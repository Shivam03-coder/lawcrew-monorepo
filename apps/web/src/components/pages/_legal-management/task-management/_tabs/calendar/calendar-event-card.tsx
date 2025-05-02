"use client";

import { cn } from "@/lib/utils";
import { TaskStatus } from "@/types/global";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface EventcardProps {
  id: string;
  category: string;
  priority: string;
  status: TaskStatus;
  title: string;
  end: Date;
  start: Date;
}

const statusColor: Record<TaskStatus, string> = {
  [TaskStatus.ToDo]: cn(
    "text-blue-700 bg-blue-100 border border-blue-500",
    "dark:text-blue-300 dark:bg-blue-900 dark:border-blue-400"
  ),
  [TaskStatus.OnGoing]: cn(
    "text-yellow-700 bg-yellow-100 border border-yellow-500",
    "dark:text-yellow-300 dark:bg-yellow-900 dark:border-yellow-400"
  ),
  [TaskStatus.Completed]: cn(
    "text-green-700 bg-green-100 border border-green-500",
    "dark:text-green-300 dark:bg-green-900 dark:border-green-400"
  ),
};

const CalandarEventCard: FC<EventcardProps> = ({ title, status }) => {
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.target);
    // Example of navigating to a specific event (modify as needed)
    // router.push(`/event/${id}`);
  };

  return (
    <div className="px-2">
      <div
        onClick={onClick}
        className={cn(
          "text-pretty rounded-md p-1.5 text-xs font-medium transition-colors cursor-pointer",
          "bg-white dark:bg-gray-800 text-primary dark:text-white",
          statusColor[status]
        )}
      >
        <p>{title}</p>
      </div>
    </div>
  );
};

export default CalandarEventCard;
