"use client";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { api } from "@lawcrew/trpc-client/src/client";
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { format } from "date-fns";
import NoData from "@/components/shared/no-data";
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

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CaseAreaChart = () => {
  const { data } = api.client.clientMonthlyCaseStats.useQuery();

  const results = useMemo(() => {
    if (!data) return [];
    const reduced = data.reduce<
      Record<string, { created: number; completed: number }>
    >((acc, cur) => {
      const month = format(new Date(cur.createdAt), "MMMM");

      if (!acc[month]) {
        acc[month] = {
          created: 0,
          completed: 0,
        };
      }

      acc[month].created += 1;

      if (cur.status === "CLOSED") {
        acc[month].completed += 1;
      }
      return acc;
    }, {});

    return MONTHS.map((month) => {
      const monthData = reduced[month] || { created: 0, completed: 0 };
      return {
        month,
        created: monthData.created,
        completed: monthData.completed,
        pending: monthData.created - monthData.completed,
      };
    });
  }, [data]);

  if (data?.length === 0) return <NoData />;

  return (
    <div className="h-[400px] w-full">
      <h1 className="mb-6 font-inter text-base font-semibold">
        Total Cases Overview
      </h1>
      <ChartContainer config={chartConfig} className="h-[350px] w-full">
        <AreaChart accessibilityLayer data={results}>
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
