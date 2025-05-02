"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Line,
  LineChart,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { day: "Mon", tasks: 5 },
  { day: "Tue", tasks: 8 },
  { day: "Wed", tasks: 7 },
  { day: "Thu", tasks: 6 },
  { day: "Fri", tasks: 9 },
  { day: "Sat", tasks: 4 },
  { day: "Sun", tasks: 3 },
];

const chartConfig = {
  tasks: {
    label: "Tasks Completed",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const WeeklyTaskStats = () => {
  return (
    <Card className="bg-fuchsia-50 dark:bg-fuchsia-900">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">
          Weekly Task Completion
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Tasks completed each day of the week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "white" }}
            />
            <YAxis hide />
            <ChartTooltip
              content={
                <ChartTooltipContent className="bg-white dark:bg-gray-800 dark:text-gray-100" hideLabel />
              }
            />
            <ChartLegend content={<ChartLegendContent className="text-gray-800 dark:text-gray-300" />} />
            <Bar dataKey="tasks" fill="#0D92F4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};


const chart2Data = [
  { month: "January", tasksAssigned: 150, tasksCompleted: 120 },
  { month: "February", tasksAssigned: 180, tasksCompleted: 150 },
  { month: "March", tasksAssigned: 200, tasksCompleted: 180 },
  { month: "April", tasksAssigned: 220, tasksCompleted: 200 },
  { month: "May", tasksAssigned: 170, tasksCompleted: 160 },
  { month: "June", tasksAssigned: 250, tasksCompleted: 230 },
  { month: "July", tasksAssigned: 230, tasksCompleted: 220 },
  { month: "August", tasksAssigned: 240, tasksCompleted: 230 },
  { month: "September", tasksAssigned: 210, tasksCompleted: 200 },
  { month: "October", tasksAssigned: 260, tasksCompleted: 240 },
  { month: "November", tasksAssigned: 280, tasksCompleted: 270 },
  { month: "December", tasksAssigned: 300, tasksCompleted: 290 },
];

const chart2Config = {
  tasksAssigned: {
    label: "Tasks Assigned",
    color: "hsl(var(--chart-1))", // You can customize this color
  },
  tasksCompleted: {
    label: "Tasks Completed",
    color: "hsl(var(--chart-2))", // You can customize this color
  },
} satisfies ChartConfig;

const TaskManagementChart = () => {
  return (
    <Card className="bg-green-50 dark:bg-green-900">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">
          Task Management Overview
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Tasks Assigned vs Tasks Completed (2024)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chart2Config}>
          <LineChart
            accessibilityLayer
            data={chart2Data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fill: "white" }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent className="bg-white dark:bg-gray-800 dark:text-gray-100" />
              }
            />
            <Line
              dataKey="tasksAssigned"
              type="monotone"
              stroke="#F95454"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="tasksCompleted"
              type="monotone"
              stroke="#0D92F4"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export {
  TaskManagementChart,
  WeeklyTaskStats,
}