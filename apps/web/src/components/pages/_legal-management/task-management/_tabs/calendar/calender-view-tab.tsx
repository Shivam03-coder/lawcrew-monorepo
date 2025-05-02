"use client";

import { Task } from "@/data";
import { TaskStatus } from "@/types/global";
import {
  format,
  getDay,
  parse,
  startOfWeek,
  addMonths,
  subMonths,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { FC, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";

// Define available locales for date formatting
const locales = {
  "en-US": enUS,
};

// Initialize dateFnsLocalizer for react-big-calendar
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/styles/calendar.css";

import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronRight, ChevronLeft } from "lucide-react";
import CalandarEventCard from "./calendar-event-card";

// Define props for the toolbar component
interface ToolbarProps {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

/**
 * Toolbar component for navigating between calendar months
 */
const Toolbar: FC<ToolbarProps> = ({ date, onNavigate }) => {
  return (
    <div className="mb-4 flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-2 rounded-md lg:w-auto lg:justify-start">
      {/* Button to navigate to the previous month */}
      <Button
        variant="secondary"
        size="icon"
        className="flex items-center"
        onClick={() => onNavigate("PREV")}
      >
        <ChevronLeft size={16} />
      </Button>

      {/* Current month display */}
      <div className="flex h-9 w-full items-center justify-center rounded-md bg-secondary px-3 lg:w-auto">
        <CalendarIcon size={16} className="mr-2" />
        <p className="text-sm sm:text-base">{format(date, "MMMM yyyy")}</p>
      </div>

      {/* Button to navigate to the next month */}
      <Button
        variant="secondary"
        size="icon"
        className="flex items-center"
        onClick={() => onNavigate("NEXT")}
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

/**
 * CalendarViewTab component - displays the calendar with tasks
 */
const CalendarViewTab = ({ data }: { data: Task[] }) => {
  // Initialize the selected date, defaulting to the first task's due date or today
  const [value, setValue] = useState(
    data.length > 0 ? new Date(data[0]?.dueDate!) : new Date(),
  );

  const formatStr = "EEEE, MMMM d, yyyy"; // Define date format

  // Convert task data into calendar event format
  const events = data.map((task) => {
    return {
      id: task.id,
      title: task.title,
      start: parse(task.dueDate, formatStr, new Date()), // Parse task due date
      end: parse(task.dueDate, formatStr, new Date()), // Use the same date for start and end
      status: task.status as TaskStatus,
      category: task.category,
      priority: task.priority,
    };
  });

  /**
   * Handles calendar navigation (Previous, Next, Today)
   */
  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setValue(subMonths(value, 1)); // Move to previous month
    } else if (action === "NEXT") {
      setValue(addMonths(value, 1)); // Move to next month
    } else if (action === "TODAY") {
      setValue(new Date()); // Reset to current date
    }
  };

  return (
    <div className="mt-5 h-full w-full overflow-hidden sm:overflow-x-auto">
      <Toolbar date={value} onNavigate={handleNavigate} />
      <Calendar
        localizer={localizer}
        date={value}
        events={events}
        views={["month"]}
        defaultView="month"
        toolbar={false} // Disable default toolbar for custom toolbar
        showAllEvents
        className="h-auto min-h-[500px] w-full rounded-md bg-white shadow-sm sm:min-h-[600px]"
        max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))} // Limit max view to 1 year ahead
        formats={{
          weekdayFormat: (date, culture, localizer) =>
            localizer?.format(date, "EEE", culture) ?? "", // Show short weekday names on small screens
        }}
        components={{
          // Custom event card component
          eventWrapper: ({ event }) => (
            <CalandarEventCard
              id={event.id}
              category={event.category}
              priority={event.priority}
              status={event.status}
              title={event.title}
              end={event.end}
              start={event.start}
            />
          ),
        }}
      />
    </div>
  );
};

export default CalendarViewTab;
