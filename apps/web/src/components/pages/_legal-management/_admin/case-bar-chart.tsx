"use client";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  created: {
    label: "Tasks Created",
    color: "var(--chart-1)",
  },
  completed: {
    label: "Tasks Completed",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", created: 120, completed: 90 },
  { month: "February", created: 150, completed: 130 },
  { month: "March", created: 180, completed: 160 },
  { month: "April", created: 140, completed: 120 },
  { month: "May", created: 200, completed: 170 },
  { month: "June", created: 190, completed: 180 },
];

const CaseBarChart = () => {
  return (
    <div>
      <h1 className="mb-6 text-base font-inter font-semibold">Monthly Case Stats</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="created" fill="var(--chart-1)" radius={4} />
          <Bar dataKey="completed" fill="var(--chart-2)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default CaseBarChart;
