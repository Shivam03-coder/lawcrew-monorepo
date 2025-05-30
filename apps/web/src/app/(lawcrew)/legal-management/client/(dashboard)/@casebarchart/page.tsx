"use client";
import NoData from "@/components/shared/no-data";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { api } from "@lawcrew/trpc-client/src/client";
import { format } from "date-fns";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

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

const CaseBarChart = () => {
  const { data } = api.litigation.monthlyCaseStats.useQuery();

  const results = useMemo(() => {
    if (!data) return [];
    const reduced = data.reduce<
      Record<string, { created: number; completed: number }>
    >((acc, cur) => {
      const month = format(new Date(cur.createdAt), "MMMM");
      if (!acc[month]) {
        acc[month] = { created: 0, completed: 0 };
      }
      acc[month].created += 1;
      if (cur.status === "CLOSED") acc[month].completed += 1;
      return acc;
    }, {});

    return MONTHS.map((month) => {
      const monthData = reduced[month] || { created: 0, completed: 0 };
      return {
        month,
        created: monthData.created,
        completed: monthData.completed,
      };
    });
  }, [data]);

  if (data?.length === 0) return <NoData />;

  return (
    <div className="h-[400px] w-full">
      <h1 className="mb-6 font-inter text-base font-semibold">
        Monthly Case Stats
      </h1>
      <ChartContainer config={chartConfig} className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={results}>
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
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default CaseBarChart;
