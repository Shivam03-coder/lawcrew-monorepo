"use client";
import React, { FC, useCallback, useState, useEffect } from "react";
import {
  DragDropContext,
  type DropResult,
  Draggable,
  Droppable,
} from "@hello-pangea/dnd";

import { Card } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import KanbanHeader from "./kanban-header";
import { CaseStatus } from "./types";
import { api } from "@lawcrew/trpc-client/src/client";
import { AppRouterType } from "@lawcrew/trpc-server/routers/root";
import { useAppToasts } from "@/hooks/use-app-toast";
import NoData from "@/components/shared/no-data";

type Task = AppRouterType["litigation"]["getCaseDetailsByAdminId"][number];

const boards: CaseStatus[] = [
  CaseStatus.CLOSED,
  CaseStatus.PENDING,
  CaseStatus.OPEN,
];

type TaskState = {
  [key in CaseStatus]: Task[];
};

const KanBanView = () => {
  const { data, isLoading, error } =
    api.litigation.getCaseDetailsByAdminId.useQuery();

  const { SuccessToast } = useAppToasts();
  const updateStatus = api.litigation.editcaseDetails.useMutation();

  const [tasks, setTasks] = useState<TaskState>({
    [CaseStatus.CLOSED]: [],
    [CaseStatus.PENDING]: [],
    [CaseStatus.OPEN]: [],
  });

  useEffect(() => {
    if (data) {
      const newTasks: TaskState = {
        [CaseStatus.CLOSED]: [],
        [CaseStatus.PENDING]: [],
        [CaseStatus.OPEN]: [],
      };

      data.forEach((task) => {
        if (task.status! in newTasks) {
          newTasks[task.status as CaseStatus].push(task);
        }
      });

      setTasks(newTasks);
    }
  }, [data]);

  const handleOnDrag = useCallback(
    (results: DropResult) => {
      if (!results.destination) return;

      const { source, destination } = results;
      const sourceStatus = source.droppableId as CaseStatus;
      const destinationStatus = destination.droppableId as CaseStatus;

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      )
        return;

      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };

        const sourceColumn = [...newTasks[sourceStatus]];
        const [movedTask] = sourceColumn.splice(source.index, 1);

        if (!movedTask) return prevTasks;

        const updatedTask = {
          ...movedTask,
          status: destinationStatus,
        };

        updateStatus.mutate(
          {
            caseId: movedTask.id,
            status: destinationStatus,
          },
          {
            onSuccess: ({ message }) => {
              SuccessToast({
                title: "Case Status Updated Successfuly !",
              });
            },
          },
        );

        newTasks[sourceStatus] = sourceColumn;
        const destinationColumn = [...newTasks[destinationStatus]];
        destinationColumn.splice(destination.index, 0, updatedTask);
        newTasks[destinationStatus] = destinationColumn;

        return newTasks;
      });
    },
    [updateStatus],
  );

  if (data?.length === 0) return <NoData />;
  if (error) return <div>Error loading cases: {error.message}</div>;

  return (
    <DragDropContext onDragEnd={handleOnDrag}>
      <div className="mt-3 flex flex-1 overflow-x-scroll">
        {boards.map((board) => {
          return (
            <div
              key={board}
              className="mainCard mr-8 flex flex-col rounded-md p-2 dark:bg-gray-800"
            >
              <KanbanHeader board={board} taskCount={tasks[board].length} />
              <Droppable droppableId={board.toString()}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="mt-4 flex min-h-[12.5rem] flex-col"
                    >
                      {tasks[board].map((task, index) => {
                        const dueDate = task.estimatedCloseDate
                          ? new Date(
                              task.estimatedCloseDate,
                            ).toLocaleDateString()
                          : "No due date";

                        return (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`textDark relative my-1 min-w-80 overflow-hidden rounded-xl bg-white p-5 shadow-2xl transition-all duration-300 dark:bg-primary ${
                                  snapshot.isDragging
                                    ? "scale-105 shadow-2xl"
                                    : "hover:scale-105 hover:shadow-2xl"
                                }`}
                              >
                                {/* Floating Decorative Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-50"></div>

                                {/* Title & Description */}
                                <div className="flex flex-col gap-2">
                                  <h3 className="textDark text-base font-medium">
                                    {task.title}
                                  </h3>
                                </div>

                                {/* Category Tag */}
                                <span className="mt-3 inline-block rounded-md bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                  {task.practiseArea}
                                </span>

                                {/* Due Date */}
                                {board !== CaseStatus.CLOSED &&
                                  task.estimatedCloseDate && (
                                    <div className="mt-3 flex items-center gap-2 text-sm text-red-500">
                                      <CalendarIcon
                                        size={16}
                                        className="text-gray-400"
                                      />
                                      <p>Due: {dueDate}</p>
                                    </div>
                                  )}
                              </Card>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanBanView;
