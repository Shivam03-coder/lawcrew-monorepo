"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { api } from "@lawcrew/trpc-client/src/client";
import NoData from "@/components/shared/no-data";

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

const typeToColorMap = {
  criminal: "var(--color-criminal)",
  civil: "var(--color-civil)",
  family: "var(--color-family)",
  corporate: "var(--color-corporate)",
  other: "var(--color-other)",
};

const CasePieChart = () => {
  const { data } = api.client.clientMonthlyCaseStats.useQuery();

  const chartData = (data || []).reduce<Record<string, number>>((acc, curr) => {
    const type = (curr.practiseArea || "other").toLowerCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(chartData).map(([type, cases]) => ({
    type,
    cases,
    fill: typeToColorMap[type as keyof typeof typeToColorMap] || "gray",
  }));

  const totalCases = pieData.reduce((acc, cur) => acc + cur.cases, 0);

  if (pieData?.length === 0) return <NoData />;

  return (
    <div>
      <h1 className="mb-6 font-inter text-base font-semibold">
        Law Case Distribution
      </h1>
      <div className="mt-16">
        <ChartContainer
          config={chartConfig}
          className="center mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData}
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
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="mt-4 flex flex-col items-center gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total cases for the last 6 months
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasePieChart;
