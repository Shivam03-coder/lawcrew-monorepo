"use client";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  created: {
    label: "Created",
    color: "var(--chart-1)",
  },
  completed: {
    label: "Completed",
    color: "var(--chart-2)",
  },
  pending: {
    label: "Pending",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", created: 100, completed: 80, pending: 20 },
  { month: "February", created: 150, completed: 120, pending: 30 },
  { month: "March", created: 200, completed: 170, pending: 30 },
  { month: "April", created: 180, completed: 140, pending: 40 },
  { month: "May", created: 210, completed: 200, pending: 10 },
  { month: "June", created: 190, completed: 160, pending: 30 },
];

const CaseAreaChart = () => {
  return (
    <div className="">
      <h1 className="mb-6 text-base font-inter font-semibold">Total Cases Overview</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <AreaChart accessibilityLayer data={chartData}>
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

          <defs>
            {["created", "completed", "pending"].map((key) => (
              <linearGradient
                id={`fill-${key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                key={key}
              >
                <stop
                  offset="5%"
                  stopColor={`var(--chart-${["created", "completed", "pending"].indexOf(key) + 1})`}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={`var(--chart-${["created", "completed", "pending"].indexOf(key) + 1})`}
                  stopOpacity={0.1}
                />
              </linearGradient>
            ))}
          </defs>

          <Area
            dataKey="created"
            type="natural"
            stroke="var(--chart-1)"
            fill="url(#fill-created)"
            fillOpacity={0.4}
          />
          <Area
            dataKey="completed"
            type="natural"
            stroke="var(--chart-2)"
            fill="url(#fill-completed)"
            fillOpacity={0.4}
          />
          <Area
            dataKey="pending"
            type="natural"
            stroke="var(--chart-3)"
            fill="url(#fill-pending)"
            fillOpacity={0.4}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default CaseAreaChart;
