"use client";
import React, { FC, useCallback, useState } from "react";
import {
  DragDropContext,
  type DropResult,
  Draggable,
  Droppable,
} from "@hello-pangea/dnd";
export enum TaskStatus {
  ToDo = "To Do",
  OnGoing = "On Going",
  Completed = "Completed",
}
import { Card } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import KanbanHeader from "./kanban-header";
import { Task } from "@/data";

const boards: TaskStatus[] = [
  TaskStatus.Completed,
  TaskStatus.OnGoing,
  TaskStatus.ToDo,
];

type TaskState = {
  [key in TaskStatus]: Task[];
};

interface DataKanban {
  data: Task[];
}

const KanBanView: FC<DataKanban> = ({ data }) => {
  const [task, setTask] = useState<TaskState>(() => {
    const initialState: TaskState = {
      [TaskStatus.Completed]: [],
      [TaskStatus.OnGoing]: [],
      [TaskStatus.ToDo]: [],
    };

    data.forEach((tasks) => {
      initialState[tasks.status].push(tasks);
    });

    return initialState;
  });

  const handleOnDrag = useCallback((results: DropResult) => {
    if (!results.destination) return;

    const { source, destination } = results;
    const sourceStatus = source.droppableId as TaskStatus;
    const destinationStatus = destination.droppableId as TaskStatus;

    setTask((prevTask) => {
      const newTask = { ...prevTask };

      const sourceColumn = [...newTask[sourceStatus]];
      const [movedTask] = sourceColumn.splice(source.index, 1);

      if (!movedTask) return prevTask;

      const updatedTask = {
        ...movedTask,
        status: destinationStatus,
      };

      newTask[sourceStatus] = sourceColumn;
      const destinationColumn = [...newTask[destinationStatus]];
      destinationColumn.splice(destination.index, 0, updatedTask);
      newTask[destinationStatus] = destinationColumn;

      return newTask;
    });
  }, []);

  return (
    <DragDropContext onDragEnd={handleOnDrag}>
      <div className="mt-3 flex flex-1 overflow-x-scroll">
        {boards.map((board) => {
          return (
            <div
              key={board}
              className="mr-6 flex flex-col rounded-md bg-secondary p-2 dark:bg-gray-800"
            >
              <KanbanHeader
                board={board}
                taskCount={task[board].length}
              />
              <Droppable droppableId={board.toString()}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="mt-4 flex min-h-[12.5rem] flex-col"
                    >
                      {task[board].map((task, index) => {
                        return (
                          <Draggable
                            key={task.id}
                            draggableId={task.id.toString()}
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
                                  {task.category}
                                </span>

                                {/* Due Date */}
                                {TaskStatus.Completed !== task.status && (
                                  <div className="mt-3 flex items-center gap-2 text-sm text-red-500">
                                    <CalendarIcon
                                      size={16}
                                      className="text-gray-400"
                                    />
                                    <p>Due: {task.dueDate}</p>
                                  </div>
                                )}
                              </Card>
                            )}
                          </Draggable>
                        );
                      })}
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
