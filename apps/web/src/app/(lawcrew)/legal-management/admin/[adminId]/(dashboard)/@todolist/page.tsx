"use client";

import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Trash } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import AddTask from "./add-task-form";
import { api } from "@lawcrew/trpc-client/src/client";
import NoData from "@/components/shared/no-data";
import { useAppToasts } from "@/hooks/use-app-toast";

const TodoList = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const { SuccessToast, ErrorToast } = useAppToasts();
  const { data } = api.user.getToDoByDate.useQuery({
    taskForDate: new Date(date as Date).toISOString(),
  });
  const Task = data ?? [];
  const apiUtils = api.useUtils();
  const checkToDo = api.user.checkToDo.useMutation();
  const deleteTodo = api.user.deleteToDo.useMutation();

  const handleToggleCheckToDo = useCallback(
    async (todoId: string) => {
      await checkToDo.mutateAsync(
        { todoId },
        {
          onSuccess() {
            SuccessToast({
              title: "Task checked succesfully",
            });
            apiUtils.user.getToDoByDate.invalidate();
          },
        },
      );
    },
    [checkToDo, apiUtils.user.getToDoByDate],
  );
  const handleDeleteToDo = useCallback(
    async (todoId: string) => {
      await deleteTodo.mutateAsync(
        { todoId },
        {
          onSuccess() {
            SuccessToast({
              title: "Task deleted succesfully",
            });
            apiUtils.user.getToDoByDate.invalidate();
          },
        },
      );
    },
    [deleteTodo, apiUtils.user.getToDoByDate],
  );

  return (
    <div className="">
      <div className="mb-6 flex items-center justify-between px-2">
        <h1 className="font-inter text-base font-semibold">Todo List</h1>
        <AddTask />
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-full bg-primary text-secondary">
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {/* LIST */}
      <ScrollArea className="mt-4 max-h-[350px] overflow-y-auto">
        <div className="flex flex-col gap-4">
          {/* LIST ITEM */}
          {Task?.length > 0 ? (
            Task?.map(({ id, isTaskChecked, task }) => (
              <Card key={id} className="p-4 shadow-inner">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      onClick={() => handleToggleCheckToDo(id)}
                      id="item1"
                      checked={isTaskChecked}
                    />
                    <label
                      htmlFor="item1"
                      className="text-muted-foreground text-sm"
                    >
                      {task}
                    </label>
                  </div>
                  <Trash
                    onClick={() => handleDeleteToDo(id)}
                    size={16}
                    className="cursor-pointer text-red-600"
                  />
                </div>
              </Card>
            ))
          ) : (
            <NoData />
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TodoList;
