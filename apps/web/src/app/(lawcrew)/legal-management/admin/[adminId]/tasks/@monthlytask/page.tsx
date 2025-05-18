"use client";

import { CartesianGrid, XAxis, Line, LineChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
    color: "hsl(var(--chart-1))",
  },
  tasksCompleted: {
    label: "Tasks Completed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const MonthlyTaskStats = () => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">
          Task Management Overview
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Tasks Assigned vs Tasks Completed (2025)
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
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.2)"
            />
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

export default MonthlyTaskStats;
