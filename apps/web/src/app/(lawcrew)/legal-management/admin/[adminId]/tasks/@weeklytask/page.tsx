"use client";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
    <Card className="bg-white">
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
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.2)"
            />
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
                <ChartTooltipContent
                  className="bg-white dark:bg-gray-800 dark:text-gray-100"
                  hideLabel
                />
              }
            />
            <Bar dataKey="tasks" fill="#0D92F4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default WeeklyTaskStats;
