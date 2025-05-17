"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", civil: 45, criminal: 28 },
  { month: "February", civil: 60, criminal: 42 },
  { month: "March", civil: 50, criminal: 35 },
  { month: "April", civil: 30, criminal: 40 },
  { month: "May", civil: 70, criminal: 38 },
  { month: "June", civil: 65, criminal: 45 },
];

const chartConfig = {
  civil: {
    label: "Civil Cases",
    color: "var(--chart-1)",
  },
  criminal: {
    label: "Criminal Cases",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const CaseLineChart = () => {
  return (
    <div className="">
      <h1 className="mb-6 text-base font-inter font-semibold">Cases Completed</h1>
      <ChartContainer config={chartConfig} className="mt-6">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="civil"
            type="monotone"
            stroke="var(--color-civil)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="criminal"
            type="monotone"
            stroke="var(--color-criminal)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default CaseLineChart;
