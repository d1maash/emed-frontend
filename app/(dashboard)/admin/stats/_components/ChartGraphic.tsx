"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const generateChartData = (period: string) => {
  const today = new Date();

  switch (period) {
    case "today":
      return Array.from({ length: 24 }, (_, i) => ({
        date: `${i.toString().padStart(2, "0")}:00`,
        desktop: Math.floor(Math.random() * 50) + 10,
      }));

    case "week":
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - 6 + i);
        return {
          date: date.toLocaleDateString("en-US", { weekday: "short" }),
          desktop: Math.floor(Math.random() * 100) + 20,
        };
      });

    case "month":
      const daysInMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      ).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => ({
        date: (i + 1).toString(),
        desktop: Math.floor(Math.random() * 200) + 50,
      }));

    case "year":
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return months.map((month) => ({
        date: month,
        desktop: Math.floor(Math.random() * 500) + 100,
      }));

    default:
      return [];
  }
};

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

interface ChartBarInteractiveProps {
  period: string;
}

export function ChartBarInteractive({ period }: ChartBarInteractiveProps) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");

  const chartData = React.useMemo(() => generateChartData(period), [period]);

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
    }),
    [chartData]
  );

  const formatXAxisTick = (value: string) => {
    if (period === "today") {
      return value;
    } else if (period === "week") {
      return value;
    } else if (period === "month") {
      return value;
    } else if (period === "year") {
      return value;
    }
    return value;
  };

  return (
    <Card className="py-0">
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[400px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            className="bg-white"
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={formatXAxisTick}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    if (period === "today") {
                      return `${value} today`;
                    } else if (period === "week") {
                      return value;
                    } else if (period === "month") {
                      return `Day ${value}`;
                    } else if (period === "year") {
                      return value;
                    }
                    return value;
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
