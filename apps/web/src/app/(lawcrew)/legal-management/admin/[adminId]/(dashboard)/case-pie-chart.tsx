"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

const chartConfig = {
  criminal: {
    label: "Criminal",
    color: "var(--chart-1)",
  },
  civil: {
    label: "Civil",
    color: "var(--chart-2)",
  },
  family: {
    label: "Family",
    color: "var(--chart-3)",
  },
  corporate: {
    label: "Corporate",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const chartData = [
  { type: "criminal", cases: 250, fill: "var(--color-criminal)" },
  { type: "civil", cases: 190, fill: "var(--color-civil)" },
  { type: "family", cases: 160, fill: "var(--color-family)" },
  { type: "corporate", cases: 130, fill: "var(--color-corporate)" },
  { type: "other", cases: 100, fill: "var(--color-other)" },
];

const CasePieChart = () => {
  const totalCases = chartData.reduce((acc, curr) => acc + curr.cases, 0);

  return (
    <div className="">
      <h1 className="mb-6 text-base font-inter font-semibold">Law Case Distribution</h1>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="cases"
            nameKey="type"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalCases.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Total Cases
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-4 flex text-sm flex-col gap-2 items-center">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </div>
    </div>
  );
};

export default CasePieChart;
